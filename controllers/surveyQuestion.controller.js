const surveyQuestionSchema = require("../schemas/surveyQuestion.schema");
const fileSystemService = require("../services/fs.service");
const mongoService = require("../services/mongo.service");

if (process.env.DB_MODE === "JSON") {
  module.exports = {
    createSurveyQuestion: async (req, res) => {
      const { error, value } = surveyQuestionSchema.validate(req.body);

      if (error) return res.status(400).send(error.message);

      try {
        const result = await fileSystemService.createSurvey(value);

        if (result) {
          return res.status(201).send({
            message: "Survey question has been created successfully!",
            data: result,
          });
        }
      } catch (error) {
        return res.status(400).send(error.message);
      }
    },
  };
} else if (process.env.DB_MODE === "MONGO") {
  module.exports = {
    createSurveyQuestion: async (req, res) => {
      const { error, value } = surveyQuestionSchema.validate(req.body);

      if (error) return res.status(400).send(error.message);

      try {
        const result = await mongoService.createSurvey(value);

        if (result) {
          return res.status(201).send({
            message: "Survey question has been created successfully!",
            data: result,
          });
        }
      } catch (error) {
        return res.status(400).send(error.message);
      }
    },
  };
}
