const Wishlist = require("../models/wishlist.model");
const Product = require("../models/product.model");
const Cart = require("../models/cart.model");

// Add item to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    // Finding the product only for user information of the product name. May delete this part.
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: `Product with id ${productId} not found.`,
      });
    }

    const existingItem = await Wishlist.findOne({
      user: userId,
      "items.product": productId,
    });

    if (existingItem) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: `Product ${product.name} already exists in the wishlist.`,
        wishlist: existingItem,
      });
    }

    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $push: { items: { product: productId } } },
      { upsert: true, new: true }
    ).populate("items.product");

    console.log(
      `Product ${product.name} added to wishlist of user ${req.user.userName}.`
    );

    return res.status(201).json({
      success: true,
      status: 201,
      message: `Product ${product.name} added to wishlist.`,
      wishlist,
    });
  } catch (error) {
    console.error(`Error while adding product to wishlist: ${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while adding product to wishlist.",
    });
  }
};

// Remove item from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { product: productId } } },
      { new: true }
    ).populate("items.product");

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        status: 404,
        error: "Wishlist not found.",
      });
    }

    console.log(
      `Product with id ${productId} removed from wishlist of user ${req.user.userName}.`
    );

    return res.status(200).json({
      success: true,
      status: 200,
      message: `Product with id ${productId} removed from wishlist.`,
      wishlist,
    });
  } catch (error) {
    console.error(
      `Error while removing product from wishlist: ${error.message}`
    );
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while removing product from wishlist.",
    });
  }
};

// Get wishlist for a user
const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const wishlist = await Wishlist.findOne({ user: userId }).populate(
      "items.product"
    );

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        status: 404,
        error: "Wishlist not found.",
      });
    }

    return res.status(200).json({
      success: true,
      status: 200,
      wishlist,
    });
  } catch (error) {
    console.error(`Error while retrieving wishlist: ${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while retrieving wishlist.",
    });
  }
};

// Clear wishlist for a user
const clearWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const wishlist = await Wishlist.findOneAndDelete({ user: userId });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        status: 404,
        error: "Wishlist not found.",
      });
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Wishlist cleared successfully.",
    });
  } catch (error) {
    console.error(`Error while clearing wishlist: ${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while clearing wishlist.",
    });
  }
};

// Add item from wishlist to cart
const addItemToCartFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    // Find the product in the wishlist
    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return res.status(404).json({
        success: false,
        status: 404,
        error: "Wishlist not found.",
      });
    }

    const wishlistItem = wishlist.items.find(
      (item) => item.product.toString() === productId
    );

    if (!wishlistItem) {
      return res.status(404).json({
        success: false,
        status: 404,
        error: "Item not found in the wishlist.",
      });
    }

    // Check if the item already exists in the cart
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      // Create a new cart and add the item
      const newCart = new Cart({
        user: userId,
        items: [{ product: productId, quantity: 1 }],
      });
      await newCart.save();
    } else {
      // Check if the item already exists in the cart
      const existingCartItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingCartItem) {
        // Update the quantity of the existing item in the cart
        existingCartItem.quantity += 1;
      } else {
        // Add the new item to the cart
        cart.items.push({ product: productId, quantity: 1 });
      }

      await cart.save();
    }

    // Remove the item from the wishlist
    wishlist.items = wishlist.items.filter(
      (item) => item.product.toString() !== productId
    );
    await wishlist.save();

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Item added to cart from wishlist successfully.",
    });
  } catch (error) {
    console.error(
      `Error while adding item from wishlist to cart: ${error.message}`
    );
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while adding item from wishlist to cart.",
    });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  clearWishlist,
  addItemToCartFromWishlist,
};
