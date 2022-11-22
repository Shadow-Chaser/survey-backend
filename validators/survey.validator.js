const Joi = require("joi");

const surveySchema = Joi.object().keys({
  title: Joi.string().trim().min(10).max(150).required(),
  survey: Joi.array()
    .items({
      question: Joi.string().trim().min(10).max(150).required(),
      options: Joi.array().required(),
    })
    .required(),
  user: Joi.string().trim().required(),
});

exports.surveyValidator = async (value) => {
  return surveySchema.validate(value);
};
