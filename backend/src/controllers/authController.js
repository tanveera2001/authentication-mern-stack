
const User = require("../models/userModel");
const { sendVerificationEmail } = require("../services/emails");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie");
const { successResponse } = require("./responseController");

const signup = async (req, res, next) => {
    const { email, password, name } = req.body;
    console.log(`Email: ${email}, Password: ${password}, Name: ${name}`);

    try {
        if(!email || !password || !name) {
            throw new Error("All fields are required.");
        }

        const userAlreadyExists = await User.findOne({ email }); 
        console.log("Existing User:", userAlreadyExists);

        if(userAlreadyExists) throw new Error("User already exists!");

        const verificationToken = Math.floor(100000 + Math.random() * 900000)

        const user = await User.create({
            email,
            password,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        });

        console.log("Created User:", user);

        generateTokenAndSetCookie(res, user._id);

        await sendVerificationEmail(user.email, verificationToken);

        return successResponse(res, {
            statusCode: 201,
            message: "User registered successfully!"
        });

    } catch (err) {
        console.error("Error caught in signup controller:", err);
        next(err);    
    }
}; 

const verifyEmail = (req, res) => {
    res.send("verify api is running properly.");
};

const login = (req, res) => {
    res.send("Login api is running properly.");
};

const logout = (req, res) => {
    res.send("Logout api is running properly");
};

const forgotPassword = (req, res) => {
    res.send("Forgor password api is running correctly.");
};

const resetPassword = (req, res) => {
    res.send("Reset password api is running correctly.");
};

module.exports = { signup, verifyEmail, login, logout, forgotPassword, resetPassword };