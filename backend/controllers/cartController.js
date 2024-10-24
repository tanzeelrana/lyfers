const { Cart, CartItem, Product, ProductImage } = require("../models");

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity, color, size } = req.body;

    // Find or create a cart for the user
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId });
    }

    // Find or create the cart item
    let cartItem = await CartItem.findOne({
      where: { cartId: cart.id, productId },
    });
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = await CartItem.create({
        cartId: cart.id,
        productId,
        quantity,
        color,
        size,
      });
    }
    await cartItem.save();

    res
      .status(201)
      .json({ message: "Product added to cart successfully", cartItem });
  } catch (error) {
    res.status(500).json({ error: "Failed to add product to cart" });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({
      where: { userId },
      include: {
        model: CartItem,
        include: {
          model: Product,
          include: {
            model: ProductImage,
            as: "images",
          },
        },
      },
    });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { userId,cartItemId } = req.params;
    const cart = await Cart.findOne({
      where: { userId },
    });
  

    const cartItem = await CartItem.findOne({
      where: { cartId:cart.id , productId:cartItemId},
    });
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await cartItem.destroy();

    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove product from cart" });
  }
};
