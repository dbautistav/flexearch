"use strict";

var _ = require("lodash");
var webpack = require("webpack");

var HtmlWebpackPlugin = require("html-webpack-plugin");

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var LoaderOptionsPlugin = webpack.LoaderOptionsPlugin;
var tsLintConfigObj = require("./common").tsLintConfigObj;

var clientConfigObj = {
  devServer: {
    host: "0.0.0.0",
    port: 8080
  },

  // devtool: "source-map",
  devtool: "eval-source-map",
  // devtool: "cheap-module-eval-source-map",

  //  TODO: enable this for 'production' ENV
  entry: {
    "main": "./src/main.ts"
    // "polyfills": "./src/polyfills.ts",
    // "vendor": "./src/vendor.ts"
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

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   */
  output: {
    chunkFilename: "[id].chunk.js",
    filename: "[name].js"
    // path: "dist"
  },

  plugins: [
    new CommonsChunkPlugin({
      //  TODO: enable this for 'production' ENV
      // name: ["main", "polyfills", "vendor"]
      name: "main"
    }),
    new HtmlWebpackPlugin({
        template: "./src/index.html"
    }),
    // //  cf.: https://github.com/TypeStrong/ts-loader
    // //  cf.: https://github.com/wbuchwalter/tslint-loader
    new LoaderOptionsPlugin({
      // debug: false,
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

module.exports = clientConfigObj;
