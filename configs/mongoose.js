const mongoose = require("mongoose");
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
const NODE_ENV = process.env.NODE_ENV;

const mongoConnection = () => {
  return mongoose.connect(`${MONGO_CONNECTION_STRING}-${NODE_ENV}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = mongoConnection;
