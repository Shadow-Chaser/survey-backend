const { Schema, model } = require("mongoose");

const surveyAnswerSchema = Schema({
  userId: {
    type: String,
    required: true,
  },
  questionId: {
    type: Schema.Types.ObjectId,
  },
  question: {
    type: String,
    required: true,
    maxLength: 255,
  },
  answer: {
    type: String,
    required: true,
    maxLength: 255,
  },
});

module.exports = model("SurveyAnswer", surveyAnswerSchema);
