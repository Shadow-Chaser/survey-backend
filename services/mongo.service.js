const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const Survey = require("../models/survey.model");
const Answer = require("../models/answer.model");
const { JWT_SECRET_KEY } = require("../configs/env.config");

module.exports = {
  createSurvey: async (data) => {
    return Survey.create(data);
  },

  getAllSurvey: async () => {
    return Survey.find({});
  },

  getSurveyById: async (id) => {
    return Survey.findById(id);
  },

  updateSurveyById: async (id, update) => {
    return Survey.findByIdAndUpdate(id, update);
  },

  deleteSurveyById: async (id) => {
    return Survey.findByIdAndDelete(id);
  },

  createUser: async (data) => {
    return User.create(data);
  },

  getUserByEmail: async (email) => {
    return User.findOne({ email: email });
  },

  generateJWTToken: async (id, email) => {
    const token = jwt.sign({ _id: id, email: email }, JWT_SECRET_KEY, {
      expiresIn: "1day",
    });

    return token;
  },

  submitAnswerBySurveyId: async (data) => {
    return Answer.create(data);
  },

  getAllAnswerBySurveyId: async (surveyId) => {
    return Answer.find({ surveyId: surveyId });
  },

  getAnswerByAnswerId: async (answerId) => {
    return Answer.findById(answerId);
  },
};
