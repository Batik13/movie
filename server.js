const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const AdminBro = require("admin-bro");
const AdminBroMongoose = require("@admin-bro/mongoose");
const AdminBroExpress = require("@admin-bro/express");
const config = require("./config");
const User = require("./admin/models/User"); // Make sure path is correct

// Middleware for authentication
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

// Connect to the database
mongoose
  .connect(config.dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("Connection error", err));

// Create the express app
const app = express();

// Configure the app
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: config.sessionSecureCookie },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "client/views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(cors());

// Define routes
const rootRouter = require("./client/routes/index");
const usersRouter = require("./admin/routes/users");
app.use("/", rootRouter);
app.use("/", usersRouter);

AdminBro.registerAdapter(AdminBroMongoose);

// AdminBro
const adminBro = new AdminBro({
  resources: [User], // Added User model here
  rootPath: "/admin",
});
const router = AdminBroExpress.buildRouter(adminBro);
app.use(adminBro.options.rootPath, isAuthenticated, router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
