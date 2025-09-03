
const express = require("express");
const { signup, verifyEmail, login, logout, forgotPassword, resetPassword } = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);

module.exports = authRouter;

