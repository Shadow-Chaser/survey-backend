const SurveyQuestion = require("../models/surveyQuestion.model");
const SurveyAnswer = require("../models/surveyAnswer.model");

module.exports = {
  createSurvey: async (data) => {
    return SurveyQuestion.create(data);
  },

  submitSurvey: async (data) => {
    return SurveyAnswer.create(data);
  },
};
