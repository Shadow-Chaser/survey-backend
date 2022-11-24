const { faker } = require("@faker-js/faker");
const DB = require("../../configs/db.config");

module.exports = {
  survey: {
    title: faker.lorem.sentence(),
    survey: [
      {
        question: faker.lorem.words(5),
        options: [
          faker.lorem.words(1),
          faker.lorem.words(1),
          faker.lorem.words(1),
        ],
      },
      {
        question: faker.lorem.words(5),
        options: [
          faker.lorem.words(1),
          faker.lorem.words(1),
          faker.lorem.words(1),
        ],
      },
    ],
    user: faker.database.mongodbObjectId(),
  },
  invalidSurvey: {
    title: faker.datatype.number(),
    survey: [
      {
        question: faker.datatype.number(),
        options: [faker.datatype.number()],
      },
      {
        question: faker.lorem.words(5),
        options: [
          faker.lorem.words(1),
          faker.lorem.words(1),
          faker.lorem.words(1),
        ],
      },
    ],
    user: faker.random.alphaNumeric(),
    test: faker.random.words(),
  },
  answer: {
    answers: [
      {
        choosenOption: faker.lorem.words(1),
        questionId: faker.database.mongodbObjectId(),
      },
      {
        choosenOption: faker.lorem.words(1),
        questionId: faker.database.mongodbObjectId(),
      },
    ],
  },
  invalidAnswer: {
    answers: [
      {
        choosenOption: faker.datatype.float,
        questionId: faker.random.alpha(),
      },
      {
        choosenOption: faker.lorem.words(1),
        questionId: faker.random.alphaNumeric(),
      },
    ],
    extra: faker.lorem.words(),
  },

  JWTToken: async () => {
    return DB.generateJWTToken(
      faker.random.alphaNumeric(),
      faker.internet.email()
    );
  },
  randomId: faker.random.alphaNumeric(),
};
