const User = require("../models/user.model");
const { roles } = require("../utils/constants");
const {
  isValidEmail,
  isValidPassword,
  isValidPhone,
} = require("../utils/validators");

// Function to validate user's signup data
const validateSignUpRequestBody = async (req, res, next) => {
  try {
    // Validate whether name is provided
    if (!req.body.userName) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "userName",
        error: "User name is not provided.",
      });
    }

    // Validate whether email is provided
    if (!req.body.email) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "email",
        error: "Email is not provided.",
      });
    }

    // Validate whether email is already taken
    const user = await User.findOne({ email: req.body.email });

    if (user != null) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "email",
        error: "Email is already taken.",
      });
    }

    // Validate email id foramt
    if (req.body.email && !isValidEmail(req.body.email)) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "email",
        error: "Not a valid email id.",
      });
    }

    // Validate whether password is provided
    if (!req.body.password) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "password",
        error: "Password is not provided.",
      });
    }

    // Validate password format
    if (req.body.password && !isValidPassword(req.body.password)) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "password",
        error:
          "Not a valid password. Password must be 10 to 25 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.",
      });
    }

    // Restrict admin creation from the frontend
    if (req.body.role && req.body.role === roles.admin) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "role",
        error: "Admin cannot be created through this portal.",
      });
    }

    // Validate whether phone number is provided
    if (!req.body.phone) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "phone",
        error: "Phone number is not provided.",
      });
    }

    // Validate phone number format
    if (req.body.phone && !isValidPhone(req.body.phone)) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "phone",
        error: "Not a valid phone number.",
      });
    }

    next();
  } catch (err) {
    console.log(`Error while validating sign-up request body: ${err.message}`);
    return res.status(500).send({
      status: 500,
      success: false,
      error:
        "Internal server error occurred while validating the sign-up request.",
    });
  }
};

const validateLoginRequestBody = (req, res, next) => {
  // Validate whether email is provided
  if (!req.body.email) {
    return res.status(400).send({
      success: false,
      status: 400,
      error: "Email Id is not provided",
      field: "email",
    });
  }

  // Validate whether password is provided
  if (!req.body.password) {
    return res.status(400).send({
      success: false,
      status: 400,
      error: "Password is not provided",
      field: "password",
    });
  }

  next();
};

module.exports = {
  validateSignUpRequestBody,
  validateLoginRequestBody,
};
