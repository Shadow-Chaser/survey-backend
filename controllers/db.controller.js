const fs = require("fs");

const readDB = (collection) => {
  return new Promise((resolve, reject) => {
    fs.readFile(process.cwd() + `/db/${collection}`, "utf-8", (err, data) => {
      if (err) {
        reject("Something went wrong");
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const writeDB = (data, collection) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      process.cwd() + `/db/${collection}`,
      JSON.stringify(data),
      (err) => {
        if (err) {
          reject("Something went wrong");
        } else {
          resolve(JSON.stringify(data));
        }
      }
    );
  });
};

module.exports = { readDB, writeDB };
