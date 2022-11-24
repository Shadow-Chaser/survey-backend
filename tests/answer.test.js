const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const Survey = require("../models/survey.model");
const Answer = require("../models/answer.model");
const {
  survey,
  JWTToken,
  answer,
  invalidAnswer,
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

  // POST submit survey
  describe("POST /api/v1/surveys/:surveyId/answers", () => {
    it("It should submit a survey", async () => {
      const { _id } = await DB.createSurvey(survey);
      const payload = { ...answer, surveyId: _id };
      const res = await chai
        .request(server)
        .post(`/api/v1/surveys/${_id}/answers`)
        .send(payload);

      assert.equal(res.status, 201);
      assert.isObject(res.body);
      assert.isString(res.body.message);
      assert.isObject(res.body.data);
    });
    it("It should not submit a survey: invalid payload", async () => {
      const { _id } = await DB.createSurvey(survey);
      const payload = { ...invalidAnswer, surveyId: _id };
      const res = await chai
        .request(server)
        .post(`/api/v1/surveys/${_id}/answers`)
        .send(payload);

      assert.equal(res.status, 422);
      assert.isObject(res.body);
    });
  });

  // GET get all survey answers by survey id
  describe("GET /api/v1/surveys/:surveyId/answers", () => {
    it("It should return all survey answers by survey id", async () => {
      const { _id } = await DB.createSurvey(survey);
      const payload = { ...answer, surveyId: _id };
      await chai
        .request(server)
        .post(`/api/v1/surveys/${_id}/answers`)
        .send(payload);

      const res = await chai
        .request(server)
        .get(`/api/v1/surveys/${_id}/answers`);

      assert.equal(res.status, 200);
      assert.isArray(res.body);
      assert.isObject(res.body[0]);
    });

    // it("It should not return all survey answers by survey id : invalid id", async () => {
    //   const res = await chai
    //     .request(server)
    //     .get(`/api/v1/surveys/${randomId}/answers`);

    //   assert.equal(res.status, 400);
    // });
  });
});
