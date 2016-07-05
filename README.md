# node-error-obj

[![Dependencies](https://img.shields.io/david/amedia/node-error-obj.svg?style=flat-square)](https://david-dm.org/amedia/node-error-obj)[![Build Status](http://img.shields.io/travis/amedia/node-error-obj/master.svg?style=flat-square)](https://travis-ci.org/amedia/node-error-obj)


HTTP friendly error objects for throwing proper errors with a mapping to http
error statuses. Intention is to signal what http error status to respond with in 
a context of an error happening in a http request.

The error objects support:

* nesting of errors in a "cause chain"
* `printf`-like formating of the error message
* attachment of a "problem" object for more detailed http error responses

The [node-error-mid](https://github.com/amedia/node-error-mid) module is a
Express.js middleware for capturing and rendering http error status pages based
on these error objects.


## Installation

```bash
$ npm install error-obj
```


## Simple usage

Create a file not found error:

```js
const ErrObj = require('error-obj');

let file = '/bar.txt';
let err = new ErrObj.notFoundError('File "%s" could not be found', file);
console.error(err.message); // File "/bar.txt" could not be found
```


## Constructors

This module return a object with a set of constructors where each constructor
resembe a http status error type. All constructors take the same set of 
attributes and have identical behaviour.

Examples:

Create an error object intended to yeld a http 404 Not found error:

```js
let err = new ErrObj.notFoundError('File "%s" could not be found', file);
```

Create an error object intended to yeld a http 401 Unauthorized error:

```js
let err = new ErrObj.unauthorizedError('User "%s" not granted access', username);
```

Please see the API section for a complete map of constructors and their mapping
to http error statuses.