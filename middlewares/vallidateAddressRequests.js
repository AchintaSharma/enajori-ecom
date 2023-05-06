const { isValidPhone } = require("../utils/validators");

const validateAddressCreateRequestBody = async (req, res, next) => {
  const {
    fullName,
    address,
    city,
    state,
    postalCode,
    country,
    phone,
    isDefault,
  } = req.body;

  try {
    // Validate whether full name is provided
    if (!fullName || fullName.trim() === "") {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "fullName",
        error: "Full name is not provided.",
      });
    }

    // Validate whether address is provided
    if (!address || address.trim() === "") {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "address",
        error: "Address is not provided.",
      });
    }

    // Validate whether city is provided
    if (!city || city.trim() === "") {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "city",
        error: "City is not provided.",
      });
    }

    // Validate whether state is provided
    if (!state || state.trim() === "") {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "state",
        error: "State is not provided.",
      });
    }

    // Validate whether postal code is provided
    if (!postalCode || postalCode.trim() === "") {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "postalCode",
        error: "Postal code is not provided.",
      });
    }

    // Validate whether country is provided
    if (!country || country.trim() === "") {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "country",
        error: "Country is not provided.",
      });
    }

    // Validate whether phone number is provided
    if (!phone || phone.trim() === "") {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "phone",
        error: "Phone number is not provided.",
      });
    }

    // Validate phone number format
    if (!isValidPhone(phone)) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "phone",
        error: "Not a valid phone number.",
      });
    }

    // Validate isDefault field
    if (!isDefault) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "isDefault",
        error: "Default address must be provided.",
      });
    }

    // Validate whether isDefault is boolean
    if (typeof isDefault !== "boolean") {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "isDefault",
        error: "The value of isDefault must be boolean",
      });
    }

    //TODO: Check if any other address values are set as default
    next();
  } catch (err) {
    console.log(
      `Error while validating address create request body: ${err.message}`
    );
    return res.status(500).send({
      status: 500,
      success: false,
      error:
        "Internal server error occurred while validating the address update request.",
    });
  }
};

const validateAddressUpdateRequestBody = async (req, res, next) => {
  try {
    const {
      fullName,
      address,
      city,
      state,
      postalCode,
      country,
      phone,
      isDefault,
    } = req.body;

    // Check if any value is provided to update fullName field
    if (fullName !== undefined || fullName.trim() === "") {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "fullName",
        error: "Full name is not provided.",
      });
    }

    // Check if any value is provided to update address field
    if (address !== undefined && address.trim() === "") {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "address",
        error: "Address is not provided.",
      });
    }

    // Check if any value is provided to update city field
    if (city !== undefined && city.trim() === "") {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "city",
        error: "City is not provided.",
      });
    }

    // Check if any value is provided to update state field
    if (state !== undefined && state.trim() === "") {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "state",
        error: "State is not provided.",
      });
    }

    // Check if any value is provided to update postalCode field
    if (postalCode !== undefined && postalCode.trim() === "") {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "postalCode",
        error: "Postal code is not provided.",
      });
    }

    // Check if any value is provided to update country field
    if (country !== undefined && country.trim() === "") {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "country",
        error: "Country is not provided.",
      });
    }

    // Check if any value is provided to update phone field
    if (phone !== undefined && phone.trim() === "") {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "phone",
        error: "Phone number is not provided.",
      });
    }

    // Validate phone number format
    if (!isValidPhone(phone)) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "phone",
        error: "Not a valid phone number.",
      });
    }

    // Validate isDefault field
    if (isDefault && isDefault === "") {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "isDefault",
        error: "Default address must be provided.",
      });
    }

    // Validate whether isDefault is boolean
    if (isDefault && typeof isDefault !== "boolean") {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "isDefault",
        error: "The value of isDefault must be boolean",
      });
    }

    next();
  } catch (err) {
    console.log(
      `Error while validating address update request body: ${err.message}`
    );
    return res.status(500).send({
      status: 500,
      success: false,
      error:
        "Internal server error occurred while validating the address update request.",
    });
  }
};

module.exports = {
  validateAddressCreateRequestBody,
  validateAddressUpdateRequestBody,
};
