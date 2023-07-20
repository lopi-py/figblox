const path = require("path");

module.exports = {
  entry: "./out/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "code.js",
  },
};
