const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors());
const db = require('./models');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
require('dotenv').config();
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//routers
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const eventsRouter = require('./routes/events');
app.use('/events', eventsRouter);

const eventCategoriesRouter = require('./routes/eventCategories');
app.use('/eventCategories', eventCategoriesRouter);

const productRoutes = require('./routes/productsRoutes');
app.use('/products', productRoutes);

const securityQuestionsRoutes = require('./routes/securityQuestionsRoutes');
app.use('/api/security-questions', securityQuestionsRoutes);

const subcategoryRoutes = require('./routes/subcategory');
app.use('/subcategories', subcategoryRoutes);

const wishlistRoutes = require('./routes/wishlistRoutes');
app.use('/wishlist', wishlistRoutes);

const cartRoutes = require('./routes/cartItemsRoutes');
app.use('/cart', cartRoutes);

const postRoutes = require('./routes/postRoutes');
app.use('/posts', postRoutes);

const commentRoutes = require('./routes/commentRoutes');
app.use('/comments', commentRoutes);

const groupRoutes = require('./routes/groupRoutes');
app.use('/groups', groupRoutes);

const colorRoutes = require('./routes/colorRoutes');
app.use('/colors', colorRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/orders', orderRoutes);


    app.listen(3003,() =>{
        console.log('server  is running ');
    });

