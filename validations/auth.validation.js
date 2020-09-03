const { Joi } = require("celebrate");

const loginSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required()
}).options({ abortEarly: false });

module.exports = {
  loginSchema
};
