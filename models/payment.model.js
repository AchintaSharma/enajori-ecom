const mongoose = require("mongoose");
const { paymentMethods } = require("../utils/constants");
// Create payment schema
const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: [paymentMethods.stripe, paymentMethods.cod],
    },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Payment", paymentSchema);
