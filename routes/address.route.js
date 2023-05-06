const addressController = require("../controllers/address.controller");
const { verifyToken } = require("../middlewares/authjwt");
const {
  validateAddressCreateRequestBody,
  validateAddressUpdateRequestBody,
} = require("../middlewares/vallidateAddressRequests");

module.exports = (app) => {
  app.post(
    "/enajori/api/v1/addresses",
    [verifyToken, validateAddressCreateRequestBody],
    addressController.createAddress
  );

  app.get(
    "/enajori/api/v1/addresses",
    [verifyToken],
    addressController.viewAddresses
  );

  app.patch(
    "/enajori/api/v1/addresses/:addressId",
    [verifyToken, validateAddressUpdateRequestBody],
    addressController.updateAddress
  );

  app.delete(
    "/enajori/api/v1/addresses/:addressId",
    [verifyToken],
    addressController.deleteAddress
  );
};

//TODO: how to apply is admin or owner to address routes
