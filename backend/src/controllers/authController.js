
const signup = (req, res) => {
    res.send("Signup api is running perfectly.");
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