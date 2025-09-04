const { transporter, sender } = require("../config/emailConfig");
const { VERIFICATION_EMAIL_TEMPLATE } = require("../utils/emailTemplates");

const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const info = await transporter.sendMail({
            from: sender,
            to: email,
            subject: "Verify you eamil",
            html: VERIFICATION_EMAIL_TEMPLATE(verificationToken), 
        }); 

        console.log(`Verification email sent to ${email}, messageId: ${info.messageId}`);
        
    } catch (err) {
        console.error("Error sending verification email:", err);
        throw err;  
    }
};

module.exports = { sendVerificationEmail };