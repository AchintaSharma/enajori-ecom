const productController = require("../controllers/product.controller");
const { verifyToken } = require("../middlewares/authjwt");
const { isAdmin } = require("../middlewares/isAdmin");
const {
  validateProductSaveRequestBody,
  validateProductUpdateRequestBody,
} = require("../middlewares/validateProductRequests");

module.exports = (app) => {
  // API for saving a product
  app.post(
    "/enajori/api/v1/products/",
    [verifyToken, isAdmin, validateProductSaveRequestBody],
    productController.saveProduct
  );

  // API for viewing product categories
  app.get(
    "/enajori/api/v1/products/categories/",
    [verifyToken],
    productController.viewProductCategories
  );

  // API for updating product
  app.patch(
    "/enajori/api/v1/products/:productId",
    [verifyToken, isAdmin, validateProductUpdateRequestBody],
    productController.updateProduct
  );

  // API for viewing a product by id
  app.get(
    "/enajori/api/v1/products/:productId",
    [verifyToken],
    productController.viewProduct
  );

  // API for viewing all products
  app.get(
    "/enajori/api/v1/products/",
    [verifyToken],
    productController.viewAllProducts
  );

  // API for deleting a product
  app.delete(
    "/enajori/api/v1/products/:productId",
    [verifyToken, isAdmin],
    productController.deleteProduct
  );
};
