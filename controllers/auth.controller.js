// Import npm modules
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Import configs
const authConfig = require("../configs/auth.config");
const { salt, jwtExpiryTime } = require("../configs/auth.config");

// Import models
const User = require("../models/user.model");

//  Function for admin signup
const signUp = async (req, res) => {
  const { userName, email, password, phone } = req.body;
  // Encrypt password
  const hashedPassword = bcrypt.hashSync(password, parseInt(salt));
  //  Fetch and store user data in user object
  const userObj = {
    userName,
    email,
    password: hashedPassword,
    phone,
  };

  //  Create user
  try {
    const userCreated = await User.create(userObj);

    const { password, ...userWithoutPassword } = userCreated.toObject();

    console.log(
      `${userWithoutPassword.role} ${userWithoutPassword.userName} created. `
    );

    // Issue jwt token and add user name and email to payload
    const token = jwt.sign(
      {
        name: userCreated.name,
        email: userCreated.email,
        purpose: "authentication",
      },
      authConfig.secret,
      { expiresIn: jwtExpiryTime }
    );

    return res.status(201).send({
      status: 201,
      success: true,
      message: `${userWithoutPassword.role} ${userWithoutPassword.userName} registered.`,
      accessToken: token,
      user: userWithoutPassword,
    });
  } catch (err) {
    console.log("Error while creating user: ", err.message);
    return res.status(500).send({
      status: 500,
      success: false,
      error: "Internal server error while registering Admin user.",
    });
  }
};

// Function for user login
const login = async (req, res) => {
  //  Fetch user and verify password
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(404).send({
        status: 404,
        success: false,
        field: "email",
        message: "User does not exist.",
      });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        status: 401,
        success: false,
        field: "password",
        message: "Wrong password.",
      });
    }

    //  Issue jwt token and add user name and email to payload
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        purpose: "authentication",
      },
      authConfig.secret,
      { expiresIn: jwtExpiryTime }
    );
    console.log(`${user.role} ${user.userName} successfully logged in. `);

    const response = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      accessToken: token,
    };

    return res.status(200).send({
      status: 200,
      success: true,
      user: response,
    });
  } catch (err) {
    console.log("Error during user login: ", err.message);
    return res.status(500).send({
      status: 500,
      success: false,
      error: "Internal server error during user login.",
    });
  }
};

module.exports = {
  signUp,
  login,
};
