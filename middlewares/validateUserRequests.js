const User = require("../models/user.model");

const { isValidEmail, isValidPhone } = require("../utils/validators");
const { roles } = require("../utils/constants");

const validateUserUpdateRequestBody = async (req, res, next) => {
  const { userName, email, phone, role } = req.body;
  console.log(email);
  try {
    // Validate if name field is updated to empty value
    if (userName?.trim() === "") {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "userName",
        error: "User name is not provided.",
      });
    }

    // Validate of email is updated to empty value
    if (email?.trim() === "") {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "email",
        error: "Email is not provided.",
      });
    }

    // Validate whether email is already taken
    const user = await User.findOne({ email: email });

    if (user != null) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "email",
        error: "Email is already taken.",
      });
    }

    // Validate email id format
    if (email && !isValidEmail(email)) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "email",
        error: "Not a valid email id.",
      });
    }

    // Restrict admin creation from the frontend
    if (role && role === roles.admin) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "role",
        error: "Admin cannot be created through this portal.",
      });
    }

    if (role && role !== roles.user) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "role",
        error: "Invalid role.",
      });
    }
    // Validate of email is updated to empty value
    if (phone?.trim() === "") {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "phone",
        error: "Phone is not provided.",
      });
    }

    // Validate whether phone number is provided
    if (!phone) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "phone",
        error: "Phone number is not provided.",
      });
    }

    // Validate phone number format
    if (phone !== undefined && !isValidPhone(phone)) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "phone",
        error: "Not a valid phone number.",
      });
    }

    next();
  } catch (err) {
    console.log(
      `Error while validating user update request body: ${err.message}`
    );
    return res.status(500).send({
      status: 500,
      success: false,
      error:
        "Internal server error occurred while validating the user update request.",
    });
  }
};

module.exports = {
  validateUserUpdateRequestBody,
};
