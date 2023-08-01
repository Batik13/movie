// adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/adminController");
const userRoutes = require("./users");

// Protect all routes with the admin middleware
router.use(adminController.protectRoute);
router.get("/", adminController.showAdminDashboard);

// Use the admin and user routes
router.use("/users", userRoutes);

module.exports = router;
