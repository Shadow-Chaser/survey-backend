const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const Survey = require("../models/survey.model");
const Answer = require("../models/answer.model");
const { survey, JWTToken, invalidSurvey } = require("./utils/test.utils");
const { assert } = require("chai");

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
  describe("POST api/v1/surveys", () => {
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

    it.only("It not should create a survey : invalid payload", async () => {
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
});
