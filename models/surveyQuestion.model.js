const { Schema, model } = require("mongoose");

const surveyQuestionSchema = Schema({
  question: {
    type: String,
    required: true,
    maxLength: 255,
  },
  options: {
    type: Array,
    required: true,
  },
});

module.exports = model("SurveyQuestion", surveyQuestionSchema);
