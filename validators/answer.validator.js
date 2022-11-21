const Joi = require("joi");

const answerSchema = Joi.object().keys({
  surveyId: Joi.string().required(),
  answers: Joi.array()
    .items({
      choosenOption: Joi.string().required(),
      questionId: Joi.string().required(),
    })
    .required(),
});

exports.answerValidator = async (value) => {
  return answerSchema.validate(value);
};
