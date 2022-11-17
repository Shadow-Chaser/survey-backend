const { faker } = require("@faker-js/faker");
const chai = require("chai");
const chaiHttp = require("chai-http");
const DB = require("../configs/db.config");
const User = require("../models/user.model");
const server = require("../server");
const assert = chai.assert;
chai.use(chaiHttp);

describe("User API Test Suit", () => {
  beforeEach(async () => {
    await User.deleteMany();
  });
  //   afterEach(async () => {
  //     await User.deleteMany();
  //   });
  //   testing user registration api
  describe("POST api/user/signup", () => {
    it("It should create a user", async () => {
      const payload = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(10),
      };
      const response = await chai
        .request(server)
        .post("/api/user/signup")
        .send(payload);

      assert.equal(response.status, 201);
      assert.typeOf(response.body, "object");
      assert.typeOf(response.body.name, "string");
      assert.typeOf(response.body.message, "string");
      assert.typeOf(response.body.email, "string");
      assert.equal(response.body.name, payload.name);
      assert.equal(response.body.email, payload.email);
    });

    it("It should not create a user: invalid payload", async () => {
      const payload = {
        name: faker.name.firstName(),
        email: faker.lorem.text(),
        password: faker.internet.password(5),
      };
      const response = await chai
        .request(server)
        .post("/api/user/signup")
        .send(payload);

      assert.equal(response.status, 422);
      assert.typeOf(response.body, "object");
    });
  });

  //   testing user login api
  describe("POST api/user/signin", () => {
    it("It should logged in a user", async () => {
      const payload = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(10),
      };

      // for creating a new user.
      await chai.request(server).post("/api/user/signup").send(payload);
      delete payload.name;

      const response = await chai
        .request(server)
        .post("/api/user/signin")
        .send(payload);

      assert.equal(response.status, 200);
      assert.typeOf(response.body, "object");
      assert.typeOf(response.body.access_token, "string");
    });

    it("It should not logged in a user: wrong password", async () => {
      const payload = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(10),
      };

      // for creating a new user.
      await chai.request(server).post("/api/user/signup").send(payload);
      delete payload.name;
      payload.password = faker.random.alphaNumeric(10);

      const response = await chai
        .request(server)
        .post("/api/user/signin")
        .send(payload);

      assert.equal(response.status, 400);
      assert.typeOf(response.body, "object");
    });
  });
});
