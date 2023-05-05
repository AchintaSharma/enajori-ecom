const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/authjwt");
const { isAdmin } = require("../middlewares/isAdmin");
const { isAdminOrOwner } = require("../middlewares/isAdminOrOwner");
const {
  validateUserUpdateRequestBody,
} = require("../middlewares/validateUserRequests");

module.exports = (app) => {
  // API for viewing all users
  app.get(
    "/enajori/api/v1/users",
    [verifyToken, isAdmin],
    userController.viewAllUsers
  );

  // API for viewing user by id
  app.get(
    "/enajori/api/v1/users/:id",
    [verifyToken, isAdminOrOwner],
    userController.viewUser
  );

  // API for updating user
  app.patch(
    "/enajori/api/v1/users/:id",
    [verifyToken, isAdminOrOwner, validateUserUpdateRequestBody],
    userController.updateUser
  );

  // API for deleting user
  app.delete(
    "/enajori/api/v1/users/:id",
    [verifyToken, isAdminOrOwner],
    userController.deleteUser
  );
};
