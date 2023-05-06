const validateProductSaveRequestBody = async (req, res, next) => {
  const { name, description, price, images, category, quantity } = req.body;

  try {
    // Validate whether name is provided
    if (!name || name.trim() === "") {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "name",
        error: "Product name is not provided.",
      });
    }

    // Validate whether description is provided
    if (!description || description.trim() === "") {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "description",
        error: "Product description is not provided.",
      });
    }

    // Validate whether price is provided and is a positive number
    if (!price || typeof price !== "number" || price <= 0) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "price",
        error: "Product price is not provided or is not a positive number.",
      });
    }

    // Validate whether images is provided and is an array
    if (!images || images.length === 0 || !Array.isArray(images)) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "images",
        error: "Product images are not provided or is not an array.",
      });
    }

    // Validate whether category is provided
    if (!category || category.trim() === "") {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "category",
        error: "Product category is not provided.",
      });
    }

    // Validate whether quantity is provided and is a positive integer
    if (!quantity || typeof quantity !== "number" || quantity <= 0) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "quantity",
        error: "Product quantity is not provided or is not a positive integer.",
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

const validateProductUpdateRequestBody = async (req, res, next) => {
  try {
    const { name, description, price, category, quantity, images } = req.body;

    // Check if name is updated with valid value
    if (name != undefined && name.trim() === "") {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "name",
        error: "Name is not provided.",
      });
    }

    // Check if description updated with valid value
    if (description != undefined && description.trim() === "") {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "description",
        error: "Description is not provided.",
      });
    }

    // Check if price is updated with positive integer
    if (price != undefined && (typeof price !== "number" || price <= 0)) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "price",
        error: "Price is not provided or is invalid.",
      });
    }

    // Check if category is updated with valid value
    if (category != undefined && category.trim() === "") {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "category",
        error: "Category is not provided.",
      });
    }

    // Check if quantity is updated with a positive integer
    if (
      quantity != undefined &&
      (typeof quantity !== "number" || quantity <= 0)
    ) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "quantity",
        error: "Quantity is not provided or is invalid.",
      });
    }

    // Check if images are updated and is an array
    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "images",
        error: "Images are not provided or are invalid.",
      });
    }

    next();
  } catch (err) {
    console.log(`Error while validating product request body: ${err.message}`);
    return res.status(500).send({
      status: 500,
      success: false,
      error:
        "Internal server error occurred while validating the product request.",
    });
  }
};

module.exports = {
  validateProductSaveRequestBody,
  validateProductUpdateRequestBody,
};
