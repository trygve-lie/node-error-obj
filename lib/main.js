"use strict";

const error = require('./error.js');
const utils = require('./utils.js');
const defs  = require('error-def');



/**
 * Iterate over all error defintions and dynamicly create
 * error methods based on the names of the error definitions
 */

Object.keys(defs).forEach((name) => {
    let fnName = utils.firstLetterToLowerCase(name);
    module.exports[fnName] = function () {
        return error.apply(this, arguments);
    };
    module.exports[fnName].prototype = Object.create(Error.prototype);
    module.exports[fnName].prototype.name = name;
    module.exports[fnName].prototype.constructor = error;


    module.exports[fnName].prototype.issue = function (key, value) {
        this.problem[key] = value;
        return this;
    }
});



/**
  * Create error object instance from a problem object literal 
  *
  * @param {Object} problem A problem object literal
  * @returns {Error}
  */

module.exports.fromProblem = (problem) => {
    if (problem._name) {
        return new this[utils.firstLetterToLowerCase(problem._name)]('', problem);
    }
    
    return new Error();
};
