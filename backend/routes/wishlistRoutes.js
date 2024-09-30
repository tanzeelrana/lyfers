const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

// Add a product to the wishlist
router.post('/', wishlistController.addToWishlist);

// Remove a product from the wishlist
router.delete('/:userId/:productId', wishlistController.removeFromWishlist);

// Get all wishlist products for a user
router.get('/:userId', wishlistController.getWishlistForUser);

module.exports = router;
