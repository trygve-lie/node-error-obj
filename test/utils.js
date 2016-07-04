"use strict";

const tap   = require('tap'),
      utils = require('../lib/utils.js');


tap.test('.firstLetterToLowerCase() - should turn first character to lower case', (t) => {
    let str = utils.firstLetterToLowerCase('TestError');
    t.equals(str, 'testError');
    t.end();
});



tap.test('.hasProblem() - [] - should return "false"', (t) => {
    let args = [];
    let length = args.length;
    let result = utils.hasProblem(args, length);
    t.equals(result, false);
    t.end();
});


tap.test('.hasProblem() - ["a"] - should return "false"', (t) => {
    let args = ['a'];
    let length = args.length;
    let result = utils.hasProblem(args, length);
    t.equals(result, false);
    t.end();
});


tap.test('.hasProblem() - [{}] - should return "true"', (t) => {
    let args = [{}];
    let length = args.length;
    let result = utils.hasProblem(args, length);
    t.equals(result, true);
    t.end();
});


tap.test('.hasProblem() - ["a", {}] - should return "true"', (t) => {
    let args = ['a', {}];
    let length = args.length;
    let result = utils.hasProblem(args, length);
    t.equals(result, true);
    t.end();
});


tap.test('.hasProblem() - ["a", "b", {}] - should return "true"', (t) => {
    let args = ['a', 'b', {}];
    let length = args.length;
    let result = utils.hasProblem(args, length);
    t.equals(result, true);
    t.end();
});


tap.test('.hasProblem() - [Error()] - should return "false"', (t) => {
    let args = [new Error()];
    let length = args.length;
    let result = utils.hasProblem(args, length);
    t.equals(result, false);
    t.end();
});


tap.test('.hasProblem() - [Error(), {}] - foo', (t) => {
    let args = [new Error(), {}];
    let length = args.length;
    let result = utils.hasProblem(args, length);
    t.equals(result, true);
    t.end();
});