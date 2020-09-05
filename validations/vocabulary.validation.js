const { Joi } = require("celebrate");

const vocabularySchema = Joi.object({
  vocabulary: Joi.string().required(),
  meaning: Joi.string().required(),
  type: Joi.string().required(),
  description: Joi.string()
});

module.exports = {vocabularySchema};
