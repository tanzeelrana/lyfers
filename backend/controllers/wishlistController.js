const { Wishlist, Product, User, ProductImage,Color } = require("../models");

// Add a product to the wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the product is already in the user's wishlist
    const existingWishlistItem = await Wishlist.findOne({
      where: { userId, productId },
    });
    
    // Add to wishlist
    await Wishlist.create({ userId, productId });
    res.status(200).json({ message: "Product added to wishlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add product to wishlist" });
  }
};

// Remove a product from the wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId, userId } = req.params;

    const wishlistItem = await Wishlist.findOne({
      where: { userId, productId },
    });
    if (!wishlistItem) {
      return res.status(404).json({ message: "Item not found in wishlist" });
    }

    await wishlistItem.destroy();
    res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to remove product from wishlist" });
  }
};

// Get all wishlist products for the authenticated user
exports.getWishlistForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    // Find all wishlist items for the user
    const wishlistItems = await Wishlist.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          include: [
            {
              model: ProductImage,
              as: "images",
            },
            {
              model: Color,
              as: "colors",
            }
          ],
          },
      ],
      order: [['createdAt', 'DESC']], 
    });

    res.status(200).json(wishlistItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve wishlist" });
  }
};
