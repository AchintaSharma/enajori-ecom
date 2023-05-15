const cartController = require("../controllers/cart.controller");
const { verifyToken } = require("../middlewares/authjwt");
const {
  validateAddOrUpdateToCartRequestBody,
} = require("../middlewares/validateCartRequests");

module.exports = (app) => {
  // API for clearing the cart
  app.post(
    "/enajori/api/v1/cart/clear",
    [verifyToken],
    cartController.clearCart
  );

  // API for adding a product to cart
  app.post(
    "/enajori/api/v1/cart/:productId",
    [verifyToken, validateAddOrUpdateToCartRequestBody],
    cartController.addToCart
  );

  // API for viewing cart
  app.get("/enajori/api/v1/cart", [verifyToken], cartController.viewCart);

  // API for removing a product to cart
  app.delete(
    "/enajori/api/v1/cart/:productId",
    [verifyToken],
    cartController.removeFromCart
  );

  // API for updating the cart
  app.patch(
    "/enajori/api/v1/cart/update/:productId",
    [verifyToken, validateAddOrUpdateToCartRequestBody],
    cartController.updateCart
  );

  // API for calculating total price of cart items
  app.post(
    "/enajori/api/v1/cartAmount",
    [verifyToken],
    cartController.calculateTotal
  );
};
