const jwt = require('jsonwebtoken');
const { User } = require('../models');
const axios = require('axios');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    // Decode the token to get the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Make a request to the user microservice to validate the token
    const response = await axios.get(`${process.env.USER_SERVICE_URL}/api/users/auth/user/${decoded.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.data) return res.status(404).json({ message: 'User not found' });

    req.user = response.data; 
    next();
  } catch (error) {
    // Handle token expiration and invalid token scenarios
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Session expired, please login again' });
    }

    res.status(401).json({ message: 'Invalid token' });
  }
};

const authenticateAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const response = await axios.get(`${process.env.USER_SERVICE_URL}/api/users/auth/user/${decoded.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.data) return res.status(404).json({ message: 'User not found' });

    if(response.data.user_type == 'admin'){
      req.user = response;
      next();
    }else{
      return res.status(403).json({ message: 'You should not have access for this action. please login with admin access' });
    }
   
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Session expired, please login again' });
    }
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { authenticate, authenticateAdmin };
