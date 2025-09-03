
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Congratulations! You did it.");
});

module.exports = app;