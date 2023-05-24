const shippingController = require("../controllers/shipping.controller");
const { verifyToken } = require("../middlewares/authjwt");

module.exports = (app) => {
  // API for calculating shipping rate
  app.post(
    "/enajori/api/v1/shipping/calculateRate",
    [verifyToken],
    shippingController.calculateShippingRate
  );

  // API for creating shipping
  app.post(
    "/enajori/api/v1/shipping",
    [verifyToken],
    shippingController.createShipping
  );

  // API for estimating delivery date
  app.get(
    "/enajori/api/v1/shipping/estimateDeliveryDate",
    [verifyToken],
    shippingController.getEstimatedDeliveryDate
  );

  // API for getting shipping details
  app.get(
    "/enajori/api/v1/shipping/:shippingId",
    [verifyToken],
    shippingController.getShipping
  );

  // API for updating shipping status
  app.patch(
    "/enajori/api/v1/shipping/:shippingId/status",
    [verifyToken],
    shippingController.updateShippingStatus
  );
};
