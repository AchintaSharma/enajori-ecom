const paymentController = require("../controllers/payment.controller");
const { verifyToken } = require("../middlewares/authjwt");
const { isAdmin } = require("../middlewares/isAdmin");

module.exports = (app) => {
  // API for creating a payment
  app.post(
    "/enajori/api/v1/payments",
    [verifyToken],
    paymentController.createPayment
  );

  // // API for fetching logged in users' order history
  // app.get(
  //   "/enajori/api/v1/orders/myOrders",
  //   [verifyToken],
  //   paymentController.viewMyOrders
  // );

  // // API for fetching all user's order history
  // app.get(
  //   "/enajori/api/v1/orders/all",
  //   [verifyToken, isAdmin],
  //   paymentController.viewAllOrders
  // );

  // // API for viewing order by id
  // app.get(
  //   "/enajori/api/v1/orders/:orderId",
  //   [verifyToken],
  //   paymentController.viewOrderById
  // );

  // // API for updating order to paid
  // app.patch(
  //   "/enajori/api/v1/orders/:orderId/paid",
  //   [verifyToken],
  //   paymentController.updateOrderToPaid
  // );

  // // API for updating order to paid
  // app.patch(
  //   "/enajori/api/v1/orders/:orderId/delivered",
  //   [verifyToken],
  //   paymentController.updateOrderToDelivered
  // );
};