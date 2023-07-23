const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Protect all routes below with middleware
router.use(adminController.protectAdminRoute);

router.get('/', adminController.showAdminDashboard);

module.exports = router;
