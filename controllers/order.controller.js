const Order = require("../models/order.model");
const { tax, shipping } = require("../configs/app.config");

// Function to create a new order
const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, itemsPrice } = req.body;
    const user = req.user.id;

    const taxPrice = (parseFloat(itemsPrice) * parseFloat(tax)).toFixed(2);
    const shippingPrice = (
      parseFloat(itemsPrice) * parseFloat(shipping)
    ).toFixed(2);
    const totalPrice = (
      parseFloat(itemsPrice) +
      parseFloat(taxPrice) +
      parseFloat(shippingPrice)
    ).toFixed(2);

    const orderCreated = await Order.create({
      user,
      orderItems,
      shippingAddress,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    return res.status(201).json({
      success: true,
      status: 201,
      message: "Order placed successfully.",
      order: orderCreated,
    });
  } catch (error) {
    console.error(`Error while creating order: ${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while creating order.",
    });
  }
};

// Function to get logged-in user's orders
const viewMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("user", "userName email")
      .populate({
        path: "orderItems.product",
        select: "name price images",
      })
      .populate("shippingAddress");

    return res.status(200).json({
      success: true,
      status: 200,
      orders,
    });
  } catch (error) {
    console.error(`Error while getting user orders: ${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while getting user orders.",
    });
  }
};

// Function to view order by ID
const viewOrderById = async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user.id;
  try {
    const order = await Order.findOne({
      _id: orderId,
      user: userId,
    })
      .populate("user", "name email")
      .populate({
        path: "orderItems.product",
        select: "name price image",
      })
      .populate("shippingAddress");

    if (!order) {
      return res.status(404).json({
        success: false,
        status: 404,
        error: "Order not found.",
      });
    }

    return res.status(200).json({
      success: true,
      status: 200,
      order,
    });
  } catch (error) {
    console.error(`Error while viewing order by id: ${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while viewing order by id.",
    });
  }
};

// Function to view all orders
const viewAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");

    return res.status(200).json({
      success: true,
      status: 200,
      message: "All orders fetched successfully.",
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error(`Error while fetching orders: ${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while fetching orders.",
    });
  }
};

// Function to update order to paid
const updateOrderToPaid = async (req, res) => {
  const { paymentDetails } = req.body;
  const { orderId } = req.params;

  if (!orderId) {
    return res.status(400).json({
      success: false,
      status: 400,
      field: "paymentDetails",
      error: "Order id is not provided.",
    });
  }
  if (!paymentDetails) {
    return res.status(400).json({
      success: false,
      status: 400,
      field: "paymentDetails",
      error: "Payment details not provided for updating order to paid.",
    });
  }

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        status: 404,
        error: "Order not found.",
      });
    }

    if (order.isPaid) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: "Payment has already been made against this order.",
      });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentDetails = paymentDetails;

    const updatedOrder = await order.save();

    console.log(`Payment details updated for order ${updatedOrder._id}`);
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Order updated to paid.",
      updatedOrder,
    });
  } catch (error) {
    console.error(`Error while updating order to paid: ${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while updating order to paid.",
    });
  }
};

// Function to update order to delivered
const updateOrderToDelivered = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        status: 404,
        error: "Order not found.",
      });
    }

    if (order.isDelivered) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: "This order has already been delivered.",
      });
    }

    order.isDelivered = true;
    order.deliveredAt = new Date();

    const updatedOrder = await order.save();
    console.log(`Delivery details updated for order ${updatedOrder._id}`);

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Order updated to delivered.",
      updatedOrder,
    });
  } catch (error) {
    console.error(`Error while updating order to delivered: ${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while updating order to delivered.",
    });
  }
};

module.exports = {
  createOrder,
  viewMyOrders,
  viewOrderById,
  viewAllOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
};
