const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

// Create and export the transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

module.exports = transporter;
