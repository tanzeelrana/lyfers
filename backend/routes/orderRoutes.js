const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const {authenticateAdmin,authenticate} = require("../middleware/authMiddleware")

// Create a new order
router.post('/',authenticate, orderController.createOrder);
router.post('/create-order-payment',authenticate, orderController.orderPayment);
router.post('/create-order-payment-captured',authenticate, orderController.orderPaymentCaptured);

// Get all orders
router.get('/',authenticateAdmin, orderController.getAllOrders);

// Get a specific order by ID
router.get('/:id',authenticate, orderController.getOrderById);

// Update an existing order
router.put('/:id',authenticate, orderController.updateOrder);

// Delete an order
router.delete('/:id', orderController.deleteOrder);

router.get('/user/:userId',authenticate, orderController.getUserOrders);

module.exports = router;
