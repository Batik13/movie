const express = require("express");
const adminController = require("../controllers/adminController");
const pageRoutes = require("./pages");
const router = express.Router();

// Protect all routes below with middleware
router.use(adminController.protectRoute);
router.use("/pages", pageRoutes);

router.get("/", adminController.showAdminDashboard);

module.exports = router;
