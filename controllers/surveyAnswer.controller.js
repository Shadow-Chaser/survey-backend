const DB = require("../configs/db.config");
const surveyAnswerSchema = require("../schemas/surveyAnswer.schema");

const submitSurveyAnswer = async (req, res) => {
  const { error, value } = surveyAnswerSchema.validate(req.body);

  if (error) return res.status(400).json(error);

  try {
    const result = await DB.submitSurvey(value);

    return res.status(201).json({
      message: "Survey answer has been submitted successfully!",
      data: result,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getAllSurveyAnswers = async (req, res) => {
  try {
    const result = await DB.getAllAnswer();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getAllSurveyAnswersByUser = async (req, res) => {
  try {
    const result = await DB.getAnswersByUser(req.params.userId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getAllSurveyAnswersByQuestion = async (req, res) => {
  try {
    const result = await DB.getAnswersBySurvey(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  submitSurveyAnswer,
  getAllSurveyAnswers,
  getAllSurveyAnswersByUser,
  getAllSurveyAnswersByQuestion,
};
