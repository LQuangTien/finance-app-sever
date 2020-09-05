const express = require("express");
const router = express.Router();
const { celebrate } = require("celebrate");

const authValidateion = require("../validations/auth.validation");
const authController = require("../controllers/auth.controller");

router.post("/register",
  celebrate({ body: authValidateion.registerSchema }, { abortEarly: false }),
  authController.register
);
router.post(
  "/login",
  celebrate({ body: authValidateion.loginSchema }, { abortEarly: false }),
  authController.login
);

module.exports = router;
