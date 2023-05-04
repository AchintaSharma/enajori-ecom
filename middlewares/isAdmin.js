const { roles } = require("../utils/constants");

const isAdmin = (req, res, next) => {
  const user = req.user;

  if (user && user.role == roles.admin) {
    next();
  } else {
    return res.status(200).send({
      message: "Only Admin user is allowed to access this endpoint!",
    });
  }
};

module.exports = {
  isAdmin,
};
