const surveyAnswerSchema = require("../schemas/surveyAnswer.schema");
const fileSystem = require("../services/fs.service");

const submitSurveyAnswer = async (req, res) => {
  const { error, value } = surveyAnswerSchema.validate(req.body);

  if (error) return res.status(400).send(error.message);

  try {
    const result = await fileSystem.submitSurvey(req.body);

    if (result) {
      return res.status(201).send({
        message: "Survey Answer has been submitted successfully!",
        data: result,
      });
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  submitSurveyAnswer,
};
