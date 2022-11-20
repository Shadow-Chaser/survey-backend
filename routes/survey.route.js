const {
  createSurvey,
  getAllSurvey,
  getSurveyById,
} = require("../controllers/survey.controller");
const authorizeMiddleware = require("../middlewares/authorize.middleware");

const surveyRouter = require("express").Router();

surveyRouter.route("/").post(authorizeMiddleware, createSurvey);
surveyRouter.route("/").get(authorizeMiddleware, getAllSurvey);
surveyRouter.route("/:surveyId").get(authorizeMiddleware, getSurveyById);

module.exports = surveyRouter;
