// Import models
const Product = require("../models/product.model");

// Function to save a product
const saveProduct = async (req, res) => {
  try {
    const productCreated = await Product.create(req.body);

    console.log(`Product ${productCreated.name} created.`);

    return res.status(201).json({
      success: true,
      status: 201,
      message: `Product ${productCreated.name} created.`,
      product: productCreated,
    });
  } catch (error) {
    console.error(`Error while creating product: ${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while creating product.",
    });
  }
};

// Function to update a product
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: req.body },
      { new: true }
    );

    console.log(`Product ${updatedProduct.name} updated.`);

    return res.status(200).json({
      success: true,
      status: 200,
      message: `Product ${updatedProduct.name} updated.`,
      product: updatedProduct,
    });
  } catch (error) {
    console.error(`Error while updating product: ${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while updating product.",
    });
  }
};

// Function to view product by id
const viewProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(req.params.productId);

    //  .populate({ path: "reviews.user", model: "User", select: "userName" })
    //  .exec();

    if (!product) {
      return res.status(404).json({
        success: false,
        status: 404,
        error: "Product not found",
      });
    }

    console.log(`Product ${product.name} found.`);

    return res.status(200).json({
      success: true,
      message: `Product ${product.name} found.`,
      status: 200,
      product,
    });
  } catch (error) {
    console.error(`Error while viewing product by ID: ${error}`);
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal Server Error",
    });
  }
};

// Function to view all products
const viewAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate({ path: "reviews.user", model: "User", select: "userName" })
      .exec();

    console.log(
      `${products.length} ${
        products.length == 1 ? "product" : "products"
      } found.`
    );

    return res.status(200).json({
      success: true,
      message: `${products.length} ${
        products.length == 1 ? "product" : "products"
      } found.`,
      status: 200,
      products,
    });
  } catch (error) {
    console.error(`Error while viewing all products: ${error}`);
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal Server Error",
    });
  }
};

// Function to get all product categories
const viewProductCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    return res.status(200).json({
      success: true,
      message: `${categories.length} ${
        categories.length == 1 ? "cateogory" : "cateogories"
      } found.`,
      status: 200,
      categories,
    });
  } catch (err) {
    console.log(`Error while getting product categories: ${err.message}`);
    return res.status(500).send({
      success: false,
      status: 500,
      error: "Internal server error while getting product categories.",
    });
  }
};

// Function to delete product by id
const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        status: 404,
        error: `Product with id ${productId} does not exist.`,
      });
    }
    await product.deleteOne();
    return res.status(200).json({
      success: true,
      status: 200,
      message: `Product ${product.name} has been deleted successfully.`,
    });
  } catch (err) {
    console.log(
      `Error while deleting product with id ${productId}: ${err.message}`
    );
    return res.status(500).send({
      success: false,
      status: 500,
      error: "Internal server error while deleting product.",
    });
  }
};

module.exports = {
  saveProduct,
  updateProduct,
  viewProduct,
  viewAllProducts,
  viewProductCategories,
  deleteProduct,
};
