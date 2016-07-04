'use strict'

const bench = require('fastbench');
const ErrObj = require('../');
const VError = require('verror');

const runs = 10000;
const max = 10;

const run = bench([
  function benchErrObj_basic (cb) {
    for (var i = 0; i < max; i++) {
      new ErrObj.notFoundError('hello error');
    }
    setImmediate(cb);
  },
  function benchVError_basic (cb) {
    for (var i = 0; i < max; i++) {
      new VError('hello error');
    }
    setImmediate(cb);
  },


  function benchErrObj_printf_msg (cb) {
    for (var i = 0; i < max; i++) {
      new ErrObj.notFoundError('hello %s error %', 'a', 'b');
    }
    setImmediate(cb);
  },
  function benchVError_printf_msg (cb) {
    for (var i = 0; i < max; i++) {
      new VError('hello %s error %', 'a', 'b');
    }
    setImmediate(cb);
  },


  function benchErrObj_combine (cb) {
    for (var i = 0; i < max; i++) {
      let err1 = new ErrObj.notFoundError('No such file or directory');
      let err2 = new ErrObj.notFoundError(err1, 'failed to stat "%s"', '/junk');
      let err3 = new ErrObj.notFoundError(err2, 'request failed');
    }
    setImmediate(cb);
  },
  function benchVError_combine (cb) {
    for (var i = 0; i < max; i++) {
      let err1 = new VError('No such file or directory');
      let err2 = new VError(err1, 'failed to stat "%s"', '/junk');
      let err3 = new VError(err2, 'request failed');
    }
    setImmediate(cb);
  }
], runs);

run(run);
