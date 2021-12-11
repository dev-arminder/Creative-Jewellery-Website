const path = require("path");
const { merge } = require("webpack-merge");
const config = require("./webpack.config");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(config, {
  mode: "production",

  output: {
    path: path.resolve(__dirname, "public")
  },
  plugins: [new CleanWebpackPlugin()]
});
