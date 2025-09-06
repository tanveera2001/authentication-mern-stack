
const { body, param } = require("express-validator");

const signupValidationRules = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required"),

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Email is invalid"),

    body("password")
        .trim()
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/).withMessage("Password must contain at least one number")
        .matches(/[^A-Za-z0-9]/).withMessage("Password must contain at least one special character"),

];

const verifyEmailValidationRules = [
    body("code")
        .trim()
        .notEmpty().withMessage("Verification code is required")
        .isLength({ min: 6, max: 6 }).withMessage("Code must be 6 digits")
        .isNumeric().withMessage("Code must be numeric"),
];

const loginValidationRules = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email"),

    body("password")
        .trim()
        .notEmpty().withMessage("Password is required"),

];

const forgotPasswordValidationRules = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email"),
];

const resetPasswordValidationRules = [
    param("token")
        .trim()
        .notEmpty().withMessage("Reset token is required"),
    body("password")
        .trim()
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/).withMessage("Password must contain at least one number")
        .matches(/[^A-Za-z0-9]/).withMessage("Password must contain at least one special character"),
];


module.exports = { signupValidationRules, verifyEmailValidationRules, loginValidationRules, forgotPasswordValidationRules, resetPasswordValidationRules };