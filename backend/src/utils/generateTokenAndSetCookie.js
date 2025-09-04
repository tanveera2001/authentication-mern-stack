
require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (res, userId) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" }); // Generate token

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days 
        });

        console.log("JWT token generated and cookie set successfully.");

    } catch (err) {
        console.error("Error generating token or setting cookie:", err);
        throw err; 
    }


};

module.exports = generateTokenAndSetCookie;