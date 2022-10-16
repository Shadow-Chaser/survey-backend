const Joi = require("joi");

const surveyAnswerSchema = Joi.object().keys({
  userId: Joi.string().required(),
  questionId: Joi.string().required(),
  question: Joi.string().required(),
  answer: Joi.required(),
});

module.exports = surveyAnswerSchema;
