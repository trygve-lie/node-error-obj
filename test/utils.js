"use strict";

const tap   = require('tap'),
      utils = require('../lib/utils.js');


tap.test('.firstLetterToLowerCase() - should turn first character to lower case', (t) => {
    let str = utils.firstLetterToLowerCase('TestError');
    t.equals(str, 'testError');
    t.end();
});
