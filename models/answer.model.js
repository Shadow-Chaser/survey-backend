const { Schema, model } = require("mongoose");

const answerSchema = Schema(
  {
    surveyId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Survey",
    },
    answers: [
      {
        choosenOption: String,
        questionId: Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Answer", answerSchema);
