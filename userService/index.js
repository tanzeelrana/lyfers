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

const authRoutes = require('./routes/authRoutes');
app.use('/api/users/auth', authRoutes);

const testimonialRoutes = require('./routes/testimonialRoutes');
app.use('/api/users/testimonials', testimonialRoutes);

app.listen(3001,() =>{
    console.log('server  is running ');
});