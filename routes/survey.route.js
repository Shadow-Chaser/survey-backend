const {
  createSurveyQuestion,
} = require("../controllers/surveyQuestion.controller");

const {
  submitSurveyAnswer,
} = require("../controllers/surveyAnswer.controller");

const router = require("express").Router();

router.route("/survey-question").post(createSurveyQuestion);
router.route("/survey-answer").post(submitSurveyAnswer);

module.exports = router;
