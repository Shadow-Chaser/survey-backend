const fileSystemService = require("../services/fs.service");
const mongoService = require("../services/mongo.service");
const DB_DRIVER = process.env.DB_MODE;

const dbConfig = {
  json: fileSystemService,
  mongo: mongoService,
};

const DB = dbConfig[DB_DRIVER];

module.exports = DB;
