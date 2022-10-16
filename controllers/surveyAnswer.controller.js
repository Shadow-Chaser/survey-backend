const surveyAnswerSchema = require("../schemas/surveyAnswer.schema");
const generateUniqueId = require("../utils/generateUniqueID");
const { writeDB, readDB } = require("./db.controller");

const submitSurveyAnswer = async (req, res) => {
  const { error, value } = surveyAnswerSchema.validate(req.body);

  if (error) return res.status(400).send(error.message);

  try {
    const id = await generateUniqueId();
    const data = await readDB("surveyAnswers.json");
    const answer = { ...value, id };
    const newData = [...data, answer];

    const result = await writeDB(newData, "surveyAnswers.json");
    if (result) {
      return res.status(201).send({
        message: "Survey answer has been submitted successfully!",
        data: answer,
      });
    }
  } catch (error) {
    return res.status(400).send("An error occurred!");
  }
};

const getAllSurveyAnswers = async (req, res) => {
  try {
    const result = await readDB("surveyAnswers.json");
    if (result) {
      return res.status(200).send(result);
    }
  } catch (error) {
    return res.status(400).send("An error occurred!");
  }
};

const getSurveyAnswersByUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const data = await readDB("surveyAnswers.json");
    const dataByUser = data.filter((d) => d.userId === userId);
    return res.status(200).send(dataByUser);
  } catch (error) {
    return res.status(400).send("An error occurred!");
  }
};

const getSurveyAnswersByQuestion = async (req, res) => {
  const questionId = req.params.id;

  try {
    const data = await readDB("surveyAnswers.json");
    const dataByQuestion = data.filter((d) => d.questionId === questionId);
    return res.status(200).send(dataByQuestion);
  } catch (error) {
    return res.status(400).send("An error occurred!");
  }
};

module.exports = {
  submitSurveyAnswer,
  getSurveyAnswersByUser,
  getSurveyAnswersByQuestion,
  getAllSurveyAnswers,
};
