const path = require("path");

const webpack = require("webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const IS_DEVELOPMENT = process.env.NODE_ENV === "dev";

const dirApp = path.join(__dirname, "app");
const dirAssets = path.join(__dirname, "assets");
const dirStyles = path.join(__dirname, "styles");
const dirNode = "node_modules";

module.exports = {
  entry: [path.join(dirApp + "index.js")]
};
