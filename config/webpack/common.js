"use strict";

var tsLintConfigObj = {
  // tslint errors are displayed by default as warnings
  // set emitErrors to true to display them as errors
  emitErrors: false,

  // tslint does not interrupt the compilation by default
  // if you want any file with tslint errors to fail
  // set failOnHint to true
  failOnHint: true,

  //  cf.: https://github.com/wbuchwalter/tslint-loader
  //  More formatters:
  //    https://palantir.github.io/tslint/formatters/
  formatter: "codeFrame"
  // formatter: "prose"
};

module.exports = {
  tsLintConfigObj: tsLintConfigObj
};
