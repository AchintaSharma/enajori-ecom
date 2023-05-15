const validateAddOrUpdateToCartRequestBody = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        status: 400,
        field: "productId",
        message: `Product id is not provided in params.`,
      });
    }

    if (!quantity || quantity == 0) {
      return res.status(400).json({
        success: false,
        status: 400,
        field: "quantity",
        message: `Quantity must be provided.`,
      });
    }

    next();
  } catch (err) {
    console.log(
      `Error while validating product save request body: ${err.message}`
    );
    return res.status(500).send({
      status: 500,
      success: false,
      error:
        "Internal server error occurred while validating the product save request.",
    });
  }
};

module.exports = {
  validateAddOrUpdateToCartRequestBody,
};
