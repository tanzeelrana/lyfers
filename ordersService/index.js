const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.static('public'));
app.use(express.json());
const db = require('./models');
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
require('dotenv').config();
const path = require('path');

const cartRoutes = require('./routes/cartItemsRoutes');
app.use('/api/orders/cart', cartRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders/orders', orderRoutes);

app.listen(3005,() =>{
    console.log('server  is running ');
});
