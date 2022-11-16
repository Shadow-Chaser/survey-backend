const { faker } = require("@faker-js/faker");
const DB = require("../../configs/db.config");

const surveyData = {
  question: faker.lorem.sentence(),
  options: faker.datatype.array(),
};

const invalidPayload = {
  question: faker.datatype.array(),
  options: faker.lorem.sentence(),
};
const overflowPayload = {
  question: faker.lorem.sentence(),
  options: faker.datatype.array(),
  extra: faker.random.alphaNumeric(),
};

const underflowPayload = {
  question: faker.lorem.sentence(),
};

const randomId = faker.random.alphaNumeric();

const answerData = async () => {
  const survey = await DB.createSurvey(surveyData);
  return {
    userId: faker.random.alphaNumeric(),
    questionId: survey._id,
    question: survey.question,
    answer: survey.options[0],
  };
};

const invalidAnswerData = async () => {
  const survey = await DB.createSurvey(surveyData);
  return {
    userId: survey._id,
    questionId: faker.random.alphaNumeric(),
    question: survey.options,
    answer: survey.question,
  };
};

module.exports = {
  surveyData,
  invalidPayload,
  overflowPayload,
  underflowPayload,
  randomId,
  answerData,
  invalidAnswerData,
};
