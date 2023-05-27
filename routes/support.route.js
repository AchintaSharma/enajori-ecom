const supportController = require("../controllers/support.controller");
const { verifyToken } = require("../middlewares/authjwt");

module.exports = (app) => {
  // API for clearing the support
  // app.post(
  //   "/enajori/api/v1/support/clear",
  //   [verifyToken],
  //   supportController.clearSupport
  // );

  // API for creating a support
  app.post(
    "/enajori/api/v1/support",
    [verifyToken],
    supportController.createSupportTicket
  );

  // API for updating a support
  app.patch(
    "/enajori/api/v1/support/:ticketId",
    [verifyToken],
    supportController.updateSupportTicketStatus
  );

  // API for getting a specific support
  app.get(
    "/enajori/api/v1/support/:ticketId",
    [verifyToken],
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
    [verifyToken],
    supportController.deleteSupportTicket
  );

  // API for sending an email to the customer
  app.post(
    "/enajori/api/v1/support/:ticketId/sendEmail",
    [verifyToken],
    supportController.sendEmailToCustomer
  );
};
