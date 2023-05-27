const Support = require("../models/support.model");
const nodemailer = require("nodemailer");

const { gmailId, gmailPassword } = require("../configs/app.config");
const { ticketStatus } = require("../utils/constants");

// Configure your Gmail SMTP settings
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // true for 465, false for other ports
  auth: {
    user: gmailId, // Your Gmail email address
    pass: gmailPassword, // Your Gmail password
  },
  secure: true,
});

// Controller to create a support ticket
const createSupportTicket = async (req, res) => {
  try {
    const { customerId, email, orderId, subject, description } = req.body;

    // Create a new support ticket
    const supportTicketCreated = await Support.create({
      customerId,
      email,
      orderId,
      subject,
      description,
      status: ticketStatus.open,
    });

    // Send automated response email to the customer
    const mailOptions = {
      from: gmailId, // Your Gmail email address
      to: supportTicketCreated.email, // Customer's email address
      subject: "Support Ticket Created",
      text: `Thank you for reaching out. We have received your support ticket and will respond to you shortly. 
      Your ticket id is ${supportTicketCreated._id}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      success: true,
      status: 201,
      message: "Support ticket created successfully.",
      supportTicketCreated,
    });
  } catch (error) {
    console.error(`Error while creating support ticket: ${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while creating support ticket.",
    });
  }
};

// Controller to view all support tickets
const getAllSupportTickets = async (req, res) => {
  try {
    // Fetch all support tickets from the database
    const supportTickets = await Support.find();

    return res.status(200).json({
      success: true,
      status: 200,
      count: supportTickets.length,
      supportTickets,
    });
  } catch (error) {
    console.error(`Error while retrieving support tickets: ${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while retrieving support tickets.",
    });
  }
};

// Controller to view support ticket by id
const getSupportTicketById = async (req, res) => {
  try {
    const { ticketId } = req.params;

    // Find the support ticket by ID
    const supportTicket = await Support.findById(ticketId);

    if (!supportTicket) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: `Support ticket with ID ${ticketId} not found.`,
      });
    }

    return res.status(200).json({
      success: true,
      status: 200,
      supportTicket,
    });
  } catch (error) {
    console.error(`Error while retrieving support ticket: ${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while retrieving support ticket.",
    });
  }
};

// Controller to update ticket status of a particular ticket
const updateSupportTicketStatus = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { status } = req.body;

    // Find the support ticket by ID
    const supportTicket = await Support.findById(ticketId);

    if (!supportTicket) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: `Support ticket with ID ${ticketId} not found.`,
      });
    }

    // Update the status of the support ticket
    supportTicket.status = status;
    await supportTicket.save();

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Support ticket status updated successfully.",
      supportTicket,
    });
  } catch (error) {
    console.error(
      `Error while updating support ticket status: ${error.message}`
    );
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while updating support ticket status.",
    });
  }
};

// Controller to send email to customer
const sendEmailToCustomer = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { emailSubject, emailBody } = req.body;

    // Find the support ticket by ID
    const supportTicket = await Support.findById(ticketId);

    if (!supportTicket) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: `Support ticket with ID ${ticketId} not found.`,
      });
    }

    // Send an email to the customer
    const mailOptions = {
      from: gmailId, // Your Gmail email address
      to: supportTicket.email, // Customer's email address
      subject: emailSubject,
      text: `You have a support message update for the ticket ${supportTicket._id}: ${emailBody} `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Email sent to customer successfully.",
    });
  } catch (error) {
    console.error(`Error while sending email to customer: ${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error while sending email to customer.",
    });
  }
};

// Controller to delete a support
const deleteSupportTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;

    // Find the support by ID
    const support = await Support.findById(ticketId);

    if (!support) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: `Support with ID ${ticketId} not found.`,
      });
    }

    // Delete the support
    await support.deleteOne();

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Support deleted successfully.",
    });
  } catch (error) {
    console.error(`Error while deleting support: ${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Internal server error while deleting support.",
    });
  }
};

module.exports = {
  createSupportTicket,
  getAllSupportTickets,
  getSupportTicketById,
  updateSupportTicketStatus,
  sendEmailToCustomer,
  deleteSupportTicket,
};
