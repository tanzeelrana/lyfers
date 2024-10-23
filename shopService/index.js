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

const eventsRouter = require('./routes/events');
app.use('/api/shop/events', eventsRouter);

const eventCategoriesRouter = require('./routes/eventCategories');
app.use('/api/shop/eventCategories', eventCategoriesRouter);

const productRoutes = require('./routes/productsRoutes');
app.use('/api/shop/products', productRoutes);
const subcategoryRoutes = require('./routes/subcategory');
app.use('/api/shop/subcategories', subcategoryRoutes);

const wishlistRoutes = require('./routes/wishlistRoutes');
app.use('/api/shop/wishlist', wishlistRoutes);

app.listen(3002,() =>{
    console.log('server  is running ');
});
