const createError = require("http-errors");
const { verifyJWT } = require("../helpers/jwtHelper");
const { getSession } = require("../services/authSessionService");

function normalizeIP(ip) {
  // If the IP is an IPv6-mapped IPv4 address, convert it to IPv4
  if (ip.startsWith("::ffff:")) {
    return ip.replace("::ffff:", "");
  }
  return ip;
}

const isAuth = async (req, res, next) => {
  try {
    let token;
    if (req.cookies.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      throw new Error("No token provided");
    }
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
    let token;
    if (req.cookies.token) {
      token = req.cookies.token;
      console.log("Token found in cookies:", token);
    } else if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
      console.log("Token found in Authorization header:", token);
    } else {
      throw new Error("No token provided");
    }

    // Extract the raw IP from the request
    const forwardedFor = req.header("x-forwarded-for");
    const rawIp =
      forwardedFor && typeof forwardedFor === "string"
        ? forwardedFor.split(",")[0]
        : req.socket.remoteAddress;
    console.log("Raw IP from request:", rawIp);

    // Normalize the IP address
    const ip = normalizeIP(rawIp);
    console.log("Normalized IP:", ip);

    // Fetch session based on token and IP
    const session = await getSession(token, ip);
    console.log("Fetched session:", session);

    if (!session) {
      throw new Error("Session not found. Possible token or IP mismatch.");
    }
    next();
  } catch (error) {
    console.error("inSession error:", error);
    req.user = null;
    res.clearCookie("token");
    next(createError(401, error.message));
  }
};

module.exports = { isAuth, isAdmin, inSession };
