const surveyAnswerSchema = require("../schemas/surveyAnswer.schema");
const fileSystemService = require("../services/fs.service");
const mongoService = require("../services/mongo.service");

if (process.env.DB_MODE === "JSON") {
  module.exports = {
    submitSurveyAnswer: async (req, res) => {
      const { error, value } = surveyAnswerSchema.validate(req.body);

      if (error) return res.status(400).send(error.message);

      try {
        const result = await fileSystemService.submitSurvey(value);

        return res.status(201).send({
          message: "Survey answer has been submitted successfully!",
          data: result,
        });
      } catch (error) {
        return res.status(400).send(error.message);
      }
    },
  };
} else if (process.env.DB_MODE === "MONGO") {
  module.exports = {
    submitSurveyAnswer: async (req, res) => {
      const { error, value } = surveyAnswerSchema.validate(req.body);

      if (error) return res.status(400).send(error.message);

      try {
        const result = await mongoService.submitSurvey(value);

        return res.status(201).send({
          message: "Survey answer has been created successfully!",
          data: result,
        });
      } catch (error) {
        return res.status(400).send(error.message);
      }
    },
  };
}
