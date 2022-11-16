const mongoose = require("mongoose");
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
const NODE_ENV = process.env.NODE_env;

const mongoConnection = () => {
  return mongoose.connect(
    `${process.env.MONGO_CONNECTION_STRING}-${process.env.NODE_env}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

module.exports = mongoConnection;
