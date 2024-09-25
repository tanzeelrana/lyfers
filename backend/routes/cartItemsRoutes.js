const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Add product to cart
router.post('/add', cartController.addToCart);

// Get cart items
router.get('/:userId', cartController.getCartItems);

// Remove product from cart
router.delete('/remove/:cartItemId', cartController.removeFromCart);

module.exports = router;
