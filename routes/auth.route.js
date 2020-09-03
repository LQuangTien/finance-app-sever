const express = require("express");
const router = express.Router();
const { celebrate } = require("celebrate");

const authValidateion = require("../validations/auth.validation");
const authController = require("../controllers/auth.controller");

router.post("/register", authController.register);
router.post(
  "/login",
  celebrate({ body: authValidateion.loginSchema }),
  authController.login
);

module.exports = router;
