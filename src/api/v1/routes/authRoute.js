const route = require("express").Router();

const {
  register,
  login,
  refreshTokenHandler,
  logout,
  adminRegister,
  sendResetEmailHandler,
  validateResetCodeHandler,
  resetPasswordHandler,
  adminLogin,
  sendEmailHandler,
  validateEmailHandler,
} = require("../controllers/authController.js");
const {
  isAuth,
  inSession,
  isAdmin,
} = require("../middlewares/authMiddleware.js");

route.post("/register", register);
route.post("/login", login);
route.post("/refresh", refreshTokenHandler);
route.post("/logout", isAuth, logout);
route.post("/sendEmail", inSession, isAuth, sendEmailHandler);
// routes to reset password
route.post("/sendResetEmail", sendResetEmailHandler);
route.post("/validateRestCode", validateResetCodeHandler);
route.post("/resetPassword", isAuth, resetPasswordHandler);
route.get("/validate/:token", validateEmailHandler);
route.post("/admin/register", isAuth, isAdmin, adminRegister);
route.post("/admin/login", adminLogin);

module.exports = route;
