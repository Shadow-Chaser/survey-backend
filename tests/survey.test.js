const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const Survey = require("../models/survey.model");
const Answer = require("../models/answer.model");
const {
  survey,
  JWTToken,
  invalidSurvey,
  randomId,
} = require("./utils/test.utils");
const { assert } = require("chai");
const DB = require("../configs/db.config");

chai.use(chaiHttp);

describe("Survey API Test Suit", () => {
  beforeEach(async () => {
    await Survey.deleteMany();
    await Answer.deleteMany();
  });

  afterEach(async () => {
    await Survey.deleteMany();
    await Answer.deleteMany();
  });

  // POST create survey
  describe("POST /api/v1/surveys", () => {
    it("It should create a survey", async () => {
      const token = await JWTToken();
      const res = await chai
        .request(server)
        .post("/api/v1/surveys")
        .set({ authorization: `Bearer ${token}` })
        .send(survey);

      assert.equal(res.status, 201);
      assert.isObject(res.body);
      assert.isString(res.body.message);
      assert.isObject(res.body.data);
    });

    it("It not should create a survey : unauthorized", async () => {
      const res = await chai
        .request(server)
        .post("/api/v1/surveys")
        .send(survey);

      assert.equal(res.status, 401);
    });

    it("It not should create a survey : invalid payload", async () => {
      const token = await JWTToken();

      const res = await chai
        .request(server)
        .post("/api/v1/surveys")
        .set({ authorization: `Bearer ${token}` })
        .send(invalidSurvey);

      assert.equal(res.status, 422);
      assert.isObject(res.body);
    });
  });

  // GET get all survey
  describe("GET /api/v1/surveys", () => {
    it("It should return all survey", async () => {
      await DB.createSurvey(survey);

      const res = await chai.request(server).get("/api/v1/surveys");
      assert.equal(res.status, 200);
      assert.isArray(res.body);
      assert.isString(res.body[0].title);
      assert.isArray(res.body[0].survey);
      assert.isObject(res.body[0].survey[0]);
    });

    it("It should not return all survey : Database empty", async () => {
      const res = await chai.request(server).get("/api/v1/surveys");
      assert.equal(res.status, 400);
    });
  });

  // GET get survey by id
  describe("GET /api/v1/surveys/:surveyId", () => {
    it("It should return the survey by id", async () => {
      const { _id, title, user } = await DB.createSurvey(survey);
      const res = await chai.request(server).get("/api/v1/surveys/" + _id);

      assert.equal(res.status, 200);
      assert.isObject(res.body);
      assert.isString(res.body.title);
      assert.isArray(res.body.survey);
      assert.equal(res.body.title, title);
      assert.equal(res.body.user, user);
    });
    it("It should not return the survey by id: invalid id", async () => {
      await DB.createSurvey(survey);
      const res = await chai.request(server).get("/api/v1/surveys/" + randomId);

      assert.equal(res.status, 400);
    });
  });

  // DELETE survey by id

  describe("DELETE /api/v1/surveys/:surveyId", () => {
    it("It should delete the survey", async () => {
      const { _id } = await DB.createSurvey(survey);
      const token = await JWTToken();

      const res = await chai
        .request(server)
        .delete("/api/v1/surveys/" + _id)
        .set({ authorization: `Bearer ${token}` });

      assert.equal(res.status, 200);
      assert.isObject(res.body);
      assert.equal(_id, res.body.data._id);
    });

    it("It should not delete the survey: unauthorized payload", async () => {
      const { _id } = await DB.createSurvey(survey);

      const res = await chai.request(server).delete("/api/v1/surveys/" + _id);

      assert.equal(res.status, 401);
    });
  });
});
