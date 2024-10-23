const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();

app.use(express.json());

// Service map to define routes for each microservice
const serviceMap = {
  '/users': `${process.env.USER_SERVICE_URL}/api`,    // Users service
  '/orders': `${process.env.ORDER_SERVICE_URL}/api`,   // Orders service
  '/community': `${process.env.COMMUNITY_SERVICE_URL}/api`,// Community service
  '/shop': `${process.env.SHOP_SERVICE_URL}/api`, // Products services
};

app.use('/api', (req, res) => {
  // Get the base route (/users, /orders, etc.)
  const baseRoute = `/${req.path.split('/')[1]}`; 
  
  const targetService = serviceMap[baseRoute]; // Map to corresponding microservice
  if (!targetService) {
    return res.status(404).json({ message: 'Service not found' });
  }
  console.log( `${targetService}${req.path.replace('/api', '')}`), 
  
  // Forward the request to the appropriate microservice using Axios
  axios({
    method: req.method,
    url: `${targetService}${req.path.replace('/api', '')}`, 
    data: req.body, 
    headers: { Authorization: req.headers['authorization'] },
  })
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
    });
});

// Start the API Gateway on port 3000
app.listen(3006, () => {
  console.log('API Gateway running on port 3006');
});
