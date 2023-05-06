const cartController = require("../controllers/cart.controller");
const { verifyToken } = require("../middlewares/authjwt");

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
    [verifyToken],
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
    [verifyToken],
    cartController.updateCart
  );
};
