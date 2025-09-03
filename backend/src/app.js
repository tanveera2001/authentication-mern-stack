
const express = require("express");
const authRouter = require("./routers/authRouter");

const app = express();

// Global Middlewares

// 📁 Public Static Files

// API Routes
app.use("/api/auth", authRouter);

// Global error handler

app.get("/", (req, res) => {
    res.send("Congratulations! You did it.");
});

module.exports = app;