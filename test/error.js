"use strict";

const tap   = require('tap'),
      Err   = require('../lib/error.js');



tap.test('constructor() - create new object with no values - should hold default values', (t) => {
    let e = new Err();
    t.type(e, 'object');
    t.equals(e.message, '');
    t.equals(e.details.length, 0);
    t.end();
});

/*
tap.test('constructor() - create new object - should have a stacktrace', (t) => {
    let e = new Err();
    t.type(e.stack, 'string');
    t.end();
});
*/

tap.test('constructor() - create new object with a String for "message" - should set value on "message"', (t) => {
    let e = new Err('Test Message');
    t.equals(e.message, 'Test Message');
    t.end();
});


tap.test('constructor() - create new object with a Object for "problem" - should set value on "details"', (t) => {
    let e = new Err('Test Message', {test : 'test'});
    t.equals(e.details.length, 1);
    t.equals(e.details[0].test, 'test');
    t.end();
});



/*
tap.test('constructor() - foo - bar1', (t) => {
    let e = new Err('Test Message');
//    t.equals(e.details.length, 1);
//    t.equals(e.details[0].test, 'test');
    t.end();
});

tap.test('constructor() - foo - bar2', (t) => {
    let e = new Err('Test %s Message %s', 'a', 'b');
//    t.equals(e.details.length, 1);
//    t.equals(e.details[0].test, 'test');
    t.end();
});

tap.test('constructor() - foo - bar3', (t) => {
    let e = new Err('Test Message', {test : 'test'});
//    t.equals(e.details.length, 1);
//    t.equals(e.details[0].test, 'test');
    t.end();
});

tap.test('constructor() - foo - bar4', (t) => {
    let e = new Err('Test %s Message %s', 'a', 'b', {test : 'test'});
//    t.equals(e.details.length, 1);
//    t.equals(e.details[0].test, 'test');
    t.end();
});




tap.test('constructor() - foo - bar5', (t) => {
    let e = new Err(new Error('a'), 'Test Message');
//    t.equals(e.details.length, 1);
//    t.equals(e.details[0].test, 'test');
    t.end();
});

tap.test('constructor() - foo - bar6', (t) => {
    let e = new Err(new Error('a'), 'Test %s Message %s', 'a', 'b');
//    t.equals(e.details.length, 1);
//    t.equals(e.details[0].test, 'test');
    t.end();
});

tap.test('constructor() - foo - bar7', (t) => {
    let e = new Err(new Error('a'), 'Test Message', {test : 'test'});
//    t.equals(e.details.length, 1);
//    t.equals(e.details[0].test, 'test');
    t.end();
});

tap.test('constructor() - foo - bar8', (t) => {
    let e = new Err(new Error('a'), 'Test %s Message %s', 'a', 'b', {test : 'test'});
//    t.equals(e.details.length, 1);
//    t.equals(e.details[0].test, 'test');
    t.end();
});








*/

tap.test('constructor() - create new object with a Error for "message" - should set value on "message"', (t) => {
    let e = new Err(new Error('Test Error Message'));
    t.equals(e.message, 'Test Error Message');
    t.end();
});
