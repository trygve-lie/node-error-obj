"use strict";

const tap   = require('tap'),
      joi   = require('joi'),
      error = require('../');



const schemaA = joi.string().label('a');
const schemaB = joi.number().label('b');
const schemaC = joi.object().keys({
    a : schemaA,
    b : schemaB
}).label('c');



tap.test('joi - pass joi error to an validationError error - "name" should be "ValidationError"', (t) => {
    joi.validate(10, schemaA, (err, result) => {
        let e = new error.validationError(err);
        t.equals(e.name, 'ValidationError');
        t.end();
    });
});


tap.test('joi - pass joi error to an notFoundError error - "name" should be "NotFoundError"', (t) => {
    joi.validate(10, schemaA, (err, result) => {
        let e = new error.notFoundError(err);
        t.equals(e.name, 'NotFoundError');
        t.end();
    });
});


tap.test('joi - pass joi error - single validation - "details" should match those from joi', (t) => {
    joi.validate(10, schemaA, (err, result) => {
        let e = new error.validationError(err);
        t.equals(e.details.length, 1);
        t.equals(e.details[0].message, '"a" must be a string');
        t.equals(e.details[0].path, 'a');
        t.equals(e.details[0].type, 'string.base');
        t.equals(e.details[0].context.value, 10);
        t.equals(e.details[0].context.key, "a");
        t.end();
    });
});


tap.test('joi - pass joi error - multiple validations - "details" should match those from joi', (t) => {
    joi.validate({a : 10, b : 'foo'}, schemaC, {abortEarly : false}, (err, result) => {
        let e = new error.validationError(err);
        t.equals(e.details.length, 2);
        t.equals(e.details[0].message, '"a" must be a string');
        t.equals(e.details[1].message, '"b" must be a number');
        t.end();
    });
});
