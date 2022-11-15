const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const { faker } = require("@faker-js/faker");
chai.use(chaiHttp);
chai.should();

// POST testing create survey api
describe("POST api/survey/survey-question", () => {
  it("It should create a survey", () => {
    const payload = {
      question: faker.lorem.sentence(),
      options: faker.datatype.array(),
    };

    chai
      .request(server)
      .post("/api/survey/survey-question")
      .send(payload)
      .end((error, response) => {
        // console.log(
        //   "🚀 ~ file: surveyQuestion.test.js ~ line 21 ~ .end ~ response",
        //   response.body
        // );
        response.should.have.status(201);
        response.body.should.be.a("object");
        response.body.should.not.have.property("error");
      });
  });

  it("It should not create a survey : null payload", () => {
    const payload = null;
    chai
      .request(server)
      .post("/api/survey/survey-question")
      .send(payload)
      .end((error, response) => {
        // console.log("🚀 ~ file: surveyQuestion.test.js ~ line 21 ~ .end ~ response", response.body);
        response.should.have.status(400);
        response.body.should.be.a("object");
      });
  });

  it("It should not create a survey : empty payload", () => {
    const payload = {};
    chai
      .request(server)
      .post("/api/survey/survey-question")
      .send(payload)
      .end((error, response) => {
        // console.log("🚀 ~ file: surveyQuestion.test.js ~ line 21 ~ .end ~ response", response.body);
        response.should.have.status(400);
        response.body.should.be.a("object");
      });
  });

  it("It should not create a survey : payload overflow", () => {
    const payload = {
      question: faker.lorem.sentence(),
      options: faker.datatype.array(),
      extra: faker.random.alphaNumeric(),
    };
    chai
      .request(server)
      .post("/api/survey/survey-question")
      .send(payload)
      .end((error, response) => {
        // console.log("🚀 ~ file: surveyQuestion.test.js ~ line 21 ~ .end ~ response", response.body);
        response.should.have.status(400);
        response.body.should.be.a("object");
      });
  });

  it("It should not create a survey : payload underflow", () => {
    const payload = {
      question: faker.lorem.sentence(),
    };
    chai
      .request(server)
      .post("/api/survey/survey-question")
      .send(payload)
      .end((error, response) => {
        // console.log("🚀 ~ file: surveyQuestion.test.js ~ line 21 ~ .end ~ response", response.body);
        response.should.have.status(400);
        response.body.should.be.a("object");
      });
  });

  it("It should not create a survey : invalid payload", () => {
    const payload = {
      options: faker.lorem.sentence(),
      question: faker.datatype.array(),
    };
    chai
      .request(server)
      .post("/api/survey/survey-question")
      .send(payload)
      .end((error, response) => {
        // console.log("🚀 ~ file: surveyQuestion.test.js ~ line 21 ~ .end ~ response", response.body);
        response.should.have.status(400);
        response.body.should.be.a("object");
      });
  });
});

// GET testing getting survey api
describe("GET api/survey/survey-questions", () => {
  it("It should get all the survey questions", () => {
    chai
      .request(server)
      .get("/api/survey/survey-questions")
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.a("array");
      });
  });
});

// GET testing getting survey by id api
describe("GET api/survey/survey-question/:id", () => {
  it("It should get the survey by id", () => {
    const id = "636b858f385786b2ad311135";
    chai
      .request(server)
      .get("/api/survey/survey-question/" + id)
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
      });
  });

  it("It should not get the survey : invalid id", () => {
    const id = faker.random.alphaNumeric();
    chai
      .request(server)
      .get("/api/survey/survey-question/" + id)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.a("object");
      });
  });

  it("It should not get the survey : null id", () => {
    const id = null;
    chai
      .request(server)
      .get("/api/survey/survey-question/" + id)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.a("object");
      });
  });
});
