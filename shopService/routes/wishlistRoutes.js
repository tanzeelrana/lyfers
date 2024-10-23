const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const {authenticateAdmin,authenticate} = require("../middleware/authMiddleware")

// Add a product to the wishlist
router.post('/',authenticate, wishlistController.addToWishlist);

// Remove a product from the wishlist
router.delete('/:userId/:productId',authenticate, wishlistController.removeFromWishlist);

// Get all wishlist products for a user
router.get('/:userId',authenticate, wishlistController.getWishlistForUser);

module.exports = router;
