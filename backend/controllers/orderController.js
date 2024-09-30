const { Order, OrderItem, User ,Cart,Product,ProductImage} = require('../models');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, cartItems, totalAmount, shippingAddress, paymentDtails } = req.body;
    // Create the order
    const newOrder = await Order.create({
      userId,
      totalAmount,
      shippingAddress,
      billingAddress:shippingAddress,
      paymentMethod:paymentDtails.paymentMethod
    });

    // Create the order items
    const orderItemsWithOrderId = cartItems.map(item => ({
      orderId: newOrder.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      size:item.size,
      color:item.color,
    }));
    
    await OrderItem.bulkCreate(orderItemsWithOrderId);

    await Cart.destroy({
      where: { userId: userId },  
    });

    return res.status(201).json({
      message: 'Order created successfully',
      order: newOrder,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while creating the order.' });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName','lastName', 'email'],
        },
        {
          model: OrderItem,
          as: 'orderItems',
          include: {
            model: Product,
            as: "product",

            include: {
              model: ProductImage,
              as: "images",
            },
          },
        },
      ],
      order: [['createdAt', 'DESC']], 
    });

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while fetching orders.' });
  }
};

// Get a specific order by ID
exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const order = await Order.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName','lastName', 'email'],
        },
        {
          model: OrderItem,
          as: 'orderItems',
          include: {
            model: Product,
            as: "product",
            include: {
              model: ProductImage,
              as: "images",
            },
          }, 
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while fetching the order.' });
  }
};

// Update an existing order
exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { totalAmount, shippingAddress, paymentMethod } = req.body;

  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    await order.update({
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    return res.status(200).json({ message: 'Order updated successfully', order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while updating the order.' });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    await order.destroy();
    return res.status(200).json({ message: 'Order deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while deleting the order.' });
  }
};

// controllers/orderController.js

exports.getUserOrders = async (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = await Order.findAll({
      where: { userId: userId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email'],
        },
        {
          model: OrderItem,
          as: 'orderItems',
          include: {
            model: Product,
            as: 'product',
            include: {
              model: ProductImage,
              as: 'images',
            },
          },
        },
      ],
      order: [['createdAt', 'DESC']], 
    });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user.' });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while fetching orders.' });
  }
};

