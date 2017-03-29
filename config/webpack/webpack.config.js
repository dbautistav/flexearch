"use strict";

var _ = require("lodash");
var path = require("path");
var webpack = require("webpack");

var HtmlWebpackPlugin = require("html-webpack-plugin");

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var LoaderOptionsPlugin = webpack.LoaderOptionsPlugin;
var tsLintConfigObj = require("./common").tsLintConfigObj;

var env = process.env.NODE_ENV || "development";

var clientConfigObj = {
  entry: {
    "main": "./src/main.ts"
  },
  module: {
    rules: [
      {
        enforce: "pre",
        exclude: /node_modules/,
        loader: "tslint-loader",
        test: /\.ts$/
      },
      {
        exclude: [
          /\.d\.ts$/,
          /\.(e2e|spec|test)\.ts$/,
          /__tests__/,
          /node_modules/
        ],
        loaders: ["ts-loader"],
        test: /\.ts$/
      },
      {
        exclude: /node_modules/,
        loader: "html-loader",
        test: /\.html$/
      // },
      // {
      //   exclude: /node_modules/,
      //   loader: "raw-loader!sass-loader",
      //   test: /\.scss$/
      }
      // // { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      // // { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      // // { test: /\.png$/, loader: "url-loader?mimetype=image/png" }
    ]
  },
  name: "client",
  output: _.extend({
    chunkFilename: "[id].chunk.js",
    filename: "[name].js"
  }, (env === "development") ? {} : { path: path.resolve(__dirname, "../../dist") }),
  plugins: [
    new CommonsChunkPlugin({
      name: "main"
    }),
    new HtmlWebpackPlugin({
        template: "./src/index.html"
    }),
    new LoaderOptionsPlugin({
      options: {
        tslint: _.merge({
          configFile: "./src/tslint.json"
        }, tsLintConfigObj)
      },
      test: /\.ts$/
    })
  ],
  resolve: {
    extensions: [".ts", ".js"]
  },
  target: "web"
};

var devOpts = {
    devServer: {
        host: "0.0.0.0",
        port: 8080
    },
    devtool: "eval-source-map"
};

module.exports = _.extend({}, clientConfigObj, (env === "development") ? devOpts : {});
