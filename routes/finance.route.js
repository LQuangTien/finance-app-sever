const express = require("express");
const router = express.Router();

const controller = require("../controllers/finance.controller");

router.get("/earning/", controller.getEarning);
router.post("/earning/", controller.postEarning);
router.get("/spending/", controller.getSpending);
router.post("/spending/", controller.postSpending);

module.exports = router;
