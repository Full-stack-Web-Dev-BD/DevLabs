const nodemailer = require('nodemailer');
require("dotenv").config()


// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail', // or any other service provider like 'Yahoo', 'Outlook'
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendMail = async (to, subject, body) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: body
    };

    try {
       const transported=  await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`, transported);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = sendMail;
