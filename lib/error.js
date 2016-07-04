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

const Err = module.exports = function (...args) {
    this.message = '';
    this.details = [];
    this.parent  = {};

    const length = args.length;
    let argStart = 0;
    let argStop  = length;
    let parMsg   = '';

    if (utils.hasProblem(args, length)) {
        this.details = this.details.concat(args[length - 1]);
        argStop = length - 1;
    }

    if (utils.hasError(args)) {
        if (Array.isArray(args[argStart].details)) {
            this.details = this.details.concat(args[argStart].details);
        }
        this.parent = args[argStart];
        parMsg = ': ' + args[argStart].message;
        argStart = 1;
    }

    if (utils.hasError(args) && length === 1) {
        this.message = args[0].message;
        return this;
    }

    this.message = format(args.slice(argStart, argStop)) + parMsg;
    return this;
};
