const validateWishlistRequestBody = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        success: false,
        status: 400,
        field: "productId",
        message: "Product id is not provided in params.",
      });
    }

    next();
  } catch (error) {
    console.error(
      `Error while validating wishlist request body: ${error.message}`
    );
    return res.status(500).json({
      success: false,
      status: 500,
      error:
        "Internal server error occurred while validating wishlist request.",
    });
  }
};

module.exports = {
  validateWishlistRequestBody,
};
