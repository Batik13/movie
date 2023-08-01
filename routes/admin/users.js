// routes/users.js
const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", userController.registerNewUser);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", userController.loginUser);

router.get('/logout', userController.logoutUser);

module.exports = router;
