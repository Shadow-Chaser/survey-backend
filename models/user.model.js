const { Schema, model } = require("mongoose");

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, "Minimum Length of the email must be 5"],
    maxLength: 255,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 1024,
  },
});

module.exports = model("User", userSchema);
