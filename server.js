const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");
const dbConnection = require("./configs/dbConnection");
const { PORT, NODE_ENV, DB_DRIVER } = require("./configs/env.config");

dbConnection()
  .then(() => console.log(`Connected to ${NODE_ENV} Database`))
  .catch((err) => console.log(err));

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}... and DB Mode : ${DB_DRIVER}`);
});

module.exports = server;
