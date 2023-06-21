const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../configs/env.config");

module.exports = function (req, res, next) {
  let token = req.header("Authorization");

  if (!token) res.status(401).send("Access denied!");

  try {
    const decoded = jwt.verify(token.split(" ")[1].trim(), JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).send("Invalid Token!");
  }
};
