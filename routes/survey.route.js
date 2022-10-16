const {
  submitSurveyAnswer,
  getSurveyAnswersByUser,
  getSurveyAnswersByQuestion,
  getAllSurveyAnswers,
} = require("../controllers/surveyAnswer.controller");

const {
  createSurveyQuestion,
  getAllSurveyQuestion,
  getSurveyQuestionById,
} = require("../controllers/surveyQuestion.controller");

const router = require("express").Router();

router.route("/survey-question").post(createSurveyQuestion);
router.route("/survey-question/:id").get(getSurveyQuestionById);
router.route("/survey-questions").get(getAllSurveyQuestion);
router.route("/survey-answer").post(submitSurveyAnswer);
router.route("/survey-answers").get(getAllSurveyAnswers);
router.route("/survey-answers/user/:id").get(getSurveyAnswersByUser);
router.route("/survey-answers/question/:id").get(getSurveyAnswersByQuestion);

module.exports = router;
