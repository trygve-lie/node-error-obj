"use strict";

const tap   = require('tap'),
      Err   = require('../lib/error.js');



tap.test('constructor() - create new object with no values - should hold default values', (t) => {
    let e = new Err();
    t.type(e, 'object');
    t.equals(e.message, '');
    t.type(e.problem, 'object');
    t.end();
});


tap.test('constructor() - create new object - should have a stacktrace', (t) => {
    let e = new Err();
    t.type(e.stack, 'string');
    t.end();
});


tap.test('constructor() - create new object with a String for "message" - should set value on "message"', (t) => {
    let e = new Err('Test Message');
    t.equals(e.message, 'Test Message');
    t.end();
});


tap.test('constructor() - create new object with a Object for "problem" - should set value on "problem"', (t) => {
    let e = new Err('Test Message', {test : 'test'});
    t.equals(e.problem.test, 'test');
    t.end();
});


tap.test('constructor() - create new object with a Error for "message" - should set value on "message"', (t) => {
    let e = new Err(new Error('Test Error Message'));
    t.equals(e.message, 'Test Error Message');
    t.end();
});
