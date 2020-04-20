var path = require("path");
var webpack = require("webpack");
module.exports = {
  entry: "./client/index.js",
  output: {
    path: path.join(__dirname, "client"),
    publicPath: "/clinet/",
    filename: "bundle.js",
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: [
            "@babel/preset-env",
            "@babel/react",
            {
              plugins: ["@babel/plugin-proposal-class-properties"],
            },
          ],
        },
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
    ],
  },
};
