const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const { faker } = require("@faker-js/faker");
const assert = chai.assert;
chai.use(chaiHttp);

// POST testing create survey api
describe("POST api/survey/survey-question", () => {
  it("It should create a survey", async () => {
    const payload = {
      question: faker.lorem.sentence(),
      options: faker.datatype.array(),
    };

    const response = await chai
      .request(server)
      .post("/api/survey/survey-question")
      .send(payload);

    assert.equal(response.status, 201);
    assert.typeOf(response.body, "object");
  });

  it("It should not create a survey : null payload", async () => {
    const payload = null;
    const response = await chai
      .request(server)
      .post("/api/survey/survey-question")
      .send(payload);
    console.log("status", response.status);
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
});

// GET testing getting survey api
describe("GET api/survey/survey-questions", () => {
  it("It should get all the survey questions", async () => {
    const response = await chai
      .request(server)
      .get("/api/survey/survey-questions");

    assert.equal(response.status, 200);
    assert.typeOf(response.body, "array");
  });
});

// GET testing getting survey by id api
describe("GET api/survey/survey-question/:id", () => {
  it("It should get the survey by id", async () => {
    const id = "636b858f385786b2ad311135";
    const response = await chai
      .request(server)
      .get("/api/survey/survey-question/" + id);

    assert.equal(response.status, 200);
    assert.typeOf(response.body, "object");
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
