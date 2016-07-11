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


## Nested errors

All error objects support nesting of other error objects and will produce a
nested stack trace.

```js
var err1 = new Error('No such file or directory');
var err2 = new ErrObj.notFoundError(err1, 'failed to stat "%s"', '/junk');
var err3 = new ErrObj.notFoundError(err2, 'request failed');
console.log(err3)
```

will produce:

```sh
{ NotFoundError: request failed: failed to stat "/junk": No such file or directory
    at Object.<anonymous> (manual.test.js:39:12)
    at Module._compile (module.js:541:32)
    at Object.Module._extensions..js (module.js:550:10)
    at Module.load (module.js:458:32)
    at tryModuleLoad (module.js:417:12)
    at Function.Module._load (module.js:409:3)
    at Function.Module.runMain (module.js:575:10)
    at startup (node.js:160:18)
    at node.js:456:3
  message: 'request failed: failed to stat "/junk": No such file or directory',
  details: [],
  parent: 
   { NotFoundError: failed to stat "/junk": No such file or directory
       at Object.<anonymous> (manual.test.js:38:12)
       at Module._compile (module.js:541:32)
       at Object.Module._extensions..js (module.js:550:10)
       at Module.load (module.js:458:32)
       at tryModuleLoad (module.js:417:12)
       at Function.Module._load (module.js:409:3)
       at Function.Module.runMain (module.js:575:10)
       at startup (node.js:160:18)
       at node.js:456:3
     message: 'failed to stat "/junk": No such file or directory',
     details: [],
     parent: 
      Error: No such file or directory
          at Object.<anonymous> (manual.test.js:37:12)
          at Module._compile (module.js:541:32)
          at Object.Module._extensions..js (module.js:550:10)
          at Module.load (module.js:458:32)
          at tryModuleLoad (module.js:417:12)
          at Function.Module._load (module.js:409:3)
          at Function.Module.runMain (module.js:575:10)
          at startup (node.js:160:18)
          at node.js:456:3 } }
```


### Cause compatibility

All error objects contain a `cause()` method to support printing deeper stack
traces when logging with log frameworks such as `bole` or `bunyan`.


## API

The API is defined by the [node-error-def](https://github.com/amedia/node-error-def)
module. 

The API is:

 * `.badRequestError()` - 400 Bad Request
 * `.unauthorizedError()` - 401 Unauthorized
 * `.paymentRequiredError()` - 402 Payment Required
 * `.forbiddenError()` - 403 Forbidden
 * `.notFoundError()` - 404 Not Found
 * `.methodNotAllowedError()` - 405 Method Not Allowed
 * `.notAcceptableError()` - 406 Not Acceptable
 * `.proxyAuthenticationRequiredError()` - 407 Proxy Authentication Required
 * `.requestTimeoutError()` - 408 Request Time-out
 * `.conflictError()` - 409 Conflict
 * `.goneError()` - 410 Gone
 * `.lengthRequiredError()` - 411 Length Required
 * `.preconditionFailedError()` - 412 Precondition Failed
 * `.requestEntityTooLargeError()` - 413 Request Entity Too Large
 * `.requesturiTooLargeError()` - 414 Request-URI Too Large
 * `.unsupportedMediaTypeError()` - 415 Unsupported Media Type
 * `.requestedRangeNotSatisfiableError()` - 416 Requested Range Not Satisfiable
 * `.expectationFailedError()` - 417 Expectation Failed
 * `.imATeapotError()` - 418 I'm a teapot
 * `.unprocessableEntityError()` - 422 Unprocessable Entity
 * `.lockedError()` - 423 Locked
 * `.failedDependencyError()` - 425 Unordered Collection
 * `.unorderedCollectionError()` - 425 Unordered Collection
 * `.upgradeRequiredError()` - 426 Upgrade Required
 * `.preconditionRequiredError()` - 428 Precondition Required
 * `.tooManyRequestsError()` - 429 Too Many Requests
 * `.requestHeaderFieldsTooLargeError()` - 431 Too Many Requests
 * `.internalServerError()` - 500 Internal Server Error
 * `.notImplementedError()` - 501 Not Implemented
 * `.badGatewayError()` - 502 Bad Gateway
 * `.serviceUnavailableError()` - 503 Service Unavailable
 * `.gatewayTimeoutError()` - 504 Gateway Time-out
 * `.httpVersionNotSupportedError()` - 505 HTTP Version Not Supported
 * `.variantAlsoNegotiatesError()` - 506 Variant Also Negotiates
 * `.insufficientStorageError()` - 507 Insufficient Storage
 * `.bandwidthLimitExceededError()` - 509 Bandwidth Limit Exceeded
 * `.networkAuthenticationRequiredError()` - 511 Network Authentication Required
 * `.badDigestError()` - 400 Bad Request
 * `.badMethodError()` - 400 Bad Request
 * `.internalError()` - 500 Internal Server Error
 * `.invalidArgumentError()` - 409 Conflict
 * `.invalidContentError()` - 400 Bad Request
 * `.invalidCredentialsError()` - 401 Unauthorized
 * `.invalidHeaderError()` - 400 Bad Request
 * `.invalidVersionError()` - 400 Bad Request
 * `.missingParameterError()` - 409 Conflict
 * `.notAuthorizedError()` - 403 Forbidden
 * `.requestExpiredError()` - 400 Bad Request
 * `.requestThrottledError()` - 429 Too Many Requests
 * `.resourceNotFoundError()` - 404 Not Found
 * `.wrongAcceptError()` - 406 Not Acceptable
 * `.validationError()` - 400 Bad Request


## License 

The MIT License (MIT)

Copyright (c) 2016 - Amedia Utvikling

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
