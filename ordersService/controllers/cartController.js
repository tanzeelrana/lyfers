const { Cart, CartItem, Product, ProductImage } = require("../models");
const axios = require('axios');

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

    // Fetch the cart and cart items from the local database
    const cart = await Cart.findOne({
      where: { userId },
      include: {
        model: CartItem,
        
      },
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Map through cartItems and fetch product details from the product microservice
    const updatedCartItems = await Promise.all(
      cart.CartItems.map(async (cartItem) => {
        try {
          // Fetch product details from the product microservice
          const productResponse = await axios.get(
            `${process.env.PRODUCT_SERVICE_URL}/api/shop/products/${cartItem.productId}`,
            {
              headers: {
                Authorization: req.headers.authorization, // Pass access token
              },
            }
          );

          // Attach product details and images to cart item
          const product = productResponse.data;
          
          return {
            ...cartItem.dataValues, // Keep existing cart item data
            products: product, // Add fetched product data with images
          };
        } catch (error) {
          console.error('Error fetching product data:', error.message);
          return {
            ...cartItem.dataValues,
            products: null, // Set product as null in case of error
          };
        }
      })
    );

    // Return the updated cart with the single 'cartItems' array containing product details
    const updatedCart = {
      id: cart.id,
      userId: cart.userId,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
      cartItems: updatedCartItems, // Attach updated cart items with product details
    };

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error('Error fetching cart items:', error.message);
    res.status(500).json({ error: 'Failed to fetch cart items' });
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
