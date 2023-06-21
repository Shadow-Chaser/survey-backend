const { Schema, model } = require("mongoose");

const surveySchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    survey: [
      {
        question: {
          type: String,
          required: true,
        },
        options: [
          {
            type: String,
          },
        ],
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("Survey", surveySchema);
