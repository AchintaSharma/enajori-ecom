const validateCreateSupportTicketFields = async (req, res, next) => {
  try {
    const { customerId, email, subject, description } = req.body;

    if (!customerId) {
      return res.status(400).json({
        success: false,
        status: 400,
        field: "customerId",
        message: "Customer ID is required.",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        status: 400,
        field: "email",
        message: "Email is required.",
      });
    }

    if (!subject) {
      return res.status(400).json({
        success: false,
        status: 400,
        field: "subject",
        message: "Subject is required.",
      });
    }

    if (!description) {
      return res.status(400).json({
        success: false,
        status: 400,
        field: "description",
        message: "Description is required.",
      });
    }

    next();
  } catch (error) {
    console.error(
      `Error while validating create support ticket fields: ${error.message}`
    );
    return res.status(500).json({
      success: false,
      status: 500,
      error:
        "Internal server error occurred while validating create support ticket fields.",
    });
  }
};

const validateUpdateSupportTicketStatus = async (req, res, next) => {
  try {
    const { ticketId } = req.params;
    const { status } = req.body;

    if (!ticketId) {
      return res.status(400).json({
        success: false,
        status: 400,
        field: "ticketId",
        message: "Ticket ID is required.",
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        status: 400,
        field: "status",
        message: "Status is required.",
      });
    }

    next();
  } catch (error) {
    console.error(
      `Error while validating update support ticket status: ${error.message}`
    );
    return res.status(500).json({
      success: false,
      status: 500,
      error:
        "Internal server error occurred while validating update support ticket status.",
    });
  }
};

const validateTicketIdParam = async (req, res, next) => {
  try {
    const { ticketId } = req.params;

    if (!ticketId) {
      return res.status(400).json({
        success: false,
        status: 400,
        field: "ticketId",
        message: "Ticket ID is not provided in params.",
      });
    }

    next();
  } catch (error) {
    console.error(`Error while validating ticket ID param: ${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Internal server error occurred while validating ticket ID param.",
    });
  }
};

const validateSendEmailToCustomer = async (req, res, next) => {
  try {
    const { ticketId } = req.params;
    const { emailSubject, emailBody } = req.body;

    if (!ticketId) {
      return res.status(400).json({
        success: false,
        status: 400,
        field: "ticketId",
        message: "Ticket ID is required.",
      });
    }

    if (!emailSubject) {
      return res.status(400).json({
        success: false,
        status: 400,
        field: "emailSubject",
        message: "Email subject is required.",
      });
    }

    if (!emailBody) {
      return res.status(400).json({
        success: false,
        status: 400,
        field: "emailBody",
        message: "Email body is required.",
      });
    }

    next();
  } catch (error) {
    console.error(
      `Error while validating send email to customer: ${error.message}`
    );
    return res.status(500).json({
      success: false,
      status: 500,
      error:
        "Internal server error occurred while validating send email to customer.",
    });
  }
};

module.exports = {
  validateSendEmailToCustomer,
};

module.exports = {
  validateCreateSupportTicketFields,
  validateSendEmailToCustomer,
  validateUpdateSupportTicketStatus,
  validateTicketIdParam,
};
