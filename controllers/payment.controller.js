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
    const {
      orderId,
      paymentMethod = paymentMethods.razorpay,
      amount,
    } = req.body;

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

// Controller to retrieve the payment details for a particular order
const getPaymentDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: "Order id is not provided.",
      });
    }
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

// TODO: Check later and finalize
// Controller to cancel a payment for a particular order
const cancelPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!payment) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: "Order id is not provided.",
      });
    }

    const payment = await Payment.findOne({ order: orderId });

    if (!payment) {
      return res.status(404).json({
        success: false,
        status: 404,
        error: "Payment not found.",
      });
    }

    if (payment.paymentResult.status === "succeeded") {
      return res.status(400).json({
        success: false,
        status: 400,
        error: "Payment cannot be cancelled as it has already been completed.",
      });
    }

    await payment.remove();

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Payment cancelled successfully.",
    });
  } catch (error) {
    console.error(`Error while cancelling payment: ${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while cancelling payment.",
    });
  }
};

//TODO: Controller to refund a payment for a particular order
/*
// Controller to refund a payment for a particular order
const refundPayment = async (req, res) => {
  try {
    const { orderId, amount } = req.body;
    const payment = await Payment.findOne({ order: orderId });

    if (!payment) {
      return res.status(404).json({
        success: false,
        status: 404,
        error: "Payment not found.",
      });
    }

    if (payment.paymentMethod !== "stripe") {
      return res.status(400).json({
        success: false,
        status: 400,
        error: "Refund is only available for Stripe payments.",
      });
    }

    const refund = await stripe.refunds.create({
      payment_intent: payment.paymentResult.id,
      amount: amount * 100,
    });

    await Order.findByIdAndUpdate(orderId, {
      isRefunded: true,
      refundedAt: Date.now(),
    });

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Payment refunded successfully.",
      refund,
    });
  } catch (error) {
    console.error(`Error while refunding payment: ${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while refunding payment.",
    });
  }
};
*/
module.exports = {
  createPaymentCod,
  createPaymentRazorpay,
  getPaymentDetails,
};
