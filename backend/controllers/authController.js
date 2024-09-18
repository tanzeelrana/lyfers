const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const QRCode = require('qrcode');
const baseUrlFrontend = process.env.FRON_END_URL
const sharp = require('sharp');
const fs = require('fs');
const {UserReferralPoints} = require("../models");
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = Buffer.from('27675871c7d814c83c78ea5af3dcde51');
const iv = Buffer.from('d2f090a61e979aea'); 

const login = async (req, res) => {
  // Validation rules
  await body('email').isEmail().withMessage('Invalid email address').run(req);
  await body('password').notEmpty().withMessage('Password is required').run(req);

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(200).json({ success: false, message: "User not found" });
    }

    // Check if the password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(200).json({ success: false, message: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email ,role:user.user_type },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return the token
    return res.status(200).json({ success: true, token ,user:user });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};

const signup = async (req, res) => {
  
  
 
  // Validation rules
  await body('email').isEmail().withMessage('Invalid email address').run(req);
  await body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').run(req);
  await body('security_question_id').notEmpty().withMessage('Security question is required').run(req);
  await body('security_answer').notEmpty().withMessage('Security answer is required').run(req);

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  


  const {
    fname,
    lname,
    email,
    password,
    qr_code,
    user_type = "user",
    security_question_id,
    security_answer,
    referalUserId,
  } = req.body;

 
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(200)
        .json({ success: false, message: "User already exists", user: existingUser });
    }

    // Create a new user
    const newUser = await User.create({
      fname,
      lname,
      email,
      password,
      qr_code,
      user_type,
      security_question_id,
      security_answer,
    });

    // Generate a JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email,role:newUser.user_type },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
          // Generate a URL containing the user ID 
          function encryptUserId(userId) {
            const cipher = crypto.createCipheriv(algorithm, key, iv);
            let encrypted = cipher.update(userId, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            return encodeURIComponent(encrypted);
          }
          
          function decryptUserId(encryptedUserId) {
            const decipher = crypto.createDecipheriv(algorithm, key, iv);
            let decrypted = decipher.update(decodeURIComponent(encryptedUserId), 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
          }
          
          // Example usage
          const userId = newUser.id.toString();
          const encryptedUserId = encryptUserId(userId);

          const signUpUrl = `${baseUrlFrontend}/register/${encryptedUserId}`;

          const generateQRCodeWithText = async (data, text) => {
            try {
              const qrCodeBuffer = await QRCode.toBuffer(data, {
                color: {
                  dark: '#000000', 
                  light: '#ffffff' 
                },
                width: 300, 
              });
          
              const svgText = `
              <svg width="300" height="300">
                <text x="50%" y="50%" dy="15" dominant-baseline="middle" text-anchor="middle" font-size="46" fill="red">${text}</text>
              </svg>
            `;
              const textBuffer = Buffer.from(svgText);
                        const combinedImage = await sharp(qrCodeBuffer)
                .composite([
                  { input: textBuffer, top: 0, left: 0 }
                ])
                .png()
                .toBuffer();
          
          
              const base64Image = combinedImage.toString('base64');
              newUser.qr_code = base64Image;
              await newUser.save();           
            } catch (err) {
              console.error(err);
            }
          };
          
          generateQRCodeWithText(signUpUrl, 'LYFERS');       

          if (referalUserId) {
            const decryptedUserId = decryptUserId(referalUserId);

            const referUser = await User.findByPk(decryptedUserId);
             if (referUser) {
               referUser.points = referUser.points + 10;
               await referUser.save();
               const referalPoint = await UserReferralPoints.create({
                 user_id: newUser.id,
                 referral_name:referUser.firstName ?? referUser.email +' '+ referUser.lastName ?? '',
                 referral_user_id:referUser.id,
                 points:10
               });
             }
           } 


    return res.status(201).json({ success: true, token,user:newUser });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error });
  }
};

const forgotPassword = async (req, res) => {
  // Validation rules
  console.log(req.body)
  await body('email').isEmail().withMessage('Invalid email address').run(req);
  await body('security_question_id').notEmpty().withMessage('Security question is required').run(req);
  await body('security_answer').notEmpty().withMessage('Security answer is required').run(req);
  await body('password').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long').run(req);

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { email, security_question_id, security_answer, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(200).json({ success: false, message: "User not found" });
    }

    // Check if the security question and answer match
    if (user.security_question_id !== security_question_id || user.security_answer !== security_answer) {
      return res.status(200).json({ success: false, message: "Security question or answer is incorrect" });
    }

    // Update the password
    user.password = password; // Ensure this is hashed before saving
    await user.save();

    return res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = { login, signup, logout, forgotPassword };