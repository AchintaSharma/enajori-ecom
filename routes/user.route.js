const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/authjwt");
const { isAdmin } = require("../middlewares/isAdmin");
module.exports = (app) => {
  app.get(
    "/enajori/api/v1/users",
    [verifyToken, isAdmin],
    userController.viewAllUsers
  );

  app.get("/enajori/api/v1/users/:id", [verifyToken], userController.viewUser);

  app.patch(
    "/enajori/api/v1/users/:id",
    [verifyToken],
    userController.updateUser
  );

  app.delete(
    "/enajori/api/v1/users/:id",
    [verifyToken],
    userController.deleteUser
  );
};
