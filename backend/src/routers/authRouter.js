
const express = require("express");
const { signup, verifyEmail, login, logout, forgotPassword, resetPassword } = require("../controllers/authController");
const { signupValidationRules, verifyEmailValidationRules, loginValidationRules, forgotPasswordValidationRules, resetPasswordValidationRules } = require("../validators/authValidator");
const validateResult = require("../middleware/validateResult");

const authRouter = express.Router();

authRouter.post("/signup", signupValidationRules, validateResult, signup);
authRouter.post("/verify-email", verifyEmailValidationRules, validateResult, verifyEmail);
authRouter.post("/login", loginValidationRules, validateResult, login);
authRouter.post("/logout", logout);
authRouter.post("/forgot-password", forgotPasswordValidationRules, validateResult, forgotPassword);
authRouter.post("/reset-password/:token", resetPasswordValidationRules, validateResult, resetPassword);

module.exports = authRouter;

