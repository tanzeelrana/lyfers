const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { User } = require("../models"); // Adjust the path as needed

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
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return the token
    return res.status(200).json({ success: true, token });
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
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({ success: true, token });
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