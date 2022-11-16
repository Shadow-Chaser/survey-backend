const express = require("express");
const cors = require("cors");
const surveyRouter = require("./routes/survey.route");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/survey", surveyRouter);

module.exports = app;
