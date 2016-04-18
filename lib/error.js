"use strict";

const isError = require('lodash.iserror');
const isString = require('lodash.isstring');
const isObject = require('lodash.isobject');



/**
  * Generic Error object constructor
  *
  * @param {String} message A message to append to the Error Object
  * @param {Object} problem An  message to append to the Error Object
  * @returns {this}
  */

module.exports = function (message, problem) {
    this.message = '';
    this.problem = {};

    if (isObject(problem)) {
        this.problem = problem;
    }

    if (isError(message)) {
        this.message = message.message;
        Error.captureStackTrace(message);
        return;
    }

    if (isString(message)) {
        this.message = message;
    }

    Error.captureStackTrace(this);

    return this;
};
