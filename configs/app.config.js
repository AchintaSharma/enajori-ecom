require("dotenv").config();

module.exports = {
  tax: process.env.TAX,
  shipping: process.env.SHIPPING,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
};
