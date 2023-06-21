const DB = require("../configs/db.config");
const { surveyValidator } = require("../validators/survey.validator");

module.exports = {
  createSurvey: async (req, res) => {
    const { error, value } = await surveyValidator(req.body);

    if (error) return res.status(422).json(error);

    try {
      const result = await DB.createSurvey(value);

      return res.status(201).json({
        message: "Survey question has been created successfully!",
        data: result,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  getAllSurvey: async (req, res) => {
    try {
      const result = await DB.getAllSurvey();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  getSurveyById: async (req, res) => {
    try {
      const survey = await DB.getSurveyById(req.params.surveyId);
      return res.status(200).json(survey);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  updateSurveyById: async (req, res) => {
    const { error, value } = await surveyValidator(req.body);

    if (error) return res.status(422).json(error);

    try {
      const result = await DB.updateSurveyById(req.params.surveyId, value);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  deleteSurveyById: async (req, res) => {
    try {
      const result = await DB.deleteSurveyById(req.params.surveyId);
      return res.status(200).json({
        message: "Survey deleted successfully",
        data: { result },
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};
