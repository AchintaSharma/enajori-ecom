const shippingController = require("../controllers/shipping.controller");
const { verifyToken } = require("../middlewares/authjwt");
const {
  validateCreateShippingRequestBody,
  validateGetShippingRequestParams,
} = require("../middlewares/validateShippingRequests");

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
    [verifyToken, validateCreateShippingRequestBody],
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
    [verifyToken, validateGetShippingRequestParams],
    shippingController.getShipping
  );

  // API for updating shipping status
  app.patch(
    "/enajori/api/v1/shipping/:shippingId/status",
    [verifyToken],
    shippingController.updateShippingStatus
  );
};
