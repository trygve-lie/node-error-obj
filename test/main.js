"use strict";

const tap   = require('tap');
const utils = require('../lib/utils.js');
const defs  = require('error-def');
const error = require('../');


tap.test('error() - should have all values in the error definitions as constructors', (t) => {
    Object.keys(defs).forEach((name) => {
        let fnName = utils.firstLetterToLowerCase(name);
        t.type(error[fnName], 'function');
    });
    t.end();
});


tap.test('error() - object should have a name matching definitions', (t) => {
    Object.keys(defs).forEach((name) => {
        let fnName = utils.firstLetterToLowerCase(name);
        let err = new error[fnName]();
        t.type(err.name, name);
    });
    t.end();
});


tap.test('error() - object should have issue method', (t) => {
    Object.keys(defs).forEach((name) => {
        let fnName = utils.firstLetterToLowerCase(name);
        let err = new error[fnName]();
        t.type(err.issue, 'function');
    });
    t.end();
});


tap.test('error() - call constructor without "new" - should construct an object', (t) => {
    Object.keys(defs).forEach((name) => {
        let fnName = utils.firstLetterToLowerCase(name);
        let err = error[fnName]();
        t.equal(err.name, name);
    });
    t.end();
});


tap.test('.issue() - set values - values should be set on the ".details"', (t) => {
    Object.keys(defs).forEach((name) => {
        let fnName = utils.firstLetterToLowerCase(name);
        let err = new error[fnName]();
        err.issue('foo', 'a');
        err.issue('bar', 'b');
        t.equal(err.details.foo, 'a');
        t.equal(err.details.bar, 'b');
    });
    t.end();
});


tap.test('.issue() - chain metods - values should be set on the ".details"', (t) => {
    Object.keys(defs).forEach((name) => {
        let fnName = utils.firstLetterToLowerCase(name);
        let err = new error[fnName]();
        err.issue('foo', 'a').issue('bar', 'b');
        t.equal(err.details.foo, 'a');
        t.equal(err.details.bar, 'b');
    });
    t.end();
});


tap.test('.fromProblem() - pass in a literal without "_name" - should create generic error object', (t) => {
    Object.keys(defs).forEach((name) => {
        let err = error.fromProblem({});
        t.equal(err.name, 'Error');
    });
    t.end();
});


tap.test('.fromProblem() - pass in a literal with "_name" - should create generic error object', (t) => {
    Object.keys(defs).forEach((name) => {
        let err = error.fromProblem({_name : name});
        t.equal(err.name, name);
    });
    t.end();
});
