// controllers/auth.controller.js

const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { createAdmin, getAdminByEmail } = require("../services/adminService.js");
const { generateTokens, verifyJWT } = require("../helpers/jwtHelper.js");
const { uploadFile } = require("../helpers/uploadFile.js");

const {
  deleteSession,
  createSession,
  findSessionByUser,
  updateSessionToken,
} = require("../services/authSessionService.js");

const {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
  updateUserRefreshToken,
} = require("../services/userService.js");

const sendEmail = require("../helpers/mailing.js");
const { getUserPermissions } = require("../services/payService.js");

// ----------------------
// Helper Functions
// ----------------------

const getIpAddress = (req) => {
  const forwardedFor = req.header("x-forwarded-for");
  return forwardedFor && typeof forwardedFor === "string"
    ? forwardedFor.split(",")[0]
    : req.socket.remoteAddress;
};

// ----------------------
// Controller Functions
// ----------------------

// Registration (for new users)
const register = async (req, res, next) => {
  try {
    const imageFile = req.file;
    const { fullName, email, password, phone, birthday } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const photo = imageFile ? await uploadFile(imageFile) : "";

    const user = await createUser({
      fullName,
      email,
      password: hashedPassword,
      phone,
      birthday,
      photo,
    });

    // Generate a token for email validation or immediate login (expires in 1h)
    const token = jwt.sign(
      { id: user.id, role: "USER" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    const ip = getIpAddress(req);
    await createSession(user.id, token, ip);
    user.password = undefined;
    return res
      .status(201)
      .cookie("token", token, {
        maxAge: 36000,
        httpOnly: true,
        secure: true,
      })
      .json({
        status: 201,
        message: "User created successfully",
        user,
        token,
      });
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Login using access & refresh tokens
const login = async (req, res, next) => {
  try {
    console.log("Login request body:", req.body);
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) throw new Error("User not found");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    // Generate both tokens (access token is still called "token")
    const { token, refreshToken } = generateTokens({
      id: user.id,
      role: "USER",
    });
    await updateUserRefreshToken(user.id, refreshToken);

    console.log("Generated token:", token);
    const userSession = await findSessionByUser(user.id);
    if (userSession) await deleteSession(user.id);
    const ip = getIpAddress(req);
    console.log("Using IP address:", ip);
    await createSession(user.id, token, ip);
    user.password = undefined;

    // Optionally, add permissions if needed (as in your previous working code)
    const payments = await getUserPermissions(user.id);
    const schoolYearsIds = payments.map((payment) =>
      payment.plan.Permission.map((permission) => permission.schoolYear.id)
    );
    user.permission = schoolYearsIds.flat().length > 0;

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 36000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        status: 200,
        message: "User logged in successfully",
        user,
        token,
        refreshToken, // Optionally return refreshToken to the client
      });
  } catch (error) {
    console.error("Login error:", error.message);
    next(createError(400, error.message));
  }
};

// Endpoint to refresh tokens
const refreshTokenHandler = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new Error("Refresh token is required");
    // Verify the refresh token using the refresh secret
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await findUserById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      throw new Error("Invalid refresh token");
    }

    // Generate new tokens
    const { token: newAccessToken, refreshToken: newRefreshToken } =
      generateTokens({ id: user.id, role: "USER" });
    await updateUserRefreshToken(user.id, newRefreshToken);
    await updateSessionToken(user.id, newAccessToken);

    res
      .status(200)
      .json({ token: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    next(createError(401, error.message));
  }
};

// Logout endpoint
const logout = async (req, res, next) => {
  try {
    const { id } = req.user;
    await deleteSession(id);
    res.status(200).json({
      status: 200,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Send email for account validation
const sendEmailHandler = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await findUserById(id);
    if (!user) throw new Error("User not found");
    if (user.status !== "INACTIVE")
      throw new Error("User status doesn't match");
    // For email validation, generate an access token (expires in 1h)
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    await sendEmail(
      user.email,
      "Validate Your Account in EZMED",
      `${process.env.url}auth/validate/${token}`
    );
    res.status(201).json({
      status: 201,
      message: "Email sent successfully",
    });
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Validate email when the user clicks the link
const validateEmailHandler = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { id } = await verifyJWT(token);
    const user = await findUserById(id);
    if (!user) throw new Error("User not found");
    if (user.status !== "INACTIVE")
      throw new Error("User status doesn't match");
    await updateUser(id, { status: "ACTIVE" });
    return res.redirect(`${process.env.FRONT_URL}`);
  } catch (error) {
    return res.redirect(`${process.env.FRONT_URL}`);
  }
};

// Admin registration
const adminRegister = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await createAdmin({
      fullName,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { id: admin.id, role: "ADMIN" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    admin.password = undefined;
    res
      .status(201)
      .cookie("token", token, { maxAge: 36000, httpOnly: true, secure: true })
      .json({
        status: 201,
        message: "Admin created successfully",
        admin,
        token,
      });
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Admin login
const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await getAdminByEmail(email);
    if (!admin) throw new Error("Admin not found");
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new Error("Invalid credentials");
    const token = jwt.sign(
      { id: admin.id, role: "ADMIN" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    admin.password = undefined;
    return res
      .status(200)
      .cookie("token", token, { maxAge: 36000, httpOnly: true, secure: true })
      .json({
        status: 200,
        message: "Admin logged in successfully",
        admin,
        token,
      });
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Send password reset email
const sendResetEmailHandler = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (!user) throw new Error("User not found");
    const code = Math.floor(100000 + Math.random() * 900000);
    await updateUser(user.id, { resetCode: code.toString() });
    await sendEmail(
      user.email,
      "Reset Your Password in EZMED",
      `Your reset code is: ${code}`
    );
    res.status(201).json({
      status: 201,
      message: "Email sent successfully",
    });
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Validate reset code
const validateResetCodeHandler = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    const user = await findUserByEmail(email);
    if (!user) throw new Error("User not found");
    if (user.resetCode != code) throw new Error("Invalid code");
    const token = jwt.sign(
      { id: user.id, role: "USER" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(201).json({
      status: 201,
      message: "Code validated successfully",
      token,
    });
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Reset password
const resetPasswordHandler = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await updateUser(req.user.id, { password: hashedPassword });
    return res.status(201).json({
      status: 201,
      message: "Password reset successfully",
    });
  } catch (error) {
    next(createError(400, error.message));
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshTokenHandler,
  sendEmailHandler,
  validateEmailHandler,
  adminRegister,
  adminLogin,
  sendResetEmailHandler,
  validateResetCodeHandler,
  resetPasswordHandler,
};
