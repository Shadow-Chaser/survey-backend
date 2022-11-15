const chai = require("chai");
const chaiHttp = require("chai-http");
const DB = require("../configs/db.config");
const SurveyAnswer = require("../models/surveyAnswer.model");
const SurveyQuestion = require("../models/surveyQuestion.model");
const server = require("../server");
const { faker } = require("@faker-js/faker");

const assert = chai.assert;
chai.use(chaiHttp);

describe("Survey Answer API", () => {
  beforeEach(async () => {
    await SurveyQuestion.deleteMany();
    await SurveyAnswer.deleteMany();
  });

  afterEach(async () => {
    await SurveyQuestion.deleteMany();
    await SurveyAnswer.deleteMany();
  });

  // POST testing create survey answer api
  describe("POST api/survey/survey-answer", () => {
    it("It should submit a survey", async () => {
      const survey = await DB.createSurvey({
        question: faker.lorem.words(),
        options: faker.datatype.array(),
      });

      const payload = {
        userId: faker.random.alphaNumeric(),
        questionId: survey._id,
        question: survey.question,
        answer: survey.options[0],
      };
      const response = await chai
        .request(server)
        .post("/api/survey/survey-answer")
        .send(payload);
      assert.equal(response.statusCode, 201);
      assert.typeOf(response.body, "object");
      assert.equal(response.body.data.answer, payload.answer);
      assert.equal(response.body.data.question, payload.question);
    });

    it("It should not submit a survey : null payload", async () => {
      const payload = null;
      const response = await chai
        .request(server)
        .post("/api/survey/survey-answer")
        .send(payload);
      assert.equal(response.status, 422);
      assert.typeOf(response.body, "object");
    });

    it("It should not submit a survey : empty payload", async () => {
      const payload = {};
      const response = await chai
        .request(server)
        .post("/api/survey/survey-answer")
        .send(payload);
      assert.equal(response.status, 422);
      assert.typeOf(response.body, "object");
    });

    it("It should not submit a survey : payload overflow", async () => {
      const payload = {
        userId: "f58f38hfh777",
        questionId: "636cc816610ce77e6d2e1cf1",
        question: "Test question 44?",
        answer: "opt2",
        test: "test",
      };
      const response = await chai
        .request(server)
        .post("/api/survey/survey-answer")
        .send(payload);
      assert.equal(response.status, 422);
      assert.typeOf(response.body, "object");
    });

    it("It should not submit a survey : payload underflow", async () => {
      const payload = {
        userId: "f58f38hfh777",
        questionId: "636cc816610ce77e6d2e1cf1",
        question: "Test question 44?",
      };
      const response = await chai
        .request(server)
        .post("/api/survey/survey-answer")
        .send(payload);
      assert.equal(response.status, 422);
      assert.typeOf(response.body, "object");
    });

    it("It should not submit a survey : invalid payload", async () => {
      const payload = {
        userId: 777,
        questionId: 36347,
        question: 53,
        answer: ["opt2"],
      };
      const response = await chai
        .request(server)
        .post("/api/survey/survey-answer")
        .send(payload);
      assert.equal(response.status, 422);
      assert.typeOf(response.body, "object");
    });
  });

  // GET testing getting survey answer api
  describe("GET api/survey/survey-answers", () => {
    it("It should get all the survey submission", async () => {
      const survey = await DB.createSurvey({
        question: faker.lorem.words(),
        options: faker.datatype.array(),
      });
      const payload = {
        userId: faker.random.alphaNumeric(),
        questionId: survey._id,
        question: survey.question,
        answer: survey.options[0],
      };

      await DB.submitSurvey(payload);

      const response = await chai
        .request(server)
        .get("/api/survey/survey-answers");
      assert.equal(response.status, 200);
      assert.typeOf(response.body, "array");
      assert.equal(response.body[0].userId, payload.userId);
      assert.equal(response.body[0].questionId, payload.questionId);
    });
  });

  // GET testing getting all survey submission by user id api
  describe("GET api/survey/survey-answers/user/:userId", () => {
    it("It should get the survey submission by id", async () => {
      const survey = await DB.createSurvey({
        question: faker.lorem.words(),
        options: faker.datatype.array(),
      });
      const payload = {
        userId: faker.random.alphaNumeric(),
        questionId: survey._id,
        question: survey.question,
        answer: survey.options[0],
      };

      const { userId } = await DB.submitSurvey(payload);

      const response = await chai
        .request(server)
        .get("/api/survey/survey-answers/user/" + userId);
      assert.equal(response.status, 200);
      assert.typeOf(response.body, "array");
      assert.equal(response.body[0].question, payload.question);
    });

    it("It should not get the survey submissions : invalid id", async () => {
      const userId = "636b858f385786b2ad311sd1wer";
      const response = await chai
        .request(server)
        .get("/api/survey/survey-answers/user/" + userId);
      assert.equal(response.status, 404);
      assert.typeOf(response.body, "object");
    });

    it("It should not get the survey submissions : null id", async () => {
      const userId = null;
      const response = await chai
        .request(server)
        .get("/api/survey/survey-answers/user/" + userId);
      assert.equal(response.status, 404);
      assert.typeOf(response.body, "object");
    });
  });
});
