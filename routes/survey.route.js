const {
  submitAnswerBySurveyId,
  getAllAnswerBySurveyId,
  getAnswerByAnswerId,
} = require("../controllers/answer.controller");

const {
  createSurvey,
  getAllSurvey,
  getSurveyById,
  updateSurveyById,
  deleteSurveyById,
} = require("../controllers/survey.controller");
const authorizeMiddleware = require("../middlewares/authorize.middleware");

const surveyRouter = require("express").Router();

surveyRouter
  .route("/")
  .post(authorizeMiddleware, createSurvey)
  .get(authorizeMiddleware, getAllSurvey);
surveyRouter
  .route("/:surveyId")
  .get(authorizeMiddleware, getSurveyById)
  .put(authorizeMiddleware, updateSurveyById)
  .delete(authorizeMiddleware, deleteSurveyById);
surveyRouter
  .route("/:surveyId/answers")
  .post(submitAnswerBySurveyId)
  .get(getAllAnswerBySurveyId);

surveyRouter.route("/:surveyId/answers/:answerId").get(getAnswerByAnswerId);

module.exports = surveyRouter;
