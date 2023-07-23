const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");

mongoose
  .connect(config.dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("Connection error", err));

const rootRouter = require("./routes/root");
const usersRouter = require("./routes/users");

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

const app = express();

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
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(cors());
app.use("/", rootRouter);
app.use("/", usersRouter);

const adminBro = new AdminBro({
  databases: [],
  rootPath: "/admin",
});

const router = AdminBroExpress.buildRouter(adminBro);
app.use(adminBro.options.rootPath, isAuthenticated, router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
