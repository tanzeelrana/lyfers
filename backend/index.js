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




//routers
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const postRouter = require('./routes/Posts')
app.use("/posts" ,postRouter);

const eventsRouter = require('./routes/events');
app.use('/events', eventsRouter);

const eventCategoriesRouter = require('./routes/eventCategories');
app.use('/eventCategories', eventCategoriesRouter);

const productRoutes = require('./routes/productsRoutes');
app.use('/products', productRoutes);



    app.listen(3003,() =>{
        console.log('server  is running ');
    });

