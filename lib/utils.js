"use strict";



/**
  * Converts the first letter of a string to lowercase
  *
  * @param {String} str A string to convert the first letter to lowercase on
  * @returns {String} 
  */
  
module.exports.firstLetterToLowerCase = (str) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
};
