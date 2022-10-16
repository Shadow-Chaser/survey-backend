const generateUniqueId = require("../utils/generateUniqueID");
const { writeDB, readDB } = require("./db.controller");
const surveyQuestionSchema = require("../schemas/surveyQuestion.schema");

const createSurveyQuestion = async (req, res) => {
  const { error, value } = surveyQuestionSchema.validate(req.body);

  if (error) return res.status(400).send(error.message);

  try {
    const id = await generateUniqueId();
    const data = await readDB("surveyQuestions.json");
    const question = { ...value, id };
    const newData = [...data, question];

    const result = await writeDB(newData, "surveyQuestions.json");
    if (result) {
      return res.status(201).send({
        message: "Survey question has been created successfully!",
        data: question,
      });
    }
  } catch (error) {
    return res.status(400).send("An error occurred!");
  }
};

const getAllSurveyQuestion = async (req, res) => {
  try {
    const result = await readDB("surveyQuestions.json");
    if (result) {
      return res.status(200).send(result);
    }
  } catch (error) {
    return res.status(400).send("An error occurred!");
  }
};

module.exports = {
  createSurveyQuestion,
  getAllSurveyQuestion,
};
