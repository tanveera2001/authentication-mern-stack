require("dotenv").config();
const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
} = require("../services/emails");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie");
const { successResponse } = require("./responseController");
const AppError = require("../utils/appError");

const normalizeUser = (user) => ({
  id: user._id,
  email: user.email,
  name: user.name,
  isVerified: user.isVerified ?? false,
  lastLogin: user.lastLogin,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const signup = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) throw new AppError("User already exists!", 400);

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000);

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
    });

    generateTokenAndSetCookie(res, user._id);
    await sendVerificationEmail(user.email, verificationToken);

    return successResponse(res, {
      statusCode: 201,
      message: "User registered successfully!",
      user: normalizeUser(user),
    });
  } catch (err) {
    next(err);
  }
};

const verifyEmail = async (req, res, next) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) throw new AppError("Invalid or expired verification code", 400);

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    return successResponse(res, {
      statusCode: 200,
      message: "Email verified successfully",
      user: normalizeUser(user),
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) throw new AppError("Invalid email or password", 400);

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) throw new AppError("Invalid email or password", 400);

    generateTokenAndSetCookie(res, user._id);
    user.lastLogin = new Date();
    await user.save();

    return successResponse(res, {
      statusCode: 200,
      message: "Logged in successfully",
      user: normalizeUser(user),
    });
  } catch (err) {
    next(err);
  }
};

const logout = (req, res, next) => {
  try {
    if (!req.cookies?.token) {
      return successResponse(res, {
        statusCode: 200,
        message: "No active session, nothing to log out",
      });
    }

    res.clearCookie("token");
    return successResponse(res, {
      statusCode: 200,
      message: "Logged out successfully",
    });
  } catch (err) {
    next(err);
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) throw new AppError("User not found!", 400);

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1h
    await user.save();

    await sendPasswordResetEmail(
      user.email,
      `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
    );

    return successResponse(res, {
      statusCode: 200,
      message: "Password reset link sent to your email",
    });
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body; // ✅ fixed

  try {
    if (!password || !confirmPassword)
      throw new AppError("Password and confirm password are required", 400);

    if (password !== confirmPassword)
      throw new AppError("Passwords do not match", 400);

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) throw new AppError("Invalid or expired reset token", 400);

    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);

    return successResponse(res, {
      statusCode: 200,
      message: "Password reset successful",
    });
  } catch (err) {
    next(err);
  }
};

const CheckAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) throw new AppError("User not found", 400);

    return successResponse(res, {
      statusCode: 200,
      message: "User is authenticated",
      user: normalizeUser(user), // ✅ always normalized
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  verifyEmail,
  login,
  logout,
  forgotPassword,
  resetPassword,
  CheckAuth,
};
