const createError = require("http-errors");
const { verifyJWT } = require("../helpers/jwtHelper");
const { getSession } = require("../services/authSessionService");
const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    const payload = await verifyJWT(token);
    req.user = payload;
    next();
  } catch (error) {
    req.user = null;
    res.clearCookie("token");
    next(createError(401, error.message));
  }
};
const isAdmin = async (req, res, next) => {
  try {
    const role = req.user.role;
    if (role !== "admin")
      new Error("You are not authorized to access this route");
    next();
  } catch (error) {
    next(createError(401, error.message));
  }
};

const inSession = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    // fetch in session for this token and IP and check if it is valid
    const session = await getSession(
      token,
      req.header("x-forwarded-for").split(",")[0] || req.socket.remoteAddress
    );
    if (!session)
      throw new Error(
        "You are logged in from another device. Please login again."
      );
    next();
  } catch (error) {
    req.user = null;
    res.clearCookie("token");
    next(createError(401, error.message));
  }
};

module.exports = { isAuth, isAdmin, inSession };
