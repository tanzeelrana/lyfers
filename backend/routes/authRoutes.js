const express = require('express');
const router = express.Router();
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// User signup route
router.post('/signup', async (req, res) => {
  const { email, password, qr_code, user_type, security_question_id, security_answer } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    console.log(existingUser)
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Create new user
    const newUser = await User.create({
      email,
      password,
      qr_code,
      user_type,
      security_question_id,
      security_answer
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// User login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/logout', (req, res) => {
    res.json({ message: 'Logged out successfully' });
  });

module.exports = router;
