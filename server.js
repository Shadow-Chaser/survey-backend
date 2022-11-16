const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");
const dbConnection = require("./configs/dbConnection");

dbConnection()
  .then(() => console.log(`Connected to ${process.env.NODE_ENV} Database`))
  .catch((err) => console.log(err));

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Listening on port ${process.env.PORT}... and DB Mode : ${process.env.DB_MODE}`
  );
});

module.exports = server;
