"use strict";

const utils = require('./utils');
const format = require('quick-format');



/**
  * Generic Error object constructor
  *
  * @param {String|Error} message A message to append to the Error Object or an existing Error Object
  * @param {Object} problem An  message to append to the Error Object
  * @returns {this}
  */

module.exports = function (...args) {
    this.message = '';
    this.details = [];
    this.cause = null;

    const length = args.length;
    let argStart = 0;
    let argStop  = length;

    if (utils.hasProblem(args, length)) {
        this.details = this.details.concat(args[length - 1]);
        argStop = length - 1;
    }

    if (utils.hasError(args)) {
        if (Array.isArray(args[argStart].details)) {
            this.details = this.details.concat(args[argStart].details);
        }

        argStart = 1;
    }

    if (utils.hasError(args) && length === 1) {
        this.message = args[0].message;
        Error.captureStackTrace(args[0], this);
        return;
    }

    this.message = format(args.slice(argStart, argStop));
    Error.captureStackTrace(this);
    return this;
};
