const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
chai.use(chaiHttp);
chai.should();

// POST testing create survey api
describe("POST api/survey/survey-question", () => {
  it("It should create a survey", () => {
    const payload = {
      question: "Test question 99 ?",
      options: ["opt1", "opt2"],
    };
    chai
      .request(app)
      .post("/api/survey/survey-question")
      .send(payload)
      .end((error, response) => {
        console.log(
          "🚀 ~ file: surveyQuestion.test.js ~ line 21 ~ .end ~ response",
          response.body
        );
        response.should.have.status(201);
        response.body.should.be.a("object");
        response.body.should.not.have.property("error");
      });
  });

  it("It should not create a survey : null payload", () => {
    const payload = null;
    chai
      .request(app)
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
      .request(app)
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
      question: "Test question 99 ?",
      options: ["opt1", "opt2"],
      test: "test",
    };
    chai
      .request(app)
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
      question: "Test question 99 ?",
    };
    chai
      .request(app)
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
      question: 99,
      options: "opt1",
    };
    chai
      .request(app)
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
      .request(app)
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
      .request(app)
      .get("/api/survey/survey-question/" + id)
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
      });
  });

  it("It should not get the survey : invalid id", () => {
    const id = "636b858f385786b2ad3111wer";
    chai
      .request(app)
      .get("/api/survey/survey-question/" + id)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.a("object");
      });
  });

  it("It should not get the survey : null id", () => {
    const id = null;
    chai
      .request(app)
      .get("/api/survey/survey-question/" + id)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.a("object");
      });
  });
});
