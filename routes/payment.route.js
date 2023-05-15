const paymentController = require("../controllers/payment.controller");
const { verifyToken } = require("../middlewares/authjwt");
const { isAdmin } = require("../middlewares/isAdmin");
const {
  validateCreatePaymentRequestBody,
} = require("../middlewares/validatePaymentRequests");

module.exports = (app) => {
  // API for creating a razorpay payment
  app.post(
    "/enajori/api/v1/payments/razorpay",
    [verifyToken, validateCreatePaymentRequestBody],
    paymentController.createPaymentRazorpay
  );

  // API for creating a cod payment
  app.post(
    "/enajori/api/v1/payments/cod",
    [verifyToken, validateCreatePaymentRequestBody],
    paymentController.createPaymentCod
  );

  // API for fetching payment details
  app.get(
    "/enajori/api/v1/orders/payments/:orderId",
    [verifyToken],
    paymentController.getPaymentDetails
  );
};
