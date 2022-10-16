const express = require("express");
const cors = require("cors");
const surveyRouter = require("./routes/survey.route");
const port = 8080;

const app = express();
app.use(express.json());

app.use("/api/survey", surveyRouter);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
