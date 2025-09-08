
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const authenticateToken = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        
        if (!token) {
            throw new AppError("Access denied. No token provided.", 401);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        if (err.name === "JsonWebTokenError") {
            return next(new AppError("Invalid token", 401));
        }
        if (err.name === "TokenExpiredError") {
            return next(new AppError("Token expired", 401));
        }
        next(err);
    }
};

module.exports = authenticateToken;