const authController = require("../controllers/auth.controller");
// const {
//   validateSignUpRequestBody,
//   validateLoginRequestBody,
// } = require("../middlewares/validateAuthRequests");

module.exports = (app) => {
  app.post("/enajori/api/v1/auth/signup", authController.signUp);

  app.post("/enajori/api/v1/auth/login", authController.login);
};
