const {
  createSurvey,
  getAllSurvey,
  getSurveyById,
  updateSurveyById,
  deleteSurveyById,
} = require("../controllers/survey.controller");
const authorizeMiddleware = require("../middlewares/authorize.middleware");

const surveyRouter = require("express").Router();

surveyRouter.route("/").post(authorizeMiddleware, createSurvey);
surveyRouter.route("/").get(authorizeMiddleware, getAllSurvey);
surveyRouter.route("/:surveyId").get(authorizeMiddleware, getSurveyById);
surveyRouter.route("/:surveyId").put(authorizeMiddleware, updateSurveyById);
surveyRouter.route("/:surveyId").delete(authorizeMiddleware, deleteSurveyById);

module.exports = surveyRouter;
