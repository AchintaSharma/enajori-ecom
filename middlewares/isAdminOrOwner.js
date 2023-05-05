const { roles } = require("../utils/constants");

const isAdminOrOwner = (req, res, next) => {
  // Allow only admin or the owner to perform the current action
  const userId = req.params.id;
  const isAdmin = req.user.role == roles.admin;
  const isUserAccountOwner = userId == req.user.id;

  if (!isAdmin && !isUserAccountOwner) {
    return res.status(400).send({
      success: false,
      status: 400,
      error: "Only the admin or the account owner can perform this action.",
    });
  }
  next();
};

module.exports = {
  isAdminOrOwner,
};
