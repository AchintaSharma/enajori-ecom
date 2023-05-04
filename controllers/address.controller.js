//Import models
const Address = require("../models/address.model");
const User = require("../models/user.model");

//Function to create address
const createAddress = async (req, res) => {
  const { userId } = req.user;
  const {
    fullName,
    address,
    landmark,
    city,
    state,
    postalCode,
    country,
    phone,
    isDefault,
  } = req.body;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.status(400).send({
      success: false,
      status: 400,
      error: `User does not exist.`,
    });
  }
  try {
    const addressCreated = Address.create({
      fullName,
      address,
      landmark,
      city,
      state,
      postalCode,
      country,
      phone,
      isDefault,
      user: user._id,
    });

    return res.status(201).json({
      success: true,
      status: 201,
      message: `Address for user ${user.fullName} created.`,
      address: addressCreated,
    });
  } catch (err) {
    console.log("Error while creating address\n", err.message);
    return res.status(500).send({
      success: false,
      status: 500,
      error: "Internal server error while creating address.",
    });
  }
};
