/**
 * This is the main application file
 */

// import npm modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

// import configs
const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config");

// import init script
const init = require("./utils/init");

// create express app
const app = express();

// assign middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static("client/build"));

// DB connection
mongoose.connect(dbConfig.DB_URL);

const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connecting to the DB");
});

db.once("open", () => {
  console.log("Connected to the MongoDB");
  init();
});

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to 'E n a j o r i'. Happy shopping!!!",
  });
});

/**
 * Plug in routes
 */
require("./routes/auth.route")(app);
require("./routes/user.route")(app);
require("./routes/address.route")(app);
require("./routes/product.route")(app);
//  require("./routes/order.routes")(app);
/**
 * Start the server
 */
app.listen(serverConfig.PORT, () => {
  console.log(`Server started at PORT : ${serverConfig.PORT}`);
});
