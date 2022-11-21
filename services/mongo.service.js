const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const Survey = require("../models/survey.model");
const Answer = require("../models/answer.model");

exports.createSurvey = async (data) => {
  return Survey.create(data);
};

exports.getAllSurvey = async () => {
  return Survey.find({});
};

exports.getSurveyById = async (id) => {
  return Survey.findById(id);
};

exports.updateSurveyById = async (id, update) => {
  return Survey.findByIdAndUpdate(id, update);
};

exports.deleteSurveyById = async (id) => {
  return Survey.findByIdAndDelete(id);
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

exports.submitAnswerBySurveyId = async (data) => {
  return Answer.create(data);
};

exports.getAllAnswerBySurveyId = async (surveyId) => {
  return Answer.find({ surveyId: surveyId });
};

exports.getAnswerByAnswerId = async (answerId) => {
  return Answer.findById(answerId);
};
