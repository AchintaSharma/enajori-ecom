const mongoose = require("mongoose");
const { deliveryStatus, logistics } = require("../utils/constants");

const shippingSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    trackingNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [
        deliveryStatus.pending,
        deliveryStatus.shipped,
        deliveryStatus.delivered,
      ],
      default: deliveryStatus.pending,
    },
    estimatedDeliveryDate: {
      type: Date,
    },
    logisticsProvider: {
      type: String,
      required: true,
      default: logistics.default,
    },
    shippingRate: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Shipping", shippingSchema);
