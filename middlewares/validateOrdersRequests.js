const validateCreateOrderRequestBody = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, itemsPrice } = req.body;
    const user = req.user.id;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        status: 400,
        field: "orderItems",
        error: "No order items found.",
      });
    }

    if (!shippingAddress || shippingAddress.trim() === "") {
      return res.status(400).json({
        success: false,
        status: 400,
        field: "shippingAddress",
        error: "Shipping address is not provided.",
      });
    }

    if (
      !itemsPrice ||
      itemsPrice.trim() === "" ||
      typeof itemsPrice != "number"
    ) {
      return res.status(400).json({
        success: false,
        status: 400,
        field: "itemsPrice",
        error: "Items price is not provided or invalid.",
      });
    }

    next();
  } catch (err) {
    console.log(
      `Error while validating create order request body: ${err.message}`
    );
    return res.status(500).send({
      status: 500,
      success: false,
      error:
        "Internal server error occurred while validating the create order request.",
    });
  }
};

module.exports = {
  validateCreateOrderRequestBody,
};
