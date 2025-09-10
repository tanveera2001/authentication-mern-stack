const { transporter, sender } = require("../config/emailConfig");
const { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } = require("../utils/emailTemplates");

const sendVerificationEmail = async (email, verificationToken) => {
    try {
        await transporter.sendMail({
            from: sender,
            to: email,
            subject: "Verify you eamil",
            html: VERIFICATION_EMAIL_TEMPLATE(verificationToken), 
        }); 
        
    } catch (err) {
        throw err;  
    }
};

const sendWelcomeEmail = async (email, name) => {
    try {
        await transporter.sendMail({
            from: sender,
            to: email,
            subject: "Welcome to Auth Company!",
            html: `<h2>Hello ${name},</h2><p>Welcome to our app!</p>`,
        });
    } catch (err) {
        throw err;
    }
}

const sendPasswordResetEmail = async (email, resetURL) => {
    try {
        await transporter.sendMail({ 
            from: sender, 
            to: email,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE(resetURL),
        });

    } catch (err) {
        throw err;
    }
};

const sendResetSuccessEmail = async (email) => {
    try {
        await transporter.sendMail({
            from: sender,
            to: email,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE(),
        });
    } catch (err) {
        throw err;
    }
};


module.exports = { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail };