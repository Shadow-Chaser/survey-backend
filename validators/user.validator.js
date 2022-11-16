const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().trim().empty().min(3).max(10).required(),
  email: Joi.string().email(),
});
