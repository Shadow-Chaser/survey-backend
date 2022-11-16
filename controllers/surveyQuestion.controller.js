process.env.NODE_ENV = "test";

const surveyQuestionSchema = require("../schemas/surveyQuestion.schema");
const DB = require("../configs/db.config");

const createSurveyQuestion = async (req, res) => {
  const { error, value } = surveyQuestionSchema.validate(req.body);

  if (error) return res.status(422).json(error);

  try {
    const result = await DB.createSurvey(value);

    return res.status(201).json({
      message: "Survey question has been created successfully!",
      data: result,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getAllSurveyQuestions = async (req, res) => {
  try {
    const result = await DB.getAllSurvey();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getSurveyQuestionById = async (req, res) => {
  try {
    const survey = await DB.getSurveyById(req.params.id);
    return res.status(200).json(survey);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  createSurveyQuestion,
  getAllSurveyQuestions,
  getSurveyQuestionById,
};
