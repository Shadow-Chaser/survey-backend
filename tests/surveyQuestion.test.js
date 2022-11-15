const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const { faker } = require("@faker-js/faker");
const SurveyQuestion = require("../models/surveyQuestion.model");
const SurveyAnswer = require("../models/surveyAnswer.model");
const DB = require("../configs/db.config");
const assert = chai.assert;
chai.use(chaiHttp);

describe("SurveyQuestion API", () => {
  beforeEach(async () => {
    await SurveyQuestion.deleteMany();
    await SurveyAnswer.deleteMany();
  });

  afterEach(async () => {
    await SurveyQuestion.deleteMany();
    await SurveyAnswer.deleteMany();
  });

  // POST testing create survey api
  describe("POST api/survey/survey-question", () => {
    it("It should not create a survey : null payload", async () => {
      const payload = null;
      const response = await chai
        .request(server)
        .post("/api/survey/survey-question")
        .send(payload);
      // console.log("status", response.status);
      assert.equal(response.status, 422);
      assert.typeOf(response.body, "object");
    });

    it("It should not create a survey : empty payload", async () => {
      const payload = {};

      const response = await chai
        .request(server)
        .post("/api/survey/survey-question")
        .send(payload);

      assert.equal(response.status, 422);
      assert.typeOf(response.body, "object");
    });

    it("It should not create a survey : payload overflow", async () => {
      const payload = {
        question: faker.lorem.sentence(),
        options: faker.datatype.array(),
        extra: faker.random.alphaNumeric(),
      };
      const response = await chai
        .request(server)
        .post("/api/survey/survey-question")
        .send(payload);

      assert.equal(response.status, 422);
      assert.typeOf(response.body, "object");
    });

    it("It should not create a survey : payload underflow", async () => {
      const payload = {
        question: faker.lorem.sentence(),
      };
      const response = await chai
        .request(server)
        .post("/api/survey/survey-question")
        .send(payload);

      assert.equal(response.status, 422);
      assert.typeOf(response.body, "object");
    });

    it("It should not create a survey : invalid payload", async () => {
      const payload = {
        options: faker.lorem.sentence(),
        question: faker.datatype.array(),
      };
      const response = await chai
        .request(server)
        .post("/api/survey/survey-question")
        .send(payload);

      assert.equal(response.status, 422);
      assert.typeOf(response.body, "object");
    });

    it("It should create a survey", async () => {
      const payload = {
        question: faker.lorem.words(),
        options: faker.datatype.array(),
      };

      const response = await chai
        .request(server)
        .post("/api/survey/survey-question")
        .send(payload);
      // console.log("🚀 payload", payload);
      // console.log("🚀 response", response.body.data);

      assert.equal(response.status, 201);
      assert.typeOf(response.body, "object");
      assert.equal(response.body.data.options[0], payload.options[0]);
      assert.equal(response.body.data.question, payload.question);
    });
  });

  // GET testing getting survey api
  describe("GET api/survey/survey-questions", () => {
    it("It should get all the survey questions", async () => {
      const payload = {
        question: faker.lorem.words(),
        options: faker.datatype.array(),
      };
      await DB.createSurvey(payload);

      const response = await chai
        .request(server)
        .get("/api/survey/survey-questions");

      assert.equal(response.status, 200);
      assert.typeOf(response.body, "array");
      assert.equal(response.body.length, 1);
      assert.equal(response.body[0].options[0], payload.options[0]);
      assert.equal(response.body[0].question, payload.question);
    });
  });

  // GET testing getting survey by id api
  describe("GET api/survey/survey-question/:id", () => {
    it("It should get the survey by id", async () => {
      const payload = {
        question: faker.lorem.words(),
        options: faker.datatype.array(),
      };
      const { _id } = await DB.createSurvey(payload);

      const response = await chai
        .request(server)
        .get("/api/survey/survey-question/" + _id);

      assert.equal(response.status, 200);
      assert.typeOf(response.body, "object");
      assert.equal(response.body.options[0], payload.options[0]);
      assert.equal(response.body.question, payload.question);
    });

    it("It should not get the survey : invalid id", async () => {
      const id = faker.random.alphaNumeric();
      const response = await chai
        .request(server)
        .get("/api/survey/survey-question/" + id);

      assert.equal(response.status, 400);
      assert.typeOf(response.body, "object");
    });

    it("It should not get the survey : null id", async () => {
      const id = null;
      const response = await chai
        .request(server)
        .get("/api/survey/survey-question/" + id);

      assert.equal(response.status, 400);
      assert.typeOf(response.body, "object");
    });
  });
});
