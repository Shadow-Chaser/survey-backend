const Joi = require("joi");

const answerSchema = Joi.object().keys({
  surveyId: Joi.string().trim().required(),
  answers: Joi.array()
    .items({
      choosenOption: Joi.string().trim().required(),
      questionId: Joi.string().trim().required(),
    })
    .required(),
});

exports.answerValidator = async (value) => {
  return answerSchema.validate(value);
};
