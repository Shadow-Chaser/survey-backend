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

module.exports = {
  createSurvey,
  submitSurvey,
};
