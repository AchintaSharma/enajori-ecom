const productController = require("../controllers/product.controller");
const { verifyToken } = require("../middlewares/authjwt");
const { isAdmin } = require("../middlewares/isAdmin");
const {
  validateProductSaveRequestBody,
  validateProductUpdateRequestBody,
} = require("../middlewares/validateProductRequests");

module.exports = (app) => {
  app.post(
    "/enajori/api/v1/products/",
    [verifyToken, isAdmin, validateProductSaveRequestBody],
    productController.saveProduct
  );
  app.get(
    "/enajori/api/v1/products/categories/",
    [verifyToken, isAdmin],
    productController.viewProductCategories
  );
  app.patch(
    "/enajori/api/v1/products/:productId",
    [verifyToken, isAdmin, validateProductUpdateRequestBody],
    productController.updateProduct
  );
  app.get(
    "/enajori/api/v1/products/:productId",
    [verifyToken, isAdmin],
    productController.viewProduct
  );
  app.get(
    "/enajori/api/v1/products/",
    [verifyToken, isAdmin],
    productController.viewAllProducts
  );
  app.delete(
    "/enajori/api/v1/products/:productId",
    [verifyToken, isAdmin],
    productController.deleteProduct
  );
};
