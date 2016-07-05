# node-error-obj

[![Dependencies](https://img.shields.io/david/amedia/node-error-obj.svg?style=flat-square)](https://david-dm.org/amedia/node-error-obj)[![Build Status](http://img.shields.io/travis/amedia/node-error-obj/master.svg?style=flat-square)](https://travis-ci.org/amedia/node-error-obj)


HTTP friendly error objects for throwing proper errors with a mapping to [http
error statuses](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes). 
Intention is to signal what http error status to respond with in a context of an 
error happening in a http request.

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
new ErrObj.notFoundError('File "%s" could not be found', file);
```

Create an error object intended to yeld a http 401 Unauthorized error:

```js
new ErrObj.unauthorizedError('User "%s" not granted access', username);
```

Please see the API section for a complete map of constructors and their mapping
to http error statuses.


## Constructor arguments

Create a new error object (using `notFoundError` as example):

```js
let err = new ErrObj.notFoundError([Error|message], [message, var1, var2...], problem);
```

### [Error|message]

The first argument can be provided with either a message string or an existing
Error object.

```js
new ErrObj.notFoundError('Something wrong');
```

```js
new ErrObj.notFoundError(new Error());
```

In the case of an existing Error object being applied as the first argument to 
the constructor the existing Error object will be nested inside the new Error.
Please see the section about nesting for more information.

This argument is optional.


### [message, var1, var2...]

The second argument depend on whats applied as the first argument. If the first
argument to the constructor is a message string the second (and third, fourth,
etc) arguments acts as `printf`-like formating varaibles.

```js
new ErrObj.notFoundError('Something %s wrong', 'is very');
```

If the first argument to the constructor is an existing Error object, the second
argument to the constructor acts as a message string. Then the third, fourth,
etc arguments acts as `printf`-like formating varaibles.

```js
new ErrObj.notFoundError(new Error(), 'Something %s wrong', 'is very');
```

All arguments are optional.


### problem

If the last argument to the constructor are of the type `Object` it will act
as an problem object. A problem object can be any object (except an `Error` 
object) which are intended to be passed on all the way through to the http error
status response.

```js
new ErrObj.notFoundError('Something wrong', {file : 'foo.txt'});
```

Please see the section about problem objects for more information.

This argument is optional.
