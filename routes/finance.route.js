var express = require("express");
var router = express.Router();

var controller = require("../controllers/finance.controller");

/* GET users listing. */

router.get("/earning/", controller.getEarning);
router.post("/earning/", controller.postEarning);
router.get("/spending/", controller.getSpending);
router.post("/spending/", controller.postSpending);

module.exports = router;
