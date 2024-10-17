const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.static('public'));
app.use(express.json());
const db = require('./models');
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
require('dotenv').config();
const path = require('path');

const paypal = require('@paypal/checkout-server-sdk');
const environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
const client = new paypal.core.PayPalHttpClient(environment);


app.post('/api/create-order', async (req, res) => {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "100.00" 
          }
        }
      ]
    });
  
    try {
      const order = await client.execute(request);
      res.json({ id: order.result.id });
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  // Capture Payment API
  app.post('/api/capture-order', async (req, res) => {

    const { orderID } = req.body;
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
  
    try {
      const capture = await client.execute(request);
      res.json({ capture });
    } catch (err) {
      res.status(500).send(err);
    }
  });



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

const testimonialRoutes = require('./routes/testimonialRoutes');
app.use('/testimonials', testimonialRoutes);

const contactRoutes = require('./routes/contact');
app.use('/api', contactRoutes);





    app.listen(3003,() =>{
        console.log('server  is running ');
    });

