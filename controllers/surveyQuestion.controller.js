const surveyQuestionSchema = require("../schemas/surveyQuestion.schema");
const DB = require("../configs/db.config");

const createSurveyQuestion = async (req, res) => {
  const { error, value } = surveyQuestionSchema.validate(req.body);

  if (error) return res.status(400).send(error.message);

  try {
    const result = await DB.createSurvey(value);

    return res.status(201).send({
      message: "Survey question has been created successfully!",
      data: result,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
module.exports = {
  createSurveyQuestion,
};
