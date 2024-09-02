const express = require('express');
const router = express.Router();
const { User } = require('../models');

const { login,signup,logout, forgotPassword } = require('../../backend/controllers/authController');

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.post('/forgot-password', forgotPassword);



module.exports = router;
