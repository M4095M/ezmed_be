const jwt = require("jsonwebtoken");

const generateTokens = (payload) => {
  try {
    // Access token – short-lived (e.g., 15 minutes)
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15s",
    });
    // Refresh token – long-lived (e.g., 7 days)
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    return { token, refreshToken };
  } catch (error) {
    throw new Error(error.message);
  }
};
const verifyJWT = async (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  generateTokens,
  verifyJWT,
};
