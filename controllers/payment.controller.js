const {
  stripeSecretKey,
  razorpayApiKeyId,
  razorpayApiKeySecret,
} = require("../configs/app.config");
const stripe = require("stripe")(stripeSecretKey);
const Payment = require("../models/payment.model");
const Order = require("../models/order.model");
const { paymentMethods } = require("../utils/constants");
const Razorpay = require("razorpay");

//Controller to create razorpay session
const createPaymentRazorpay = async (req, res) => {
  try {
    //TODO: Provide paymentMethod field from client side
    const { orderId, paymentMethod = paymentMethods.razorpay } = req.body;
    let { amount } = req.body;

    //TODO: Send orderId from client side
    // const orderToBePaidFor = await Order.findById(orderId);

    // if (!orderToBePaidFor) {
    //   return res.status(404).json({
    //     success: false,
    //     status: 404,
    //     error: "Order not found.",
    //   });
    // }

    // if (orderToBePaidFor.isPaid) {
    //   return res.status(400).json({
    //     success: false,
    //     status: 400,
    //     error: "Payment already done for the order.",
    //   });
    // }

    if (paymentMethod === paymentMethods.razorpay) {
      // const amount = orderToBePaidFor.totalPrice;

      // Create a Razorpay instance
      const razorpay = new Razorpay({
        key_id: razorpayApiKeyId,
        key_secret: razorpayApiKeySecret,
      });

      const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: "order_rcptid_11",
        payment_capture: 1,
      };

      const order = await razorpay.orders.create(options);
      // res.json(order);
      console.log("razorpay order: ", order);
      return res.status(200).json({
        success: true,
        status: 200,
        message: "Payment intent created successfully.",
        order,
      });
    }
  } catch (error) {
    console.error(`Error while creating payment: ${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while creating payment.",
    });
  }
};

// Controller to get payment details for an order
const getPaymentDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        status: 404,
        error: "Order not found.",
      });
    }

    if (!order.isPaid) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: "Payment due for this order.",
      });
    }

    const payment = await Payment.findOne({ order: orderId });
    console.log("payment found:", payment);
    return res.status(200).json({
      success: true,
      status: 200,
      payment,
    });
  } catch (error) {
    console.error(`Error while getting payment details: ${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while getting payment details.",
    });
  }
};

// Function to update order to paid
const createPaymentCod = async (req, res) => {
  const { paymentDetails } = req.body;

  try {
    const orderToUpdate = await Order.findById(paymentDetails.order);
    // console.log("orderToUpdate: ", orderToUpdate);

    if (!orderToUpdate) {
      return res.status(404).json({
        success: false,
        status: 404,
        error: "Order not found.",
      });
    }

    if (orderToUpdate.isPaid) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: "Payment has already been made against this order.",
      });
    }

    const paymentCreated = await Payment.create(paymentDetails);
    console.log("paymentCreated: ", paymentCreated);

    orderToUpdate.isPaid = true;
    orderToUpdate.paidAt = Date.now();
    orderToUpdate.paymentDetails = paymentCreated;

    const updatedOrder = await orderToUpdate.save();

    console.log(`Payment details updated for order ${updatedOrder._id}`);
    // console.log("updatedOrder: ", updatedOrder);

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
module.exports = {
  createPaymentCod,
  createPaymentRazorpay,
  getPaymentDetails,
};
