"use strict";

const isError = require('lodash.iserror');
const isString = require('lodash.isstring');
const isObject = require('lodash.isobject');



/**
  * Generic Error object constructor
  *
  * @param {String|Error} message A message to append to the Error Object or an existing Error Object
  * @param {Object} problem An  message to append to the Error Object
  * @returns {this}
  */

module.exports = function (message, problem) {
    this.message = '';
    this.details = [];

    if (isObject(problem)) {
        this.details.push(problem);
    }

    if (isError(message)) {
        this.message = message.message;
        if (Array.isArray(message.details)) {
            this.details = this.details.concat(message.details);
        }
        Error.captureStackTrace(message);
        return;
    }

    if (isString(message)) {
        this.message = message;
    }

    Error.captureStackTrace(this);

    return this;
};
