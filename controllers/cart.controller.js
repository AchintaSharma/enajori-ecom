// Import models
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

// Function to add product to cart
const addToCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity = 1 } = req.body;
    const userId = req.user.id;

    //Finding the product only for user information of name of product. May delete this part
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: true,
        status: 404,
        message: `Product with id ${productId} not found.`,
      });
    }

    const existingCartItem = await Cart.findOne({
      user: userId,
      "items.product": productId,
    });

    let cart;
    if (existingCartItem) {
      // Update quantity of existing item
      const existingItemIndex = existingCartItem.items.findIndex(
        (item) => item.product.toString() === productId
      );
      existingCartItem.items[existingItemIndex].quantity += quantity;
      cart = await existingCartItem.save();
    } else {
      // Add new item to cart
      cart = await Cart.findOneAndUpdate(
        { user: userId },
        { $push: { items: { product: productId, quantity } } },
        { upsert: true, new: true }
      ).populate("items");
    }

    console.log(
      `Product ${product.name} added to cart of user ${req.user.userName}.`
    );

    return res.status(201).json({
      success: true,
      status: 201,
      message: `Product ${product.name} added to cart.`,
      cart,
    });
  } catch (error) {
    console.error(`Error while adding product to cart: ${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while adding product to cart.",
    });
  }
};

// Function to remove product from cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const productExistsInCart = await Cart.findOne({
      user: userId,
      "items.product": productId,
    });

    if (!productExistsInCart) {
      return res.status(404).json({
        success: true,
        status: 404,
        message: `Product with id ${productId} not present in cart.`,
      });
    }

    //Finding the product only for user information of name of product. May delete this part
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: true,
        status: 404,
        message: `Product with id ${productId} not found.`,
      });
    }

    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { product: productId } } },
      { new: true }
    ).populate("items");

    console.log(
      `Product ${product.name} removed from cart of user ${req.user.userName}.`
    );

    return res.status(200).json({
      success: true,
      status: 200,
      message: `Product ${productId} removed from cart.`,
      cart,
    });
  } catch (error) {
    console.error(`Error while removing product from cart: ${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while removing product from cart.",
    });
  }
};

// Function to view cart
const viewCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId }).populate("items");

    if (!cart) {
      return res.status(404).json({
        success: false,
        status: 404,
        error: "Cart is empty",
      });
    }

    console.log(
      `Cart for user ${req.user.userName} found and has ${cart.items.length} items.`
    );

    return res.status(200).json({
      success: true,
      status: 200,
      message: `Cart for user ${req.user.userName} found and has ${cart.items.length} items.`,
      cart,
    });
  } catch (error) {
    console.error(`Error while viewing cart: ${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while viewing cart.",
    });
  }
};

// Function to clear cart
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { products: [] } },
      { new: true }
    );

    console.log(`Cart for user ${req.user.userName} cleared.`);

    return res.status(200).json({
      success: true,
      status: 200,
      message: `Cart for user ${req.user.userName} cleared.`,
      cart,
    });
  } catch (error) {
    console.error(`Error while clearing cart: ${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while clearing cart.",
    });
  }
};

// Function to update cart
const updateCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;

    //Finding the product only for user information of name of product. May delete this part
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: true,
        status: 404,
        message: `Product with id ${productId} not found.`,
      });
    }

    const productExistsInCart = await Cart.findOne({
      user: userId,
      "items.product": productId,
    });

    if (!productExistsInCart) {
      return res.status(404).json({
        success: true,
        status: 404,
        message: `Product with id ${productId} not present in cart.`,
      });
    }

    const cart = await Cart.findOneAndUpdate(
      { user: userId, "items.product": productId },
      { $set: { "items.$.quantity": quantity } },
      { new: true }
    ).populate("items");

    console.log(
      `Product ${product.name} quantity updated to ${quantity} in cart of user ${req.user.userName}.`
    );

    return res.status(200).json({
      success: true,
      status: 200,
      message: `Product ${product.name} quantity updated to ${quantity} in cart.`,
      cart,
    });
  } catch (error) {
    console.error(
      `Error while updating product quantity in cart: ${error.message}`
    );
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while updating product quantity in cart.",
    });
  }
};

// Function to calculate total price of cart
const calculateTotal = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate(
      "products.product"
    );

    if (!cart) {
      return res.status(404).json({
        success: false,
        status: 404,
        error: "Cart not found",
      });
    }

    const totalPrice = cart.products.reduce(
      (acc, product) => acc + product.product.price * product.quantity,
      0
    );

    console.log(`Total price of cart for user ${userId} calculated.`);

    return res.status(200).json({
      success: true,
      status: 200,
      message: `Total price of cart for user ${userId} calculated.`,
      totalPrice,
    });
  } catch (error) {
    console.error(
      `Error while calculating total price of cart: ${error.message}`
    );
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while calculating total price of cart.",
    });
  }
};

// Function to save cart
const saveCart = async (req, res) => {
  try {
    const { userId } = req.user;

    const cart = await Cart.findOne({ user: userId }).populate(
      "products.product"
    );

    if (!cart) {
      return res.status(404).json({
        success: false,
        status: 404,
        error: "Cart not found",
      });
    }

    console.log(`Cart for user ${userId} found.`);

    return res.status(200).json({
      success: true,
      status: 200,
      message: `Cart for user ${userId} found.`,
      cart,
    });
  } catch (error) {
    console.error(`Error while viewing cart: ${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while viewing cart.",
    });
  }
};
module.exports = {
  addToCart,
  removeFromCart,
  viewCart,
  clearCart,
  updateCart,
  calculateTotal,
  saveCart,
};
