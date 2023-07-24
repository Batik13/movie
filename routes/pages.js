const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
const adminController = require("../controllers/adminController");

router.get("/new", adminController.protectAdminRoute, pageController.newPage);
router.post("/", adminController.protectAdminRoute, pageController.createPage);
router.get(
  "/:slug",
  adminController.protectAdminRoute,
  pageController.showPage
);
router.get(
  "/:slug/edit",
  adminController.protectAdminRoute,
  pageController.editPage
);
router.put(
  "/:slug",
  adminController.protectAdminRoute,
  pageController.updatePage
);
router.delete(
  "/:slug",
  adminController.protectAdminRoute,
  pageController.deletePage
);

module.exports = router;
