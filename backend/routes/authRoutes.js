const express = require('express');
const router = express.Router();
const { User } = require('../models');

const { login,signup,logout, forgotPassword,members,userDelete } = require('../../backend/controllers/authController');

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.post('/forgot-password', forgotPassword);

router.put('/update-profile/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const {
        firstName,
        lastName,
        email,
        dateOfBirth,
        password,
        securityQuestion,
        answer,
        fullName,
        phone,
        address,
        city,
        state,
        postalCode,
      } = req.body;
  
      const updatedUser = await User.update(
        {
          firstName,
          lastName,
          email,
          dateOfBirth,
          password,
          securityQuestion,
          answer,
          fullName,
          phone,
          address,
          city,
          state,
          postalCode,
        },
        { where: { id } }
      );
  
      if (updatedUser[0] === 0) {
        return res.status(404).json({ message: 'User not found or no changes detected' });
      }
  
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating the profile' });
    }
  });

  router.get('/members', members);
  router.delete('/user/:id', userDelete);




module.exports = router;
