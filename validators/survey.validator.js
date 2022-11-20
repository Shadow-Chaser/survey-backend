const Joi = require("joi");

const surveySchema = Joi.object().keys({
  title: Joi.string().min(10).max(150).required(),
  survey: Joi.array()
    .items({
      question: Joi.string().min(10).max(150).required(),
      options: Joi.array().required(),
    })
    .required(),
  user: Joi.string().required(),
});

exports.surveyValidator = async (value) => {
  return surveySchema.validate(value);
};
