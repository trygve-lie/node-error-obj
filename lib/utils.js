"use strict";

const isObject = require('lodash.isobject');
const isError = require('lodash.iserror');



/**
  * Converts the first letter of a string to lowercase
  *
  * @param {String} str A string to convert the first letter to lowercase on
  * @returns {String} 
  */
  
module.exports.firstLetterToLowerCase = (str) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
};



module.exports.hasProblem = (args, length) => {
    return (isObject(args[(length - 1)]) && !isError(args[(length - 1)]));
};



module.exports.hasError = (args) => {
	return isError(args[0]);
};
