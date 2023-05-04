//Import npm modules
const bcrypt = require("bcryptjs");

//Import models
const User = require("../models/user.model");

//Import configs
const { roles } = require("./constants");
const { salt } = require("../configs/auth.config");

//Init script
module.exports = async () => {
  try {
    const user = await User.findOne({
      role: "Admin",
    });

    if (user) {
      console.log(`Admin user is already present`);
      return;
    } else {
      const admin = await User.create({
        userName: "Achinta Sharma",
        email: "23achinta@gmail.com",
        password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, parseInt(salt)),
        role: roles.admin,
        phone: 0000011111,
      });

      console.log(`Admin user ${admin.userName} created`);
    }
  } catch (err) {
    console.log("Error in DB initialization: ", err.message);
  }
};
