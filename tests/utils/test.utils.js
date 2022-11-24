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

  JWTToken: async () => {
    return DB.generateJWTToken(
      faker.random.alphaNumeric(),
      faker.internet.email()
    );
  },
};
