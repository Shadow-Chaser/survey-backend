const chai = require("chai");
const chaiHttp = require("chai-http");
const DB = require("../configs/db.config");
const SurveyAnswer = require("../models/surveyAnswer.model");
const SurveyQuestion = require("../models/surveyQuestion.model");
const server = require("../server");
const {
  answerData,
  invalidAnswerData,
  randomId,
} = require("./utils/test.utils");

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
      const payload = await answerData();
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
      let payload = await answerData();
      payload = { ...payload, test: "test" };
      const response = await chai
        .request(server)
        .post("/api/survey/survey-answer")
        .send(payload);
      assert.equal(response.status, 422);
      assert.typeOf(response.body, "object");
    });

    it("It should not submit a survey : payload underflow", async () => {
      let payload = await answerData();
      delete payload.answer;
      const response = await chai
        .request(server)
        .post("/api/survey/survey-answer")
        .send(payload);
      assert.equal(response.status, 422);
      assert.typeOf(response.body, "object");
    });

    it("It should not submit a survey : invalid payload", async () => {
      const payload = await invalidAnswerData();
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
      const payload = await answerData();

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
      const payload = await answerData();

      const { userId } = await DB.submitSurvey(payload);

      const response = await chai
        .request(server)
        .get("/api/survey/survey-answers/user/" + userId);
      assert.equal(response.status, 200);
      assert.typeOf(response.body, "array");
      assert.equal(response.body[0].question, payload.question);
    });

    it("It should not get the survey submissions : invalid id", async () => {
      const userId = randomId;
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
