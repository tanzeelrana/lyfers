const express = require('express');
const router = express.Router();
const { User } = require('../models');
const {authenticateAdmin,authenticate} = require("../middleware/authMiddleware")


const { login,signup,logout, forgotPassword,members,userDelete, userProfile, getUser } = require('../controllers/authController');

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout',authenticate, logout);

router.post('/forgot-password',authenticate, forgotPassword);

router.put('/update-profile/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const {
        firstName,
        lastName,
        email,
        dateOfBirth,
        fullname,
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
          fullname,
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

  router.get('/user/:id',authenticate, userProfile);
  router.get('/userById/:id', getUser);


  router.get('/members',authenticateAdmin, members);
  router.delete('/user/:id',authenticateAdmin, userDelete);




module.exports = router;
