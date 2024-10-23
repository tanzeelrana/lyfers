const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const {authenticateAdmin,authenticate} = require("../middleware/authMiddleware")

// Add product to cart
router.post('/add',authenticate, cartController.addToCart);

// Get cart items
router.get('/:userId',authenticate, cartController.getCartItems);

// Remove product from cart
router.delete('/remove/:userId/:cartItemId',authenticate, cartController.removeFromCart);

module.exports = router;
