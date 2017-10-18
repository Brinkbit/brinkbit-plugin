(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["brinkbit-plugin"] = factory();
	else
		root["brinkbit-plugin"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable no-param-reassign */

var merge = __webpack_require__(6);
var pick = __webpack_require__(11);
var _get = __webpack_require__(12);
var _set = __webpack_require__(13);
var eventEmitter = __webpack_require__(14);

var validate = __webpack_require__(3);
var normalizeArguments = __webpack_require__(9);
var normalizeResponse = __webpack_require__(34);
var BrinkbitEvent = __webpack_require__(35);

var _require = __webpack_require__(36),
    ensurePromise = _require.ensurePromise,
    promisifyValidation = _require.promisifyValidation;

var Plugin = function () {
    function Plugin(brinkbit, config) {
        _classCallCheck(this, Plugin);

        validate.constructor(config, {
            type: {
                dataType: 'string',
                presence: true,
                inclusion: ['player', 'game', 'core']
            },
            player: {
                dataType: 'object'
            },
            initialData: {
                dataType: 'object'
            },
            defaults: {
                dataType: 'object'
            },
            read: {
                dataType: 'array'
            },
            write: {
                dataType: 'array'
            },
            middleware: {
                dataType: 'object'
            },
            pluginId: {
                presence: true,
                dataType: 'string'
            }
        });
        var _config$initialData = config.initialData,
            initialData = _config$initialData === undefined ? {} : _config$initialData,
            _config$defaults = config.defaults,
            defaults = _config$defaults === undefined ? {} : _config$defaults,
            type = config.type,
            read = config.read,
            write = config.write,
            _config$middleware = config.middleware,
            middleware = _config$middleware === undefined ? {} : _config$middleware,
            pluginId = config.pluginId;

        var player = config.player || brinkbit.Player.primary;
        this.pluginId = pluginId;
        this.player = player;
        this.brinkbit = brinkbit;
        this.read = read;
        this.write = write;
        this.type = type;
        this.middleware = middleware;
        var data = merge({}, defaults, initialData);
        validate.constructor(data, {
            _id: {
                dataType: 'string'
            }
        });
        this.data = data;
        if (type === 'core' && data._id) {
            this.id = initialData._id;
        }
    }

    _createClass(Plugin, [{
        key: 'getPlayer',
        value: function getPlayer() {
            if (!this.player && !this.brinkbit.Player.primary) {
                return new Error('No player logged in');
            }
            var player = this.player || this.brinkbit.Player.primary;
            if (!player.token && !player.id) {
                return new Error('No player logged in');
            }
            return player;
        }
    }, {
        key: 'validate',
        value: function validate() {
            // eslint-disable-line class-methods-use-this
            return Promise.resolve();
        }
    }, {
        key: 'getUrl',
        value: function getUrl(method) {
            var key = this.id || this.data._id;
            if (this.type === 'core') {
                switch (method) {
                    case 'post':
                        return './' + this.pluginId + '/';
                    default:
                        return './' + this.pluginId + '/' + key + '/';
                }
            }
            if (this.type === 'player') {
                return './data/' + this.pluginId + '/players/' + this.getPlayer().id + '/keys/' + key;
            }
            return './data/' + this.pluginId + '/keys/' + key;
        }
    }, {
        key: 'getToken',
        value: function getToken() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return options.token || this.token || (this.type !== 'core' ? this.getPlayer().token : undefined);
        }
    }, {
        key: 'fetch',
        value: function fetch() {
            var _this = this;

            var options = normalizeArguments.apply(undefined, arguments);
            var promise = ensurePromise(this.getToken(options)).then(function (token) {
                options.token = token;
                return ensurePromise(_this.getUrl('get'));
            }).then(function (uri) {
                options.uri = options.uri || uri;
                return ensurePromise(_this.processMiddleware('fetch', options));
            }).then(function (opts) {
                return promisifyValidation(_this.validate('get', opts)).then(function () {
                    return _this.brinkbit._get(opts);
                });
            }).then(function (response) {
                merge(_this.data, _this.readable(_this.type === 'core' ? response.body : response.body.dataValue));
                if (_this.data._id) {
                    _this.id = _this.data._id;
                }
                _this.emit('fetch', new BrinkbitEvent('fetch', response));
                return response;
            });
            return normalizeResponse(promise, options);
        }
    }, {
        key: 'save',
        value: function save() {
            var _this2 = this;

            var options = normalizeArguments.apply(undefined, arguments);
            if (options.body) {
                this.set(options.body);
            }
            options.method = options.method || (this.id ? 'put' : 'post');
            options.body = options.method === 'put' || options.method === 'post' ? this.writeable(this.data) : undefined;
            var promise = ensurePromise(this.getToken(options)).then(function (token) {
                options.token = token;
                return ensurePromise(_this2.getUrl(options.method));
            }).then(function (uri) {
                options.uri = options.uri || uri;
                return ensurePromise(_this2.processMiddleware('save', options));
            }).then(function (opts) {
                return promisifyValidation(_this2.validate(options.method, opts)).then(function () {
                    return _this2.brinkbit._request(opts);
                });
            }).then(function (response) {
                merge(_this2.data, _this2.readable(_this2.type === 'core' ? response.body : response.body.dataValue));
                if (_this2.data._id) {
                    _this2.id = _this2.data._id;
                }
                _this2.emit('save', new BrinkbitEvent('save', response));
                return response;
            });
            return normalizeResponse(promise, options);
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            var _this3 = this;

            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var promise = ensurePromise(this.getToken(options)).then(function (token) {
                options.token = token;
                return ensurePromise(_this3.getUrl('delete'));
            }).then(function (uri) {
                options.uri = options.uri || uri;
                return ensurePromise(_this3.processMiddleware('destroy', options));
            }).then(function (opts) {
                return promisifyValidation(_this3.validate('delete', opts)).then(function () {
                    return _this3.brinkbit._delete(opts);
                });
            }).then(function (response) {
                _this3.id = undefined;
                _this3.data.id = undefined;
                return response;
            });
            return normalizeResponse(promise, options);
        }
    }, {
        key: 'get',
        value: function get(path) {
            if ((typeof path === 'undefined' ? 'undefined' : _typeof(path)) !== 'object' && typeof path !== 'string') {
                throw new Error((typeof path === 'undefined' ? 'undefined' : _typeof(path)) + ' is not a valid type for path');
            }
            return typeof attr === 'string' ? _get(this.data, path) : pick(this.data, path);
        }
    }, {
        key: 'set',
        value: function set(path, value) {
            if ((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object') {
                merge(this.data, this.writeable(path));
            } else if (typeof path === 'string') {
                if (this.write && !this.write.includes(path)) {
                    throw new Error('Path ' + path + ' is not writeable!');
                }
                _set(this.data, path, value);
            } else {
                throw new Error((typeof path === 'undefined' ? 'undefined' : _typeof(path)) + ' is not a valid type for path');
            }
        }
    }, {
        key: 'writeable',
        value: function writeable(data) {
            return this.write ? pick(data, this.write) : data;
        }
    }, {
        key: 'readable',
        value: function readable(data) {
            return this.read ? pick(data, this.read) : data;
        }
    }, {
        key: 'processMiddleware',
        value: function processMiddleware(method, opts) {
            return _typeof(this.middleware) === 'object' && typeof this.middleware[method] === 'function' ? this.middleware[method](opts) : opts;
        }
    }], [{
        key: 'create',
        value: function create() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var instance = new (Function.prototype.bind.apply(this, [null].concat(args)))();
            return instance.save().then(function () {
                return instance;
            });
        }
    }]);

    return Plugin;
}();

eventEmitter(Plugin.prototype);

module.exports = Plugin;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _undefined = __webpack_require__(22)(); // Support ES3 engines

module.exports = function (val) {
  return val !== _undefined && val !== null;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var validateJs = __webpack_require__(30);
var ValidationError = __webpack_require__(4);

validateJs.validators.dataType = function validateDataType(value, options) {
    return value === null || value === undefined || validateJs['is' + validateJs.capitalize(options)](value) ? null : 'is not of type ' + options;
};

validateJs.validators.instanceOf = function validateInstanceof(value, options) {
    return value === null || value === undefined || value instanceof options;
};

var validate = function validate(attributes, constraints) {
    var invalid = validateJs(attributes, constraints);
    if (invalid) {
        return Promise.reject(new ValidationError({
            message: invalid.error,
            details: invalid
        }));
    }
    return Promise.resolve();
};

validate.constructor = function validateConstructor(config, constraints) {
    if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) !== 'object') {
        throw new TypeError('config must be an object');
    }
    var invalid = validateJs(config, constraints);
    if (invalid) {
        throw new ValidationError({
            message: invalid.error,
            details: invalid
        });
    }
};

module.exports = validate;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var customError = __webpack_require__(31);

var ValidationError = customError('ValidationError', {
    message: 'Validation failed',
    details: []
});

module.exports = ValidationError;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var rng = __webpack_require__(39);
var bytesToUuid = __webpack_require__(40);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof options == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = ( false ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && ( false ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = function () {
  try {
    return freeProcess && freeProcess.binding('util');
  } catch (e) {}
}();

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function (value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function (value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    _Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    objectCreate = Object.create,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max;

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash(),
    'map': new (Map || ListCache)(),
    'string': new Hash()
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache();
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if (value !== undefined && !eq(object[key], value) || typeof key == 'number' && value === undefined && !(key in object)) {
    object[key] = value;
  }
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
    object[key] = value;
  }
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {boolean} [isFull] Specify a clone including symbols.
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || isFunc && !object) {
      if (isHostObject(value)) {
        return object ? value : {};
      }
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (!isArr) {
    var props = isFull ? getAllKeys(value) : keys(value);
  }
  arrayEach(props || value, function (subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
  });
  return result;
}

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(proto) {
  return isObject(proto) ? objectCreate(proto) : {};
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  if (!(isArray(source) || isTypedArray(source))) {
    var props = baseKeysIn(source);
  }
  arrayEach(props || source, function (srcValue, key) {
    if (props) {
      key = srcValue;
      srcValue = source[key];
    }
    if (isObject(srcValue)) {
      stack || (stack = new Stack());
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    } else {
      var newValue = customizer ? customizer(object[key], srcValue, key + '', object, source, stack) : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  });
}

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = object[key],
      srcValue = source[key],
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    newValue = srcValue;
    if (isArray(srcValue) || isTypedArray(srcValue)) {
      if (isArray(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      } else {
        isCommon = false;
        newValue = baseClone(srcValue, true);
      }
    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject(objValue) || srcIndex && isFunction(objValue)) {
        isCommon = false;
        newValue = baseClone(srcValue, true);
      } else {
        newValue = objValue;
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? func.length - 1 : start, 0);
  return function () {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var result = new buffer.constructor(buffer.length);
  buffer.copy(result);
  return result;
}

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor());
}

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor());
}

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Copies own symbol properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function (object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
  getTag = function getTag(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag;
        case mapCtorString:
          return mapTag;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag;
        case weakMapCtorString:
          return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
}

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag:case float64Tag:
    case int8Tag:case int16Tag:case int32Tag:
    case uint8Tag:case uint8ClampedTag:case uint16Tag:case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index === 'undefined' ? 'undefined' : _typeof(index);
  if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;

  return value === proto;
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return func + '';
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || value !== value && other !== other;
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var merge = createAssigner(function (object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = merge;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(7)(module)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function normalizeArguments() {
    var _ref;

    var options = {};
    if (_typeof(arguments.length <= 0 ? undefined : arguments[0]) === 'object') {
        options = arguments.length <= 0 ? undefined : arguments[0];
    } else if (_typeof(arguments.length <= 1 ? undefined : arguments[1]) === 'object') {
        options = arguments.length <= 1 ? undefined : arguments[1];
    } else if (typeof (arguments.length <= 1 ? undefined : arguments[1]) === 'string') {
        options.token = arguments.length <= 1 ? undefined : arguments[1];
    }
    if (typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'string') {
        options.uri = arguments.length <= 0 ? undefined : arguments[0];
    }
    if (arguments.length > 0 && typeof (_ref = arguments.length - 1, arguments.length <= _ref ? undefined : arguments[_ref]) === 'function') {
        var _ref2;

        options.callback = (_ref2 = arguments.length - 1, arguments.length <= _ref2 ? undefined : arguments[_ref2]);
    }
    return options;
}

module.exports = normalizeArguments;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Plugin = __webpack_require__(0);
var defaultPlugins = __webpack_require__(37);

Plugin.defaults = defaultPlugins;

module.exports = Plugin;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var _Symbol = root.Symbol,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    spreadableSymbol = _Symbol ? _Symbol.isConcatSpreadable : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property identifiers to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, props) {
  object = Object(object);
  return basePickBy(object, props, function (value, key) {
    return key in object;
  });
}

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property identifiers to pick from.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, props, predicate) {
  var index = -1,
      length = props.length,
      result = {};

  while (++index < length) {
    var key = props[index],
        value = object[key];

    if (predicate(value, key)) {
      result[key] = value;
    }
  }
  return result;
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? func.length - 1 : start, 0);
  return function () {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [props] The property identifiers to pick.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */
var pick = baseRest(function (object, props) {
  return object == null ? {} : basePick(object, arrayMap(baseFlatten(props, 1), toKey));
});

module.exports = pick;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

/** Built-in value references. */
var _Symbol = root.Symbol,
    splice = arrayProto.splice;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash(),
    'map': new (Map || ListCache)(),
    'string': new Hash()
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return index && index == length ? object : undefined;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function (string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function (match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return func + '';
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || resolver && typeof resolver != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function memoized() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || value !== value && other !== other;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

/** Built-in value references. */
var _Symbol = root.Symbol,
    splice = arrayProto.splice;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash(),
    'map': new (Map || ListCache)(),
    'string': new Hash()
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
    object[key] = value;
  }
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object;
  }
  path = isKey(path, object) ? [path] : castPath(path);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]),
        newValue = value;

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function (string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function (match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return func + '';
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || resolver && typeof resolver != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function memoized() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || value !== value && other !== other;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties. Use `_.setWith` to customize
 * `path` creation.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.set(object, 'a[0].b.c', 4);
 * console.log(object.a[0].b.c);
 * // => 4
 *
 * _.set(object, ['x', '0', 'y', 'z'], 5);
 * console.log(object.x[0].y.z);
 * // => 5
 */
function set(object, path, value) {
  return object == null ? object : baseSet(object, path, value);
}

module.exports = set;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var d = __webpack_require__(15),
    callable = __webpack_require__(29),
    apply = Function.prototype.apply,
    call = Function.prototype.call,
    create = Object.create,
    defineProperty = Object.defineProperty,
    defineProperties = Object.defineProperties,
    hasOwnProperty = Object.prototype.hasOwnProperty,
    descriptor = { configurable: true, enumerable: false, writable: true },
    on,
    _once2,
    off,
    emit,
    methods,
    descriptors,
    base;

on = function on(type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;else if (_typeof(data[type]) === 'object') data[type].push(listener);else data[type] = [data[type], listener];

	return this;
};

_once2 = function once(type, listener) {
	var _once, self;

	callable(listener);
	self = this;
	on.call(this, type, _once = function once() {
		off.call(self, type, _once);
		apply.call(listener, this, arguments);
	});

	_once.__eeOnceListener__ = listener;
	return this;
};

off = function off(type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];

	if ((typeof listeners === 'undefined' ? 'undefined' : _typeof(listeners)) === 'object') {
		for (i = 0; candidate = listeners[i]; ++i) {
			if (candidate === listener || candidate.__eeOnceListener__ === listener) {
				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];else listeners.splice(i, 1);
			}
		}
	} else {
		if (listeners === listener || listeners.__eeOnceListener__ === listener) {
			delete data[type];
		}
	}

	return this;
};

emit = function emit(type) {
	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;

	if ((typeof listeners === 'undefined' ? 'undefined' : _typeof(listeners)) === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) {
			args[i - 1] = arguments[i];
		}listeners = listeners.slice();
		for (i = 0; listener = listeners[i]; ++i) {
			apply.call(listener, this, args);
		}
	} else {
		switch (arguments.length) {
			case 1:
				call.call(listeners, this);
				break;
			case 2:
				call.call(listeners, this, arguments[1]);
				break;
			case 3:
				call.call(listeners, this, arguments[1], arguments[2]);
				break;
			default:
				l = arguments.length;
				args = new Array(l - 1);
				for (i = 1; i < l; ++i) {
					args[i - 1] = arguments[i];
				}
				apply.call(listeners, this, args);
		}
	}
};

methods = {
	on: on,
	once: _once2,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(_once2),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function exports(o) {
	return o == null ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(16),
    normalizeOpts = __webpack_require__(24),
    isCallable = __webpack_require__(25),
    contains = __webpack_require__(26),
    d;

d = module.exports = function (dscr, value /*, options*/) {
	var c, e, w, options, desc;
	if (arguments.length < 2 || typeof dscr !== 'string') {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set /*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(17)() ? Object.assign : __webpack_require__(18);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var assign = Object.assign,
	    obj;
	if (typeof assign !== "function") return false;
	obj = { foo: "raz" };
	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
	return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = __webpack_require__(19),
    value = __webpack_require__(23),
    max = Math.max;

module.exports = function (dest, src /*, …srcn*/) {
	var error,
	    i,
	    length = max(arguments.length, 2),
	    assign;
	dest = Object(value(dest));
	assign = function assign(key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < length; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(20)() ? Object.keys : __webpack_require__(21);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	try {
		Object.keys("primitive");
		return true;
	} catch (e) {
		return false;
	}
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(2);

var keys = Object.keys;

module.exports = function (object) {
	return keys(isValue(object) ? Object(object) : object);
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// eslint-disable-next-line no-empty-function

module.exports = function () {};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(2);

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(2);

var forEach = Array.prototype.forEach,
    create = Object.create;

var process = function process(src, obj) {
	var key;
	for (key in src) {
		obj[key] = src[key];
	}
};

// eslint-disable-next-line no-unused-vars
module.exports = function (opts1 /*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (!isValue(options)) return;
		process(Object(options), result);
	});
	return result;
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Deprecated



module.exports = function (obj) {
  return typeof obj === "function";
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(27)() ? String.prototype.contains : __webpack_require__(28);

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return str.contains("dwa") === true && str.contains("foo") === false;
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString /*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * validate.js 0.11.1
 *
 * (c) 2013-2016 Nicklas Ansman, 2013 Wrapp
 * Validate.js may be freely distributed under the MIT license.
 * For all details and documentation:
 * http://validatejs.org/
 */

(function (exports, module, define) {
  "use strict";

  // The main function that calls the validators specified by the constraints.
  // The options are the following:
  //   - format (string) - An option that controls how the returned value is formatted
  //     * flat - Returns a flat array of just the error messages
  //     * grouped - Returns the messages grouped by attribute (default)
  //     * detailed - Returns an array of the raw validation data
  //   - fullMessages (boolean) - If `true` (default) the attribute name is prepended to the error.
  //
  // Please note that the options are also passed to each validator.

  var validate = function validate(attributes, constraints, options) {
    options = v.extend({}, v.options, options);

    var results = v.runValidations(attributes, constraints, options),
        attr,
        validator;

    for (attr in results) {
      for (validator in results[attr]) {
        if (v.isPromise(results[attr][validator])) {
          throw new Error("Use validate.async if you want support for promises");
        }
      }
    }
    return validate.processValidationResults(results, options);
  };

  var v = validate;

  // Copies over attributes from one or more sources to a single destination.
  // Very much similar to underscore's extend.
  // The first argument is the target object and the remaining arguments will be
  // used as sources.
  v.extend = function (obj) {
    [].slice.call(arguments, 1).forEach(function (source) {
      for (var attr in source) {
        obj[attr] = source[attr];
      }
    });
    return obj;
  };

  v.extend(validate, {
    // This is the version of the library as a semver.
    // The toString function will allow it to be coerced into a string
    version: {
      major: 0,
      minor: 11,
      patch: 1,
      metadata: null,
      toString: function toString() {
        var version = v.format("%{major}.%{minor}.%{patch}", v.version);
        if (!v.isEmpty(v.version.metadata)) {
          version += "+" + v.version.metadata;
        }
        return version;
      }
    },

    // Below is the dependencies that are used in validate.js

    // The constructor of the Promise implementation.
    // If you are using Q.js, RSVP or any other A+ compatible implementation
    // override this attribute to be the constructor of that promise.
    // Since jQuery promises aren't A+ compatible they won't work.
    Promise: typeof Promise !== "undefined" ? Promise : /* istanbul ignore next */null,

    EMPTY_STRING_REGEXP: /^\s*$/,

    // Runs the validators specified by the constraints object.
    // Will return an array of the format:
    //     [{attribute: "<attribute name>", error: "<validation result>"}, ...]
    runValidations: function runValidations(attributes, constraints, options) {
      var results = [],
          attr,
          validatorName,
          value,
          validators,
          validator,
          validatorOptions,
          error;

      if (v.isDomElement(attributes) || v.isJqueryElement(attributes)) {
        attributes = v.collectFormValues(attributes);
      }

      // Loops through each constraints, finds the correct validator and run it.
      for (attr in constraints) {
        value = v.getDeepObjectValue(attributes, attr);
        // This allows the constraints for an attribute to be a function.
        // The function will be called with the value, attribute name, the complete dict of
        // attributes as well as the options and constraints passed in.
        // This is useful when you want to have different
        // validations depending on the attribute value.
        validators = v.result(constraints[attr], value, attributes, attr, options, constraints);

        for (validatorName in validators) {
          validator = v.validators[validatorName];

          if (!validator) {
            error = v.format("Unknown validator %{name}", { name: validatorName });
            throw new Error(error);
          }

          validatorOptions = validators[validatorName];
          // This allows the options to be a function. The function will be
          // called with the value, attribute name, the complete dict of
          // attributes as well as the options and constraints passed in.
          // This is useful when you want to have different
          // validations depending on the attribute value.
          validatorOptions = v.result(validatorOptions, value, attributes, attr, options, constraints);
          if (!validatorOptions) {
            continue;
          }
          results.push({
            attribute: attr,
            value: value,
            validator: validatorName,
            globalOptions: options,
            attributes: attributes,
            options: validatorOptions,
            error: validator.call(validator, value, validatorOptions, attr, attributes, options)
          });
        }
      }

      return results;
    },

    // Takes the output from runValidations and converts it to the correct
    // output format.
    processValidationResults: function processValidationResults(errors, options) {
      errors = v.pruneEmptyErrors(errors, options);
      errors = v.expandMultipleErrors(errors, options);
      errors = v.convertErrorMessages(errors, options);

      var format = options.format || "grouped";

      if (typeof v.formatters[format] === 'function') {
        errors = v.formatters[format](errors);
      } else {
        throw new Error(v.format("Unknown format %{format}", options));
      }

      return v.isEmpty(errors) ? undefined : errors;
    },

    // Runs the validations with support for promises.
    // This function will return a promise that is settled when all the
    // validation promises have been completed.
    // It can be called even if no validations returned a promise.
    async: function async(attributes, constraints, options) {
      options = v.extend({}, v.async.options, options);

      var WrapErrors = options.wrapErrors || function (errors) {
        return errors;
      };

      // Removes unknown attributes
      if (options.cleanAttributes !== false) {
        attributes = v.cleanAttributes(attributes, constraints);
      }

      var results = v.runValidations(attributes, constraints, options);

      return new v.Promise(function (resolve, reject) {
        v.waitForResults(results).then(function () {
          var errors = v.processValidationResults(results, options);
          if (errors) {
            reject(new WrapErrors(errors, options, attributes, constraints));
          } else {
            resolve(attributes);
          }
        }, function (err) {
          reject(err);
        });
      });
    },

    single: function single(value, constraints, options) {
      options = v.extend({}, v.single.options, options, {
        format: "flat",
        fullMessages: false
      });
      return v({ single: value }, { single: constraints }, options);
    },

    // Returns a promise that is resolved when all promises in the results array
    // are settled. The promise returned from this function is always resolved,
    // never rejected.
    // This function modifies the input argument, it replaces the promises
    // with the value returned from the promise.
    waitForResults: function waitForResults(results) {
      // Create a sequence of all the results starting with a resolved promise.
      return results.reduce(function (memo, result) {
        // If this result isn't a promise skip it in the sequence.
        if (!v.isPromise(result.error)) {
          return memo;
        }

        return memo.then(function () {
          return result.error.then(function (error) {
            result.error = error || null;
          });
        });
      }, new v.Promise(function (r) {
        r();
      })); // A resolved promise
    },

    // If the given argument is a call: function the and: function return the value
    // otherwise just return the value. Additional arguments will be passed as
    // arguments to the function.
    // Example:
    // ```
    // result('foo') // 'foo'
    // result(Math.max, 1, 2) // 2
    // ```
    result: function result(value) {
      var args = [].slice.call(arguments, 1);
      if (typeof value === 'function') {
        value = value.apply(null, args);
      }
      return value;
    },

    // Checks if the value is a number. This function does not consider NaN a
    // number like many other `isNumber` functions do.
    isNumber: function isNumber(value) {
      return typeof value === 'number' && !isNaN(value);
    },

    // Returns false if the object is not a function
    isFunction: function isFunction(value) {
      return typeof value === 'function';
    },

    // A simple check to verify that the value is an integer. Uses `isNumber`
    // and a simple modulo check.
    isInteger: function isInteger(value) {
      return v.isNumber(value) && value % 1 === 0;
    },

    // Checks if the value is a boolean
    isBoolean: function isBoolean(value) {
      return typeof value === 'boolean';
    },

    // Uses the `Object` function to check if the given argument is an object.
    isObject: function isObject(obj) {
      return obj === Object(obj);
    },

    // Simply checks if the object is an instance of a date
    isDate: function isDate(obj) {
      return obj instanceof Date;
    },

    // Returns false if the object is `null` of `undefined`
    isDefined: function isDefined(obj) {
      return obj !== null && obj !== undefined;
    },

    // Checks if the given argument is a promise. Anything with a `then`
    // function is considered a promise.
    isPromise: function isPromise(p) {
      return !!p && v.isFunction(p.then);
    },

    isJqueryElement: function isJqueryElement(o) {
      return o && v.isString(o.jquery);
    },

    isDomElement: function isDomElement(o) {
      if (!o) {
        return false;
      }

      if (!o.querySelectorAll || !o.querySelector) {
        return false;
      }

      if (v.isObject(document) && o === document) {
        return true;
      }

      // http://stackoverflow.com/a/384380/699304
      /* istanbul ignore else */
      if ((typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === "object") {
        return o instanceof HTMLElement;
      } else {
        return o && (typeof o === "undefined" ? "undefined" : _typeof(o)) === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string";
      }
    },

    isEmpty: function isEmpty(value) {
      var attr;

      // Null and undefined are empty
      if (!v.isDefined(value)) {
        return true;
      }

      // functions are non empty
      if (v.isFunction(value)) {
        return false;
      }

      // Whitespace only strings are empty
      if (v.isString(value)) {
        return v.EMPTY_STRING_REGEXP.test(value);
      }

      // For arrays we use the length property
      if (v.isArray(value)) {
        return value.length === 0;
      }

      // Dates have no attributes but aren't empty
      if (v.isDate(value)) {
        return false;
      }

      // If we find at least one property we consider it non empty
      if (v.isObject(value)) {
        for (attr in value) {
          return false;
        }
        return true;
      }

      return false;
    },

    // Formats the specified strings with the given values like so:
    // ```
    // format("Foo: %{foo}", {foo: "bar"}) // "Foo bar"
    // ```
    // If you want to write %{...} without having it replaced simply
    // prefix it with % like this `Foo: %%{foo}` and it will be returned
    // as `"Foo: %{foo}"`
    format: v.extend(function (str, vals) {
      if (!v.isString(str)) {
        return str;
      }
      return str.replace(v.format.FORMAT_REGEXP, function (m0, m1, m2) {
        if (m1 === '%') {
          return "%{" + m2 + "}";
        } else {
          return String(vals[m2]);
        }
      });
    }, {
      // Finds %{key} style patterns in the given string
      FORMAT_REGEXP: /(%?)%\{([^\}]+)\}/g
    }),

    // "Prettifies" the given string.
    // Prettifying means replacing [.\_-] with spaces as well as splitting
    // camel case words.
    prettify: function prettify(str) {
      if (v.isNumber(str)) {
        // If there are more than 2 decimals round it to two
        if (str * 100 % 1 === 0) {
          return "" + str;
        } else {
          return parseFloat(Math.round(str * 100) / 100).toFixed(2);
        }
      }

      if (v.isArray(str)) {
        return str.map(function (s) {
          return v.prettify(s);
        }).join(", ");
      }

      if (v.isObject(str)) {
        return str.toString();
      }

      // Ensure the string is actually a string
      str = "" + str;

      return str
      // Splits keys separated by periods
      .replace(/([^\s])\.([^\s])/g, '$1 $2')
      // Removes backslashes
      .replace(/\\+/g, '')
      // Replaces - and - with space
      .replace(/[_-]/g, ' ')
      // Splits camel cased words
      .replace(/([a-z])([A-Z])/g, function (m0, m1, m2) {
        return "" + m1 + " " + m2.toLowerCase();
      }).toLowerCase();
    },

    stringifyValue: function stringifyValue(value) {
      return v.prettify(value);
    },

    isString: function isString(value) {
      return typeof value === 'string';
    },

    isArray: function isArray(value) {
      return {}.toString.call(value) === '[object Array]';
    },

    // Checks if the object is a hash, which is equivalent to an object that
    // is neither an array nor a function.
    isHash: function isHash(value) {
      return v.isObject(value) && !v.isArray(value) && !v.isFunction(value);
    },

    contains: function contains(obj, value) {
      if (!v.isDefined(obj)) {
        return false;
      }
      if (v.isArray(obj)) {
        return obj.indexOf(value) !== -1;
      }
      return value in obj;
    },

    unique: function unique(array) {
      if (!v.isArray(array)) {
        return array;
      }
      return array.filter(function (el, index, array) {
        return array.indexOf(el) == index;
      });
    },

    forEachKeyInKeypath: function forEachKeyInKeypath(object, keypath, callback) {
      if (!v.isString(keypath)) {
        return undefined;
      }

      var key = "",
          i,
          escape = false;

      for (i = 0; i < keypath.length; ++i) {
        switch (keypath[i]) {
          case '.':
            if (escape) {
              escape = false;
              key += '.';
            } else {
              object = callback(object, key, false);
              key = "";
            }
            break;

          case '\\':
            if (escape) {
              escape = false;
              key += '\\';
            } else {
              escape = true;
            }
            break;

          default:
            escape = false;
            key += keypath[i];
            break;
        }
      }

      return callback(object, key, true);
    },

    getDeepObjectValue: function getDeepObjectValue(obj, keypath) {
      if (!v.isObject(obj)) {
        return undefined;
      }

      return v.forEachKeyInKeypath(obj, keypath, function (obj, key) {
        if (v.isObject(obj)) {
          return obj[key];
        }
      });
    },

    // This returns an object with all the values of the form.
    // It uses the input name as key and the value as value
    // So for example this:
    // <input type="text" name="email" value="foo@bar.com" />
    // would return:
    // {email: "foo@bar.com"}
    collectFormValues: function collectFormValues(form, options) {
      var values = {},
          i,
          j,
          input,
          inputs,
          option,
          value;

      if (v.isJqueryElement(form)) {
        form = form[0];
      }

      if (!form) {
        return values;
      }

      options = options || {};

      inputs = form.querySelectorAll("input[name], textarea[name]");
      for (i = 0; i < inputs.length; ++i) {
        input = inputs.item(i);

        if (v.isDefined(input.getAttribute("data-ignored"))) {
          continue;
        }

        value = v.sanitizeFormValue(input.value, options);
        if (input.type === "number") {
          value = value ? +value : null;
        } else if (input.type === "checkbox") {
          if (input.attributes.value) {
            if (!input.checked) {
              value = values[input.name] || null;
            }
          } else {
            value = input.checked;
          }
        } else if (input.type === "radio") {
          if (!input.checked) {
            value = values[input.name] || null;
          }
        }
        values[input.name] = value;
      }

      inputs = form.querySelectorAll("select[name]");
      for (i = 0; i < inputs.length; ++i) {
        input = inputs.item(i);
        if (input.multiple) {
          value = [];
          for (j in input.options) {
            option = input.options[j];
            if (option.selected) {
              value.push(v.sanitizeFormValue(option.value, options));
            }
          }
        } else {
          value = v.sanitizeFormValue(input.options[input.selectedIndex].value, options);
        }
        values[input.name] = value;
      }

      return values;
    },

    sanitizeFormValue: function sanitizeFormValue(value, options) {
      if (options.trim && v.isString(value)) {
        value = value.trim();
      }

      if (options.nullify !== false && value === "") {
        return null;
      }
      return value;
    },

    capitalize: function capitalize(str) {
      if (!v.isString(str)) {
        return str;
      }
      return str[0].toUpperCase() + str.slice(1);
    },

    // Remove all errors who's error attribute is empty (null or undefined)
    pruneEmptyErrors: function pruneEmptyErrors(errors) {
      return errors.filter(function (error) {
        return !v.isEmpty(error.error);
      });
    },

    // In
    // [{error: ["err1", "err2"], ...}]
    // Out
    // [{error: "err1", ...}, {error: "err2", ...}]
    //
    // All attributes in an error with multiple messages are duplicated
    // when expanding the errors.
    expandMultipleErrors: function expandMultipleErrors(errors) {
      var ret = [];
      errors.forEach(function (error) {
        // Removes errors without a message
        if (v.isArray(error.error)) {
          error.error.forEach(function (msg) {
            ret.push(v.extend({}, error, { error: msg }));
          });
        } else {
          ret.push(error);
        }
      });
      return ret;
    },

    // Converts the error mesages by prepending the attribute name unless the
    // message is prefixed by ^
    convertErrorMessages: function convertErrorMessages(errors, options) {
      options = options || {};

      var ret = [];
      errors.forEach(function (errorInfo) {
        var error = v.result(errorInfo.error, errorInfo.value, errorInfo.attribute, errorInfo.options, errorInfo.attributes, errorInfo.globalOptions);

        if (!v.isString(error)) {
          ret.push(errorInfo);
          return;
        }

        if (error[0] === '^') {
          error = error.slice(1);
        } else if (options.fullMessages !== false) {
          error = v.capitalize(v.prettify(errorInfo.attribute)) + " " + error;
        }
        error = error.replace(/\\\^/g, "^");
        error = v.format(error, { value: v.stringifyValue(errorInfo.value) });
        ret.push(v.extend({}, errorInfo, { error: error }));
      });
      return ret;
    },

    // In:
    // [{attribute: "<attributeName>", ...}]
    // Out:
    // {"<attributeName>": [{attribute: "<attributeName>", ...}]}
    groupErrorsByAttribute: function groupErrorsByAttribute(errors) {
      var ret = {};
      errors.forEach(function (error) {
        var list = ret[error.attribute];
        if (list) {
          list.push(error);
        } else {
          ret[error.attribute] = [error];
        }
      });
      return ret;
    },

    // In:
    // [{error: "<message 1>", ...}, {error: "<message 2>", ...}]
    // Out:
    // ["<message 1>", "<message 2>"]
    flattenErrorsToArray: function flattenErrorsToArray(errors) {
      return errors.map(function (error) {
        return error.error;
      }).filter(function (value, index, self) {
        return self.indexOf(value) === index;
      });
    },

    cleanAttributes: function cleanAttributes(attributes, whitelist) {
      function whitelistCreator(obj, key, last) {
        if (v.isObject(obj[key])) {
          return obj[key];
        }
        return obj[key] = last ? true : {};
      }

      function buildObjectWhitelist(whitelist) {
        var ow = {},
            lastObject,
            attr;
        for (attr in whitelist) {
          if (!whitelist[attr]) {
            continue;
          }
          v.forEachKeyInKeypath(ow, attr, whitelistCreator);
        }
        return ow;
      }

      function cleanRecursive(attributes, whitelist) {
        if (!v.isObject(attributes)) {
          return attributes;
        }

        var ret = v.extend({}, attributes),
            w,
            attribute;

        for (attribute in attributes) {
          w = whitelist[attribute];

          if (v.isObject(w)) {
            ret[attribute] = cleanRecursive(ret[attribute], w);
          } else if (!w) {
            delete ret[attribute];
          }
        }
        return ret;
      }

      if (!v.isObject(whitelist) || !v.isObject(attributes)) {
        return {};
      }

      whitelist = buildObjectWhitelist(whitelist);
      return cleanRecursive(attributes, whitelist);
    },

    exposeModule: function exposeModule(validate, root, exports, module, define) {
      if (exports) {
        if (module && module.exports) {
          exports = module.exports = validate;
        }
        exports.validate = validate;
      } else {
        root.validate = validate;
        if (validate.isFunction(define) && define.amd) {
          define([], function () {
            return validate;
          });
        }
      }
    },

    warn: function warn(msg) {
      if (typeof console !== "undefined" && console.warn) {
        console.warn("[validate.js] " + msg);
      }
    },

    error: function error(msg) {
      if (typeof console !== "undefined" && console.error) {
        console.error("[validate.js] " + msg);
      }
    }
  });

  validate.validators = {
    // Presence validates that the value isn't empty
    presence: function presence(value, options) {
      options = v.extend({}, this.options, options);
      if (options.allowEmpty ? !v.isDefined(value) : v.isEmpty(value)) {
        return options.message || this.message || "can't be blank";
      }
    },
    length: function length(value, options, attribute) {
      // Empty values are allowed
      if (!v.isDefined(value)) {
        return;
      }

      options = v.extend({}, this.options, options);

      var is = options.is,
          maximum = options.maximum,
          minimum = options.minimum,
          tokenizer = options.tokenizer || function (val) {
        return val;
      },
          err,
          errors = [];

      value = tokenizer(value);
      var length = value.length;
      if (!v.isNumber(length)) {
        v.error(v.format("Attribute %{attr} has a non numeric value for `length`", { attr: attribute }));
        return options.message || this.notValid || "has an incorrect length";
      }

      // Is checks
      if (v.isNumber(is) && length !== is) {
        err = options.wrongLength || this.wrongLength || "is the wrong length (should be %{count} characters)";
        errors.push(v.format(err, { count: is }));
      }

      if (v.isNumber(minimum) && length < minimum) {
        err = options.tooShort || this.tooShort || "is too short (minimum is %{count} characters)";
        errors.push(v.format(err, { count: minimum }));
      }

      if (v.isNumber(maximum) && length > maximum) {
        err = options.tooLong || this.tooLong || "is too long (maximum is %{count} characters)";
        errors.push(v.format(err, { count: maximum }));
      }

      if (errors.length > 0) {
        return options.message || errors;
      }
    },
    numericality: function numericality(value, options) {
      // Empty values are fine
      if (!v.isDefined(value)) {
        return;
      }

      options = v.extend({}, this.options, options);

      var errors = [],
          name,
          count,
          checks = {
        greaterThan: function greaterThan(v, c) {
          return v > c;
        },
        greaterThanOrEqualTo: function greaterThanOrEqualTo(v, c) {
          return v >= c;
        },
        equalTo: function equalTo(v, c) {
          return v === c;
        },
        lessThan: function lessThan(v, c) {
          return v < c;
        },
        lessThanOrEqualTo: function lessThanOrEqualTo(v, c) {
          return v <= c;
        },
        divisibleBy: function divisibleBy(v, c) {
          return v % c === 0;
        }
      };

      // Strict will check that it is a valid looking number
      if (v.isString(value) && options.strict) {
        var pattern = "^(0|[1-9]\\d*)";
        if (!options.onlyInteger) {
          pattern += "(\\.\\d+)?";
        }
        pattern += "$";

        if (!new RegExp(pattern).test(value)) {
          return options.message || options.notValid || this.notValid || this.message || "must be a valid number";
        }
      }

      // Coerce the value to a number unless we're being strict.
      if (options.noStrings !== true && v.isString(value) && !v.isEmpty(value)) {
        value = +value;
      }

      // If it's not a number we shouldn't continue since it will compare it.
      if (!v.isNumber(value)) {
        return options.message || options.notValid || this.notValid || this.message || "is not a number";
      }

      // Same logic as above, sort of. Don't bother with comparisons if this
      // doesn't pass.
      if (options.onlyInteger && !v.isInteger(value)) {
        return options.message || options.notInteger || this.notInteger || this.message || "must be an integer";
      }

      for (name in checks) {
        count = options[name];
        if (v.isNumber(count) && !checks[name](value, count)) {
          // This picks the default message if specified
          // For example the greaterThan check uses the message from
          // this.notGreaterThan so we capitalize the name and prepend "not"
          var key = "not" + v.capitalize(name);
          var msg = options[key] || this[key] || this.message || "must be %{type} %{count}";

          errors.push(v.format(msg, {
            count: count,
            type: v.prettify(name)
          }));
        }
      }

      if (options.odd && value % 2 !== 1) {
        errors.push(options.notOdd || this.notOdd || this.message || "must be odd");
      }
      if (options.even && value % 2 !== 0) {
        errors.push(options.notEven || this.notEven || this.message || "must be even");
      }

      if (errors.length) {
        return options.message || errors;
      }
    },
    datetime: v.extend(function (value, options) {
      if (!v.isFunction(this.parse) || !v.isFunction(this.format)) {
        throw new Error("Both the parse and format functions needs to be set to use the datetime/date validator");
      }

      // Empty values are fine
      if (!v.isDefined(value)) {
        return;
      }

      options = v.extend({}, this.options, options);

      var err,
          errors = [],
          earliest = options.earliest ? this.parse(options.earliest, options) : NaN,
          latest = options.latest ? this.parse(options.latest, options) : NaN;

      value = this.parse(value, options);

      // 86400000 is the number of seconds in a day, this is used to remove
      // the time from the date
      if (isNaN(value) || options.dateOnly && value % 86400000 !== 0) {
        err = options.notValid || options.message || this.notValid || "must be a valid date";
        return v.format(err, { value: arguments[0] });
      }

      if (!isNaN(earliest) && value < earliest) {
        err = options.tooEarly || options.message || this.tooEarly || "must be no earlier than %{date}";
        err = v.format(err, {
          value: this.format(value, options),
          date: this.format(earliest, options)
        });
        errors.push(err);
      }

      if (!isNaN(latest) && value > latest) {
        err = options.tooLate || options.message || this.tooLate || "must be no later than %{date}";
        err = v.format(err, {
          date: this.format(latest, options),
          value: this.format(value, options)
        });
        errors.push(err);
      }

      if (errors.length) {
        return v.unique(errors);
      }
    }, {
      parse: null,
      format: null
    }),
    date: function date(value, options) {
      options = v.extend({}, options, { dateOnly: true });
      return v.validators.datetime.call(v.validators.datetime, value, options);
    },
    format: function format(value, options) {
      if (v.isString(options) || options instanceof RegExp) {
        options = { pattern: options };
      }

      options = v.extend({}, this.options, options);

      var message = options.message || this.message || "is invalid",
          pattern = options.pattern,
          match;

      // Empty values are allowed
      if (!v.isDefined(value)) {
        return;
      }
      if (!v.isString(value)) {
        return message;
      }

      if (v.isString(pattern)) {
        pattern = new RegExp(options.pattern, options.flags);
      }
      match = pattern.exec(value);
      if (!match || match[0].length != value.length) {
        return message;
      }
    },
    inclusion: function inclusion(value, options) {
      // Empty values are fine
      if (!v.isDefined(value)) {
        return;
      }
      if (v.isArray(options)) {
        options = { within: options };
      }
      options = v.extend({}, this.options, options);
      if (v.contains(options.within, value)) {
        return;
      }
      var message = options.message || this.message || "^%{value} is not included in the list";
      return v.format(message, { value: value });
    },
    exclusion: function exclusion(value, options) {
      // Empty values are fine
      if (!v.isDefined(value)) {
        return;
      }
      if (v.isArray(options)) {
        options = { within: options };
      }
      options = v.extend({}, this.options, options);
      if (!v.contains(options.within, value)) {
        return;
      }
      var message = options.message || this.message || "^%{value} is restricted";
      return v.format(message, { value: value });
    },
    email: v.extend(function (value, options) {
      options = v.extend({}, this.options, options);
      var message = options.message || this.message || "is not a valid email";
      // Empty values are fine
      if (!v.isDefined(value)) {
        return;
      }
      if (!v.isString(value)) {
        return message;
      }
      if (!this.PATTERN.exec(value)) {
        return message;
      }
    }, {
      PATTERN: /^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i
    }),
    equality: function equality(value, options, attribute, attributes) {
      if (!v.isDefined(value)) {
        return;
      }

      if (v.isString(options)) {
        options = { attribute: options };
      }
      options = v.extend({}, this.options, options);
      var message = options.message || this.message || "is not equal to %{attribute}";

      if (v.isEmpty(options.attribute) || !v.isString(options.attribute)) {
        throw new Error("The attribute must be a non empty string");
      }

      var otherValue = v.getDeepObjectValue(attributes, options.attribute),
          comparator = options.comparator || function (v1, v2) {
        return v1 === v2;
      };

      if (!comparator(value, otherValue, options, attribute, attributes)) {
        return v.format(message, { attribute: v.prettify(options.attribute) });
      }
    },

    // A URL validator that is used to validate URLs with the ability to
    // restrict schemes and some domains.
    url: function url(value, options) {
      if (!v.isDefined(value)) {
        return;
      }

      options = v.extend({}, this.options, options);

      var message = options.message || this.message || "is not a valid url",
          schemes = options.schemes || this.schemes || ['http', 'https'],
          allowLocal = options.allowLocal || this.allowLocal || false;

      if (!v.isString(value)) {
        return message;
      }

      // https://gist.github.com/dperini/729294
      var regex = "^" +
      // protocol identifier
      "(?:(?:" + schemes.join("|") + ")://)" +
      // user:pass authentication
      "(?:\\S+(?::\\S*)?@)?" + "(?:";

      var tld = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";

      if (allowLocal) {
        tld += "?";
      } else {
        regex +=
        // IP address exclusion
        // private & local networks
        "(?!(?:10|127)(?:\\.\\d{1,3}){3})" + "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" + "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})";
      }

      regex +=
      // IP address dotted notation octets
      // excludes loopback network 0.0.0.0
      // excludes reserved space >= 224.0.0.0
      // excludes network & broacast addresses
      // (first & last IP address of each class)
      "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" + "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" + "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" + "|" +
      // host name
      "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
      // domain name
      "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" + tld + ")" +
      // port number
      "(?::\\d{2,5})?" +
      // resource path
      "(?:[/?#]\\S*)?" + "$";

      var PATTERN = new RegExp(regex, 'i');
      if (!PATTERN.exec(value)) {
        return message;
      }
    }
  };

  validate.formatters = {
    detailed: function detailed(errors) {
      return errors;
    },
    flat: v.flattenErrorsToArray,
    grouped: function grouped(errors) {
      var attr;

      errors = v.groupErrorsByAttribute(errors);
      for (attr in errors) {
        errors[attr] = v.flattenErrorsToArray(errors[attr]);
      }
      return errors;
    },
    constraint: function constraint(errors) {
      var attr;
      errors = v.groupErrorsByAttribute(errors);
      for (attr in errors) {
        errors[attr] = errors[attr].map(function (result) {
          return result.validator;
        }).sort();
      }
      return errors;
    }
  };

  validate.exposeModule(validate, this, exports, module, __webpack_require__(8));
}).call(undefined,  true ? /* istanbul ignore next */exports : null,  true ? /* istanbul ignore next */module : null, __webpack_require__(8));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)(module)))

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(32);

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = CustomError;
CustomError.factory = __webpack_require__(33);

var Err = CustomError('CustomError');
Err.order = CustomError(Err, { message: 'Arguments out of order.', code: 'EOARG' });

/**
 * Create a custom error
 * @param {string} [name] The name to give the error. Defaults to the name of it's parent.
 * @param {function} [parent] The Error or CustomError constructor to inherit from.
 * @param {object} [properties] The default properties for the custom error.
 * @param {function} [factory] A function to call to modify the custom error instance when it is instantiated.
 * @returns {function} that should be used as a constructor.
 */
function CustomError(name, parent, properties, factory) {
    var _construct;
    var isRoot;

    // normalize arguments
    parent = findArg(arguments, 1, Error, isParentArg, [isPropertiesArg, isFactoryArg]);
    properties = findArg(arguments, 2, {}, isPropertiesArg, [isFactoryArg]);
    factory = findArg(arguments, 3, noop, isFactoryArg, []);
    name = findArg(arguments, 0, parent === Error ? 'Error' : parent.prototype.CustomError.name, isNameArg, [isParentArg, isPropertiesArg, isFactoryArg]);

    // if this is the root and their is no factory then use the default root factory
    isRoot = parent === Error;
    if (isRoot && factory === noop) factory = CustomError.factory.root;

    // build the constructor function
    _construct = function construct(message, configuration) {
        var _this;
        var ar;
        var factories;
        var i;
        var item;
        var props;

        // force this function to be called with the new keyword
        if (!(this instanceof _construct)) return new _construct(message, configuration);

        // rename the constructor
        delete this.constructor.name;
        Object.defineProperty(this.constructor, 'name', {
            enumerable: false,
            configurable: true,
            value: name,
            writable: false
        });

        // make sure that the message is an object
        if (typeof message === 'string') message = { message: message };
        if (!message) message = {};

        // build the properties object
        ar = this.CustomError.chain.slice(0).reverse().map(function (value) {
            return value.properties;
        });
        ar.push(message);
        ar.unshift({});
        props = Object.assign.apply(Object, ar);

        // build the factories caller (forcing scope to this)
        _this = this;
        factories = {};
        Object.keys(CustomError.factory).forEach(function (key) {
            factories[key] = function (props, config) {
                CustomError.factory[key].call(_this, props, config, factories);
            };
        });

        // call each factory in the chain, starting at the root
        for (i = this.CustomError.chain.length - 1; i >= 0; i--) {
            item = this.CustomError.chain[i];
            if (item.factory !== noop) {
                item.factory.call(this, props, configuration, factories);
            }
        }
    };

    // cause the function prototype to inherit from parent's prototype
    _construct.prototype = Object.create(parent.prototype);
    _construct.prototype.constructor = _construct;

    // update error name
    _construct.prototype.name = name;

    // add details about the custom error to the prototype
    _construct.prototype.CustomError = {
        chain: isRoot ? [] : parent.prototype.CustomError.chain.slice(0),
        factory: factory,
        name: name,
        parent: parent,
        properties: properties
    };
    _construct.prototype.CustomError.chain.unshift(_construct.prototype.CustomError);

    // update the toString method on the prototype to accept a code
    _construct.prototype.toString = function () {
        var result = this.CustomError.chain[this.CustomError.chain.length - 1].name;
        if (this.code) result += ' ' + this.code;
        if (this.message) result += ': ' + this.message;
        return result;
    };

    return _construct;
}

function findArg(args, index, defaultValue, filter, antiFilters) {
    var anti = -1;
    var found = -1;
    var i;
    var j;
    var len = index < args.length ? index : args.length;
    var val;

    for (i = 0; i <= len; i++) {
        val = args[i];
        if (anti === -1) {
            for (j = 0; j < antiFilters.length; j++) {
                if (antiFilters[j](val)) anti = i;
            }
        }
        if (found === -1 && filter(val)) {
            found = i;
        }
    }

    if (found !== -1 && anti !== -1 && anti < found) throw new Err.order();
    return found !== -1 ? args[found] : defaultValue;
}

function isFactoryArg(value) {
    return typeof value === 'function' && value !== Error && !value.prototype.CustomError;
}

function isNameArg(value) {
    return typeof value === 'string';
}

function isParentArg(value) {
    return typeof value === 'function' && (value === Error || value.prototype.CustomError);
}

function isPropertiesArg(value) {
    return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
}

function noop() {}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.expectReceive = function (properties, configuration, factory) {
    var message;
    factory.root(properties, configuration, factory);

    message = this.message;
    if (properties.hasOwnProperty('expected')) message += ' Expected ' + properties.expected + '.';
    if (properties.hasOwnProperty('received')) message += ' Received: ' + properties.received + '.';
    this.message = message;
};

exports.root = function (properties, configuration, factories) {
    var _this = this;
    var code;
    var config = { stackLength: Error.stackTraceLimit, rootOnly: true };
    var messageStr = '';
    var originalStackLength = Error.stackTraceLimit;
    var stack;

    function updateStack() {
        stack[0] = _this.toString();
        _this.stack = stack.join('\n');
    }

    // get configuration options
    if (!configuration || (typeof configuration === 'undefined' ? 'undefined' : _typeof(configuration)) !== 'object') configuration = {};
    if (configuration.hasOwnProperty('stackLength') && typeof configuration.stackLength === 'number' && !isNaN(configuration.stackLength) && configuration.stackLength >= 0) config.stackLength = configuration.stackLength;
    if (!configuration.hasOwnProperty('rootOnly')) config.rootOnly = configuration.rootOnly;

    // check if this should only be run as root
    if (!config.rootOnly || this.CustomError.parent === Error) {

        // copy properties onto this object
        Object.keys(properties).forEach(function (key) {
            switch (key) {
                case 'code':
                    code = properties.code || void 0;
                    break;
                case 'message':
                    messageStr = properties.message || '';
                    break;
                default:
                    _this[key] = properties[key];
            }
        });

        // generate the stack trace
        Error.stackTraceLimit = config.stackLength + 2;
        stack = new Error().stack.split('\n');
        stack.splice(0, 3);
        stack.unshift('');
        Error.stackTraceLimit = originalStackLength;
        this.stack = stack.join('\n');

        Object.defineProperty(this, 'code', {
            configurable: true,
            enumerable: true,
            get: function get() {
                return code;
            },
            set: function set(value) {
                code = value;
                updateStack();
            }
        });

        Object.defineProperty(this, 'message', {
            configurable: true,
            enumerable: true,
            get: function get() {
                return messageStr;
            },
            set: function set(value) {
                messageStr = value;
                updateStack();
            }
        });

        updateStack();
    }
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function normalizeResponse(promise, options) {
    return promise.then(function (data) {
        if (typeof options.callback === 'function') {
            options.callback(null, data);
        }
        if (typeof options.success === 'function') {
            options.success(data);
        }
        return data;
    }).catch(function (error) {
        if (typeof options.callback === 'function') {
            return options.callback(error);
        }
        if (typeof options.error === 'function') {
            return options.error(error);
        }
        return Promise.reject(error);
    });
}

module.exports = normalizeResponse;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BrinkbitEvent = function BrinkbitEvent(eventType, response) {
    _classCallCheck(this, BrinkbitEvent);

    this.type = eventType;
    this.response = response;
};

module.exports = BrinkbitEvent;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var ValidationError = __webpack_require__(4);

module.exports = {
    ensurePromise: function ensurePromise(value) {
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') return Promise.resolve(value);
        if (typeof value.then === 'function') return value;
        if (value instanceof Error || value instanceof TypeError) {
            return Promise.reject(value);
        }
        return Promise.resolve(value);
    },
    promisifyValidation: function promisifyValidation(value) {
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
            if (typeof value.then === 'function') {
                return value;
            } else if (value instanceof ValidationError || value instanceof Error || value instanceof TypeError) {
                return Promise.reject(value);
            }
            var error = new ValidationError();
            error.details = value;
            return Promise.reject(error);
        } else if (typeof value === 'string') {
            return Promise.reject(value);
        }
        return Promise.resolve();
    }
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var analytics = __webpack_require__(38);
var gameData = __webpack_require__(41);
var playerData = __webpack_require__(42);
var player = __webpack_require__(43);

module.exports = [player, analytics, gameData, playerData];

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var v4 = __webpack_require__(5);
var Plugin = __webpack_require__(0);
var _validate = __webpack_require__(3);

function initializePlayerData(brinkbit, player) {
    var PlayerData = function (_Plugin) {
        _inherits(PlayerData, _Plugin);

        function PlayerData(initialData) {
            _classCallCheck(this, PlayerData);

            var _this = _possibleConstructorReturn(this, (PlayerData.__proto__ || Object.getPrototypeOf(PlayerData)).call(this, brinkbit, {
                initialData: initialData,
                defaults: {
                    _id: v4(),
                    dateCreated: new Date().toString(),
                    playerId: player.id
                },
                pluginId: 'analytics',
                type: 'player',
                player: player
            }));

            _this.middleware.save = _this.saveMiddleware.bind(_this);
            return _this;
        }

        _createClass(PlayerData, [{
            key: 'saveMiddleware',
            value: function saveMiddleware(options) {
                var body = options.body;

                if (!body.playerId) {
                    body.playerId = this.player.id;
                }
                return options;
            }
        }], [{
            key: 'validate',
            value: function validate(method, data) {
                return _validate(data, {
                    dateCreated: {
                        dataType: 'string',
                        presence: true
                    },
                    playerId: {
                        dataType: 'string',
                        presence: true
                    },
                    type: {
                        dataType: 'string',
                        presence: true
                    }
                });
            }
        }]);

        return PlayerData;
    }(Plugin);

    return PlayerData;
}

module.exports = {
    name: 'Analytic',
    type: 'player',
    initialize: initializePlayerData
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var rng;

var crypto = global.crypto || global.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
  rng = function whatwgRNG() {
    crypto.getRandomValues(rnds8);
    return rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);
  rng = function rng() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

module.exports = rng;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var v4 = __webpack_require__(5);
var Plugin = __webpack_require__(0);

function initializeGameData(brinkbit) {
    var GameData = function (_Plugin) {
        _inherits(GameData, _Plugin);

        function GameData(initialData) {
            _classCallCheck(this, GameData);

            return _possibleConstructorReturn(this, (GameData.__proto__ || Object.getPrototypeOf(GameData)).call(this, brinkbit, {
                initialData: initialData,
                defaults: {
                    _id: v4()
                },
                pluginId: 'gamedata',
                type: 'game'
            }));
        }

        return GameData;
    }(Plugin);

    return GameData;
}

module.exports = {
    name: 'Data',
    type: 'game',
    initialize: initializeGameData
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var v4 = __webpack_require__(5);
var Plugin = __webpack_require__(0);

function initializePlayerData(brinkbit, player) {
    var PlayerData = function (_Plugin) {
        _inherits(PlayerData, _Plugin);

        function PlayerData(initialData) {
            _classCallCheck(this, PlayerData);

            return _possibleConstructorReturn(this, (PlayerData.__proto__ || Object.getPrototypeOf(PlayerData)).call(this, brinkbit, {
                initialData: initialData,
                defaults: {
                    _id: v4()
                },
                pluginId: 'playerdata',
                type: 'player',
                player: player
            }));
        }

        return PlayerData;
    }(Plugin);

    return PlayerData;
}

module.exports = {
    name: 'Data',
    type: 'player',
    initialize: initializePlayerData
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable no-param-reassign */

var merge = __webpack_require__(6);

var _validate = __webpack_require__(3);
var ValidationError = __webpack_require__(4);
var normalizeArguments = __webpack_require__(9);
var Plugin = __webpack_require__(0);

function initialize(brinkbit) {
    var Player = function (_Plugin) {
        _inherits(Player, _Plugin);

        function Player(initialData) {
            _classCallCheck(this, Player);

            var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, brinkbit, {
                initialData: initialData,
                read: ['_id', 'dateCreated', 'email', 'username'],
                write: ['email', 'password', 'username'],
                pluginId: 'players',
                type: 'core'
            }));

            if (initialData) {
                _validate.constructor(initialData, {
                    username: {
                        dataType: 'string'
                    },
                    email: {
                        dataType: 'string'
                    },
                    password: {
                        dataType: 'string'
                    },
                    token: {
                        dataType: 'string'
                    }
                });
                if (initialData.token) {
                    _this.token = initialData.token;
                }
            }
            _this.middleware.save = _this.saveMiddleware.bind(_this);
            Player.plugins.forEach(function (plugin) {
                _this[plugin.name] = plugin.initialize(brinkbit, _this);
            });
            return _this;
        }

        _createClass(Player, [{
            key: 'isLoggedIn',
            value: function isLoggedIn() {
                return !this.token;
            }
        }, {
            key: 'login',
            value: function login() {
                var _this2 = this;

                var options = normalizeArguments.apply(undefined, arguments);
                options.password = options.uri;
                options.uri = undefined;
                var opts = merge({}, this.data, options);
                return this.brinkbit.login(opts, this).then(function () {
                    return _this2;
                });
            }
        }, {
            key: 'logout',
            value: function logout() {
                this.token = undefined;
                if (this.isPrimary) {
                    this.brinkbit.logout();
                }
            }
        }, {
            key: 'promote',
            value: function promote() {
                this.brinkbit.promotePlayer(this);
            }
        }, {
            key: 'forgot',
            value: function forgot(options) {
                return this.brinkbit.forgot(options || this.data);
            }
        }, {
            key: 'getUrl',
            value: function getUrl(method) {
                var key = this.id || this.data._id;
                if (method === 'get' && !this.id) {
                    return './playerinfo/';
                }
                if (method === 'post') {
                    return './players/';
                }
                return './players/' + key + '/';
            }
        }, {
            key: 'saveMiddleware',
            value: function saveMiddleware(options) {
                if (!this.id) {
                    options.passToken = false;
                    options.body.gameId = options.body.gameId || this.brinkbit.gameId;
                } else {
                    delete options.body.username;
                    delete options.body.password;
                }
                return options;
            }
        }, {
            key: 'validate',
            value: function validate(method, options) {
                var data = options.body;
                switch (method) {
                    case 'delete':
                        return Promise.reject(new Error('Cannot delete user'));
                    case 'post':
                        return _validate(data, {
                            username: {
                                dataType: 'string',
                                presence: true
                            },
                            email: {
                                dataType: 'string',
                                presence: true
                            },
                            password: {
                                dataType: 'string',
                                presence: true
                            }
                        });
                    case 'put':
                        return _validate(data, {
                            username: {
                                dataType: 'string',
                                presence: false
                            },
                            email: {
                                dataType: 'string'
                            },
                            password: {
                                dataType: 'string',
                                presence: false
                            }
                        }).then(function () {
                            return typeof options.token === 'string' ? Promise.resolve() : Promise.reject(new ValidationError('User is not logged in'));
                        });
                    default:
                        return typeof options.token === 'string' ? Promise.resolve() : Promise.reject(new ValidationError('User is not logged in'));
                }
            }
        }]);

        return Player;
    }(Plugin);

    Player.plugins = [];

    return Player;
}

module.exports = {
    name: 'Player',
    type: 'core',
    initialize: initialize
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5ZTBhZGUwM2QxYTRiZTJiYjliMiIsIndlYnBhY2s6Ly8vLi9zcmMvcGx1Z2luLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2lzLXZhbHVlLmpzIiwid2VicGFjazovLy8uL3NyYy92YWxpZGF0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFsaWRhdGUvdmFsaWRhdGlvbkVycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL3Y0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gubWVyZ2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vYW1kLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFsaWRhdGUvbm9ybWFsaXplQXJndW1lbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoLnBpY2svaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC5nZXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC5zZXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V2ZW50LWVtaXR0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2Fzc2lnbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvYXNzaWduL2lzLWltcGxlbWVudGVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9hc3NpZ24vc2hpbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3Qva2V5cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3Qva2V5cy9pcy1pbXBsZW1lbnRlZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3Qva2V5cy9zaGltLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lczUtZXh0L2Z1bmN0aW9uL25vb3AuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L3ZhbGlkLXZhbHVlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9ub3JtYWxpemUtb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvaXMtY2FsbGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvaXMtaW1wbGVtZW50ZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvc2hpbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvdmFsaWQtY2FsbGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRlLmpzL3ZhbGlkYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jdXN0b20tZXJyb3ItaW5zdGFuY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2N1c3RvbS1lcnJvci1pbnN0YW5jZS9iaW4vZXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2N1c3RvbS1lcnJvci1pbnN0YW5jZS9iaW4vZmFjdG9yaWVzLmpzIiwid2VicGFjazovLy8uL3NyYy92YWxpZGF0ZS9ub3JtYWxpemVSZXNwb25zZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZGVmYXVsdHMvYW5hbHl0aWNzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ybmctYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXVpZC9saWIvYnl0ZXNUb1V1aWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlZmF1bHRzL2dhbWVEYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0cy9wbGF5ZXJEYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0cy9wbGF5ZXIuanMiXSwibmFtZXMiOlsibWVyZ2UiLCJyZXF1aXJlIiwicGljayIsImdldCIsInNldCIsImV2ZW50RW1pdHRlciIsInZhbGlkYXRlIiwibm9ybWFsaXplQXJndW1lbnRzIiwibm9ybWFsaXplUmVzcG9uc2UiLCJCcmlua2JpdEV2ZW50IiwiZW5zdXJlUHJvbWlzZSIsInByb21pc2lmeVZhbGlkYXRpb24iLCJQbHVnaW4iLCJicmlua2JpdCIsImNvbmZpZyIsImNvbnN0cnVjdG9yIiwidHlwZSIsImRhdGFUeXBlIiwicHJlc2VuY2UiLCJpbmNsdXNpb24iLCJwbGF5ZXIiLCJpbml0aWFsRGF0YSIsImRlZmF1bHRzIiwicmVhZCIsIndyaXRlIiwibWlkZGxld2FyZSIsInBsdWdpbklkIiwiUGxheWVyIiwicHJpbWFyeSIsImRhdGEiLCJfaWQiLCJpZCIsIkVycm9yIiwidG9rZW4iLCJQcm9taXNlIiwicmVzb2x2ZSIsIm1ldGhvZCIsImtleSIsImdldFBsYXllciIsIm9wdGlvbnMiLCJ1bmRlZmluZWQiLCJwcm9taXNlIiwiZ2V0VG9rZW4iLCJ0aGVuIiwiZ2V0VXJsIiwidXJpIiwicHJvY2Vzc01pZGRsZXdhcmUiLCJvcHRzIiwiX2dldCIsInJlc3BvbnNlIiwicmVhZGFibGUiLCJib2R5IiwiZGF0YVZhbHVlIiwiZW1pdCIsIndyaXRlYWJsZSIsIl9yZXF1ZXN0IiwiX2RlbGV0ZSIsInBhdGgiLCJhdHRyIiwidmFsdWUiLCJpbmNsdWRlcyIsImFyZ3MiLCJpbnN0YW5jZSIsInNhdmUiLCJwcm90b3R5cGUiLCJtb2R1bGUiLCJleHBvcnRzIiwiZyIsIkZ1bmN0aW9uIiwiZXZhbCIsImUiLCJ3aW5kb3ciLCJfdW5kZWZpbmVkIiwidmFsIiwidmFsaWRhdGVKcyIsIlZhbGlkYXRpb25FcnJvciIsInZhbGlkYXRvcnMiLCJ2YWxpZGF0ZURhdGFUeXBlIiwiY2FwaXRhbGl6ZSIsImluc3RhbmNlT2YiLCJ2YWxpZGF0ZUluc3RhbmNlb2YiLCJhdHRyaWJ1dGVzIiwiY29uc3RyYWludHMiLCJpbnZhbGlkIiwicmVqZWN0IiwibWVzc2FnZSIsImVycm9yIiwiZGV0YWlscyIsInZhbGlkYXRlQ29uc3RydWN0b3IiLCJUeXBlRXJyb3IiLCJjdXN0b21FcnJvciIsInJuZyIsImJ5dGVzVG9VdWlkIiwidjQiLCJidWYiLCJvZmZzZXQiLCJpIiwiQXJyYXkiLCJybmRzIiwicmFuZG9tIiwiaWkiLCJMQVJHRV9BUlJBWV9TSVpFIiwiSEFTSF9VTkRFRklORUQiLCJNQVhfU0FGRV9JTlRFR0VSIiwiYXJnc1RhZyIsImFycmF5VGFnIiwiYm9vbFRhZyIsImRhdGVUYWciLCJlcnJvclRhZyIsImZ1bmNUYWciLCJnZW5UYWciLCJtYXBUYWciLCJudW1iZXJUYWciLCJvYmplY3RUYWciLCJwcm9taXNlVGFnIiwicmVnZXhwVGFnIiwic2V0VGFnIiwic3RyaW5nVGFnIiwic3ltYm9sVGFnIiwid2Vha01hcFRhZyIsImFycmF5QnVmZmVyVGFnIiwiZGF0YVZpZXdUYWciLCJmbG9hdDMyVGFnIiwiZmxvYXQ2NFRhZyIsImludDhUYWciLCJpbnQxNlRhZyIsImludDMyVGFnIiwidWludDhUYWciLCJ1aW50OENsYW1wZWRUYWciLCJ1aW50MTZUYWciLCJ1aW50MzJUYWciLCJyZVJlZ0V4cENoYXIiLCJyZUZsYWdzIiwicmVJc0hvc3RDdG9yIiwicmVJc1VpbnQiLCJ0eXBlZEFycmF5VGFncyIsImNsb25lYWJsZVRhZ3MiLCJmcmVlR2xvYmFsIiwiZ2xvYmFsIiwiT2JqZWN0IiwiZnJlZVNlbGYiLCJzZWxmIiwicm9vdCIsImZyZWVFeHBvcnRzIiwibm9kZVR5cGUiLCJmcmVlTW9kdWxlIiwibW9kdWxlRXhwb3J0cyIsImZyZWVQcm9jZXNzIiwicHJvY2VzcyIsIm5vZGVVdGlsIiwiYmluZGluZyIsIm5vZGVJc1R5cGVkQXJyYXkiLCJpc1R5cGVkQXJyYXkiLCJhZGRNYXBFbnRyeSIsIm1hcCIsInBhaXIiLCJhZGRTZXRFbnRyeSIsImFkZCIsImFwcGx5IiwiZnVuYyIsInRoaXNBcmciLCJsZW5ndGgiLCJjYWxsIiwiYXJyYXlFYWNoIiwiYXJyYXkiLCJpdGVyYXRlZSIsImluZGV4IiwiYXJyYXlQdXNoIiwidmFsdWVzIiwiYXJyYXlSZWR1Y2UiLCJhY2N1bXVsYXRvciIsImluaXRBY2N1bSIsImJhc2VUaW1lcyIsIm4iLCJyZXN1bHQiLCJiYXNlVW5hcnkiLCJnZXRWYWx1ZSIsIm9iamVjdCIsImlzSG9zdE9iamVjdCIsInRvU3RyaW5nIiwibWFwVG9BcnJheSIsInNpemUiLCJmb3JFYWNoIiwib3ZlckFyZyIsInRyYW5zZm9ybSIsImFyZyIsInNldFRvQXJyYXkiLCJhcnJheVByb3RvIiwiZnVuY1Byb3RvIiwib2JqZWN0UHJvdG8iLCJjb3JlSnNEYXRhIiwibWFza1NyY0tleSIsInVpZCIsImV4ZWMiLCJrZXlzIiwiSUVfUFJPVE8iLCJmdW5jVG9TdHJpbmciLCJoYXNPd25Qcm9wZXJ0eSIsIm9iamVjdEN0b3JTdHJpbmciLCJvYmplY3RUb1N0cmluZyIsInJlSXNOYXRpdmUiLCJSZWdFeHAiLCJyZXBsYWNlIiwiQnVmZmVyIiwiU3ltYm9sIiwiVWludDhBcnJheSIsImdldFByb3RvdHlwZSIsImdldFByb3RvdHlwZU9mIiwib2JqZWN0Q3JlYXRlIiwiY3JlYXRlIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJzcGxpY2UiLCJuYXRpdmVHZXRTeW1ib2xzIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwibmF0aXZlSXNCdWZmZXIiLCJpc0J1ZmZlciIsIm5hdGl2ZUtleXMiLCJuYXRpdmVNYXgiLCJNYXRoIiwibWF4IiwiRGF0YVZpZXciLCJnZXROYXRpdmUiLCJNYXAiLCJTZXQiLCJXZWFrTWFwIiwibmF0aXZlQ3JlYXRlIiwiZGF0YVZpZXdDdG9yU3RyaW5nIiwidG9Tb3VyY2UiLCJtYXBDdG9yU3RyaW5nIiwicHJvbWlzZUN0b3JTdHJpbmciLCJzZXRDdG9yU3RyaW5nIiwid2Vha01hcEN0b3JTdHJpbmciLCJzeW1ib2xQcm90byIsInN5bWJvbFZhbHVlT2YiLCJ2YWx1ZU9mIiwiSGFzaCIsImVudHJpZXMiLCJjbGVhciIsImVudHJ5IiwiaGFzaENsZWFyIiwiX19kYXRhX18iLCJoYXNoRGVsZXRlIiwiaGFzIiwiaGFzaEdldCIsImhhc2hIYXMiLCJoYXNoU2V0IiwiTGlzdENhY2hlIiwibGlzdENhY2hlQ2xlYXIiLCJsaXN0Q2FjaGVEZWxldGUiLCJhc3NvY0luZGV4T2YiLCJsYXN0SW5kZXgiLCJwb3AiLCJsaXN0Q2FjaGVHZXQiLCJsaXN0Q2FjaGVIYXMiLCJsaXN0Q2FjaGVTZXQiLCJwdXNoIiwiTWFwQ2FjaGUiLCJtYXBDYWNoZUNsZWFyIiwibWFwQ2FjaGVEZWxldGUiLCJnZXRNYXBEYXRhIiwibWFwQ2FjaGVHZXQiLCJtYXBDYWNoZUhhcyIsIm1hcENhY2hlU2V0IiwiU3RhY2siLCJzdGFja0NsZWFyIiwic3RhY2tEZWxldGUiLCJzdGFja0dldCIsInN0YWNrSGFzIiwic3RhY2tTZXQiLCJjYWNoZSIsInBhaXJzIiwiYXJyYXlMaWtlS2V5cyIsImluaGVyaXRlZCIsImlzQXJyYXkiLCJpc0FyZ3VtZW50cyIsIlN0cmluZyIsInNraXBJbmRleGVzIiwiaXNJbmRleCIsImFzc2lnbk1lcmdlVmFsdWUiLCJlcSIsImFzc2lnblZhbHVlIiwib2JqVmFsdWUiLCJiYXNlQXNzaWduIiwic291cmNlIiwiY29weU9iamVjdCIsImJhc2VDbG9uZSIsImlzRGVlcCIsImlzRnVsbCIsImN1c3RvbWl6ZXIiLCJzdGFjayIsImlzT2JqZWN0IiwiaXNBcnIiLCJpbml0Q2xvbmVBcnJheSIsImNvcHlBcnJheSIsInRhZyIsImdldFRhZyIsImlzRnVuYyIsImNsb25lQnVmZmVyIiwiaW5pdENsb25lT2JqZWN0IiwiY29weVN5bWJvbHMiLCJpbml0Q2xvbmVCeVRhZyIsInN0YWNrZWQiLCJwcm9wcyIsImdldEFsbEtleXMiLCJzdWJWYWx1ZSIsImJhc2VDcmVhdGUiLCJwcm90byIsImJhc2VHZXRBbGxLZXlzIiwia2V5c0Z1bmMiLCJzeW1ib2xzRnVuYyIsImJhc2VHZXRUYWciLCJiYXNlSXNOYXRpdmUiLCJpc01hc2tlZCIsInBhdHRlcm4iLCJpc0Z1bmN0aW9uIiwidGVzdCIsImJhc2VJc1R5cGVkQXJyYXkiLCJpc09iamVjdExpa2UiLCJpc0xlbmd0aCIsImJhc2VLZXlzIiwiaXNQcm90b3R5cGUiLCJiYXNlS2V5c0luIiwibmF0aXZlS2V5c0luIiwiaXNQcm90byIsImJhc2VNZXJnZSIsInNyY0luZGV4Iiwic3JjVmFsdWUiLCJiYXNlTWVyZ2VEZWVwIiwibmV3VmFsdWUiLCJtZXJnZUZ1bmMiLCJpc0NvbW1vbiIsImlzQXJyYXlMaWtlT2JqZWN0IiwiaXNQbGFpbk9iamVjdCIsInRvUGxhaW5PYmplY3QiLCJiYXNlUmVzdCIsInN0YXJ0IiwiYXJndW1lbnRzIiwib3RoZXJBcmdzIiwiYnVmZmVyIiwic2xpY2UiLCJjb3B5IiwiY2xvbmVBcnJheUJ1ZmZlciIsImFycmF5QnVmZmVyIiwiYnl0ZUxlbmd0aCIsImNsb25lRGF0YVZpZXciLCJkYXRhVmlldyIsImJ5dGVPZmZzZXQiLCJjbG9uZU1hcCIsImNsb25lRnVuYyIsImNsb25lUmVnRXhwIiwicmVnZXhwIiwiY2xvbmVTZXQiLCJjbG9uZVN5bWJvbCIsInN5bWJvbCIsImNsb25lVHlwZWRBcnJheSIsInR5cGVkQXJyYXkiLCJnZXRTeW1ib2xzIiwiY3JlYXRlQXNzaWduZXIiLCJhc3NpZ25lciIsInNvdXJjZXMiLCJndWFyZCIsImlzSXRlcmF0ZWVDYWxsIiwiaXNLZXlhYmxlIiwic3R1YkFycmF5IiwiQXJyYXlCdWZmZXIiLCJDdG9yIiwiY3RvclN0cmluZyIsImlucHV0IiwiaXNBcnJheUxpa2UiLCJvdGhlciIsInN0dWJGYWxzZSIsImtleXNJbiIsIndlYnBhY2tQb2x5ZmlsbCIsImRlcHJlY2F0ZSIsInBhdGhzIiwiY2hpbGRyZW4iLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJsIiwiY2FsbGJhY2siLCJkZWZhdWx0UGx1Z2lucyIsIklORklOSVRZIiwiYXJyYXlNYXAiLCJzcHJlYWRhYmxlU3ltYm9sIiwiaXNDb25jYXRTcHJlYWRhYmxlIiwiYmFzZUZsYXR0ZW4iLCJkZXB0aCIsInByZWRpY2F0ZSIsImlzU3RyaWN0IiwiaXNGbGF0dGVuYWJsZSIsImJhc2VQaWNrIiwiYmFzZVBpY2tCeSIsInRvS2V5IiwiaXNTeW1ib2wiLCJGVU5DX0VSUk9SX1RFWFQiLCJyZUlzRGVlcFByb3AiLCJyZUlzUGxhaW5Qcm9wIiwicmVMZWFkaW5nRG90IiwicmVQcm9wTmFtZSIsInJlRXNjYXBlQ2hhciIsInN5bWJvbFRvU3RyaW5nIiwiYmFzZUdldCIsImlzS2V5IiwiY2FzdFBhdGgiLCJiYXNlVG9TdHJpbmciLCJzdHJpbmdUb1BhdGgiLCJtZW1vaXplIiwic3RyaW5nIiwibWF0Y2giLCJudW1iZXIiLCJxdW90ZSIsInJlc29sdmVyIiwibWVtb2l6ZWQiLCJDYWNoZSIsImRlZmF1bHRWYWx1ZSIsImJhc2VTZXQiLCJuZXN0ZWQiLCJkIiwiY2FsbGFibGUiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiZGVzY3JpcHRvciIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwib24iLCJvbmNlIiwib2ZmIiwibWV0aG9kcyIsImRlc2NyaXB0b3JzIiwiYmFzZSIsImxpc3RlbmVyIiwiX19lZV9fIiwiX19lZU9uY2VMaXN0ZW5lcl9fIiwibGlzdGVuZXJzIiwiY2FuZGlkYXRlIiwibyIsImFzc2lnbiIsIm5vcm1hbGl6ZU9wdHMiLCJpc0NhbGxhYmxlIiwiY29udGFpbnMiLCJkc2NyIiwiYyIsInciLCJkZXNjIiwiZ3MiLCJvYmoiLCJmb28iLCJiYXIiLCJ0cnp5IiwiZGVzdCIsInNyYyIsImlzVmFsdWUiLCJvcHRzMSIsInN0ciIsImluZGV4T2YiLCJzZWFyY2hTdHJpbmciLCJmbiIsImRlZmluZSIsInYiLCJleHRlbmQiLCJyZXN1bHRzIiwicnVuVmFsaWRhdGlvbnMiLCJ2YWxpZGF0b3IiLCJpc1Byb21pc2UiLCJwcm9jZXNzVmFsaWRhdGlvblJlc3VsdHMiLCJ2ZXJzaW9uIiwibWFqb3IiLCJtaW5vciIsInBhdGNoIiwibWV0YWRhdGEiLCJmb3JtYXQiLCJpc0VtcHR5IiwiRU1QVFlfU1RSSU5HX1JFR0VYUCIsInZhbGlkYXRvck5hbWUiLCJ2YWxpZGF0b3JPcHRpb25zIiwiaXNEb21FbGVtZW50IiwiaXNKcXVlcnlFbGVtZW50IiwiY29sbGVjdEZvcm1WYWx1ZXMiLCJnZXREZWVwT2JqZWN0VmFsdWUiLCJuYW1lIiwiYXR0cmlidXRlIiwiZ2xvYmFsT3B0aW9ucyIsImVycm9ycyIsInBydW5lRW1wdHlFcnJvcnMiLCJleHBhbmRNdWx0aXBsZUVycm9ycyIsImNvbnZlcnRFcnJvck1lc3NhZ2VzIiwiZm9ybWF0dGVycyIsImFzeW5jIiwiV3JhcEVycm9ycyIsIndyYXBFcnJvcnMiLCJjbGVhbkF0dHJpYnV0ZXMiLCJ3YWl0Rm9yUmVzdWx0cyIsImVyciIsInNpbmdsZSIsImZ1bGxNZXNzYWdlcyIsInJlZHVjZSIsIm1lbW8iLCJyIiwiaXNOdW1iZXIiLCJpc05hTiIsImlzSW50ZWdlciIsImlzQm9vbGVhbiIsImlzRGF0ZSIsIkRhdGUiLCJpc0RlZmluZWQiLCJwIiwiaXNTdHJpbmciLCJqcXVlcnkiLCJxdWVyeVNlbGVjdG9yQWxsIiwicXVlcnlTZWxlY3RvciIsImRvY3VtZW50IiwiSFRNTEVsZW1lbnQiLCJub2RlTmFtZSIsInZhbHMiLCJGT1JNQVRfUkVHRVhQIiwibTAiLCJtMSIsIm0yIiwicHJldHRpZnkiLCJwYXJzZUZsb2F0Iiwicm91bmQiLCJ0b0ZpeGVkIiwicyIsImpvaW4iLCJ0b0xvd2VyQ2FzZSIsInN0cmluZ2lmeVZhbHVlIiwiaXNIYXNoIiwidW5pcXVlIiwiZmlsdGVyIiwiZWwiLCJmb3JFYWNoS2V5SW5LZXlwYXRoIiwia2V5cGF0aCIsImVzY2FwZSIsImZvcm0iLCJqIiwiaW5wdXRzIiwib3B0aW9uIiwiaXRlbSIsImdldEF0dHJpYnV0ZSIsInNhbml0aXplRm9ybVZhbHVlIiwiY2hlY2tlZCIsIm11bHRpcGxlIiwic2VsZWN0ZWQiLCJzZWxlY3RlZEluZGV4IiwidHJpbSIsIm51bGxpZnkiLCJ0b1VwcGVyQ2FzZSIsInJldCIsIm1zZyIsImVycm9ySW5mbyIsImdyb3VwRXJyb3JzQnlBdHRyaWJ1dGUiLCJsaXN0IiwiZmxhdHRlbkVycm9yc1RvQXJyYXkiLCJ3aGl0ZWxpc3QiLCJ3aGl0ZWxpc3RDcmVhdG9yIiwibGFzdCIsImJ1aWxkT2JqZWN0V2hpdGVsaXN0Iiwib3ciLCJsYXN0T2JqZWN0IiwiY2xlYW5SZWN1cnNpdmUiLCJleHBvc2VNb2R1bGUiLCJhbWQiLCJ3YXJuIiwiY29uc29sZSIsImFsbG93RW1wdHkiLCJpcyIsIm1heGltdW0iLCJtaW5pbXVtIiwidG9rZW5pemVyIiwibm90VmFsaWQiLCJ3cm9uZ0xlbmd0aCIsImNvdW50IiwidG9vU2hvcnQiLCJ0b29Mb25nIiwibnVtZXJpY2FsaXR5IiwiY2hlY2tzIiwiZ3JlYXRlclRoYW4iLCJncmVhdGVyVGhhbk9yRXF1YWxUbyIsImVxdWFsVG8iLCJsZXNzVGhhbiIsImxlc3NUaGFuT3JFcXVhbFRvIiwiZGl2aXNpYmxlQnkiLCJzdHJpY3QiLCJvbmx5SW50ZWdlciIsIm5vU3RyaW5ncyIsIm5vdEludGVnZXIiLCJvZGQiLCJub3RPZGQiLCJldmVuIiwibm90RXZlbiIsImRhdGV0aW1lIiwicGFyc2UiLCJlYXJsaWVzdCIsIk5hTiIsImxhdGVzdCIsImRhdGVPbmx5IiwidG9vRWFybHkiLCJkYXRlIiwidG9vTGF0ZSIsImZsYWdzIiwid2l0aGluIiwiZXhjbHVzaW9uIiwiZW1haWwiLCJQQVRURVJOIiwiZXF1YWxpdHkiLCJvdGhlclZhbHVlIiwiY29tcGFyYXRvciIsInYxIiwidjIiLCJ1cmwiLCJzY2hlbWVzIiwiYWxsb3dMb2NhbCIsInJlZ2V4IiwidGxkIiwiZGV0YWlsZWQiLCJmbGF0IiwiZ3JvdXBlZCIsImNvbnN0cmFpbnQiLCJzb3J0IiwiQ3VzdG9tRXJyb3IiLCJmYWN0b3J5IiwiRXJyIiwib3JkZXIiLCJjb2RlIiwicGFyZW50IiwicHJvcGVydGllcyIsImNvbnN0cnVjdCIsImlzUm9vdCIsImZpbmRBcmciLCJpc1BhcmVudEFyZyIsImlzUHJvcGVydGllc0FyZyIsImlzRmFjdG9yeUFyZyIsIm5vb3AiLCJpc05hbWVBcmciLCJjb25maWd1cmF0aW9uIiwiX3RoaXMiLCJhciIsImZhY3RvcmllcyIsImNoYWluIiwicmV2ZXJzZSIsInVuc2hpZnQiLCJhbnRpRmlsdGVycyIsImFudGkiLCJmb3VuZCIsImxlbiIsImV4cGVjdFJlY2VpdmUiLCJleHBlY3RlZCIsInJlY2VpdmVkIiwic3RhY2tMZW5ndGgiLCJzdGFja1RyYWNlTGltaXQiLCJyb290T25seSIsIm1lc3NhZ2VTdHIiLCJvcmlnaW5hbFN0YWNrTGVuZ3RoIiwidXBkYXRlU3RhY2siLCJzcGxpdCIsInN1Y2Nlc3MiLCJjYXRjaCIsImV2ZW50VHlwZSIsImFuYWx5dGljcyIsImdhbWVEYXRhIiwicGxheWVyRGF0YSIsImluaXRpYWxpemVQbGF5ZXJEYXRhIiwiUGxheWVyRGF0YSIsImRhdGVDcmVhdGVkIiwicGxheWVySWQiLCJzYXZlTWlkZGxld2FyZSIsImJpbmQiLCJpbml0aWFsaXplIiwiY3J5cHRvIiwibXNDcnlwdG8iLCJnZXRSYW5kb21WYWx1ZXMiLCJybmRzOCIsIndoYXR3Z1JORyIsImJ5dGVUb0hleCIsInN1YnN0ciIsImJ0aCIsImluaXRpYWxpemVHYW1lRGF0YSIsIkdhbWVEYXRhIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsInBsdWdpbnMiLCJwbHVnaW4iLCJsb2dpbiIsImlzUHJpbWFyeSIsImxvZ291dCIsInByb21vdGVQbGF5ZXIiLCJmb3Jnb3QiLCJwYXNzVG9rZW4iLCJnYW1lSWQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REE7O0FBRUEsSUFBTUEsUUFBUSxtQkFBQUMsQ0FBUyxDQUFULENBQWQ7QUFDQSxJQUFNQyxPQUFPLG1CQUFBRCxDQUFTLEVBQVQsQ0FBYjtBQUNBLElBQU1FLE9BQU0sbUJBQUFGLENBQVMsRUFBVCxDQUFaO0FBQ0EsSUFBTUcsT0FBTSxtQkFBQUgsQ0FBUyxFQUFULENBQVo7QUFDQSxJQUFNSSxlQUFlLG1CQUFBSixDQUFTLEVBQVQsQ0FBckI7O0FBRUEsSUFBTUssV0FBVyxt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QU87QUFDSHhrQiwwQ0FBVTtBQURQLDZCQUxZO0FBUW5CcXBCLHNDQUFVO0FBQ05ycEIsMENBQVUsUUFESjtBQUVOQywwQ0FBVTtBQUZKO0FBUlMseUJBQWhCLEVBYU55QixJQWJNLENBYUQ7QUFBQSxtQ0FDRixPQUFPSixRQUFRTixLQUFmLEtBQXlCLFFBQXpCLEdBQ0lDLFFBQVFDLE9BQVIsRUFESixHQUVJRCxRQUFRa0QsTUFBUixDQUFnQixJQUFJVCxlQUFKLENBQXFCLHVCQUFyQixDQUFoQixDQUhGO0FBQUEseUJBYkMsQ0FBUDtBQWtCSjtBQUNJLCtCQUFPLE9BQU9wQyxRQUFRTixLQUFmLEtBQXlCLFFBQXpCLEdBQ0hDLFFBQVFDLE9BQVIsRUFERyxHQUVIRCxRQUFRa0QsTUFBUixDQUFnQixJQUFJVCxlQUFKLENBQXFCLHVCQUFyQixDQUFoQixDQUZKO0FBdENSO0FBMENIO0FBbkl1Qjs7QUFBQTtBQUFBLE1BQ1AvRCxNQURPOztBQXVJNUJlLFdBQU80b0IsT0FBUCxHQUFpQixFQUFqQjs7QUFFQSxXQUFPNW9CLE1BQVA7QUFDSDs7QUFFRHNDLE9BQU9DLE9BQVAsR0FBaUI7QUFDYjRaLFVBQU0sUUFETztBQUViOWMsVUFBTSxNQUZPO0FBR2Iwb0I7QUFIYSxDQUFqQixDIiwiZmlsZSI6ImRpc3QvYnJpbmtiaXQtcGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYnJpbmtiaXQtcGx1Z2luXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImJyaW5rYml0LXBsdWdpblwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOWUwYWRlMDNkMWE0YmUyYmI5YjIiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuXG5jb25zdCBtZXJnZSA9IHJlcXVpcmUoICdsb2Rhc2gubWVyZ2UnICk7XG5jb25zdCBwaWNrID0gcmVxdWlyZSggJ2xvZGFzaC5waWNrJyApO1xuY29uc3QgZ2V0ID0gcmVxdWlyZSggJ2xvZGFzaC5nZXQnICk7XG5jb25zdCBzZXQgPSByZXF1aXJlKCAnbG9kYXNoLnNldCcgKTtcbmNvbnN0IGV2ZW50RW1pdHRlciA9IHJlcXVpcmUoICdldmVudC1lbWl0dGVyJyApO1xuXG5jb25zdCB2YWxpZGF0ZSA9IHJlcXVpcmUoICcuL3ZhbGlkYXRlJyApO1xuY29uc3Qgbm9ybWFsaXplQXJndW1lbnRzID0gcmVxdWlyZSggJy4vdmFsaWRhdGUvbm9ybWFsaXplQXJndW1lbnRzJyApO1xuY29uc3Qgbm9ybWFsaXplUmVzcG9uc2UgPSByZXF1aXJlKCAnLi92YWxpZGF0ZS9ub3JtYWxpemVSZXNwb25zZScgKTtcbmNvbnN0IEJyaW5rYml0RXZlbnQgPSByZXF1aXJlKCAnLi9ldmVudHMnICk7XG5jb25zdCB7IGVuc3VyZVByb21pc2UsIHByb21pc2lmeVZhbGlkYXRpb24gfSA9IHJlcXVpcmUoICcuL3V0aWwnICk7XG5cbmNsYXNzIFBsdWdpbiB7XG5cbiAgICBjb25zdHJ1Y3RvciggYnJpbmtiaXQsIGNvbmZpZyApIHtcbiAgICAgICAgdmFsaWRhdGUuY29uc3RydWN0b3IoIGNvbmZpZywge1xuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBwcmVzZW5jZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpbmNsdXNpb246IFtcbiAgICAgICAgICAgICAgICAgICAgJ3BsYXllcicsXG4gICAgICAgICAgICAgICAgICAgICdnYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgJ2NvcmUnLFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGxheWVyOiB7XG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluaXRpYWxEYXRhOiB7XG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlYWQ6IHtcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2FycmF5JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB3cml0ZToge1xuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnYXJyYXknLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1pZGRsZXdhcmU6IHtcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGx1Z2luSWQ6IHtcbiAgICAgICAgICAgICAgICBwcmVzZW5jZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgaW5pdGlhbERhdGEgPSB7fSxcbiAgICAgICAgICAgIGRlZmF1bHRzID0ge30sXG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgcmVhZCxcbiAgICAgICAgICAgIHdyaXRlLFxuICAgICAgICAgICAgbWlkZGxld2FyZSA9IHt9LFxuICAgICAgICAgICAgcGx1Z2luSWQsXG4gICAgICAgIH0gPSBjb25maWc7XG4gICAgICAgIGNvbnN0IHBsYXllciA9IGNvbmZpZy5wbGF5ZXIgfHwgYnJpbmtiaXQuUGxheWVyLnByaW1hcnk7XG4gICAgICAgIHRoaXMucGx1Z2luSWQgPSBwbHVnaW5JZDtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XG4gICAgICAgIHRoaXMuYnJpbmtiaXQgPSBicmlua2JpdDtcbiAgICAgICAgdGhpcy5yZWFkID0gcmVhZDtcbiAgICAgICAgdGhpcy53cml0ZSA9IHdyaXRlO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLm1pZGRsZXdhcmUgPSBtaWRkbGV3YXJlO1xuICAgICAgICBjb25zdCBkYXRhID0gbWVyZ2Uoe30sIGRlZmF1bHRzLCBpbml0aWFsRGF0YSApO1xuICAgICAgICB2YWxpZGF0ZS5jb25zdHJ1Y3RvciggZGF0YSwge1xuICAgICAgICAgICAgX2lkOiB7XG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIGlmICggdHlwZSA9PT0gJ2NvcmUnICYmIGRhdGEuX2lkICkge1xuICAgICAgICAgICAgdGhpcy5pZCA9IGluaXRpYWxEYXRhLl9pZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFBsYXllcigpIHtcbiAgICAgICAgaWYgKCAhdGhpcy5wbGF5ZXIgJiYgIXRoaXMuYnJpbmtiaXQuUGxheWVyLnByaW1hcnkgKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCAnTm8gcGxheWVyIGxvZ2dlZCBpbicgKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwbGF5ZXIgPSB0aGlzLnBsYXllciB8fCB0aGlzLmJyaW5rYml0LlBsYXllci5wcmltYXJ5O1xuICAgICAgICBpZiAoICFwbGF5ZXIudG9rZW4gJiYgIXBsYXllci5pZCApIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoICdObyBwbGF5ZXIgbG9nZ2VkIGluJyApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwbGF5ZXI7XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2xhc3MtbWV0aG9kcy11c2UtdGhpc1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgZ2V0VXJsKCBtZXRob2QgKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IHRoaXMuaWQgfHwgdGhpcy5kYXRhLl9pZDtcbiAgICAgICAgaWYgKCB0aGlzLnR5cGUgPT09ICdjb3JlJyApIHtcbiAgICAgICAgICAgIHN3aXRjaCAoIG1ldGhvZCApIHtcbiAgICAgICAgICAgICAgICBjYXNlICdwb3N0JzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAuLyR7dGhpcy5wbHVnaW5JZH0vYDtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYC4vJHt0aGlzLnBsdWdpbklkfS8ke2tleX0vYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIHRoaXMudHlwZSA9PT0gJ3BsYXllcicgKSB7XG4gICAgICAgICAgICByZXR1cm4gYC4vZGF0YS8ke3RoaXMucGx1Z2luSWR9L3BsYXllcnMvJHt0aGlzLmdldFBsYXllcigpLmlkfS9rZXlzLyR7a2V5fWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGAuL2RhdGEvJHt0aGlzLnBsdWdpbklkfS9rZXlzLyR7a2V5fWA7XG4gICAgfVxuXG4gICAgZ2V0VG9rZW4oIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy50b2tlbiB8fCB0aGlzLnRva2VuIHx8ICggdGhpcy50eXBlICE9PSAnY29yZScgPyB0aGlzLmdldFBsYXllcigpLnRva2VuIDogdW5kZWZpbmVkICk7XG4gICAgfVxuXG4gICAgZmV0Y2goIC4uLmFyZ3MgKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBub3JtYWxpemVBcmd1bWVudHMoIC4uLmFyZ3MgKTtcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IGVuc3VyZVByb21pc2UoIHRoaXMuZ2V0VG9rZW4oIG9wdGlvbnMgKSlcbiAgICAgICAgLnRoZW4oKCB0b2tlbiApID0+IHtcbiAgICAgICAgICAgIG9wdGlvbnMudG9rZW4gPSB0b2tlbjtcbiAgICAgICAgICAgIHJldHVybiBlbnN1cmVQcm9taXNlKCB0aGlzLmdldFVybCggJ2dldCcgKSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCggdXJpICkgPT4ge1xuICAgICAgICAgICAgb3B0aW9ucy51cmkgPSBvcHRpb25zLnVyaSB8fCB1cmk7XG4gICAgICAgICAgICByZXR1cm4gZW5zdXJlUHJvbWlzZSggdGhpcy5wcm9jZXNzTWlkZGxld2FyZSggJ2ZldGNoJywgb3B0aW9ucyApKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oIG9wdHMgPT5cbiAgICAgICAgICAgIHByb21pc2lmeVZhbGlkYXRpb24oIHRoaXMudmFsaWRhdGUoICdnZXQnLCBvcHRzICkpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLmJyaW5rYml0Ll9nZXQoIG9wdHMgKVxuICAgICAgICApKVxuICAgICAgICAudGhlbigoIHJlc3BvbnNlICkgPT4ge1xuICAgICAgICAgICAgbWVyZ2UoXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLFxuICAgICAgICAgICAgICAgIHRoaXMucmVhZGFibGUoIHRoaXMudHlwZSA9PT0gJ2NvcmUnID8gcmVzcG9uc2UuYm9keSA6IHJlc3BvbnNlLmJvZHkuZGF0YVZhbHVlIClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoIHRoaXMuZGF0YS5faWQgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pZCA9IHRoaXMuZGF0YS5faWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmVtaXQoICdmZXRjaCcsIG5ldyBCcmlua2JpdEV2ZW50KCAnZmV0Y2gnLCByZXNwb25zZSApKTtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBub3JtYWxpemVSZXNwb25zZSggcHJvbWlzZSwgb3B0aW9ucyApO1xuICAgIH1cblxuICAgIHNhdmUoIC4uLmFyZ3MgKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBub3JtYWxpemVBcmd1bWVudHMoIC4uLmFyZ3MgKTtcbiAgICAgICAgaWYgKCBvcHRpb25zLmJvZHkgKSB7XG4gICAgICAgICAgICB0aGlzLnNldCggb3B0aW9ucy5ib2R5ICk7XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucy5tZXRob2QgPSBvcHRpb25zLm1ldGhvZCB8fCAoIHRoaXMuaWQgPyAncHV0JyA6ICdwb3N0JyApO1xuICAgICAgICBvcHRpb25zLmJvZHkgPSBvcHRpb25zLm1ldGhvZCA9PT0gJ3B1dCcgfHwgb3B0aW9ucy5tZXRob2QgPT09ICdwb3N0JyA/IHRoaXMud3JpdGVhYmxlKCB0aGlzLmRhdGEgKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IGVuc3VyZVByb21pc2UoIHRoaXMuZ2V0VG9rZW4oIG9wdGlvbnMgKSlcbiAgICAgICAgLnRoZW4oKCB0b2tlbiApID0+IHtcbiAgICAgICAgICAgIG9wdGlvbnMudG9rZW4gPSB0b2tlbjtcbiAgICAgICAgICAgIHJldHVybiBlbnN1cmVQcm9taXNlKCB0aGlzLmdldFVybCggb3B0aW9ucy5tZXRob2QgKSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCggdXJpICkgPT4ge1xuICAgICAgICAgICAgb3B0aW9ucy51cmkgPSBvcHRpb25zLnVyaSB8fCB1cmk7XG4gICAgICAgICAgICByZXR1cm4gZW5zdXJlUHJvbWlzZSggdGhpcy5wcm9jZXNzTWlkZGxld2FyZSggJ3NhdmUnLCBvcHRpb25zICkpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbiggb3B0cyA9PlxuICAgICAgICAgICAgcHJvbWlzaWZ5VmFsaWRhdGlvbiggdGhpcy52YWxpZGF0ZSggb3B0aW9ucy5tZXRob2QsIG9wdHMgKSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYnJpbmtiaXQuX3JlcXVlc3QoIG9wdHMgKSlcbiAgICAgICAgKVxuICAgICAgICAudGhlbigoIHJlc3BvbnNlICkgPT4ge1xuICAgICAgICAgICAgbWVyZ2UoXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLFxuICAgICAgICAgICAgICAgIHRoaXMucmVhZGFibGUoIHRoaXMudHlwZSA9PT0gJ2NvcmUnID8gcmVzcG9uc2UuYm9keSA6IHJlc3BvbnNlLmJvZHkuZGF0YVZhbHVlIClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoIHRoaXMuZGF0YS5faWQgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pZCA9IHRoaXMuZGF0YS5faWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmVtaXQoICdzYXZlJywgbmV3IEJyaW5rYml0RXZlbnQoICdzYXZlJywgcmVzcG9uc2UgKSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbm9ybWFsaXplUmVzcG9uc2UoIHByb21pc2UsIG9wdGlvbnMgKTtcbiAgICB9XG5cbiAgICBkZXN0cm95KCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IGVuc3VyZVByb21pc2UoIHRoaXMuZ2V0VG9rZW4oIG9wdGlvbnMgKSlcbiAgICAgICAgLnRoZW4oKCB0b2tlbiApID0+IHtcbiAgICAgICAgICAgIG9wdGlvbnMudG9rZW4gPSB0b2tlbjtcbiAgICAgICAgICAgIHJldHVybiBlbnN1cmVQcm9taXNlKCB0aGlzLmdldFVybCggJ2RlbGV0ZScgKSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCggdXJpICkgPT4ge1xuICAgICAgICAgICAgb3B0aW9ucy51cmkgPSBvcHRpb25zLnVyaSB8fCB1cmk7XG4gICAgICAgICAgICByZXR1cm4gZW5zdXJlUHJvbWlzZSggdGhpcy5wcm9jZXNzTWlkZGxld2FyZSggJ2Rlc3Ryb3knLCBvcHRpb25zICkpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbiggb3B0cyA9PlxuICAgICAgICAgICAgcHJvbWlzaWZ5VmFsaWRhdGlvbiggdGhpcy52YWxpZGF0ZSggJ2RlbGV0ZScsIG9wdHMgKSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYnJpbmtiaXQuX2RlbGV0ZSggb3B0cyApKVxuICAgICAgICApXG4gICAgICAgIC50aGVuKCggcmVzcG9uc2UgKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5kYXRhLmlkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZVJlc3BvbnNlKCBwcm9taXNlLCBvcHRpb25zICk7XG4gICAgfVxuXG4gICAgZ2V0KCBwYXRoICkge1xuICAgICAgICBpZiAoIHR5cGVvZiBwYXRoICE9PSAnb2JqZWN0JyAmJiB0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIGAke3R5cGVvZiBwYXRofSBpcyBub3QgYSB2YWxpZCB0eXBlIGZvciBwYXRoYCApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eXBlb2YgYXR0ciA9PT0gJ3N0cmluZycgPyBnZXQoIHRoaXMuZGF0YSwgcGF0aCApIDogcGljayggdGhpcy5kYXRhLCBwYXRoICk7XG4gICAgfVxuXG4gICAgc2V0KCBwYXRoLCB2YWx1ZSApIHtcbiAgICAgICAgaWYgKCB0eXBlb2YgcGF0aCA9PT0gJ29iamVjdCcgKSB7XG4gICAgICAgICAgICBtZXJnZSggdGhpcy5kYXRhLCB0aGlzLndyaXRlYWJsZSggcGF0aCApKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICggdHlwZW9mIHBhdGggPT09ICdzdHJpbmcnICkge1xuICAgICAgICAgICAgaWYgKCB0aGlzLndyaXRlICYmICF0aGlzLndyaXRlLmluY2x1ZGVzKCBwYXRoICkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIGBQYXRoICR7cGF0aH0gaXMgbm90IHdyaXRlYWJsZSFgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXQoIHRoaXMuZGF0YSwgcGF0aCwgdmFsdWUgKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvciggYCR7dHlwZW9mIHBhdGh9IGlzIG5vdCBhIHZhbGlkIHR5cGUgZm9yIHBhdGhgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3cml0ZWFibGUoIGRhdGEgKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndyaXRlID8gcGljayggZGF0YSwgdGhpcy53cml0ZSApIDogZGF0YTtcbiAgICB9XG5cbiAgICByZWFkYWJsZSggZGF0YSApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZCA/IHBpY2soIGRhdGEsIHRoaXMucmVhZCApIDogZGF0YTtcbiAgICB9XG5cbiAgICBwcm9jZXNzTWlkZGxld2FyZSggbWV0aG9kLCBvcHRzICkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMubWlkZGxld2FyZSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLm1pZGRsZXdhcmVbbWV0aG9kXSA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMubWlkZGxld2FyZVttZXRob2RdKCBvcHRzICkgOiBvcHRzO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGUoIC4uLmFyZ3MgKSB7XG4gICAgICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IHRoaXMoIC4uLmFyZ3MgKTtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlLnNhdmUoKVxuICAgICAgICAudGhlbigoKSA9PiBpbnN0YW5jZSApO1xuICAgIH1cblxufVxuXG5ldmVudEVtaXR0ZXIoIFBsdWdpbi5wcm90b3R5cGUgKTtcblxubW9kdWxlLmV4cG9ydHMgPSBQbHVnaW47XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGx1Z2luLmpzIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3VuZGVmaW5lZCA9IHJlcXVpcmUoXCIuLi9mdW5jdGlvbi9ub29wXCIpKCk7IC8vIFN1cHBvcnQgRVMzIGVuZ2luZXNcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsKSB7XG4gcmV0dXJuICh2YWwgIT09IF91bmRlZmluZWQpICYmICh2YWwgIT09IG51bGwpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9pcy12YWx1ZS5qcyIsImNvbnN0IHZhbGlkYXRlSnMgPSByZXF1aXJlKCAndmFsaWRhdGUuanMnICk7XG5jb25zdCBWYWxpZGF0aW9uRXJyb3IgPSByZXF1aXJlKCAnLi92YWxpZGF0aW9uRXJyb3InICk7XG5cbnZhbGlkYXRlSnMudmFsaWRhdG9ycy5kYXRhVHlwZSA9IGZ1bmN0aW9uIHZhbGlkYXRlRGF0YVR5cGUoIHZhbHVlLCBvcHRpb25zICkge1xuICAgIHJldHVybiAoIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsaWRhdGVKc1tgaXMke3ZhbGlkYXRlSnMuY2FwaXRhbGl6ZSggb3B0aW9ucyApfWBdKCB2YWx1ZSApKSA/IG51bGwgOiBgaXMgbm90IG9mIHR5cGUgJHtvcHRpb25zfWA7XG59O1xuXG52YWxpZGF0ZUpzLnZhbGlkYXRvcnMuaW5zdGFuY2VPZiA9IGZ1bmN0aW9uIHZhbGlkYXRlSW5zdGFuY2VvZiggdmFsdWUsIG9wdGlvbnMgKSB7XG4gICAgcmV0dXJuICggdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSBpbnN0YW5jZW9mIG9wdGlvbnMgKTtcbn07XG5cbmNvbnN0IHZhbGlkYXRlID0gZnVuY3Rpb24gdmFsaWRhdGUoIGF0dHJpYnV0ZXMsIGNvbnN0cmFpbnRzICkge1xuICAgIGNvbnN0IGludmFsaWQgPSB2YWxpZGF0ZUpzKCBhdHRyaWJ1dGVzLCBjb25zdHJhaW50cyApO1xuICAgIGlmICggaW52YWxpZCApIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCBuZXcgVmFsaWRhdGlvbkVycm9yKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IGludmFsaWQuZXJyb3IsXG4gICAgICAgICAgICBkZXRhaWxzOiBpbnZhbGlkLFxuICAgICAgICB9KSk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbn07XG5cbnZhbGlkYXRlLmNvbnN0cnVjdG9yID0gZnVuY3Rpb24gdmFsaWRhdGVDb25zdHJ1Y3RvciggY29uZmlnLCBjb25zdHJhaW50cyApIHtcbiAgICBpZiAoIHR5cGVvZiBjb25maWcgIT09ICdvYmplY3QnICkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCAnY29uZmlnIG11c3QgYmUgYW4gb2JqZWN0JyApO1xuICAgIH1cbiAgICBjb25zdCBpbnZhbGlkID0gdmFsaWRhdGVKcyggY29uZmlnLCBjb25zdHJhaW50cyApO1xuICAgIGlmICggaW52YWxpZCApIHtcbiAgICAgICAgdGhyb3cgbmV3IFZhbGlkYXRpb25FcnJvcih7XG4gICAgICAgICAgICBtZXNzYWdlOiBpbnZhbGlkLmVycm9yLFxuICAgICAgICAgICAgZGV0YWlsczogaW52YWxpZCxcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB2YWxpZGF0ZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy92YWxpZGF0ZS9pbmRleC5qcyIsImNvbnN0IGN1c3RvbUVycm9yID0gcmVxdWlyZSggJ2N1c3RvbS1lcnJvci1pbnN0YW5jZScgKTtcblxuY29uc3QgVmFsaWRhdGlvbkVycm9yID0gY3VzdG9tRXJyb3IoICdWYWxpZGF0aW9uRXJyb3InLCB7XG4gICAgbWVzc2FnZTogJ1ZhbGlkYXRpb24gZmFpbGVkJyxcbiAgICBkZXRhaWxzOiBbXSxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZhbGlkYXRpb25FcnJvcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy92YWxpZGF0ZS92YWxpZGF0aW9uRXJyb3IuanMiLCJ2YXIgcm5nID0gcmVxdWlyZSgnLi9saWIvcm5nJyk7XG52YXIgYnl0ZXNUb1V1aWQgPSByZXF1aXJlKCcuL2xpYi9ieXRlc1RvVXVpZCcpO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcblxuICBpZiAodHlwZW9mKG9wdGlvbnMpID09ICdzdHJpbmcnKSB7XG4gICAgYnVmID0gb3B0aW9ucyA9PSAnYmluYXJ5JyA/IG5ldyBBcnJheSgxNikgOiBudWxsO1xuICAgIG9wdGlvbnMgPSBudWxsO1xuICB9XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTtcblxuICAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG4gIHJuZHNbNl0gPSAocm5kc1s2XSAmIDB4MGYpIHwgMHg0MDtcbiAgcm5kc1s4XSA9IChybmRzWzhdICYgMHgzZikgfCAweDgwO1xuXG4gIC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuICBpZiAoYnVmKSB7XG4gICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IDE2OyArK2lpKSB7XG4gICAgICBidWZbaSArIGlpXSA9IHJuZHNbaWldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYgfHwgYnl0ZXNUb1V1aWQocm5kcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdjQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdXVpZC92NC5qcyIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyB0aGUgc2l6ZSB0byBlbmFibGUgbGFyZ2UgYXJyYXkgb3B0aW1pemF0aW9ucy4gKi9cbnZhciBMQVJHRV9BUlJBWV9TSVpFID0gMjAwO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcHJvbWlzZVRhZyA9ICdbb2JqZWN0IFByb21pc2VdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGAgZmxhZ3MgZnJvbSB0aGVpciBjb2VyY2VkIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVGbGFncyA9IC9cXHcqJC87XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpKS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXig/OjB8WzEtOV1cXGQqKSQvO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0YVZpZXdUYWddID0gdHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID0gdHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPVxudHlwZWRBcnJheVRhZ3NbbWFwVGFnXSA9IHR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbb2JqZWN0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPVxudHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgc3VwcG9ydGVkIGJ5IGBfLmNsb25lYC4gKi9cbnZhciBjbG9uZWFibGVUYWdzID0ge307XG5jbG9uZWFibGVUYWdzW2FyZ3NUYWddID0gY2xvbmVhYmxlVGFnc1thcnJheVRhZ10gPVxuY2xvbmVhYmxlVGFnc1thcnJheUJ1ZmZlclRhZ10gPSBjbG9uZWFibGVUYWdzW2RhdGFWaWV3VGFnXSA9XG5jbG9uZWFibGVUYWdzW2Jvb2xUYWddID0gY2xvbmVhYmxlVGFnc1tkYXRlVGFnXSA9XG5jbG9uZWFibGVUYWdzW2Zsb2F0MzJUYWddID0gY2xvbmVhYmxlVGFnc1tmbG9hdDY0VGFnXSA9XG5jbG9uZWFibGVUYWdzW2ludDhUYWddID0gY2xvbmVhYmxlVGFnc1tpbnQxNlRhZ10gPVxuY2xvbmVhYmxlVGFnc1tpbnQzMlRhZ10gPSBjbG9uZWFibGVUYWdzW21hcFRhZ10gPVxuY2xvbmVhYmxlVGFnc1tudW1iZXJUYWddID0gY2xvbmVhYmxlVGFnc1tvYmplY3RUYWddID1cbmNsb25lYWJsZVRhZ3NbcmVnZXhwVGFnXSA9IGNsb25lYWJsZVRhZ3Nbc2V0VGFnXSA9XG5jbG9uZWFibGVUYWdzW3N0cmluZ1RhZ10gPSBjbG9uZWFibGVUYWdzW3N5bWJvbFRhZ10gPVxuY2xvbmVhYmxlVGFnc1t1aW50OFRhZ10gPSBjbG9uZWFibGVUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPVxuY2xvbmVhYmxlVGFnc1t1aW50MTZUYWddID0gY2xvbmVhYmxlVGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbmNsb25lYWJsZVRhZ3NbZXJyb3JUYWddID0gY2xvbmVhYmxlVGFnc1tmdW5jVGFnXSA9XG5jbG9uZWFibGVUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHByb2Nlc3NgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlUHJvY2VzcyA9IG1vZHVsZUV4cG9ydHMgJiYgZnJlZUdsb2JhbC5wcm9jZXNzO1xuXG4vKiogVXNlZCB0byBhY2Nlc3MgZmFzdGVyIE5vZGUuanMgaGVscGVycy4gKi9cbnZhciBub2RlVXRpbCA9IChmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZnJlZVByb2Nlc3MgJiYgZnJlZVByb2Nlc3MuYmluZGluZygndXRpbCcpO1xuICB9IGNhdGNoIChlKSB7fVxufSgpKTtcblxuLyogTm9kZS5qcyBoZWxwZXIgcmVmZXJlbmNlcy4gKi9cbnZhciBub2RlSXNUeXBlZEFycmF5ID0gbm9kZVV0aWwgJiYgbm9kZVV0aWwuaXNUeXBlZEFycmF5O1xuXG4vKipcbiAqIEFkZHMgdGhlIGtleS12YWx1ZSBgcGFpcmAgdG8gYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fSBwYWlyIFRoZSBrZXktdmFsdWUgcGFpciB0byBhZGQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBtYXBgLlxuICovXG5mdW5jdGlvbiBhZGRNYXBFbnRyeShtYXAsIHBhaXIpIHtcbiAgLy8gRG9uJ3QgcmV0dXJuIGBtYXAuc2V0YCBiZWNhdXNlIGl0J3Mgbm90IGNoYWluYWJsZSBpbiBJRSAxMS5cbiAgbWFwLnNldChwYWlyWzBdLCBwYWlyWzFdKTtcbiAgcmV0dXJuIG1hcDtcbn1cblxuLyoqXG4gKiBBZGRzIGB2YWx1ZWAgdG8gYHNldGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgVGhlIHNldCB0byBtb2RpZnkuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhZGQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBzZXRgLlxuICovXG5mdW5jdGlvbiBhZGRTZXRFbnRyeShzZXQsIHZhbHVlKSB7XG4gIC8vIERvbid0IHJldHVybiBgc2V0LmFkZGAgYmVjYXVzZSBpdCdzIG5vdCBjaGFpbmFibGUgaW4gSUUgMTEuXG4gIHNldC5hZGQodmFsdWUpO1xuICByZXR1cm4gc2V0O1xufVxuXG4vKipcbiAqIEEgZmFzdGVyIGFsdGVybmF0aXZlIHRvIGBGdW5jdGlvbiNhcHBseWAsIHRoaXMgZnVuY3Rpb24gaW52b2tlcyBgZnVuY2BcbiAqIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIGB0aGlzQXJnYCBhbmQgdGhlIGFyZ3VtZW50cyBvZiBgYXJnc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGludm9rZS5cbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtBcnJheX0gYXJncyBUaGUgYXJndW1lbnRzIHRvIGludm9rZSBgZnVuY2Agd2l0aC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXN1bHQgb2YgYGZ1bmNgLlxuICovXG5mdW5jdGlvbiBhcHBseShmdW5jLCB0aGlzQXJnLCBhcmdzKSB7XG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZyk7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmZvckVhY2hgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheUVhY2goYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSA9PT0gZmFsc2UpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbi8qKlxuICogQXBwZW5kcyB0aGUgZWxlbWVudHMgb2YgYHZhbHVlc2AgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgdmFsdWVzIHRvIGFwcGVuZC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheVB1c2goYXJyYXksIHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcy5sZW5ndGgsXG4gICAgICBvZmZzZXQgPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtvZmZzZXQgKyBpbmRleF0gPSB2YWx1ZXNbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ucmVkdWNlYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0geyp9IFthY2N1bXVsYXRvcl0gVGhlIGluaXRpYWwgdmFsdWUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpbml0QWNjdW1dIFNwZWNpZnkgdXNpbmcgdGhlIGZpcnN0IGVsZW1lbnQgb2YgYGFycmF5YCBhc1xuICogIHRoZSBpbml0aWFsIHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGFjY3VtdWxhdGVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBhcnJheVJlZHVjZShhcnJheSwgaXRlcmF0ZWUsIGFjY3VtdWxhdG9yLCBpbml0QWNjdW0pIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgaWYgKGluaXRBY2N1bSAmJiBsZW5ndGgpIHtcbiAgICBhY2N1bXVsYXRvciA9IGFycmF5WysraW5kZXhdO1xuICB9XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYWNjdW11bGF0b3IgPSBpdGVyYXRlZShhY2N1bXVsYXRvciwgYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpO1xuICB9XG4gIHJldHVybiBhY2N1bXVsYXRvcjtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50aW1lc2Agd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzXG4gKiBvciBtYXggYXJyYXkgbGVuZ3RoIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiB0aW1lcyB0byBpbnZva2UgYGl0ZXJhdGVlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUaW1lcyhuLCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG4pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbikge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShpbmRleCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy51bmFyeWAgd2l0aG91dCBzdXBwb3J0IGZvciBzdG9yaW5nIG1ldGFkYXRhLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjYXAgYXJndW1lbnRzIGZvci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNhcHBlZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVVuYXJ5KGZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmModmFsdWUpO1xuICB9O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBnZXRWYWx1ZShvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0IGluIElFIDwgOS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSG9zdE9iamVjdCh2YWx1ZSkge1xuICAvLyBNYW55IGhvc3Qgb2JqZWN0cyBhcmUgYE9iamVjdGAgb2JqZWN0cyB0aGF0IGNhbiBjb2VyY2UgdG8gc3RyaW5nc1xuICAvLyBkZXNwaXRlIGhhdmluZyBpbXByb3Blcmx5IGRlZmluZWQgYHRvU3RyaW5nYCBtZXRob2RzLlxuICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gIGlmICh2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZS50b1N0cmluZyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9ICEhKHZhbHVlICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgbWFwYCB0byBpdHMga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUga2V5LXZhbHVlIHBhaXJzLlxuICovXG5mdW5jdGlvbiBtYXBUb0FycmF5KG1hcCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG1hcC5zaXplKTtcblxuICBtYXAuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gW2tleSwgdmFsdWVdO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbi8qKlxuICogQ29udmVydHMgYHNldGAgdG8gYW4gYXJyYXkgb2YgaXRzIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gc2V0VG9BcnJheShzZXQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShzZXQuc2l6ZSk7XG5cbiAgc2V0LmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSB2YWx1ZTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlLFxuICAgIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvdmVycmVhY2hpbmcgY29yZS1qcyBzaGltcy4gKi9cbnZhciBjb3JlSnNEYXRhID0gcm9vdFsnX19jb3JlLWpzX3NoYXJlZF9fJ107XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtZXRob2RzIG1hc3F1ZXJhZGluZyBhcyBuYXRpdmUuICovXG52YXIgbWFza1NyY0tleSA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHVpZCA9IC9bXi5dKyQvLmV4ZWMoY29yZUpzRGF0YSAmJiBjb3JlSnNEYXRhLmtleXMgJiYgY29yZUpzRGF0YS5rZXlzLklFX1BST1RPIHx8ICcnKTtcbiAgcmV0dXJuIHVpZCA/ICgnU3ltYm9sKHNyYylfMS4nICsgdWlkKSA6ICcnO1xufSgpKTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gaW5mZXIgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yLiAqL1xudmFyIG9iamVjdEN0b3JTdHJpbmcgPSBmdW5jVG9TdHJpbmcuY2FsbChPYmplY3QpO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgQnVmZmVyID0gbW9kdWxlRXhwb3J0cyA/IHJvb3QuQnVmZmVyIDogdW5kZWZpbmVkLFxuICAgIFN5bWJvbCA9IHJvb3QuU3ltYm9sLFxuICAgIFVpbnQ4QXJyYXkgPSByb290LlVpbnQ4QXJyYXksXG4gICAgZ2V0UHJvdG90eXBlID0gb3ZlckFyZyhPYmplY3QuZ2V0UHJvdG90eXBlT2YsIE9iamVjdCksXG4gICAgb2JqZWN0Q3JlYXRlID0gT2JqZWN0LmNyZWF0ZSxcbiAgICBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlLFxuICAgIHNwbGljZSA9IGFycmF5UHJvdG8uc3BsaWNlO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlR2V0U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsXG4gICAgbmF0aXZlSXNCdWZmZXIgPSBCdWZmZXIgPyBCdWZmZXIuaXNCdWZmZXIgOiB1bmRlZmluZWQsXG4gICAgbmF0aXZlS2V5cyA9IG92ZXJBcmcoT2JqZWN0LmtleXMsIE9iamVjdCksXG4gICAgbmF0aXZlTWF4ID0gTWF0aC5tYXg7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBEYXRhVmlldyA9IGdldE5hdGl2ZShyb290LCAnRGF0YVZpZXcnKSxcbiAgICBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpLFxuICAgIFByb21pc2UgPSBnZXROYXRpdmUocm9vdCwgJ1Byb21pc2UnKSxcbiAgICBTZXQgPSBnZXROYXRpdmUocm9vdCwgJ1NldCcpLFxuICAgIFdlYWtNYXAgPSBnZXROYXRpdmUocm9vdCwgJ1dlYWtNYXAnKSxcbiAgICBuYXRpdmVDcmVhdGUgPSBnZXROYXRpdmUoT2JqZWN0LCAnY3JlYXRlJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtYXBzLCBzZXRzLCBhbmQgd2Vha21hcHMuICovXG52YXIgZGF0YVZpZXdDdG9yU3RyaW5nID0gdG9Tb3VyY2UoRGF0YVZpZXcpLFxuICAgIG1hcEN0b3JTdHJpbmcgPSB0b1NvdXJjZShNYXApLFxuICAgIHByb21pc2VDdG9yU3RyaW5nID0gdG9Tb3VyY2UoUHJvbWlzZSksXG4gICAgc2V0Q3RvclN0cmluZyA9IHRvU291cmNlKFNldCksXG4gICAgd2Vha01hcEN0b3JTdHJpbmcgPSB0b1NvdXJjZShXZWFrTWFwKTtcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFZhbHVlT2YgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnZhbHVlT2YgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGhhc2ggb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBIYXNoKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKi9cbmZ1bmN0aW9uIGhhc2hDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5hdGl2ZUNyZWF0ZSA/IG5hdGl2ZUNyZWF0ZShudWxsKSA6IHt9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge09iamVjdH0gaGFzaCBUaGUgaGFzaCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaERlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIHRoaXMuaGFzKGtleSkgJiYgZGVsZXRlIHRoaXMuX19kYXRhX19ba2V5XTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBoYXNoIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGhhc2hHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKG5hdGl2ZUNyZWF0ZSkge1xuICAgIHZhciByZXN1bHQgPSBkYXRhW2tleV07XG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gSEFTSF9VTkRFRklORUQgPyB1bmRlZmluZWQgOiByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSA/IGRhdGFba2V5XSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBoYXNoIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoSGFzKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHJldHVybiBuYXRpdmVDcmVhdGUgPyBkYXRhW2tleV0gIT09IHVuZGVmaW5lZCA6IGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBoYXNoIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaGFzaCBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gaGFzaFNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgZGF0YVtrZXldID0gKG5hdGl2ZUNyZWF0ZSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IEhBU0hfVU5ERUZJTkVEIDogdmFsdWU7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgSGFzaGAuXG5IYXNoLnByb3RvdHlwZS5jbGVhciA9IGhhc2hDbGVhcjtcbkhhc2gucHJvdG90eXBlWydkZWxldGUnXSA9IGhhc2hEZWxldGU7XG5IYXNoLnByb3RvdHlwZS5nZXQgPSBoYXNoR2V0O1xuSGFzaC5wcm90b3R5cGUuaGFzID0gaGFzaEhhcztcbkhhc2gucHJvdG90eXBlLnNldCA9IGhhc2hTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBsaXN0IGNhY2hlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTGlzdENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBbXTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgIGRhdGEucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgcmV0dXJuIGluZGV4IDwgMCA/IHVuZGVmaW5lZCA6IGRhdGFbaW5kZXhdWzFdO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gYXNzb2NJbmRleE9mKHRoaXMuX19kYXRhX18sIGtleSkgPiAtMTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBsaXN0IGNhY2hlIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBsaXN0IGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICBkYXRhLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhW2luZGV4XVsxXSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTGlzdENhY2hlYC5cbkxpc3RDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBsaXN0Q2FjaGVDbGVhcjtcbkxpc3RDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbGlzdENhY2hlRGVsZXRlO1xuTGlzdENhY2hlLnByb3RvdHlwZS5nZXQgPSBsaXN0Q2FjaGVHZXQ7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmhhcyA9IGxpc3RDYWNoZUhhcztcbkxpc3RDYWNoZS5wcm90b3R5cGUuc2V0ID0gbGlzdENhY2hlU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXAgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTWFwQ2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IHtcbiAgICAnaGFzaCc6IG5ldyBIYXNoLFxuICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVEZWxldGUoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSlbJ2RlbGV0ZSddKGtleSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbWFwIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUdldChrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5nZXQoa2V5KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBtYXAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBtYXAgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbWFwIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIGdldE1hcERhdGEodGhpcywga2V5KS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTWFwQ2FjaGVgLlxuTWFwQ2FjaGUucHJvdG90eXBlLmNsZWFyID0gbWFwQ2FjaGVDbGVhcjtcbk1hcENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBtYXBDYWNoZURlbGV0ZTtcbk1hcENhY2hlLnByb3RvdHlwZS5nZXQgPSBtYXBDYWNoZUdldDtcbk1hcENhY2hlLnByb3RvdHlwZS5oYXMgPSBtYXBDYWNoZUhhcztcbk1hcENhY2hlLnByb3RvdHlwZS5zZXQgPSBtYXBDYWNoZVNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RhY2sgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU3RhY2soZW50cmllcykge1xuICB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZShlbnRyaWVzKTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBTdGFja1xuICovXG5mdW5jdGlvbiBzdGFja0NsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgc3RhY2suXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tEZWxldGUoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fWydkZWxldGUnXShrZXkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHN0YWNrIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBzdGFja0dldChrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uZ2V0KGtleSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgc3RhY2sgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0hhcyhrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgc3RhY2sgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgc3RhY2sgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGNhY2hlID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKGNhY2hlIGluc3RhbmNlb2YgTGlzdENhY2hlKSB7XG4gICAgdmFyIHBhaXJzID0gY2FjaGUuX19kYXRhX187XG4gICAgaWYgKCFNYXAgfHwgKHBhaXJzLmxlbmd0aCA8IExBUkdFX0FSUkFZX1NJWkUgLSAxKSkge1xuICAgICAgcGFpcnMucHVzaChba2V5LCB2YWx1ZV0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNhY2hlID0gdGhpcy5fX2RhdGFfXyA9IG5ldyBNYXBDYWNoZShwYWlycyk7XG4gIH1cbiAgY2FjaGUuc2V0KGtleSwgdmFsdWUpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYFN0YWNrYC5cblN0YWNrLnByb3RvdHlwZS5jbGVhciA9IHN0YWNrQ2xlYXI7XG5TdGFjay5wcm90b3R5cGVbJ2RlbGV0ZSddID0gc3RhY2tEZWxldGU7XG5TdGFjay5wcm90b3R5cGUuZ2V0ID0gc3RhY2tHZXQ7XG5TdGFjay5wcm90b3R5cGUuaGFzID0gc3RhY2tIYXM7XG5TdGFjay5wcm90b3R5cGUuc2V0ID0gc3RhY2tTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiB0aGUgYXJyYXktbGlrZSBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5oZXJpdGVkIFNwZWNpZnkgcmV0dXJuaW5nIGluaGVyaXRlZCBwcm9wZXJ0eSBuYW1lcy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TGlrZUtleXModmFsdWUsIGluaGVyaXRlZCkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICAvLyBTYWZhcmkgOSBtYWtlcyBgYXJndW1lbnRzLmxlbmd0aGAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgdmFyIHJlc3VsdCA9IChpc0FycmF5KHZhbHVlKSB8fCBpc0FyZ3VtZW50cyh2YWx1ZSkpXG4gICAgPyBiYXNlVGltZXModmFsdWUubGVuZ3RoLCBTdHJpbmcpXG4gICAgOiBbXTtcblxuICB2YXIgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aCxcbiAgICAgIHNraXBJbmRleGVzID0gISFsZW5ndGg7XG5cbiAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgaWYgKChpbmhlcml0ZWQgfHwgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkgJiZcbiAgICAgICAgIShza2lwSW5kZXhlcyAmJiAoa2V5ID09ICdsZW5ndGgnIHx8IGlzSW5kZXgoa2V5LCBsZW5ndGgpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBsaWtlIGBhc3NpZ25WYWx1ZWAgZXhjZXB0IHRoYXQgaXQgZG9lc24ndCBhc3NpZ25cbiAqIGB1bmRlZmluZWRgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBhc3NpZ25NZXJnZVZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBpZiAoKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgIWVxKG9iamVjdFtrZXldLCB2YWx1ZSkpIHx8XG4gICAgICAodHlwZW9mIGtleSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkICYmICEoa2V5IGluIG9iamVjdCkpKSB7XG4gICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgfVxufVxuXG4vKipcbiAqIEFzc2lnbnMgYHZhbHVlYCB0byBga2V5YCBvZiBgb2JqZWN0YCBpZiB0aGUgZXhpc3RpbmcgdmFsdWUgaXMgbm90IGVxdWl2YWxlbnRcbiAqIHVzaW5nIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldO1xuICBpZiAoIShoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBlcShvYmpWYWx1ZSwgdmFsdWUpKSB8fFxuICAgICAgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG59XG5cbi8qKlxuICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGBrZXlgIGlzIGZvdW5kIGluIGBhcnJheWAgb2Yga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0ga2V5IFRoZSBrZXkgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGFzc29jSW5kZXhPZihhcnJheSwga2V5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChlcShhcnJheVtsZW5ndGhdWzBdLCBrZXkpKSB7XG4gICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uYXNzaWduYCB3aXRob3V0IHN1cHBvcnQgZm9yIG11bHRpcGxlIHNvdXJjZXNcbiAqIG9yIGBjdXN0b21pemVyYCBmdW5jdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlQXNzaWduKG9iamVjdCwgc291cmNlKSB7XG4gIHJldHVybiBvYmplY3QgJiYgY29weU9iamVjdChzb3VyY2UsIGtleXMoc291cmNlKSwgb2JqZWN0KTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5jbG9uZWAgYW5kIGBfLmNsb25lRGVlcGAgd2hpY2ggdHJhY2tzXG4gKiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNGdWxsXSBTcGVjaWZ5IGEgY2xvbmUgaW5jbHVkaW5nIHN5bWJvbHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjbG9uaW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IFtrZXldIFRoZSBrZXkgb2YgYHZhbHVlYC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgcGFyZW50IG9iamVjdCBvZiBgdmFsdWVgLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGFuZCB0aGVpciBjbG9uZSBjb3VudGVycGFydHMuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgY2xvbmVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBiYXNlQ2xvbmUodmFsdWUsIGlzRGVlcCwgaXNGdWxsLCBjdXN0b21pemVyLCBrZXksIG9iamVjdCwgc3RhY2spIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICByZXN1bHQgPSBvYmplY3QgPyBjdXN0b21pemVyKHZhbHVlLCBrZXksIG9iamVjdCwgc3RhY2spIDogY3VzdG9taXplcih2YWx1ZSk7XG4gIH1cbiAgaWYgKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICB2YXIgaXNBcnIgPSBpc0FycmF5KHZhbHVlKTtcbiAgaWYgKGlzQXJyKSB7XG4gICAgcmVzdWx0ID0gaW5pdENsb25lQXJyYXkodmFsdWUpO1xuICAgIGlmICghaXNEZWVwKSB7XG4gICAgICByZXR1cm4gY29weUFycmF5KHZhbHVlLCByZXN1bHQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgdGFnID0gZ2V0VGFnKHZhbHVlKSxcbiAgICAgICAgaXNGdW5jID0gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZztcblxuICAgIGlmIChpc0J1ZmZlcih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjbG9uZUJ1ZmZlcih2YWx1ZSwgaXNEZWVwKTtcbiAgICB9XG4gICAgaWYgKHRhZyA9PSBvYmplY3RUYWcgfHwgdGFnID09IGFyZ3NUYWcgfHwgKGlzRnVuYyAmJiAhb2JqZWN0KSkge1xuICAgICAgaWYgKGlzSG9zdE9iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdCA/IHZhbHVlIDoge307XG4gICAgICB9XG4gICAgICByZXN1bHQgPSBpbml0Q2xvbmVPYmplY3QoaXNGdW5jID8ge30gOiB2YWx1ZSk7XG4gICAgICBpZiAoIWlzRGVlcCkge1xuICAgICAgICByZXR1cm4gY29weVN5bWJvbHModmFsdWUsIGJhc2VBc3NpZ24ocmVzdWx0LCB2YWx1ZSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIWNsb25lYWJsZVRhZ3NbdGFnXSkge1xuICAgICAgICByZXR1cm4gb2JqZWN0ID8gdmFsdWUgOiB7fTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCA9IGluaXRDbG9uZUJ5VGFnKHZhbHVlLCB0YWcsIGJhc2VDbG9uZSwgaXNEZWVwKTtcbiAgICB9XG4gIH1cbiAgLy8gQ2hlY2sgZm9yIGNpcmN1bGFyIHJlZmVyZW5jZXMgYW5kIHJldHVybiBpdHMgY29ycmVzcG9uZGluZyBjbG9uZS5cbiAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQodmFsdWUpO1xuICBpZiAoc3RhY2tlZCkge1xuICAgIHJldHVybiBzdGFja2VkO1xuICB9XG4gIHN0YWNrLnNldCh2YWx1ZSwgcmVzdWx0KTtcblxuICBpZiAoIWlzQXJyKSB7XG4gICAgdmFyIHByb3BzID0gaXNGdWxsID8gZ2V0QWxsS2V5cyh2YWx1ZSkgOiBrZXlzKHZhbHVlKTtcbiAgfVxuICBhcnJheUVhY2gocHJvcHMgfHwgdmFsdWUsIGZ1bmN0aW9uKHN1YlZhbHVlLCBrZXkpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIGtleSA9IHN1YlZhbHVlO1xuICAgICAgc3ViVmFsdWUgPSB2YWx1ZVtrZXldO1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBwb3B1bGF0ZSBjbG9uZSAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIGFzc2lnblZhbHVlKHJlc3VsdCwga2V5LCBiYXNlQ2xvbmUoc3ViVmFsdWUsIGlzRGVlcCwgaXNGdWxsLCBjdXN0b21pemVyLCBrZXksIHZhbHVlLCBzdGFjaykpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5jcmVhdGVgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYXNzaWduaW5nXG4gKiBwcm9wZXJ0aWVzIHRvIHRoZSBjcmVhdGVkIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHByb3RvdHlwZSBUaGUgb2JqZWN0IHRvIGluaGVyaXQgZnJvbS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGJhc2VDcmVhdGUocHJvdG8pIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHByb3RvKSA/IG9iamVjdENyZWF0ZShwcm90bykgOiB7fTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0QWxsS2V5c2AgYW5kIGBnZXRBbGxLZXlzSW5gIHdoaWNoIHVzZXNcbiAqIGBrZXlzRnVuY2AgYW5kIGBzeW1ib2xzRnVuY2AgdG8gZ2V0IHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIGFuZFxuICogc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN5bWJvbHNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzIGFuZCBzeW1ib2xzLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0QWxsS2V5cyhvYmplY3QsIGtleXNGdW5jLCBzeW1ib2xzRnVuYykge1xuICB2YXIgcmVzdWx0ID0ga2V5c0Z1bmMob2JqZWN0KTtcbiAgcmV0dXJuIGlzQXJyYXkob2JqZWN0KSA/IHJlc3VsdCA6IGFycmF5UHVzaChyZXN1bHQsIHN5bWJvbHNGdW5jKG9iamVjdCkpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRUYWdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgcmV0dXJuIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbixcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCBpc01hc2tlZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHBhdHRlcm4gPSAoaXNGdW5jdGlvbih2YWx1ZSkgfHwgaXNIb3N0T2JqZWN0KHZhbHVlKSkgPyByZUlzTmF0aXZlIDogcmVJc0hvc3RDdG9yO1xuICByZXR1cm4gcGF0dGVybi50ZXN0KHRvU291cmNlKHZhbHVlKSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNUeXBlZEFycmF5YCB3aXRob3V0IE5vZGUuanMgb3B0aW1pemF0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiZcbiAgICBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICEhdHlwZWRBcnJheVRhZ3Nbb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSldO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNgIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXMob2JqZWN0KSB7XG4gIGlmICghaXNQcm90b3R5cGUob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzKG9iamVjdCk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYga2V5ICE9ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c0luYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzSW4ob2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzSW4ob2JqZWN0KTtcbiAgfVxuICB2YXIgaXNQcm90byA9IGlzUHJvdG90eXBlKG9iamVjdCksXG4gICAgICByZXN1bHQgPSBbXTtcblxuICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKCEoa2V5ID09ICdjb25zdHJ1Y3RvcicgJiYgKGlzUHJvdG8gfHwgIWhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWVyZ2VgIHdpdGhvdXQgc3VwcG9ydCBmb3IgbXVsdGlwbGUgc291cmNlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzcmNJbmRleCBUaGUgaW5kZXggb2YgYHNvdXJjZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBtZXJnZWQgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBzb3VyY2UgdmFsdWVzIGFuZCB0aGVpciBtZXJnZWRcbiAqICBjb3VudGVycGFydHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZShvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgsIGN1c3RvbWl6ZXIsIHN0YWNrKSB7XG4gIGlmIChvYmplY3QgPT09IHNvdXJjZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIShpc0FycmF5KHNvdXJjZSkgfHwgaXNUeXBlZEFycmF5KHNvdXJjZSkpKSB7XG4gICAgdmFyIHByb3BzID0gYmFzZUtleXNJbihzb3VyY2UpO1xuICB9XG4gIGFycmF5RWFjaChwcm9wcyB8fCBzb3VyY2UsIGZ1bmN0aW9uKHNyY1ZhbHVlLCBrZXkpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIGtleSA9IHNyY1ZhbHVlO1xuICAgICAgc3JjVmFsdWUgPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gICAgaWYgKGlzT2JqZWN0KHNyY1ZhbHVlKSkge1xuICAgICAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgICAgIGJhc2VNZXJnZURlZXAob2JqZWN0LCBzb3VyY2UsIGtleSwgc3JjSW5kZXgsIGJhc2VNZXJnZSwgY3VzdG9taXplciwgc3RhY2spO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBuZXdWYWx1ZSA9IGN1c3RvbWl6ZXJcbiAgICAgICAgPyBjdXN0b21pemVyKG9iamVjdFtrZXldLCBzcmNWYWx1ZSwgKGtleSArICcnKSwgb2JqZWN0LCBzb3VyY2UsIHN0YWNrKVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKG5ld1ZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBzcmNWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIG5ld1ZhbHVlKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZU1lcmdlYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gKiBkZWVwIG1lcmdlcyBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGVuYWJsaW5nIG9iamVjdHMgd2l0aCBjaXJjdWxhclxuICogcmVmZXJlbmNlcyB0byBiZSBtZXJnZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIG1lcmdlLlxuICogQHBhcmFtIHtudW1iZXJ9IHNyY0luZGV4IFRoZSBpbmRleCBvZiBgc291cmNlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1lcmdlRnVuYyBUaGUgZnVuY3Rpb24gdG8gbWVyZ2UgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgYXNzaWduZWQgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBzb3VyY2UgdmFsdWVzIGFuZCB0aGVpciBtZXJnZWRcbiAqICBjb3VudGVycGFydHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZURlZXAob2JqZWN0LCBzb3VyY2UsIGtleSwgc3JjSW5kZXgsIG1lcmdlRnVuYywgY3VzdG9taXplciwgc3RhY2spIHtcbiAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICBzcmNWYWx1ZSA9IHNvdXJjZVtrZXldLFxuICAgICAgc3RhY2tlZCA9IHN0YWNrLmdldChzcmNWYWx1ZSk7XG5cbiAgaWYgKHN0YWNrZWQpIHtcbiAgICBhc3NpZ25NZXJnZVZhbHVlKG9iamVjdCwga2V5LCBzdGFja2VkKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgID8gY3VzdG9taXplcihvYmpWYWx1ZSwgc3JjVmFsdWUsIChrZXkgKyAnJyksIG9iamVjdCwgc291cmNlLCBzdGFjaylcbiAgICA6IHVuZGVmaW5lZDtcblxuICB2YXIgaXNDb21tb24gPSBuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkO1xuXG4gIGlmIChpc0NvbW1vbikge1xuICAgIG5ld1ZhbHVlID0gc3JjVmFsdWU7XG4gICAgaWYgKGlzQXJyYXkoc3JjVmFsdWUpIHx8IGlzVHlwZWRBcnJheShzcmNWYWx1ZSkpIHtcbiAgICAgIGlmIChpc0FycmF5KG9ialZhbHVlKSkge1xuICAgICAgICBuZXdWYWx1ZSA9IG9ialZhbHVlO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNBcnJheUxpa2VPYmplY3Qob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gY29weUFycmF5KG9ialZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgICAgICBuZXdWYWx1ZSA9IGJhc2VDbG9uZShzcmNWYWx1ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3Qoc3JjVmFsdWUpIHx8IGlzQXJndW1lbnRzKHNyY1ZhbHVlKSkge1xuICAgICAgaWYgKGlzQXJndW1lbnRzKG9ialZhbHVlKSkge1xuICAgICAgICBuZXdWYWx1ZSA9IHRvUGxhaW5PYmplY3Qob2JqVmFsdWUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoIWlzT2JqZWN0KG9ialZhbHVlKSB8fCAoc3JjSW5kZXggJiYgaXNGdW5jdGlvbihvYmpWYWx1ZSkpKSB7XG4gICAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgICAgIG5ld1ZhbHVlID0gYmFzZUNsb25lKHNyY1ZhbHVlLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBuZXdWYWx1ZSA9IG9ialZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIGlmIChpc0NvbW1vbikge1xuICAgIC8vIFJlY3Vyc2l2ZWx5IG1lcmdlIG9iamVjdHMgYW5kIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIHN0YWNrLnNldChzcmNWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIG1lcmdlRnVuYyhuZXdWYWx1ZSwgc3JjVmFsdWUsIHNyY0luZGV4LCBjdXN0b21pemVyLCBzdGFjayk7XG4gICAgc3RhY2tbJ2RlbGV0ZSddKHNyY1ZhbHVlKTtcbiAgfVxuICBhc3NpZ25NZXJnZVZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucmVzdGAgd2hpY2ggZG9lc24ndCB2YWxpZGF0ZSBvciBjb2VyY2UgYXJndW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VSZXN0KGZ1bmMsIHN0YXJ0KSB7XG4gIHN0YXJ0ID0gbmF0aXZlTWF4KHN0YXJ0ID09PSB1bmRlZmluZWQgPyAoZnVuYy5sZW5ndGggLSAxKSA6IHN0YXJ0LCAwKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBuYXRpdmVNYXgoYXJncy5sZW5ndGggLSBzdGFydCwgMCksXG4gICAgICAgIGFycmF5ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICBhcnJheVtpbmRleF0gPSBhcmdzW3N0YXJ0ICsgaW5kZXhdO1xuICAgIH1cbiAgICBpbmRleCA9IC0xO1xuICAgIHZhciBvdGhlckFyZ3MgPSBBcnJheShzdGFydCArIDEpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgc3RhcnQpIHtcbiAgICAgIG90aGVyQXJnc1tpbmRleF0gPSBhcmdzW2luZGV4XTtcbiAgICB9XG4gICAgb3RoZXJBcmdzW3N0YXJ0XSA9IGFycmF5O1xuICAgIHJldHVybiBhcHBseShmdW5jLCB0aGlzLCBvdGhlckFyZ3MpO1xuICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiAgYGJ1ZmZlcmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZmZXIgVGhlIGJ1ZmZlciB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7QnVmZmVyfSBSZXR1cm5zIHRoZSBjbG9uZWQgYnVmZmVyLlxuICovXG5mdW5jdGlvbiBjbG9uZUJ1ZmZlcihidWZmZXIsIGlzRGVlcCkge1xuICBpZiAoaXNEZWVwKSB7XG4gICAgcmV0dXJuIGJ1ZmZlci5zbGljZSgpO1xuICB9XG4gIHZhciByZXN1bHQgPSBuZXcgYnVmZmVyLmNvbnN0cnVjdG9yKGJ1ZmZlci5sZW5ndGgpO1xuICBidWZmZXIuY29weShyZXN1bHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgYXJyYXlCdWZmZXJgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBhcnJheUJ1ZmZlciBUaGUgYXJyYXkgYnVmZmVyIHRvIGNsb25lLlxuICogQHJldHVybnMge0FycmF5QnVmZmVyfSBSZXR1cm5zIHRoZSBjbG9uZWQgYXJyYXkgYnVmZmVyLlxuICovXG5mdW5jdGlvbiBjbG9uZUFycmF5QnVmZmVyKGFycmF5QnVmZmVyKSB7XG4gIHZhciByZXN1bHQgPSBuZXcgYXJyYXlCdWZmZXIuY29uc3RydWN0b3IoYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCk7XG4gIG5ldyBVaW50OEFycmF5KHJlc3VsdCkuc2V0KG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyKSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBkYXRhVmlld2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhVmlldyBUaGUgZGF0YSB2aWV3IHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCBkYXRhIHZpZXcuXG4gKi9cbmZ1bmN0aW9uIGNsb25lRGF0YVZpZXcoZGF0YVZpZXcsIGlzRGVlcCkge1xuICB2YXIgYnVmZmVyID0gaXNEZWVwID8gY2xvbmVBcnJheUJ1ZmZlcihkYXRhVmlldy5idWZmZXIpIDogZGF0YVZpZXcuYnVmZmVyO1xuICByZXR1cm4gbmV3IGRhdGFWaWV3LmNvbnN0cnVjdG9yKGJ1ZmZlciwgZGF0YVZpZXcuYnl0ZU9mZnNldCwgZGF0YVZpZXcuYnl0ZUxlbmd0aCk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBtYXBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjbG9uZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNsb25lIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgbWFwLlxuICovXG5mdW5jdGlvbiBjbG9uZU1hcChtYXAsIGlzRGVlcCwgY2xvbmVGdW5jKSB7XG4gIHZhciBhcnJheSA9IGlzRGVlcCA/IGNsb25lRnVuYyhtYXBUb0FycmF5KG1hcCksIHRydWUpIDogbWFwVG9BcnJheShtYXApO1xuICByZXR1cm4gYXJyYXlSZWR1Y2UoYXJyYXksIGFkZE1hcEVudHJ5LCBuZXcgbWFwLmNvbnN0cnVjdG9yKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYHJlZ2V4cGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSByZWdleHAgVGhlIHJlZ2V4cCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCByZWdleHAuXG4gKi9cbmZ1bmN0aW9uIGNsb25lUmVnRXhwKHJlZ2V4cCkge1xuICB2YXIgcmVzdWx0ID0gbmV3IHJlZ2V4cC5jb25zdHJ1Y3RvcihyZWdleHAuc291cmNlLCByZUZsYWdzLmV4ZWMocmVnZXhwKSk7XG4gIHJlc3VsdC5sYXN0SW5kZXggPSByZWdleHAubGFzdEluZGV4O1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgc2V0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIGNsb25lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2xvbmVGdW5jIFRoZSBmdW5jdGlvbiB0byBjbG9uZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIHNldC5cbiAqL1xuZnVuY3Rpb24gY2xvbmVTZXQoc2V0LCBpc0RlZXAsIGNsb25lRnVuYykge1xuICB2YXIgYXJyYXkgPSBpc0RlZXAgPyBjbG9uZUZ1bmMoc2V0VG9BcnJheShzZXQpLCB0cnVlKSA6IHNldFRvQXJyYXkoc2V0KTtcbiAgcmV0dXJuIGFycmF5UmVkdWNlKGFycmF5LCBhZGRTZXRFbnRyeSwgbmV3IHNldC5jb25zdHJ1Y3Rvcik7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIHRoZSBgc3ltYm9sYCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzeW1ib2wgVGhlIHN5bWJvbCBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgc3ltYm9sIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gY2xvbmVTeW1ib2woc3ltYm9sKSB7XG4gIHJldHVybiBzeW1ib2xWYWx1ZU9mID8gT2JqZWN0KHN5bWJvbFZhbHVlT2YuY2FsbChzeW1ib2wpKSA6IHt9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgdHlwZWRBcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSB0eXBlZEFycmF5IFRoZSB0eXBlZCBhcnJheSB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgdHlwZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGNsb25lVHlwZWRBcnJheSh0eXBlZEFycmF5LCBpc0RlZXApIHtcbiAgdmFyIGJ1ZmZlciA9IGlzRGVlcCA/IGNsb25lQXJyYXlCdWZmZXIodHlwZWRBcnJheS5idWZmZXIpIDogdHlwZWRBcnJheS5idWZmZXI7XG4gIHJldHVybiBuZXcgdHlwZWRBcnJheS5jb25zdHJ1Y3RvcihidWZmZXIsIHR5cGVkQXJyYXkuYnl0ZU9mZnNldCwgdHlwZWRBcnJheS5sZW5ndGgpO1xufVxuXG4vKipcbiAqIENvcGllcyB0aGUgdmFsdWVzIG9mIGBzb3VyY2VgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IHNvdXJjZSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheT1bXV0gVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIHRvLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGNvcHlBcnJheShzb3VyY2UsIGFycmF5KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gc291cmNlLmxlbmd0aDtcblxuICBhcnJheSB8fCAoYXJyYXkgPSBBcnJheShsZW5ndGgpKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtpbmRleF0gPSBzb3VyY2VbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBDb3BpZXMgcHJvcGVydGllcyBvZiBgc291cmNlYCB0byBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IGlkZW50aWZpZXJzIHRvIGNvcHkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdD17fV0gVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgdG8uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb3BpZWQgdmFsdWVzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gY29weU9iamVjdChzb3VyY2UsIHByb3BzLCBvYmplY3QsIGN1c3RvbWl6ZXIpIHtcbiAgb2JqZWN0IHx8IChvYmplY3QgPSB7fSk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuXG4gICAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgICAgPyBjdXN0b21pemVyKG9iamVjdFtrZXldLCBzb3VyY2Vba2V5XSwga2V5LCBvYmplY3QsIHNvdXJjZSlcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgYXNzaWduVmFsdWUob2JqZWN0LCBrZXksIG5ld1ZhbHVlID09PSB1bmRlZmluZWQgPyBzb3VyY2Vba2V5XSA6IG5ld1ZhbHVlKTtcbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG4vKipcbiAqIENvcGllcyBvd24gc3ltYm9sIHByb3BlcnRpZXMgb2YgYHNvdXJjZWAgdG8gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCB0byBjb3B5IHN5bWJvbHMgZnJvbS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0PXt9XSBUaGUgb2JqZWN0IHRvIGNvcHkgc3ltYm9scyB0by5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGNvcHlTeW1ib2xzKHNvdXJjZSwgb2JqZWN0KSB7XG4gIHJldHVybiBjb3B5T2JqZWN0KHNvdXJjZSwgZ2V0U3ltYm9scyhzb3VyY2UpLCBvYmplY3QpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiBsaWtlIGBfLmFzc2lnbmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGFzc2lnbmVyIFRoZSBmdW5jdGlvbiB0byBhc3NpZ24gdmFsdWVzLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYXNzaWduZXIgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUFzc2lnbmVyKGFzc2lnbmVyKSB7XG4gIHJldHVybiBiYXNlUmVzdChmdW5jdGlvbihvYmplY3QsIHNvdXJjZXMpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gc291cmNlcy5sZW5ndGgsXG4gICAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPiAxID8gc291cmNlc1tsZW5ndGggLSAxXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgZ3VhcmQgPSBsZW5ndGggPiAyID8gc291cmNlc1syXSA6IHVuZGVmaW5lZDtcblxuICAgIGN1c3RvbWl6ZXIgPSAoYXNzaWduZXIubGVuZ3RoID4gMyAmJiB0eXBlb2YgY3VzdG9taXplciA9PSAnZnVuY3Rpb24nKVxuICAgICAgPyAobGVuZ3RoLS0sIGN1c3RvbWl6ZXIpXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChndWFyZCAmJiBpc0l0ZXJhdGVlQ2FsbChzb3VyY2VzWzBdLCBzb3VyY2VzWzFdLCBndWFyZCkpIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPCAzID8gdW5kZWZpbmVkIDogY3VzdG9taXplcjtcbiAgICAgIGxlbmd0aCA9IDE7XG4gICAgfVxuICAgIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIgc291cmNlID0gc291cmNlc1tpbmRleF07XG4gICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIGFzc2lnbmVyKG9iamVjdCwgc291cmNlLCBpbmRleCwgY3VzdG9taXplcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH0pO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2Ygb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIGdldEFsbEtleXMob2JqZWN0KSB7XG4gIHJldHVybiBiYXNlR2V0QWxsS2V5cyhvYmplY3QsIGtleXMsIGdldFN5bWJvbHMpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGRhdGEgZm9yIGBtYXBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSByZWZlcmVuY2Uga2V5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIG1hcCBkYXRhLlxuICovXG5mdW5jdGlvbiBnZXRNYXBEYXRhKG1hcCwga2V5KSB7XG4gIHZhciBkYXRhID0gbWFwLl9fZGF0YV9fO1xuICByZXR1cm4gaXNLZXlhYmxlKGtleSlcbiAgICA/IGRhdGFbdHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/ICdzdHJpbmcnIDogJ2hhc2gnXVxuICAgIDogZGF0YS5tYXA7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShvYmplY3QsIGtleSk7XG4gIHJldHVybiBiYXNlSXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgc3ltYm9sIHByb3BlcnRpZXMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2Ygc3ltYm9scy5cbiAqL1xudmFyIGdldFN5bWJvbHMgPSBuYXRpdmVHZXRTeW1ib2xzID8gb3ZlckFyZyhuYXRpdmVHZXRTeW1ib2xzLCBPYmplY3QpIDogc3R1YkFycmF5O1xuXG4vKipcbiAqIEdldHMgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG52YXIgZ2V0VGFnID0gYmFzZUdldFRhZztcblxuLy8gRmFsbGJhY2sgZm9yIGRhdGEgdmlld3MsIG1hcHMsIHNldHMsIGFuZCB3ZWFrIG1hcHMgaW4gSUUgMTEsXG4vLyBmb3IgZGF0YSB2aWV3cyBpbiBFZGdlIDwgMTQsIGFuZCBwcm9taXNlcyBpbiBOb2RlLmpzLlxuaWYgKChEYXRhVmlldyAmJiBnZXRUYWcobmV3IERhdGFWaWV3KG5ldyBBcnJheUJ1ZmZlcigxKSkpICE9IGRhdGFWaWV3VGFnKSB8fFxuICAgIChNYXAgJiYgZ2V0VGFnKG5ldyBNYXApICE9IG1hcFRhZykgfHxcbiAgICAoUHJvbWlzZSAmJiBnZXRUYWcoUHJvbWlzZS5yZXNvbHZlKCkpICE9IHByb21pc2VUYWcpIHx8XG4gICAgKFNldCAmJiBnZXRUYWcobmV3IFNldCkgIT0gc2V0VGFnKSB8fFxuICAgIChXZWFrTWFwICYmIGdldFRhZyhuZXcgV2Vha01hcCkgIT0gd2Vha01hcFRhZykpIHtcbiAgZ2V0VGFnID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgcmVzdWx0ID0gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSksXG4gICAgICAgIEN0b3IgPSByZXN1bHQgPT0gb2JqZWN0VGFnID8gdmFsdWUuY29uc3RydWN0b3IgOiB1bmRlZmluZWQsXG4gICAgICAgIGN0b3JTdHJpbmcgPSBDdG9yID8gdG9Tb3VyY2UoQ3RvcikgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoY3RvclN0cmluZykge1xuICAgICAgc3dpdGNoIChjdG9yU3RyaW5nKSB7XG4gICAgICAgIGNhc2UgZGF0YVZpZXdDdG9yU3RyaW5nOiByZXR1cm4gZGF0YVZpZXdUYWc7XG4gICAgICAgIGNhc2UgbWFwQ3RvclN0cmluZzogcmV0dXJuIG1hcFRhZztcbiAgICAgICAgY2FzZSBwcm9taXNlQ3RvclN0cmluZzogcmV0dXJuIHByb21pc2VUYWc7XG4gICAgICAgIGNhc2Ugc2V0Q3RvclN0cmluZzogcmV0dXJuIHNldFRhZztcbiAgICAgICAgY2FzZSB3ZWFrTWFwQ3RvclN0cmluZzogcmV0dXJuIHdlYWtNYXBUYWc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gYXJyYXkgY2xvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZUFycmF5KGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBhcnJheS5jb25zdHJ1Y3RvcihsZW5ndGgpO1xuXG4gIC8vIEFkZCBwcm9wZXJ0aWVzIGFzc2lnbmVkIGJ5IGBSZWdFeHAjZXhlY2AuXG4gIGlmIChsZW5ndGggJiYgdHlwZW9mIGFycmF5WzBdID09ICdzdHJpbmcnICYmIGhhc093blByb3BlcnR5LmNhbGwoYXJyYXksICdpbmRleCcpKSB7XG4gICAgcmVzdWx0LmluZGV4ID0gYXJyYXkuaW5kZXg7XG4gICAgcmVzdWx0LmlucHV0ID0gYXJyYXkuaW5wdXQ7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyBhbiBvYmplY3QgY2xvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGluaXRpYWxpemVkIGNsb25lLlxuICovXG5mdW5jdGlvbiBpbml0Q2xvbmVPYmplY3Qob2JqZWN0KSB7XG4gIHJldHVybiAodHlwZW9mIG9iamVjdC5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmICFpc1Byb3RvdHlwZShvYmplY3QpKVxuICAgID8gYmFzZUNyZWF0ZShnZXRQcm90b3R5cGUob2JqZWN0KSlcbiAgICA6IHt9O1xufVxuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIG9iamVjdCBjbG9uZSBiYXNlZCBvbiBpdHMgYHRvU3RyaW5nVGFnYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBvbmx5IHN1cHBvcnRzIGNsb25pbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICogYEJvb2xlYW5gLCBgRGF0ZWAsIGBFcnJvcmAsIGBOdW1iZXJgLCBgUmVnRXhwYCwgb3IgYFN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIGB0b1N0cmluZ1RhZ2Agb2YgdGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNsb25lRnVuYyBUaGUgZnVuY3Rpb24gdG8gY2xvbmUgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGluaXRpYWxpemVkIGNsb25lLlxuICovXG5mdW5jdGlvbiBpbml0Q2xvbmVCeVRhZyhvYmplY3QsIHRhZywgY2xvbmVGdW5jLCBpc0RlZXApIHtcbiAgdmFyIEN0b3IgPSBvYmplY3QuY29uc3RydWN0b3I7XG4gIHN3aXRjaCAodGFnKSB7XG4gICAgY2FzZSBhcnJheUJ1ZmZlclRhZzpcbiAgICAgIHJldHVybiBjbG9uZUFycmF5QnVmZmVyKG9iamVjdCk7XG5cbiAgICBjYXNlIGJvb2xUYWc6XG4gICAgY2FzZSBkYXRlVGFnOlxuICAgICAgcmV0dXJuIG5ldyBDdG9yKCtvYmplY3QpO1xuXG4gICAgY2FzZSBkYXRhVmlld1RhZzpcbiAgICAgIHJldHVybiBjbG9uZURhdGFWaWV3KG9iamVjdCwgaXNEZWVwKTtcblxuICAgIGNhc2UgZmxvYXQzMlRhZzogY2FzZSBmbG9hdDY0VGFnOlxuICAgIGNhc2UgaW50OFRhZzogY2FzZSBpbnQxNlRhZzogY2FzZSBpbnQzMlRhZzpcbiAgICBjYXNlIHVpbnQ4VGFnOiBjYXNlIHVpbnQ4Q2xhbXBlZFRhZzogY2FzZSB1aW50MTZUYWc6IGNhc2UgdWludDMyVGFnOlxuICAgICAgcmV0dXJuIGNsb25lVHlwZWRBcnJheShvYmplY3QsIGlzRGVlcCk7XG5cbiAgICBjYXNlIG1hcFRhZzpcbiAgICAgIHJldHVybiBjbG9uZU1hcChvYmplY3QsIGlzRGVlcCwgY2xvbmVGdW5jKTtcblxuICAgIGNhc2UgbnVtYmVyVGFnOlxuICAgIGNhc2Ugc3RyaW5nVGFnOlxuICAgICAgcmV0dXJuIG5ldyBDdG9yKG9iamVjdCk7XG5cbiAgICBjYXNlIHJlZ2V4cFRhZzpcbiAgICAgIHJldHVybiBjbG9uZVJlZ0V4cChvYmplY3QpO1xuXG4gICAgY2FzZSBzZXRUYWc6XG4gICAgICByZXR1cm4gY2xvbmVTZXQob2JqZWN0LCBpc0RlZXAsIGNsb25lRnVuYyk7XG5cbiAgICBjYXNlIHN5bWJvbFRhZzpcbiAgICAgIHJldHVybiBjbG9uZVN5bWJvbChvYmplY3QpO1xuICB9XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgJiZcbiAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIHZhbHVlIGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBpbmRleCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIGluZGV4IG9yIGtleSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gb2JqZWN0IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgb2JqZWN0IGFyZ3VtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSXRlcmF0ZWVDYWxsKHZhbHVlLCBpbmRleCwgb2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiBpbmRleDtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcidcbiAgICAgICAgPyAoaXNBcnJheUxpa2Uob2JqZWN0KSAmJiBpc0luZGV4KGluZGV4LCBvYmplY3QubGVuZ3RoKSlcbiAgICAgICAgOiAodHlwZSA9PSAnc3RyaW5nJyAmJiBpbmRleCBpbiBvYmplY3QpXG4gICAgICApIHtcbiAgICByZXR1cm4gZXEob2JqZWN0W2luZGV4XSwgdmFsdWUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3IgdXNlIGFzIHVuaXF1ZSBvYmplY3Qga2V5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5YWJsZSh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICh0eXBlID09ICdzdHJpbmcnIHx8IHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJylcbiAgICA/ICh2YWx1ZSAhPT0gJ19fcHJvdG9fXycpXG4gICAgOiAodmFsdWUgPT09IG51bGwpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgZnVuY2AgaGFzIGl0cyBzb3VyY2UgbWFza2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgZnVuY2AgaXMgbWFza2VkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTWFza2VkKGZ1bmMpIHtcbiAgcmV0dXJuICEhbWFza1NyY0tleSAmJiAobWFza1NyY0tleSBpbiBmdW5jKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbGlrZVxuICogW2BPYmplY3Qua2V5c2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZXhjZXB0IHRoYXQgaXQgaW5jbHVkZXMgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydGllcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gbmF0aXZlS2V5c0luKG9iamVjdCkge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGlmIChvYmplY3QgIT0gbnVsbCkge1xuICAgIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgZnVuY2AgdG8gaXRzIHNvdXJjZSBjb2RlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmZ1bmN0aW9uIHRvU291cmNlKGZ1bmMpIHtcbiAgaWYgKGZ1bmMgIT0gbnVsbCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnVuY1RvU3RyaW5nLmNhbGwoZnVuYyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChmdW5jICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIFBlcmZvcm1zIGFcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiAxIH07XG4gKlxuICogXy5lcShvYmplY3QsIG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcSgnYScsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcSgnYScsIE9iamVjdCgnYScpKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcShOYU4sIE5hTik7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGVxKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gdmFsdWUgPT09IG90aGVyIHx8ICh2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgLy8gU2FmYXJpIDguMSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgcmV0dXJuIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAoIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKSB8fCBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcmdzVGFnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uaXNBcnJheUxpa2VgIGV4Y2VwdCB0aGF0IGl0IGFsc28gY2hlY2tzIGlmIGB2YWx1ZWBcbiAqIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheS1saWtlIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBidWZmZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjMuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBidWZmZXIsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0J1ZmZlcihuZXcgQnVmZmVyKDIpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBVaW50OEFycmF5KDIpKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0J1ZmZlciA9IG5hdGl2ZUlzQnVmZmVyIHx8IHN0dWJGYWxzZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA4LTkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGF0IGlzLCBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGVcbiAqIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIG9uZSB3aXRoIGEgYFtbUHJvdG90eXBlXV1gIG9mIGBudWxsYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuOC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3RMaWtlKHZhbHVlKSB8fFxuICAgICAgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgIT0gb2JqZWN0VGFnIHx8IGlzSG9zdE9iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHByb3RvID0gZ2V0UHJvdG90eXBlKHZhbHVlKTtcbiAgaWYgKHByb3RvID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIEN0b3IgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCAnY29uc3RydWN0b3InKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmXG4gICAgQ3RvciBpbnN0YW5jZW9mIEN0b3IgJiYgZnVuY1RvU3RyaW5nLmNhbGwoQ3RvcikgPT0gb2JqZWN0Q3RvclN0cmluZyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIHR5cGVkIGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc1R5cGVkQXJyYXkgPSBub2RlSXNUeXBlZEFycmF5ID8gYmFzZVVuYXJ5KG5vZGVJc1R5cGVkQXJyYXkpIDogYmFzZUlzVHlwZWRBcnJheTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgcGxhaW4gb2JqZWN0IGZsYXR0ZW5pbmcgaW5oZXJpdGVkIGVudW1lcmFibGUgc3RyaW5nXG4gKiBrZXllZCBwcm9wZXJ0aWVzIG9mIGB2YWx1ZWAgdG8gb3duIHByb3BlcnRpZXMgb2YgdGhlIHBsYWluIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBwbGFpbiBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAxIH0sIG5ldyBGb28pO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiB9XG4gKlxuICogXy5hc3NpZ24oeyAnYSc6IDEgfSwgXy50b1BsYWluT2JqZWN0KG5ldyBGb28pKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIsICdjJzogMyB9XG4gKi9cbmZ1bmN0aW9uIHRvUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGNvcHlPYmplY3QodmFsdWUsIGtleXNJbih2YWx1ZSkpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbmZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QpIDogYmFzZUtleXMob2JqZWN0KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5c0luKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKi9cbmZ1bmN0aW9uIGtleXNJbihvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCwgdHJ1ZSkgOiBiYXNlS2V5c0luKG9iamVjdCk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5hc3NpZ25gIGV4Y2VwdCB0aGF0IGl0IHJlY3Vyc2l2ZWx5IG1lcmdlcyBvd24gYW5kXG4gKiBpbmhlcml0ZWQgZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydGllcyBvZiBzb3VyY2Ugb2JqZWN0cyBpbnRvIHRoZVxuICogZGVzdGluYXRpb24gb2JqZWN0LiBTb3VyY2UgcHJvcGVydGllcyB0aGF0IHJlc29sdmUgdG8gYHVuZGVmaW5lZGAgYXJlXG4gKiBza2lwcGVkIGlmIGEgZGVzdGluYXRpb24gdmFsdWUgZXhpc3RzLiBBcnJheSBhbmQgcGxhaW4gb2JqZWN0IHByb3BlcnRpZXNcbiAqIGFyZSBtZXJnZWQgcmVjdXJzaXZlbHkuIE90aGVyIG9iamVjdHMgYW5kIHZhbHVlIHR5cGVzIGFyZSBvdmVycmlkZGVuIGJ5XG4gKiBhc3NpZ25tZW50LiBTb3VyY2Ugb2JqZWN0cyBhcmUgYXBwbGllZCBmcm9tIGxlZnQgdG8gcmlnaHQuIFN1YnNlcXVlbnRcbiAqIHNvdXJjZXMgb3ZlcndyaXRlIHByb3BlcnR5IGFzc2lnbm1lbnRzIG9mIHByZXZpb3VzIHNvdXJjZXMuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIG11dGF0ZXMgYG9iamVjdGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjUuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHsuLi5PYmplY3R9IFtzb3VyY2VzXSBUaGUgc291cmNlIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0ge1xuICogICAnYSc6IFt7ICdiJzogMiB9LCB7ICdkJzogNCB9XVxuICogfTtcbiAqXG4gKiB2YXIgb3RoZXIgPSB7XG4gKiAgICdhJzogW3sgJ2MnOiAzIH0sIHsgJ2UnOiA1IH1dXG4gKiB9O1xuICpcbiAqIF8ubWVyZ2Uob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiB7ICdhJzogW3sgJ2InOiAyLCAnYyc6IDMgfSwgeyAnZCc6IDQsICdlJzogNSB9XSB9XG4gKi9cbnZhciBtZXJnZSA9IGNyZWF0ZUFzc2lnbmVyKGZ1bmN0aW9uKG9iamVjdCwgc291cmNlLCBzcmNJbmRleCkge1xuICBiYXNlTWVyZ2Uob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4KTtcbn0pO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgYSBuZXcgZW1wdHkgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEzLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBlbXB0eSBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIGFycmF5cyA9IF8udGltZXMoMiwgXy5zdHViQXJyYXkpO1xuICpcbiAqIGNvbnNvbGUubG9nKGFycmF5cyk7XG4gKiAvLyA9PiBbW10sIFtdXVxuICpcbiAqIGNvbnNvbGUubG9nKGFycmF5c1swXSA9PT0gYXJyYXlzWzFdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIHN0dWJBcnJheSgpIHtcbiAgcmV0dXJuIFtdO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgYGZhbHNlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udGltZXMoMiwgXy5zdHViRmFsc2UpO1xuICogLy8gPT4gW2ZhbHNlLCBmYWxzZV1cbiAqL1xuZnVuY3Rpb24gc3R1YkZhbHNlKCkge1xuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWVyZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoLm1lcmdlL2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcclxuXHRpZighbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xyXG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XHJcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcclxuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxyXG5cdFx0aWYoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcclxuXHR9XHJcblx0cmV0dXJuIG1vZHVsZTtcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vICh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dGhyb3cgbmV3IEVycm9yKFwiZGVmaW5lIGNhbm5vdCBiZSB1c2VkIGluZGlyZWN0XCIpO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9hbWQtZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIG5vcm1hbGl6ZUFyZ3VtZW50cyggLi4uYXJncyApIHtcbiAgICBsZXQgb3B0aW9ucyA9IHt9O1xuICAgIGlmICggdHlwZW9mIGFyZ3NbMF0gPT09ICdvYmplY3QnICkge1xuICAgICAgICBvcHRpb25zID0gYXJnc1swXTtcbiAgICB9XG4gICAgZWxzZSBpZiAoIHR5cGVvZiBhcmdzWzFdID09PSAnb2JqZWN0JyApIHtcbiAgICAgICAgb3B0aW9ucyA9IGFyZ3NbMV07XG4gICAgfVxuICAgIGVsc2UgaWYgKCB0eXBlb2YgYXJnc1sxXSA9PT0gJ3N0cmluZycgKSB7XG4gICAgICAgIG9wdGlvbnMudG9rZW4gPSBhcmdzWzFdO1xuICAgIH1cbiAgICBpZiAoIHR5cGVvZiBhcmdzWzBdID09PSAnc3RyaW5nJyApIHtcbiAgICAgICAgb3B0aW9ucy51cmkgPSBhcmdzWzBdO1xuICAgIH1cbiAgICBpZiAoIGFyZ3MubGVuZ3RoID4gMCAmJiB0eXBlb2YgYXJnc1thcmdzLmxlbmd0aCAtIDFdID09PSAnZnVuY3Rpb24nICkge1xuICAgICAgICBvcHRpb25zLmNhbGxiYWNrID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBub3JtYWxpemVBcmd1bWVudHM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdmFsaWRhdGUvbm9ybWFsaXplQXJndW1lbnRzLmpzIiwiY29uc3QgUGx1Z2luID0gcmVxdWlyZSggJy4vcGx1Z2luJyApO1xuY29uc3QgZGVmYXVsdFBsdWdpbnMgPSByZXF1aXJlKCAnLi9kZWZhdWx0cycgKTtcblxuUGx1Z2luLmRlZmF1bHRzID0gZGVmYXVsdFBsdWdpbnM7XG5cbm1vZHVsZS5leHBvcnRzID0gUGx1Z2luO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDAsXG4gICAgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKipcbiAqIEEgZmFzdGVyIGFsdGVybmF0aXZlIHRvIGBGdW5jdGlvbiNhcHBseWAsIHRoaXMgZnVuY3Rpb24gaW52b2tlcyBgZnVuY2BcbiAqIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIGB0aGlzQXJnYCBhbmQgdGhlIGFyZ3VtZW50cyBvZiBgYXJnc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGludm9rZS5cbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtBcnJheX0gYXJncyBUaGUgYXJndW1lbnRzIHRvIGludm9rZSBgZnVuY2Agd2l0aC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXN1bHQgb2YgYGZ1bmNgLlxuICovXG5mdW5jdGlvbiBhcHBseShmdW5jLCB0aGlzQXJnLCBhcmdzKSB7XG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZyk7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLm1hcGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gKiBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgbWFwcGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheU1hcChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDAsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEFwcGVuZHMgdGhlIGVsZW1lbnRzIG9mIGB2YWx1ZXNgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVGhlIHZhbHVlcyB0byBhcHBlbmQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlQdXNoKGFycmF5LCB2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMubGVuZ3RoLFxuICAgICAgb2Zmc2V0ID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbb2Zmc2V0ICsgaW5kZXhdID0gdmFsdWVzW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbCxcbiAgICBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlLFxuICAgIHNwcmVhZGFibGVTeW1ib2wgPSBTeW1ib2wgPyBTeW1ib2wuaXNDb25jYXRTcHJlYWRhYmxlIDogdW5kZWZpbmVkO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXg7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZmxhdHRlbmAgd2l0aCBzdXBwb3J0IGZvciByZXN0cmljdGluZyBmbGF0dGVuaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gZmxhdHRlbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBkZXB0aCBUaGUgbWF4aW11bSByZWN1cnNpb24gZGVwdGguXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtwcmVkaWNhdGU9aXNGbGF0dGVuYWJsZV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzU3RyaWN0XSBSZXN0cmljdCB0byB2YWx1ZXMgdGhhdCBwYXNzIGBwcmVkaWNhdGVgIGNoZWNrcy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtyZXN1bHQ9W11dIFRoZSBpbml0aWFsIHJlc3VsdCB2YWx1ZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZsYXR0ZW5lZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYmFzZUZsYXR0ZW4oYXJyYXksIGRlcHRoLCBwcmVkaWNhdGUsIGlzU3RyaWN0LCByZXN1bHQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgcHJlZGljYXRlIHx8IChwcmVkaWNhdGUgPSBpc0ZsYXR0ZW5hYmxlKTtcbiAgcmVzdWx0IHx8IChyZXN1bHQgPSBbXSk7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF07XG4gICAgaWYgKGRlcHRoID4gMCAmJiBwcmVkaWNhdGUodmFsdWUpKSB7XG4gICAgICBpZiAoZGVwdGggPiAxKSB7XG4gICAgICAgIC8vIFJlY3Vyc2l2ZWx5IGZsYXR0ZW4gYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICAgIGJhc2VGbGF0dGVuKHZhbHVlLCBkZXB0aCAtIDEsIHByZWRpY2F0ZSwgaXNTdHJpY3QsIHJlc3VsdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnJheVB1c2gocmVzdWx0LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghaXNTdHJpY3QpIHtcbiAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnBpY2tgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaW5kaXZpZHVhbFxuICogcHJvcGVydHkgaWRlbnRpZmllcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBwcm9wcyBUaGUgcHJvcGVydHkgaWRlbnRpZmllcnMgdG8gcGljay5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGJhc2VQaWNrKG9iamVjdCwgcHJvcHMpIHtcbiAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gIHJldHVybiBiYXNlUGlja0J5KG9iamVjdCwgcHJvcHMsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICByZXR1cm4ga2V5IGluIG9iamVjdDtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgIGBfLnBpY2tCeWAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmdbXX0gcHJvcHMgVGhlIHByb3BlcnR5IGlkZW50aWZpZXJzIHRvIHBpY2sgZnJvbS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgcHJvcGVydHkuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBiYXNlUGlja0J5KG9iamVjdCwgcHJvcHMsIHByZWRpY2F0ZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IHt9O1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XSxcbiAgICAgICAgdmFsdWUgPSBvYmplY3Rba2V5XTtcblxuICAgIGlmIChwcmVkaWNhdGUodmFsdWUsIGtleSkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucmVzdGAgd2hpY2ggZG9lc24ndCB2YWxpZGF0ZSBvciBjb2VyY2UgYXJndW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VSZXN0KGZ1bmMsIHN0YXJ0KSB7XG4gIHN0YXJ0ID0gbmF0aXZlTWF4KHN0YXJ0ID09PSB1bmRlZmluZWQgPyAoZnVuYy5sZW5ndGggLSAxKSA6IHN0YXJ0LCAwKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBuYXRpdmVNYXgoYXJncy5sZW5ndGggLSBzdGFydCwgMCksXG4gICAgICAgIGFycmF5ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICBhcnJheVtpbmRleF0gPSBhcmdzW3N0YXJ0ICsgaW5kZXhdO1xuICAgIH1cbiAgICBpbmRleCA9IC0xO1xuICAgIHZhciBvdGhlckFyZ3MgPSBBcnJheShzdGFydCArIDEpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgc3RhcnQpIHtcbiAgICAgIG90aGVyQXJnc1tpbmRleF0gPSBhcmdzW2luZGV4XTtcbiAgICB9XG4gICAgb3RoZXJBcmdzW3N0YXJ0XSA9IGFycmF5O1xuICAgIHJldHVybiBhcHBseShmdW5jLCB0aGlzLCBvdGhlckFyZ3MpO1xuICB9O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgZmxhdHRlbmFibGUgYGFyZ3VtZW50c2Agb2JqZWN0IG9yIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGZsYXR0ZW5hYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzRmxhdHRlbmFibGUodmFsdWUpIHtcbiAgcmV0dXJuIGlzQXJyYXkodmFsdWUpIHx8IGlzQXJndW1lbnRzKHZhbHVlKSB8fFxuICAgICEhKHNwcmVhZGFibGVTeW1ib2wgJiYgdmFsdWUgJiYgdmFsdWVbc3ByZWFkYWJsZVN5bWJvbF0pO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcga2V5IGlmIGl0J3Mgbm90IGEgc3RyaW5nIG9yIHN5bWJvbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtzdHJpbmd8c3ltYm9sfSBSZXR1cm5zIHRoZSBrZXkuXG4gKi9cbmZ1bmN0aW9uIHRvS2V5KHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHwgaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgLy8gU2FmYXJpIDguMSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgcmV0dXJuIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAoIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKSB8fCBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcmdzVGFnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uaXNBcnJheUxpa2VgIGV4Y2VwdCB0aGF0IGl0IGFsc28gY2hlY2tzIGlmIGB2YWx1ZWBcbiAqIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheS1saWtlIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOC05IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBpc09iamVjdCh2YWx1ZSkgPyBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIG9iamVjdCBjb21wb3NlZCBvZiB0aGUgcGlja2VkIGBvYmplY3RgIHByb3BlcnRpZXMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uKHN0cmluZ3xzdHJpbmdbXSl9IFtwcm9wc10gVGhlIHByb3BlcnR5IGlkZW50aWZpZXJzIHRvIHBpY2suXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogJzInLCAnYyc6IDMgfTtcbiAqXG4gKiBfLnBpY2sob2JqZWN0LCBbJ2EnLCAnYyddKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYyc6IDMgfVxuICovXG52YXIgcGljayA9IGJhc2VSZXN0KGZ1bmN0aW9uKG9iamVjdCwgcHJvcHMpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8ge30gOiBiYXNlUGljayhvYmplY3QsIGFycmF5TWFwKGJhc2VGbGF0dGVuKHByb3BzLCAxKSwgdG9LZXkpKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBpY2s7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoLnBpY2svaW5kZXguanMiLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXScsXG4gICAgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIHByb3BlcnR5IG5hbWVzIHdpdGhpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciByZUlzRGVlcFByb3AgPSAvXFwufFxcWyg/OlteW1xcXV0qfChbXCInXSkoPzooPyFcXDEpW15cXFxcXXxcXFxcLikqP1xcMSlcXF0vLFxuICAgIHJlSXNQbGFpblByb3AgPSAvXlxcdyokLyxcbiAgICByZUxlYWRpbmdEb3QgPSAvXlxcLi8sXG4gICAgcmVQcm9wTmFtZSA9IC9bXi5bXFxdXSt8XFxbKD86KC0/XFxkKyg/OlxcLlxcZCspPyl8KFtcIiddKSgoPzooPyFcXDIpW15cXFxcXXxcXFxcLikqPylcXDIpXFxdfCg/PSg/OlxcLnxcXFtcXF0pKD86XFwufFxcW1xcXXwkKSkvZztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggYmFja3NsYXNoZXMgaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVFc2NhcGVDaGFyID0gL1xcXFwoXFxcXCk/L2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpKS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGdldFZhbHVlKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QgaW4gSUUgPCA5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNIb3N0T2JqZWN0KHZhbHVlKSB7XG4gIC8vIE1hbnkgaG9zdCBvYmplY3RzIGFyZSBgT2JqZWN0YCBvYmplY3RzIHRoYXQgY2FuIGNvZXJjZSB0byBzdHJpbmdzXG4gIC8vIGRlc3BpdGUgaGF2aW5nIGltcHJvcGVybHkgZGVmaW5lZCBgdG9TdHJpbmdgIG1ldGhvZHMuXG4gIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgaWYgKHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlLnRvU3RyaW5nICE9ICdmdW5jdGlvbicpIHtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gISEodmFsdWUgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZSxcbiAgICBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xudmFyIG1hc2tTcmNLZXkgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1aWQgPSAvW14uXSskLy5leGVjKGNvcmVKc0RhdGEgJiYgY29yZUpzRGF0YS5rZXlzICYmIGNvcmVKc0RhdGEua2V5cy5JRV9QUk9UTyB8fCAnJyk7XG4gIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbn0oKSk7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbCxcbiAgICBzcGxpY2UgPSBhcnJheVByb3RvLnNwbGljZTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyksXG4gICAgbmF0aXZlQ3JlYXRlID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2NyZWF0ZScpO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVG9TdHJpbmcgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnRvU3RyaW5nIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBoYXNoIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gSGFzaChlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgSGFzaFxuICovXG5mdW5jdGlvbiBoYXNoQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuYXRpdmVDcmVhdGUgPyBuYXRpdmVDcmVhdGUobnVsbCkgOiB7fTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtPYmplY3R9IGhhc2ggVGhlIGhhc2ggdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hEZWxldGUoa2V5KSB7XG4gIHJldHVybiB0aGlzLmhhcyhrZXkpICYmIGRlbGV0ZSB0aGlzLl9fZGF0YV9fW2tleV07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgaGFzaCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBoYXNoR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChuYXRpdmVDcmVhdGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gZGF0YVtrZXldO1xuICAgIHJldHVybiByZXN1bHQgPT09IEhBU0hfVU5ERUZJTkVEID8gdW5kZWZpbmVkIDogcmVzdWx0O1xuICB9XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkgPyBkYXRhW2tleV0gOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgaGFzaCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaEhhcyhrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICByZXR1cm4gbmF0aXZlQ3JlYXRlID8gZGF0YVtrZXldICE9PSB1bmRlZmluZWQgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgaGFzaCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGhhc2ggaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGhhc2hTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGRhdGFba2V5XSA9IChuYXRpdmVDcmVhdGUgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkgPyBIQVNIX1VOREVGSU5FRCA6IHZhbHVlO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYEhhc2hgLlxuSGFzaC5wcm90b3R5cGUuY2xlYXIgPSBoYXNoQ2xlYXI7XG5IYXNoLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBoYXNoRGVsZXRlO1xuSGFzaC5wcm90b3R5cGUuZ2V0ID0gaGFzaEdldDtcbkhhc2gucHJvdG90eXBlLmhhcyA9IGhhc2hIYXM7XG5IYXNoLnByb3RvdHlwZS5zZXQgPSBoYXNoU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gbGlzdCBjYWNoZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIExpc3RDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gW107XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZURlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBsYXN0SW5kZXggPSBkYXRhLmxlbmd0aCAtIDE7XG4gIGlmIChpbmRleCA9PSBsYXN0SW5kZXgpIHtcbiAgICBkYXRhLnBvcCgpO1xuICB9IGVsc2Uge1xuICAgIHNwbGljZS5jYWxsKGRhdGEsIGluZGV4LCAxKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIHJldHVybiBpbmRleCA8IDAgPyB1bmRlZmluZWQgOiBkYXRhW2luZGV4XVsxXTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGFzc29jSW5kZXhPZih0aGlzLl9fZGF0YV9fLCBrZXkpID4gLTE7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbGlzdCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgZGF0YS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYExpc3RDYWNoZWAuXG5MaXN0Q2FjaGUucHJvdG90eXBlLmNsZWFyID0gbGlzdENhY2hlQ2xlYXI7XG5MaXN0Q2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IGxpc3RDYWNoZURlbGV0ZTtcbkxpc3RDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbGlzdENhY2hlR2V0O1xuTGlzdENhY2hlLnByb3RvdHlwZS5oYXMgPSBsaXN0Q2FjaGVIYXM7XG5MaXN0Q2FjaGUucHJvdG90eXBlLnNldCA9IGxpc3RDYWNoZVNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWFwIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIE1hcENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSB7XG4gICAgJ2hhc2gnOiBuZXcgSGFzaCxcbiAgICAnbWFwJzogbmV3IChNYXAgfHwgTGlzdENhY2hlKSxcbiAgICAnc3RyaW5nJzogbmV3IEhhc2hcbiAgfTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlRGVsZXRlKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpWydkZWxldGUnXShrZXkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG1hcCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVHZXQoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuZ2V0KGtleSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbWFwIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuaGFzKGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbWFwIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG1hcCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICBnZXRNYXBEYXRhKHRoaXMsIGtleSkuc2V0KGtleSwgdmFsdWUpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYE1hcENhY2hlYC5cbk1hcENhY2hlLnByb3RvdHlwZS5jbGVhciA9IG1hcENhY2hlQ2xlYXI7XG5NYXBDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbWFwQ2FjaGVEZWxldGU7XG5NYXBDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbWFwQ2FjaGVHZXQ7XG5NYXBDYWNoZS5wcm90b3R5cGUuaGFzID0gbWFwQ2FjaGVIYXM7XG5NYXBDYWNoZS5wcm90b3R5cGUuc2V0ID0gbWFwQ2FjaGVTZXQ7XG5cbi8qKlxuICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGBrZXlgIGlzIGZvdW5kIGluIGBhcnJheWAgb2Yga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0ga2V5IFRoZSBrZXkgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGFzc29jSW5kZXhPZihhcnJheSwga2V5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChlcShhcnJheVtsZW5ndGhdWzBdLCBrZXkpKSB7XG4gICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZ2V0YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZmF1bHQgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc29sdmVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0KG9iamVjdCwgcGF0aCkge1xuICBwYXRoID0gaXNLZXkocGF0aCwgb2JqZWN0KSA/IFtwYXRoXSA6IGNhc3RQYXRoKHBhdGgpO1xuXG4gIHZhciBpbmRleCA9IDAsXG4gICAgICBsZW5ndGggPSBwYXRoLmxlbmd0aDtcblxuICB3aGlsZSAob2JqZWN0ICE9IG51bGwgJiYgaW5kZXggPCBsZW5ndGgpIHtcbiAgICBvYmplY3QgPSBvYmplY3RbdG9LZXkocGF0aFtpbmRleCsrXSldO1xuICB9XG4gIHJldHVybiAoaW5kZXggJiYgaW5kZXggPT0gbGVuZ3RoKSA/IG9iamVjdCA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hdGl2ZWAgd2l0aG91dCBiYWQgc2hpbSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkgfHwgaXNNYXNrZWQodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwYXR0ZXJuID0gKGlzRnVuY3Rpb24odmFsdWUpIHx8IGlzSG9zdE9iamVjdCh2YWx1ZSkpID8gcmVJc05hdGl2ZSA6IHJlSXNIb3N0Q3RvcjtcbiAgcmV0dXJuIHBhdHRlcm4udGVzdCh0b1NvdXJjZSh2YWx1ZSkpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRvU3RyaW5nYCB3aGljaCBkb2Vzbid0IGNvbnZlcnQgbnVsbGlzaFxuICogdmFsdWVzIHRvIGVtcHR5IHN0cmluZ3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICAvLyBFeGl0IGVhcmx5IGZvciBzdHJpbmdzIHRvIGF2b2lkIGEgcGVyZm9ybWFuY2UgaGl0IGluIHNvbWUgZW52aXJvbm1lbnRzLlxuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gc3ltYm9sVG9TdHJpbmcgPyBzeW1ib2xUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDYXN0cyBgdmFsdWVgIHRvIGEgcGF0aCBhcnJheSBpZiBpdCdzIG5vdCBvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNhc3QgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gY2FzdFBhdGgodmFsdWUpIHtcbiAgcmV0dXJuIGlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBzdHJpbmdUb1BhdGgodmFsdWUpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGRhdGEgZm9yIGBtYXBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSByZWZlcmVuY2Uga2V5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIG1hcCBkYXRhLlxuICovXG5mdW5jdGlvbiBnZXRNYXBEYXRhKG1hcCwga2V5KSB7XG4gIHZhciBkYXRhID0gbWFwLl9fZGF0YV9fO1xuICByZXR1cm4gaXNLZXlhYmxlKGtleSlcbiAgICA/IGRhdGFbdHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/ICdzdHJpbmcnIDogJ2hhc2gnXVxuICAgIDogZGF0YS5tYXA7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShvYmplY3QsIGtleSk7XG4gIHJldHVybiBiYXNlSXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwcm9wZXJ0eSBuYW1lIGFuZCBub3QgYSBwcm9wZXJ0eSBwYXRoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5IGtleXMgb24uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3BlcnR5IG5hbWUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXkodmFsdWUsIG9iamVjdCkge1xuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIGlmICh0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcgfHwgdHlwZSA9PSAnYm9vbGVhbicgfHxcbiAgICAgIHZhbHVlID09IG51bGwgfHwgaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIHJlSXNQbGFpblByb3AudGVzdCh2YWx1ZSkgfHwgIXJlSXNEZWVwUHJvcC50ZXN0KHZhbHVlKSB8fFxuICAgIChvYmplY3QgIT0gbnVsbCAmJiB2YWx1ZSBpbiBPYmplY3Qob2JqZWN0KSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHVzZSBhcyB1bmlxdWUgb2JqZWN0IGtleS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleWFibGUodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAodHlwZSA9PSAnc3RyaW5nJyB8fCB0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcgfHwgdHlwZSA9PSAnYm9vbGVhbicpXG4gICAgPyAodmFsdWUgIT09ICdfX3Byb3RvX18nKVxuICAgIDogKHZhbHVlID09PSBudWxsKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYGZ1bmNgIGhhcyBpdHMgc291cmNlIG1hc2tlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGZ1bmNgIGlzIG1hc2tlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc01hc2tlZChmdW5jKSB7XG4gIHJldHVybiAhIW1hc2tTcmNLZXkgJiYgKG1hc2tTcmNLZXkgaW4gZnVuYyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHN0cmluZ2AgdG8gYSBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqL1xudmFyIHN0cmluZ1RvUGF0aCA9IG1lbW9pemUoZnVuY3Rpb24oc3RyaW5nKSB7XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG5cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBpZiAocmVMZWFkaW5nRG90LnRlc3Qoc3RyaW5nKSkge1xuICAgIHJlc3VsdC5wdXNoKCcnKTtcbiAgfVxuICBzdHJpbmcucmVwbGFjZShyZVByb3BOYW1lLCBmdW5jdGlvbihtYXRjaCwgbnVtYmVyLCBxdW90ZSwgc3RyaW5nKSB7XG4gICAgcmVzdWx0LnB1c2gocXVvdGUgPyBzdHJpbmcucmVwbGFjZShyZUVzY2FwZUNoYXIsICckMScpIDogKG51bWJlciB8fCBtYXRjaCkpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcga2V5IGlmIGl0J3Mgbm90IGEgc3RyaW5nIG9yIHN5bWJvbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtzdHJpbmd8c3ltYm9sfSBSZXR1cm5zIHRoZSBrZXkuXG4gKi9cbmZ1bmN0aW9uIHRvS2V5KHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHwgaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgZnVuY2AgdG8gaXRzIHNvdXJjZSBjb2RlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmZ1bmN0aW9uIHRvU291cmNlKGZ1bmMpIHtcbiAgaWYgKGZ1bmMgIT0gbnVsbCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnVuY1RvU3RyaW5nLmNhbGwoZnVuYyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChmdW5jICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IG1lbW9pemVzIHRoZSByZXN1bHQgb2YgYGZ1bmNgLiBJZiBgcmVzb2x2ZXJgIGlzXG4gKiBwcm92aWRlZCwgaXQgZGV0ZXJtaW5lcyB0aGUgY2FjaGUga2V5IGZvciBzdG9yaW5nIHRoZSByZXN1bHQgYmFzZWQgb24gdGhlXG4gKiBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIG1lbW9pemVkIGZ1bmN0aW9uLiBCeSBkZWZhdWx0LCB0aGUgZmlyc3QgYXJndW1lbnRcbiAqIHByb3ZpZGVkIHRvIHRoZSBtZW1vaXplZCBmdW5jdGlvbiBpcyB1c2VkIGFzIHRoZSBtYXAgY2FjaGUga2V5LiBUaGUgYGZ1bmNgXG4gKiBpcyBpbnZva2VkIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZSBtZW1vaXplZCBmdW5jdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogVGhlIGNhY2hlIGlzIGV4cG9zZWQgYXMgdGhlIGBjYWNoZWAgcHJvcGVydHkgb24gdGhlIG1lbW9pemVkXG4gKiBmdW5jdGlvbi4gSXRzIGNyZWF0aW9uIG1heSBiZSBjdXN0b21pemVkIGJ5IHJlcGxhY2luZyB0aGUgYF8ubWVtb2l6ZS5DYWNoZWBcbiAqIGNvbnN0cnVjdG9yIHdpdGggb25lIHdob3NlIGluc3RhbmNlcyBpbXBsZW1lbnQgdGhlXG4gKiBbYE1hcGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXByb3BlcnRpZXMtb2YtdGhlLW1hcC1wcm90b3R5cGUtb2JqZWN0KVxuICogbWV0aG9kIGludGVyZmFjZSBvZiBgZGVsZXRlYCwgYGdldGAsIGBoYXNgLCBhbmQgYHNldGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBoYXZlIGl0cyBvdXRwdXQgbWVtb2l6ZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcmVzb2x2ZXJdIFRoZSBmdW5jdGlvbiB0byByZXNvbHZlIHRoZSBjYWNoZSBrZXkuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBtZW1vaXplZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxLCAnYic6IDIgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2MnOiAzLCAnZCc6IDQgfTtcbiAqXG4gKiB2YXIgdmFsdWVzID0gXy5tZW1vaXplKF8udmFsdWVzKTtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWzEsIDJdXG4gKlxuICogdmFsdWVzKG90aGVyKTtcbiAqIC8vID0+IFszLCA0XVxuICpcbiAqIG9iamVjdC5hID0gMjtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWzEsIDJdXG4gKlxuICogLy8gTW9kaWZ5IHRoZSByZXN1bHQgY2FjaGUuXG4gKiB2YWx1ZXMuY2FjaGUuc2V0KG9iamVjdCwgWydhJywgJ2InXSk7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsnYScsICdiJ11cbiAqXG4gKiAvLyBSZXBsYWNlIGBfLm1lbW9pemUuQ2FjaGVgLlxuICogXy5tZW1vaXplLkNhY2hlID0gV2Vha01hcDtcbiAqL1xuZnVuY3Rpb24gbWVtb2l6ZShmdW5jLCByZXNvbHZlcikge1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJyB8fCAocmVzb2x2ZXIgJiYgdHlwZW9mIHJlc29sdmVyICE9ICdmdW5jdGlvbicpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIHZhciBtZW1vaXplZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBrZXkgPSByZXNvbHZlciA/IHJlc29sdmVyLmFwcGx5KHRoaXMsIGFyZ3MpIDogYXJnc1swXSxcbiAgICAgICAgY2FjaGUgPSBtZW1vaXplZC5jYWNoZTtcblxuICAgIGlmIChjYWNoZS5oYXMoa2V5KSkge1xuICAgICAgcmV0dXJuIGNhY2hlLmdldChrZXkpO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICBtZW1vaXplZC5jYWNoZSA9IGNhY2hlLnNldChrZXksIHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgbWVtb2l6ZWQuY2FjaGUgPSBuZXcgKG1lbW9pemUuQ2FjaGUgfHwgTWFwQ2FjaGUpO1xuICByZXR1cm4gbWVtb2l6ZWQ7XG59XG5cbi8vIEFzc2lnbiBjYWNoZSB0byBgXy5tZW1vaXplYC5cbm1lbW9pemUuQ2FjaGUgPSBNYXBDYWNoZTtcblxuLyoqXG4gKiBQZXJmb3JtcyBhXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uZXEob2JqZWN0LCBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoJ2EnLCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEoJ2EnLCBPYmplY3QoJ2EnKSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoTmFOLCBOYU4pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBlcSh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBvdGhlciB8fCAodmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcik7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDgtOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWQgZm9yIGBudWxsYFxuICogYW5kIGB1bmRlZmluZWRgIHZhbHVlcy4gVGhlIHNpZ24gb2YgYC0wYCBpcyBwcmVzZXJ2ZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9TdHJpbmcobnVsbCk7XG4gKiAvLyA9PiAnJ1xuICpcbiAqIF8udG9TdHJpbmcoLTApO1xuICogLy8gPT4gJy0wJ1xuICpcbiAqIF8udG9TdHJpbmcoWzEsIDIsIDNdKTtcbiAqIC8vID0+ICcxLDIsMydcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IGJhc2VUb1N0cmluZyh2YWx1ZSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYHBhdGhgIG9mIGBvYmplY3RgLiBJZiB0aGUgcmVzb2x2ZWQgdmFsdWUgaXNcbiAqIGB1bmRlZmluZWRgLCB0aGUgYGRlZmF1bHRWYWx1ZWAgaXMgcmV0dXJuZWQgaW4gaXRzIHBsYWNlLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy43LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcGFyYW0geyp9IFtkZWZhdWx0VmFsdWVdIFRoZSB2YWx1ZSByZXR1cm5lZCBmb3IgYHVuZGVmaW5lZGAgcmVzb2x2ZWQgdmFsdWVzLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc29sdmVkIHZhbHVlLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IFt7ICdiJzogeyAnYyc6IDMgfSB9XSB9O1xuICpcbiAqIF8uZ2V0KG9iamVjdCwgJ2FbMF0uYi5jJyk7XG4gKiAvLyA9PiAzXG4gKlxuICogXy5nZXQob2JqZWN0LCBbJ2EnLCAnMCcsICdiJywgJ2MnXSk7XG4gKiAvLyA9PiAzXG4gKlxuICogXy5nZXQob2JqZWN0LCAnYS5iLmMnLCAnZGVmYXVsdCcpO1xuICogLy8gPT4gJ2RlZmF1bHQnXG4gKi9cbmZ1bmN0aW9uIGdldChvYmplY3QsIHBhdGgsIGRlZmF1bHRWYWx1ZSkge1xuICB2YXIgcmVzdWx0ID0gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBiYXNlR2V0KG9iamVjdCwgcGF0aCk7XG4gIHJldHVybiByZXN1bHQgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRWYWx1ZSA6IHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoLmdldC9pbmRleC5qcyIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyB0aGUgYFR5cGVFcnJvcmAgbWVzc2FnZSBmb3IgXCJGdW5jdGlvbnNcIiBtZXRob2RzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwLFxuICAgIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggcHJvcGVydHkgbmFtZXMgd2l0aGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlSXNEZWVwUHJvcCA9IC9cXC58XFxbKD86W15bXFxdXSp8KFtcIiddKSg/Oig/IVxcMSlbXlxcXFxdfFxcXFwuKSo/XFwxKVxcXS8sXG4gICAgcmVJc1BsYWluUHJvcCA9IC9eXFx3KiQvLFxuICAgIHJlTGVhZGluZ0RvdCA9IC9eXFwuLyxcbiAgICByZVByb3BOYW1lID0gL1teLltcXF1dK3xcXFsoPzooLT9cXGQrKD86XFwuXFxkKyk/KXwoW1wiJ10pKCg/Oig/IVxcMilbXlxcXFxdfFxcXFwuKSo/KVxcMilcXF18KD89KD86XFwufFxcW1xcXSkoPzpcXC58XFxbXFxdfCQpKS9nO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBiYWNrc2xhc2hlcyBpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciByZUVzY2FwZUNoYXIgPSAvXFxcXChcXFxcKT8vZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCBpbiBJRSA8IDkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0hvc3RPYmplY3QodmFsdWUpIHtcbiAgLy8gTWFueSBob3N0IG9iamVjdHMgYXJlIGBPYmplY3RgIG9iamVjdHMgdGhhdCBjYW4gY29lcmNlIHRvIHN0cmluZ3NcbiAgLy8gZGVzcGl0ZSBoYXZpbmcgaW1wcm9wZXJseSBkZWZpbmVkIGB0b1N0cmluZ2AgbWV0aG9kcy5cbiAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICBpZiAodmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUudG9TdHJpbmcgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSAhISh2YWx1ZSArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlLFxuICAgIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvdmVycmVhY2hpbmcgY29yZS1qcyBzaGltcy4gKi9cbnZhciBjb3JlSnNEYXRhID0gcm9vdFsnX19jb3JlLWpzX3NoYXJlZF9fJ107XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtZXRob2RzIG1hc3F1ZXJhZGluZyBhcyBuYXRpdmUuICovXG52YXIgbWFza1NyY0tleSA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHVpZCA9IC9bXi5dKyQvLmV4ZWMoY29yZUpzRGF0YSAmJiBjb3JlSnNEYXRhLmtleXMgJiYgY29yZUpzRGF0YS5rZXlzLklFX1BST1RPIHx8ICcnKTtcbiAgcmV0dXJuIHVpZCA/ICgnU3ltYm9sKHNyYylfMS4nICsgdWlkKSA6ICcnO1xufSgpKTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBmdW5jVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sLFxuICAgIHNwbGljZSA9IGFycmF5UHJvdG8uc3BsaWNlO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdNYXAnKSxcbiAgICBuYXRpdmVDcmVhdGUgPSBnZXROYXRpdmUoT2JqZWN0LCAnY3JlYXRlJyk7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xUb1N0cmluZyA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udG9TdHJpbmcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGhhc2ggb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBIYXNoKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKi9cbmZ1bmN0aW9uIGhhc2hDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5hdGl2ZUNyZWF0ZSA/IG5hdGl2ZUNyZWF0ZShudWxsKSA6IHt9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge09iamVjdH0gaGFzaCBUaGUgaGFzaCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaERlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIHRoaXMuaGFzKGtleSkgJiYgZGVsZXRlIHRoaXMuX19kYXRhX19ba2V5XTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBoYXNoIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGhhc2hHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKG5hdGl2ZUNyZWF0ZSkge1xuICAgIHZhciByZXN1bHQgPSBkYXRhW2tleV07XG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gSEFTSF9VTkRFRklORUQgPyB1bmRlZmluZWQgOiByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSA/IGRhdGFba2V5XSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBoYXNoIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoSGFzKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHJldHVybiBuYXRpdmVDcmVhdGUgPyBkYXRhW2tleV0gIT09IHVuZGVmaW5lZCA6IGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBoYXNoIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaGFzaCBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gaGFzaFNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgZGF0YVtrZXldID0gKG5hdGl2ZUNyZWF0ZSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IEhBU0hfVU5ERUZJTkVEIDogdmFsdWU7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgSGFzaGAuXG5IYXNoLnByb3RvdHlwZS5jbGVhciA9IGhhc2hDbGVhcjtcbkhhc2gucHJvdG90eXBlWydkZWxldGUnXSA9IGhhc2hEZWxldGU7XG5IYXNoLnByb3RvdHlwZS5nZXQgPSBoYXNoR2V0O1xuSGFzaC5wcm90b3R5cGUuaGFzID0gaGFzaEhhcztcbkhhc2gucHJvdG90eXBlLnNldCA9IGhhc2hTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBsaXN0IGNhY2hlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTGlzdENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBbXTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgIGRhdGEucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgcmV0dXJuIGluZGV4IDwgMCA/IHVuZGVmaW5lZCA6IGRhdGFbaW5kZXhdWzFdO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gYXNzb2NJbmRleE9mKHRoaXMuX19kYXRhX18sIGtleSkgPiAtMTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBsaXN0IGNhY2hlIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBsaXN0IGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICBkYXRhLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhW2luZGV4XVsxXSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTGlzdENhY2hlYC5cbkxpc3RDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBsaXN0Q2FjaGVDbGVhcjtcbkxpc3RDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbGlzdENhY2hlRGVsZXRlO1xuTGlzdENhY2hlLnByb3RvdHlwZS5nZXQgPSBsaXN0Q2FjaGVHZXQ7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmhhcyA9IGxpc3RDYWNoZUhhcztcbkxpc3RDYWNoZS5wcm90b3R5cGUuc2V0ID0gbGlzdENhY2hlU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXAgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTWFwQ2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IHtcbiAgICAnaGFzaCc6IG5ldyBIYXNoLFxuICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVEZWxldGUoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSlbJ2RlbGV0ZSddKGtleSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbWFwIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUdldChrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5nZXQoa2V5KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBtYXAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBtYXAgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbWFwIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIGdldE1hcERhdGEodGhpcywga2V5KS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTWFwQ2FjaGVgLlxuTWFwQ2FjaGUucHJvdG90eXBlLmNsZWFyID0gbWFwQ2FjaGVDbGVhcjtcbk1hcENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBtYXBDYWNoZURlbGV0ZTtcbk1hcENhY2hlLnByb3RvdHlwZS5nZXQgPSBtYXBDYWNoZUdldDtcbk1hcENhY2hlLnByb3RvdHlwZS5oYXMgPSBtYXBDYWNoZUhhcztcbk1hcENhY2hlLnByb3RvdHlwZS5zZXQgPSBtYXBDYWNoZVNldDtcblxuLyoqXG4gKiBBc3NpZ25zIGB2YWx1ZWAgdG8gYGtleWAgb2YgYG9iamVjdGAgaWYgdGhlIGV4aXN0aW5nIHZhbHVlIGlzIG5vdCBlcXVpdmFsZW50XG4gKiB1c2luZyBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogZm9yIGVxdWFsaXR5IGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGFzc2lnblZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XTtcbiAgaWYgKCEoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYgZXEob2JqVmFsdWUsIHZhbHVlKSkgfHxcbiAgICAgICh2YWx1ZSA9PT0gdW5kZWZpbmVkICYmICEoa2V5IGluIG9iamVjdCkpKSB7XG4gICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgfVxufVxuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBga2V5YCBpcyBmb3VuZCBpbiBgYXJyYXlgIG9mIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IGtleSBUaGUga2V5IHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBhc3NvY0luZGV4T2YoYXJyYXksIGtleSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoZXEoYXJyYXlbbGVuZ3RoXVswXSwga2V5KSkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbixcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCBpc01hc2tlZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHBhdHRlcm4gPSAoaXNGdW5jdGlvbih2YWx1ZSkgfHwgaXNIb3N0T2JqZWN0KHZhbHVlKSkgPyByZUlzTmF0aXZlIDogcmVJc0hvc3RDdG9yO1xuICByZXR1cm4gcGF0dGVybi50ZXN0KHRvU291cmNlKHZhbHVlKSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uc2V0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBwYXRoIGNyZWF0aW9uLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZVNldChvYmplY3QsIHBhdGgsIHZhbHVlLCBjdXN0b21pemVyKSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cbiAgcGF0aCA9IGlzS2V5KHBhdGgsIG9iamVjdCkgPyBbcGF0aF0gOiBjYXN0UGF0aChwYXRoKTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoLFxuICAgICAgbGFzdEluZGV4ID0gbGVuZ3RoIC0gMSxcbiAgICAgIG5lc3RlZCA9IG9iamVjdDtcblxuICB3aGlsZSAobmVzdGVkICE9IG51bGwgJiYgKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSB0b0tleShwYXRoW2luZGV4XSksXG4gICAgICAgIG5ld1ZhbHVlID0gdmFsdWU7XG5cbiAgICBpZiAoaW5kZXggIT0gbGFzdEluZGV4KSB7XG4gICAgICB2YXIgb2JqVmFsdWUgPSBuZXN0ZWRba2V5XTtcbiAgICAgIG5ld1ZhbHVlID0gY3VzdG9taXplciA/IGN1c3RvbWl6ZXIob2JqVmFsdWUsIGtleSwgbmVzdGVkKSA6IHVuZGVmaW5lZDtcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gaXNPYmplY3Qob2JqVmFsdWUpXG4gICAgICAgICAgPyBvYmpWYWx1ZVxuICAgICAgICAgIDogKGlzSW5kZXgocGF0aFtpbmRleCArIDFdKSA/IFtdIDoge30pO1xuICAgICAgfVxuICAgIH1cbiAgICBhc3NpZ25WYWx1ZShuZXN0ZWQsIGtleSwgbmV3VmFsdWUpO1xuICAgIG5lc3RlZCA9IG5lc3RlZFtrZXldO1xuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udG9TdHJpbmdgIHdoaWNoIGRvZXNuJ3QgY29udmVydCBudWxsaXNoXG4gKiB2YWx1ZXMgdG8gZW1wdHkgc3RyaW5ncy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIC8vIEV4aXQgZWFybHkgZm9yIHN0cmluZ3MgdG8gYXZvaWQgYSBwZXJmb3JtYW5jZSBoaXQgaW4gc29tZSBlbnZpcm9ubWVudHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBzeW1ib2xUb1N0cmluZyA/IHN5bWJvbFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG4vKipcbiAqIENhc3RzIGB2YWx1ZWAgdG8gYSBwYXRoIGFycmF5IGlmIGl0J3Mgbm90IG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY2FzdCBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICovXG5mdW5jdGlvbiBjYXN0UGF0aCh2YWx1ZSkge1xuICByZXR1cm4gaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IHN0cmluZ1RvUGF0aCh2YWx1ZSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgZGF0YSBmb3IgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIHJlZmVyZW5jZSBrZXkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWFwIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGdldE1hcERhdGEobWFwLCBrZXkpIHtcbiAgdmFyIGRhdGEgPSBtYXAuX19kYXRhX187XG4gIHJldHVybiBpc0tleWFibGUoa2V5KVxuICAgID8gZGF0YVt0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8gJ3N0cmluZycgOiAnaGFzaCddXG4gICAgOiBkYXRhLm1hcDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gISFsZW5ndGggJiZcbiAgICAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSAmJlxuICAgICh2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHByb3BlcnR5IG5hbWUgYW5kIG5vdCBhIHByb3BlcnR5IHBhdGguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkga2V5cyBvbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvcGVydHkgbmFtZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleSh2YWx1ZSwgb2JqZWN0KSB7XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJyB8fFxuICAgICAgdmFsdWUgPT0gbnVsbCB8fCBpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gcmVJc1BsYWluUHJvcC50ZXN0KHZhbHVlKSB8fCAhcmVJc0RlZXBQcm9wLnRlc3QodmFsdWUpIHx8XG4gICAgKG9iamVjdCAhPSBudWxsICYmIHZhbHVlIGluIE9iamVjdChvYmplY3QpKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3IgdXNlIGFzIHVuaXF1ZSBvYmplY3Qga2V5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5YWJsZSh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICh0eXBlID09ICdzdHJpbmcnIHx8IHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJylcbiAgICA/ICh2YWx1ZSAhPT0gJ19fcHJvdG9fXycpXG4gICAgOiAodmFsdWUgPT09IG51bGwpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgZnVuY2AgaGFzIGl0cyBzb3VyY2UgbWFza2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgZnVuY2AgaXMgbWFza2VkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTWFza2VkKGZ1bmMpIHtcbiAgcmV0dXJuICEhbWFza1NyY0tleSAmJiAobWFza1NyY0tleSBpbiBmdW5jKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgc3RyaW5nYCB0byBhIHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICovXG52YXIgc3RyaW5nVG9QYXRoID0gbWVtb2l6ZShmdW5jdGlvbihzdHJpbmcpIHtcbiAgc3RyaW5nID0gdG9TdHJpbmcoc3RyaW5nKTtcblxuICB2YXIgcmVzdWx0ID0gW107XG4gIGlmIChyZUxlYWRpbmdEb3QudGVzdChzdHJpbmcpKSB7XG4gICAgcmVzdWx0LnB1c2goJycpO1xuICB9XG4gIHN0cmluZy5yZXBsYWNlKHJlUHJvcE5hbWUsIGZ1bmN0aW9uKG1hdGNoLCBudW1iZXIsIHF1b3RlLCBzdHJpbmcpIHtcbiAgICByZXN1bHQucHVzaChxdW90ZSA/IHN0cmluZy5yZXBsYWNlKHJlRXNjYXBlQ2hhciwgJyQxJykgOiAobnVtYmVyIHx8IG1hdGNoKSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufSk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyBrZXkgaWYgaXQncyBub3QgYSBzdHJpbmcgb3Igc3ltYm9sLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHJldHVybnMge3N0cmluZ3xzeW1ib2x9IFJldHVybnMgdGhlIGtleS5cbiAqL1xuZnVuY3Rpb24gdG9LZXkodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fCBpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgbWVtb2l6ZXMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuIElmIGByZXNvbHZlcmAgaXNcbiAqIHByb3ZpZGVkLCBpdCBkZXRlcm1pbmVzIHRoZSBjYWNoZSBrZXkgZm9yIHN0b3JpbmcgdGhlIHJlc3VsdCBiYXNlZCBvbiB0aGVcbiAqIGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24uIEJ5IGRlZmF1bHQsIHRoZSBmaXJzdCBhcmd1bWVudFxuICogcHJvdmlkZWQgdG8gdGhlIG1lbW9pemVkIGZ1bmN0aW9uIGlzIHVzZWQgYXMgdGhlIG1hcCBjYWNoZSBrZXkuIFRoZSBgZnVuY2BcbiAqIGlzIGludm9rZWQgd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgdGhlIG1lbW9pemVkIGZ1bmN0aW9uLlxuICpcbiAqICoqTm90ZToqKiBUaGUgY2FjaGUgaXMgZXhwb3NlZCBhcyB0aGUgYGNhY2hlYCBwcm9wZXJ0eSBvbiB0aGUgbWVtb2l6ZWRcbiAqIGZ1bmN0aW9uLiBJdHMgY3JlYXRpb24gbWF5IGJlIGN1c3RvbWl6ZWQgYnkgcmVwbGFjaW5nIHRoZSBgXy5tZW1vaXplLkNhY2hlYFxuICogY29uc3RydWN0b3Igd2l0aCBvbmUgd2hvc2UgaW5zdGFuY2VzIGltcGxlbWVudCB0aGVcbiAqIFtgTWFwYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcHJvcGVydGllcy1vZi10aGUtbWFwLXByb3RvdHlwZS1vYmplY3QpXG4gKiBtZXRob2QgaW50ZXJmYWNlIG9mIGBkZWxldGVgLCBgZ2V0YCwgYGhhc2AsIGFuZCBgc2V0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGhhdmUgaXRzIG91dHB1dCBtZW1vaXplZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZXNvbHZlcl0gVGhlIGZ1bmN0aW9uIHRvIHJlc29sdmUgdGhlIGNhY2hlIGtleS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IG1lbW9pemVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogMiB9O1xuICogdmFyIG90aGVyID0geyAnYyc6IDMsICdkJzogNCB9O1xuICpcbiAqIHZhciB2YWx1ZXMgPSBfLm1lbW9pemUoXy52YWx1ZXMpO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiB2YWx1ZXMob3RoZXIpO1xuICogLy8gPT4gWzMsIDRdXG4gKlxuICogb2JqZWN0LmEgPSAyO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiAvLyBNb2RpZnkgdGhlIHJlc3VsdCBjYWNoZS5cbiAqIHZhbHVlcy5jYWNoZS5zZXQob2JqZWN0LCBbJ2EnLCAnYiddKTtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWydhJywgJ2InXVxuICpcbiAqIC8vIFJlcGxhY2UgYF8ubWVtb2l6ZS5DYWNoZWAuXG4gKiBfLm1lbW9pemUuQ2FjaGUgPSBXZWFrTWFwO1xuICovXG5mdW5jdGlvbiBtZW1vaXplKGZ1bmMsIHJlc29sdmVyKSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nIHx8IChyZXNvbHZlciAmJiB0eXBlb2YgcmVzb2x2ZXIgIT0gJ2Z1bmN0aW9uJykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgdmFyIG1lbW9pemVkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGtleSA9IHJlc29sdmVyID8gcmVzb2x2ZXIuYXBwbHkodGhpcywgYXJncykgOiBhcmdzWzBdLFxuICAgICAgICBjYWNoZSA9IG1lbW9pemVkLmNhY2hlO1xuXG4gICAgaWYgKGNhY2hlLmhhcyhrZXkpKSB7XG4gICAgICByZXR1cm4gY2FjaGUuZ2V0KGtleSk7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIG1lbW9pemVkLmNhY2hlID0gY2FjaGUuc2V0KGtleSwgcmVzdWx0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBtZW1vaXplZC5jYWNoZSA9IG5ldyAobWVtb2l6ZS5DYWNoZSB8fCBNYXBDYWNoZSk7XG4gIHJldHVybiBtZW1vaXplZDtcbn1cblxuLy8gQXNzaWduIGNhY2hlIHRvIGBfLm1lbW9pemVgLlxubWVtb2l6ZS5DYWNoZSA9IE1hcENhY2hlO1xuXG4vKipcbiAqIFBlcmZvcm1zIGFcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiAxIH07XG4gKlxuICogXy5lcShvYmplY3QsIG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcSgnYScsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcSgnYScsIE9iamVjdCgnYScpKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcShOYU4sIE5hTik7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGVxKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gdmFsdWUgPT09IG90aGVyIHx8ICh2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOC05IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBpc09iamVjdCh2YWx1ZSkgPyBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZCBmb3IgYG51bGxgXG4gKiBhbmQgYHVuZGVmaW5lZGAgdmFsdWVzLiBUaGUgc2lnbiBvZiBgLTBgIGlzIHByZXNlcnZlZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b1N0cmluZyhudWxsKTtcbiAqIC8vID0+ICcnXG4gKlxuICogXy50b1N0cmluZygtMCk7XG4gKiAvLyA9PiAnLTAnXG4gKlxuICogXy50b1N0cmluZyhbMSwgMiwgM10pO1xuICogLy8gPT4gJzEsMiwzJ1xuICovXG5mdW5jdGlvbiB0b1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogYmFzZVRvU3RyaW5nKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSB2YWx1ZSBhdCBgcGF0aGAgb2YgYG9iamVjdGAuIElmIGEgcG9ydGlvbiBvZiBgcGF0aGAgZG9lc24ndCBleGlzdCxcbiAqIGl0J3MgY3JlYXRlZC4gQXJyYXlzIGFyZSBjcmVhdGVkIGZvciBtaXNzaW5nIGluZGV4IHByb3BlcnRpZXMgd2hpbGUgb2JqZWN0c1xuICogYXJlIGNyZWF0ZWQgZm9yIGFsbCBvdGhlciBtaXNzaW5nIHByb3BlcnRpZXMuIFVzZSBgXy5zZXRXaXRoYCB0byBjdXN0b21pemVcbiAqIGBwYXRoYCBjcmVhdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgbXV0YXRlcyBgb2JqZWN0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuNy4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogW3sgJ2InOiB7ICdjJzogMyB9IH1dIH07XG4gKlxuICogXy5zZXQob2JqZWN0LCAnYVswXS5iLmMnLCA0KTtcbiAqIGNvbnNvbGUubG9nKG9iamVjdC5hWzBdLmIuYyk7XG4gKiAvLyA9PiA0XG4gKlxuICogXy5zZXQob2JqZWN0LCBbJ3gnLCAnMCcsICd5JywgJ3onXSwgNSk7XG4gKiBjb25zb2xlLmxvZyhvYmplY3QueFswXS55LnopO1xuICogLy8gPT4gNVxuICovXG5mdW5jdGlvbiBzZXQob2JqZWN0LCBwYXRoLCB2YWx1ZSkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyBvYmplY3QgOiBiYXNlU2V0KG9iamVjdCwgcGF0aCwgdmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2guc2V0L2luZGV4LmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZCAgICAgICAgPSByZXF1aXJlKCdkJylcbiAgLCBjYWxsYWJsZSA9IHJlcXVpcmUoJ2VzNS1leHQvb2JqZWN0L3ZhbGlkLWNhbGxhYmxlJylcblxuICAsIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LCBjYWxsID0gRnVuY3Rpb24ucHJvdG90eXBlLmNhbGxcbiAgLCBjcmVhdGUgPSBPYmplY3QuY3JlYXRlLCBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eVxuICAsIGRlZmluZVByb3BlcnRpZXMgPSBPYmplY3QuZGVmaW5lUHJvcGVydGllc1xuICAsIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuICAsIGRlc2NyaXB0b3IgPSB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlIH1cblxuICAsIG9uLCBvbmNlLCBvZmYsIGVtaXQsIG1ldGhvZHMsIGRlc2NyaXB0b3JzLCBiYXNlO1xuXG5vbiA9IGZ1bmN0aW9uICh0eXBlLCBsaXN0ZW5lcikge1xuXHR2YXIgZGF0YTtcblxuXHRjYWxsYWJsZShsaXN0ZW5lcik7XG5cblx0aWYgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsICdfX2VlX18nKSkge1xuXHRcdGRhdGEgPSBkZXNjcmlwdG9yLnZhbHVlID0gY3JlYXRlKG51bGwpO1xuXHRcdGRlZmluZVByb3BlcnR5KHRoaXMsICdfX2VlX18nLCBkZXNjcmlwdG9yKTtcblx0XHRkZXNjcmlwdG9yLnZhbHVlID0gbnVsbDtcblx0fSBlbHNlIHtcblx0XHRkYXRhID0gdGhpcy5fX2VlX187XG5cdH1cblx0aWYgKCFkYXRhW3R5cGVdKSBkYXRhW3R5cGVdID0gbGlzdGVuZXI7XG5cdGVsc2UgaWYgKHR5cGVvZiBkYXRhW3R5cGVdID09PSAnb2JqZWN0JykgZGF0YVt0eXBlXS5wdXNoKGxpc3RlbmVyKTtcblx0ZWxzZSBkYXRhW3R5cGVdID0gW2RhdGFbdHlwZV0sIGxpc3RlbmVyXTtcblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbm9uY2UgPSBmdW5jdGlvbiAodHlwZSwgbGlzdGVuZXIpIHtcblx0dmFyIG9uY2UsIHNlbGY7XG5cblx0Y2FsbGFibGUobGlzdGVuZXIpO1xuXHRzZWxmID0gdGhpcztcblx0b24uY2FsbCh0aGlzLCB0eXBlLCBvbmNlID0gZnVuY3Rpb24gKCkge1xuXHRcdG9mZi5jYWxsKHNlbGYsIHR5cGUsIG9uY2UpO1xuXHRcdGFwcGx5LmNhbGwobGlzdGVuZXIsIHRoaXMsIGFyZ3VtZW50cyk7XG5cdH0pO1xuXG5cdG9uY2UuX19lZU9uY2VMaXN0ZW5lcl9fID0gbGlzdGVuZXI7XG5cdHJldHVybiB0aGlzO1xufTtcblxub2ZmID0gZnVuY3Rpb24gKHR5cGUsIGxpc3RlbmVyKSB7XG5cdHZhciBkYXRhLCBsaXN0ZW5lcnMsIGNhbmRpZGF0ZSwgaTtcblxuXHRjYWxsYWJsZShsaXN0ZW5lcik7XG5cblx0aWYgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsICdfX2VlX18nKSkgcmV0dXJuIHRoaXM7XG5cdGRhdGEgPSB0aGlzLl9fZWVfXztcblx0aWYgKCFkYXRhW3R5cGVdKSByZXR1cm4gdGhpcztcblx0bGlzdGVuZXJzID0gZGF0YVt0eXBlXTtcblxuXHRpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ29iamVjdCcpIHtcblx0XHRmb3IgKGkgPSAwOyAoY2FuZGlkYXRlID0gbGlzdGVuZXJzW2ldKTsgKytpKSB7XG5cdFx0XHRpZiAoKGNhbmRpZGF0ZSA9PT0gbGlzdGVuZXIpIHx8XG5cdFx0XHRcdFx0KGNhbmRpZGF0ZS5fX2VlT25jZUxpc3RlbmVyX18gPT09IGxpc3RlbmVyKSkge1xuXHRcdFx0XHRpZiAobGlzdGVuZXJzLmxlbmd0aCA9PT0gMikgZGF0YVt0eXBlXSA9IGxpc3RlbmVyc1tpID8gMCA6IDFdO1xuXHRcdFx0XHRlbHNlIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGlmICgobGlzdGVuZXJzID09PSBsaXN0ZW5lcikgfHxcblx0XHRcdFx0KGxpc3RlbmVycy5fX2VlT25jZUxpc3RlbmVyX18gPT09IGxpc3RlbmVyKSkge1xuXHRcdFx0ZGVsZXRlIGRhdGFbdHlwZV07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG5lbWl0ID0gZnVuY3Rpb24gKHR5cGUpIHtcblx0dmFyIGksIGwsIGxpc3RlbmVyLCBsaXN0ZW5lcnMsIGFyZ3M7XG5cblx0aWYgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsICdfX2VlX18nKSkgcmV0dXJuO1xuXHRsaXN0ZW5lcnMgPSB0aGlzLl9fZWVfX1t0eXBlXTtcblx0aWYgKCFsaXN0ZW5lcnMpIHJldHVybjtcblxuXHRpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ29iamVjdCcpIHtcblx0XHRsID0gYXJndW1lbnRzLmxlbmd0aDtcblx0XHRhcmdzID0gbmV3IEFycmF5KGwgLSAxKTtcblx0XHRmb3IgKGkgPSAxOyBpIDwgbDsgKytpKSBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcblxuXHRcdGxpc3RlbmVycyA9IGxpc3RlbmVycy5zbGljZSgpO1xuXHRcdGZvciAoaSA9IDA7IChsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXSk7ICsraSkge1xuXHRcdFx0YXBwbHkuY2FsbChsaXN0ZW5lciwgdGhpcywgYXJncyk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdGNhc2UgMTpcblx0XHRcdGNhbGwuY2FsbChsaXN0ZW5lcnMsIHRoaXMpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAyOlxuXHRcdFx0Y2FsbC5jYWxsKGxpc3RlbmVycywgdGhpcywgYXJndW1lbnRzWzFdKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMzpcblx0XHRcdGNhbGwuY2FsbChsaXN0ZW5lcnMsIHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRsID0gYXJndW1lbnRzLmxlbmd0aDtcblx0XHRcdGFyZ3MgPSBuZXcgQXJyYXkobCAtIDEpO1xuXHRcdFx0Zm9yIChpID0gMTsgaSA8IGw7ICsraSkge1xuXHRcdFx0XHRhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdH1cblx0XHRcdGFwcGx5LmNhbGwobGlzdGVuZXJzLCB0aGlzLCBhcmdzKTtcblx0XHR9XG5cdH1cbn07XG5cbm1ldGhvZHMgPSB7XG5cdG9uOiBvbixcblx0b25jZTogb25jZSxcblx0b2ZmOiBvZmYsXG5cdGVtaXQ6IGVtaXRcbn07XG5cbmRlc2NyaXB0b3JzID0ge1xuXHRvbjogZChvbiksXG5cdG9uY2U6IGQob25jZSksXG5cdG9mZjogZChvZmYpLFxuXHRlbWl0OiBkKGVtaXQpXG59O1xuXG5iYXNlID0gZGVmaW5lUHJvcGVydGllcyh7fSwgZGVzY3JpcHRvcnMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmdW5jdGlvbiAobykge1xuXHRyZXR1cm4gKG8gPT0gbnVsbCkgPyBjcmVhdGUoYmFzZSkgOiBkZWZpbmVQcm9wZXJ0aWVzKE9iamVjdChvKSwgZGVzY3JpcHRvcnMpO1xufTtcbmV4cG9ydHMubWV0aG9kcyA9IG1ldGhvZHM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZXZlbnQtZW1pdHRlci9pbmRleC5qcyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFzc2lnbiAgICAgICAgPSByZXF1aXJlKCdlczUtZXh0L29iamVjdC9hc3NpZ24nKVxuICAsIG5vcm1hbGl6ZU9wdHMgPSByZXF1aXJlKCdlczUtZXh0L29iamVjdC9ub3JtYWxpemUtb3B0aW9ucycpXG4gICwgaXNDYWxsYWJsZSAgICA9IHJlcXVpcmUoJ2VzNS1leHQvb2JqZWN0L2lzLWNhbGxhYmxlJylcbiAgLCBjb250YWlucyAgICAgID0gcmVxdWlyZSgnZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucycpXG5cbiAgLCBkO1xuXG5kID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZHNjciwgdmFsdWUvKiwgb3B0aW9ucyovKSB7XG5cdHZhciBjLCBlLCB3LCBvcHRpb25zLCBkZXNjO1xuXHRpZiAoKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB8fCAodHlwZW9mIGRzY3IgIT09ICdzdHJpbmcnKSkge1xuXHRcdG9wdGlvbnMgPSB2YWx1ZTtcblx0XHR2YWx1ZSA9IGRzY3I7XG5cdFx0ZHNjciA9IG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0b3B0aW9ucyA9IGFyZ3VtZW50c1syXTtcblx0fVxuXHRpZiAoZHNjciA9PSBudWxsKSB7XG5cdFx0YyA9IHcgPSB0cnVlO1xuXHRcdGUgPSBmYWxzZTtcblx0fSBlbHNlIHtcblx0XHRjID0gY29udGFpbnMuY2FsbChkc2NyLCAnYycpO1xuXHRcdGUgPSBjb250YWlucy5jYWxsKGRzY3IsICdlJyk7XG5cdFx0dyA9IGNvbnRhaW5zLmNhbGwoZHNjciwgJ3cnKTtcblx0fVxuXG5cdGRlc2MgPSB7IHZhbHVlOiB2YWx1ZSwgY29uZmlndXJhYmxlOiBjLCBlbnVtZXJhYmxlOiBlLCB3cml0YWJsZTogdyB9O1xuXHRyZXR1cm4gIW9wdGlvbnMgPyBkZXNjIDogYXNzaWduKG5vcm1hbGl6ZU9wdHMob3B0aW9ucyksIGRlc2MpO1xufTtcblxuZC5ncyA9IGZ1bmN0aW9uIChkc2NyLCBnZXQsIHNldC8qLCBvcHRpb25zKi8pIHtcblx0dmFyIGMsIGUsIG9wdGlvbnMsIGRlc2M7XG5cdGlmICh0eXBlb2YgZHNjciAhPT0gJ3N0cmluZycpIHtcblx0XHRvcHRpb25zID0gc2V0O1xuXHRcdHNldCA9IGdldDtcblx0XHRnZXQgPSBkc2NyO1xuXHRcdGRzY3IgPSBudWxsO1xuXHR9IGVsc2Uge1xuXHRcdG9wdGlvbnMgPSBhcmd1bWVudHNbM107XG5cdH1cblx0aWYgKGdldCA9PSBudWxsKSB7XG5cdFx0Z2V0ID0gdW5kZWZpbmVkO1xuXHR9IGVsc2UgaWYgKCFpc0NhbGxhYmxlKGdldCkpIHtcblx0XHRvcHRpb25zID0gZ2V0O1xuXHRcdGdldCA9IHNldCA9IHVuZGVmaW5lZDtcblx0fSBlbHNlIGlmIChzZXQgPT0gbnVsbCkge1xuXHRcdHNldCA9IHVuZGVmaW5lZDtcblx0fSBlbHNlIGlmICghaXNDYWxsYWJsZShzZXQpKSB7XG5cdFx0b3B0aW9ucyA9IHNldDtcblx0XHRzZXQgPSB1bmRlZmluZWQ7XG5cdH1cblx0aWYgKGRzY3IgPT0gbnVsbCkge1xuXHRcdGMgPSB0cnVlO1xuXHRcdGUgPSBmYWxzZTtcblx0fSBlbHNlIHtcblx0XHRjID0gY29udGFpbnMuY2FsbChkc2NyLCAnYycpO1xuXHRcdGUgPSBjb250YWlucy5jYWxsKGRzY3IsICdlJyk7XG5cdH1cblxuXHRkZXNjID0geyBnZXQ6IGdldCwgc2V0OiBzZXQsIGNvbmZpZ3VyYWJsZTogYywgZW51bWVyYWJsZTogZSB9O1xuXHRyZXR1cm4gIW9wdGlvbnMgPyBkZXNjIDogYXNzaWduKG5vcm1hbGl6ZU9wdHMob3B0aW9ucyksIGRlc2MpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9kL2luZGV4LmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vaXMtaW1wbGVtZW50ZWRcIikoKVxuXHQ/IE9iamVjdC5hc3NpZ25cblx0OiByZXF1aXJlKFwiLi9zaGltXCIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2Fzc2lnbi9pbmRleC5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIGFzc2lnbiA9IE9iamVjdC5hc3NpZ24sIG9iajtcblx0aWYgKHR5cGVvZiBhc3NpZ24gIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGZhbHNlO1xuXHRvYmogPSB7IGZvbzogXCJyYXpcIiB9O1xuXHRhc3NpZ24ob2JqLCB7IGJhcjogXCJkd2FcIiB9LCB7IHRyenk6IFwidHJ6eVwiIH0pO1xuXHRyZXR1cm4gKG9iai5mb28gKyBvYmouYmFyICsgb2JqLnRyenkpID09PSBcInJhemR3YXRyenlcIjtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvYXNzaWduL2lzLWltcGxlbWVudGVkLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBrZXlzICA9IHJlcXVpcmUoXCIuLi9rZXlzXCIpXG4gICwgdmFsdWUgPSByZXF1aXJlKFwiLi4vdmFsaWQtdmFsdWVcIilcbiAgLCBtYXggICA9IE1hdGgubWF4O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkZXN0LCBzcmMgLyosIOKApnNyY24qLykge1xuXHR2YXIgZXJyb3IsIGksIGxlbmd0aCA9IG1heChhcmd1bWVudHMubGVuZ3RoLCAyKSwgYXNzaWduO1xuXHRkZXN0ID0gT2JqZWN0KHZhbHVlKGRlc3QpKTtcblx0YXNzaWduID0gZnVuY3Rpb24gKGtleSkge1xuXHRcdHRyeSB7XG5cdFx0XHRkZXN0W2tleV0gPSBzcmNba2V5XTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGU7XG5cdFx0fVxuXHR9O1xuXHRmb3IgKGkgPSAxOyBpIDwgbGVuZ3RoOyArK2kpIHtcblx0XHRzcmMgPSBhcmd1bWVudHNbaV07XG5cdFx0a2V5cyhzcmMpLmZvckVhY2goYXNzaWduKTtcblx0fVxuXHRpZiAoZXJyb3IgIT09IHVuZGVmaW5lZCkgdGhyb3cgZXJyb3I7XG5cdHJldHVybiBkZXN0O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9hc3NpZ24vc2hpbS5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2lzLWltcGxlbWVudGVkXCIpKClcblx0PyBPYmplY3Qua2V5c1xuXHQ6IHJlcXVpcmUoXCIuL3NoaW1cIik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3Qva2V5cy9pbmRleC5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0dHJ5IHtcblx0XHRPYmplY3Qua2V5cyhcInByaW1pdGl2ZVwiKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZSkge1xuIHJldHVybiBmYWxzZTtcbn1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3Qva2V5cy9pcy1pbXBsZW1lbnRlZC5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNWYWx1ZSA9IHJlcXVpcmUoXCIuLi9pcy12YWx1ZVwiKTtcblxudmFyIGtleXMgPSBPYmplY3Qua2V5cztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG5cdHJldHVybiBrZXlzKGlzVmFsdWUob2JqZWN0KSA/IE9iamVjdChvYmplY3QpIDogb2JqZWN0KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3Qva2V5cy9zaGltLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eS1mdW5jdGlvblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7fTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9lczUtZXh0L2Z1bmN0aW9uL25vb3AuanMiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzVmFsdWUgPSByZXF1aXJlKFwiLi9pcy12YWx1ZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0aWYgKCFpc1ZhbHVlKHZhbHVlKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgbnVsbCBvciB1bmRlZmluZWRcIik7XG5cdHJldHVybiB2YWx1ZTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvdmFsaWQtdmFsdWUuanMiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzVmFsdWUgPSByZXF1aXJlKFwiLi9pcy12YWx1ZVwiKTtcblxudmFyIGZvckVhY2ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaCwgY3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcblxudmFyIHByb2Nlc3MgPSBmdW5jdGlvbiAoc3JjLCBvYmopIHtcblx0dmFyIGtleTtcblx0Zm9yIChrZXkgaW4gc3JjKSBvYmpba2V5XSA9IHNyY1trZXldO1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRzMSAvKiwg4oCmb3B0aW9ucyovKSB7XG5cdHZhciByZXN1bHQgPSBjcmVhdGUobnVsbCk7XG5cdGZvckVhY2guY2FsbChhcmd1bWVudHMsIGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdFx0aWYgKCFpc1ZhbHVlKG9wdGlvbnMpKSByZXR1cm47XG5cdFx0cHJvY2VzcyhPYmplY3Qob3B0aW9ucyksIHJlc3VsdCk7XG5cdH0pO1xuXHRyZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9ub3JtYWxpemUtb3B0aW9ucy5qcyIsIi8vIERlcHJlY2F0ZWRcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuIHJldHVybiB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCI7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2lzLWNhbGxhYmxlLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vaXMtaW1wbGVtZW50ZWRcIikoKVxuXHQ/IFN0cmluZy5wcm90b3R5cGUuY29udGFpbnNcblx0OiByZXF1aXJlKFwiLi9zaGltXCIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvaW5kZXguanMiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0ciA9IFwicmF6ZHdhdHJ6eVwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKHR5cGVvZiBzdHIuY29udGFpbnMgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGZhbHNlO1xuXHRyZXR1cm4gKHN0ci5jb250YWlucyhcImR3YVwiKSA9PT0gdHJ1ZSkgJiYgKHN0ci5jb250YWlucyhcImZvb1wiKSA9PT0gZmFsc2UpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9lczUtZXh0L3N0cmluZy8jL2NvbnRhaW5zL2lzLWltcGxlbWVudGVkLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpbmRleE9mID0gU3RyaW5nLnByb3RvdHlwZS5pbmRleE9mO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzZWFyY2hTdHJpbmcvKiwgcG9zaXRpb24qLykge1xuXHRyZXR1cm4gaW5kZXhPZi5jYWxsKHRoaXMsIHNlYXJjaFN0cmluZywgYXJndW1lbnRzWzFdKSA+IC0xO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9lczUtZXh0L3N0cmluZy8jL2NvbnRhaW5zL3NoaW0uanMiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4pIHtcblx0aWYgKHR5cGVvZiBmbiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKGZuICsgXCIgaXMgbm90IGEgZnVuY3Rpb25cIik7XG5cdHJldHVybiBmbjtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvdmFsaWQtY2FsbGFibGUuanMiLCIvKiFcbiAqIHZhbGlkYXRlLmpzIDAuMTEuMVxuICpcbiAqIChjKSAyMDEzLTIwMTYgTmlja2xhcyBBbnNtYW4sIDIwMTMgV3JhcHBcbiAqIFZhbGlkYXRlLmpzIG1heSBiZSBmcmVlbHkgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICogRm9yIGFsbCBkZXRhaWxzIGFuZCBkb2N1bWVudGF0aW9uOlxuICogaHR0cDovL3ZhbGlkYXRlanMub3JnL1xuICovXG5cbihmdW5jdGlvbihleHBvcnRzLCBtb2R1bGUsIGRlZmluZSkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICAvLyBUaGUgbWFpbiBmdW5jdGlvbiB0aGF0IGNhbGxzIHRoZSB2YWxpZGF0b3JzIHNwZWNpZmllZCBieSB0aGUgY29uc3RyYWludHMuXG4gIC8vIFRoZSBvcHRpb25zIGFyZSB0aGUgZm9sbG93aW5nOlxuICAvLyAgIC0gZm9ybWF0IChzdHJpbmcpIC0gQW4gb3B0aW9uIHRoYXQgY29udHJvbHMgaG93IHRoZSByZXR1cm5lZCB2YWx1ZSBpcyBmb3JtYXR0ZWRcbiAgLy8gICAgICogZmxhdCAtIFJldHVybnMgYSBmbGF0IGFycmF5IG9mIGp1c3QgdGhlIGVycm9yIG1lc3NhZ2VzXG4gIC8vICAgICAqIGdyb3VwZWQgLSBSZXR1cm5zIHRoZSBtZXNzYWdlcyBncm91cGVkIGJ5IGF0dHJpYnV0ZSAoZGVmYXVsdClcbiAgLy8gICAgICogZGV0YWlsZWQgLSBSZXR1cm5zIGFuIGFycmF5IG9mIHRoZSByYXcgdmFsaWRhdGlvbiBkYXRhXG4gIC8vICAgLSBmdWxsTWVzc2FnZXMgKGJvb2xlYW4pIC0gSWYgYHRydWVgIChkZWZhdWx0KSB0aGUgYXR0cmlidXRlIG5hbWUgaXMgcHJlcGVuZGVkIHRvIHRoZSBlcnJvci5cbiAgLy9cbiAgLy8gUGxlYXNlIG5vdGUgdGhhdCB0aGUgb3B0aW9ucyBhcmUgYWxzbyBwYXNzZWQgdG8gZWFjaCB2YWxpZGF0b3IuXG4gIHZhciB2YWxpZGF0ZSA9IGZ1bmN0aW9uKGF0dHJpYnV0ZXMsIGNvbnN0cmFpbnRzLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHYuZXh0ZW5kKHt9LCB2Lm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgdmFyIHJlc3VsdHMgPSB2LnJ1blZhbGlkYXRpb25zKGF0dHJpYnV0ZXMsIGNvbnN0cmFpbnRzLCBvcHRpb25zKVxuICAgICAgLCBhdHRyXG4gICAgICAsIHZhbGlkYXRvcjtcblxuICAgIGZvciAoYXR0ciBpbiByZXN1bHRzKSB7XG4gICAgICBmb3IgKHZhbGlkYXRvciBpbiByZXN1bHRzW2F0dHJdKSB7XG4gICAgICAgIGlmICh2LmlzUHJvbWlzZShyZXN1bHRzW2F0dHJdW3ZhbGlkYXRvcl0pKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVXNlIHZhbGlkYXRlLmFzeW5jIGlmIHlvdSB3YW50IHN1cHBvcnQgZm9yIHByb21pc2VzXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2YWxpZGF0ZS5wcm9jZXNzVmFsaWRhdGlvblJlc3VsdHMocmVzdWx0cywgb3B0aW9ucyk7XG4gIH07XG5cbiAgdmFyIHYgPSB2YWxpZGF0ZTtcblxuICAvLyBDb3BpZXMgb3ZlciBhdHRyaWJ1dGVzIGZyb20gb25lIG9yIG1vcmUgc291cmNlcyB0byBhIHNpbmdsZSBkZXN0aW5hdGlvbi5cbiAgLy8gVmVyeSBtdWNoIHNpbWlsYXIgdG8gdW5kZXJzY29yZSdzIGV4dGVuZC5cbiAgLy8gVGhlIGZpcnN0IGFyZ3VtZW50IGlzIHRoZSB0YXJnZXQgb2JqZWN0IGFuZCB0aGUgcmVtYWluaW5nIGFyZ3VtZW50cyB3aWxsIGJlXG4gIC8vIHVzZWQgYXMgc291cmNlcy5cbiAgdi5leHRlbmQgPSBmdW5jdGlvbihvYmopIHtcbiAgICBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkuZm9yRWFjaChmdW5jdGlvbihzb3VyY2UpIHtcbiAgICAgIGZvciAodmFyIGF0dHIgaW4gc291cmNlKSB7XG4gICAgICAgIG9ialthdHRyXSA9IHNvdXJjZVthdHRyXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb2JqO1xuICB9O1xuXG4gIHYuZXh0ZW5kKHZhbGlkYXRlLCB7XG4gICAgLy8gVGhpcyBpcyB0aGUgdmVyc2lvbiBvZiB0aGUgbGlicmFyeSBhcyBhIHNlbXZlci5cbiAgICAvLyBUaGUgdG9TdHJpbmcgZnVuY3Rpb24gd2lsbCBhbGxvdyBpdCB0byBiZSBjb2VyY2VkIGludG8gYSBzdHJpbmdcbiAgICB2ZXJzaW9uOiB7XG4gICAgICBtYWpvcjogMCxcbiAgICAgIG1pbm9yOiAxMSxcbiAgICAgIHBhdGNoOiAxLFxuICAgICAgbWV0YWRhdGE6IG51bGwsXG4gICAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gdi5mb3JtYXQoXCIle21ham9yfS4le21pbm9yfS4le3BhdGNofVwiLCB2LnZlcnNpb24pO1xuICAgICAgICBpZiAoIXYuaXNFbXB0eSh2LnZlcnNpb24ubWV0YWRhdGEpKSB7XG4gICAgICAgICAgdmVyc2lvbiArPSBcIitcIiArIHYudmVyc2lvbi5tZXRhZGF0YTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmVyc2lvbjtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gQmVsb3cgaXMgdGhlIGRlcGVuZGVuY2llcyB0aGF0IGFyZSB1c2VkIGluIHZhbGlkYXRlLmpzXG5cbiAgICAvLyBUaGUgY29uc3RydWN0b3Igb2YgdGhlIFByb21pc2UgaW1wbGVtZW50YXRpb24uXG4gICAgLy8gSWYgeW91IGFyZSB1c2luZyBRLmpzLCBSU1ZQIG9yIGFueSBvdGhlciBBKyBjb21wYXRpYmxlIGltcGxlbWVudGF0aW9uXG4gICAgLy8gb3ZlcnJpZGUgdGhpcyBhdHRyaWJ1dGUgdG8gYmUgdGhlIGNvbnN0cnVjdG9yIG9mIHRoYXQgcHJvbWlzZS5cbiAgICAvLyBTaW5jZSBqUXVlcnkgcHJvbWlzZXMgYXJlbid0IEErIGNvbXBhdGlibGUgdGhleSB3b24ndCB3b3JrLlxuICAgIFByb21pc2U6IHR5cGVvZiBQcm9taXNlICE9PSBcInVuZGVmaW5lZFwiID8gUHJvbWlzZSA6IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIG51bGwsXG5cbiAgICBFTVBUWV9TVFJJTkdfUkVHRVhQOiAvXlxccyokLyxcblxuICAgIC8vIFJ1bnMgdGhlIHZhbGlkYXRvcnMgc3BlY2lmaWVkIGJ5IHRoZSBjb25zdHJhaW50cyBvYmplY3QuXG4gICAgLy8gV2lsbCByZXR1cm4gYW4gYXJyYXkgb2YgdGhlIGZvcm1hdDpcbiAgICAvLyAgICAgW3thdHRyaWJ1dGU6IFwiPGF0dHJpYnV0ZSBuYW1lPlwiLCBlcnJvcjogXCI8dmFsaWRhdGlvbiByZXN1bHQ+XCJ9LCAuLi5dXG4gICAgcnVuVmFsaWRhdGlvbnM6IGZ1bmN0aW9uKGF0dHJpYnV0ZXMsIGNvbnN0cmFpbnRzLCBvcHRpb25zKSB7XG4gICAgICB2YXIgcmVzdWx0cyA9IFtdXG4gICAgICAgICwgYXR0clxuICAgICAgICAsIHZhbGlkYXRvck5hbWVcbiAgICAgICAgLCB2YWx1ZVxuICAgICAgICAsIHZhbGlkYXRvcnNcbiAgICAgICAgLCB2YWxpZGF0b3JcbiAgICAgICAgLCB2YWxpZGF0b3JPcHRpb25zXG4gICAgICAgICwgZXJyb3I7XG5cbiAgICAgIGlmICh2LmlzRG9tRWxlbWVudChhdHRyaWJ1dGVzKSB8fCB2LmlzSnF1ZXJ5RWxlbWVudChhdHRyaWJ1dGVzKSkge1xuICAgICAgICBhdHRyaWJ1dGVzID0gdi5jb2xsZWN0Rm9ybVZhbHVlcyhhdHRyaWJ1dGVzKTtcbiAgICAgIH1cblxuICAgICAgLy8gTG9vcHMgdGhyb3VnaCBlYWNoIGNvbnN0cmFpbnRzLCBmaW5kcyB0aGUgY29ycmVjdCB2YWxpZGF0b3IgYW5kIHJ1biBpdC5cbiAgICAgIGZvciAoYXR0ciBpbiBjb25zdHJhaW50cykge1xuICAgICAgICB2YWx1ZSA9IHYuZ2V0RGVlcE9iamVjdFZhbHVlKGF0dHJpYnV0ZXMsIGF0dHIpO1xuICAgICAgICAvLyBUaGlzIGFsbG93cyB0aGUgY29uc3RyYWludHMgZm9yIGFuIGF0dHJpYnV0ZSB0byBiZSBhIGZ1bmN0aW9uLlxuICAgICAgICAvLyBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgdmFsdWUsIGF0dHJpYnV0ZSBuYW1lLCB0aGUgY29tcGxldGUgZGljdCBvZlxuICAgICAgICAvLyBhdHRyaWJ1dGVzIGFzIHdlbGwgYXMgdGhlIG9wdGlvbnMgYW5kIGNvbnN0cmFpbnRzIHBhc3NlZCBpbi5cbiAgICAgICAgLy8gVGhpcyBpcyB1c2VmdWwgd2hlbiB5b3Ugd2FudCB0byBoYXZlIGRpZmZlcmVudFxuICAgICAgICAvLyB2YWxpZGF0aW9ucyBkZXBlbmRpbmcgb24gdGhlIGF0dHJpYnV0ZSB2YWx1ZS5cbiAgICAgICAgdmFsaWRhdG9ycyA9IHYucmVzdWx0KGNvbnN0cmFpbnRzW2F0dHJdLCB2YWx1ZSwgYXR0cmlidXRlcywgYXR0ciwgb3B0aW9ucywgY29uc3RyYWludHMpO1xuXG4gICAgICAgIGZvciAodmFsaWRhdG9yTmFtZSBpbiB2YWxpZGF0b3JzKSB7XG4gICAgICAgICAgdmFsaWRhdG9yID0gdi52YWxpZGF0b3JzW3ZhbGlkYXRvck5hbWVdO1xuXG4gICAgICAgICAgaWYgKCF2YWxpZGF0b3IpIHtcbiAgICAgICAgICAgIGVycm9yID0gdi5mb3JtYXQoXCJVbmtub3duIHZhbGlkYXRvciAle25hbWV9XCIsIHtuYW1lOiB2YWxpZGF0b3JOYW1lfSk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhbGlkYXRvck9wdGlvbnMgPSB2YWxpZGF0b3JzW3ZhbGlkYXRvck5hbWVdO1xuICAgICAgICAgIC8vIFRoaXMgYWxsb3dzIHRoZSBvcHRpb25zIHRvIGJlIGEgZnVuY3Rpb24uIFRoZSBmdW5jdGlvbiB3aWxsIGJlXG4gICAgICAgICAgLy8gY2FsbGVkIHdpdGggdGhlIHZhbHVlLCBhdHRyaWJ1dGUgbmFtZSwgdGhlIGNvbXBsZXRlIGRpY3Qgb2ZcbiAgICAgICAgICAvLyBhdHRyaWJ1dGVzIGFzIHdlbGwgYXMgdGhlIG9wdGlvbnMgYW5kIGNvbnN0cmFpbnRzIHBhc3NlZCBpbi5cbiAgICAgICAgICAvLyBUaGlzIGlzIHVzZWZ1bCB3aGVuIHlvdSB3YW50IHRvIGhhdmUgZGlmZmVyZW50XG4gICAgICAgICAgLy8gdmFsaWRhdGlvbnMgZGVwZW5kaW5nIG9uIHRoZSBhdHRyaWJ1dGUgdmFsdWUuXG4gICAgICAgICAgdmFsaWRhdG9yT3B0aW9ucyA9IHYucmVzdWx0KHZhbGlkYXRvck9wdGlvbnMsIHZhbHVlLCBhdHRyaWJ1dGVzLCBhdHRyLCBvcHRpb25zLCBjb25zdHJhaW50cyk7XG4gICAgICAgICAgaWYgKCF2YWxpZGF0b3JPcHRpb25zKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZTogYXR0cixcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yTmFtZSxcbiAgICAgICAgICAgIGdsb2JhbE9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBhdHRyaWJ1dGVzLFxuICAgICAgICAgICAgb3B0aW9uczogdmFsaWRhdG9yT3B0aW9ucyxcbiAgICAgICAgICAgIGVycm9yOiB2YWxpZGF0b3IuY2FsbCh2YWxpZGF0b3IsXG4gICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yT3B0aW9ucyxcbiAgICAgICAgICAgICAgICBhdHRyLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMsXG4gICAgICAgICAgICAgICAgb3B0aW9ucylcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9LFxuXG4gICAgLy8gVGFrZXMgdGhlIG91dHB1dCBmcm9tIHJ1blZhbGlkYXRpb25zIGFuZCBjb252ZXJ0cyBpdCB0byB0aGUgY29ycmVjdFxuICAgIC8vIG91dHB1dCBmb3JtYXQuXG4gICAgcHJvY2Vzc1ZhbGlkYXRpb25SZXN1bHRzOiBmdW5jdGlvbihlcnJvcnMsIG9wdGlvbnMpIHtcbiAgICAgIGVycm9ycyA9IHYucHJ1bmVFbXB0eUVycm9ycyhlcnJvcnMsIG9wdGlvbnMpO1xuICAgICAgZXJyb3JzID0gdi5leHBhbmRNdWx0aXBsZUVycm9ycyhlcnJvcnMsIG9wdGlvbnMpO1xuICAgICAgZXJyb3JzID0gdi5jb252ZXJ0RXJyb3JNZXNzYWdlcyhlcnJvcnMsIG9wdGlvbnMpO1xuXG4gICAgICB2YXIgZm9ybWF0ID0gb3B0aW9ucy5mb3JtYXQgfHwgXCJncm91cGVkXCI7XG5cbiAgICAgIGlmICh0eXBlb2Ygdi5mb3JtYXR0ZXJzW2Zvcm1hdF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZXJyb3JzID0gdi5mb3JtYXR0ZXJzW2Zvcm1hdF0oZXJyb3JzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcih2LmZvcm1hdChcIlVua25vd24gZm9ybWF0ICV7Zm9ybWF0fVwiLCBvcHRpb25zKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2LmlzRW1wdHkoZXJyb3JzKSA/IHVuZGVmaW5lZCA6IGVycm9ycztcbiAgICB9LFxuXG4gICAgLy8gUnVucyB0aGUgdmFsaWRhdGlvbnMgd2l0aCBzdXBwb3J0IGZvciBwcm9taXNlcy5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIGEgcHJvbWlzZSB0aGF0IGlzIHNldHRsZWQgd2hlbiBhbGwgdGhlXG4gICAgLy8gdmFsaWRhdGlvbiBwcm9taXNlcyBoYXZlIGJlZW4gY29tcGxldGVkLlxuICAgIC8vIEl0IGNhbiBiZSBjYWxsZWQgZXZlbiBpZiBubyB2YWxpZGF0aW9ucyByZXR1cm5lZCBhIHByb21pc2UuXG4gICAgYXN5bmM6IGZ1bmN0aW9uKGF0dHJpYnV0ZXMsIGNvbnN0cmFpbnRzLCBvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gdi5leHRlbmQoe30sIHYuYXN5bmMub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAgIHZhciBXcmFwRXJyb3JzID0gb3B0aW9ucy53cmFwRXJyb3JzIHx8IGZ1bmN0aW9uKGVycm9ycykge1xuICAgICAgICByZXR1cm4gZXJyb3JzO1xuICAgICAgfTtcblxuICAgICAgLy8gUmVtb3ZlcyB1bmtub3duIGF0dHJpYnV0ZXNcbiAgICAgIGlmIChvcHRpb25zLmNsZWFuQXR0cmlidXRlcyAhPT0gZmFsc2UpIHtcbiAgICAgICAgYXR0cmlidXRlcyA9IHYuY2xlYW5BdHRyaWJ1dGVzKGF0dHJpYnV0ZXMsIGNvbnN0cmFpbnRzKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlc3VsdHMgPSB2LnJ1blZhbGlkYXRpb25zKGF0dHJpYnV0ZXMsIGNvbnN0cmFpbnRzLCBvcHRpb25zKTtcblxuICAgICAgcmV0dXJuIG5ldyB2LlByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHYud2FpdEZvclJlc3VsdHMocmVzdWx0cykudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgZXJyb3JzID0gdi5wcm9jZXNzVmFsaWRhdGlvblJlc3VsdHMocmVzdWx0cywgb3B0aW9ucyk7XG4gICAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBXcmFwRXJyb3JzKGVycm9ycywgb3B0aW9ucywgYXR0cmlidXRlcywgY29uc3RyYWludHMpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShhdHRyaWJ1dGVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBzaW5nbGU6IGZ1bmN0aW9uKHZhbHVlLCBjb25zdHJhaW50cywgb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHYuZXh0ZW5kKHt9LCB2LnNpbmdsZS5vcHRpb25zLCBvcHRpb25zLCB7XG4gICAgICAgIGZvcm1hdDogXCJmbGF0XCIsXG4gICAgICAgIGZ1bGxNZXNzYWdlczogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHYoe3NpbmdsZTogdmFsdWV9LCB7c2luZ2xlOiBjb25zdHJhaW50c30sIG9wdGlvbnMpO1xuICAgIH0sXG5cbiAgICAvLyBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gYWxsIHByb21pc2VzIGluIHRoZSByZXN1bHRzIGFycmF5XG4gICAgLy8gYXJlIHNldHRsZWQuIFRoZSBwcm9taXNlIHJldHVybmVkIGZyb20gdGhpcyBmdW5jdGlvbiBpcyBhbHdheXMgcmVzb2x2ZWQsXG4gICAgLy8gbmV2ZXIgcmVqZWN0ZWQuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBtb2RpZmllcyB0aGUgaW5wdXQgYXJndW1lbnQsIGl0IHJlcGxhY2VzIHRoZSBwcm9taXNlc1xuICAgIC8vIHdpdGggdGhlIHZhbHVlIHJldHVybmVkIGZyb20gdGhlIHByb21pc2UuXG4gICAgd2FpdEZvclJlc3VsdHM6IGZ1bmN0aW9uKHJlc3VsdHMpIHtcbiAgICAgIC8vIENyZWF0ZSBhIHNlcXVlbmNlIG9mIGFsbCB0aGUgcmVzdWx0cyBzdGFydGluZyB3aXRoIGEgcmVzb2x2ZWQgcHJvbWlzZS5cbiAgICAgIHJldHVybiByZXN1bHRzLnJlZHVjZShmdW5jdGlvbihtZW1vLCByZXN1bHQpIHtcbiAgICAgICAgLy8gSWYgdGhpcyByZXN1bHQgaXNuJ3QgYSBwcm9taXNlIHNraXAgaXQgaW4gdGhlIHNlcXVlbmNlLlxuICAgICAgICBpZiAoIXYuaXNQcm9taXNlKHJlc3VsdC5lcnJvcikpIHtcbiAgICAgICAgICByZXR1cm4gbWVtbztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtZW1vLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5lcnJvci50aGVuKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICByZXN1bHQuZXJyb3IgPSBlcnJvciB8fCBudWxsO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0sIG5ldyB2LlByb21pc2UoZnVuY3Rpb24ocikgeyByKCk7IH0pKTsgLy8gQSByZXNvbHZlZCBwcm9taXNlXG4gICAgfSxcblxuICAgIC8vIElmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhIGNhbGw6IGZ1bmN0aW9uIHRoZSBhbmQ6IGZ1bmN0aW9uIHJldHVybiB0aGUgdmFsdWVcbiAgICAvLyBvdGhlcndpc2UganVzdCByZXR1cm4gdGhlIHZhbHVlLiBBZGRpdGlvbmFsIGFyZ3VtZW50cyB3aWxsIGJlIHBhc3NlZCBhc1xuICAgIC8vIGFyZ3VtZW50cyB0byB0aGUgZnVuY3Rpb24uXG4gICAgLy8gRXhhbXBsZTpcbiAgICAvLyBgYGBcbiAgICAvLyByZXN1bHQoJ2ZvbycpIC8vICdmb28nXG4gICAgLy8gcmVzdWx0KE1hdGgubWF4LCAxLCAyKSAvLyAyXG4gICAgLy8gYGBgXG4gICAgcmVzdWx0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcblxuICAgIC8vIENoZWNrcyBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuIFRoaXMgZnVuY3Rpb24gZG9lcyBub3QgY29uc2lkZXIgTmFOIGFcbiAgICAvLyBudW1iZXIgbGlrZSBtYW55IG90aGVyIGBpc051bWJlcmAgZnVuY3Rpb25zIGRvLlxuICAgIGlzTnVtYmVyOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgIWlzTmFOKHZhbHVlKTtcbiAgICB9LFxuXG4gICAgLy8gUmV0dXJucyBmYWxzZSBpZiB0aGUgb2JqZWN0IGlzIG5vdCBhIGZ1bmN0aW9uXG4gICAgaXNGdW5jdGlvbjogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG4gICAgfSxcblxuICAgIC8vIEEgc2ltcGxlIGNoZWNrIHRvIHZlcmlmeSB0aGF0IHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLiBVc2VzIGBpc051bWJlcmBcbiAgICAvLyBhbmQgYSBzaW1wbGUgbW9kdWxvIGNoZWNrLlxuICAgIGlzSW50ZWdlcjogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiB2LmlzTnVtYmVyKHZhbHVlKSAmJiB2YWx1ZSAlIDEgPT09IDA7XG4gICAgfSxcblxuICAgIC8vIENoZWNrcyBpZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuXG4gICAgaXNCb29sZWFuOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nO1xuICAgIH0sXG5cbiAgICAvLyBVc2VzIHRoZSBgT2JqZWN0YCBmdW5jdGlvbiB0byBjaGVjayBpZiB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgYW4gb2JqZWN0LlxuICAgIGlzT2JqZWN0OiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IE9iamVjdChvYmopO1xuICAgIH0sXG5cbiAgICAvLyBTaW1wbHkgY2hlY2tzIGlmIHRoZSBvYmplY3QgaXMgYW4gaW5zdGFuY2Ugb2YgYSBkYXRlXG4gICAgaXNEYXRlOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBEYXRlO1xuICAgIH0sXG5cbiAgICAvLyBSZXR1cm5zIGZhbHNlIGlmIHRoZSBvYmplY3QgaXMgYG51bGxgIG9mIGB1bmRlZmluZWRgXG4gICAgaXNEZWZpbmVkOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogIT09IG51bGwgJiYgb2JqICE9PSB1bmRlZmluZWQ7XG4gICAgfSxcblxuICAgIC8vIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgYSBwcm9taXNlLiBBbnl0aGluZyB3aXRoIGEgYHRoZW5gXG4gICAgLy8gZnVuY3Rpb24gaXMgY29uc2lkZXJlZCBhIHByb21pc2UuXG4gICAgaXNQcm9taXNlOiBmdW5jdGlvbihwKSB7XG4gICAgICByZXR1cm4gISFwICYmIHYuaXNGdW5jdGlvbihwLnRoZW4pO1xuICAgIH0sXG5cbiAgICBpc0pxdWVyeUVsZW1lbnQ6IGZ1bmN0aW9uKG8pIHtcbiAgICAgIHJldHVybiBvICYmIHYuaXNTdHJpbmcoby5qcXVlcnkpO1xuICAgIH0sXG5cbiAgICBpc0RvbUVsZW1lbnQ6IGZ1bmN0aW9uKG8pIHtcbiAgICAgIGlmICghbykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICghby5xdWVyeVNlbGVjdG9yQWxsIHx8ICFvLnF1ZXJ5U2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAodi5pc09iamVjdChkb2N1bWVudCkgJiYgbyA9PT0gZG9jdW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM4NDM4MC82OTkzMDRcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICBpZiAodHlwZW9mIEhUTUxFbGVtZW50ID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHJldHVybiBvIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbyAmJlxuICAgICAgICAgIHR5cGVvZiBvID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgbyAhPT0gbnVsbCAmJlxuICAgICAgICAgIG8ubm9kZVR5cGUgPT09IDEgJiZcbiAgICAgICAgICB0eXBlb2Ygby5ub2RlTmFtZSA9PT0gXCJzdHJpbmdcIjtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgaXNFbXB0eTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBhdHRyO1xuXG4gICAgICAvLyBOdWxsIGFuZCB1bmRlZmluZWQgYXJlIGVtcHR5XG4gICAgICBpZiAoIXYuaXNEZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gZnVuY3Rpb25zIGFyZSBub24gZW1wdHlcbiAgICAgIGlmICh2LmlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gV2hpdGVzcGFjZSBvbmx5IHN0cmluZ3MgYXJlIGVtcHR5XG4gICAgICBpZiAodi5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHYuRU1QVFlfU1RSSU5HX1JFR0VYUC50ZXN0KHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgLy8gRm9yIGFycmF5cyB3ZSB1c2UgdGhlIGxlbmd0aCBwcm9wZXJ0eVxuICAgICAgaWYgKHYuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA9PT0gMDtcbiAgICAgIH1cblxuICAgICAgLy8gRGF0ZXMgaGF2ZSBubyBhdHRyaWJ1dGVzIGJ1dCBhcmVuJ3QgZW1wdHlcbiAgICAgIGlmICh2LmlzRGF0ZSh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB3ZSBmaW5kIGF0IGxlYXN0IG9uZSBwcm9wZXJ0eSB3ZSBjb25zaWRlciBpdCBub24gZW1wdHlcbiAgICAgIGlmICh2LmlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICBmb3IgKGF0dHIgaW4gdmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgLy8gRm9ybWF0cyB0aGUgc3BlY2lmaWVkIHN0cmluZ3Mgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzIGxpa2Ugc286XG4gICAgLy8gYGBgXG4gICAgLy8gZm9ybWF0KFwiRm9vOiAle2Zvb31cIiwge2ZvbzogXCJiYXJcIn0pIC8vIFwiRm9vIGJhclwiXG4gICAgLy8gYGBgXG4gICAgLy8gSWYgeW91IHdhbnQgdG8gd3JpdGUgJXsuLi59IHdpdGhvdXQgaGF2aW5nIGl0IHJlcGxhY2VkIHNpbXBseVxuICAgIC8vIHByZWZpeCBpdCB3aXRoICUgbGlrZSB0aGlzIGBGb286ICUle2Zvb31gIGFuZCBpdCB3aWxsIGJlIHJldHVybmVkXG4gICAgLy8gYXMgYFwiRm9vOiAle2Zvb31cImBcbiAgICBmb3JtYXQ6IHYuZXh0ZW5kKGZ1bmN0aW9uKHN0ciwgdmFscykge1xuICAgICAgaWYgKCF2LmlzU3RyaW5nKHN0cikpIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHIucmVwbGFjZSh2LmZvcm1hdC5GT1JNQVRfUkVHRVhQLCBmdW5jdGlvbihtMCwgbTEsIG0yKSB7XG4gICAgICAgIGlmIChtMSA9PT0gJyUnKSB7XG4gICAgICAgICAgcmV0dXJuIFwiJXtcIiArIG0yICsgXCJ9XCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWxzW20yXSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIHtcbiAgICAgIC8vIEZpbmRzICV7a2V5fSBzdHlsZSBwYXR0ZXJucyBpbiB0aGUgZ2l2ZW4gc3RyaW5nXG4gICAgICBGT1JNQVRfUkVHRVhQOiAvKCU/KSVcXHsoW15cXH1dKylcXH0vZ1xuICAgIH0pLFxuXG4gICAgLy8gXCJQcmV0dGlmaWVzXCIgdGhlIGdpdmVuIHN0cmluZy5cbiAgICAvLyBQcmV0dGlmeWluZyBtZWFucyByZXBsYWNpbmcgWy5cXF8tXSB3aXRoIHNwYWNlcyBhcyB3ZWxsIGFzIHNwbGl0dGluZ1xuICAgIC8vIGNhbWVsIGNhc2Ugd29yZHMuXG4gICAgcHJldHRpZnk6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgaWYgKHYuaXNOdW1iZXIoc3RyKSkge1xuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgbW9yZSB0aGFuIDIgZGVjaW1hbHMgcm91bmQgaXQgdG8gdHdvXG4gICAgICAgIGlmICgoc3RyICogMTAwKSAlIDEgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gXCJcIiArIHN0cjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChNYXRoLnJvdW5kKHN0ciAqIDEwMCkgLyAxMDApLnRvRml4ZWQoMik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHYuaXNBcnJheShzdHIpKSB7XG4gICAgICAgIHJldHVybiBzdHIubWFwKGZ1bmN0aW9uKHMpIHsgcmV0dXJuIHYucHJldHRpZnkocyk7IH0pLmpvaW4oXCIsIFwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHYuaXNPYmplY3Qoc3RyKSkge1xuICAgICAgICByZXR1cm4gc3RyLnRvU3RyaW5nKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEVuc3VyZSB0aGUgc3RyaW5nIGlzIGFjdHVhbGx5IGEgc3RyaW5nXG4gICAgICBzdHIgPSBcIlwiICsgc3RyO1xuXG4gICAgICByZXR1cm4gc3RyXG4gICAgICAgIC8vIFNwbGl0cyBrZXlzIHNlcGFyYXRlZCBieSBwZXJpb2RzXG4gICAgICAgIC5yZXBsYWNlKC8oW15cXHNdKVxcLihbXlxcc10pL2csICckMSAkMicpXG4gICAgICAgIC8vIFJlbW92ZXMgYmFja3NsYXNoZXNcbiAgICAgICAgLnJlcGxhY2UoL1xcXFwrL2csICcnKVxuICAgICAgICAvLyBSZXBsYWNlcyAtIGFuZCAtIHdpdGggc3BhY2VcbiAgICAgICAgLnJlcGxhY2UoL1tfLV0vZywgJyAnKVxuICAgICAgICAvLyBTcGxpdHMgY2FtZWwgY2FzZWQgd29yZHNcbiAgICAgICAgLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csIGZ1bmN0aW9uKG0wLCBtMSwgbTIpIHtcbiAgICAgICAgICByZXR1cm4gXCJcIiArIG0xICsgXCIgXCIgKyBtMi50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9KVxuICAgICAgICAudG9Mb3dlckNhc2UoKTtcbiAgICB9LFxuXG4gICAgc3RyaW5naWZ5VmFsdWU6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdi5wcmV0dGlmeSh2YWx1ZSk7XG4gICAgfSxcblxuICAgIGlzU3RyaW5nOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XG4gICAgfSxcblxuICAgIGlzQXJyYXk6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4ge30udG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgfSxcblxuICAgIC8vIENoZWNrcyBpZiB0aGUgb2JqZWN0IGlzIGEgaGFzaCwgd2hpY2ggaXMgZXF1aXZhbGVudCB0byBhbiBvYmplY3QgdGhhdFxuICAgIC8vIGlzIG5laXRoZXIgYW4gYXJyYXkgbm9yIGEgZnVuY3Rpb24uXG4gICAgaXNIYXNoOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHYuaXNPYmplY3QodmFsdWUpICYmICF2LmlzQXJyYXkodmFsdWUpICYmICF2LmlzRnVuY3Rpb24odmFsdWUpO1xuICAgIH0sXG5cbiAgICBjb250YWluczogZnVuY3Rpb24ob2JqLCB2YWx1ZSkge1xuICAgICAgaWYgKCF2LmlzRGVmaW5lZChvYmopKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh2LmlzQXJyYXkob2JqKSkge1xuICAgICAgICByZXR1cm4gb2JqLmluZGV4T2YodmFsdWUpICE9PSAtMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZSBpbiBvYmo7XG4gICAgfSxcblxuICAgIHVuaXF1ZTogZnVuY3Rpb24oYXJyYXkpIHtcbiAgICAgIGlmICghdi5pc0FycmF5KGFycmF5KSkge1xuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXJyYXkuZmlsdGVyKGZ1bmN0aW9uKGVsLCBpbmRleCwgYXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIGFycmF5LmluZGV4T2YoZWwpID09IGluZGV4O1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGZvckVhY2hLZXlJbktleXBhdGg6IGZ1bmN0aW9uKG9iamVjdCwga2V5cGF0aCwgY2FsbGJhY2spIHtcbiAgICAgIGlmICghdi5pc1N0cmluZyhrZXlwYXRoKSkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICB2YXIga2V5ID0gXCJcIlxuICAgICAgICAsIGlcbiAgICAgICAgLCBlc2NhcGUgPSBmYWxzZTtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IGtleXBhdGgubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgc3dpdGNoIChrZXlwYXRoW2ldKSB7XG4gICAgICAgICAgY2FzZSAnLic6XG4gICAgICAgICAgICBpZiAoZXNjYXBlKSB7XG4gICAgICAgICAgICAgIGVzY2FwZSA9IGZhbHNlO1xuICAgICAgICAgICAgICBrZXkgKz0gJy4nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgb2JqZWN0ID0gY2FsbGJhY2sob2JqZWN0LCBrZXksIGZhbHNlKTtcbiAgICAgICAgICAgICAga2V5ID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnXFxcXCc6XG4gICAgICAgICAgICBpZiAoZXNjYXBlKSB7XG4gICAgICAgICAgICAgIGVzY2FwZSA9IGZhbHNlO1xuICAgICAgICAgICAgICBrZXkgKz0gJ1xcXFwnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZXNjYXBlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGVzY2FwZSA9IGZhbHNlO1xuICAgICAgICAgICAga2V5ICs9IGtleXBhdGhbaV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2FsbGJhY2sob2JqZWN0LCBrZXksIHRydWUpO1xuICAgIH0sXG5cbiAgICBnZXREZWVwT2JqZWN0VmFsdWU6IGZ1bmN0aW9uKG9iaiwga2V5cGF0aCkge1xuICAgICAgaWYgKCF2LmlzT2JqZWN0KG9iaikpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHYuZm9yRWFjaEtleUluS2V5cGF0aChvYmosIGtleXBhdGgsIGZ1bmN0aW9uKG9iaiwga2V5KSB7XG4gICAgICAgIGlmICh2LmlzT2JqZWN0KG9iaikpIHtcbiAgICAgICAgICByZXR1cm4gb2JqW2tleV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvLyBUaGlzIHJldHVybnMgYW4gb2JqZWN0IHdpdGggYWxsIHRoZSB2YWx1ZXMgb2YgdGhlIGZvcm0uXG4gICAgLy8gSXQgdXNlcyB0aGUgaW5wdXQgbmFtZSBhcyBrZXkgYW5kIHRoZSB2YWx1ZSBhcyB2YWx1ZVxuICAgIC8vIFNvIGZvciBleGFtcGxlIHRoaXM6XG4gICAgLy8gPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImVtYWlsXCIgdmFsdWU9XCJmb29AYmFyLmNvbVwiIC8+XG4gICAgLy8gd291bGQgcmV0dXJuOlxuICAgIC8vIHtlbWFpbDogXCJmb29AYmFyLmNvbVwifVxuICAgIGNvbGxlY3RGb3JtVmFsdWVzOiBmdW5jdGlvbihmb3JtLCBvcHRpb25zKSB7XG4gICAgICB2YXIgdmFsdWVzID0ge31cbiAgICAgICAgLCBpXG4gICAgICAgICwgalxuICAgICAgICAsIGlucHV0XG4gICAgICAgICwgaW5wdXRzXG4gICAgICAgICwgb3B0aW9uXG4gICAgICAgICwgdmFsdWU7XG5cbiAgICAgIGlmICh2LmlzSnF1ZXJ5RWxlbWVudChmb3JtKSkge1xuICAgICAgICBmb3JtID0gZm9ybVswXTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFmb3JtKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgICB9XG5cbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgICBpbnB1dHMgPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFtuYW1lXSwgdGV4dGFyZWFbbmFtZV1cIik7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlucHV0ID0gaW5wdXRzLml0ZW0oaSk7XG5cbiAgICAgICAgaWYgKHYuaXNEZWZpbmVkKGlucHV0LmdldEF0dHJpYnV0ZShcImRhdGEtaWdub3JlZFwiKSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhbHVlID0gdi5zYW5pdGl6ZUZvcm1WYWx1ZShpbnB1dC52YWx1ZSwgb3B0aW9ucyk7XG4gICAgICAgIGlmIChpbnB1dC50eXBlID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZSA/ICt2YWx1ZSA6IG51bGw7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQudHlwZSA9PT0gXCJjaGVja2JveFwiKSB7XG4gICAgICAgICAgaWYgKGlucHV0LmF0dHJpYnV0ZXMudmFsdWUpIHtcbiAgICAgICAgICAgIGlmICghaW5wdXQuY2hlY2tlZCkge1xuICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlc1tpbnB1dC5uYW1lXSB8fCBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGlucHV0LmNoZWNrZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGlucHV0LnR5cGUgPT09IFwicmFkaW9cIikge1xuICAgICAgICAgIGlmICghaW5wdXQuY2hlY2tlZCkge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZXNbaW5wdXQubmFtZV0gfHwgbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWVzW2lucHV0Lm5hbWVdID0gdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIGlucHV0cyA9IGZvcm0ucXVlcnlTZWxlY3RvckFsbChcInNlbGVjdFtuYW1lXVwiKTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaW5wdXQgPSBpbnB1dHMuaXRlbShpKTtcbiAgICAgICAgaWYgKGlucHV0Lm11bHRpcGxlKSB7XG4gICAgICAgICAgdmFsdWUgPSBbXTtcbiAgICAgICAgICBmb3IgKGogaW4gaW5wdXQub3B0aW9ucykge1xuICAgICAgICAgICAgb3B0aW9uID0gaW5wdXQub3B0aW9uc1tqXTtcbiAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgdmFsdWUucHVzaCh2LnNhbml0aXplRm9ybVZhbHVlKG9wdGlvbi52YWx1ZSwgb3B0aW9ucykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWx1ZSA9IHYuc2FuaXRpemVGb3JtVmFsdWUoaW5wdXQub3B0aW9uc1tpbnB1dC5zZWxlY3RlZEluZGV4XS52YWx1ZSwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWVzW2lucHV0Lm5hbWVdID0gdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfSxcblxuICAgIHNhbml0aXplRm9ybVZhbHVlOiBmdW5jdGlvbih2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgaWYgKG9wdGlvbnMudHJpbSAmJiB2LmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnRyaW0oKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMubnVsbGlmeSAhPT0gZmFsc2UgJiYgdmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcblxuICAgIGNhcGl0YWxpemU6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgaWYgKCF2LmlzU3RyaW5nKHN0cikpIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHJbMF0udG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbiAgICB9LFxuXG4gICAgLy8gUmVtb3ZlIGFsbCBlcnJvcnMgd2hvJ3MgZXJyb3IgYXR0cmlidXRlIGlzIGVtcHR5IChudWxsIG9yIHVuZGVmaW5lZClcbiAgICBwcnVuZUVtcHR5RXJyb3JzOiBmdW5jdGlvbihlcnJvcnMpIHtcbiAgICAgIHJldHVybiBlcnJvcnMuZmlsdGVyKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgIHJldHVybiAhdi5pc0VtcHR5KGVycm9yLmVycm9yKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvLyBJblxuICAgIC8vIFt7ZXJyb3I6IFtcImVycjFcIiwgXCJlcnIyXCJdLCAuLi59XVxuICAgIC8vIE91dFxuICAgIC8vIFt7ZXJyb3I6IFwiZXJyMVwiLCAuLi59LCB7ZXJyb3I6IFwiZXJyMlwiLCAuLi59XVxuICAgIC8vXG4gICAgLy8gQWxsIGF0dHJpYnV0ZXMgaW4gYW4gZXJyb3Igd2l0aCBtdWx0aXBsZSBtZXNzYWdlcyBhcmUgZHVwbGljYXRlZFxuICAgIC8vIHdoZW4gZXhwYW5kaW5nIHRoZSBlcnJvcnMuXG4gICAgZXhwYW5kTXVsdGlwbGVFcnJvcnM6IGZ1bmN0aW9uKGVycm9ycykge1xuICAgICAgdmFyIHJldCA9IFtdO1xuICAgICAgZXJyb3JzLmZvckVhY2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgLy8gUmVtb3ZlcyBlcnJvcnMgd2l0aG91dCBhIG1lc3NhZ2VcbiAgICAgICAgaWYgKHYuaXNBcnJheShlcnJvci5lcnJvcikpIHtcbiAgICAgICAgICBlcnJvci5lcnJvci5mb3JFYWNoKGZ1bmN0aW9uKG1zZykge1xuICAgICAgICAgICAgcmV0LnB1c2godi5leHRlbmQoe30sIGVycm9yLCB7ZXJyb3I6IG1zZ30pKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXQucHVzaChlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydHMgdGhlIGVycm9yIG1lc2FnZXMgYnkgcHJlcGVuZGluZyB0aGUgYXR0cmlidXRlIG5hbWUgdW5sZXNzIHRoZVxuICAgIC8vIG1lc3NhZ2UgaXMgcHJlZml4ZWQgYnkgXlxuICAgIGNvbnZlcnRFcnJvck1lc3NhZ2VzOiBmdW5jdGlvbihlcnJvcnMsIG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgICB2YXIgcmV0ID0gW107XG4gICAgICBlcnJvcnMuZm9yRWFjaChmdW5jdGlvbihlcnJvckluZm8pIHtcbiAgICAgICAgdmFyIGVycm9yID0gdi5yZXN1bHQoZXJyb3JJbmZvLmVycm9yLFxuICAgICAgICAgICAgZXJyb3JJbmZvLnZhbHVlLFxuICAgICAgICAgICAgZXJyb3JJbmZvLmF0dHJpYnV0ZSxcbiAgICAgICAgICAgIGVycm9ySW5mby5vcHRpb25zLFxuICAgICAgICAgICAgZXJyb3JJbmZvLmF0dHJpYnV0ZXMsXG4gICAgICAgICAgICBlcnJvckluZm8uZ2xvYmFsT3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKCF2LmlzU3RyaW5nKGVycm9yKSkge1xuICAgICAgICAgIHJldC5wdXNoKGVycm9ySW5mbyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVycm9yWzBdID09PSAnXicpIHtcbiAgICAgICAgICBlcnJvciA9IGVycm9yLnNsaWNlKDEpO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZnVsbE1lc3NhZ2VzICE9PSBmYWxzZSkge1xuICAgICAgICAgIGVycm9yID0gdi5jYXBpdGFsaXplKHYucHJldHRpZnkoZXJyb3JJbmZvLmF0dHJpYnV0ZSkpICsgXCIgXCIgKyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBlcnJvciA9IGVycm9yLnJlcGxhY2UoL1xcXFxcXF4vZywgXCJeXCIpO1xuICAgICAgICBlcnJvciA9IHYuZm9ybWF0KGVycm9yLCB7dmFsdWU6IHYuc3RyaW5naWZ5VmFsdWUoZXJyb3JJbmZvLnZhbHVlKX0pO1xuICAgICAgICByZXQucHVzaCh2LmV4dGVuZCh7fSwgZXJyb3JJbmZvLCB7ZXJyb3I6IGVycm9yfSkpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0sXG5cbiAgICAvLyBJbjpcbiAgICAvLyBbe2F0dHJpYnV0ZTogXCI8YXR0cmlidXRlTmFtZT5cIiwgLi4ufV1cbiAgICAvLyBPdXQ6XG4gICAgLy8ge1wiPGF0dHJpYnV0ZU5hbWU+XCI6IFt7YXR0cmlidXRlOiBcIjxhdHRyaWJ1dGVOYW1lPlwiLCAuLi59XX1cbiAgICBncm91cEVycm9yc0J5QXR0cmlidXRlOiBmdW5jdGlvbihlcnJvcnMpIHtcbiAgICAgIHZhciByZXQgPSB7fTtcbiAgICAgIGVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgIHZhciBsaXN0ID0gcmV0W2Vycm9yLmF0dHJpYnV0ZV07XG4gICAgICAgIGlmIChsaXN0KSB7XG4gICAgICAgICAgbGlzdC5wdXNoKGVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXRbZXJyb3IuYXR0cmlidXRlXSA9IFtlcnJvcl07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9LFxuXG4gICAgLy8gSW46XG4gICAgLy8gW3tlcnJvcjogXCI8bWVzc2FnZSAxPlwiLCAuLi59LCB7ZXJyb3I6IFwiPG1lc3NhZ2UgMj5cIiwgLi4ufV1cbiAgICAvLyBPdXQ6XG4gICAgLy8gW1wiPG1lc3NhZ2UgMT5cIiwgXCI8bWVzc2FnZSAyPlwiXVxuICAgIGZsYXR0ZW5FcnJvcnNUb0FycmF5OiBmdW5jdGlvbihlcnJvcnMpIHtcbiAgICAgIHJldHVybiBlcnJvcnNcbiAgICAgICAgLm1hcChmdW5jdGlvbihlcnJvcikgeyByZXR1cm4gZXJyb3IuZXJyb3I7IH0pXG4gICAgICAgIC5maWx0ZXIoZnVuY3Rpb24odmFsdWUsIGluZGV4LCBzZWxmKSB7XG4gICAgICAgICAgcmV0dXJuIHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4O1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgY2xlYW5BdHRyaWJ1dGVzOiBmdW5jdGlvbihhdHRyaWJ1dGVzLCB3aGl0ZWxpc3QpIHtcbiAgICAgIGZ1bmN0aW9uIHdoaXRlbGlzdENyZWF0b3Iob2JqLCBrZXksIGxhc3QpIHtcbiAgICAgICAgaWYgKHYuaXNPYmplY3Qob2JqW2tleV0pKSB7XG4gICAgICAgICAgcmV0dXJuIG9ialtrZXldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAob2JqW2tleV0gPSBsYXN0ID8gdHJ1ZSA6IHt9KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYnVpbGRPYmplY3RXaGl0ZWxpc3Qod2hpdGVsaXN0KSB7XG4gICAgICAgIHZhciBvdyA9IHt9XG4gICAgICAgICAgLCBsYXN0T2JqZWN0XG4gICAgICAgICAgLCBhdHRyO1xuICAgICAgICBmb3IgKGF0dHIgaW4gd2hpdGVsaXN0KSB7XG4gICAgICAgICAgaWYgKCF3aGl0ZWxpc3RbYXR0cl0pIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2LmZvckVhY2hLZXlJbktleXBhdGgob3csIGF0dHIsIHdoaXRlbGlzdENyZWF0b3IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdztcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gY2xlYW5SZWN1cnNpdmUoYXR0cmlidXRlcywgd2hpdGVsaXN0KSB7XG4gICAgICAgIGlmICghdi5pc09iamVjdChhdHRyaWJ1dGVzKSkge1xuICAgICAgICAgIHJldHVybiBhdHRyaWJ1dGVzO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJldCA9IHYuZXh0ZW5kKHt9LCBhdHRyaWJ1dGVzKVxuICAgICAgICAgICwgd1xuICAgICAgICAgICwgYXR0cmlidXRlO1xuXG4gICAgICAgIGZvciAoYXR0cmlidXRlIGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICB3ID0gd2hpdGVsaXN0W2F0dHJpYnV0ZV07XG5cbiAgICAgICAgICBpZiAodi5pc09iamVjdCh3KSkge1xuICAgICAgICAgICAgcmV0W2F0dHJpYnV0ZV0gPSBjbGVhblJlY3Vyc2l2ZShyZXRbYXR0cmlidXRlXSwgdyk7XG4gICAgICAgICAgfSBlbHNlIGlmICghdykge1xuICAgICAgICAgICAgZGVsZXRlIHJldFthdHRyaWJ1dGVdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuXG4gICAgICBpZiAoIXYuaXNPYmplY3Qod2hpdGVsaXN0KSB8fCAhdi5pc09iamVjdChhdHRyaWJ1dGVzKSkge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9XG5cbiAgICAgIHdoaXRlbGlzdCA9IGJ1aWxkT2JqZWN0V2hpdGVsaXN0KHdoaXRlbGlzdCk7XG4gICAgICByZXR1cm4gY2xlYW5SZWN1cnNpdmUoYXR0cmlidXRlcywgd2hpdGVsaXN0KTtcbiAgICB9LFxuXG4gICAgZXhwb3NlTW9kdWxlOiBmdW5jdGlvbih2YWxpZGF0ZSwgcm9vdCwgZXhwb3J0cywgbW9kdWxlLCBkZWZpbmUpIHtcbiAgICAgIGlmIChleHBvcnRzKSB7XG4gICAgICAgIGlmIChtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgICBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB2YWxpZGF0ZTtcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRzLnZhbGlkYXRlID0gdmFsaWRhdGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb290LnZhbGlkYXRlID0gdmFsaWRhdGU7XG4gICAgICAgIGlmICh2YWxpZGF0ZS5pc0Z1bmN0aW9uKGRlZmluZSkgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAgIGRlZmluZShbXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gdmFsaWRhdGU7IH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHdhcm46IGZ1bmN0aW9uKG1zZykge1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUud2Fybikge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJbdmFsaWRhdGUuanNdIFwiICsgbXNnKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZXJyb3I6IGZ1bmN0aW9uKG1zZykge1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlt2YWxpZGF0ZS5qc10gXCIgKyBtc2cpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgdmFsaWRhdGUudmFsaWRhdG9ycyA9IHtcbiAgICAvLyBQcmVzZW5jZSB2YWxpZGF0ZXMgdGhhdCB0aGUgdmFsdWUgaXNuJ3QgZW1wdHlcbiAgICBwcmVzZW5jZTogZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSB2LmV4dGVuZCh7fSwgdGhpcy5vcHRpb25zLCBvcHRpb25zKTtcbiAgICAgIGlmIChvcHRpb25zLmFsbG93RW1wdHkgPyAhdi5pc0RlZmluZWQodmFsdWUpIDogdi5pc0VtcHR5KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5tZXNzYWdlIHx8IHRoaXMubWVzc2FnZSB8fCBcImNhbid0IGJlIGJsYW5rXCI7XG4gICAgICB9XG4gICAgfSxcbiAgICBsZW5ndGg6IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zLCBhdHRyaWJ1dGUpIHtcbiAgICAgIC8vIEVtcHR5IHZhbHVlcyBhcmUgYWxsb3dlZFxuICAgICAgaWYgKCF2LmlzRGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBvcHRpb25zID0gdi5leHRlbmQoe30sIHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAgIHZhciBpcyA9IG9wdGlvbnMuaXNcbiAgICAgICAgLCBtYXhpbXVtID0gb3B0aW9ucy5tYXhpbXVtXG4gICAgICAgICwgbWluaW11bSA9IG9wdGlvbnMubWluaW11bVxuICAgICAgICAsIHRva2VuaXplciA9IG9wdGlvbnMudG9rZW5pemVyIHx8IGZ1bmN0aW9uKHZhbCkgeyByZXR1cm4gdmFsOyB9XG4gICAgICAgICwgZXJyXG4gICAgICAgICwgZXJyb3JzID0gW107XG5cbiAgICAgIHZhbHVlID0gdG9rZW5pemVyKHZhbHVlKTtcbiAgICAgIHZhciBsZW5ndGggPSB2YWx1ZS5sZW5ndGg7XG4gICAgICBpZighdi5pc051bWJlcihsZW5ndGgpKSB7XG4gICAgICAgIHYuZXJyb3Iodi5mb3JtYXQoXCJBdHRyaWJ1dGUgJXthdHRyfSBoYXMgYSBub24gbnVtZXJpYyB2YWx1ZSBmb3IgYGxlbmd0aGBcIiwge2F0dHI6IGF0dHJpYnV0ZX0pKTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMubWVzc2FnZSB8fCB0aGlzLm5vdFZhbGlkIHx8IFwiaGFzIGFuIGluY29ycmVjdCBsZW5ndGhcIjtcbiAgICAgIH1cblxuICAgICAgLy8gSXMgY2hlY2tzXG4gICAgICBpZiAodi5pc051bWJlcihpcykgJiYgbGVuZ3RoICE9PSBpcykge1xuICAgICAgICBlcnIgPSBvcHRpb25zLndyb25nTGVuZ3RoIHx8XG4gICAgICAgICAgdGhpcy53cm9uZ0xlbmd0aCB8fFxuICAgICAgICAgIFwiaXMgdGhlIHdyb25nIGxlbmd0aCAoc2hvdWxkIGJlICV7Y291bnR9IGNoYXJhY3RlcnMpXCI7XG4gICAgICAgIGVycm9ycy5wdXNoKHYuZm9ybWF0KGVyciwge2NvdW50OiBpc30pKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHYuaXNOdW1iZXIobWluaW11bSkgJiYgbGVuZ3RoIDwgbWluaW11bSkge1xuICAgICAgICBlcnIgPSBvcHRpb25zLnRvb1Nob3J0IHx8XG4gICAgICAgICAgdGhpcy50b29TaG9ydCB8fFxuICAgICAgICAgIFwiaXMgdG9vIHNob3J0IChtaW5pbXVtIGlzICV7Y291bnR9IGNoYXJhY3RlcnMpXCI7XG4gICAgICAgIGVycm9ycy5wdXNoKHYuZm9ybWF0KGVyciwge2NvdW50OiBtaW5pbXVtfSkpO1xuICAgICAgfVxuXG4gICAgICBpZiAodi5pc051bWJlcihtYXhpbXVtKSAmJiBsZW5ndGggPiBtYXhpbXVtKSB7XG4gICAgICAgIGVyciA9IG9wdGlvbnMudG9vTG9uZyB8fFxuICAgICAgICAgIHRoaXMudG9vTG9uZyB8fFxuICAgICAgICAgIFwiaXMgdG9vIGxvbmcgKG1heGltdW0gaXMgJXtjb3VudH0gY2hhcmFjdGVycylcIjtcbiAgICAgICAgZXJyb3JzLnB1c2godi5mb3JtYXQoZXJyLCB7Y291bnQ6IG1heGltdW19KSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5tZXNzYWdlIHx8IGVycm9ycztcbiAgICAgIH1cbiAgICB9LFxuICAgIG51bWVyaWNhbGl0eTogZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgIC8vIEVtcHR5IHZhbHVlcyBhcmUgZmluZVxuICAgICAgaWYgKCF2LmlzRGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBvcHRpb25zID0gdi5leHRlbmQoe30sIHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAgIHZhciBlcnJvcnMgPSBbXVxuICAgICAgICAsIG5hbWVcbiAgICAgICAgLCBjb3VudFxuICAgICAgICAsIGNoZWNrcyA9IHtcbiAgICAgICAgICAgIGdyZWF0ZXJUaGFuOiAgICAgICAgICBmdW5jdGlvbih2LCBjKSB7IHJldHVybiB2ID4gYzsgfSxcbiAgICAgICAgICAgIGdyZWF0ZXJUaGFuT3JFcXVhbFRvOiBmdW5jdGlvbih2LCBjKSB7IHJldHVybiB2ID49IGM7IH0sXG4gICAgICAgICAgICBlcXVhbFRvOiAgICAgICAgICAgICAgZnVuY3Rpb24odiwgYykgeyByZXR1cm4gdiA9PT0gYzsgfSxcbiAgICAgICAgICAgIGxlc3NUaGFuOiAgICAgICAgICAgICBmdW5jdGlvbih2LCBjKSB7IHJldHVybiB2IDwgYzsgfSxcbiAgICAgICAgICAgIGxlc3NUaGFuT3JFcXVhbFRvOiAgICBmdW5jdGlvbih2LCBjKSB7IHJldHVybiB2IDw9IGM7IH0sXG4gICAgICAgICAgICBkaXZpc2libGVCeTogICAgICAgICAgZnVuY3Rpb24odiwgYykgeyByZXR1cm4gdiAlIGMgPT09IDA7IH1cbiAgICAgICAgICB9O1xuXG4gICAgICAvLyBTdHJpY3Qgd2lsbCBjaGVjayB0aGF0IGl0IGlzIGEgdmFsaWQgbG9va2luZyBudW1iZXJcbiAgICAgIGlmICh2LmlzU3RyaW5nKHZhbHVlKSAmJiBvcHRpb25zLnN0cmljdCkge1xuICAgICAgICB2YXIgcGF0dGVybiA9IFwiXigwfFsxLTldXFxcXGQqKVwiO1xuICAgICAgICBpZiAoIW9wdGlvbnMub25seUludGVnZXIpIHtcbiAgICAgICAgICBwYXR0ZXJuICs9IFwiKFxcXFwuXFxcXGQrKT9cIjtcbiAgICAgICAgfVxuICAgICAgICBwYXR0ZXJuICs9IFwiJFwiO1xuXG4gICAgICAgIGlmICghKG5ldyBSZWdFeHAocGF0dGVybikudGVzdCh2YWx1ZSkpKSB7XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnMubWVzc2FnZSB8fFxuICAgICAgICAgICAgb3B0aW9ucy5ub3RWYWxpZCB8fFxuICAgICAgICAgICAgdGhpcy5ub3RWYWxpZCB8fFxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlIHx8XG4gICAgICAgICAgICBcIm11c3QgYmUgYSB2YWxpZCBudW1iZXJcIjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBDb2VyY2UgdGhlIHZhbHVlIHRvIGEgbnVtYmVyIHVubGVzcyB3ZSdyZSBiZWluZyBzdHJpY3QuXG4gICAgICBpZiAob3B0aW9ucy5ub1N0cmluZ3MgIT09IHRydWUgJiYgdi5pc1N0cmluZyh2YWx1ZSkgJiYgIXYuaXNFbXB0eSh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSArdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIGl0J3Mgbm90IGEgbnVtYmVyIHdlIHNob3VsZG4ndCBjb250aW51ZSBzaW5jZSBpdCB3aWxsIGNvbXBhcmUgaXQuXG4gICAgICBpZiAoIXYuaXNOdW1iZXIodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLm1lc3NhZ2UgfHxcbiAgICAgICAgICBvcHRpb25zLm5vdFZhbGlkIHx8XG4gICAgICAgICAgdGhpcy5ub3RWYWxpZCB8fFxuICAgICAgICAgIHRoaXMubWVzc2FnZSB8fFxuICAgICAgICAgIFwiaXMgbm90IGEgbnVtYmVyXCI7XG4gICAgICB9XG5cbiAgICAgIC8vIFNhbWUgbG9naWMgYXMgYWJvdmUsIHNvcnQgb2YuIERvbid0IGJvdGhlciB3aXRoIGNvbXBhcmlzb25zIGlmIHRoaXNcbiAgICAgIC8vIGRvZXNuJ3QgcGFzcy5cbiAgICAgIGlmIChvcHRpb25zLm9ubHlJbnRlZ2VyICYmICF2LmlzSW50ZWdlcih2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMubWVzc2FnZSB8fFxuICAgICAgICAgIG9wdGlvbnMubm90SW50ZWdlciB8fFxuICAgICAgICAgIHRoaXMubm90SW50ZWdlciB8fFxuICAgICAgICAgIHRoaXMubWVzc2FnZSB8fFxuICAgICAgICAgIFwibXVzdCBiZSBhbiBpbnRlZ2VyXCI7XG4gICAgICB9XG5cbiAgICAgIGZvciAobmFtZSBpbiBjaGVja3MpIHtcbiAgICAgICAgY291bnQgPSBvcHRpb25zW25hbWVdO1xuICAgICAgICBpZiAodi5pc051bWJlcihjb3VudCkgJiYgIWNoZWNrc1tuYW1lXSh2YWx1ZSwgY291bnQpKSB7XG4gICAgICAgICAgLy8gVGhpcyBwaWNrcyB0aGUgZGVmYXVsdCBtZXNzYWdlIGlmIHNwZWNpZmllZFxuICAgICAgICAgIC8vIEZvciBleGFtcGxlIHRoZSBncmVhdGVyVGhhbiBjaGVjayB1c2VzIHRoZSBtZXNzYWdlIGZyb21cbiAgICAgICAgICAvLyB0aGlzLm5vdEdyZWF0ZXJUaGFuIHNvIHdlIGNhcGl0YWxpemUgdGhlIG5hbWUgYW5kIHByZXBlbmQgXCJub3RcIlxuICAgICAgICAgIHZhciBrZXkgPSBcIm5vdFwiICsgdi5jYXBpdGFsaXplKG5hbWUpO1xuICAgICAgICAgIHZhciBtc2cgPSBvcHRpb25zW2tleV0gfHxcbiAgICAgICAgICAgIHRoaXNba2V5XSB8fFxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlIHx8XG4gICAgICAgICAgICBcIm11c3QgYmUgJXt0eXBlfSAle2NvdW50fVwiO1xuXG4gICAgICAgICAgZXJyb3JzLnB1c2godi5mb3JtYXQobXNnLCB7XG4gICAgICAgICAgICBjb3VudDogY291bnQsXG4gICAgICAgICAgICB0eXBlOiB2LnByZXR0aWZ5KG5hbWUpXG4gICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLm9kZCAmJiB2YWx1ZSAlIDIgIT09IDEpIHtcbiAgICAgICAgZXJyb3JzLnB1c2gob3B0aW9ucy5ub3RPZGQgfHxcbiAgICAgICAgICAgIHRoaXMubm90T2RkIHx8XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgfHxcbiAgICAgICAgICAgIFwibXVzdCBiZSBvZGRcIik7XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9ucy5ldmVuICYmIHZhbHVlICUgMiAhPT0gMCkge1xuICAgICAgICBlcnJvcnMucHVzaChvcHRpb25zLm5vdEV2ZW4gfHxcbiAgICAgICAgICAgIHRoaXMubm90RXZlbiB8fFxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlIHx8XG4gICAgICAgICAgICBcIm11c3QgYmUgZXZlblwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMubWVzc2FnZSB8fCBlcnJvcnM7XG4gICAgICB9XG4gICAgfSxcbiAgICBkYXRldGltZTogdi5leHRlbmQoZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgIGlmICghdi5pc0Z1bmN0aW9uKHRoaXMucGFyc2UpIHx8ICF2LmlzRnVuY3Rpb24odGhpcy5mb3JtYXQpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJvdGggdGhlIHBhcnNlIGFuZCBmb3JtYXQgZnVuY3Rpb25zIG5lZWRzIHRvIGJlIHNldCB0byB1c2UgdGhlIGRhdGV0aW1lL2RhdGUgdmFsaWRhdG9yXCIpO1xuICAgICAgfVxuXG4gICAgICAvLyBFbXB0eSB2YWx1ZXMgYXJlIGZpbmVcbiAgICAgIGlmICghdi5pc0RlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgb3B0aW9ucyA9IHYuZXh0ZW5kKHt9LCB0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICB2YXIgZXJyXG4gICAgICAgICwgZXJyb3JzID0gW11cbiAgICAgICAgLCBlYXJsaWVzdCA9IG9wdGlvbnMuZWFybGllc3QgPyB0aGlzLnBhcnNlKG9wdGlvbnMuZWFybGllc3QsIG9wdGlvbnMpIDogTmFOXG4gICAgICAgICwgbGF0ZXN0ID0gb3B0aW9ucy5sYXRlc3QgPyB0aGlzLnBhcnNlKG9wdGlvbnMubGF0ZXN0LCBvcHRpb25zKSA6IE5hTjtcblxuICAgICAgdmFsdWUgPSB0aGlzLnBhcnNlKHZhbHVlLCBvcHRpb25zKTtcblxuICAgICAgLy8gODY0MDAwMDAgaXMgdGhlIG51bWJlciBvZiBzZWNvbmRzIGluIGEgZGF5LCB0aGlzIGlzIHVzZWQgdG8gcmVtb3ZlXG4gICAgICAvLyB0aGUgdGltZSBmcm9tIHRoZSBkYXRlXG4gICAgICBpZiAoaXNOYU4odmFsdWUpIHx8IG9wdGlvbnMuZGF0ZU9ubHkgJiYgdmFsdWUgJSA4NjQwMDAwMCAhPT0gMCkge1xuICAgICAgICBlcnIgPSBvcHRpb25zLm5vdFZhbGlkIHx8XG4gICAgICAgICAgb3B0aW9ucy5tZXNzYWdlIHx8XG4gICAgICAgICAgdGhpcy5ub3RWYWxpZCB8fFxuICAgICAgICAgIFwibXVzdCBiZSBhIHZhbGlkIGRhdGVcIjtcbiAgICAgICAgcmV0dXJuIHYuZm9ybWF0KGVyciwge3ZhbHVlOiBhcmd1bWVudHNbMF19KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihlYXJsaWVzdCkgJiYgdmFsdWUgPCBlYXJsaWVzdCkge1xuICAgICAgICBlcnIgPSBvcHRpb25zLnRvb0Vhcmx5IHx8XG4gICAgICAgICAgb3B0aW9ucy5tZXNzYWdlIHx8XG4gICAgICAgICAgdGhpcy50b29FYXJseSB8fFxuICAgICAgICAgIFwibXVzdCBiZSBubyBlYXJsaWVyIHRoYW4gJXtkYXRlfVwiO1xuICAgICAgICBlcnIgPSB2LmZvcm1hdChlcnIsIHtcbiAgICAgICAgICB2YWx1ZTogdGhpcy5mb3JtYXQodmFsdWUsIG9wdGlvbnMpLFxuICAgICAgICAgIGRhdGU6IHRoaXMuZm9ybWF0KGVhcmxpZXN0LCBvcHRpb25zKVxuICAgICAgICB9KTtcbiAgICAgICAgZXJyb3JzLnB1c2goZXJyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihsYXRlc3QpICYmIHZhbHVlID4gbGF0ZXN0KSB7XG4gICAgICAgIGVyciA9IG9wdGlvbnMudG9vTGF0ZSB8fFxuICAgICAgICAgIG9wdGlvbnMubWVzc2FnZSB8fFxuICAgICAgICAgIHRoaXMudG9vTGF0ZSB8fFxuICAgICAgICAgIFwibXVzdCBiZSBubyBsYXRlciB0aGFuICV7ZGF0ZX1cIjtcbiAgICAgICAgZXJyID0gdi5mb3JtYXQoZXJyLCB7XG4gICAgICAgICAgZGF0ZTogdGhpcy5mb3JtYXQobGF0ZXN0LCBvcHRpb25zKSxcbiAgICAgICAgICB2YWx1ZTogdGhpcy5mb3JtYXQodmFsdWUsIG9wdGlvbnMpXG4gICAgICAgIH0pO1xuICAgICAgICBlcnJvcnMucHVzaChlcnIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXJyb3JzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdi51bmlxdWUoZXJyb3JzKTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBwYXJzZTogbnVsbCxcbiAgICAgIGZvcm1hdDogbnVsbFxuICAgIH0pLFxuICAgIGRhdGU6IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gdi5leHRlbmQoe30sIG9wdGlvbnMsIHtkYXRlT25seTogdHJ1ZX0pO1xuICAgICAgcmV0dXJuIHYudmFsaWRhdG9ycy5kYXRldGltZS5jYWxsKHYudmFsaWRhdG9ycy5kYXRldGltZSwgdmFsdWUsIG9wdGlvbnMpO1xuICAgIH0sXG4gICAgZm9ybWF0OiBmdW5jdGlvbih2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgaWYgKHYuaXNTdHJpbmcob3B0aW9ucykgfHwgKG9wdGlvbnMgaW5zdGFuY2VvZiBSZWdFeHApKSB7XG4gICAgICAgIG9wdGlvbnMgPSB7cGF0dGVybjogb3B0aW9uc307XG4gICAgICB9XG5cbiAgICAgIG9wdGlvbnMgPSB2LmV4dGVuZCh7fSwgdGhpcy5vcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgdmFyIG1lc3NhZ2UgPSBvcHRpb25zLm1lc3NhZ2UgfHwgdGhpcy5tZXNzYWdlIHx8IFwiaXMgaW52YWxpZFwiXG4gICAgICAgICwgcGF0dGVybiA9IG9wdGlvbnMucGF0dGVyblxuICAgICAgICAsIG1hdGNoO1xuXG4gICAgICAvLyBFbXB0eSB2YWx1ZXMgYXJlIGFsbG93ZWRcbiAgICAgIGlmICghdi5pc0RlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghdi5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgICB9XG5cbiAgICAgIGlmICh2LmlzU3RyaW5nKHBhdHRlcm4pKSB7XG4gICAgICAgIHBhdHRlcm4gPSBuZXcgUmVnRXhwKG9wdGlvbnMucGF0dGVybiwgb3B0aW9ucy5mbGFncyk7XG4gICAgICB9XG4gICAgICBtYXRjaCA9IHBhdHRlcm4uZXhlYyh2YWx1ZSk7XG4gICAgICBpZiAoIW1hdGNoIHx8IG1hdGNoWzBdLmxlbmd0aCAhPSB2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgICB9XG4gICAgfSxcbiAgICBpbmNsdXNpb246IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zKSB7XG4gICAgICAvLyBFbXB0eSB2YWx1ZXMgYXJlIGZpbmVcbiAgICAgIGlmICghdi5pc0RlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh2LmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgICAgb3B0aW9ucyA9IHt3aXRoaW46IG9wdGlvbnN9O1xuICAgICAgfVxuICAgICAgb3B0aW9ucyA9IHYuZXh0ZW5kKHt9LCB0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgaWYgKHYuY29udGFpbnMob3B0aW9ucy53aXRoaW4sIHZhbHVlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgbWVzc2FnZSA9IG9wdGlvbnMubWVzc2FnZSB8fFxuICAgICAgICB0aGlzLm1lc3NhZ2UgfHxcbiAgICAgICAgXCJeJXt2YWx1ZX0gaXMgbm90IGluY2x1ZGVkIGluIHRoZSBsaXN0XCI7XG4gICAgICByZXR1cm4gdi5mb3JtYXQobWVzc2FnZSwge3ZhbHVlOiB2YWx1ZX0pO1xuICAgIH0sXG4gICAgZXhjbHVzaW9uOiBmdW5jdGlvbih2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgLy8gRW1wdHkgdmFsdWVzIGFyZSBmaW5lXG4gICAgICBpZiAoIXYuaXNEZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodi5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICAgIG9wdGlvbnMgPSB7d2l0aGluOiBvcHRpb25zfTtcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMgPSB2LmV4dGVuZCh7fSwgdGhpcy5vcHRpb25zLCBvcHRpb25zKTtcbiAgICAgIGlmICghdi5jb250YWlucyhvcHRpb25zLndpdGhpbiwgdmFsdWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBtZXNzYWdlID0gb3B0aW9ucy5tZXNzYWdlIHx8IHRoaXMubWVzc2FnZSB8fCBcIl4le3ZhbHVlfSBpcyByZXN0cmljdGVkXCI7XG4gICAgICByZXR1cm4gdi5mb3JtYXQobWVzc2FnZSwge3ZhbHVlOiB2YWx1ZX0pO1xuICAgIH0sXG4gICAgZW1haWw6IHYuZXh0ZW5kKGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gdi5leHRlbmQoe30sIHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICB2YXIgbWVzc2FnZSA9IG9wdGlvbnMubWVzc2FnZSB8fCB0aGlzLm1lc3NhZ2UgfHwgXCJpcyBub3QgYSB2YWxpZCBlbWFpbFwiO1xuICAgICAgLy8gRW1wdHkgdmFsdWVzIGFyZSBmaW5lXG4gICAgICBpZiAoIXYuaXNEZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIXYuaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLlBBVFRFUk4uZXhlYyh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAgUEFUVEVSTjogL15bYS16MC05XFx1MDA3Ri1cXHVmZmZmISMkJSYnKitcXC89P15fYHt8fX4tXSsoPzpcXC5bYS16MC05XFx1MDA3Ri1cXHVmZmZmISMkJSYnKitcXC89P15fYHt8fX4tXSspKkAoPzpbYS16MC05XSg/OlthLXowLTktXSpbYS16MC05XSk/XFwuKStbYS16XXsyLH0kL2lcbiAgICB9KSxcbiAgICBlcXVhbGl0eTogZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMsIGF0dHJpYnV0ZSwgYXR0cmlidXRlcykge1xuICAgICAgaWYgKCF2LmlzRGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodi5pc1N0cmluZyhvcHRpb25zKSkge1xuICAgICAgICBvcHRpb25zID0ge2F0dHJpYnV0ZTogb3B0aW9uc307XG4gICAgICB9XG4gICAgICBvcHRpb25zID0gdi5leHRlbmQoe30sIHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICB2YXIgbWVzc2FnZSA9IG9wdGlvbnMubWVzc2FnZSB8fFxuICAgICAgICB0aGlzLm1lc3NhZ2UgfHxcbiAgICAgICAgXCJpcyBub3QgZXF1YWwgdG8gJXthdHRyaWJ1dGV9XCI7XG5cbiAgICAgIGlmICh2LmlzRW1wdHkob3B0aW9ucy5hdHRyaWJ1dGUpIHx8ICF2LmlzU3RyaW5nKG9wdGlvbnMuYXR0cmlidXRlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgYXR0cmlidXRlIG11c3QgYmUgYSBub24gZW1wdHkgc3RyaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICB2YXIgb3RoZXJWYWx1ZSA9IHYuZ2V0RGVlcE9iamVjdFZhbHVlKGF0dHJpYnV0ZXMsIG9wdGlvbnMuYXR0cmlidXRlKVxuICAgICAgICAsIGNvbXBhcmF0b3IgPSBvcHRpb25zLmNvbXBhcmF0b3IgfHwgZnVuY3Rpb24odjEsIHYyKSB7XG4gICAgICAgICAgcmV0dXJuIHYxID09PSB2MjtcbiAgICAgICAgfTtcblxuICAgICAgaWYgKCFjb21wYXJhdG9yKHZhbHVlLCBvdGhlclZhbHVlLCBvcHRpb25zLCBhdHRyaWJ1dGUsIGF0dHJpYnV0ZXMpKSB7XG4gICAgICAgIHJldHVybiB2LmZvcm1hdChtZXNzYWdlLCB7YXR0cmlidXRlOiB2LnByZXR0aWZ5KG9wdGlvbnMuYXR0cmlidXRlKX0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBBIFVSTCB2YWxpZGF0b3IgdGhhdCBpcyB1c2VkIHRvIHZhbGlkYXRlIFVSTHMgd2l0aCB0aGUgYWJpbGl0eSB0b1xuICAgIC8vIHJlc3RyaWN0IHNjaGVtZXMgYW5kIHNvbWUgZG9tYWlucy5cbiAgICB1cmw6IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zKSB7XG4gICAgICBpZiAoIXYuaXNEZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIG9wdGlvbnMgPSB2LmV4dGVuZCh7fSwgdGhpcy5vcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgdmFyIG1lc3NhZ2UgPSBvcHRpb25zLm1lc3NhZ2UgfHwgdGhpcy5tZXNzYWdlIHx8IFwiaXMgbm90IGEgdmFsaWQgdXJsXCJcbiAgICAgICAgLCBzY2hlbWVzID0gb3B0aW9ucy5zY2hlbWVzIHx8IHRoaXMuc2NoZW1lcyB8fCBbJ2h0dHAnLCAnaHR0cHMnXVxuICAgICAgICAsIGFsbG93TG9jYWwgPSBvcHRpb25zLmFsbG93TG9jYWwgfHwgdGhpcy5hbGxvd0xvY2FsIHx8IGZhbHNlO1xuXG4gICAgICBpZiAoIXYuaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgICAgfVxuXG4gICAgICAvLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9kcGVyaW5pLzcyOTI5NFxuICAgICAgdmFyIHJlZ2V4ID1cbiAgICAgICAgXCJeXCIgK1xuICAgICAgICAvLyBwcm90b2NvbCBpZGVudGlmaWVyXG4gICAgICAgIFwiKD86KD86XCIgKyBzY2hlbWVzLmpvaW4oXCJ8XCIpICsgXCIpOi8vKVwiICtcbiAgICAgICAgLy8gdXNlcjpwYXNzIGF1dGhlbnRpY2F0aW9uXG4gICAgICAgIFwiKD86XFxcXFMrKD86OlxcXFxTKik/QCk/XCIgK1xuICAgICAgICBcIig/OlwiO1xuXG4gICAgICB2YXIgdGxkID0gXCIoPzpcXFxcLig/OlthLXpcXFxcdTAwYTEtXFxcXHVmZmZmXXsyLH0pKVwiO1xuXG4gICAgICBpZiAoYWxsb3dMb2NhbCkge1xuICAgICAgICB0bGQgKz0gXCI/XCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWdleCArPVxuICAgICAgICAgIC8vIElQIGFkZHJlc3MgZXhjbHVzaW9uXG4gICAgICAgICAgLy8gcHJpdmF0ZSAmIGxvY2FsIG5ldHdvcmtzXG4gICAgICAgICAgXCIoPyEoPzoxMHwxMjcpKD86XFxcXC5cXFxcZHsxLDN9KXszfSlcIiArXG4gICAgICAgICAgXCIoPyEoPzoxNjlcXFxcLjI1NHwxOTJcXFxcLjE2OCkoPzpcXFxcLlxcXFxkezEsM30pezJ9KVwiICtcbiAgICAgICAgICBcIig/ITE3MlxcXFwuKD86MVs2LTldfDJcXFxcZHwzWzAtMV0pKD86XFxcXC5cXFxcZHsxLDN9KXsyfSlcIjtcbiAgICAgIH1cblxuICAgICAgcmVnZXggKz1cbiAgICAgICAgICAvLyBJUCBhZGRyZXNzIGRvdHRlZCBub3RhdGlvbiBvY3RldHNcbiAgICAgICAgICAvLyBleGNsdWRlcyBsb29wYmFjayBuZXR3b3JrIDAuMC4wLjBcbiAgICAgICAgICAvLyBleGNsdWRlcyByZXNlcnZlZCBzcGFjZSA+PSAyMjQuMC4wLjBcbiAgICAgICAgICAvLyBleGNsdWRlcyBuZXR3b3JrICYgYnJvYWNhc3QgYWRkcmVzc2VzXG4gICAgICAgICAgLy8gKGZpcnN0ICYgbGFzdCBJUCBhZGRyZXNzIG9mIGVhY2ggY2xhc3MpXG4gICAgICAgICAgXCIoPzpbMS05XVxcXFxkP3wxXFxcXGRcXFxcZHwyWzAxXVxcXFxkfDIyWzAtM10pXCIgK1xuICAgICAgICAgIFwiKD86XFxcXC4oPzoxP1xcXFxkezEsMn18MlswLTRdXFxcXGR8MjVbMC01XSkpezJ9XCIgK1xuICAgICAgICAgIFwiKD86XFxcXC4oPzpbMS05XVxcXFxkP3wxXFxcXGRcXFxcZHwyWzAtNF1cXFxcZHwyNVswLTRdKSlcIiArXG4gICAgICAgIFwifFwiICtcbiAgICAgICAgICAvLyBob3N0IG5hbWVcbiAgICAgICAgICBcIig/Oig/OlthLXpcXFxcdTAwYTEtXFxcXHVmZmZmMC05XS0qKSpbYS16XFxcXHUwMGExLVxcXFx1ZmZmZjAtOV0rKVwiICtcbiAgICAgICAgICAvLyBkb21haW4gbmFtZVxuICAgICAgICAgIFwiKD86XFxcXC4oPzpbYS16XFxcXHUwMGExLVxcXFx1ZmZmZjAtOV0tKikqW2EtelxcXFx1MDBhMS1cXFxcdWZmZmYwLTldKykqXCIgK1xuICAgICAgICAgIHRsZCArXG4gICAgICAgIFwiKVwiICtcbiAgICAgICAgLy8gcG9ydCBudW1iZXJcbiAgICAgICAgXCIoPzo6XFxcXGR7Miw1fSk/XCIgK1xuICAgICAgICAvLyByZXNvdXJjZSBwYXRoXG4gICAgICAgIFwiKD86Wy8/I11cXFxcUyopP1wiICtcbiAgICAgIFwiJFwiO1xuXG4gICAgICB2YXIgUEFUVEVSTiA9IG5ldyBSZWdFeHAocmVnZXgsICdpJyk7XG4gICAgICBpZiAoIVBBVFRFUk4uZXhlYyh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhbGlkYXRlLmZvcm1hdHRlcnMgPSB7XG4gICAgZGV0YWlsZWQ6IGZ1bmN0aW9uKGVycm9ycykge3JldHVybiBlcnJvcnM7fSxcbiAgICBmbGF0OiB2LmZsYXR0ZW5FcnJvcnNUb0FycmF5LFxuICAgIGdyb3VwZWQ6IGZ1bmN0aW9uKGVycm9ycykge1xuICAgICAgdmFyIGF0dHI7XG5cbiAgICAgIGVycm9ycyA9IHYuZ3JvdXBFcnJvcnNCeUF0dHJpYnV0ZShlcnJvcnMpO1xuICAgICAgZm9yIChhdHRyIGluIGVycm9ycykge1xuICAgICAgICBlcnJvcnNbYXR0cl0gPSB2LmZsYXR0ZW5FcnJvcnNUb0FycmF5KGVycm9yc1thdHRyXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZXJyb3JzO1xuICAgIH0sXG4gICAgY29uc3RyYWludDogZnVuY3Rpb24oZXJyb3JzKSB7XG4gICAgICB2YXIgYXR0cjtcbiAgICAgIGVycm9ycyA9IHYuZ3JvdXBFcnJvcnNCeUF0dHJpYnV0ZShlcnJvcnMpO1xuICAgICAgZm9yIChhdHRyIGluIGVycm9ycykge1xuICAgICAgICBlcnJvcnNbYXR0cl0gPSBlcnJvcnNbYXR0cl0ubWFwKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQudmFsaWRhdG9yO1xuICAgICAgICB9KS5zb3J0KCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZXJyb3JzO1xuICAgIH1cbiAgfTtcblxuICB2YWxpZGF0ZS5leHBvc2VNb2R1bGUodmFsaWRhdGUsIHRoaXMsIGV4cG9ydHMsIG1vZHVsZSwgZGVmaW5lKTtcbn0pLmNhbGwodGhpcyxcbiAgICAgICAgdHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnID8gLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gZXhwb3J0cyA6IG51bGwsXG4gICAgICAgIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gbW9kdWxlIDogbnVsbCxcbiAgICAgICAgdHlwZW9mIGRlZmluZSAhPT0gJ3VuZGVmaW5lZCcgPyAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyBkZWZpbmUgOiBudWxsKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy92YWxpZGF0ZS5qcy92YWxpZGF0ZS5qcyIsIlxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Jpbi9lcnJvcicpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2N1c3RvbS1lcnJvci1pbnN0YW5jZS9pbmRleC5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEN1c3RvbUVycm9yO1xuQ3VzdG9tRXJyb3IuZmFjdG9yeSA9IHJlcXVpcmUoJy4vZmFjdG9yaWVzLmpzJyk7XG5cbnZhciBFcnIgPSBDdXN0b21FcnJvcignQ3VzdG9tRXJyb3InKTtcbkVyci5vcmRlciA9IEN1c3RvbUVycm9yKEVyciwgeyBtZXNzYWdlOiAnQXJndW1lbnRzIG91dCBvZiBvcmRlci4nLCBjb2RlOiAnRU9BUkcnIH0pO1xuXG4vKipcbiAqIENyZWF0ZSBhIGN1c3RvbSBlcnJvclxuICogQHBhcmFtIHtzdHJpbmd9IFtuYW1lXSBUaGUgbmFtZSB0byBnaXZlIHRoZSBlcnJvci4gRGVmYXVsdHMgdG8gdGhlIG5hbWUgb2YgaXQncyBwYXJlbnQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBbcGFyZW50XSBUaGUgRXJyb3Igb3IgQ3VzdG9tRXJyb3IgY29uc3RydWN0b3IgdG8gaW5oZXJpdCBmcm9tLlxuICogQHBhcmFtIHtvYmplY3R9IFtwcm9wZXJ0aWVzXSBUaGUgZGVmYXVsdCBwcm9wZXJ0aWVzIGZvciB0aGUgY3VzdG9tIGVycm9yLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gW2ZhY3RvcnldIEEgZnVuY3Rpb24gdG8gY2FsbCB0byBtb2RpZnkgdGhlIGN1c3RvbSBlcnJvciBpbnN0YW5jZSB3aGVuIGl0IGlzIGluc3RhbnRpYXRlZC5cbiAqIEByZXR1cm5zIHtmdW5jdGlvbn0gdGhhdCBzaG91bGQgYmUgdXNlZCBhcyBhIGNvbnN0cnVjdG9yLlxuICovXG5mdW5jdGlvbiBDdXN0b21FcnJvcihuYW1lLCBwYXJlbnQsIHByb3BlcnRpZXMsIGZhY3RvcnkpIHtcbiAgICB2YXIgY29uc3RydWN0O1xuICAgIHZhciBpc1Jvb3Q7XG5cbiAgICAvLyBub3JtYWxpemUgYXJndW1lbnRzXG4gICAgcGFyZW50ID0gZmluZEFyZyhhcmd1bWVudHMsIDEsIEVycm9yLCBpc1BhcmVudEFyZywgW2lzUHJvcGVydGllc0FyZywgaXNGYWN0b3J5QXJnXSk7XG4gICAgcHJvcGVydGllcyA9IGZpbmRBcmcoYXJndW1lbnRzLCAyLCB7fSwgaXNQcm9wZXJ0aWVzQXJnLCBbaXNGYWN0b3J5QXJnXSk7XG4gICAgZmFjdG9yeSA9IGZpbmRBcmcoYXJndW1lbnRzLCAzLCBub29wLCBpc0ZhY3RvcnlBcmcsIFtdKTtcbiAgICBuYW1lID0gZmluZEFyZyhhcmd1bWVudHMsIDAsIHBhcmVudCA9PT0gRXJyb3IgPyAnRXJyb3InIDogcGFyZW50LnByb3RvdHlwZS5DdXN0b21FcnJvci5uYW1lLCBpc05hbWVBcmcsIFtpc1BhcmVudEFyZywgaXNQcm9wZXJ0aWVzQXJnLCBpc0ZhY3RvcnlBcmddKTtcblxuICAgIC8vIGlmIHRoaXMgaXMgdGhlIHJvb3QgYW5kIHRoZWlyIGlzIG5vIGZhY3RvcnkgdGhlbiB1c2UgdGhlIGRlZmF1bHQgcm9vdCBmYWN0b3J5XG4gICAgaXNSb290ID0gcGFyZW50ID09PSBFcnJvcjtcbiAgICBpZiAoaXNSb290ICYmIGZhY3RvcnkgPT09IG5vb3ApIGZhY3RvcnkgPSBDdXN0b21FcnJvci5mYWN0b3J5LnJvb3Q7XG5cbiAgICAvLyBidWlsZCB0aGUgY29uc3RydWN0b3IgZnVuY3Rpb25cbiAgICBjb25zdHJ1Y3QgPSBmdW5jdGlvbihtZXNzYWdlLCBjb25maWd1cmF0aW9uKSB7XG4gICAgICAgIHZhciBfdGhpcztcbiAgICAgICAgdmFyIGFyO1xuICAgICAgICB2YXIgZmFjdG9yaWVzO1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgdmFyIGl0ZW07XG4gICAgICAgIHZhciBwcm9wcztcblxuICAgICAgICAvLyBmb3JjZSB0aGlzIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aXRoIHRoZSBuZXcga2V5d29yZFxuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgY29uc3RydWN0KSkgcmV0dXJuIG5ldyBjb25zdHJ1Y3QobWVzc2FnZSwgY29uZmlndXJhdGlvbik7XG5cbiAgICAgICAgLy8gcmVuYW1lIHRoZSBjb25zdHJ1Y3RvclxuICAgICAgICBkZWxldGUgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5jb25zdHJ1Y3RvciwgJ25hbWUnLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBuYW1lLFxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHRoZSBtZXNzYWdlIGlzIGFuIG9iamVjdFxuICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgPT09ICdzdHJpbmcnKSBtZXNzYWdlID0geyBtZXNzYWdlOiBtZXNzYWdlIH07XG4gICAgICAgIGlmICghbWVzc2FnZSkgbWVzc2FnZSA9IHt9O1xuXG4gICAgICAgIC8vIGJ1aWxkIHRoZSBwcm9wZXJ0aWVzIG9iamVjdFxuICAgICAgICBhciA9IHRoaXMuQ3VzdG9tRXJyb3IuY2hhaW4uc2xpY2UoMCkucmV2ZXJzZSgpLm1hcChmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWUucHJvcGVydGllcyB9KTtcbiAgICAgICAgYXIucHVzaChtZXNzYWdlKTtcbiAgICAgICAgYXIudW5zaGlmdCh7fSk7XG4gICAgICAgIHByb3BzID0gT2JqZWN0LmFzc2lnbi5hcHBseShPYmplY3QsIGFyKTtcblxuICAgICAgICAvLyBidWlsZCB0aGUgZmFjdG9yaWVzIGNhbGxlciAoZm9yY2luZyBzY29wZSB0byB0aGlzKVxuICAgICAgICBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGZhY3RvcmllcyA9IHt9O1xuICAgICAgICBPYmplY3Qua2V5cyhDdXN0b21FcnJvci5mYWN0b3J5KS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgZmFjdG9yaWVzW2tleV0gPSBmdW5jdGlvbihwcm9wcywgY29uZmlnKSB7XG4gICAgICAgICAgICAgICAgQ3VzdG9tRXJyb3IuZmFjdG9yeVtrZXldLmNhbGwoX3RoaXMsIHByb3BzLCBjb25maWcsIGZhY3Rvcmllcyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjYWxsIGVhY2ggZmFjdG9yeSBpbiB0aGUgY2hhaW4sIHN0YXJ0aW5nIGF0IHRoZSByb290XG4gICAgICAgIGZvciAoaSA9IHRoaXMuQ3VzdG9tRXJyb3IuY2hhaW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGl0ZW0gPSB0aGlzLkN1c3RvbUVycm9yLmNoYWluW2ldO1xuICAgICAgICAgICAgaWYgKGl0ZW0uZmFjdG9yeSAhPT0gbm9vcCkge1xuICAgICAgICAgICAgICAgIGl0ZW0uZmFjdG9yeS5jYWxsKHRoaXMsIHByb3BzLCBjb25maWd1cmF0aW9uLCBmYWN0b3JpZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIGNhdXNlIHRoZSBmdW5jdGlvbiBwcm90b3R5cGUgdG8gaW5oZXJpdCBmcm9tIHBhcmVudCdzIHByb3RvdHlwZVxuICAgIGNvbnN0cnVjdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHBhcmVudC5wcm90b3R5cGUpO1xuICAgIGNvbnN0cnVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3Q7XG5cbiAgICAvLyB1cGRhdGUgZXJyb3IgbmFtZVxuICAgIGNvbnN0cnVjdC5wcm90b3R5cGUubmFtZSA9IG5hbWU7XG5cbiAgICAvLyBhZGQgZGV0YWlscyBhYm91dCB0aGUgY3VzdG9tIGVycm9yIHRvIHRoZSBwcm90b3R5cGVcbiAgICBjb25zdHJ1Y3QucHJvdG90eXBlLkN1c3RvbUVycm9yID0ge1xuICAgICAgICBjaGFpbjogaXNSb290ID8gW10gOiBwYXJlbnQucHJvdG90eXBlLkN1c3RvbUVycm9yLmNoYWluLnNsaWNlKDApLFxuICAgICAgICBmYWN0b3J5OiBmYWN0b3J5LFxuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICAgICAgcHJvcGVydGllczogcHJvcGVydGllc1xuICAgIH07XG4gICAgY29uc3RydWN0LnByb3RvdHlwZS5DdXN0b21FcnJvci5jaGFpbi51bnNoaWZ0KGNvbnN0cnVjdC5wcm90b3R5cGUuQ3VzdG9tRXJyb3IpO1xuXG4gICAgLy8gdXBkYXRlIHRoZSB0b1N0cmluZyBtZXRob2Qgb24gdGhlIHByb3RvdHlwZSB0byBhY2NlcHQgYSBjb2RlXG4gICAgY29uc3RydWN0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5DdXN0b21FcnJvci5jaGFpblt0aGlzLkN1c3RvbUVycm9yLmNoYWluLmxlbmd0aCAtIDFdLm5hbWU7XG4gICAgICAgIGlmICh0aGlzLmNvZGUpIHJlc3VsdCAgKz0gJyAnICsgdGhpcy5jb2RlO1xuICAgICAgICBpZiAodGhpcy5tZXNzYWdlKSByZXN1bHQgKz0gJzogJyArIHRoaXMubWVzc2FnZTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGNvbnN0cnVjdDtcbn1cblxuXG5cblxuZnVuY3Rpb24gZmluZEFyZyhhcmdzLCBpbmRleCwgZGVmYXVsdFZhbHVlLCBmaWx0ZXIsIGFudGlGaWx0ZXJzKSB7XG4gICAgdmFyIGFudGkgPSAtMTtcbiAgICB2YXIgZm91bmQgPSAtMTtcbiAgICB2YXIgaTtcbiAgICB2YXIgajtcbiAgICB2YXIgbGVuID0gaW5kZXggPCBhcmdzLmxlbmd0aCA/IGluZGV4IDogYXJncy5sZW5ndGg7XG4gICAgdmFyIHZhbDtcblxuICAgIGZvciAoaSA9IDA7IGkgPD0gbGVuOyBpKyspIHtcbiAgICAgICAgdmFsID0gYXJnc1tpXTtcbiAgICAgICAgaWYgKGFudGkgPT09IC0xKSB7XG4gICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgYW50aUZpbHRlcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYW50aUZpbHRlcnNbal0odmFsKSkgYW50aSA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZvdW5kID09PSAtMSAmJiBmaWx0ZXIodmFsKSkge1xuICAgICAgICAgICAgZm91bmQgPSBpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGZvdW5kICE9PSAtMSAmJiBhbnRpICE9PSAtMSAmJiBhbnRpIDwgZm91bmQpIHRocm93IG5ldyBFcnIub3JkZXIoKTtcbiAgICByZXR1cm4gZm91bmQgIT09IC0xID9hcmdzW2ZvdW5kXSA6IGRlZmF1bHRWYWx1ZTtcbn1cblxuZnVuY3Rpb24gaXNGYWN0b3J5QXJnKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB2YWx1ZSAhPT0gRXJyb3IgJiYgIXZhbHVlLnByb3RvdHlwZS5DdXN0b21FcnJvcjtcbn1cblxuZnVuY3Rpb24gaXNOYW1lQXJnKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XG59XG5cbmZ1bmN0aW9uIGlzUGFyZW50QXJnKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiAodmFsdWUgPT09IEVycm9yIHx8IHZhbHVlLnByb3RvdHlwZS5DdXN0b21FcnJvcik7XG59XG5cbmZ1bmN0aW9uIGlzUHJvcGVydGllc0FyZyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnO1xufVxuXG5mdW5jdGlvbiBub29wKCkge31cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvY3VzdG9tLWVycm9yLWluc3RhbmNlL2Jpbi9lcnJvci5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLmV4cGVjdFJlY2VpdmUgPSBmdW5jdGlvbihwcm9wZXJ0aWVzLCBjb25maWd1cmF0aW9uLCBmYWN0b3J5KSB7XG4gICAgdmFyIG1lc3NhZ2U7XG4gICAgZmFjdG9yeS5yb290KHByb3BlcnRpZXMsIGNvbmZpZ3VyYXRpb24sIGZhY3RvcnkpO1xuXG4gICAgbWVzc2FnZSA9IHRoaXMubWVzc2FnZTtcbiAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSgnZXhwZWN0ZWQnKSkgbWVzc2FnZSArPSAnIEV4cGVjdGVkICcgKyBwcm9wZXJ0aWVzLmV4cGVjdGVkICsgJy4nO1xuICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KCdyZWNlaXZlZCcpKSBtZXNzYWdlICs9ICcgUmVjZWl2ZWQ6ICcgKyBwcm9wZXJ0aWVzLnJlY2VpdmVkICsgJy4nO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59O1xuXG5leHBvcnRzLnJvb3QgPSBmdW5jdGlvbihwcm9wZXJ0aWVzLCBjb25maWd1cmF0aW9uLCBmYWN0b3JpZXMpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciBjb2RlO1xuICAgIHZhciBjb25maWcgPSB7IHN0YWNrTGVuZ3RoOiBFcnJvci5zdGFja1RyYWNlTGltaXQsIHJvb3RPbmx5OiB0cnVlIH07XG4gICAgdmFyIG1lc3NhZ2VTdHIgPSAnJztcbiAgICB2YXIgb3JpZ2luYWxTdGFja0xlbmd0aCA9IEVycm9yLnN0YWNrVHJhY2VMaW1pdDtcbiAgICB2YXIgc3RhY2s7XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVTdGFjaygpIHtcbiAgICAgICAgc3RhY2tbMF0gPSBfdGhpcy50b1N0cmluZygpO1xuICAgICAgICBfdGhpcy5zdGFjayA9IHN0YWNrLmpvaW4oJ1xcbicpO1xuICAgIH1cblxuICAgIC8vIGdldCBjb25maWd1cmF0aW9uIG9wdGlvbnNcbiAgICBpZiAoIWNvbmZpZ3VyYXRpb24gfHwgdHlwZW9mIGNvbmZpZ3VyYXRpb24gIT09ICdvYmplY3QnKSBjb25maWd1cmF0aW9uID0ge307XG4gICAgaWYgKGNvbmZpZ3VyYXRpb24uaGFzT3duUHJvcGVydHkoJ3N0YWNrTGVuZ3RoJykgJiZcbiAgICAgICAgdHlwZW9mIGNvbmZpZ3VyYXRpb24uc3RhY2tMZW5ndGggPT09ICdudW1iZXInICYmXG4gICAgICAgICFpc05hTihjb25maWd1cmF0aW9uLnN0YWNrTGVuZ3RoKSAmJlxuICAgICAgICBjb25maWd1cmF0aW9uLnN0YWNrTGVuZ3RoID49IDApIGNvbmZpZy5zdGFja0xlbmd0aCA9IGNvbmZpZ3VyYXRpb24uc3RhY2tMZW5ndGg7XG4gICAgaWYgKCFjb25maWd1cmF0aW9uLmhhc093blByb3BlcnR5KCdyb290T25seScpKSBjb25maWcucm9vdE9ubHkgPSBjb25maWd1cmF0aW9uLnJvb3RPbmx5O1xuXG4gICAgLy8gY2hlY2sgaWYgdGhpcyBzaG91bGQgb25seSBiZSBydW4gYXMgcm9vdFxuICAgIGlmICghY29uZmlnLnJvb3RPbmx5IHx8IHRoaXMuQ3VzdG9tRXJyb3IucGFyZW50ID09PSBFcnJvcikge1xuXG4gICAgICAgIC8vIGNvcHkgcHJvcGVydGllcyBvbnRvIHRoaXMgb2JqZWN0XG4gICAgICAgIE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICBzd2l0Y2goa2V5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnY29kZSc6XG4gICAgICAgICAgICAgICAgICAgIGNvZGUgPSBwcm9wZXJ0aWVzLmNvZGUgfHwgdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtZXNzYWdlJzpcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZVN0ciA9IHByb3BlcnRpZXMubWVzc2FnZSB8fCAnJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgX3RoaXNba2V5XSA9IHByb3BlcnRpZXNba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZ2VuZXJhdGUgdGhlIHN0YWNrIHRyYWNlXG4gICAgICAgIEVycm9yLnN0YWNrVHJhY2VMaW1pdCA9IGNvbmZpZy5zdGFja0xlbmd0aCArIDI7XG4gICAgICAgIHN0YWNrID0gKG5ldyBFcnJvcigpKS5zdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgICAgIHN0YWNrLnNwbGljZSgwLCAzKTtcbiAgICAgICAgc3RhY2sudW5zaGlmdCgnJyk7XG4gICAgICAgIEVycm9yLnN0YWNrVHJhY2VMaW1pdCA9IG9yaWdpbmFsU3RhY2tMZW5ndGg7XG4gICAgICAgIHRoaXMuc3RhY2sgPSBzdGFjay5qb2luKCdcXG4nKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NvZGUnLCB7XG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29kZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgY29kZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHVwZGF0ZVN0YWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbWVzc2FnZScsIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlU3RyO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlU3RyID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdXBkYXRlU3RhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuICAgICAgICB1cGRhdGVTdGFjaygpO1xuXG4gICAgfVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvY3VzdG9tLWVycm9yLWluc3RhbmNlL2Jpbi9mYWN0b3JpZXMuanMiLCJmdW5jdGlvbiBub3JtYWxpemVSZXNwb25zZSggcHJvbWlzZSwgb3B0aW9ucyApIHtcbiAgICByZXR1cm4gcHJvbWlzZS50aGVuKCggZGF0YSApID0+IHtcbiAgICAgICAgaWYgKCB0eXBlb2Ygb3B0aW9ucy5jYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyApIHtcbiAgICAgICAgICAgIG9wdGlvbnMuY2FsbGJhY2soIG51bGwsIGRhdGEgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIHR5cGVvZiBvcHRpb25zLnN1Y2Nlc3MgPT09ICdmdW5jdGlvbicgKSB7XG4gICAgICAgICAgICBvcHRpb25zLnN1Y2Nlc3MoIGRhdGEgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9KVxuICAgIC5jYXRjaCgoIGVycm9yICkgPT4ge1xuICAgICAgICBpZiAoIHR5cGVvZiBvcHRpb25zLmNhbGxiYWNrID09PSAnZnVuY3Rpb24nICkge1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMuY2FsbGJhY2soIGVycm9yICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCB0eXBlb2Ygb3B0aW9ucy5lcnJvciA9PT0gJ2Z1bmN0aW9uJyApIHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zLmVycm9yKCBlcnJvciApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCggZXJyb3IgKTtcbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBub3JtYWxpemVSZXNwb25zZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy92YWxpZGF0ZS9ub3JtYWxpemVSZXNwb25zZS5qcyIsImNsYXNzIEJyaW5rYml0RXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKCBldmVudFR5cGUsIHJlc3BvbnNlICkge1xuICAgICAgICB0aGlzLnR5cGUgPSBldmVudFR5cGU7XG4gICAgICAgIHRoaXMucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQnJpbmtiaXRFdmVudDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ldmVudHMvaW5kZXguanMiLCJjb25zdCBWYWxpZGF0aW9uRXJyb3IgPSByZXF1aXJlKCAnLi92YWxpZGF0ZS92YWxpZGF0aW9uRXJyb3InICk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGVuc3VyZVByb21pc2U6IGZ1bmN0aW9uIGVuc3VyZVByb21pc2UoIHZhbHVlICkge1xuICAgICAgICBpZiAoIHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcgKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCB2YWx1ZSApO1xuICAgICAgICBpZiAoIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nICkgcmV0dXJuIHZhbHVlO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB2YWx1ZSBpbnN0YW5jZW9mIEVycm9yIHx8XG4gICAgICAgICAgICB2YWx1ZSBpbnN0YW5jZW9mIFR5cGVFcnJvclxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCggdmFsdWUgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCB2YWx1ZSApO1xuICAgIH0sXG4gICAgcHJvbWlzaWZ5VmFsaWRhdGlvbjogZnVuY3Rpb24gcHJvbWlzaWZ5VmFsaWRhdGlvbiggdmFsdWUgKSB7XG4gICAgICAgIGlmICggdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyApIHtcbiAgICAgICAgICAgIGlmICggdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbicgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgdmFsdWUgaW5zdGFuY2VvZiBWYWxpZGF0aW9uRXJyb3IgfHxcbiAgICAgICAgICAgICAgICB2YWx1ZSBpbnN0YW5jZW9mIEVycm9yIHx8XG4gICAgICAgICAgICAgICAgdmFsdWUgaW5zdGFuY2VvZiBUeXBlRXJyb3JcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCggdmFsdWUgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFZhbGlkYXRpb25FcnJvcigpO1xuICAgICAgICAgICAgZXJyb3IuZGV0YWlscyA9IHZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCBlcnJvciApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCB2YWx1ZSApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlsLmpzIiwiY29uc3QgYW5hbHl0aWNzID0gcmVxdWlyZSggJy4vYW5hbHl0aWNzJyApO1xuY29uc3QgZ2FtZURhdGEgPSByZXF1aXJlKCAnLi9nYW1lRGF0YScgKTtcbmNvbnN0IHBsYXllckRhdGEgPSByZXF1aXJlKCAnLi9wbGF5ZXJEYXRhJyApO1xuY29uc3QgcGxheWVyID0gcmVxdWlyZSggJy4vcGxheWVyJyApO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgICBwbGF5ZXIsXG4gICAgYW5hbHl0aWNzLFxuICAgIGdhbWVEYXRhLFxuICAgIHBsYXllckRhdGEsXG5dO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RlZmF1bHRzL2luZGV4LmpzIiwiY29uc3QgdjQgPSByZXF1aXJlKCAndXVpZC92NCcgKTtcbmNvbnN0IFBsdWdpbiA9IHJlcXVpcmUoICcuLi9wbHVnaW4nICk7XG5jb25zdCB2YWxpZGF0ZSA9IHJlcXVpcmUoICcuLi92YWxpZGF0ZScgKTtcblxuZnVuY3Rpb24gaW5pdGlhbGl6ZVBsYXllckRhdGEoIGJyaW5rYml0LCBwbGF5ZXIgKSB7XG4gICAgY2xhc3MgUGxheWVyRGF0YSBleHRlbmRzIFBsdWdpbiB7XG5cbiAgICAgICAgY29uc3RydWN0b3IoIGluaXRpYWxEYXRhICkge1xuICAgICAgICAgICAgc3VwZXIoIGJyaW5rYml0LCB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbERhdGEsXG4gICAgICAgICAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgX2lkOiB2NCgpLFxuICAgICAgICAgICAgICAgICAgICBkYXRlQ3JlYXRlZDogbmV3IERhdGUoKS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJJZDogcGxheWVyLmlkLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcGx1Z2luSWQ6ICdhbmFseXRpY3MnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdwbGF5ZXInLFxuICAgICAgICAgICAgICAgIHBsYXllcixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5taWRkbGV3YXJlLnNhdmUgPSB0aGlzLnNhdmVNaWRkbGV3YXJlLmJpbmQoIHRoaXMgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRpYyB2YWxpZGF0ZSggbWV0aG9kLCBkYXRhICkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRlKCBkYXRhLCB7XG4gICAgICAgICAgICAgICAgZGF0ZUNyZWF0ZWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgICAgICBwcmVzZW5jZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBsYXllcklkOiB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgcHJlc2VuY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgcHJlc2VuY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2F2ZU1pZGRsZXdhcmUoIG9wdGlvbnMgKSB7XG4gICAgICAgICAgICBjb25zdCB7IGJvZHkgfSA9IG9wdGlvbnM7XG4gICAgICAgICAgICBpZiAoICFib2R5LnBsYXllcklkICkge1xuICAgICAgICAgICAgICAgIGJvZHkucGxheWVySWQgPSB0aGlzLnBsYXllci5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gUGxheWVyRGF0YTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbmFtZTogJ0FuYWx5dGljJyxcbiAgICB0eXBlOiAncGxheWVyJyxcbiAgICBpbml0aWFsaXplOiBpbml0aWFsaXplUGxheWVyRGF0YSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZGVmYXVsdHMvYW5hbHl0aWNzLmpzIiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gIEluIHRoZVxuLy8gYnJvd3NlciB0aGlzIGlzIGEgbGl0dGxlIGNvbXBsaWNhdGVkIGR1ZSB0byB1bmtub3duIHF1YWxpdHkgb2YgTWF0aC5yYW5kb20oKVxuLy8gYW5kIGluY29uc2lzdGVudCBzdXBwb3J0IGZvciB0aGUgYGNyeXB0b2AgQVBJLiAgV2UgZG8gdGhlIGJlc3Qgd2UgY2FuIHZpYVxuLy8gZmVhdHVyZS1kZXRlY3Rpb25cbnZhciBybmc7XG5cbnZhciBjcnlwdG8gPSBnbG9iYWwuY3J5cHRvIHx8IGdsb2JhbC5tc0NyeXB0bzsgLy8gZm9yIElFIDExXG5pZiAoY3J5cHRvICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcbiAgLy8gV0hBVFdHIGNyeXB0byBSTkcgLSBodHRwOi8vd2lraS53aGF0d2cub3JnL3dpa2kvQ3J5cHRvXG4gIHZhciBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuICBybmcgPSBmdW5jdGlvbiB3aGF0d2dSTkcoKSB7XG4gICAgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG4gICAgcmV0dXJuIHJuZHM4O1xuICB9O1xufVxuXG5pZiAoIXJuZykge1xuICAvLyBNYXRoLnJhbmRvbSgpLWJhc2VkIChSTkcpXG4gIC8vXG4gIC8vIElmIGFsbCBlbHNlIGZhaWxzLCB1c2UgTWF0aC5yYW5kb20oKS4gIEl0J3MgZmFzdCwgYnV0IGlzIG9mIHVuc3BlY2lmaWVkXG4gIC8vIHF1YWxpdHkuXG4gIHZhciBybmRzID0gbmV3IEFycmF5KDE2KTtcbiAgcm5nID0gZnVuY3Rpb24oKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIHI7IGkgPCAxNjsgaSsrKSB7XG4gICAgICBpZiAoKGkgJiAweDAzKSA9PT0gMCkgciA9IE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMDtcbiAgICAgIHJuZHNbaV0gPSByID4+PiAoKGkgJiAweDAzKSA8PCAzKSAmIDB4ZmY7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJuZHM7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcm5nO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3V1aWQvbGliL3JuZy1icm93c2VyLmpzIiwiLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG52YXIgYnl0ZVRvSGV4ID0gW107XG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleFtpXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XG59XG5cbmZ1bmN0aW9uIGJ5dGVzVG9VdWlkKGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gb2Zmc2V0IHx8IDA7XG4gIHZhciBidGggPSBieXRlVG9IZXg7XG4gIHJldHVybiBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnl0ZXNUb1V1aWQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdXVpZC9saWIvYnl0ZXNUb1V1aWQuanMiLCJjb25zdCB2NCA9IHJlcXVpcmUoICd1dWlkL3Y0JyApO1xuY29uc3QgUGx1Z2luID0gcmVxdWlyZSggJy4uL3BsdWdpbicgKTtcblxuZnVuY3Rpb24gaW5pdGlhbGl6ZUdhbWVEYXRhKCBicmlua2JpdCApIHtcbiAgICBjbGFzcyBHYW1lRGF0YSBleHRlbmRzIFBsdWdpbiB7XG5cbiAgICAgICAgY29uc3RydWN0b3IoIGluaXRpYWxEYXRhICkge1xuICAgICAgICAgICAgc3VwZXIoIGJyaW5rYml0LCB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbERhdGEsXG4gICAgICAgICAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgX2lkOiB2NCgpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcGx1Z2luSWQ6ICdnYW1lZGF0YScsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2dhbWUnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gR2FtZURhdGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG5hbWU6ICdEYXRhJyxcbiAgICB0eXBlOiAnZ2FtZScsXG4gICAgaW5pdGlhbGl6ZTogaW5pdGlhbGl6ZUdhbWVEYXRhLFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kZWZhdWx0cy9nYW1lRGF0YS5qcyIsImNvbnN0IHY0ID0gcmVxdWlyZSggJ3V1aWQvdjQnICk7XG5jb25zdCBQbHVnaW4gPSByZXF1aXJlKCAnLi4vcGx1Z2luJyApO1xuXG5mdW5jdGlvbiBpbml0aWFsaXplUGxheWVyRGF0YSggYnJpbmtiaXQsIHBsYXllciApIHtcbiAgICBjbGFzcyBQbGF5ZXJEYXRhIGV4dGVuZHMgUGx1Z2luIHtcblxuICAgICAgICBjb25zdHJ1Y3RvciggaW5pdGlhbERhdGEgKSB7XG4gICAgICAgICAgICBzdXBlciggYnJpbmtiaXQsIHtcbiAgICAgICAgICAgICAgICBpbml0aWFsRGF0YSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgICAgICAgICBfaWQ6IHY0KCksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwbHVnaW5JZDogJ3BsYXllcmRhdGEnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdwbGF5ZXInLFxuICAgICAgICAgICAgICAgIHBsYXllcixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFBsYXllckRhdGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG5hbWU6ICdEYXRhJyxcbiAgICB0eXBlOiAncGxheWVyJyxcbiAgICBpbml0aWFsaXplOiBpbml0aWFsaXplUGxheWVyRGF0YSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZGVmYXVsdHMvcGxheWVyRGF0YS5qcyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG5cbmNvbnN0IG1lcmdlID0gcmVxdWlyZSggJ2xvZGFzaC5tZXJnZScgKTtcblxuY29uc3QgdmFsaWRhdGUgPSByZXF1aXJlKCAnLi4vdmFsaWRhdGUnICk7XG5jb25zdCBWYWxpZGF0aW9uRXJyb3IgPSByZXF1aXJlKCAnLi4vdmFsaWRhdGUvdmFsaWRhdGlvbkVycm9yJyApO1xuY29uc3Qgbm9ybWFsaXplQXJndW1lbnRzID0gcmVxdWlyZSggJy4uL3ZhbGlkYXRlL25vcm1hbGl6ZUFyZ3VtZW50cycgKTtcbmNvbnN0IFBsdWdpbiA9IHJlcXVpcmUoICcuLi9wbHVnaW4nICk7XG5cbmZ1bmN0aW9uIGluaXRpYWxpemUoIGJyaW5rYml0ICkge1xuICAgIGNsYXNzIFBsYXllciBleHRlbmRzIFBsdWdpbiB7XG5cbiAgICAgICAgY29uc3RydWN0b3IoIGluaXRpYWxEYXRhICkge1xuICAgICAgICAgICAgc3VwZXIoIGJyaW5rYml0LCB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbERhdGEsXG4gICAgICAgICAgICAgICAgcmVhZDogWyAnX2lkJywgJ2RhdGVDcmVhdGVkJywgJ2VtYWlsJywgJ3VzZXJuYW1lJyBdLFxuICAgICAgICAgICAgICAgIHdyaXRlOiBbICdlbWFpbCcsICdwYXNzd29yZCcsICd1c2VybmFtZScgXSxcbiAgICAgICAgICAgICAgICBwbHVnaW5JZDogJ3BsYXllcnMnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdjb3JlJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCBpbml0aWFsRGF0YSApIHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZS5jb25zdHJ1Y3RvciggaW5pdGlhbERhdGEsIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoIGluaXRpYWxEYXRhLnRva2VuICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRva2VuID0gaW5pdGlhbERhdGEudG9rZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5taWRkbGV3YXJlLnNhdmUgPSB0aGlzLnNhdmVNaWRkbGV3YXJlLmJpbmQoIHRoaXMgKTtcbiAgICAgICAgICAgIFBsYXllci5wbHVnaW5zLmZvckVhY2goKCBwbHVnaW4gKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpc1twbHVnaW4ubmFtZV0gPSBwbHVnaW4uaW5pdGlhbGl6ZSggYnJpbmtiaXQsIHRoaXMgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaXNMb2dnZWRJbigpIHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy50b2tlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvZ2luKCAuLi5hcmdzICkge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IG5vcm1hbGl6ZUFyZ3VtZW50cyggLi4uYXJncyApO1xuICAgICAgICAgICAgb3B0aW9ucy5wYXNzd29yZCA9IG9wdGlvbnMudXJpO1xuICAgICAgICAgICAgb3B0aW9ucy51cmkgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjb25zdCBvcHRzID0gbWVyZ2Uoe30sIHRoaXMuZGF0YSwgb3B0aW9ucyApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnJpbmtiaXQubG9naW4oIG9wdHMsIHRoaXMgKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcyApO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9nb3V0KCkge1xuICAgICAgICAgICAgdGhpcy50b2tlbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmICggdGhpcy5pc1ByaW1hcnkgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5icmlua2JpdC5sb2dvdXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByb21vdGUoKSB7XG4gICAgICAgICAgICB0aGlzLmJyaW5rYml0LnByb21vdGVQbGF5ZXIoIHRoaXMgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcmdvdCggb3B0aW9ucyApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJyaW5rYml0LmZvcmdvdCggb3B0aW9ucyB8fCB0aGlzLmRhdGEgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFVybCggbWV0aG9kICkge1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gdGhpcy5pZCB8fCB0aGlzLmRhdGEuX2lkO1xuICAgICAgICAgICAgaWYgKCBtZXRob2QgPT09ICdnZXQnICYmICF0aGlzLmlkICkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnLi9wbGF5ZXJpbmZvLyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIG1ldGhvZCA9PT0gJ3Bvc3QnICkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnLi9wbGF5ZXJzLyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYC4vcGxheWVycy8ke2tleX0vYDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNhdmVNaWRkbGV3YXJlKCBvcHRpb25zICkge1xuICAgICAgICAgICAgaWYgKCAhdGhpcy5pZCApIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnBhc3NUb2tlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuYm9keS5nYW1lSWQgPSBvcHRpb25zLmJvZHkuZ2FtZUlkIHx8IHRoaXMuYnJpbmtiaXQuZ2FtZUlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMuYm9keS51c2VybmFtZTtcbiAgICAgICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5ib2R5LnBhc3N3b3JkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgICAgIH1cblxuICAgICAgICB2YWxpZGF0ZSggbWV0aG9kLCBvcHRpb25zICkge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IG9wdGlvbnMuYm9keTtcbiAgICAgICAgICAgIHN3aXRjaCAoIG1ldGhvZCApIHtcbiAgICAgICAgICAgICAgICBjYXNlICdkZWxldGUnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoIG5ldyBFcnJvciggJ0Nhbm5vdCBkZWxldGUgdXNlcicgKSk7XG4gICAgICAgICAgICAgICAgY2FzZSAncG9zdCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZGF0ZSggZGF0YSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlc2VuY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlc2VuY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlc2VuY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjYXNlICdwdXQnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsaWRhdGUoIGRhdGEsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXNlbmNlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVzZW5jZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2Ygb3B0aW9ucy50b2tlbiA9PT0gJ3N0cmluZycgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlLnJlamVjdCggbmV3IFZhbGlkYXRpb25FcnJvciggJ1VzZXIgaXMgbm90IGxvZ2dlZCBpbicgKSlcbiAgICAgICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBvcHRpb25zLnRva2VuID09PSAnc3RyaW5nJyA/XG4gICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlLnJlamVjdCggbmV3IFZhbGlkYXRpb25FcnJvciggJ1VzZXIgaXMgbm90IGxvZ2dlZCBpbicgKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIFBsYXllci5wbHVnaW5zID0gW107XG5cbiAgICByZXR1cm4gUGxheWVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBuYW1lOiAnUGxheWVyJyxcbiAgICB0eXBlOiAnY29yZScsXG4gICAgaW5pdGlhbGl6ZSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZGVmYXVsdHMvcGxheWVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==