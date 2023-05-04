//Import npm modules
const bcrypt = require("bcryptjs");

//Import models & constans
const User = require("../models/user.model");
const { roles } = require("../utils/constants");

// Function for viewing user by id
const viewUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send({
        success: false,
        status: 404,
        error: `No User found for id - ${req.params.id}.`,
        field: "req.params.id",
      });
    }

    const { password, ...userWithoutPassword } = user.toObject();

    return res.status(200).send({
      success: true,
      status: 200,
      message: `User ${user.userName} found.`,
      user: userWithoutPassword,
    });
  } catch (err) {
    console.log(`Error while fetching user:, ${err.message}`);
    return res.status(500).send({
      success: false,
      status: 500,
      error: "Internal server error occurred while fetching the user.",
    });
  }
};

// Function for viewing all user
const viewAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(404).send({
        success: false,
        status: 404,
        error: `No Users found`,
      });
    }

    if (users.length === 1 && users[0].role === roles.admin) {
      return res.status(200).send({
        success: true,
        status: 200,
        message: "Admin user is the only user in the system.",
        adminData: {
          id: users[0]._id,
          userName: users[0].userName,
          email: users[0].email,
          role: users[0].role,
          phone: users[0].phone,
          createdAt: users[0].createdAt,
        },
      });
    }

    const userResult = users.map((user) => ({
      id: user._id,
      userName: user.userName,
      email: user.email,
      phone: user.phone,
      addresses: user.addresses,
      orders: user.orders,
      createdAt: user.createdAt,
    }));

    return res.status(200).send({
      success: true,
      status: 200,
      message: `Successfully fetched ${userResult.length} users.`,
      users: userResult,
    });
  } catch (err) {
    console.log(`Error while fetching users:, ${err.message}`);
    return res.status(500).send({
      success: false,
      status: 500,
      error: "Internal server error occurred while fetching users.",
    });
  }
};

// Function for updating an user
const updateUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).send({
        success: false,
        status: 404,
        message: `User not found for id - ${userId}.`,
        field: "req.params.id",
      });
    }

    user.userName = req.body.userName || user.userName;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;

    const updatedUser = await user.save();

    return res.status(200).send({
      success: true,
      status: 200,
      message: "User data updated successfully.",
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        addresses: user.addresses,
        orders: user.orders,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (err) {
    console.log(`Error while updating user's data: ${err.message}`);
    return res.status(500).send({
      success: false,
      status: 500,
      error: "Internal server error while updating user data.",
    });
  }
};

// Function for deleting an user
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  //Allow only admin or the owner to delete account
  const isAdmin = req.user.role == roles.admin;
  const isUserAccountOwner = userId == req.user.id;
  console.log(
    `isAdmin: ${isAdmin} , isUSerAccountOwner: ${isUserAccountOwner}`
  );
  if (!isAdmin && !isUserAccountOwner) {
    return res.status(400).send({
      success: false,
      status: 400,
      error: "Only the admin or the account owner can delete this account.",
    });
  }

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send({
        success: false,
        status: 404,
        error: `User not found for id - ${userId}.`,
        field: "req.params.id",
      });
    }

    if (user.role === roles.admin) {
      return res.status(400).send({
        success: false,
        status: 400,
        error: `Admin cannot be deleted`,
        field: "req.params.id",
      });
    }

    const deletedUser = await user.deleteOne();
    return res.status(200).send({
      success: true,
      status: 200,
      message: `User ${deletedUser.userName} deleted successfully.`,
    });
  } catch (err) {
    console.log(`Error while deleting user: ${err.message}`);
    return res.status(500).send({
      success: false,
      status: 500,
      error: "Internal server error",
    });
  }
};

module.exports = {
  viewUser,
  viewAllUsers,
  updateUser,
  deleteUser,
};
