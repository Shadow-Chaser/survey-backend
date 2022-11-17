const {
  createSurveyQuestion,
  getAllSurveyQuestions,
  getSurveyQuestionById,
} = require("../controllers/surveyQuestion.controller");

const {
  submitSurveyAnswer,
  getAllSurveyAnswers,
  getAllSurveyAnswersByUser,
  getAllSurveyAnswersByQuestion,
} = require("../controllers/surveyAnswer.controller");

const surveyRouter = require("express").Router();

surveyRouter.route("/survey-question").post(createSurveyQuestion);
surveyRouter.route("/survey-answer").post(submitSurveyAnswer);
surveyRouter.route("/survey-questions").get(getAllSurveyQuestions);
surveyRouter.route("/survey-question/:id").get(getSurveyQuestionById);
surveyRouter
  .route("/survey-answers/user/:userId")
  .get(getAllSurveyAnswersByUser);
surveyRouter
  .route("/survey-answers/question/:id")
  .get(getAllSurveyAnswersByQuestion);
surveyRouter.route("/survey-answers").get(getAllSurveyAnswers);

module.exports = surveyRouter;
