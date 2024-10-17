const {
  Order,
  OrderItem,
  User,
  Cart,
  Product,
  ProductImage,
} = require("../models");
// const Stripe = require('stripe');
// const stripe = Stripe('sk_test_51Q58YJFqWxMjEP76XCiUvj0AKUS5qiyKvAPstui9FdZqbzvbwpJZ6kQazWkEdvUCt1HqNddRuACtlAt2e6HHtpQ200ny18dmRX');

const paypal = require("@paypal/checkout-server-sdk");
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);
// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      totalAmount,
      shippingAddress,
      paymentDtails,
      orderType,
    } = req.body;
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: totalAmount * 100,
    //   currency: 'usd',
    //   payment_method: paymentDtails.paymentMethodId,
    //   confirm: true,
    //   metadata: {
    //     userId: userId,
    //   },
    //   return_url: 'https://yourwebsite.com/payment/success',
    // });

    // Create the order
    if (orderType == "event") {
      return res.status(201).json({
        message: "Event ticket generated successfully",
      });
    } else {
      const newOrder = await Order.create({
        userId,
        totalAmount,
        shippingAddress,
        billingAddress: shippingAddress,
        paymentMethod: 'credit card',
      });

      // Create the order items
      const orderItemsWithOrderId = cartItems.map((item) => ({
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
        color: item.color,
      }));

      await OrderItem.bulkCreate(orderItemsWithOrderId);

      await Cart.destroy({
        where: { userId: userId },
      });

      return res.status(201).json({
        message: "Order created successfully",
        order: newOrder,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while creating the order." });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"],
        },
        {
          model: OrderItem,
          as: "orderItems",
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
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching orders." });
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
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"],
        },
        {
          model: OrderItem,
          as: "orderItems",
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
      return res.status(404).json({ message: "Order not found." });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching the order." });
  }
};

// Update an existing order
exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { totalAmount, shippingAddress, paymentMethod } = req.body;

  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    await order.update({
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    return res
      .status(200)
      .json({ message: "Order updated successfully", order });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating the order." });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    await order.destroy();
    return res.status(200).json({ message: "Order deleted successfully." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the order." });
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
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"],
        },
        {
          model: OrderItem,
          as: "orderItems",
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
      order: [["createdAt", "DESC"]],
    });

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching orders." });
  }
};

exports.orderPayment = async (req, res) => {
  const { totalAmount } = req.body;
  try {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: parseFloat(totalAmount).toFixed(2),
          },
        },
      ],
    });

    try {
      const order = await client.execute(request);
      res.json({ id: order.result.id });
    } catch (err) {
      res.status(500).send(err);
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while payment feild of orders." });
  }
};

exports.orderPaymentCaptured = async (req, res) => {
  const { orderID } = req.body;
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  try {
    const capture = await client.execute(request);
    res.json({ capture });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while payment feild of orders." });
  }
};
