const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();

// Protect all routes below with middleware
router.use(adminController.protectRoute);

router.get("/", adminController.showAdminDashboard);

module.exports = router;
