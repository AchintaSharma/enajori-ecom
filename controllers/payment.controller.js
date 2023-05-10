const { stripeSecretKey } = require("../configs/app.config");
const stripe = require("stripe")(stripeSecretKey);
const Payment = require("../models/payment.model");
const Order = require("../models/order.model");
const paymentMethods = require("../utils/constants");

// Controller to create a payment using the specified payment method
const createPayment = async (req, res) => {
  try {
    const { orderId, paymentMethod } = req.body;
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
        error: "Payment already done for the order.",
      });
    }
    if (paymentMethod === paymentMethods.stripe) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: order.totalPrice * 100,
        currency: "usd",
      });

      const payment = await Payment.create({
        order: orderId,
        paymentMethod,
        paymentResult: {
          id: paymentIntent.id,
          status: paymentIntent.status,
          update_time: paymentIntent.last_payment_error
            ? null
            : paymentIntent.charges.data[0].created,
          email_address: paymentIntent.last_payment_error
            ? null
            : paymentIntent.charges.data[0].billing_details.email,
        },
      });

      return res.status(200).json({
        success: true,
        status: 200,
        message: "Payment intent created successfully.",
        clientSecret: paymentIntent.client_secret,
        payment: payment,
      });
    } else if (paymentMethod === paymentMethods.cod) {
      const payment = await Payment.create({
        order: orderId,
        paymentMethod,
      });

      return res.status(200).json({
        success: true,
        status: 200,
        message: "Payment created successfully.",
        payment: payment,
      });
    } else {
      return res.status(400).json({
        success: false,
        status: 400,
        error: "Invalid payment method.",
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

module.exports = {
  createPayment,
};
