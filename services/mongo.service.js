const SurveyQuestion = require("../models/surveyQuestion.model");
const SurveyAnswer = require("../models/surveyAnswer.model");
const User = require("../models/user.model");

exports.createSurvey = async (data) => {
  return SurveyQuestion.create(data);
};

exports.createUser = async (data) => {
  return User.create(data);
};

exports.getUserByEmail = async (email) => {
  return User.findOne({ email: email });
};

exports.submitSurvey = async (data) => {
  return SurveyAnswer.create(data);
};
exports.getAllSurvey = async () => {
  return SurveyQuestion.find({});
};
exports.getAllAnswer = async () => {
  return SurveyAnswer.find({});
};

exports.getSurveyById = async (id) => {
  return SurveyQuestion.findById(id);
};

exports.getAnswersByUser = async (userId) => {
  return SurveyAnswer.find({ userId: userId });
};

exports.getAnswersBySurvey = async (surveyId) => {
  return SurveyAnswer.find({ questionId: surveyId });
};
