const { Joi } = require("celebrate");

const loginSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required()
});
const registerSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
});
module.exports = {
  loginSchema,
  registerSchema
};
