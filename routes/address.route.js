const addressController = require("../controllers/address.controller");
const { verifyToken } = require("../middlewares/authjwt");
const {
  validateAddressCreateRequestBody,
  validateAddressUpdateRequestBody,
} = require("../middlewares/vallidateAddressRequests");

module.exports = (app) => {
  // API for creating address
  app.post(
    "/enajori/api/v1/addresses",
    [verifyToken, validateAddressCreateRequestBody],
    addressController.createAddress
  );

  // API for viewing addresses
  app.get(
    "/enajori/api/v1/addresses",
    [verifyToken],
    addressController.viewAddresses
  );

  // API for updating address
  app.patch(
    "/enajori/api/v1/addresses/:addressId",
    [verifyToken, validateAddressUpdateRequestBody],
    addressController.updateAddress
  );

  // API for deleting address
  app.delete(
    "/enajori/api/v1/addresses/:addressId",
    [verifyToken],
    addressController.deleteAddress
  );
};

//TODO: how to apply is admin or owner to address routes
