const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().trim().empty().min(3).max(10).required(),
  email: Joi.string().email(),
  password: Joi.string().min(8).max(14),
});

exports.userValidator = async (value) => {
  return userSchema.validate(value);
};
