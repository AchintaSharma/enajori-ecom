// Import models
const Address = require("../models/address.model");
const User = require("../models/user.model");

// Function to create address
const createAddress = async (req, res) => {
  const userId = req.user.id;
  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.status(404).send({
      success: false,
      status: 404,
      error: `User does not exist.`,
    });
  }
  try {
    const addressCreated = await Address.create({
      ...req.body,
      user: user._id,
    });

    // Store address id in user's addresses array
    user.addresses.push(addressCreated._id);
    await user.save();

    console.log(`Address for user ${user.userName} created.`);

    return res.status(201).json({
      success: true,
      status: 201,
      message: `Address for user ${user.userName} created.`,
      address: addressCreated,
    });
  } catch (err) {
    console.log(`Error while creating address : ${err.message}`);
    return res.status(500).send({
      success: false,
      status: 500,
      error: "Internal server error while creating address.",
    });
  }
};

// Function to view user's addresses
const viewAddresses = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).populate("addresses");

    if (!user) {
      return res.status(404).send({
        success: false,
        status: 404,
        error: `User does not exist.`,
      });
    }

    console.log(
      `${user.addresses.length} ${
        user.addresses.length == 1 ? "address" : "addresses"
      } found for user ${user.userName}.`
    );

    return res.status(200).json({
      success: true,
      status: 200,
      message: `${user.addresses.length} ${
        user.addresses.length == 1 ? "address" : "addresses"
      } found for user ${user.userName}.`,
      addresses: user.addresses,
    });
  } catch (err) {
    console.log(`Error while fetching addresses: ${err.message}`);
    return res.status(500).send({
      success: false,
      status: 500,
      error: "Internal server error while fetching addresses.",
    });
  }
};

//  Function to update an existing address
const updateAddress = async (req, res) => {
  const { addressId } = req.params;
  const userId = req.user.id;

  try {
    const updatedAddress = await Address.findOneAndUpdate(
      { _id: addressId, user: userId },
      { $set: req.body },
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({
        success: false,
        status: 404,
        error: "Address not found or does not belong to user.",
      });
    }

    console.log(`Address updated successfully.`);

    return res.status(200).json({
      success: true,
      status: 200,
      message: `Address updated successfully.`,
      address: updatedAddress,
    });
  } catch (err) {
    console.log(`Error while updating address : ${err.message}`);
    return res.status(500).send({
      success: false,
      status: 500,
      error: "Internal server error while updating address.",
    });
  }
};

//  Function to delete an existing address
const deleteAddress = async (req, res) => {
  const { addressId } = req.params;
  const userId = req.user.id;

  try {
    const deletedAddress = await Address.findOneAndDelete({
      _id: addressId,
      user: userId,
    });

    if (!deletedAddress) {
      return res.status(404).json({
        success: false,
        status: 404,
        error: "Address not found or does not belong to user.",
      });
    }

    //  Remove the deleted address's ID from the user's addresses array
    const user = await User.findOne({ _id: userId });
    user.addresses = user.addresses.filter(
      (id) => id.toString() !== addressId.toString()
    );
    await user.save();

    console.log(`Address deleted successfully.`);

    return res.status(200).json({
      success: true,
      status: 200,
      message: `Address deleted successfully.`,
      address: deletedAddress,
    });
  } catch (err) {
    console.log(`Error while deleting address: ${err.message}`);
    return res.status(500).send({
      success: false,
      status: 500,
      error: "Internal server error while deleting address.",
    });
  }
};

module.exports = {
  createAddress,
  viewAddresses,
  updateAddress,
  deleteAddress,
};
