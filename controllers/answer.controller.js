const DB = require("../configs/db.config");
const { answerValidator } = require("../validators/answer.validator");

exports.submitAnswerBySurveyId = async (req, res) => {
  const surveyId = req.params.surveyId;
  const survey = await DB.getSurveyById(surveyId);
  if (!survey) return res.status(404).json({ message: "Survey not found!" });

  const { error, value } = await answerValidator(req.body);
  if (error) return res.status(422).json(error);

  try {
    const result = await DB.submitAnswerBySurveyId(value);
    return res.status(201).json({
      message: "Survey answer has been submitted successfully!",
      data: { result },
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.getAllAnswerBySurveyId = async (req, res) => {
  const surveyId = req.params.surveyId;
  const survey = await DB.getSurveyById(surveyId);
  if (!survey) return res.status(404).json({ message: "Survey not found!" });

  try {
    const result = await DB.getAllAnswerBySurveyId(surveyId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.getAnswerByAnswerId = async (req, res) => {
  const { surveyId, answerId } = req.params;
  const survey = await DB.getSurveyById(surveyId);
  if (!survey) return res.status(404).json({ message: "Survey not found!" });

  try {
    const result = await DB.getAnswerByAnswerId(answerId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};
