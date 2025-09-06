
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRouter = require("./routers/authRouter");
const globalErrorHandler = require("./middleware/globalErrorHandler");
const customCors = require("./config/cors");

const app = express();

// Global Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(customCors);

// 📁 Public Static Files

// API Routes
app.use("/api/auth", authRouter);
app.get("/", (req, res) => {
    res.send("Congratulations! You did it.");
});

// Global error handler
app.use(globalErrorHandler);



module.exports = app;