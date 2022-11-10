const SurveyQuestion = require("../models/surveyQuestion.model");
const SurveyAnswer = require("../models/surveyAnswer.model");

const createSurvey = async (data) => {
  return SurveyQuestion.create(data);
};

const submitSurvey = async (data) => {
  return SurveyAnswer.create(data);
};
module.exports = {
  createSurvey,
  submitSurvey,
};
