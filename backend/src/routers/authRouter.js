
const express = require("express");
const { signup, verifyEmail, login, logout, forgotPassword, resetPassword, CheckAuth } = require("../controllers/authController");
const { signupValidationRules, verifyEmailValidationRules, loginValidationRules, forgotPasswordValidationRules, resetPasswordValidationRules } = require("../validators/authValidator");
const validateResult = require("../middleware/validateResult");
const authenticateToken = require("../middleware/authenticateToken");


const authRouter = express.Router();

authRouter.post("/signup", signupValidationRules, validateResult, signup);
authRouter.post("/verify-email", verifyEmailValidationRules, validateResult, verifyEmail);
authRouter.post("/login", loginValidationRules, validateResult, login);
authRouter.post("/logout", logout);
authRouter.post("/forgot-password", forgotPasswordValidationRules, validateResult, forgotPassword);
authRouter.post("/reset-password/:token", resetPasswordValidationRules, validateResult, resetPassword);
authRouter.get("/check-auth", authenticateToken, CheckAuth);


module.exports = authRouter;

