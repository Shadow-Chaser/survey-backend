const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");
const dbConnection = require("./configs/dbConnection");
console.log("🚀 ~ file: server.js ~ line 5 ~ dbConnection", dbConnection);

dbConnection()
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(
    `Listening on port ${process.env.PORT}... and DB Mode : ${process.env.DB_MODE}`
  );
});
