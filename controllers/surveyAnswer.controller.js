const DB = require("../configs/db.config");
const surveyAnswerSchema = require("../schemas/surveyAnswer.schema");

const submitSurveyAnswer = async (req, res) => {
  const { error, value } = surveyAnswerSchema.validate(req.body);

  if (error) return res.status(400).send(error.message);

  try {
    const result = await DB.submitSurvey(value);

    return res.status(201).send({
      message: "Survey answer has been submitted successfully!",
      data: result,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  submitSurveyAnswer,
};
