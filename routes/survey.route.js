const {
  submitSurveyAnswer,
  getSurveyAnswersByUser,
  getSurveyAnswersByQuestion,
} = require("../controllers/surveyAnswer.controller");

const {
  createSurveyQuestion,
  getAllSurveyQuestion,
} = require("../controllers/surveyQuestion.controller");

const router = require("express").Router();

router.route("/survey-question").post(createSurveyQuestion);
router.route("/survey-questions").get(getAllSurveyQuestion);
router.route("/survey-answer").post(submitSurveyAnswer);
router.route("/survey-answers/user/:id").get(getSurveyAnswersByUser);
router.route("/survey-answers/question/:id").get(getSurveyAnswersByQuestion);

module.exports = router;
