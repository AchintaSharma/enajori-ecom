const validateCreateShippingRequestBody = async (req, res, next) => {
  try {
    const { orderId, addressId, trackingNumber, shippingRate } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        status: 400,
        field: "orderId",
        message: "Order id is not provided.",
      });
    }

    if (!addressId) {
      return res.status(400).json({
        success: false,
        status: 400,
        field: "addressId",
        message: "Address id is not provided.",
      });
    }

    if (!trackingNumber) {
      return res.status(400).json({
        success: false,
        status: 400,
        field: "trackingNumber",
        message: "Tracking number is not provided.",
      });
    }

    if (!shippingRate) {
      return res.status(400).json({
        success: false,
        status: 400,
        field: "shippingRate",
        message: "Shipping rate is not provided.",
      });
    }

    next();
  } catch (error) {
    console.error(
      `Error while validating create shipping request body: ${error.message}`
    );
    return res.status(500).json({
      success: false,
      status: 500,
      error:
        "Internal server error occurred while validating create shipping request.",
    });
  }
};

const validateGetShippingRequestParams = async (req, res, next) => {
  try {
    const { shippingId } = req.params;

    if (!shippingId) {
      return res.status(400).json({
        success: false,
        status: 400,
        field: "shippingId",
        message: "Shipping ID is not provided in params.",
      });
    }

    next();
  } catch (error) {
    console.error(
      `Error while validating get shipping request params: ${error.message}`
    );
    return res.status(500).json({
      success: false,
      status: 500,
      error:
        "Internal server error occurred while validating get shipping request params.",
    });
  }
};

module.exports = {
  validateCreateShippingRequestBody,
  validateGetShippingRequestParams,
};
