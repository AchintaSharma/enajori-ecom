const supportController = require("../controllers/support.controller");
const { verifyToken } = require("../middlewares/authjwt");
const {
  validateCreateSupportTicketFields,
  validateSendEmailToCustomer,
  validateTicketIdParam,
  validateUpdateSupportTicketStatus,
} = require("../middlewares/validateSupportRequests");

module.exports = (app) => {
  // API for creating a support
  app.post(
    "/enajori/api/v1/support",
    [verifyToken, validateCreateSupportTicketFields],
    supportController.createSupportTicket
  );

  // API for updating a support
  app.patch(
    "/enajori/api/v1/support/:ticketId",
    [verifyToken, validateUpdateSupportTicketStatus],
    supportController.updateSupportTicketStatus
  );

  // API for getting a specific support
  app.get(
    "/enajori/api/v1/support/:ticketId",
    [verifyToken, validateTicketIdParam],
    supportController.getSupportTicketById
  );

  // API for getting all supports
  app.get(
    "/enajori/api/v1/support",
    [verifyToken],
    supportController.getAllSupportTickets
  );

  // API for deleting a support
  app.delete(
    "/enajori/api/v1/support/:ticketId",
    [verifyToken, validateTicketIdParam],
    supportController.deleteSupportTicket
  );

  // API for sending an email to the customer
  app.post(
    "/enajori/api/v1/support/:ticketId/sendEmail",
    [verifyToken, validateSendEmailToCustomer],
    supportController.sendEmailToCustomer
  );
};
