const surveyRouter = require("./survey.route");
const userRouter = require("./user.route");

module.exports = (app) => {
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/surveys", surveyRouter);
};
