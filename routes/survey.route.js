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

const router = require("express").Router();

router.route("/survey-question").post(createSurveyQuestion);
router.route("/survey-answer").post(submitSurveyAnswer);
router.route("/survey-questions").get(getAllSurveyQuestions);
router.route("/survey-question/:id").get(getSurveyQuestionById);
router.route("/survey-answers/user/:userId").get(getAllSurveyAnswersByUser);
router.route("/survey-answers/question/:id").get(getAllSurveyAnswersByQuestion);
router.route("/survey-answers").get(getAllSurveyAnswers);

module.exports = router;
