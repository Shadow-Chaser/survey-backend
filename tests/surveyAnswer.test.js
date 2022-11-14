const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
chai.use(chaiHttp);
chai.should();

// POST testing create survey answer api
describe("POST api/survey/survey-answer", () => {
  it("It should submit a survey", () => {
    const payload = {
      userId: "f58f38hfh777",
      questionId: "636cc816610ce77e6d2e1cf1",
      question: "Test question 44?",
      answer: "opt2",
    };
    chai
      .request(app)
      .post("/api/survey/survey-answer")
      .send(payload)
      .end((error, response) => {
        response.should.have.status(201);
        response.body.should.be.a("object");
        response.body.should.not.have.property("error");
      });
  });

  it("It should not submit a survey : null payload", () => {
    const payload = null;
    chai
      .request(app)
      .post("/api/survey/survey-answer")
      .send(payload)
      .end((error, response) => {
        // console.log("🚀 ~ file: surveyQuestion.test.js ~ line 21 ~ .end ~ response", response.body);
        response.should.have.status(400);
        response.body.should.be.a("object");
      });
  });

  it("It should not submit a survey : empty payload", () => {
    const payload = {};
    chai
      .request(app)
      .post("/api/survey/survey-answer")
      .send(payload)
      .end((error, response) => {
        // console.log("🚀 ~ file: surveyQuestion.test.js ~ line 21 ~ .end ~ response", response.body);
        response.should.have.status(400);
        response.body.should.be.a("object");
      });
  });

  it("It should not submit a survey : payload overflow", () => {
    const payload = {
      userId: "f58f38hfh777",
      questionId: "636cc816610ce77e6d2e1cf1",
      question: "Test question 44?",
      answer: "opt2",
      test: "test",
    };
    chai
      .request(app)
      .post("/api/survey/survey-answer")
      .send(payload)
      .end((error, response) => {
        // console.log("🚀 ~ file: surveyQuestion.test.js ~ line 21 ~ .end ~ response", response.body);
        response.should.have.status(400);
        response.body.should.be.a("object");
      });
  });

  it("It should not submit a survey : payload underflow", () => {
    const payload = {
      userId: "f58f38hfh777",
      questionId: "636cc816610ce77e6d2e1cf1",
      question: "Test question 44?",
    };
    chai
      .request(app)
      .post("/api/survey/survey-answer")
      .send(payload)
      .end((error, response) => {
        // console.log("🚀 ~ file: surveyQuestion.test.js ~ line 21 ~ .end ~ response", response.body);
        response.should.have.status(400);
        response.body.should.be.a("object");
      });
  });

  it("It should not submit a survey : invalid payload", () => {
    const payload = {
      userId: 777,
      questionId: 36347,
      question: 53,
      answer: ["opt2"],
    };
    chai
      .request(app)
      .post("/api/survey/survey-answer")
      .send(payload)
      .end((error, response) => {
        // console.log("🚀 ~ file: surveyQuestion.test.js ~ line 21 ~ .end ~ response", response.body);
        response.should.have.status(400);
        response.body.should.be.a("object");
      });
  });
});

// GET testing getting survey answer api
describe("GET api/survey/survey-answers", () => {
  it("It should get all the survey submission", () => {
    chai
      .request(app)
      .get("/api/survey/survey-answers")
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.a("array");
      });
  });
});

// GET testing getting all survey submission by user id api
describe("GET api/survey/survey-answers/user/:userId", () => {
  it("It should get the survey submission by id", () => {
    const userId = "f58f38hfh888";
    chai
      .request(app)
      .get("/api/survey/survey-answers/user/" + userId)
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.a("array");
      });
  });

  it("It should not get the survey submissions : invalid id", () => {
    const userId = "636b858f385786b2ad311sd1wer";
    chai
      .request(app)
      .get("/api/survey/survey-answers/user/" + userId)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.a("object");
      });
  });

  it("It should not get the survey submissions : null id", () => {
    const userId = null;
    chai
      .request(app)
      .get("/api/survey/survey-answers/user/" + userId)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.a("object");
      });
  });
});
