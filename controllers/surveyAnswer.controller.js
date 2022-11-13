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

const getAllSurveyAnswers = async (req, res) => {
  try {
    const result = await DB.getAllAnswer();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getAllSurveyAnswersByUser = async (req, res) => {
  try {
    const result = await DB.getAnswersByUser(req.params.userId);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getAllSurveyAnswersByQuestion = async (req, res) => {
  try {
    const result = await DB.getAnswersBySurvey(req.params.id);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  submitSurveyAnswer,
  getAllSurveyAnswers,
  getAllSurveyAnswersByUser,
  getAllSurveyAnswersByQuestion,
};
