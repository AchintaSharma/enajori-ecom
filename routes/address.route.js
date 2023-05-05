const addressController = require("../controllers/address.controller");
const { verifyToken } = require("../middlewares/authjwt");

module.exports = (app) => {
  app.post(
    "/enajori/api/v1/addresses",
    [verifyToken],
    addressController.createAddress
  );

  app.get(
    "/enajori/api/v1/addresses",
    [verifyToken],
    addressController.viewAddresses
  );

  app.patch(
    "/enajori/api/v1/addresses/:addressId",
    [verifyToken],
    addressController.updateAddress
  );

  app.delete(
    "/enajori/api/v1/addresses/:addressId",
    [verifyToken],
    addressController.deleteAddress
  );
};
