var express = require("express");
var router = express.Router();

var rootController = require("../../controllers/rootController");

router.get("/", rootController.index);

module.exports = router;
