const Joi = require("joi");

const surveyQuestionSchema = Joi.object().keys({
  question: Joi.string().required(),
  options: Joi.array().required(),
});

module.exports = surveyQuestionSchema;
