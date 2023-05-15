const validateCreatePaymentRequestBody = async (req, res, next) => {
  try {
    const { orderId, paymentMethod, amount } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        status: 400,
        field: "orderId",
        error: "Order id is not provided",
      });
    }

    if (!paymentMethod) {
      return res.status(400).json({
        success: false,
        status: 400,
        field: "paymentMethod",
        error: "Payment method is not provided",
      });
    }
    if (!amount || typeof amount !== "number" || amount.trim() === "") {
      return res.status(400).json({
        success: false,
        status: 400,
        field: "amount",
        error: "Amount is not provided",
      });
    }
    next();
  } catch (err) {
    console.log(`Error while validating payment request body: ${err.message}`);
    return res.status(500).send({
      status: 500,
      success: false,
      error: "Internal server error occurred while validating payment request.",
    });
  }
};

module.exports = {
  validateCreatePaymentRequestBody,
};
