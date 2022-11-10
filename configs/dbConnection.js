const mongoConnection = require("./mongoose");
const DB_DRIVER =
  process.env.DB_MODE === "json" ? "mongo" : process.env.DB_MODE;

const connections = {
  mongo: mongoConnection,
  //   json: null,
};

const dbConnection = connections[DB_DRIVER];

module.exports = dbConnection;
