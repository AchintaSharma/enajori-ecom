const authController = require("../controllers/auth.controller");
const {
  validateSignUpRequestBody,
  validateLoginRequestBody,
} = require("../middlewares/validateAuthRequests");

module.exports = (app) => {
  // API for user sign up
  app.post(
    "/enajori/api/v1/auth/signup",
    [validateSignUpRequestBody],
    authController.signUp
  );

  // API for user login
  app.post(
    "/enajori/api/v1/auth/login",
    [validateLoginRequestBody],
    authController.login
  );
};
