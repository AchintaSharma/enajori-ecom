const mongoose = require("mongoose");
const { ticketStatus } = require("../utils/constants");

const customerSupportSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [ticketStatus.open, ticketStatus.closed, ticketStatus.blocked],
      default: ticketStatus.open,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // comments: [
    //   {
    //     author: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "User",
    //       required: true,
    //     },
    //     content: {
    //       type: String,
    //       required: true,
    //     },
    //     createdAt: {
    //       type: Date,
    //       default: Date.now,
    //     },
    //   },
    // ],
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("SupportTicket", customerSupportSchema);
