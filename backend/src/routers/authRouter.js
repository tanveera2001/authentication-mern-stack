
const express = require("express");
const { signup, verifyEmail, login, logout, forgotPassword, resetPassword } = require("../controllers/authController");
const { signupValidationRules } = require("../validators/authValidator");
const validateResult = require("../middleware/validateResult");

const authRouter = express.Router();

authRouter.post("/signup", signupValidationRules, validateResult, signup);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password/:token", resetPassword);

module.exports = authRouter;

