const SurveyAnswer = require("../models/surveyAnswer.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const Survey = require("../models/survey.model");

exports.createSurvey = async (data) => {
  return Survey.create(data);
};

exports.createUser = async (data) => {
  return User.create(data);
};

exports.getUserByEmail = async (email) => {
  return User.findOne({ email: email });
};

exports.generateJWTToken = async (id, email) => {
  const token = jwt.sign(
    { _id: id, email: email },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1day",
    }
  );

  return token;
};

exports.submitSurvey = async (data) => {
  return SurveyAnswer.create(data);
};
exports.getAllSurvey = async () => {
  return Survey.find({});
};
exports.getAllAnswer = async () => {
  return SurveyAnswer.find({});
};

exports.getSurveyById = async (id) => {
  return Survey.findById(id);
};

exports.getAnswersByUser = async (userId) => {
  return SurveyAnswer.find({ userId: userId });
};

exports.getAnswersBySurvey = async (surveyId) => {
  return SurveyAnswer.find({ questionId: surveyId });
};
