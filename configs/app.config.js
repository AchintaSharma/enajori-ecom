require("dotenv").config();

module.exports = {
  tax: process.env.TAX,
  shipping: process.env.SHIPPING,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  razorpayApiKeyId: process.env.RAZORPAY_KEY_ID,
  razorpayApiKeySecret: process.env.RAZORPAY_KEY_SECRET,
  gmailId: process.env.GMAIL_ID,
  gmailPassword: process.env.GMAIL_PASSWORD,
};
