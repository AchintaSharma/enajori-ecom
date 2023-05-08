const orderController = require("../controllers/order.controller");
const { verifyToken } = require("../middlewares/authjwt");
const { isAdmin } = require("../middlewares/isAdmin");
module.exports = (app) => {
  // API for creating an order
  app.post(
    "/enajori/api/v1/orders",
    [verifyToken],
    orderController.createOrder
  );

  // API for fetching logged in users' order history
  app.get(
    "/enajori/api/v1/orders/myOrders",
    [verifyToken],
    orderController.viewMyOrders
  );

  // API for fetching all user's order history
  app.get(
    "/enajori/api/v1/orders/all",
    [verifyToken, isAdmin],
    orderController.viewAllOrders
  );

  // API for viewing order by id
  app.get(
    "/enajori/api/v1/orders/:orderId",
    [verifyToken],
    orderController.viewOrderById
  );

  // API for updating order to paid
  app.patch(
    "/enajori/api/v1/orders/:orderId/paid",
    [verifyToken],
    orderController.updateOrderToPaid
  );

  // API for updating order to paid
  app.patch(
    "/enajori/api/v1/orders/:orderId/delivered",
    [verifyToken],
    orderController.updateOrderToDelivered
  );
};
