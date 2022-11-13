const { readDB, writeDB } = require("../utils/db");
const generateUniqueId = require("../utils/generateUniqueID");

const createSurvey = async (data) => {
  const result = await readDB("surveyQuestions.json");
  console.log("🚀 ~ file: fs.service.js ~ line 7 ~ save ~ result", result);
  const id = await generateUniqueId();
  const newData = { ...data, id };
  const response = await writeDB([...result, newData], "surveyQuestions.json");
  return new Promise((resolve, reject) => {
    if (response) {
      resolve(newData);
    } else {
      reject("Something went wrong");
    }
  });
};

const submitSurvey = async (data) => {
  const result = await readDB("surveyAnswers.json");
  console.log("🚀 ~ file: fs.service.js ~ line 7 ~ save ~ result", result);
  const id = await generateUniqueId();
  const newData = { ...data, id };
  const response = await writeDB([...result, newData], "surveyAnswers.json");
  return new Promise((resolve, reject) => {
    if (response) {
      resolve(newData);
    } else {
      reject("Something went wrong");
    }
  });
};

const getAllSurvey = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await readDB("surveyQuestions.json");
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllAnswer = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await readDB("surveyAnswers.json");
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

const getSurveyById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await readDB("surveyQuestions.json");
      const survey = result.find((e) => e.id === id);
      resolve(survey);
    } catch (error) {
      reject(error);
    }
  });
};

const getAnswersByUser = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await readDB("surveyAnswers.json");
      const answers = result.filter((e) => e.userId === userId);
      resolve(answers);
    } catch (error) {
      reject(error);
    }
  });
};

const getAnswersBySurvey = async (surveyId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await readDB("surveyAnswers.json");
      const answers = result.filter((e) => e.questionId === surveyId);
      resolve(answers);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createSurvey,
  submitSurvey,
  getAllSurvey,
  getAllAnswer,
  getSurveyById,
  getAnswersByUser,
  getAnswersBySurvey,
};
