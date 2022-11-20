const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.route");
const surveyRouter = require("./routes/survey.route");

const app = express();
app.use(cors());
app.use(express.json());

// app.use("/api/survey", surveyRouter);
// app.use("/api/user", userRouter);

require("./routes")(app);

module.exports = app;
