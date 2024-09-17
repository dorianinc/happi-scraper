const fs = require("fs");
const path = require("path");

const writeToFile = (data, file) => {
  const filePath = path.resolve(__dirname, '..', 'data', file);
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    // In case of a error throw err.
    if (err) throw err;
  });
};

module.exports = {
  writeToFile,
};
