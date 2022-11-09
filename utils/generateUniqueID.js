const crypto = require("crypto");

const generateUniqueId = async () => {
  const randomString = crypto.randomBytes(5).toString("hex");
  const getMilliseconds = new Date().getMilliseconds();
  const uniqueId = randomString + getMilliseconds;
  return uniqueId;
};

module.exports = generateUniqueId;
