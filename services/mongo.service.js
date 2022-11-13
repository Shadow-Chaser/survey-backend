const SurveyQuestion = require("../models/surveyQuestion.model");
const SurveyAnswer = require("../models/surveyAnswer.model");

const createSurvey = async (data) => {
  return SurveyQuestion.create(data);
};

const submitSurvey = async (data) => {
  return SurveyAnswer.create(data);
};
const getAllSurvey = async () => {
  return SurveyQuestion.find({});
};
const getAllAnswer = async () => {
  return SurveyAnswer.find({});
};

const getSurveyById = async (id) => {
  return SurveyQuestion.findById(id);
};

const getAnswersByUser = async (userId) => {
  return SurveyAnswer.find({ userId: userId });
};

const getAnswersBySurvey = async (surveyId) => {
  return SurveyAnswer.find({ questionId: surveyId });
};

module.exports = {
  createSurvey,
  submitSurvey,
  getAllSurvey,
  getAllAnswer,
  getSurveyById,
  getAnswersByUser,
  getAnswersBySurvey,
};
