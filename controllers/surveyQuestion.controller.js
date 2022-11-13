const surveyQuestionSchema = require("../schemas/surveyQuestion.schema");
const DB = require("../configs/db.config");

const createSurveyQuestion = async (req, res) => {
  const { error, value } = surveyQuestionSchema.validate(req.body);

  if (error) return res.status(400).send(error.message);

  try {
    const result = await DB.createSurvey(value);

    return res.status(201).send({
      message: "Survey question has been created successfully!",
      data: result,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getAllSurveyQuestions = async (req, res) => {
  try {
    const result = await DB.getAllSurvey();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getSurveyQuestionById = async (req, res) => {
  try {
    const survey = await DB.getSurveyById(req.params.id);
    return res.status(200).send(survey);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  createSurveyQuestion,
  getAllSurveyQuestions,
  getSurveyQuestionById,
};
