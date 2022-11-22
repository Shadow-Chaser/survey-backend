const mongoose = require("mongoose");
const { MONGO_CONNECTION_STRING, NODE_ENV } = require("./env.config");

const mongoConnection = () => {
  return mongoose.connect(`${MONGO_CONNECTION_STRING}-${NODE_ENV}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = mongoConnection;
