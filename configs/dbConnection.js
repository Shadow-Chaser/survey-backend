const { DB_DRIVER } = require("./env.config");
const mongoConnection = require("./mongoose");

const connections = {
  mongo: mongoConnection,
  //   json: null,
};

const dbConnection = connections[DB_DRIVER];

module.exports = dbConnection;
