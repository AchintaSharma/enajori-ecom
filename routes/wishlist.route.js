const wishlistController = require("../controllers/wishlist.controller");
const { verifyToken } = require("../middlewares/authjwt");

module.exports = (app) => {
  // API for clearing the wishlist
  app.post(
    "/enajori/api/v1/wishlist/clear",
    [verifyToken],
    wishlistController.clearWishlist
  );

  // API for adding a product to the wishlist
  app.post(
    "/enajori/api/v1/wishlist/:productId",
    [verifyToken],
    wishlistController.addToWishlist
  );

  // API for removing a product from the wishlist
  app.delete(
    "/enajori/api/v1/wishlist/:productId",
    [verifyToken],
    wishlistController.removeFromWishlist
  );

  // API for getting the wishlist
  app.get(
    "/enajori/api/v1/wishlist",
    [verifyToken],
    wishlistController.getWishlist
  );

  // API for adding an item from the wishlist to the cart
  app.post(
    "/enajori/api/v1/wishlist/:productId/addToCart",
    [verifyToken],
    wishlistController.addItemToCartFromWishlist
  );
};
