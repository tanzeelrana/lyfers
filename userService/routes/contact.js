const express = require("express");
const router = express.Router();
const transporter = require("../config/NodeMailer"); 

// Contact form submission route
router.post("api/users/contact", (req, res) => {
  const { name, email,phone, message } = req.body;

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.ADMIN_EMAIL, // Admin email to receive the message
    subject: `New Contact Us Message from ${name}`,
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #4CAF50;" text-align:"center">New Contact Us Message</h2>
      <p>You have received a new message from the contact form ${name} .</p>
      <br>
      <p style="background-color: #f9f9f9; padding: 15px; border-left: 5px solid #4CAF50;">${message}</p>
      <br>
      <br>
      <br

        <p >Regards: </p>
        <br>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #4CAF50;">${email}</a></p>
      <p><strong>Phone:</strong> ${phone}</p>
      <hr style="border: 1px solid #ddd; margin-top: 20px;">
      <p style="font-size: 0.9em; color: #555;">This message was sent from the contact form on your website.</p>
    </div>
  `,
  };

  // Use the transporter to send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Failed to send email." });
    } else {
      console.log("Email sent:", info.response);
      return res.status(200).json({ message: "Email sent successfully!" });
    }
  });
});

module.exports = router;
