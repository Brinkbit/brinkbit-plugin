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
var ValidationError = __webpack_require__(4);
var normalizeArguments = __webpack_require__(9);
var normalizeResponse = __webpack_require__(34);
var BrinkbitEvent = __webpack_require__(35);

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
            _config$player = config.player,
            player = _config$player === undefined ? brinkbit.Player.primary : _config$player,
            pluginId = config.pluginId;

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
                throw new Error('No player logged in');
            }
            var player = this.player || this.brinkbit.Player.primary;
            if (!player.token || !player.id) {
                throw new Error('No player logged in');
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
        key: 'fetch',
        value: function fetch() {
            var _this = this;

            var options = normalizeArguments.apply(undefined, arguments);
            options.token = this.token;
            options.uri = options.uri || this.getUrl('get');
            var opts = this.processMiddleware('fetch', options);
            var promise = this.validate('get', opts).then(function () {
                return _this.brinkbit._get(options);
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
            options.token = this.token || this.getPlayer().token;
            options.method = options.method || (this.id ? 'put' : 'post');
            options.body = options.method === 'put' || options.method === 'post' ? this.writeable(this.data) : undefined;
            options.uri = options.uri || this.getUrl(options.method);
            var opts = this.processMiddleware('save', options);
            var validationResponse = this.validate(opts.method, opts.body);
            var promise = function () {
                if ((typeof validationResponse === 'undefined' ? 'undefined' : _typeof(validationResponse)) === 'object') {
                    if (typeof validationResponse.then === 'function') {
                        return validationResponse;
                    } else if (validationResponse instanceof ValidationError || validationResponse instanceof Error || validationResponse instanceof TypeError) {
                        return Promise.reject(validationResponse);
                    }
                    var error = new ValidationError();
                    error.details = validationResponse;
                    return Promise.reject(error);
                } else if (typeof validationResponse === 'string') {
                    return Promise.reject(validationResponse);
                }
                return Promise.resolve();
            }().then(function () {
                return _this2.brinkbit._request(opts);
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

            options.uri = this.getUrl('delete');
            options.token = this.token || this.getPlayer().token;
            var opts = this.processMiddleware('destroy', options);
            return this.validate('delete').then(function () {
                return _this3.brinkbit._delete(opts);
            }).then(function (response) {
                _this3.id = undefined;
                _this3.data.id = undefined;
                return response;
            });
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


var rng = __webpack_require__(38);
var bytesToUuid = __webpack_require__(39);

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
var defaultPlugins = __webpack_require__(36);

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


var analytics = __webpack_require__(37);
var gameData = __webpack_require__(40);
var playerData = __webpack_require__(41);
var player = __webpack_require__(42);

module.exports = [player, analytics, gameData, playerData];

/***/ }),
/* 37 */
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
/* 38 */
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
/* 39 */
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
/* 40 */
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
/* 41 */
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
/* 42 */
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
                    }
                });
            }
            _this.middleware.save = _this.saveMiddleware.bind(_this);
            Player.plugins.forEach(function (plugin) {
                _this[plugin.name] = plugin.initialize(brinkbit, _this);
            });
            return _this;
        }

        _createClass(Player, [{
            key: 'login',
            value: function login() {
                var _this2 = this;

                var options = normalizeArguments.apply(undefined, arguments);
                options.password = options.uri;
                options.uri = undefined;
                return this.brinkbit.login(merge({}, this.data, options)).then(function (user) {
                    _this2.token = user.token;
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
            key: 'saveMiddleware',
            value: function saveMiddleware(options) {
                if (!this.id) {
                    options.passToken = false;
                    options.body.gameId = options.body.gameId || this.brinkbit.gameId;
                } else {
                    options.body.username = undefined;
                    options.body.password = undefined;
                }
                return options;
            }
        }, {
            key: 'validate',
            value: function validate(method, data) {
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
                        });
                    default:
                        return typeof this.id === 'string' ? Promise.resolve() : Promise.reject(new ValidationError('Cannot fetch user without id'));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmNjJmOWY3YTg1MzdlZGUxYjg2NyIsIndlYnBhY2s6Ly8vLi9zcmMvcGx1Z2luLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2lzLXZhbHVlLmpzIiwid2VicGFjazovLy8uL3NyYy92YWxpZGF0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFsaWRhdGUvdmFsaWRhdGlvbkVycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL3Y0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gubWVyZ2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vYW1kLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFsaWRhdGUvbm9ybWFsaXplQXJndW1lbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoLnBpY2svaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC5nZXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC5zZXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V2ZW50LWVtaXR0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2Fzc2lnbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvYXNzaWduL2lzLWltcGxlbWVudGVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9hc3NpZ24vc2hpbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3Qva2V5cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3Qva2V5cy9pcy1pbXBsZW1lbnRlZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3Qva2V5cy9zaGltLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lczUtZXh0L2Z1bmN0aW9uL25vb3AuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L3ZhbGlkLXZhbHVlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9ub3JtYWxpemUtb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvaXMtY2FsbGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvaXMtaW1wbGVtZW50ZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvc2hpbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvdmFsaWQtY2FsbGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRlLmpzL3ZhbGlkYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jdXN0b20tZXJyb3ItaW5zdGFuY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2N1c3RvbS1lcnJvci1pbnN0YW5jZS9iaW4vZXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2N1c3RvbS1lcnJvci1pbnN0YW5jZS9iaW4vZmFjdG9yaWVzLmpzIiwid2VicGFjazovLy8uL3NyYy92YWxpZGF0ZS9ub3JtYWxpemVSZXNwb25zZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZGVmYXVsdHMvYW5hbHl0aWNzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ybmctYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXVpZC9saWIvYnl0ZXNUb1V1aWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlZmF1bHRzL2dhbWVEYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0cy9wbGF5ZXJEYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0cy9wbGF5ZXIuanMiXSwibmFtZXMiOlsibWVyZ2UiLCJyZXF1aXJlIiwicGljayIsImdldCIsInNldCIsImV2ZW50RW1pdHRlciIsInZhbGlkYXRlIiwiVmFsaWRhdGlvbkVycm9yIiwibm9ybWFsaXplQXJndW1lbnRzIiwibm9ybWFsaXplUmVzcG9uc2UiLCJCcmlua2JpdEV2ZW50IiwiUGx1Z2luIiwiYnJpbmtiaXQiLCJjb25maWciLCJjb25zdHJ1Y3RvciIsInR5cGUiLCJkYXRhVHlwZSIsInByZXNlbmNlIiwiaW5jbHVzaW9uIiwicGxheWVyIiwiaW5pdGlhbERhdGEiLCJkZWZhdWx0cyIsInJlYWQiLCJ3cml0ZSIsIm1pZGRsZXdhcmUiLCJwbHVnaW5JZCIsIlBsYXllciIsInByaW1hcnkiLCJkYXRhIiwiX2lkIiwiaWQiLCJFcnJvciIsInRva2VuIiwiUHJvbWlzZSIsInJlc29sdmUiLCJtZXRob2QiLCJrZXkiLCJnZXRQbGF5ZXIiLCJvcHRpb25zIiwidXJpIiwiZ2V0VXJsIiwib3B0cyIsInByb2Nlc3NNaWRkbGV3YXJlIiwicHJvbWlzZSIsInRoZW4iLCJfZ2V0IiwicmVzcG9uc2UiLCJyZWFkYWJsZSIsImJvZHkiLCJkYXRhVmFsdWUiLCJlbWl0Iiwid3JpdGVhYmxlIiwidW5kZWZpbmVkIiwidmFsaWRhdGlvblJlc3BvbnNlIiwiVHlwZUVycm9yIiwicmVqZWN0IiwiZXJyb3IiLCJkZXRhaWxzIiwiX3JlcXVlc3QiLCJfZGVsZXRlIiwicGF0aCIsImF0dHIiLCJ2YWx1ZSIsImluY2x1ZGVzIiwiYXJncyIsImluc3RhbmNlIiwic2F2ZSIsInByb3RvdHlwZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJnIiwiRnVuY3Rpb24iLCJldmFsIiwiZSIsIndpbmRvdyIsIl91bmRlZmluZWQiLCJ2YWwiLCJ2YWxpZGF0ZUpzIiwidmFsaWRhdG9ycyIsInZhbGlkYXRlRGF0YVR5cGUiLCJjYXBpdGFsaXplIiwiaW5zdGFuY2VPZiIsInZhbGlkYXRlSW5zdGFuY2VvZiIsImF0dHJpYnV0ZXMiLCJjb25zdHJhaW50cyIsImludmFsaWQiLCJtZXNzYWdlIiwidmFsaWRhdGVDb25zdHJ1Y3RvciIsImN1c3RvbUVycm9yIiwicm5nIiwiYnl0ZXNUb1V1aWQiLCJ2NCIsImJ1ZiIsIm9mZnNldCIsImkiLCJBcnJheSIsInJuZHMiLCJyYW5kb20iLCJpaSIsIkxBUkdFX0FSUkFZX1NJWkUiLCJIQVNIX1VOREVGSU5FRCIsIk1BWF9TQUZFX0lOVEVHRVIiLCJhcmdzVGFnIiwiYXJyYXlUYWciLCJib29sVGFnIiwiZGF0ZVRhZyIsImVycm9yVGFnIiwiZnVuY1RhZyIsImdlblRhZyIsIm1hcFRhZyIsIm51bWJlclRhZyIsIm9iamVjdFRhZyIsInByb21pc2VUYWciLCJyZWdleHBUYWciLCJzZXRUYWciLCJzdHJpbmdUYWciLCJzeW1ib2xUYWciLCJ3ZWFrTWFwVGFnIiwiYXJyYXlCdWZmZXJUYWciLCJkYXRhVmlld1RhZyIsImZsb2F0MzJUYWciLCJmbG9hdDY0VGFnIiwiaW50OFRhZyIsImludDE2VGFnIiwiaW50MzJUYWciLCJ1aW50OFRhZyIsInVpbnQ4Q2xhbXBlZFRhZyIsInVpbnQxNlRhZyIsInVpbnQzMlRhZyIsInJlUmVnRXhwQ2hhciIsInJlRmxhZ3MiLCJyZUlzSG9zdEN0b3IiLCJyZUlzVWludCIsInR5cGVkQXJyYXlUYWdzIiwiY2xvbmVhYmxlVGFncyIsImZyZWVHbG9iYWwiLCJnbG9iYWwiLCJPYmplY3QiLCJmcmVlU2VsZiIsInNlbGYiLCJyb290IiwiZnJlZUV4cG9ydHMiLCJub2RlVHlwZSIsImZyZWVNb2R1bGUiLCJtb2R1bGVFeHBvcnRzIiwiZnJlZVByb2Nlc3MiLCJwcm9jZXNzIiwibm9kZVV0aWwiLCJiaW5kaW5nIiwibm9kZUlzVHlwZWRBcnJheSIsImlzVHlwZWRBcnJheSIsImFkZE1hcEVudHJ5IiwibWFwIiwicGFpciIsImFkZFNldEVudHJ5IiwiYWRkIiwiYXBwbHkiLCJmdW5jIiwidGhpc0FyZyIsImxlbmd0aCIsImNhbGwiLCJhcnJheUVhY2giLCJhcnJheSIsIml0ZXJhdGVlIiwiaW5kZXgiLCJhcnJheVB1c2giLCJ2YWx1ZXMiLCJhcnJheVJlZHVjZSIsImFjY3VtdWxhdG9yIiwiaW5pdEFjY3VtIiwiYmFzZVRpbWVzIiwibiIsInJlc3VsdCIsImJhc2VVbmFyeSIsImdldFZhbHVlIiwib2JqZWN0IiwiaXNIb3N0T2JqZWN0IiwidG9TdHJpbmciLCJtYXBUb0FycmF5Iiwic2l6ZSIsImZvckVhY2giLCJvdmVyQXJnIiwidHJhbnNmb3JtIiwiYXJnIiwic2V0VG9BcnJheSIsImFycmF5UHJvdG8iLCJmdW5jUHJvdG8iLCJvYmplY3RQcm90byIsImNvcmVKc0RhdGEiLCJtYXNrU3JjS2V5IiwidWlkIiwiZXhlYyIsImtleXMiLCJJRV9QUk9UTyIsImZ1bmNUb1N0cmluZyIsImhhc093blByb3BlcnR5Iiwib2JqZWN0Q3RvclN0cmluZyIsIm9iamVjdFRvU3RyaW5nIiwicmVJc05hdGl2ZSIsIlJlZ0V4cCIsInJlcGxhY2UiLCJCdWZmZXIiLCJTeW1ib2wiLCJVaW50OEFycmF5IiwiZ2V0UHJvdG90eXBlIiwiZ2V0UHJvdG90eXBlT2YiLCJvYmplY3RDcmVhdGUiLCJjcmVhdGUiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsInNwbGljZSIsIm5hdGl2ZUdldFN5bWJvbHMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJuYXRpdmVJc0J1ZmZlciIsImlzQnVmZmVyIiwibmF0aXZlS2V5cyIsIm5hdGl2ZU1heCIsIk1hdGgiLCJtYXgiLCJEYXRhVmlldyIsImdldE5hdGl2ZSIsIk1hcCIsIlNldCIsIldlYWtNYXAiLCJuYXRpdmVDcmVhdGUiLCJkYXRhVmlld0N0b3JTdHJpbmciLCJ0b1NvdXJjZSIsIm1hcEN0b3JTdHJpbmciLCJwcm9taXNlQ3RvclN0cmluZyIsInNldEN0b3JTdHJpbmciLCJ3ZWFrTWFwQ3RvclN0cmluZyIsInN5bWJvbFByb3RvIiwic3ltYm9sVmFsdWVPZiIsInZhbHVlT2YiLCJIYXNoIiwiZW50cmllcyIsImNsZWFyIiwiZW50cnkiLCJoYXNoQ2xlYXIiLCJfX2RhdGFfXyIsImhhc2hEZWxldGUiLCJoYXMiLCJoYXNoR2V0IiwiaGFzaEhhcyIsImhhc2hTZXQiLCJMaXN0Q2FjaGUiLCJsaXN0Q2FjaGVDbGVhciIsImxpc3RDYWNoZURlbGV0ZSIsImFzc29jSW5kZXhPZiIsImxhc3RJbmRleCIsInBvcCIsImxpc3RDYWNoZUdldCIsImxpc3RDYWNoZUhhcyIsImxpc3RDYWNoZVNldCIsInB1c2giLCJNYXBDYWNoZSIsIm1hcENhY2hlQ2xlYXIiLCJtYXBDYWNoZURlbGV0ZSIsImdldE1hcERhdGEiLCJtYXBDYWNoZUdldCIsIm1hcENhY2hlSGFzIiwibWFwQ2FjaGVTZXQiLCJTdGFjayIsInN0YWNrQ2xlYXIiLCJzdGFja0RlbGV0ZSIsInN0YWNrR2V0Iiwic3RhY2tIYXMiLCJzdGFja1NldCIsImNhY2hlIiwicGFpcnMiLCJhcnJheUxpa2VLZXlzIiwiaW5oZXJpdGVkIiwiaXNBcnJheSIsImlzQXJndW1lbnRzIiwiU3RyaW5nIiwic2tpcEluZGV4ZXMiLCJpc0luZGV4IiwiYXNzaWduTWVyZ2VWYWx1ZSIsImVxIiwiYXNzaWduVmFsdWUiLCJvYmpWYWx1ZSIsImJhc2VBc3NpZ24iLCJzb3VyY2UiLCJjb3B5T2JqZWN0IiwiYmFzZUNsb25lIiwiaXNEZWVwIiwiaXNGdWxsIiwiY3VzdG9taXplciIsInN0YWNrIiwiaXNPYmplY3QiLCJpc0FyciIsImluaXRDbG9uZUFycmF5IiwiY29weUFycmF5IiwidGFnIiwiZ2V0VGFnIiwiaXNGdW5jIiwiY2xvbmVCdWZmZXIiLCJpbml0Q2xvbmVPYmplY3QiLCJjb3B5U3ltYm9scyIsImluaXRDbG9uZUJ5VGFnIiwic3RhY2tlZCIsInByb3BzIiwiZ2V0QWxsS2V5cyIsInN1YlZhbHVlIiwiYmFzZUNyZWF0ZSIsInByb3RvIiwiYmFzZUdldEFsbEtleXMiLCJrZXlzRnVuYyIsInN5bWJvbHNGdW5jIiwiYmFzZUdldFRhZyIsImJhc2VJc05hdGl2ZSIsImlzTWFza2VkIiwicGF0dGVybiIsImlzRnVuY3Rpb24iLCJ0ZXN0IiwiYmFzZUlzVHlwZWRBcnJheSIsImlzT2JqZWN0TGlrZSIsImlzTGVuZ3RoIiwiYmFzZUtleXMiLCJpc1Byb3RvdHlwZSIsImJhc2VLZXlzSW4iLCJuYXRpdmVLZXlzSW4iLCJpc1Byb3RvIiwiYmFzZU1lcmdlIiwic3JjSW5kZXgiLCJzcmNWYWx1ZSIsImJhc2VNZXJnZURlZXAiLCJuZXdWYWx1ZSIsIm1lcmdlRnVuYyIsImlzQ29tbW9uIiwiaXNBcnJheUxpa2VPYmplY3QiLCJpc1BsYWluT2JqZWN0IiwidG9QbGFpbk9iamVjdCIsImJhc2VSZXN0Iiwic3RhcnQiLCJhcmd1bWVudHMiLCJvdGhlckFyZ3MiLCJidWZmZXIiLCJzbGljZSIsImNvcHkiLCJjbG9uZUFycmF5QnVmZmVyIiwiYXJyYXlCdWZmZXIiLCJieXRlTGVuZ3RoIiwiY2xvbmVEYXRhVmlldyIsImRhdGFWaWV3IiwiYnl0ZU9mZnNldCIsImNsb25lTWFwIiwiY2xvbmVGdW5jIiwiY2xvbmVSZWdFeHAiLCJyZWdleHAiLCJjbG9uZVNldCIsImNsb25lU3ltYm9sIiwic3ltYm9sIiwiY2xvbmVUeXBlZEFycmF5IiwidHlwZWRBcnJheSIsImdldFN5bWJvbHMiLCJjcmVhdGVBc3NpZ25lciIsImFzc2lnbmVyIiwic291cmNlcyIsImd1YXJkIiwiaXNJdGVyYXRlZUNhbGwiLCJpc0tleWFibGUiLCJzdHViQXJyYXkiLCJBcnJheUJ1ZmZlciIsIkN0b3IiLCJjdG9yU3RyaW5nIiwiaW5wdXQiLCJpc0FycmF5TGlrZSIsIm90aGVyIiwic3R1YkZhbHNlIiwia2V5c0luIiwid2VicGFja1BvbHlmaWxsIiwiZGVwcmVjYXRlIiwicGF0aHMiLCJjaGlsZHJlbiIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImwiLCJjYWxsYmFjayIsImRlZmF1bHRQbHVnaW5zIiwiSU5GSU5JVFkiLCJhcnJheU1hcCIsInNwcmVhZGFibGVTeW1ib2wiLCJpc0NvbmNhdFNwcmVhZGFibGUiLCJiYXNlRmxhdHRlbiIsImRlcHRoIiwicHJlZGljYXRlIiwiaXNTdHJpY3QiLCJpc0ZsYXR0ZW5hYmxlIiwiYmFzZVBpY2siLCJiYXNlUGlja0J5IiwidG9LZXkiLCJpc1N5bWJvbCIsIkZVTkNfRVJST1JfVEVYVCIsInJlSXNEZWVwUHJvcCIsInJlSXNQbGFpblByb3AiLCJyZUxlYWRpbmdEb3QiLCJyZVByb3BOYW1lIiwicmVFc2NhcGVDaGFyIiwic3ltYm9sVG9TdHJpbmciLCJiYXNlR2V0IiwiaXNLZXkiLCJjYXN0UGF0aCIsImJhc2VUb1N0cmluZyIsInN0cmluZ1RvUGF0aCIsIm1lbW9pemUiLCJzdHJpbmciLCJtYXRjaCIsIm51bWJlciIsInF1b3RlIiwicmVzb2x2ZXIiLCJtZW1vaXplZCIsIkNhY2hlIiwiZGVmYXVsdFZhbHVlIiwiYmFzZVNldCIsIm5lc3RlZCIsImQiLCJjYWxsYWJsZSIsImRlZmluZVByb3BlcnRpZXMiLCJkZXNjcmlwdG9yIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJvbiIsIm9uY2UiLCJvZmYiLCJtZXRob2RzIiwiZGVzY3JpcHRvcnMiLCJiYXNlIiwibGlzdGVuZXIiLCJfX2VlX18iLCJfX2VlT25jZUxpc3RlbmVyX18iLCJsaXN0ZW5lcnMiLCJjYW5kaWRhdGUiLCJvIiwiYXNzaWduIiwibm9ybWFsaXplT3B0cyIsImlzQ2FsbGFibGUiLCJjb250YWlucyIsImRzY3IiLCJjIiwidyIsImRlc2MiLCJncyIsIm9iaiIsImZvbyIsImJhciIsInRyenkiLCJkZXN0Iiwic3JjIiwiaXNWYWx1ZSIsIm9wdHMxIiwic3RyIiwiaW5kZXhPZiIsInNlYXJjaFN0cmluZyIsImZuIiwiZGVmaW5lIiwidiIsImV4dGVuZCIsInJlc3VsdHMiLCJydW5WYWxpZGF0aW9ucyIsInZhbGlkYXRvciIsImlzUHJvbWlzZSIsInByb2Nlc3NWYWxpZGF0aW9uUmVzdWx0cyIsInZlcnNpb24iLCJtYWpvciIsIm1pbm9yIiwicGF0Y2giLCJtZXRhZGF0YSIsImZvcm1hdCIsImlzRW1wdHkiLCJFTVBUWV9TVFJJTkdfUkVHRVhQIiwidmFsaWRhdG9yTmFtZSIsInZhbGlkYXRvck9wdGlvbnMiLCJpc0RvbUVsZW1lbnQiLCJpc0pxdWVyeUVsZW1lbnQiLCJjb2xsZWN0Rm9ybVZhbHVlcyIsImdldERlZXBPYmplY3RWYWx1ZSIsIm5hbWUiLCJhdHRyaWJ1dGUiLCJnbG9iYWxPcHRpb25zIiwiZXJyb3JzIiwicHJ1bmVFbXB0eUVycm9ycyIsImV4cGFuZE11bHRpcGxlRXJyb3JzIiwiY29udmVydEVycm9yTWVzc2FnZXMiLCJmb3JtYXR0ZXJzIiwiYXN5bmMiLCJXcmFwRXJyb3JzIiwid3JhcEVycm9ycyIsImNsZWFuQXR0cmlidXRlcyIsIndhaXRGb3JSZXN1bHRzIiwiZXJyIiwic2luZ2xlIiwiZnVsbE1lc3NhZ2VzIiwicmVkdWNlIiwibWVtbyIsInIiLCJpc051bWJlciIsImlzTmFOIiwiaXNJbnRlZ2VyIiwiaXNCb29sZWFuIiwiaXNEYXRlIiwiRGF0ZSIsImlzRGVmaW5lZCIsInAiLCJpc1N0cmluZyIsImpxdWVyeSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJxdWVyeVNlbGVjdG9yIiwiZG9jdW1lbnQiLCJIVE1MRWxlbWVudCIsIm5vZGVOYW1lIiwidmFscyIsIkZPUk1BVF9SRUdFWFAiLCJtMCIsIm0xIiwibTIiLCJwcmV0dGlmeSIsInBhcnNlRmxvYXQiLCJyb3VuZCIsInRvRml4ZWQiLCJzIiwiam9pbiIsInRvTG93ZXJDYXNlIiwic3RyaW5naWZ5VmFsdWUiLCJpc0hhc2giLCJ1bmlxdWUiLCJmaWx0ZXIiLCJlbCIsImZvckVhY2hLZXlJbktleXBhdGgiLCJrZXlwYXRoIiwiZXNjYXBlIiwiZm9ybSIsImoiLCJpbnB1dHMiLCJvcHRpb24iLCJpdGVtIiwiZ2V0QXR0cmlidXRlIiwic2FuaXRpemVGb3JtVmFsdWUiLCJjaGVja2VkIiwibXVsdGlwbGUiLCJzZWxlY3RlZCIsInNlbGVjdGVkSW5kZXgiLCJ0cmltIiwibnVsbGlmeSIsInRvVXBwZXJDYXNlIiwicmV0IiwibXNnIiwiZXJyb3JJbmZvIiwiZ3JvdXBFcnJvcnNCeUF0dHJpYnV0ZSIsImxpc3QiLCJmbGF0dGVuRXJyb3JzVG9BcnJheSIsIndoaXRlbGlzdCIsIndoaXRlbGlzdENyZWF0b3IiLCJsYXN0IiwiYnVpbGRPYmplY3RXaGl0ZWxpc3QiLCJvdyIsImxhc3RPYmplY3QiLCJjbGVhblJlY3Vyc2l2ZSIsImV4cG9zZU1vZHVsZSIsImFtZCIsIndhcm4iLCJjb25zb2xlIiwiYWxsb3dFbXB0eSIsImlzIiwibWF4aW11bSIsIm1pbmltdW0iLCJ0b2tlbml6ZXIiLCJub3RWYWxpZCIsIndyb25nTGVuZ3RoIiwiY291bnQiLCJ0b29TaG9ydCIsInRvb0xvbmciLCJudW1lcmljYWxpdHkiLCJjaGVja3MiLCJncmVhdGVyVGhhbiIsImdyZWF0ZXJUaGFuT3JFcXVhbFRvIiwiZXF1YWxUbyIsImxlc3NUaGFuIiwibGVzc1RoYW5PckVxdWFsVG8iLCJkaXZpc2libGVCeSIsInN0cmljdCIsIm9ubHlJbnRlZ2VyIiwibm9TdHJpbmdzIiwibm90SW50ZWdlciIsIm9kZCIsIm5vdE9kZCIsImV2ZW4iLCJub3RFdmVuIiwiZGF0ZXRpbWUiLCJwYXJzZSIsImVhcmxpZXN0IiwiTmFOIiwibGF0ZXN0IiwiZGF0ZU9ubHkiLCJ0b29FYXJseSIsImRhdGUiLCJ0b29MYXRlIiwiZmxhZ3MiLCJ3aXRoaW4iLCJleGNsdXNpb24iLCJlbWFpbCIsIlBBVFRFUk4iLCJlcXVhbGl0eSIsIm90aGVyVmFsdWUiLCJjb21wYXJhdG9yIiwidjEiLCJ2MiIsInVybCIsInNjaGVtZXMiLCJhbGxvd0xvY2FsIiwicmVnZXgiLCJ0bGQiLCJkZXRhaWxlZCIsImZsYXQiLCJncm91cGVkIiwiY29uc3RyYWludCIsInNvcnQiLCJDdXN0b21FcnJvciIsImZhY3RvcnkiLCJFcnIiLCJvcmRlciIsImNvZGUiLCJwYXJlbnQiLCJwcm9wZXJ0aWVzIiwiY29uc3RydWN0IiwiaXNSb290IiwiZmluZEFyZyIsImlzUGFyZW50QXJnIiwiaXNQcm9wZXJ0aWVzQXJnIiwiaXNGYWN0b3J5QXJnIiwibm9vcCIsImlzTmFtZUFyZyIsImNvbmZpZ3VyYXRpb24iLCJfdGhpcyIsImFyIiwiZmFjdG9yaWVzIiwiY2hhaW4iLCJyZXZlcnNlIiwidW5zaGlmdCIsImFudGlGaWx0ZXJzIiwiYW50aSIsImZvdW5kIiwibGVuIiwiZXhwZWN0UmVjZWl2ZSIsImV4cGVjdGVkIiwicmVjZWl2ZWQiLCJzdGFja0xlbmd0aCIsInN0YWNrVHJhY2VMaW1pdCIsInJvb3RPbmx5IiwibWVzc2FnZVN0ciIsIm9yaWdpbmFsU3RhY2tMZW5ndGgiLCJ1cGRhdGVTdGFjayIsInNwbGl0Iiwic3VjY2VzcyIsImNhdGNoIiwiZXZlbnRUeXBlIiwiYW5hbHl0aWNzIiwiZ2FtZURhdGEiLCJwbGF5ZXJEYXRhIiwiaW5pdGlhbGl6ZVBsYXllckRhdGEiLCJQbGF5ZXJEYXRhIiwiZGF0ZUNyZWF0ZWQiLCJwbGF5ZXJJZCIsInNhdmVNaWRkbGV3YXJlIiwiYmluZCIsImluaXRpYWxpemUiLCJjcnlwdG8iLCJtc0NyeXB0byIsImdldFJhbmRvbVZhbHVlcyIsInJuZHM4Iiwid2hhdHdnUk5HIiwiYnl0ZVRvSGV4Iiwic3Vic3RyIiwiYnRoIiwiaW5pdGlhbGl6ZUdhbWVEYXRhIiwiR2FtZURhdGEiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwicGx1Z2lucyIsInBsdWdpbiIsImxvZ2luIiwidXNlciIsImlzUHJpbWFyeSIsImxvZ291dCIsInByb21vdGVQbGF5ZXIiLCJmb3Jnb3QiLCJwYXNzVG9rZW4iLCJnYW1lSWQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REE7O0FBRUEsSUFBTUEsUUFBUSxtQkFBQUMsQ0FBUyxDQUFULENBQWQ7QUFDQSxJQUFNQyxPQUFPLG1CQUFBRCxDQUFTLEVBQVQsQ0FBYjtBQUNBLElBQU1FLE9BQU0sbUJBQUFGLENBQVMsRUFBVCxDQUFaO0FBQ0EsSUFBTUcsT0FBTSxtQkFBQUgsQ0FBUyxFQUFULENBQVo7QUFDQSxJQUFNSSxlQUFlLG1CQUFBSixDQUFTLEVBQVQsQ0FBckI7O0FBRUEsSUFBTUssV0FBVyxtQkFBQUwsQ0FBUyxDQUFULENBQWpCO0FBQ0EsSUFBTU0sa0JBQWtCLG1CQUFBTixD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Six5QkFBSyxLQUFMO0FBQ0ksK0JBQU9YLFVBQVVzQixJQUFWLEVBQWdCO0FBQ25CdW9CLHNDQUFVO0FBQ05ucEIsMENBQVUsUUFESjtBQUVOQywwQ0FBVTtBQUZKLDZCQURTO0FBS25Cc2tCLG1DQUFPO0FBQ0h2a0IsMENBQVU7QUFEUCw2QkFMWTtBQVFuQm9wQixzQ0FBVTtBQUNOcHBCLDBDQUFVLFFBREo7QUFFTkMsMENBQVU7QUFGSjtBQVJTLHlCQUFoQixDQUFQO0FBYUo7QUFDSSwrQkFBTyxPQUFPLEtBQUthLEVBQVosS0FBbUIsUUFBbkIsR0FDSEcsUUFBUUMsT0FBUixFQURHLEdBRUhELFFBQVFzQixNQUFSLENBQWdCLElBQUloRCxlQUFKLENBQXFCLDhCQUFyQixDQUFoQixDQUZKO0FBakNSO0FBcUNIO0FBMUd1Qjs7QUFBQTtBQUFBLE1BQ1BJLE1BRE87O0FBOEc1QmUsV0FBTzJvQixPQUFQLEdBQWlCLEVBQWpCOztBQUVBLFdBQU8zb0IsTUFBUDtBQUNIOztBQUVEMEMsT0FBT0MsT0FBUCxHQUFpQjtBQUNidVosVUFBTSxRQURPO0FBRWI3YyxVQUFNLE1BRk87QUFHYnlvQjtBQUhhLENBQWpCLEMiLCJmaWxlIjoiZGlzdC9icmlua2JpdC1wbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJicmlua2JpdC1wbHVnaW5cIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiYnJpbmtiaXQtcGx1Z2luXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmNjJmOWY3YTg1MzdlZGUxYjg2NyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG5cbmNvbnN0IG1lcmdlID0gcmVxdWlyZSggJ2xvZGFzaC5tZXJnZScgKTtcbmNvbnN0IHBpY2sgPSByZXF1aXJlKCAnbG9kYXNoLnBpY2snICk7XG5jb25zdCBnZXQgPSByZXF1aXJlKCAnbG9kYXNoLmdldCcgKTtcbmNvbnN0IHNldCA9IHJlcXVpcmUoICdsb2Rhc2guc2V0JyApO1xuY29uc3QgZXZlbnRFbWl0dGVyID0gcmVxdWlyZSggJ2V2ZW50LWVtaXR0ZXInICk7XG5cbmNvbnN0IHZhbGlkYXRlID0gcmVxdWlyZSggJy4vdmFsaWRhdGUnICk7XG5jb25zdCBWYWxpZGF0aW9uRXJyb3IgPSByZXF1aXJlKCAnLi92YWxpZGF0ZS92YWxpZGF0aW9uRXJyb3InICk7XG5jb25zdCBub3JtYWxpemVBcmd1bWVudHMgPSByZXF1aXJlKCAnLi92YWxpZGF0ZS9ub3JtYWxpemVBcmd1bWVudHMnICk7XG5jb25zdCBub3JtYWxpemVSZXNwb25zZSA9IHJlcXVpcmUoICcuL3ZhbGlkYXRlL25vcm1hbGl6ZVJlc3BvbnNlJyApO1xuY29uc3QgQnJpbmtiaXRFdmVudCA9IHJlcXVpcmUoICcuL2V2ZW50cycgKTtcblxuY2xhc3MgUGx1Z2luIHtcblxuICAgIGNvbnN0cnVjdG9yKCBicmlua2JpdCwgY29uZmlnICkge1xuICAgICAgICB2YWxpZGF0ZS5jb25zdHJ1Y3RvciggY29uZmlnLCB7XG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgIHByZXNlbmNlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGluY2x1c2lvbjogW1xuICAgICAgICAgICAgICAgICAgICAncGxheWVyJyxcbiAgICAgICAgICAgICAgICAgICAgJ2dhbWUnLFxuICAgICAgICAgICAgICAgICAgICAnY29yZScsXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwbGF5ZXI6IHtcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5pdGlhbERhdGE6IHtcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVhZDoge1xuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnYXJyYXknLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHdyaXRlOiB7XG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdhcnJheScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWlkZGxld2FyZToge1xuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwbHVnaW5JZDoge1xuICAgICAgICAgICAgICAgIHByZXNlbmNlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBpbml0aWFsRGF0YSA9IHt9LFxuICAgICAgICAgICAgZGVmYXVsdHMgPSB7fSxcbiAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICByZWFkLFxuICAgICAgICAgICAgd3JpdGUsXG4gICAgICAgICAgICBtaWRkbGV3YXJlID0ge30sXG4gICAgICAgICAgICBwbGF5ZXIgPSBicmlua2JpdC5QbGF5ZXIucHJpbWFyeSxcbiAgICAgICAgICAgIHBsdWdpbklkLFxuICAgICAgICB9ID0gY29uZmlnO1xuICAgICAgICB0aGlzLnBsdWdpbklkID0gcGx1Z2luSWQ7XG4gICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xuICAgICAgICB0aGlzLmJyaW5rYml0ID0gYnJpbmtiaXQ7XG4gICAgICAgIHRoaXMucmVhZCA9IHJlYWQ7XG4gICAgICAgIHRoaXMud3JpdGUgPSB3cml0ZTtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5taWRkbGV3YXJlID0gbWlkZGxld2FyZTtcbiAgICAgICAgY29uc3QgZGF0YSA9IG1lcmdlKHt9LCBkZWZhdWx0cywgaW5pdGlhbERhdGEgKTtcbiAgICAgICAgdmFsaWRhdGUuY29uc3RydWN0b3IoIGRhdGEsIHtcbiAgICAgICAgICAgIF9pZDoge1xuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICBpZiAoIHR5cGUgPT09ICdjb3JlJyAmJiBkYXRhLl9pZCApIHtcbiAgICAgICAgICAgIHRoaXMuaWQgPSBpbml0aWFsRGF0YS5faWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQbGF5ZXIoKSB7XG4gICAgICAgIGlmICggIXRoaXMucGxheWVyICYmICF0aGlzLmJyaW5rYml0LlBsYXllci5wcmltYXJ5ICkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCAnTm8gcGxheWVyIGxvZ2dlZCBpbicgKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwbGF5ZXIgPSB0aGlzLnBsYXllciB8fCB0aGlzLmJyaW5rYml0LlBsYXllci5wcmltYXJ5O1xuICAgICAgICBpZiAoICFwbGF5ZXIudG9rZW4gfHwgIXBsYXllci5pZCApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvciggJ05vIHBsYXllciBsb2dnZWQgaW4nICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBsYXllcjtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZSgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICBnZXRVcmwoIG1ldGhvZCApIHtcbiAgICAgICAgY29uc3Qga2V5ID0gdGhpcy5pZCB8fCB0aGlzLmRhdGEuX2lkO1xuICAgICAgICBpZiAoIHRoaXMudHlwZSA9PT0gJ2NvcmUnICkge1xuICAgICAgICAgICAgc3dpdGNoICggbWV0aG9kICkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3Bvc3QnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYC4vJHt0aGlzLnBsdWdpbklkfS9gO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgLi8ke3RoaXMucGx1Z2luSWR9LyR7a2V5fS9gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICggdGhpcy50eXBlID09PSAncGxheWVyJyApIHtcbiAgICAgICAgICAgIHJldHVybiBgLi9kYXRhLyR7dGhpcy5wbHVnaW5JZH0vcGxheWVycy8ke3RoaXMuZ2V0UGxheWVyKCkuaWR9L2tleXMvJHtrZXl9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYC4vZGF0YS8ke3RoaXMucGx1Z2luSWR9L2tleXMvJHtrZXl9YDtcbiAgICB9XG5cbiAgICBmZXRjaCggLi4uYXJncyApIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IG5vcm1hbGl6ZUFyZ3VtZW50cyggLi4uYXJncyApO1xuICAgICAgICBvcHRpb25zLnRva2VuID0gdGhpcy50b2tlbjtcbiAgICAgICAgb3B0aW9ucy51cmkgPSBvcHRpb25zLnVyaSB8fCB0aGlzLmdldFVybCggJ2dldCcgKTtcbiAgICAgICAgY29uc3Qgb3B0cyA9IHRoaXMucHJvY2Vzc01pZGRsZXdhcmUoICdmZXRjaCcsIG9wdGlvbnMgKTtcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMudmFsaWRhdGUoICdnZXQnLCBvcHRzIClcbiAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5icmlua2JpdC5fZ2V0KCBvcHRpb25zICkpXG4gICAgICAgIC50aGVuKCggcmVzcG9uc2UgKSA9PiB7XG4gICAgICAgICAgICBtZXJnZShcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEsXG4gICAgICAgICAgICAgICAgdGhpcy5yZWFkYWJsZSggdGhpcy50eXBlID09PSAnY29yZScgPyByZXNwb25zZS5ib2R5IDogcmVzcG9uc2UuYm9keS5kYXRhVmFsdWUgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmICggdGhpcy5kYXRhLl9pZCApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlkID0gdGhpcy5kYXRhLl9pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZW1pdCggJ2ZldGNoJywgbmV3IEJyaW5rYml0RXZlbnQoICdmZXRjaCcsIHJlc3BvbnNlICkpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZVJlc3BvbnNlKCBwcm9taXNlLCBvcHRpb25zICk7XG4gICAgfVxuXG4gICAgc2F2ZSggLi4uYXJncyApIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IG5vcm1hbGl6ZUFyZ3VtZW50cyggLi4uYXJncyApO1xuICAgICAgICBpZiAoIG9wdGlvbnMuYm9keSApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KCBvcHRpb25zLmJvZHkgKTtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zLnRva2VuID0gdGhpcy50b2tlbiB8fCB0aGlzLmdldFBsYXllcigpLnRva2VuO1xuICAgICAgICBvcHRpb25zLm1ldGhvZCA9IG9wdGlvbnMubWV0aG9kIHx8ICggdGhpcy5pZCA/ICdwdXQnIDogJ3Bvc3QnICk7XG4gICAgICAgIG9wdGlvbnMuYm9keSA9IG9wdGlvbnMubWV0aG9kID09PSAncHV0JyB8fCBvcHRpb25zLm1ldGhvZCA9PT0gJ3Bvc3QnID8gdGhpcy53cml0ZWFibGUoIHRoaXMuZGF0YSApIDogdW5kZWZpbmVkO1xuICAgICAgICBvcHRpb25zLnVyaSA9IG9wdGlvbnMudXJpIHx8IHRoaXMuZ2V0VXJsKCBvcHRpb25zLm1ldGhvZCApO1xuICAgICAgICBjb25zdCBvcHRzID0gdGhpcy5wcm9jZXNzTWlkZGxld2FyZSggJ3NhdmUnLCBvcHRpb25zICk7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25SZXNwb25zZSA9IHRoaXMudmFsaWRhdGUoIG9wdHMubWV0aG9kLCBvcHRzLmJvZHkgKTtcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9ICgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIHR5cGVvZiB2YWxpZGF0aW9uUmVzcG9uc2UgPT09ICdvYmplY3QnICkge1xuICAgICAgICAgICAgICAgIGlmICggdHlwZW9mIHZhbGlkYXRpb25SZXNwb25zZS50aGVuID09PSAnZnVuY3Rpb24nICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsaWRhdGlvblJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvblJlc3BvbnNlIGluc3RhbmNlb2YgVmFsaWRhdGlvbkVycm9yIHx8XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25SZXNwb25zZSBpbnN0YW5jZW9mIEVycm9yIHx8XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25SZXNwb25zZSBpbnN0YW5jZW9mIFR5cGVFcnJvclxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoIHZhbGlkYXRpb25SZXNwb25zZSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBWYWxpZGF0aW9uRXJyb3IoKTtcbiAgICAgICAgICAgICAgICBlcnJvci5kZXRhaWxzID0gdmFsaWRhdGlvblJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCggZXJyb3IgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCB0eXBlb2YgdmFsaWRhdGlvblJlc3BvbnNlID09PSAnc3RyaW5nJyApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoIHZhbGlkYXRpb25SZXNwb25zZSApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9KSgpXG4gICAgICAgIC50aGVuKCgpID0+IHRoaXMuYnJpbmtiaXQuX3JlcXVlc3QoIG9wdHMgKSlcbiAgICAgICAgLnRoZW4oKCByZXNwb25zZSApID0+IHtcbiAgICAgICAgICAgIG1lcmdlKFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSxcbiAgICAgICAgICAgICAgICB0aGlzLnJlYWRhYmxlKCB0aGlzLnR5cGUgPT09ICdjb3JlJyA/IHJlc3BvbnNlLmJvZHkgOiByZXNwb25zZS5ib2R5LmRhdGFWYWx1ZSApXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKCB0aGlzLmRhdGEuX2lkICkge1xuICAgICAgICAgICAgICAgIHRoaXMuaWQgPSB0aGlzLmRhdGEuX2lkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5lbWl0KCAnc2F2ZScsIG5ldyBCcmlua2JpdEV2ZW50KCAnc2F2ZScsIHJlc3BvbnNlICkpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZVJlc3BvbnNlKCBwcm9taXNlLCBvcHRpb25zICk7XG4gICAgfVxuXG4gICAgZGVzdHJveSggb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIG9wdGlvbnMudXJpID0gdGhpcy5nZXRVcmwoICdkZWxldGUnICk7XG4gICAgICAgIG9wdGlvbnMudG9rZW4gPSB0aGlzLnRva2VuIHx8IHRoaXMuZ2V0UGxheWVyKCkudG9rZW47XG4gICAgICAgIGNvbnN0IG9wdHMgPSB0aGlzLnByb2Nlc3NNaWRkbGV3YXJlKCAnZGVzdHJveScsIG9wdGlvbnMgKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGUoICdkZWxldGUnIClcbiAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5icmlua2JpdC5fZGVsZXRlKCBvcHRzICkpXG4gICAgICAgIC50aGVuKCggcmVzcG9uc2UgKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5kYXRhLmlkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQoIHBhdGggKSB7XG4gICAgICAgIGlmICggdHlwZW9mIHBhdGggIT09ICdvYmplY3QnICYmIHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJyApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvciggYCR7dHlwZW9mIHBhdGh9IGlzIG5vdCBhIHZhbGlkIHR5cGUgZm9yIHBhdGhgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHR5cGVvZiBhdHRyID09PSAnc3RyaW5nJyA/IGdldCggdGhpcy5kYXRhLCBwYXRoICkgOiBwaWNrKCB0aGlzLmRhdGEsIHBhdGggKTtcbiAgICB9XG5cbiAgICBzZXQoIHBhdGgsIHZhbHVlICkge1xuICAgICAgICBpZiAoIHR5cGVvZiBwYXRoID09PSAnb2JqZWN0JyApIHtcbiAgICAgICAgICAgIG1lcmdlKCB0aGlzLmRhdGEsIHRoaXMud3JpdGVhYmxlKCBwYXRoICkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCB0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycgKSB7XG4gICAgICAgICAgICBpZiAoIHRoaXMud3JpdGUgJiYgIXRoaXMud3JpdGUuaW5jbHVkZXMoIHBhdGggKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvciggYFBhdGggJHtwYXRofSBpcyBub3Qgd3JpdGVhYmxlIWAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldCggdGhpcy5kYXRhLCBwYXRoLCB2YWx1ZSApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCBgJHt0eXBlb2YgcGF0aH0gaXMgbm90IGEgdmFsaWQgdHlwZSBmb3IgcGF0aGAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdyaXRlYWJsZSggZGF0YSApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud3JpdGUgPyBwaWNrKCBkYXRhLCB0aGlzLndyaXRlICkgOiBkYXRhO1xuICAgIH1cblxuICAgIHJlYWRhYmxlKCBkYXRhICkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkID8gcGljayggZGF0YSwgdGhpcy5yZWFkICkgOiBkYXRhO1xuICAgIH1cblxuICAgIHByb2Nlc3NNaWRkbGV3YXJlKCBtZXRob2QsIG9wdHMgKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5taWRkbGV3YXJlID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAgICAgdHlwZW9mIHRoaXMubWlkZGxld2FyZVttZXRob2RdID09PSAnZnVuY3Rpb24nID8gdGhpcy5taWRkbGV3YXJlW21ldGhvZF0oIG9wdHMgKSA6IG9wdHM7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZSggLi4uYXJncyApIHtcbiAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgdGhpcyggLi4uYXJncyApO1xuICAgICAgICByZXR1cm4gaW5zdGFuY2Uuc2F2ZSgpXG4gICAgICAgIC50aGVuKCgpID0+IGluc3RhbmNlICk7XG4gICAgfVxuXG59XG5cbmV2ZW50RW1pdHRlciggUGx1Z2luLnByb3RvdHlwZSApO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBsdWdpbjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wbHVnaW4uanMiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfdW5kZWZpbmVkID0gcmVxdWlyZShcIi4uL2Z1bmN0aW9uL25vb3BcIikoKTsgLy8gU3VwcG9ydCBFUzMgZW5naW5lc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWwpIHtcbiByZXR1cm4gKHZhbCAhPT0gX3VuZGVmaW5lZCkgJiYgKHZhbCAhPT0gbnVsbCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2lzLXZhbHVlLmpzIiwiY29uc3QgdmFsaWRhdGVKcyA9IHJlcXVpcmUoICd2YWxpZGF0ZS5qcycgKTtcbmNvbnN0IFZhbGlkYXRpb25FcnJvciA9IHJlcXVpcmUoICcuL3ZhbGlkYXRpb25FcnJvcicgKTtcblxudmFsaWRhdGVKcy52YWxpZGF0b3JzLmRhdGFUeXBlID0gZnVuY3Rpb24gdmFsaWRhdGVEYXRhVHlwZSggdmFsdWUsIG9wdGlvbnMgKSB7XG4gICAgcmV0dXJuICggdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWxpZGF0ZUpzW2BpcyR7dmFsaWRhdGVKcy5jYXBpdGFsaXplKCBvcHRpb25zICl9YF0oIHZhbHVlICkpID8gbnVsbCA6IGBpcyBub3Qgb2YgdHlwZSAke29wdGlvbnN9YDtcbn07XG5cbnZhbGlkYXRlSnMudmFsaWRhdG9ycy5pbnN0YW5jZU9mID0gZnVuY3Rpb24gdmFsaWRhdGVJbnN0YW5jZW9mKCB2YWx1ZSwgb3B0aW9ucyApIHtcbiAgICByZXR1cm4gKCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlIGluc3RhbmNlb2Ygb3B0aW9ucyApO1xufTtcblxuY29uc3QgdmFsaWRhdGUgPSBmdW5jdGlvbiB2YWxpZGF0ZSggYXR0cmlidXRlcywgY29uc3RyYWludHMgKSB7XG4gICAgY29uc3QgaW52YWxpZCA9IHZhbGlkYXRlSnMoIGF0dHJpYnV0ZXMsIGNvbnN0cmFpbnRzICk7XG4gICAgaWYgKCBpbnZhbGlkICkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoIG5ldyBWYWxpZGF0aW9uRXJyb3Ioe1xuICAgICAgICAgICAgbWVzc2FnZTogaW52YWxpZC5lcnJvcixcbiAgICAgICAgICAgIGRldGFpbHM6IGludmFsaWQsXG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xufTtcblxudmFsaWRhdGUuY29uc3RydWN0b3IgPSBmdW5jdGlvbiB2YWxpZGF0ZUNvbnN0cnVjdG9yKCBjb25maWcsIGNvbnN0cmFpbnRzICkge1xuICAgIGlmICggdHlwZW9mIGNvbmZpZyAhPT0gJ29iamVjdCcgKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoICdjb25maWcgbXVzdCBiZSBhbiBvYmplY3QnICk7XG4gICAgfVxuICAgIGNvbnN0IGludmFsaWQgPSB2YWxpZGF0ZUpzKCBjb25maWcsIGNvbnN0cmFpbnRzICk7XG4gICAgaWYgKCBpbnZhbGlkICkge1xuICAgICAgICB0aHJvdyBuZXcgVmFsaWRhdGlvbkVycm9yKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IGludmFsaWQuZXJyb3IsXG4gICAgICAgICAgICBkZXRhaWxzOiBpbnZhbGlkLFxuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHZhbGlkYXRlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3ZhbGlkYXRlL2luZGV4LmpzIiwiY29uc3QgY3VzdG9tRXJyb3IgPSByZXF1aXJlKCAnY3VzdG9tLWVycm9yLWluc3RhbmNlJyApO1xuXG5jb25zdCBWYWxpZGF0aW9uRXJyb3IgPSBjdXN0b21FcnJvciggJ1ZhbGlkYXRpb25FcnJvcicsIHtcbiAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbiBmYWlsZWQnLFxuICAgIGRldGFpbHM6IFtdLFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVmFsaWRhdGlvbkVycm9yO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3ZhbGlkYXRlL3ZhbGlkYXRpb25FcnJvci5qcyIsInZhciBybmcgPSByZXF1aXJlKCcuL2xpYi9ybmcnKTtcbnZhciBieXRlc1RvVXVpZCA9IHJlcXVpcmUoJy4vbGliL2J5dGVzVG9VdWlkJyk7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuXG4gIGlmICh0eXBlb2Yob3B0aW9ucykgPT0gJ3N0cmluZycpIHtcbiAgICBidWYgPSBvcHRpb25zID09ICdiaW5hcnknID8gbmV3IEFycmF5KDE2KSA6IG51bGw7XG4gICAgb3B0aW9ucyA9IG51bGw7XG4gIH1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpO1xuXG4gIC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcbiAgcm5kc1s2XSA9IChybmRzWzZdICYgMHgwZikgfCAweDQwO1xuICBybmRzWzhdID0gKHJuZHNbOF0gJiAweDNmKSB8IDB4ODA7XG5cbiAgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG4gIGlmIChidWYpIHtcbiAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgMTY7ICsraWkpIHtcbiAgICAgIGJ1ZltpICsgaWldID0gcm5kc1tpaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1ZiB8fCBieXRlc1RvVXVpZChybmRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2NDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy91dWlkL3Y0LmpzIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBzaXplIHRvIGVuYWJsZSBsYXJnZSBhcnJheSBvcHRpbWl6YXRpb25zLiAqL1xudmFyIExBUkdFX0FSUkFZX1NJWkUgPSAyMDA7XG5cbi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICBwcm9taXNlVGFnID0gJ1tvYmplY3QgUHJvbWlzZV0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBgUmVnRXhwYCBmbGFncyBmcm9tIHRoZWlyIGNvZXJjZWQgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUZsYWdzID0gL1xcdyokLztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIG9mIHR5cGVkIGFycmF5cy4gKi9cbnZhciB0eXBlZEFycmF5VGFncyA9IHt9O1xudHlwZWRBcnJheVRhZ3NbZmxvYXQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1tmbG9hdDY0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQ4VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2ludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50OFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG50eXBlZEFycmF5VGFnc1thcmdzVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2FycmF5VGFnXSA9XG50eXBlZEFycmF5VGFnc1thcnJheUJ1ZmZlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tib29sVGFnXSA9XG50eXBlZEFycmF5VGFnc1tkYXRhVmlld1RhZ10gPSB0eXBlZEFycmF5VGFnc1tkYXRlVGFnXSA9XG50eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPSB0eXBlZEFycmF5VGFnc1tmdW5jVGFnXSA9XG50eXBlZEFycmF5VGFnc1ttYXBUYWddID0gdHlwZWRBcnJheVRhZ3NbbnVtYmVyVGFnXSA9XG50eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID0gdHlwZWRBcnJheVRhZ3NbcmVnZXhwVGFnXSA9XG50eXBlZEFycmF5VGFnc1tzZXRUYWddID0gdHlwZWRBcnJheVRhZ3Nbc3RyaW5nVGFnXSA9XG50eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBzdXBwb3J0ZWQgYnkgYF8uY2xvbmVgLiAqL1xudmFyIGNsb25lYWJsZVRhZ3MgPSB7fTtcbmNsb25lYWJsZVRhZ3NbYXJnc1RhZ10gPSBjbG9uZWFibGVUYWdzW2FycmF5VGFnXSA9XG5jbG9uZWFibGVUYWdzW2FycmF5QnVmZmVyVGFnXSA9IGNsb25lYWJsZVRhZ3NbZGF0YVZpZXdUYWddID1cbmNsb25lYWJsZVRhZ3NbYm9vbFRhZ10gPSBjbG9uZWFibGVUYWdzW2RhdGVUYWddID1cbmNsb25lYWJsZVRhZ3NbZmxvYXQzMlRhZ10gPSBjbG9uZWFibGVUYWdzW2Zsb2F0NjRUYWddID1cbmNsb25lYWJsZVRhZ3NbaW50OFRhZ10gPSBjbG9uZWFibGVUYWdzW2ludDE2VGFnXSA9XG5jbG9uZWFibGVUYWdzW2ludDMyVGFnXSA9IGNsb25lYWJsZVRhZ3NbbWFwVGFnXSA9XG5jbG9uZWFibGVUYWdzW251bWJlclRhZ10gPSBjbG9uZWFibGVUYWdzW29iamVjdFRhZ10gPVxuY2xvbmVhYmxlVGFnc1tyZWdleHBUYWddID0gY2xvbmVhYmxlVGFnc1tzZXRUYWddID1cbmNsb25lYWJsZVRhZ3Nbc3RyaW5nVGFnXSA9IGNsb25lYWJsZVRhZ3Nbc3ltYm9sVGFnXSA9XG5jbG9uZWFibGVUYWdzW3VpbnQ4VGFnXSA9IGNsb25lYWJsZVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9XG5jbG9uZWFibGVUYWdzW3VpbnQxNlRhZ10gPSBjbG9uZWFibGVUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xuY2xvbmVhYmxlVGFnc1tlcnJvclRhZ10gPSBjbG9uZWFibGVUYWdzW2Z1bmNUYWddID1cbmNsb25lYWJsZVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgcHJvY2Vzc2AgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVQcm9jZXNzID0gbW9kdWxlRXhwb3J0cyAmJiBmcmVlR2xvYmFsLnByb2Nlc3M7XG5cbi8qKiBVc2VkIHRvIGFjY2VzcyBmYXN0ZXIgTm9kZS5qcyBoZWxwZXJzLiAqL1xudmFyIG5vZGVVdGlsID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIHJldHVybiBmcmVlUHJvY2VzcyAmJiBmcmVlUHJvY2Vzcy5iaW5kaW5nKCd1dGlsJyk7XG4gIH0gY2F0Y2ggKGUpIHt9XG59KCkpO1xuXG4vKiBOb2RlLmpzIGhlbHBlciByZWZlcmVuY2VzLiAqL1xudmFyIG5vZGVJc1R5cGVkQXJyYXkgPSBub2RlVXRpbCAmJiBub2RlVXRpbC5pc1R5cGVkQXJyYXk7XG5cbi8qKlxuICogQWRkcyB0aGUga2V5LXZhbHVlIGBwYWlyYCB0byBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHBhaXIgVGhlIGtleS12YWx1ZSBwYWlyIHRvIGFkZC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG1hcGAuXG4gKi9cbmZ1bmN0aW9uIGFkZE1hcEVudHJ5KG1hcCwgcGFpcikge1xuICAvLyBEb24ndCByZXR1cm4gYG1hcC5zZXRgIGJlY2F1c2UgaXQncyBub3QgY2hhaW5hYmxlIGluIElFIDExLlxuICBtYXAuc2V0KHBhaXJbMF0sIHBhaXJbMV0pO1xuICByZXR1cm4gbWFwO1xufVxuXG4vKipcbiAqIEFkZHMgYHZhbHVlYCB0byBgc2V0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFkZC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYHNldGAuXG4gKi9cbmZ1bmN0aW9uIGFkZFNldEVudHJ5KHNldCwgdmFsdWUpIHtcbiAgLy8gRG9uJ3QgcmV0dXJuIGBzZXQuYWRkYCBiZWNhdXNlIGl0J3Mgbm90IGNoYWluYWJsZSBpbiBJRSAxMS5cbiAgc2V0LmFkZCh2YWx1ZSk7XG4gIHJldHVybiBzZXQ7XG59XG5cbi8qKlxuICogQSBmYXN0ZXIgYWx0ZXJuYXRpdmUgdG8gYEZ1bmN0aW9uI2FwcGx5YCwgdGhpcyBmdW5jdGlvbiBpbnZva2VzIGBmdW5jYFxuICogd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgYHRoaXNBcmdgIGFuZCB0aGUgYXJndW1lbnRzIG9mIGBhcmdzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaW52b2tlLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzIFRoZSBhcmd1bWVudHMgdG8gaW52b2tlIGBmdW5jYCB3aXRoLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuXG4gKi9cbmZ1bmN0aW9uIGFwcGx5KGZ1bmMsIHRoaXNBcmcsIGFyZ3MpIHtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnKTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgfVxuICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uZm9yRWFjaGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5RWFjaChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpID09PSBmYWxzZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBBcHBlbmRzIHRoZSBlbGVtZW50cyBvZiBgdmFsdWVzYCB0byBgYXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFRoZSB2YWx1ZXMgdG8gYXBwZW5kLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5UHVzaChhcnJheSwgdmFsdWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gdmFsdWVzLmxlbmd0aCxcbiAgICAgIG9mZnNldCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W29mZnNldCArIGluZGV4XSA9IHZhbHVlc1tpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5yZWR1Y2VgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2FjY3VtdWxhdG9yXSBUaGUgaW5pdGlhbCB2YWx1ZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2luaXRBY2N1bV0gU3BlY2lmeSB1c2luZyB0aGUgZmlyc3QgZWxlbWVudCBvZiBgYXJyYXlgIGFzXG4gKiAgdGhlIGluaXRpYWwgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgYWNjdW11bGF0ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGFycmF5UmVkdWNlKGFycmF5LCBpdGVyYXRlZSwgYWNjdW11bGF0b3IsIGluaXRBY2N1bSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcblxuICBpZiAoaW5pdEFjY3VtICYmIGxlbmd0aCkge1xuICAgIGFjY3VtdWxhdG9yID0gYXJyYXlbKytpbmRleF07XG4gIH1cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhY2N1bXVsYXRvciA9IGl0ZXJhdGVlKGFjY3VtdWxhdG9yLCBhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSk7XG4gIH1cbiAgcmV0dXJuIGFjY3VtdWxhdG9yO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAqIG9yIG1heCBhcnJheSBsZW5ndGggY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGludm9rZSBgaXRlcmF0ZWVgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuYXJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIHN0b3JpbmcgbWV0YWRhdGEuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNhcCBhcmd1bWVudHMgZm9yLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY2FwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlVW5hcnkoZnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZnVuYyh2YWx1ZSk7XG4gIH07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGdldFZhbHVlKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QgaW4gSUUgPCA5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNIb3N0T2JqZWN0KHZhbHVlKSB7XG4gIC8vIE1hbnkgaG9zdCBvYmplY3RzIGFyZSBgT2JqZWN0YCBvYmplY3RzIHRoYXQgY2FuIGNvZXJjZSB0byBzdHJpbmdzXG4gIC8vIGRlc3BpdGUgaGF2aW5nIGltcHJvcGVybHkgZGVmaW5lZCBgdG9TdHJpbmdgIG1ldGhvZHMuXG4gIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgaWYgKHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlLnRvU3RyaW5nICE9ICdmdW5jdGlvbicpIHtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gISEodmFsdWUgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBtYXBgIHRvIGl0cyBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBrZXktdmFsdWUgcGFpcnMuXG4gKi9cbmZ1bmN0aW9uIG1hcFRvQXJyYXkobWFwKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobWFwLnNpemUpO1xuXG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSBba2V5LCB2YWx1ZV07XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB1bmFyeSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBmdW5jKHRyYW5zZm9ybShhcmcpKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgc2V0YCB0byBhbiBhcnJheSBvZiBpdHMgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBzZXRUb0FycmF5KHNldCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KHNldC5zaXplKTtcblxuICBzZXQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsXG4gICAgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbnZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdWlkID0gL1teLl0rJC8uZXhlYyhjb3JlSnNEYXRhICYmIGNvcmVKc0RhdGEua2V5cyAmJiBjb3JlSnNEYXRhLmtleXMuSUVfUFJPVE8gfHwgJycpO1xuICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG59KCkpO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBpbmZlciB0aGUgYE9iamVjdGAgY29uc3RydWN0b3IuICovXG52YXIgb2JqZWN0Q3RvclN0cmluZyA9IGZ1bmNUb1N0cmluZy5jYWxsKE9iamVjdCk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBCdWZmZXIgPSBtb2R1bGVFeHBvcnRzID8gcm9vdC5CdWZmZXIgOiB1bmRlZmluZWQsXG4gICAgU3ltYm9sID0gcm9vdC5TeW1ib2wsXG4gICAgVWludDhBcnJheSA9IHJvb3QuVWludDhBcnJheSxcbiAgICBnZXRQcm90b3R5cGUgPSBvdmVyQXJnKE9iamVjdC5nZXRQcm90b3R5cGVPZiwgT2JqZWN0KSxcbiAgICBvYmplY3RDcmVhdGUgPSBPYmplY3QuY3JlYXRlLFxuICAgIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGUsXG4gICAgc3BsaWNlID0gYXJyYXlQcm90by5zcGxpY2U7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVHZXRTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyxcbiAgICBuYXRpdmVJc0J1ZmZlciA9IEJ1ZmZlciA/IEJ1ZmZlci5pc0J1ZmZlciA6IHVuZGVmaW5lZCxcbiAgICBuYXRpdmVLZXlzID0gb3ZlckFyZyhPYmplY3Qua2V5cywgT2JqZWN0KSxcbiAgICBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIERhdGFWaWV3ID0gZ2V0TmF0aXZlKHJvb3QsICdEYXRhVmlldycpLFxuICAgIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyksXG4gICAgUHJvbWlzZSA9IGdldE5hdGl2ZShyb290LCAnUHJvbWlzZScpLFxuICAgIFNldCA9IGdldE5hdGl2ZShyb290LCAnU2V0JyksXG4gICAgV2Vha01hcCA9IGdldE5hdGl2ZShyb290LCAnV2Vha01hcCcpLFxuICAgIG5hdGl2ZUNyZWF0ZSA9IGdldE5hdGl2ZShPYmplY3QsICdjcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1hcHMsIHNldHMsIGFuZCB3ZWFrbWFwcy4gKi9cbnZhciBkYXRhVmlld0N0b3JTdHJpbmcgPSB0b1NvdXJjZShEYXRhVmlldyksXG4gICAgbWFwQ3RvclN0cmluZyA9IHRvU291cmNlKE1hcCksXG4gICAgcHJvbWlzZUN0b3JTdHJpbmcgPSB0b1NvdXJjZShQcm9taXNlKSxcbiAgICBzZXRDdG9yU3RyaW5nID0gdG9Tb3VyY2UoU2V0KSxcbiAgICB3ZWFrTWFwQ3RvclN0cmluZyA9IHRvU291cmNlKFdlYWtNYXApO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVmFsdWVPZiA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udmFsdWVPZiA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgaGFzaCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIEhhc2goZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIEhhc2hcbiAqL1xuZnVuY3Rpb24gaGFzaENsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmF0aXZlQ3JlYXRlID8gbmF0aXZlQ3JlYXRlKG51bGwpIDoge307XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoRGVsZXRlKGtleSkge1xuICByZXR1cm4gdGhpcy5oYXMoa2V5KSAmJiBkZWxldGUgdGhpcy5fX2RhdGFfX1trZXldO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGhhc2ggdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gaGFzaEdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAobmF0aXZlQ3JlYXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRhdGFba2V5XTtcbiAgICByZXR1cm4gcmVzdWx0ID09PSBIQVNIX1VOREVGSU5FRCA/IHVuZGVmaW5lZCA6IHJlc3VsdDtcbiAgfVxuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpID8gZGF0YVtrZXldIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGhhc2ggdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hIYXMoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgcmV0dXJuIG5hdGl2ZUNyZWF0ZSA/IGRhdGFba2V5XSAhPT0gdW5kZWZpbmVkIDogaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBoYXNoIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQgOiB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBIYXNoYC5cbkhhc2gucHJvdG90eXBlLmNsZWFyID0gaGFzaENsZWFyO1xuSGFzaC5wcm90b3R5cGVbJ2RlbGV0ZSddID0gaGFzaERlbGV0ZTtcbkhhc2gucHJvdG90eXBlLmdldCA9IGhhc2hHZXQ7XG5IYXNoLnByb3RvdHlwZS5oYXMgPSBoYXNoSGFzO1xuSGFzaC5wcm90b3R5cGUuc2V0ID0gaGFzaFNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGxpc3QgY2FjaGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBMaXN0Q2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IFtdO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgbGFzdEluZGV4ID0gZGF0YS5sZW5ndGggLSAxO1xuICBpZiAoaW5kZXggPT0gbGFzdEluZGV4KSB7XG4gICAgZGF0YS5wb3AoKTtcbiAgfSBlbHNlIHtcbiAgICBzcGxpY2UuY2FsbChkYXRhLCBpbmRleCwgMSk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogZGF0YVtpbmRleF1bMV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBhc3NvY0luZGV4T2YodGhpcy5fX2RhdGFfXywga2V5KSA+IC0xO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGxpc3QgY2FjaGUgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGxpc3QgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIGRhdGEucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9IGVsc2Uge1xuICAgIGRhdGFbaW5kZXhdWzFdID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBMaXN0Q2FjaGVgLlxuTGlzdENhY2hlLnByb3RvdHlwZS5jbGVhciA9IGxpc3RDYWNoZUNsZWFyO1xuTGlzdENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBsaXN0Q2FjaGVEZWxldGU7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmdldCA9IGxpc3RDYWNoZUdldDtcbkxpc3RDYWNoZS5wcm90b3R5cGUuaGFzID0gbGlzdENhY2hlSGFzO1xuTGlzdENhY2hlLnByb3RvdHlwZS5zZXQgPSBsaXN0Q2FjaGVTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcCBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBNYXBDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0ge1xuICAgICdoYXNoJzogbmV3IEhhc2gsXG4gICAgJ21hcCc6IG5ldyAoTWFwIHx8IExpc3RDYWNoZSksXG4gICAgJ3N0cmluZyc6IG5ldyBIYXNoXG4gIH07XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZURlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KVsnZGVsZXRlJ10oa2V5KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBtYXAgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlR2V0KGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmdldChrZXkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIG1hcCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIG1hcCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBtYXAgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLnNldChrZXksIHZhbHVlKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBNYXBDYWNoZWAuXG5NYXBDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBtYXBDYWNoZUNsZWFyO1xuTWFwQ2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IG1hcENhY2hlRGVsZXRlO1xuTWFwQ2FjaGUucHJvdG90eXBlLmdldCA9IG1hcENhY2hlR2V0O1xuTWFwQ2FjaGUucHJvdG90eXBlLmhhcyA9IG1hcENhY2hlSGFzO1xuTWFwQ2FjaGUucHJvdG90eXBlLnNldCA9IG1hcENhY2hlU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBzdGFjayBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTdGFjayhlbnRyaWVzKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlKGVudHJpZXMpO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIHN0YWNrLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIFN0YWNrXG4gKi9cbmZ1bmN0aW9uIHN0YWNrQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0RlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX19bJ2RlbGV0ZSddKGtleSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgc3RhY2sgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrR2V0KGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5nZXQoa2V5KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBzdGFjayB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrSGFzKGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBzdGFjayBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBzdGFjayBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgY2FjaGUgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAoY2FjaGUgaW5zdGFuY2VvZiBMaXN0Q2FjaGUpIHtcbiAgICB2YXIgcGFpcnMgPSBjYWNoZS5fX2RhdGFfXztcbiAgICBpZiAoIU1hcCB8fCAocGFpcnMubGVuZ3RoIDwgTEFSR0VfQVJSQVlfU0laRSAtIDEpKSB7XG4gICAgICBwYWlycy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgY2FjaGUgPSB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlKHBhaXJzKTtcbiAgfVxuICBjYWNoZS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgU3RhY2tgLlxuU3RhY2sucHJvdG90eXBlLmNsZWFyID0gc3RhY2tDbGVhcjtcblN0YWNrLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBzdGFja0RlbGV0ZTtcblN0YWNrLnByb3RvdHlwZS5nZXQgPSBzdGFja0dldDtcblN0YWNrLnByb3RvdHlwZS5oYXMgPSBzdGFja0hhcztcblN0YWNrLnByb3RvdHlwZS5zZXQgPSBzdGFja1NldDtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIHRoZSBhcnJheS1saWtlIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtib29sZWFufSBpbmhlcml0ZWQgU3BlY2lmeSByZXR1cm5pbmcgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYXJyYXlMaWtlS2V5cyh2YWx1ZSwgaW5oZXJpdGVkKSB7XG4gIC8vIFNhZmFyaSA4LjEgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIC8vIFNhZmFyaSA5IG1ha2VzIGBhcmd1bWVudHMubGVuZ3RoYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICB2YXIgcmVzdWx0ID0gKGlzQXJyYXkodmFsdWUpIHx8IGlzQXJndW1lbnRzKHZhbHVlKSlcbiAgICA/IGJhc2VUaW1lcyh2YWx1ZS5sZW5ndGgsIFN0cmluZylcbiAgICA6IFtdO1xuXG4gIHZhciBsZW5ndGggPSByZXN1bHQubGVuZ3RoLFxuICAgICAgc2tpcEluZGV4ZXMgPSAhIWxlbmd0aDtcblxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAoKGluaGVyaXRlZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSAmJlxuICAgICAgICAhKHNraXBJbmRleGVzICYmIChrZXkgPT0gJ2xlbmd0aCcgfHwgaXNJbmRleChrZXksIGxlbmd0aCkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgYGFzc2lnblZhbHVlYCBleGNlcHQgdGhhdCBpdCBkb2Vzbid0IGFzc2lnblxuICogYHVuZGVmaW5lZGAgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIGlmICgodmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhZXEob2JqZWN0W2tleV0sIHZhbHVlKSkgfHxcbiAgICAgICh0eXBlb2Yga2V5ID09ICdudW1iZXInICYmIHZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG59XG5cbi8qKlxuICogQXNzaWducyBgdmFsdWVgIHRvIGBrZXlgIG9mIGBvYmplY3RgIGlmIHRoZSBleGlzdGluZyB2YWx1ZSBpcyBub3QgZXF1aXZhbGVudFxuICogdXNpbmcgW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGZvciBlcXVhbGl0eSBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV07XG4gIGlmICghKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGVxKG9ialZhbHVlLCB2YWx1ZSkpIHx8XG4gICAgICAodmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSkge1xuICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIH1cbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgYGtleWAgaXMgZm91bmQgaW4gYGFycmF5YCBvZiBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSBrZXkgVGhlIGtleSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKGVxKGFycmF5W2xlbmd0aF1bMF0sIGtleSkpIHtcbiAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5hc3NpZ25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgbXVsdGlwbGUgc291cmNlc1xuICogb3IgYGN1c3RvbWl6ZXJgIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VBc3NpZ24ob2JqZWN0LCBzb3VyY2UpIHtcbiAgcmV0dXJuIG9iamVjdCAmJiBjb3B5T2JqZWN0KHNvdXJjZSwga2V5cyhzb3VyY2UpLCBvYmplY3QpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmNsb25lYCBhbmQgYF8uY2xvbmVEZWVwYCB3aGljaCB0cmFja3NcbiAqIHRyYXZlcnNlZCBvYmplY3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0Z1bGxdIFNwZWNpZnkgYSBjbG9uZSBpbmNsdWRpbmcgc3ltYm9scy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNsb25pbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2tleV0gVGhlIGtleSBvZiBgdmFsdWVgLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBwYXJlbnQgb2JqZWN0IG9mIGB2YWx1ZWAuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIG9iamVjdHMgYW5kIHRoZWlyIGNsb25lIGNvdW50ZXJwYXJ0cy5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBjbG9uZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VDbG9uZSh2YWx1ZSwgaXNEZWVwLCBpc0Z1bGwsIGN1c3RvbWl6ZXIsIGtleSwgb2JqZWN0LCBzdGFjaykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoY3VzdG9taXplcikge1xuICAgIHJlc3VsdCA9IG9iamVjdCA/IGN1c3RvbWl6ZXIodmFsdWUsIGtleSwgb2JqZWN0LCBzdGFjaykgOiBjdXN0b21pemVyKHZhbHVlKTtcbiAgfVxuICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZhciBpc0FyciA9IGlzQXJyYXkodmFsdWUpO1xuICBpZiAoaXNBcnIpIHtcbiAgICByZXN1bHQgPSBpbml0Q2xvbmVBcnJheSh2YWx1ZSk7XG4gICAgaWYgKCFpc0RlZXApIHtcbiAgICAgIHJldHVybiBjb3B5QXJyYXkodmFsdWUsIHJlc3VsdCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciB0YWcgPSBnZXRUYWcodmFsdWUpLFxuICAgICAgICBpc0Z1bmMgPSB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xuXG4gICAgaWYgKGlzQnVmZmVyKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGNsb25lQnVmZmVyKHZhbHVlLCBpc0RlZXApO1xuICAgIH1cbiAgICBpZiAodGFnID09IG9iamVjdFRhZyB8fCB0YWcgPT0gYXJnc1RhZyB8fCAoaXNGdW5jICYmICFvYmplY3QpKSB7XG4gICAgICBpZiAoaXNIb3N0T2JqZWN0KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gb2JqZWN0ID8gdmFsdWUgOiB7fTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCA9IGluaXRDbG9uZU9iamVjdChpc0Z1bmMgPyB7fSA6IHZhbHVlKTtcbiAgICAgIGlmICghaXNEZWVwKSB7XG4gICAgICAgIHJldHVybiBjb3B5U3ltYm9scyh2YWx1ZSwgYmFzZUFzc2lnbihyZXN1bHQsIHZhbHVlKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghY2xvbmVhYmxlVGFnc1t0YWddKSB7XG4gICAgICAgIHJldHVybiBvYmplY3QgPyB2YWx1ZSA6IHt9O1xuICAgICAgfVxuICAgICAgcmVzdWx0ID0gaW5pdENsb25lQnlUYWcodmFsdWUsIHRhZywgYmFzZUNsb25lLCBpc0RlZXApO1xuICAgIH1cbiAgfVxuICAvLyBDaGVjayBmb3IgY2lyY3VsYXIgcmVmZXJlbmNlcyBhbmQgcmV0dXJuIGl0cyBjb3JyZXNwb25kaW5nIGNsb25lLlxuICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldCh2YWx1ZSk7XG4gIGlmIChzdGFja2VkKSB7XG4gICAgcmV0dXJuIHN0YWNrZWQ7XG4gIH1cbiAgc3RhY2suc2V0KHZhbHVlLCByZXN1bHQpO1xuXG4gIGlmICghaXNBcnIpIHtcbiAgICB2YXIgcHJvcHMgPSBpc0Z1bGwgPyBnZXRBbGxLZXlzKHZhbHVlKSA6IGtleXModmFsdWUpO1xuICB9XG4gIGFycmF5RWFjaChwcm9wcyB8fCB2YWx1ZSwgZnVuY3Rpb24oc3ViVmFsdWUsIGtleSkge1xuICAgIGlmIChwcm9wcykge1xuICAgICAga2V5ID0gc3ViVmFsdWU7XG4gICAgICBzdWJWYWx1ZSA9IHZhbHVlW2tleV07XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IHBvcHVsYXRlIGNsb25lIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgYXNzaWduVmFsdWUocmVzdWx0LCBrZXksIGJhc2VDbG9uZShzdWJWYWx1ZSwgaXNEZWVwLCBpc0Z1bGwsIGN1c3RvbWl6ZXIsIGtleSwgdmFsdWUsIHN0YWNrKSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmNyZWF0ZWAgd2l0aG91dCBzdXBwb3J0IGZvciBhc3NpZ25pbmdcbiAqIHByb3BlcnRpZXMgdG8gdGhlIGNyZWF0ZWQgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvdG90eXBlIFRoZSBvYmplY3QgdG8gaW5oZXJpdCBmcm9tLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gYmFzZUNyZWF0ZShwcm90bykge1xuICByZXR1cm4gaXNPYmplY3QocHJvdG8pID8gb2JqZWN0Q3JlYXRlKHByb3RvKSA6IHt9O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRBbGxLZXlzYCBhbmQgYGdldEFsbEtleXNJbmAgd2hpY2ggdXNlc1xuICogYGtleXNGdW5jYCBhbmQgYHN5bWJvbHNGdW5jYCB0byBnZXQgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgYW5kXG4gKiBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3ltYm9sc0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRBbGxLZXlzKG9iamVjdCwga2V5c0Z1bmMsIHN5bWJvbHNGdW5jKSB7XG4gIHZhciByZXN1bHQgPSBrZXlzRnVuYyhvYmplY3QpO1xuICByZXR1cm4gaXNBcnJheShvYmplY3QpID8gcmVzdWx0IDogYXJyYXlQdXNoKHJlc3VsdCwgc3ltYm9sc0Z1bmMob2JqZWN0KSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICByZXR1cm4gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYXRpdmVgIHdpdGhvdXQgYmFkIHNoaW0gY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IChpc0Z1bmN0aW9uKHZhbHVlKSB8fCBpc0hvc3RPYmplY3QodmFsdWUpKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc1R5cGVkQXJyYXlgIHdpdGhvdXQgTm9kZS5qcyBvcHRpbWl6YXRpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJlxuICAgIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgISF0eXBlZEFycmF5VGFnc1tvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKV07XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c2Agd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5cyhvYmplY3QpIHtcbiAgaWYgKCFpc1Byb3RvdHlwZShvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXMob2JqZWN0KTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBrZXkgIT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzSW5gIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXNJbihvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXNJbihvYmplY3QpO1xuICB9XG4gIHZhciBpc1Byb3RvID0gaXNQcm90b3R5cGUob2JqZWN0KSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoIShrZXkgPT0gJ2NvbnN0cnVjdG9yJyAmJiAoaXNQcm90byB8fCAhaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tZXJnZWAgd2l0aG91dCBzdXBwb3J0IGZvciBtdWx0aXBsZSBzb3VyY2VzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtudW1iZXJ9IHNyY0luZGV4IFRoZSBpbmRleCBvZiBgc291cmNlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIG1lcmdlZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSB2YWx1ZXMgYW5kIHRoZWlyIG1lcmdlZFxuICogIGNvdW50ZXJwYXJ0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlKG9iamVjdCwgc291cmNlLCBzcmNJbmRleCwgY3VzdG9taXplciwgc3RhY2spIHtcbiAgaWYgKG9iamVjdCA9PT0gc291cmNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghKGlzQXJyYXkoc291cmNlKSB8fCBpc1R5cGVkQXJyYXkoc291cmNlKSkpIHtcbiAgICB2YXIgcHJvcHMgPSBiYXNlS2V5c0luKHNvdXJjZSk7XG4gIH1cbiAgYXJyYXlFYWNoKHByb3BzIHx8IHNvdXJjZSwgZnVuY3Rpb24oc3JjVmFsdWUsIGtleSkge1xuICAgIGlmIChwcm9wcykge1xuICAgICAga2V5ID0gc3JjVmFsdWU7XG4gICAgICBzcmNWYWx1ZSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgICBpZiAoaXNPYmplY3Qoc3JjVmFsdWUpKSB7XG4gICAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgICAgYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBzcmNJbmRleCwgYmFzZU1lcmdlLCBjdXN0b21pemVyLCBzdGFjayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgICAgICA/IGN1c3RvbWl6ZXIob2JqZWN0W2tleV0sIHNyY1ZhbHVlLCAoa2V5ICsgJycpLCBvYmplY3QsIHNvdXJjZSwgc3RhY2spXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICBpZiAobmV3VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBuZXdWYWx1ZSA9IHNyY1ZhbHVlO1xuICAgICAgfVxuICAgICAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlTWVyZ2VgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgbWVyZ2VzIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIG1lcmdlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gbWVyZ2UuXG4gKiBAcGFyYW0ge251bWJlcn0gc3JjSW5kZXggVGhlIGluZGV4IG9mIGBzb3VyY2VgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWVyZ2VGdW5jIFRoZSBmdW5jdGlvbiB0byBtZXJnZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBhc3NpZ25lZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSB2YWx1ZXMgYW5kIHRoZWlyIG1lcmdlZFxuICogIGNvdW50ZXJwYXJ0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBzcmNJbmRleCwgbWVyZ2VGdW5jLCBjdXN0b21pemVyLCBzdGFjaykge1xuICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgIHNyY1ZhbHVlID0gc291cmNlW2tleV0sXG4gICAgICBzdGFja2VkID0gc3RhY2suZ2V0KHNyY1ZhbHVlKTtcblxuICBpZiAoc3RhY2tlZCkge1xuICAgIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIHN0YWNrZWQpO1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgPyBjdXN0b21pemVyKG9ialZhbHVlLCBzcmNWYWx1ZSwgKGtleSArICcnKSwgb2JqZWN0LCBzb3VyY2UsIHN0YWNrKVxuICAgIDogdW5kZWZpbmVkO1xuXG4gIHZhciBpc0NvbW1vbiA9IG5ld1ZhbHVlID09PSB1bmRlZmluZWQ7XG5cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgbmV3VmFsdWUgPSBzcmNWYWx1ZTtcbiAgICBpZiAoaXNBcnJheShzcmNWYWx1ZSkgfHwgaXNUeXBlZEFycmF5KHNyY1ZhbHVlKSkge1xuICAgICAgaWYgKGlzQXJyYXkob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gb2JqVmFsdWU7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc0FycmF5TGlrZU9iamVjdChvYmpWYWx1ZSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBjb3B5QXJyYXkob2JqVmFsdWUpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgICAgIG5ld1ZhbHVlID0gYmFzZUNsb25lKHNyY1ZhbHVlLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChzcmNWYWx1ZSkgfHwgaXNBcmd1bWVudHMoc3JjVmFsdWUpKSB7XG4gICAgICBpZiAoaXNBcmd1bWVudHMob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gdG9QbGFpbk9iamVjdChvYmpWYWx1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICghaXNPYmplY3Qob2JqVmFsdWUpIHx8IChzcmNJbmRleCAmJiBpc0Z1bmN0aW9uKG9ialZhbHVlKSkpIHtcbiAgICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICAgICAgbmV3VmFsdWUgPSBiYXNlQ2xvbmUoc3JjVmFsdWUsIHRydWUpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG5ld1ZhbHVlID0gb2JqVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgLy8gUmVjdXJzaXZlbHkgbWVyZ2Ugb2JqZWN0cyBhbmQgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgc3RhY2suc2V0KHNyY1ZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgbWVyZ2VGdW5jKG5ld1ZhbHVlLCBzcmNWYWx1ZSwgc3JjSW5kZXgsIGN1c3RvbWl6ZXIsIHN0YWNrKTtcbiAgICBzdGFja1snZGVsZXRlJ10oc3JjVmFsdWUpO1xuICB9XG4gIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIG5ld1ZhbHVlKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5yZXN0YCB3aGljaCBkb2Vzbid0IHZhbGlkYXRlIG9yIGNvZXJjZSBhcmd1bWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVJlc3QoZnVuYywgc3RhcnQpIHtcbiAgc3RhcnQgPSBuYXRpdmVNYXgoc3RhcnQgPT09IHVuZGVmaW5lZCA/IChmdW5jLmxlbmd0aCAtIDEpIDogc3RhcnQsIDApO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IG5hdGl2ZU1heChhcmdzLmxlbmd0aCAtIHN0YXJ0LCAwKSxcbiAgICAgICAgYXJyYXkgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIGFycmF5W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgfVxuICAgIGluZGV4ID0gLTE7XG4gICAgdmFyIG90aGVyQXJncyA9IEFycmF5KHN0YXJ0ICsgMSk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBzdGFydCkge1xuICAgICAgb3RoZXJBcmdzW2luZGV4XSA9IGFyZ3NbaW5kZXhdO1xuICAgIH1cbiAgICBvdGhlckFyZ3Nbc3RhcnRdID0gYXJyYXk7XG4gICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXMsIG90aGVyQXJncyk7XG4gIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mICBgYnVmZmVyYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZmZlciBUaGUgYnVmZmVyIHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtCdWZmZXJ9IFJldHVybnMgdGhlIGNsb25lZCBidWZmZXIuXG4gKi9cbmZ1bmN0aW9uIGNsb25lQnVmZmVyKGJ1ZmZlciwgaXNEZWVwKSB7XG4gIGlmIChpc0RlZXApIHtcbiAgICByZXR1cm4gYnVmZmVyLnNsaWNlKCk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IG5ldyBidWZmZXIuY29uc3RydWN0b3IoYnVmZmVyLmxlbmd0aCk7XG4gIGJ1ZmZlci5jb3B5KHJlc3VsdCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBhcnJheUJ1ZmZlcmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IGFycmF5QnVmZmVyIFRoZSBhcnJheSBidWZmZXIgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7QXJyYXlCdWZmZXJ9IFJldHVybnMgdGhlIGNsb25lZCBhcnJheSBidWZmZXIuXG4gKi9cbmZ1bmN0aW9uIGNsb25lQXJyYXlCdWZmZXIoYXJyYXlCdWZmZXIpIHtcbiAgdmFyIHJlc3VsdCA9IG5ldyBhcnJheUJ1ZmZlci5jb25zdHJ1Y3RvcihhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgbmV3IFVpbnQ4QXJyYXkocmVzdWx0KS5zZXQobmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIpKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYGRhdGFWaWV3YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFWaWV3IFRoZSBkYXRhIHZpZXcgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIGRhdGEgdmlldy5cbiAqL1xuZnVuY3Rpb24gY2xvbmVEYXRhVmlldyhkYXRhVmlldywgaXNEZWVwKSB7XG4gIHZhciBidWZmZXIgPSBpc0RlZXAgPyBjbG9uZUFycmF5QnVmZmVyKGRhdGFWaWV3LmJ1ZmZlcikgOiBkYXRhVmlldy5idWZmZXI7XG4gIHJldHVybiBuZXcgZGF0YVZpZXcuY29uc3RydWN0b3IoYnVmZmVyLCBkYXRhVmlldy5ieXRlT2Zmc2V0LCBkYXRhVmlldy5ieXRlTGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjbG9uZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNsb25lRnVuYyBUaGUgZnVuY3Rpb24gdG8gY2xvbmUgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCBtYXAuXG4gKi9cbmZ1bmN0aW9uIGNsb25lTWFwKG1hcCwgaXNEZWVwLCBjbG9uZUZ1bmMpIHtcbiAgdmFyIGFycmF5ID0gaXNEZWVwID8gY2xvbmVGdW5jKG1hcFRvQXJyYXkobWFwKSwgdHJ1ZSkgOiBtYXBUb0FycmF5KG1hcCk7XG4gIHJldHVybiBhcnJheVJlZHVjZShhcnJheSwgYWRkTWFwRW50cnksIG5ldyBtYXAuY29uc3RydWN0b3IpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgcmVnZXhwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHJlZ2V4cCBUaGUgcmVnZXhwIHRvIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIHJlZ2V4cC5cbiAqL1xuZnVuY3Rpb24gY2xvbmVSZWdFeHAocmVnZXhwKSB7XG4gIHZhciByZXN1bHQgPSBuZXcgcmVnZXhwLmNvbnN0cnVjdG9yKHJlZ2V4cC5zb3VyY2UsIHJlRmxhZ3MuZXhlYyhyZWdleHApKTtcbiAgcmVzdWx0Lmxhc3RJbmRleCA9IHJlZ2V4cC5sYXN0SW5kZXg7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBzZXRgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjbG9uZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNsb25lIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgc2V0LlxuICovXG5mdW5jdGlvbiBjbG9uZVNldChzZXQsIGlzRGVlcCwgY2xvbmVGdW5jKSB7XG4gIHZhciBhcnJheSA9IGlzRGVlcCA/IGNsb25lRnVuYyhzZXRUb0FycmF5KHNldCksIHRydWUpIDogc2V0VG9BcnJheShzZXQpO1xuICByZXR1cm4gYXJyYXlSZWR1Y2UoYXJyYXksIGFkZFNldEVudHJ5LCBuZXcgc2V0LmNvbnN0cnVjdG9yKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgdGhlIGBzeW1ib2xgIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHN5bWJvbCBUaGUgc3ltYm9sIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCBzeW1ib2wgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBjbG9uZVN5bWJvbChzeW1ib2wpIHtcbiAgcmV0dXJuIHN5bWJvbFZhbHVlT2YgPyBPYmplY3Qoc3ltYm9sVmFsdWVPZi5jYWxsKHN5bWJvbCkpIDoge307XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGB0eXBlZEFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHR5cGVkQXJyYXkgVGhlIHR5cGVkIGFycmF5IHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCB0eXBlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gY2xvbmVUeXBlZEFycmF5KHR5cGVkQXJyYXksIGlzRGVlcCkge1xuICB2YXIgYnVmZmVyID0gaXNEZWVwID8gY2xvbmVBcnJheUJ1ZmZlcih0eXBlZEFycmF5LmJ1ZmZlcikgOiB0eXBlZEFycmF5LmJ1ZmZlcjtcbiAgcmV0dXJuIG5ldyB0eXBlZEFycmF5LmNvbnN0cnVjdG9yKGJ1ZmZlciwgdHlwZWRBcnJheS5ieXRlT2Zmc2V0LCB0eXBlZEFycmF5Lmxlbmd0aCk7XG59XG5cbi8qKlxuICogQ29waWVzIHRoZSB2YWx1ZXMgb2YgYHNvdXJjZWAgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gc291cmNlIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5PVtdXSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgdG8uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gY29weUFycmF5KHNvdXJjZSwgYXJyYXkpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBzb3VyY2UubGVuZ3RoO1xuXG4gIGFycmF5IHx8IChhcnJheSA9IEFycmF5KGxlbmd0aCkpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W2luZGV4XSA9IHNvdXJjZVtpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG4vKipcbiAqIENvcGllcyBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgaWRlbnRpZmllcnMgdG8gY29weS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0PXt9XSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyB0by5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvcGllZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBjb3B5T2JqZWN0KHNvdXJjZSwgcHJvcHMsIG9iamVjdCwgY3VzdG9taXplcikge1xuICBvYmplY3QgfHwgKG9iamVjdCA9IHt9KTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG5cbiAgICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgICA/IGN1c3RvbWl6ZXIob2JqZWN0W2tleV0sIHNvdXJjZVtrZXldLCBrZXksIG9iamVjdCwgc291cmNlKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUgPT09IHVuZGVmaW5lZCA/IHNvdXJjZVtrZXldIDogbmV3VmFsdWUpO1xuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbi8qKlxuICogQ29waWVzIG93biBzeW1ib2wgcHJvcGVydGllcyBvZiBgc291cmNlYCB0byBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IHRvIGNvcHkgc3ltYm9scyBmcm9tLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3Q9e31dIFRoZSBvYmplY3QgdG8gY29weSBzeW1ib2xzIHRvLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gY29weVN5bWJvbHMoc291cmNlLCBvYmplY3QpIHtcbiAgcmV0dXJuIGNvcHlPYmplY3Qoc291cmNlLCBnZXRTeW1ib2xzKHNvdXJjZSksIG9iamVjdCk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIGxpa2UgYF8uYXNzaWduYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gYXNzaWduZXIgVGhlIGZ1bmN0aW9uIHRvIGFzc2lnbiB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhc3NpZ25lciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQXNzaWduZXIoYXNzaWduZXIpIHtcbiAgcmV0dXJuIGJhc2VSZXN0KGZ1bmN0aW9uKG9iamVjdCwgc291cmNlcykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBzb3VyY2VzLmxlbmd0aCxcbiAgICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA+IDEgPyBzb3VyY2VzW2xlbmd0aCAtIDFdIDogdW5kZWZpbmVkLFxuICAgICAgICBndWFyZCA9IGxlbmd0aCA+IDIgPyBzb3VyY2VzWzJdIDogdW5kZWZpbmVkO1xuXG4gICAgY3VzdG9taXplciA9IChhc3NpZ25lci5sZW5ndGggPiAzICYmIHR5cGVvZiBjdXN0b21pemVyID09ICdmdW5jdGlvbicpXG4gICAgICA/IChsZW5ndGgtLSwgY3VzdG9taXplcilcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGd1YXJkICYmIGlzSXRlcmF0ZWVDYWxsKHNvdXJjZXNbMF0sIHNvdXJjZXNbMV0sIGd1YXJkKSkge1xuICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA8IDMgPyB1bmRlZmluZWQgOiBjdXN0b21pemVyO1xuICAgICAgbGVuZ3RoID0gMTtcbiAgICB9XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBzb3VyY2VzW2luZGV4XTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgYXNzaWduZXIob2JqZWN0LCBzb3VyY2UsIGluZGV4LCBjdXN0b21pemVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scy5cbiAqL1xuZnVuY3Rpb24gZ2V0QWxsS2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGJhc2VHZXRBbGxLZXlzKG9iamVjdCwga2V5cywgZ2V0U3ltYm9scyk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgZGF0YSBmb3IgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIHJlZmVyZW5jZSBrZXkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWFwIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGdldE1hcERhdGEobWFwLCBrZXkpIHtcbiAgdmFyIGRhdGEgPSBtYXAuX19kYXRhX187XG4gIHJldHVybiBpc0tleWFibGUoa2V5KVxuICAgID8gZGF0YVt0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8gJ3N0cmluZycgOiAnaGFzaCddXG4gICAgOiBkYXRhLm1hcDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBzeW1ib2wgcHJvcGVydGllcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBzeW1ib2xzLlxuICovXG52YXIgZ2V0U3ltYm9scyA9IG5hdGl2ZUdldFN5bWJvbHMgPyBvdmVyQXJnKG5hdGl2ZUdldFN5bWJvbHMsIE9iamVjdCkgOiBzdHViQXJyYXk7XG5cbi8qKlxuICogR2V0cyB0aGUgYHRvU3RyaW5nVGFnYCBvZiBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbnZhciBnZXRUYWcgPSBiYXNlR2V0VGFnO1xuXG4vLyBGYWxsYmFjayBmb3IgZGF0YSB2aWV3cywgbWFwcywgc2V0cywgYW5kIHdlYWsgbWFwcyBpbiBJRSAxMSxcbi8vIGZvciBkYXRhIHZpZXdzIGluIEVkZ2UgPCAxNCwgYW5kIHByb21pc2VzIGluIE5vZGUuanMuXG5pZiAoKERhdGFWaWV3ICYmIGdldFRhZyhuZXcgRGF0YVZpZXcobmV3IEFycmF5QnVmZmVyKDEpKSkgIT0gZGF0YVZpZXdUYWcpIHx8XG4gICAgKE1hcCAmJiBnZXRUYWcobmV3IE1hcCkgIT0gbWFwVGFnKSB8fFxuICAgIChQcm9taXNlICYmIGdldFRhZyhQcm9taXNlLnJlc29sdmUoKSkgIT0gcHJvbWlzZVRhZykgfHxcbiAgICAoU2V0ICYmIGdldFRhZyhuZXcgU2V0KSAhPSBzZXRUYWcpIHx8XG4gICAgKFdlYWtNYXAgJiYgZ2V0VGFnKG5ldyBXZWFrTWFwKSAhPSB3ZWFrTWFwVGFnKSkge1xuICBnZXRUYWcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciByZXN1bHQgPSBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSxcbiAgICAgICAgQ3RvciA9IHJlc3VsdCA9PSBvYmplY3RUYWcgPyB2YWx1ZS5jb25zdHJ1Y3RvciA6IHVuZGVmaW5lZCxcbiAgICAgICAgY3RvclN0cmluZyA9IEN0b3IgPyB0b1NvdXJjZShDdG9yKSA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChjdG9yU3RyaW5nKSB7XG4gICAgICBzd2l0Y2ggKGN0b3JTdHJpbmcpIHtcbiAgICAgICAgY2FzZSBkYXRhVmlld0N0b3JTdHJpbmc6IHJldHVybiBkYXRhVmlld1RhZztcbiAgICAgICAgY2FzZSBtYXBDdG9yU3RyaW5nOiByZXR1cm4gbWFwVGFnO1xuICAgICAgICBjYXNlIHByb21pc2VDdG9yU3RyaW5nOiByZXR1cm4gcHJvbWlzZVRhZztcbiAgICAgICAgY2FzZSBzZXRDdG9yU3RyaW5nOiByZXR1cm4gc2V0VGFnO1xuICAgICAgICBjYXNlIHdlYWtNYXBDdG9yU3RyaW5nOiByZXR1cm4gd2Vha01hcFRhZztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyBhbiBhcnJheSBjbG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNsb25lLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBpbml0aWFsaXplZCBjbG9uZS5cbiAqL1xuZnVuY3Rpb24gaW5pdENsb25lQXJyYXkoYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IGFycmF5LmNvbnN0cnVjdG9yKGxlbmd0aCk7XG5cbiAgLy8gQWRkIHByb3BlcnRpZXMgYXNzaWduZWQgYnkgYFJlZ0V4cCNleGVjYC5cbiAgaWYgKGxlbmd0aCAmJiB0eXBlb2YgYXJyYXlbMF0gPT0gJ3N0cmluZycgJiYgaGFzT3duUHJvcGVydHkuY2FsbChhcnJheSwgJ2luZGV4JykpIHtcbiAgICByZXN1bHQuaW5kZXggPSBhcnJheS5pbmRleDtcbiAgICByZXN1bHQuaW5wdXQgPSBhcnJheS5pbnB1dDtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIG9iamVjdCBjbG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZU9iamVjdChvYmplY3QpIHtcbiAgcmV0dXJuICh0eXBlb2Ygb2JqZWN0LmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgIWlzUHJvdG90eXBlKG9iamVjdCkpXG4gICAgPyBiYXNlQ3JlYXRlKGdldFByb3RvdHlwZShvYmplY3QpKVxuICAgIDoge307XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gb2JqZWN0IGNsb25lIGJhc2VkIG9uIGl0cyBgdG9TdHJpbmdUYWdgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIG9ubHkgc3VwcG9ydHMgY2xvbmluZyB2YWx1ZXMgd2l0aCB0YWdzIG9mXG4gKiBgQm9vbGVhbmAsIGBEYXRlYCwgYEVycm9yYCwgYE51bWJlcmAsIGBSZWdFeHBgLCBvciBgU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgYHRvU3RyaW5nVGFnYCBvZiB0aGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2xvbmVGdW5jIFRoZSBmdW5jdGlvbiB0byBjbG9uZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZUJ5VGFnKG9iamVjdCwgdGFnLCBjbG9uZUZ1bmMsIGlzRGVlcCkge1xuICB2YXIgQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcjtcbiAgc3dpdGNoICh0YWcpIHtcbiAgICBjYXNlIGFycmF5QnVmZmVyVGFnOlxuICAgICAgcmV0dXJuIGNsb25lQXJyYXlCdWZmZXIob2JqZWN0KTtcblxuICAgIGNhc2UgYm9vbFRhZzpcbiAgICBjYXNlIGRhdGVUYWc6XG4gICAgICByZXR1cm4gbmV3IEN0b3IoK29iamVjdCk7XG5cbiAgICBjYXNlIGRhdGFWaWV3VGFnOlxuICAgICAgcmV0dXJuIGNsb25lRGF0YVZpZXcob2JqZWN0LCBpc0RlZXApO1xuXG4gICAgY2FzZSBmbG9hdDMyVGFnOiBjYXNlIGZsb2F0NjRUYWc6XG4gICAgY2FzZSBpbnQ4VGFnOiBjYXNlIGludDE2VGFnOiBjYXNlIGludDMyVGFnOlxuICAgIGNhc2UgdWludDhUYWc6IGNhc2UgdWludDhDbGFtcGVkVGFnOiBjYXNlIHVpbnQxNlRhZzogY2FzZSB1aW50MzJUYWc6XG4gICAgICByZXR1cm4gY2xvbmVUeXBlZEFycmF5KG9iamVjdCwgaXNEZWVwKTtcblxuICAgIGNhc2UgbWFwVGFnOlxuICAgICAgcmV0dXJuIGNsb25lTWFwKG9iamVjdCwgaXNEZWVwLCBjbG9uZUZ1bmMpO1xuXG4gICAgY2FzZSBudW1iZXJUYWc6XG4gICAgY2FzZSBzdHJpbmdUYWc6XG4gICAgICByZXR1cm4gbmV3IEN0b3Iob2JqZWN0KTtcblxuICAgIGNhc2UgcmVnZXhwVGFnOlxuICAgICAgcmV0dXJuIGNsb25lUmVnRXhwKG9iamVjdCk7XG5cbiAgICBjYXNlIHNldFRhZzpcbiAgICAgIHJldHVybiBjbG9uZVNldChvYmplY3QsIGlzRGVlcCwgY2xvbmVGdW5jKTtcblxuICAgIGNhc2Ugc3ltYm9sVGFnOlxuICAgICAgcmV0dXJuIGNsb25lU3ltYm9sKG9iamVjdCk7XG4gIH1cbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gISFsZW5ndGggJiZcbiAgICAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSAmJlxuICAgICh2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgdmFsdWUgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IGluZGV4IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgaW5kZXggb3Iga2V5IGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBvYmplY3QgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBvYmplY3QgYXJndW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJdGVyYXRlZUNhbGwodmFsdWUsIGluZGV4LCBvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIGluZGV4O1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJ1xuICAgICAgICA/IChpc0FycmF5TGlrZShvYmplY3QpICYmIGlzSW5kZXgoaW5kZXgsIG9iamVjdC5sZW5ndGgpKVxuICAgICAgICA6ICh0eXBlID09ICdzdHJpbmcnICYmIGluZGV4IGluIG9iamVjdClcbiAgICAgICkge1xuICAgIHJldHVybiBlcShvYmplY3RbaW5kZXhdLCB2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciB1c2UgYXMgdW5pcXVlIG9iamVjdCBrZXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXlhYmxlKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKVxuICAgID8gKHZhbHVlICE9PSAnX19wcm90b19fJylcbiAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm90b3R5cGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgdmFyIEN0b3IgPSB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3RvID0gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUpIHx8IG9iamVjdFByb3RvO1xuXG4gIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBsaWtlXG4gKiBbYE9iamVjdC5rZXlzYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBleGNlcHQgdGhhdCBpdCBpbmNsdWRlcyBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBuYXRpdmVLZXlzSW4ob2JqZWN0KSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgaWYgKG9iamVjdCAhPSBudWxsKSB7XG4gICAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogUGVyZm9ybXMgYVxuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICByZXR1cm4gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICghcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpIHx8IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWcpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pc0FycmF5TGlrZWAgZXhjZXB0IHRoYXQgaXQgYWxzbyBjaGVja3MgaWYgYHZhbHVlYFxuICogaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LWxpa2Ugb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMy4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlciwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBCdWZmZXIoMikpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IFVpbnQ4QXJyYXkoMikpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQnVmZmVyID0gbmF0aXZlSXNCdWZmZXIgfHwgc3R1YkZhbHNlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDgtOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIHRoYXQgaXMsIGFuIG9iamVjdCBjcmVhdGVkIGJ5IHRoZVxuICogYE9iamVjdGAgY29uc3RydWN0b3Igb3Igb25lIHdpdGggYSBgW1tQcm90b3R5cGVdXWAgb2YgYG51bGxgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC44LjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqIH1cbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QobmV3IEZvbyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoeyAneCc6IDAsICd5JzogMCB9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdExpa2UodmFsdWUpIHx8XG4gICAgICBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSAhPSBvYmplY3RUYWcgfHwgaXNIb3N0T2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcHJvdG8gPSBnZXRQcm90b3R5cGUodmFsdWUpO1xuICBpZiAocHJvdG8gPT09IG51bGwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgQ3RvciA9IGhhc093blByb3BlcnR5LmNhbGwocHJvdG8sICdjb25zdHJ1Y3RvcicpICYmIHByb3RvLmNvbnN0cnVjdG9yO1xuICByZXR1cm4gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiZcbiAgICBDdG9yIGluc3RhbmNlb2YgQ3RvciAmJiBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShuZXcgVWludDhBcnJheSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkoW10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzVHlwZWRBcnJheSA9IG5vZGVJc1R5cGVkQXJyYXkgPyBiYXNlVW5hcnkobm9kZUlzVHlwZWRBcnJheSkgOiBiYXNlSXNUeXBlZEFycmF5O1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBwbGFpbiBvYmplY3QgZmxhdHRlbmluZyBpbmhlcml0ZWQgZW51bWVyYWJsZSBzdHJpbmdcbiAqIGtleWVkIHByb3BlcnRpZXMgb2YgYHZhbHVlYCB0byBvd24gcHJvcGVydGllcyBvZiB0aGUgcGxhaW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY29udmVydGVkIHBsYWluIG9iamVjdC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5hc3NpZ24oeyAnYSc6IDEgfSwgbmV3IEZvbyk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyIH1cbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBfLnRvUGxhaW5PYmplY3QobmV3IEZvbykpO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiwgJ2MnOiAzIH1cbiAqL1xuZnVuY3Rpb24gdG9QbGFpbk9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gY29weU9iamVjdCh2YWx1ZSwga2V5c0luKHZhbHVlKSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xuZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCkgOiBiYXNlS2V5cyhvYmplY3QpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzSW4obmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYicsICdjJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24ga2V5c0luKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0LCB0cnVlKSA6IGJhc2VLZXlzSW4ob2JqZWN0KTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmFzc2lnbmAgZXhjZXB0IHRoYXQgaXQgcmVjdXJzaXZlbHkgbWVyZ2VzIG93biBhbmRcbiAqIGluaGVyaXRlZCBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3RzIGludG8gdGhlXG4gKiBkZXN0aW5hdGlvbiBvYmplY3QuIFNvdXJjZSBwcm9wZXJ0aWVzIHRoYXQgcmVzb2x2ZSB0byBgdW5kZWZpbmVkYCBhcmVcbiAqIHNraXBwZWQgaWYgYSBkZXN0aW5hdGlvbiB2YWx1ZSBleGlzdHMuIEFycmF5IGFuZCBwbGFpbiBvYmplY3QgcHJvcGVydGllc1xuICogYXJlIG1lcmdlZCByZWN1cnNpdmVseS4gT3RoZXIgb2JqZWN0cyBhbmQgdmFsdWUgdHlwZXMgYXJlIG92ZXJyaWRkZW4gYnlcbiAqIGFzc2lnbm1lbnQuIFNvdXJjZSBvYmplY3RzIGFyZSBhcHBsaWVkIGZyb20gbGVmdCB0byByaWdodC4gU3Vic2VxdWVudFxuICogc291cmNlcyBvdmVyd3JpdGUgcHJvcGVydHkgYXNzaWdubWVudHMgb2YgcHJldmlvdXMgc291cmNlcy5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgbXV0YXRlcyBgb2JqZWN0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuNS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7XG4gKiAgICdhJzogW3sgJ2InOiAyIH0sIHsgJ2QnOiA0IH1dXG4gKiB9O1xuICpcbiAqIHZhciBvdGhlciA9IHtcbiAqICAgJ2EnOiBbeyAnYyc6IDMgfSwgeyAnZSc6IDUgfV1cbiAqIH07XG4gKlxuICogXy5tZXJnZShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IHsgJ2EnOiBbeyAnYic6IDIsICdjJzogMyB9LCB7ICdkJzogNCwgJ2UnOiA1IH1dIH1cbiAqL1xudmFyIG1lcmdlID0gY3JlYXRlQXNzaWduZXIoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4KSB7XG4gIGJhc2VNZXJnZShvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgpO1xufSk7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBhIG5ldyBlbXB0eSBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGVtcHR5IGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgYXJyYXlzID0gXy50aW1lcygyLCBfLnN0dWJBcnJheSk7XG4gKlxuICogY29uc29sZS5sb2coYXJyYXlzKTtcbiAqIC8vID0+IFtbXSwgW11dXG4gKlxuICogY29uc29sZS5sb2coYXJyYXlzWzBdID09PSBhcnJheXNbMV0pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gc3R1YkFycmF5KCkge1xuICByZXR1cm4gW107XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBgZmFsc2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50aW1lcygyLCBfLnN0dWJGYWxzZSk7XG4gKiAvLyA9PiBbZmFsc2UsIGZhbHNlXVxuICovXG5mdW5jdGlvbiBzdHViRmFsc2UoKSB7XG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtZXJnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gubWVyZ2UvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cdGlmKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRpZighbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR0aHJvdyBuZXcgRXJyb3IoXCJkZWZpbmUgY2Fubm90IGJlIHVzZWQgaW5kaXJlY3RcIik7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2FtZC1kZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gbm9ybWFsaXplQXJndW1lbnRzKCAuLi5hcmdzICkge1xuICAgIGxldCBvcHRpb25zID0ge307XG4gICAgaWYgKCB0eXBlb2YgYXJnc1swXSA9PT0gJ29iamVjdCcgKSB7XG4gICAgICAgIG9wdGlvbnMgPSBhcmdzWzBdO1xuICAgIH1cbiAgICBlbHNlIGlmICggdHlwZW9mIGFyZ3NbMV0gPT09ICdvYmplY3QnICkge1xuICAgICAgICBvcHRpb25zID0gYXJnc1sxXTtcbiAgICB9XG4gICAgZWxzZSBpZiAoIHR5cGVvZiBhcmdzWzFdID09PSAnc3RyaW5nJyApIHtcbiAgICAgICAgb3B0aW9ucy50b2tlbiA9IGFyZ3NbMV07XG4gICAgfVxuICAgIGlmICggdHlwZW9mIGFyZ3NbMF0gPT09ICdzdHJpbmcnICkge1xuICAgICAgICBvcHRpb25zLnVyaSA9IGFyZ3NbMF07XG4gICAgfVxuICAgIGlmICggYXJncy5sZW5ndGggPiAwICYmIHR5cGVvZiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0gPT09ICdmdW5jdGlvbicgKSB7XG4gICAgICAgIG9wdGlvbnMuY2FsbGJhY2sgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV07XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5vcm1hbGl6ZUFyZ3VtZW50cztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy92YWxpZGF0ZS9ub3JtYWxpemVBcmd1bWVudHMuanMiLCJjb25zdCBQbHVnaW4gPSByZXF1aXJlKCAnLi9wbHVnaW4nICk7XG5jb25zdCBkZWZhdWx0UGx1Z2lucyA9IHJlcXVpcmUoICcuL2RlZmF1bHRzJyApO1xuXG5QbHVnaW4uZGVmYXVsdHMgPSBkZWZhdWx0UGx1Z2lucztcblxubW9kdWxlLmV4cG9ydHMgPSBQbHVnaW47XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMCxcbiAgICBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKlxuICogQSBmYXN0ZXIgYWx0ZXJuYXRpdmUgdG8gYEZ1bmN0aW9uI2FwcGx5YCwgdGhpcyBmdW5jdGlvbiBpbnZva2VzIGBmdW5jYFxuICogd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgYHRoaXNBcmdgIGFuZCB0aGUgYXJndW1lbnRzIG9mIGBhcmdzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaW52b2tlLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzIFRoZSBhcmd1bWVudHMgdG8gaW52b2tlIGBmdW5jYCB3aXRoLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuXG4gKi9cbmZ1bmN0aW9uIGFwcGx5KGZ1bmMsIHRoaXNBcmcsIGFyZ3MpIHtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnKTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgfVxuICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ubWFwYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWVcbiAqIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBtYXBwZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TWFwKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMCxcbiAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQXBwZW5kcyB0aGUgZWxlbWVudHMgb2YgYHZhbHVlc2AgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgdmFsdWVzIHRvIGFwcGVuZC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheVB1c2goYXJyYXksIHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcy5sZW5ndGgsXG4gICAgICBvZmZzZXQgPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtvZmZzZXQgKyBpbmRleF0gPSB2YWx1ZXNbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sLFxuICAgIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGUsXG4gICAgc3ByZWFkYWJsZVN5bWJvbCA9IFN5bWJvbCA/IFN5bWJvbC5pc0NvbmNhdFNwcmVhZGFibGUgOiB1bmRlZmluZWQ7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mbGF0dGVuYCB3aXRoIHN1cHBvcnQgZm9yIHJlc3RyaWN0aW5nIGZsYXR0ZW5pbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBmbGF0dGVuLlxuICogQHBhcmFtIHtudW1iZXJ9IGRlcHRoIFRoZSBtYXhpbXVtIHJlY3Vyc2lvbiBkZXB0aC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3ByZWRpY2F0ZT1pc0ZsYXR0ZW5hYmxlXSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNTdHJpY3RdIFJlc3RyaWN0IHRvIHZhbHVlcyB0aGF0IHBhc3MgYHByZWRpY2F0ZWAgY2hlY2tzLlxuICogQHBhcmFtIHtBcnJheX0gW3Jlc3VsdD1bXV0gVGhlIGluaXRpYWwgcmVzdWx0IHZhbHVlLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZmxhdHRlbmVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlRmxhdHRlbihhcnJheSwgZGVwdGgsIHByZWRpY2F0ZSwgaXNTdHJpY3QsIHJlc3VsdCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBwcmVkaWNhdGUgfHwgKHByZWRpY2F0ZSA9IGlzRmxhdHRlbmFibGUpO1xuICByZXN1bHQgfHwgKHJlc3VsdCA9IFtdKTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XTtcbiAgICBpZiAoZGVwdGggPiAwICYmIHByZWRpY2F0ZSh2YWx1ZSkpIHtcbiAgICAgIGlmIChkZXB0aCA+IDEpIHtcbiAgICAgICAgLy8gUmVjdXJzaXZlbHkgZmxhdHRlbiBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgICAgYmFzZUZsYXR0ZW4odmFsdWUsIGRlcHRoIC0gMSwgcHJlZGljYXRlLCBpc1N0cmljdCwgcmVzdWx0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFycmF5UHVzaChyZXN1bHQsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFpc1N0cmljdCkge1xuICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucGlja2Agd2l0aG91dCBzdXBwb3J0IGZvciBpbmRpdmlkdWFsXG4gKiBwcm9wZXJ0eSBpZGVudGlmaWVycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nW119IHByb3BzIFRoZSBwcm9wZXJ0eSBpZGVudGlmaWVycyB0byBwaWNrLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gYmFzZVBpY2sob2JqZWN0LCBwcm9wcykge1xuICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgcmV0dXJuIGJhc2VQaWNrQnkob2JqZWN0LCBwcm9wcywgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgIHJldHVybiBrZXkgaW4gb2JqZWN0O1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiAgYF8ucGlja0J5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBwcm9wcyBUaGUgcHJvcGVydHkgaWRlbnRpZmllcnMgdG8gcGljayBmcm9tLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBwcm9wZXJ0eS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGJhc2VQaWNrQnkob2JqZWN0LCBwcm9wcywgcHJlZGljYXRlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0ge307XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdLFxuICAgICAgICB2YWx1ZSA9IG9iamVjdFtrZXldO1xuXG4gICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSwga2V5KSkge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5yZXN0YCB3aGljaCBkb2Vzbid0IHZhbGlkYXRlIG9yIGNvZXJjZSBhcmd1bWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVJlc3QoZnVuYywgc3RhcnQpIHtcbiAgc3RhcnQgPSBuYXRpdmVNYXgoc3RhcnQgPT09IHVuZGVmaW5lZCA/IChmdW5jLmxlbmd0aCAtIDEpIDogc3RhcnQsIDApO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IG5hdGl2ZU1heChhcmdzLmxlbmd0aCAtIHN0YXJ0LCAwKSxcbiAgICAgICAgYXJyYXkgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIGFycmF5W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgfVxuICAgIGluZGV4ID0gLTE7XG4gICAgdmFyIG90aGVyQXJncyA9IEFycmF5KHN0YXJ0ICsgMSk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBzdGFydCkge1xuICAgICAgb3RoZXJBcmdzW2luZGV4XSA9IGFyZ3NbaW5kZXhdO1xuICAgIH1cbiAgICBvdGhlckFyZ3Nbc3RhcnRdID0gYXJyYXk7XG4gICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXMsIG90aGVyQXJncyk7XG4gIH07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBmbGF0dGVuYWJsZSBgYXJndW1lbnRzYCBvYmplY3Qgb3IgYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZmxhdHRlbmFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNGbGF0dGVuYWJsZSh2YWx1ZSkge1xuICByZXR1cm4gaXNBcnJheSh2YWx1ZSkgfHwgaXNBcmd1bWVudHModmFsdWUpIHx8XG4gICAgISEoc3ByZWFkYWJsZVN5bWJvbCAmJiB2YWx1ZSAmJiB2YWx1ZVtzcHJlYWRhYmxlU3ltYm9sXSk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyBrZXkgaWYgaXQncyBub3QgYSBzdHJpbmcgb3Igc3ltYm9sLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHJldHVybnMge3N0cmluZ3xzeW1ib2x9IFJldHVybnMgdGhlIGtleS5cbiAqL1xuZnVuY3Rpb24gdG9LZXkodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fCBpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICByZXR1cm4gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICghcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpIHx8IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWcpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pc0FycmF5TGlrZWAgZXhjZXB0IHRoYXQgaXQgYWxzbyBjaGVja3MgaWYgYHZhbHVlYFxuICogaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LWxpa2Ugb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA4LTkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gb2JqZWN0IGNvbXBvc2VkIG9mIHRoZSBwaWNrZWQgYG9iamVjdGAgcHJvcGVydGllcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHsuLi4oc3RyaW5nfHN0cmluZ1tdKX0gW3Byb3BzXSBUaGUgcHJvcGVydHkgaWRlbnRpZmllcnMgdG8gcGljay5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSwgJ2InOiAnMicsICdjJzogMyB9O1xuICpcbiAqIF8ucGljayhvYmplY3QsIFsnYScsICdjJ10pO1xuICogLy8gPT4geyAnYSc6IDEsICdjJzogMyB9XG4gKi9cbnZhciBwaWNrID0gYmFzZVJlc3QoZnVuY3Rpb24ob2JqZWN0LCBwcm9wcykge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB7fSA6IGJhc2VQaWNrKG9iamVjdCwgYXJyYXlNYXAoYmFzZUZsYXR0ZW4ocHJvcHMsIDEpLCB0b0tleSkpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGljaztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gucGljay9pbmRleC5qcyIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyB0aGUgYFR5cGVFcnJvcmAgbWVzc2FnZSBmb3IgXCJGdW5jdGlvbnNcIiBtZXRob2RzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggcHJvcGVydHkgbmFtZXMgd2l0aGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlSXNEZWVwUHJvcCA9IC9cXC58XFxbKD86W15bXFxdXSp8KFtcIiddKSg/Oig/IVxcMSlbXlxcXFxdfFxcXFwuKSo/XFwxKVxcXS8sXG4gICAgcmVJc1BsYWluUHJvcCA9IC9eXFx3KiQvLFxuICAgIHJlTGVhZGluZ0RvdCA9IC9eXFwuLyxcbiAgICByZVByb3BOYW1lID0gL1teLltcXF1dK3xcXFsoPzooLT9cXGQrKD86XFwuXFxkKyk/KXwoW1wiJ10pKCg/Oig/IVxcMilbXlxcXFxdfFxcXFwuKSo/KVxcMilcXF18KD89KD86XFwufFxcW1xcXSkoPzpcXC58XFxbXFxdfCQpKS9nO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBiYWNrc2xhc2hlcyBpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciByZUVzY2FwZUNoYXIgPSAvXFxcXChcXFxcKT8vZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCBpbiBJRSA8IDkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0hvc3RPYmplY3QodmFsdWUpIHtcbiAgLy8gTWFueSBob3N0IG9iamVjdHMgYXJlIGBPYmplY3RgIG9iamVjdHMgdGhhdCBjYW4gY29lcmNlIHRvIHN0cmluZ3NcbiAgLy8gZGVzcGl0ZSBoYXZpbmcgaW1wcm9wZXJseSBkZWZpbmVkIGB0b1N0cmluZ2AgbWV0aG9kcy5cbiAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICBpZiAodmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUudG9TdHJpbmcgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSAhISh2YWx1ZSArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlLFxuICAgIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvdmVycmVhY2hpbmcgY29yZS1qcyBzaGltcy4gKi9cbnZhciBjb3JlSnNEYXRhID0gcm9vdFsnX19jb3JlLWpzX3NoYXJlZF9fJ107XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtZXRob2RzIG1hc3F1ZXJhZGluZyBhcyBuYXRpdmUuICovXG52YXIgbWFza1NyY0tleSA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHVpZCA9IC9bXi5dKyQvLmV4ZWMoY29yZUpzRGF0YSAmJiBjb3JlSnNEYXRhLmtleXMgJiYgY29yZUpzRGF0YS5rZXlzLklFX1BST1RPIHx8ICcnKTtcbiAgcmV0dXJuIHVpZCA/ICgnU3ltYm9sKHNyYylfMS4nICsgdWlkKSA6ICcnO1xufSgpKTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBmdW5jVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sLFxuICAgIHNwbGljZSA9IGFycmF5UHJvdG8uc3BsaWNlO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdNYXAnKSxcbiAgICBuYXRpdmVDcmVhdGUgPSBnZXROYXRpdmUoT2JqZWN0LCAnY3JlYXRlJyk7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xUb1N0cmluZyA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udG9TdHJpbmcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGhhc2ggb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBIYXNoKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKi9cbmZ1bmN0aW9uIGhhc2hDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5hdGl2ZUNyZWF0ZSA/IG5hdGl2ZUNyZWF0ZShudWxsKSA6IHt9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge09iamVjdH0gaGFzaCBUaGUgaGFzaCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaERlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIHRoaXMuaGFzKGtleSkgJiYgZGVsZXRlIHRoaXMuX19kYXRhX19ba2V5XTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBoYXNoIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGhhc2hHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKG5hdGl2ZUNyZWF0ZSkge1xuICAgIHZhciByZXN1bHQgPSBkYXRhW2tleV07XG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gSEFTSF9VTkRFRklORUQgPyB1bmRlZmluZWQgOiByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSA/IGRhdGFba2V5XSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBoYXNoIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoSGFzKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHJldHVybiBuYXRpdmVDcmVhdGUgPyBkYXRhW2tleV0gIT09IHVuZGVmaW5lZCA6IGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBoYXNoIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaGFzaCBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gaGFzaFNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgZGF0YVtrZXldID0gKG5hdGl2ZUNyZWF0ZSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IEhBU0hfVU5ERUZJTkVEIDogdmFsdWU7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgSGFzaGAuXG5IYXNoLnByb3RvdHlwZS5jbGVhciA9IGhhc2hDbGVhcjtcbkhhc2gucHJvdG90eXBlWydkZWxldGUnXSA9IGhhc2hEZWxldGU7XG5IYXNoLnByb3RvdHlwZS5nZXQgPSBoYXNoR2V0O1xuSGFzaC5wcm90b3R5cGUuaGFzID0gaGFzaEhhcztcbkhhc2gucHJvdG90eXBlLnNldCA9IGhhc2hTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBsaXN0IGNhY2hlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTGlzdENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBbXTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgIGRhdGEucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgcmV0dXJuIGluZGV4IDwgMCA/IHVuZGVmaW5lZCA6IGRhdGFbaW5kZXhdWzFdO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gYXNzb2NJbmRleE9mKHRoaXMuX19kYXRhX18sIGtleSkgPiAtMTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBsaXN0IGNhY2hlIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBsaXN0IGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICBkYXRhLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhW2luZGV4XVsxXSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTGlzdENhY2hlYC5cbkxpc3RDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBsaXN0Q2FjaGVDbGVhcjtcbkxpc3RDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbGlzdENhY2hlRGVsZXRlO1xuTGlzdENhY2hlLnByb3RvdHlwZS5nZXQgPSBsaXN0Q2FjaGVHZXQ7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmhhcyA9IGxpc3RDYWNoZUhhcztcbkxpc3RDYWNoZS5wcm90b3R5cGUuc2V0ID0gbGlzdENhY2hlU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXAgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTWFwQ2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IHtcbiAgICAnaGFzaCc6IG5ldyBIYXNoLFxuICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVEZWxldGUoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSlbJ2RlbGV0ZSddKGtleSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbWFwIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUdldChrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5nZXQoa2V5KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBtYXAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBtYXAgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbWFwIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIGdldE1hcERhdGEodGhpcywga2V5KS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTWFwQ2FjaGVgLlxuTWFwQ2FjaGUucHJvdG90eXBlLmNsZWFyID0gbWFwQ2FjaGVDbGVhcjtcbk1hcENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBtYXBDYWNoZURlbGV0ZTtcbk1hcENhY2hlLnByb3RvdHlwZS5nZXQgPSBtYXBDYWNoZUdldDtcbk1hcENhY2hlLnByb3RvdHlwZS5oYXMgPSBtYXBDYWNoZUhhcztcbk1hcENhY2hlLnByb3RvdHlwZS5zZXQgPSBtYXBDYWNoZVNldDtcblxuLyoqXG4gKiBHZXRzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgYGtleWAgaXMgZm91bmQgaW4gYGFycmF5YCBvZiBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSBrZXkgVGhlIGtleSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKGVxKGFycmF5W2xlbmd0aF1bMF0sIGtleSkpIHtcbiAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5nZXRgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVmYXVsdCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXQob2JqZWN0LCBwYXRoKSB7XG4gIHBhdGggPSBpc0tleShwYXRoLCBvYmplY3QpID8gW3BhdGhdIDogY2FzdFBhdGgocGF0aCk7XG5cbiAgdmFyIGluZGV4ID0gMCxcbiAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoO1xuXG4gIHdoaWxlIChvYmplY3QgIT0gbnVsbCAmJiBpbmRleCA8IGxlbmd0aCkge1xuICAgIG9iamVjdCA9IG9iamVjdFt0b0tleShwYXRoW2luZGV4KytdKV07XG4gIH1cbiAgcmV0dXJuIChpbmRleCAmJiBpbmRleCA9PSBsZW5ndGgpID8gb2JqZWN0IDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbixcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCBpc01hc2tlZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHBhdHRlcm4gPSAoaXNGdW5jdGlvbih2YWx1ZSkgfHwgaXNIb3N0T2JqZWN0KHZhbHVlKSkgPyByZUlzTmF0aXZlIDogcmVJc0hvc3RDdG9yO1xuICByZXR1cm4gcGF0dGVybi50ZXN0KHRvU291cmNlKHZhbHVlKSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udG9TdHJpbmdgIHdoaWNoIGRvZXNuJ3QgY29udmVydCBudWxsaXNoXG4gKiB2YWx1ZXMgdG8gZW1wdHkgc3RyaW5ncy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIC8vIEV4aXQgZWFybHkgZm9yIHN0cmluZ3MgdG8gYXZvaWQgYSBwZXJmb3JtYW5jZSBoaXQgaW4gc29tZSBlbnZpcm9ubWVudHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBzeW1ib2xUb1N0cmluZyA/IHN5bWJvbFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG4vKipcbiAqIENhc3RzIGB2YWx1ZWAgdG8gYSBwYXRoIGFycmF5IGlmIGl0J3Mgbm90IG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY2FzdCBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICovXG5mdW5jdGlvbiBjYXN0UGF0aCh2YWx1ZSkge1xuICByZXR1cm4gaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IHN0cmluZ1RvUGF0aCh2YWx1ZSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgZGF0YSBmb3IgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIHJlZmVyZW5jZSBrZXkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWFwIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGdldE1hcERhdGEobWFwLCBrZXkpIHtcbiAgdmFyIGRhdGEgPSBtYXAuX19kYXRhX187XG4gIHJldHVybiBpc0tleWFibGUoa2V5KVxuICAgID8gZGF0YVt0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8gJ3N0cmluZycgOiAnaGFzaCddXG4gICAgOiBkYXRhLm1hcDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHByb3BlcnR5IG5hbWUgYW5kIG5vdCBhIHByb3BlcnR5IHBhdGguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkga2V5cyBvbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvcGVydHkgbmFtZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleSh2YWx1ZSwgb2JqZWN0KSB7XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJyB8fFxuICAgICAgdmFsdWUgPT0gbnVsbCB8fCBpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gcmVJc1BsYWluUHJvcC50ZXN0KHZhbHVlKSB8fCAhcmVJc0RlZXBQcm9wLnRlc3QodmFsdWUpIHx8XG4gICAgKG9iamVjdCAhPSBudWxsICYmIHZhbHVlIGluIE9iamVjdChvYmplY3QpKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3IgdXNlIGFzIHVuaXF1ZSBvYmplY3Qga2V5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5YWJsZSh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICh0eXBlID09ICdzdHJpbmcnIHx8IHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJylcbiAgICA/ICh2YWx1ZSAhPT0gJ19fcHJvdG9fXycpXG4gICAgOiAodmFsdWUgPT09IG51bGwpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgZnVuY2AgaGFzIGl0cyBzb3VyY2UgbWFza2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgZnVuY2AgaXMgbWFza2VkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTWFza2VkKGZ1bmMpIHtcbiAgcmV0dXJuICEhbWFza1NyY0tleSAmJiAobWFza1NyY0tleSBpbiBmdW5jKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgc3RyaW5nYCB0byBhIHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICovXG52YXIgc3RyaW5nVG9QYXRoID0gbWVtb2l6ZShmdW5jdGlvbihzdHJpbmcpIHtcbiAgc3RyaW5nID0gdG9TdHJpbmcoc3RyaW5nKTtcblxuICB2YXIgcmVzdWx0ID0gW107XG4gIGlmIChyZUxlYWRpbmdEb3QudGVzdChzdHJpbmcpKSB7XG4gICAgcmVzdWx0LnB1c2goJycpO1xuICB9XG4gIHN0cmluZy5yZXBsYWNlKHJlUHJvcE5hbWUsIGZ1bmN0aW9uKG1hdGNoLCBudW1iZXIsIHF1b3RlLCBzdHJpbmcpIHtcbiAgICByZXN1bHQucHVzaChxdW90ZSA/IHN0cmluZy5yZXBsYWNlKHJlRXNjYXBlQ2hhciwgJyQxJykgOiAobnVtYmVyIHx8IG1hdGNoKSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufSk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyBrZXkgaWYgaXQncyBub3QgYSBzdHJpbmcgb3Igc3ltYm9sLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHJldHVybnMge3N0cmluZ3xzeW1ib2x9IFJldHVybnMgdGhlIGtleS5cbiAqL1xuZnVuY3Rpb24gdG9LZXkodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fCBpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgbWVtb2l6ZXMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuIElmIGByZXNvbHZlcmAgaXNcbiAqIHByb3ZpZGVkLCBpdCBkZXRlcm1pbmVzIHRoZSBjYWNoZSBrZXkgZm9yIHN0b3JpbmcgdGhlIHJlc3VsdCBiYXNlZCBvbiB0aGVcbiAqIGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24uIEJ5IGRlZmF1bHQsIHRoZSBmaXJzdCBhcmd1bWVudFxuICogcHJvdmlkZWQgdG8gdGhlIG1lbW9pemVkIGZ1bmN0aW9uIGlzIHVzZWQgYXMgdGhlIG1hcCBjYWNoZSBrZXkuIFRoZSBgZnVuY2BcbiAqIGlzIGludm9rZWQgd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgdGhlIG1lbW9pemVkIGZ1bmN0aW9uLlxuICpcbiAqICoqTm90ZToqKiBUaGUgY2FjaGUgaXMgZXhwb3NlZCBhcyB0aGUgYGNhY2hlYCBwcm9wZXJ0eSBvbiB0aGUgbWVtb2l6ZWRcbiAqIGZ1bmN0aW9uLiBJdHMgY3JlYXRpb24gbWF5IGJlIGN1c3RvbWl6ZWQgYnkgcmVwbGFjaW5nIHRoZSBgXy5tZW1vaXplLkNhY2hlYFxuICogY29uc3RydWN0b3Igd2l0aCBvbmUgd2hvc2UgaW5zdGFuY2VzIGltcGxlbWVudCB0aGVcbiAqIFtgTWFwYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcHJvcGVydGllcy1vZi10aGUtbWFwLXByb3RvdHlwZS1vYmplY3QpXG4gKiBtZXRob2QgaW50ZXJmYWNlIG9mIGBkZWxldGVgLCBgZ2V0YCwgYGhhc2AsIGFuZCBgc2V0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGhhdmUgaXRzIG91dHB1dCBtZW1vaXplZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZXNvbHZlcl0gVGhlIGZ1bmN0aW9uIHRvIHJlc29sdmUgdGhlIGNhY2hlIGtleS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IG1lbW9pemVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogMiB9O1xuICogdmFyIG90aGVyID0geyAnYyc6IDMsICdkJzogNCB9O1xuICpcbiAqIHZhciB2YWx1ZXMgPSBfLm1lbW9pemUoXy52YWx1ZXMpO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiB2YWx1ZXMob3RoZXIpO1xuICogLy8gPT4gWzMsIDRdXG4gKlxuICogb2JqZWN0LmEgPSAyO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiAvLyBNb2RpZnkgdGhlIHJlc3VsdCBjYWNoZS5cbiAqIHZhbHVlcy5jYWNoZS5zZXQob2JqZWN0LCBbJ2EnLCAnYiddKTtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWydhJywgJ2InXVxuICpcbiAqIC8vIFJlcGxhY2UgYF8ubWVtb2l6ZS5DYWNoZWAuXG4gKiBfLm1lbW9pemUuQ2FjaGUgPSBXZWFrTWFwO1xuICovXG5mdW5jdGlvbiBtZW1vaXplKGZ1bmMsIHJlc29sdmVyKSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nIHx8IChyZXNvbHZlciAmJiB0eXBlb2YgcmVzb2x2ZXIgIT0gJ2Z1bmN0aW9uJykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgdmFyIG1lbW9pemVkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGtleSA9IHJlc29sdmVyID8gcmVzb2x2ZXIuYXBwbHkodGhpcywgYXJncykgOiBhcmdzWzBdLFxuICAgICAgICBjYWNoZSA9IG1lbW9pemVkLmNhY2hlO1xuXG4gICAgaWYgKGNhY2hlLmhhcyhrZXkpKSB7XG4gICAgICByZXR1cm4gY2FjaGUuZ2V0KGtleSk7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIG1lbW9pemVkLmNhY2hlID0gY2FjaGUuc2V0KGtleSwgcmVzdWx0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBtZW1vaXplZC5jYWNoZSA9IG5ldyAobWVtb2l6ZS5DYWNoZSB8fCBNYXBDYWNoZSk7XG4gIHJldHVybiBtZW1vaXplZDtcbn1cblxuLy8gQXNzaWduIGNhY2hlIHRvIGBfLm1lbW9pemVgLlxubWVtb2l6ZS5DYWNoZSA9IE1hcENhY2hlO1xuXG4vKipcbiAqIFBlcmZvcm1zIGFcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiAxIH07XG4gKlxuICogXy5lcShvYmplY3QsIG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcSgnYScsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcSgnYScsIE9iamVjdCgnYScpKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcShOYU4sIE5hTik7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGVxKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gdmFsdWUgPT09IG90aGVyIHx8ICh2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOC05IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBpc09iamVjdCh2YWx1ZSkgPyBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZCBmb3IgYG51bGxgXG4gKiBhbmQgYHVuZGVmaW5lZGAgdmFsdWVzLiBUaGUgc2lnbiBvZiBgLTBgIGlzIHByZXNlcnZlZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b1N0cmluZyhudWxsKTtcbiAqIC8vID0+ICcnXG4gKlxuICogXy50b1N0cmluZygtMCk7XG4gKiAvLyA9PiAnLTAnXG4gKlxuICogXy50b1N0cmluZyhbMSwgMiwgM10pO1xuICogLy8gPT4gJzEsMiwzJ1xuICovXG5mdW5jdGlvbiB0b1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogYmFzZVRvU3RyaW5nKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBgcGF0aGAgb2YgYG9iamVjdGAuIElmIHRoZSByZXNvbHZlZCB2YWx1ZSBpc1xuICogYHVuZGVmaW5lZGAsIHRoZSBgZGVmYXVsdFZhbHVlYCBpcyByZXR1cm5lZCBpbiBpdHMgcGxhY2UuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjcuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEBwYXJhbSB7Kn0gW2RlZmF1bHRWYWx1ZV0gVGhlIHZhbHVlIHJldHVybmVkIGZvciBgdW5kZWZpbmVkYCByZXNvbHZlZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogW3sgJ2InOiB7ICdjJzogMyB9IH1dIH07XG4gKlxuICogXy5nZXQob2JqZWN0LCAnYVswXS5iLmMnKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLmdldChvYmplY3QsIFsnYScsICcwJywgJ2InLCAnYyddKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLmdldChvYmplY3QsICdhLmIuYycsICdkZWZhdWx0Jyk7XG4gKiAvLyA9PiAnZGVmYXVsdCdcbiAqL1xuZnVuY3Rpb24gZ2V0KG9iamVjdCwgcGF0aCwgZGVmYXVsdFZhbHVlKSB7XG4gIHZhciByZXN1bHQgPSBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IGJhc2VHZXQob2JqZWN0LCBwYXRoKTtcbiAgcmV0dXJuIHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdFZhbHVlIDogcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2guZ2V0L2luZGV4LmpzIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBgVHlwZUVycm9yYCBtZXNzYWdlIGZvciBcIkZ1bmN0aW9uc1wiIG1ldGhvZHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDAsXG4gICAgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBwcm9wZXJ0eSBuYW1lcyB3aXRoaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVJc0RlZXBQcm9wID0gL1xcLnxcXFsoPzpbXltcXF1dKnwoW1wiJ10pKD86KD8hXFwxKVteXFxcXF18XFxcXC4pKj9cXDEpXFxdLyxcbiAgICByZUlzUGxhaW5Qcm9wID0gL15cXHcqJC8sXG4gICAgcmVMZWFkaW5nRG90ID0gL15cXC4vLFxuICAgIHJlUHJvcE5hbWUgPSAvW14uW1xcXV0rfFxcWyg/OigtP1xcZCsoPzpcXC5cXGQrKT8pfChbXCInXSkoKD86KD8hXFwyKVteXFxcXF18XFxcXC4pKj8pXFwyKVxcXXwoPz0oPzpcXC58XFxbXFxdKSg/OlxcLnxcXFtcXF18JCkpL2c7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2c7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGJhY2tzbGFzaGVzIGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlRXNjYXBlQ2hhciA9IC9cXFxcKFxcXFwpPy9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBnZXRWYWx1ZShvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0IGluIElFIDwgOS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSG9zdE9iamVjdCh2YWx1ZSkge1xuICAvLyBNYW55IGhvc3Qgb2JqZWN0cyBhcmUgYE9iamVjdGAgb2JqZWN0cyB0aGF0IGNhbiBjb2VyY2UgdG8gc3RyaW5nc1xuICAvLyBkZXNwaXRlIGhhdmluZyBpbXByb3Blcmx5IGRlZmluZWQgYHRvU3RyaW5nYCBtZXRob2RzLlxuICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gIGlmICh2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZS50b1N0cmluZyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9ICEhKHZhbHVlICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsXG4gICAgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbnZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdWlkID0gL1teLl0rJC8uZXhlYyhjb3JlSnNEYXRhICYmIGNvcmVKc0RhdGEua2V5cyAmJiBjb3JlSnNEYXRhLmtleXMuSUVfUFJPVE8gfHwgJycpO1xuICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG59KCkpO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2wsXG4gICAgc3BsaWNlID0gYXJyYXlQcm90by5zcGxpY2U7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpLFxuICAgIG5hdGl2ZUNyZWF0ZSA9IGdldE5hdGl2ZShPYmplY3QsICdjcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFRvU3RyaW5nID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by50b1N0cmluZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgaGFzaCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIEhhc2goZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIEhhc2hcbiAqL1xuZnVuY3Rpb24gaGFzaENsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmF0aXZlQ3JlYXRlID8gbmF0aXZlQ3JlYXRlKG51bGwpIDoge307XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoRGVsZXRlKGtleSkge1xuICByZXR1cm4gdGhpcy5oYXMoa2V5KSAmJiBkZWxldGUgdGhpcy5fX2RhdGFfX1trZXldO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGhhc2ggdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gaGFzaEdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAobmF0aXZlQ3JlYXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRhdGFba2V5XTtcbiAgICByZXR1cm4gcmVzdWx0ID09PSBIQVNIX1VOREVGSU5FRCA/IHVuZGVmaW5lZCA6IHJlc3VsdDtcbiAgfVxuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpID8gZGF0YVtrZXldIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGhhc2ggdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hIYXMoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgcmV0dXJuIG5hdGl2ZUNyZWF0ZSA/IGRhdGFba2V5XSAhPT0gdW5kZWZpbmVkIDogaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBoYXNoIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQgOiB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBIYXNoYC5cbkhhc2gucHJvdG90eXBlLmNsZWFyID0gaGFzaENsZWFyO1xuSGFzaC5wcm90b3R5cGVbJ2RlbGV0ZSddID0gaGFzaERlbGV0ZTtcbkhhc2gucHJvdG90eXBlLmdldCA9IGhhc2hHZXQ7XG5IYXNoLnByb3RvdHlwZS5oYXMgPSBoYXNoSGFzO1xuSGFzaC5wcm90b3R5cGUuc2V0ID0gaGFzaFNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGxpc3QgY2FjaGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBMaXN0Q2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IFtdO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgbGFzdEluZGV4ID0gZGF0YS5sZW5ndGggLSAxO1xuICBpZiAoaW5kZXggPT0gbGFzdEluZGV4KSB7XG4gICAgZGF0YS5wb3AoKTtcbiAgfSBlbHNlIHtcbiAgICBzcGxpY2UuY2FsbChkYXRhLCBpbmRleCwgMSk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogZGF0YVtpbmRleF1bMV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBhc3NvY0luZGV4T2YodGhpcy5fX2RhdGFfXywga2V5KSA+IC0xO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGxpc3QgY2FjaGUgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGxpc3QgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIGRhdGEucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9IGVsc2Uge1xuICAgIGRhdGFbaW5kZXhdWzFdID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBMaXN0Q2FjaGVgLlxuTGlzdENhY2hlLnByb3RvdHlwZS5jbGVhciA9IGxpc3RDYWNoZUNsZWFyO1xuTGlzdENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBsaXN0Q2FjaGVEZWxldGU7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmdldCA9IGxpc3RDYWNoZUdldDtcbkxpc3RDYWNoZS5wcm90b3R5cGUuaGFzID0gbGlzdENhY2hlSGFzO1xuTGlzdENhY2hlLnByb3RvdHlwZS5zZXQgPSBsaXN0Q2FjaGVTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcCBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBNYXBDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0ge1xuICAgICdoYXNoJzogbmV3IEhhc2gsXG4gICAgJ21hcCc6IG5ldyAoTWFwIHx8IExpc3RDYWNoZSksXG4gICAgJ3N0cmluZyc6IG5ldyBIYXNoXG4gIH07XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZURlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KVsnZGVsZXRlJ10oa2V5KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBtYXAgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlR2V0KGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmdldChrZXkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIG1hcCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIG1hcCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBtYXAgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLnNldChrZXksIHZhbHVlKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBNYXBDYWNoZWAuXG5NYXBDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBtYXBDYWNoZUNsZWFyO1xuTWFwQ2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IG1hcENhY2hlRGVsZXRlO1xuTWFwQ2FjaGUucHJvdG90eXBlLmdldCA9IG1hcENhY2hlR2V0O1xuTWFwQ2FjaGUucHJvdG90eXBlLmhhcyA9IG1hcENhY2hlSGFzO1xuTWFwQ2FjaGUucHJvdG90eXBlLnNldCA9IG1hcENhY2hlU2V0O1xuXG4vKipcbiAqIEFzc2lnbnMgYHZhbHVlYCB0byBga2V5YCBvZiBgb2JqZWN0YCBpZiB0aGUgZXhpc3RpbmcgdmFsdWUgaXMgbm90IGVxdWl2YWxlbnRcbiAqIHVzaW5nIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldO1xuICBpZiAoIShoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBlcShvYmpWYWx1ZSwgdmFsdWUpKSB8fFxuICAgICAgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG59XG5cbi8qKlxuICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGBrZXlgIGlzIGZvdW5kIGluIGBhcnJheWAgb2Yga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0ga2V5IFRoZSBrZXkgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGFzc29jSW5kZXhPZihhcnJheSwga2V5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChlcShhcnJheVtsZW5ndGhdWzBdLCBrZXkpKSB7XG4gICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYXRpdmVgIHdpdGhvdXQgYmFkIHNoaW0gY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IChpc0Z1bmN0aW9uKHZhbHVlKSB8fCBpc0hvc3RPYmplY3QodmFsdWUpKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5zZXRgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIHBhdGggY3JlYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlU2V0KG9iamVjdCwgcGF0aCwgdmFsdWUsIGN1c3RvbWl6ZXIpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuICBwYXRoID0gaXNLZXkocGF0aCwgb2JqZWN0KSA/IFtwYXRoXSA6IGNhc3RQYXRoKHBhdGgpO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGgsXG4gICAgICBsYXN0SW5kZXggPSBsZW5ndGggLSAxLFxuICAgICAgbmVzdGVkID0gb2JqZWN0O1xuXG4gIHdoaWxlIChuZXN0ZWQgIT0gbnVsbCAmJiArK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHRvS2V5KHBhdGhbaW5kZXhdKSxcbiAgICAgICAgbmV3VmFsdWUgPSB2YWx1ZTtcblxuICAgIGlmIChpbmRleCAhPSBsYXN0SW5kZXgpIHtcbiAgICAgIHZhciBvYmpWYWx1ZSA9IG5lc3RlZFtrZXldO1xuICAgICAgbmV3VmFsdWUgPSBjdXN0b21pemVyID8gY3VzdG9taXplcihvYmpWYWx1ZSwga2V5LCBuZXN0ZWQpIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKG5ld1ZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBpc09iamVjdChvYmpWYWx1ZSlcbiAgICAgICAgICA/IG9ialZhbHVlXG4gICAgICAgICAgOiAoaXNJbmRleChwYXRoW2luZGV4ICsgMV0pID8gW10gOiB7fSk7XG4gICAgICB9XG4gICAgfVxuICAgIGFzc2lnblZhbHVlKG5lc3RlZCwga2V5LCBuZXdWYWx1ZSk7XG4gICAgbmVzdGVkID0gbmVzdGVkW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50b1N0cmluZ2Agd2hpY2ggZG9lc24ndCBjb252ZXJ0IG51bGxpc2hcbiAqIHZhbHVlcyB0byBlbXB0eSBzdHJpbmdzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgLy8gRXhpdCBlYXJseSBmb3Igc3RyaW5ncyB0byBhdm9pZCBhIHBlcmZvcm1hbmNlIGhpdCBpbiBzb21lIGVudmlyb25tZW50cy5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHN5bWJvbFRvU3RyaW5nID8gc3ltYm9sVG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ2FzdHMgYHZhbHVlYCB0byBhIHBhdGggYXJyYXkgaWYgaXQncyBub3Qgb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjYXN0IHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGNhc3RQYXRoKHZhbHVlKSB7XG4gIHJldHVybiBpc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogc3RyaW5nVG9QYXRoKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBkYXRhIGZvciBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgcmVmZXJlbmNlIGtleS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXAgZGF0YS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFwRGF0YShtYXAsIGtleSkge1xuICB2YXIgZGF0YSA9IG1hcC5fX2RhdGFfXztcbiAgcmV0dXJuIGlzS2V5YWJsZShrZXkpXG4gICAgPyBkYXRhW3R5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyAnc3RyaW5nJyA6ICdoYXNoJ11cbiAgICA6IGRhdGEubWFwO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZ2V0VmFsdWUob2JqZWN0LCBrZXkpO1xuICByZXR1cm4gYmFzZUlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiAhIWxlbmd0aCAmJlxuICAgICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHwgcmVJc1VpbnQudGVzdCh2YWx1ZSkpICYmXG4gICAgKHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGgpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcHJvcGVydHkgbmFtZSBhbmQgbm90IGEgcHJvcGVydHkgcGF0aC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeSBrZXlzIG9uLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm9wZXJ0eSBuYW1lLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5KHZhbHVlLCBvYmplY3QpIHtcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nIHx8XG4gICAgICB2YWx1ZSA9PSBudWxsIHx8IGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiByZUlzUGxhaW5Qcm9wLnRlc3QodmFsdWUpIHx8ICFyZUlzRGVlcFByb3AudGVzdCh2YWx1ZSkgfHxcbiAgICAob2JqZWN0ICE9IG51bGwgJiYgdmFsdWUgaW4gT2JqZWN0KG9iamVjdCkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciB1c2UgYXMgdW5pcXVlIG9iamVjdCBrZXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXlhYmxlKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKVxuICAgID8gKHZhbHVlICE9PSAnX19wcm90b19fJylcbiAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBzdHJpbmdgIHRvIGEgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKi9cbnZhciBzdHJpbmdUb1BhdGggPSBtZW1vaXplKGZ1bmN0aW9uKHN0cmluZykge1xuICBzdHJpbmcgPSB0b1N0cmluZyhzdHJpbmcpO1xuXG4gIHZhciByZXN1bHQgPSBbXTtcbiAgaWYgKHJlTGVhZGluZ0RvdC50ZXN0KHN0cmluZykpIHtcbiAgICByZXN1bHQucHVzaCgnJyk7XG4gIH1cbiAgc3RyaW5nLnJlcGxhY2UocmVQcm9wTmFtZSwgZnVuY3Rpb24obWF0Y2gsIG51bWJlciwgcXVvdGUsIHN0cmluZykge1xuICAgIHJlc3VsdC5wdXNoKHF1b3RlID8gc3RyaW5nLnJlcGxhY2UocmVFc2NhcGVDaGFyLCAnJDEnKSA6IChudW1iZXIgfHwgbWF0Y2gpKTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59KTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGtleSBpZiBpdCdzIG5vdCBhIHN0cmluZyBvciBzeW1ib2wuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7c3RyaW5nfHN5bWJvbH0gUmV0dXJucyB0aGUga2V5LlxuICovXG5mdW5jdGlvbiB0b0tleSh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8IGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ29udmVydHMgYGZ1bmNgIHRvIGl0cyBzb3VyY2UgY29kZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHNvdXJjZSBjb2RlLlxuICovXG5mdW5jdGlvbiB0b1NvdXJjZShmdW5jKSB7XG4gIGlmIChmdW5jICE9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmNUb1N0cmluZy5jYWxsKGZ1bmMpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoZnVuYyArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBtZW1vaXplcyB0aGUgcmVzdWx0IG9mIGBmdW5jYC4gSWYgYHJlc29sdmVyYCBpc1xuICogcHJvdmlkZWQsIGl0IGRldGVybWluZXMgdGhlIGNhY2hlIGtleSBmb3Igc3RvcmluZyB0aGUgcmVzdWx0IGJhc2VkIG9uIHRoZVxuICogYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBtZW1vaXplZCBmdW5jdGlvbi4gQnkgZGVmYXVsdCwgdGhlIGZpcnN0IGFyZ3VtZW50XG4gKiBwcm92aWRlZCB0byB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24gaXMgdXNlZCBhcyB0aGUgbWFwIGNhY2hlIGtleS4gVGhlIGBmdW5jYFxuICogaXMgaW52b2tlZCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24uXG4gKlxuICogKipOb3RlOioqIFRoZSBjYWNoZSBpcyBleHBvc2VkIGFzIHRoZSBgY2FjaGVgIHByb3BlcnR5IG9uIHRoZSBtZW1vaXplZFxuICogZnVuY3Rpb24uIEl0cyBjcmVhdGlvbiBtYXkgYmUgY3VzdG9taXplZCBieSByZXBsYWNpbmcgdGhlIGBfLm1lbW9pemUuQ2FjaGVgXG4gKiBjb25zdHJ1Y3RvciB3aXRoIG9uZSB3aG9zZSBpbnN0YW5jZXMgaW1wbGVtZW50IHRoZVxuICogW2BNYXBgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wcm9wZXJ0aWVzLW9mLXRoZS1tYXAtcHJvdG90eXBlLW9iamVjdClcbiAqIG1ldGhvZCBpbnRlcmZhY2Ugb2YgYGRlbGV0ZWAsIGBnZXRgLCBgaGFzYCwgYW5kIGBzZXRgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaGF2ZSBpdHMgb3V0cHV0IG1lbW9pemVkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3Jlc29sdmVyXSBUaGUgZnVuY3Rpb24gdG8gcmVzb2x2ZSB0aGUgY2FjaGUga2V5LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgbWVtb2l6ZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSwgJ2InOiAyIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdjJzogMywgJ2QnOiA0IH07XG4gKlxuICogdmFyIHZhbHVlcyA9IF8ubWVtb2l6ZShfLnZhbHVlcyk7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIHZhbHVlcyhvdGhlcik7XG4gKiAvLyA9PiBbMywgNF1cbiAqXG4gKiBvYmplY3QuYSA9IDI7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIC8vIE1vZGlmeSB0aGUgcmVzdWx0IGNhY2hlLlxuICogdmFsdWVzLmNhY2hlLnNldChvYmplY3QsIFsnYScsICdiJ10pO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddXG4gKlxuICogLy8gUmVwbGFjZSBgXy5tZW1vaXplLkNhY2hlYC5cbiAqIF8ubWVtb2l6ZS5DYWNoZSA9IFdlYWtNYXA7XG4gKi9cbmZ1bmN0aW9uIG1lbW9pemUoZnVuYywgcmVzb2x2ZXIpIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicgfHwgKHJlc29sdmVyICYmIHR5cGVvZiByZXNvbHZlciAhPSAnZnVuY3Rpb24nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB2YXIgbWVtb2l6ZWQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAga2V5ID0gcmVzb2x2ZXIgPyByZXNvbHZlci5hcHBseSh0aGlzLCBhcmdzKSA6IGFyZ3NbMF0sXG4gICAgICAgIGNhY2hlID0gbWVtb2l6ZWQuY2FjaGU7XG5cbiAgICBpZiAoY2FjaGUuaGFzKGtleSkpIHtcbiAgICAgIHJldHVybiBjYWNoZS5nZXQoa2V5KTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgbWVtb2l6ZWQuY2FjaGUgPSBjYWNoZS5zZXQoa2V5LCByZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIG1lbW9pemVkLmNhY2hlID0gbmV3IChtZW1vaXplLkNhY2hlIHx8IE1hcENhY2hlKTtcbiAgcmV0dXJuIG1lbW9pemVkO1xufVxuXG4vLyBBc3NpZ24gY2FjaGUgdG8gYF8ubWVtb2l6ZWAuXG5tZW1vaXplLkNhY2hlID0gTWFwQ2FjaGU7XG5cbi8qKlxuICogUGVyZm9ybXMgYVxuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA4LTkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZy4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkIGZvciBgbnVsbGBcbiAqIGFuZCBgdW5kZWZpbmVkYCB2YWx1ZXMuIFRoZSBzaWduIG9mIGAtMGAgaXMgcHJlc2VydmVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvU3RyaW5nKG51bGwpO1xuICogLy8gPT4gJydcbiAqXG4gKiBfLnRvU3RyaW5nKC0wKTtcbiAqIC8vID0+ICctMCdcbiAqXG4gKiBfLnRvU3RyaW5nKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAnMSwyLDMnXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiBiYXNlVG9TdHJpbmcodmFsdWUpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIHZhbHVlIGF0IGBwYXRoYCBvZiBgb2JqZWN0YC4gSWYgYSBwb3J0aW9uIG9mIGBwYXRoYCBkb2Vzbid0IGV4aXN0LFxuICogaXQncyBjcmVhdGVkLiBBcnJheXMgYXJlIGNyZWF0ZWQgZm9yIG1pc3NpbmcgaW5kZXggcHJvcGVydGllcyB3aGlsZSBvYmplY3RzXG4gKiBhcmUgY3JlYXRlZCBmb3IgYWxsIG90aGVyIG1pc3NpbmcgcHJvcGVydGllcy4gVXNlIGBfLnNldFdpdGhgIHRvIGN1c3RvbWl6ZVxuICogYHBhdGhgIGNyZWF0aW9uLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBtdXRhdGVzIGBvYmplY3RgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy43LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiBbeyAnYic6IHsgJ2MnOiAzIH0gfV0gfTtcbiAqXG4gKiBfLnNldChvYmplY3QsICdhWzBdLmIuYycsIDQpO1xuICogY29uc29sZS5sb2cob2JqZWN0LmFbMF0uYi5jKTtcbiAqIC8vID0+IDRcbiAqXG4gKiBfLnNldChvYmplY3QsIFsneCcsICcwJywgJ3knLCAneiddLCA1KTtcbiAqIGNvbnNvbGUubG9nKG9iamVjdC54WzBdLnkueik7XG4gKiAvLyA9PiA1XG4gKi9cbmZ1bmN0aW9uIHNldChvYmplY3QsIHBhdGgsIHZhbHVlKSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IG9iamVjdCA6IGJhc2VTZXQob2JqZWN0LCBwYXRoLCB2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC5zZXQvaW5kZXguanMiLCIndXNlIHN0cmljdCc7XG5cbnZhciBkICAgICAgICA9IHJlcXVpcmUoJ2QnKVxuICAsIGNhbGxhYmxlID0gcmVxdWlyZSgnZXM1LWV4dC9vYmplY3QvdmFsaWQtY2FsbGFibGUnKVxuXG4gICwgYXBwbHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHksIGNhbGwgPSBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbFxuICAsIGNyZWF0ZSA9IE9iamVjdC5jcmVhdGUsIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5XG4gICwgZGVmaW5lUHJvcGVydGllcyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzXG4gICwgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5XG4gICwgZGVzY3JpcHRvciA9IHsgY29uZmlndXJhYmxlOiB0cnVlLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUgfVxuXG4gICwgb24sIG9uY2UsIG9mZiwgZW1pdCwgbWV0aG9kcywgZGVzY3JpcHRvcnMsIGJhc2U7XG5cbm9uID0gZnVuY3Rpb24gKHR5cGUsIGxpc3RlbmVyKSB7XG5cdHZhciBkYXRhO1xuXG5cdGNhbGxhYmxlKGxpc3RlbmVyKTtcblxuXHRpZiAoIWhhc093blByb3BlcnR5LmNhbGwodGhpcywgJ19fZWVfXycpKSB7XG5cdFx0ZGF0YSA9IGRlc2NyaXB0b3IudmFsdWUgPSBjcmVhdGUobnVsbCk7XG5cdFx0ZGVmaW5lUHJvcGVydHkodGhpcywgJ19fZWVfXycsIGRlc2NyaXB0b3IpO1xuXHRcdGRlc2NyaXB0b3IudmFsdWUgPSBudWxsO1xuXHR9IGVsc2Uge1xuXHRcdGRhdGEgPSB0aGlzLl9fZWVfXztcblx0fVxuXHRpZiAoIWRhdGFbdHlwZV0pIGRhdGFbdHlwZV0gPSBsaXN0ZW5lcjtcblx0ZWxzZSBpZiAodHlwZW9mIGRhdGFbdHlwZV0gPT09ICdvYmplY3QnKSBkYXRhW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuXHRlbHNlIGRhdGFbdHlwZV0gPSBbZGF0YVt0eXBlXSwgbGlzdGVuZXJdO1xuXG5cdHJldHVybiB0aGlzO1xufTtcblxub25jZSA9IGZ1bmN0aW9uICh0eXBlLCBsaXN0ZW5lcikge1xuXHR2YXIgb25jZSwgc2VsZjtcblxuXHRjYWxsYWJsZShsaXN0ZW5lcik7XG5cdHNlbGYgPSB0aGlzO1xuXHRvbi5jYWxsKHRoaXMsIHR5cGUsIG9uY2UgPSBmdW5jdGlvbiAoKSB7XG5cdFx0b2ZmLmNhbGwoc2VsZiwgdHlwZSwgb25jZSk7XG5cdFx0YXBwbHkuY2FsbChsaXN0ZW5lciwgdGhpcywgYXJndW1lbnRzKTtcblx0fSk7XG5cblx0b25jZS5fX2VlT25jZUxpc3RlbmVyX18gPSBsaXN0ZW5lcjtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG5vZmYgPSBmdW5jdGlvbiAodHlwZSwgbGlzdGVuZXIpIHtcblx0dmFyIGRhdGEsIGxpc3RlbmVycywgY2FuZGlkYXRlLCBpO1xuXG5cdGNhbGxhYmxlKGxpc3RlbmVyKTtcblxuXHRpZiAoIWhhc093blByb3BlcnR5LmNhbGwodGhpcywgJ19fZWVfXycpKSByZXR1cm4gdGhpcztcblx0ZGF0YSA9IHRoaXMuX19lZV9fO1xuXHRpZiAoIWRhdGFbdHlwZV0pIHJldHVybiB0aGlzO1xuXHRsaXN0ZW5lcnMgPSBkYXRhW3R5cGVdO1xuXG5cdGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnb2JqZWN0Jykge1xuXHRcdGZvciAoaSA9IDA7IChjYW5kaWRhdGUgPSBsaXN0ZW5lcnNbaV0pOyArK2kpIHtcblx0XHRcdGlmICgoY2FuZGlkYXRlID09PSBsaXN0ZW5lcikgfHxcblx0XHRcdFx0XHQoY2FuZGlkYXRlLl9fZWVPbmNlTGlzdGVuZXJfXyA9PT0gbGlzdGVuZXIpKSB7XG5cdFx0XHRcdGlmIChsaXN0ZW5lcnMubGVuZ3RoID09PSAyKSBkYXRhW3R5cGVdID0gbGlzdGVuZXJzW2kgPyAwIDogMV07XG5cdFx0XHRcdGVsc2UgbGlzdGVuZXJzLnNwbGljZShpLCAxKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0aWYgKChsaXN0ZW5lcnMgPT09IGxpc3RlbmVyKSB8fFxuXHRcdFx0XHQobGlzdGVuZXJzLl9fZWVPbmNlTGlzdGVuZXJfXyA9PT0gbGlzdGVuZXIpKSB7XG5cdFx0XHRkZWxldGUgZGF0YVt0eXBlXTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbmVtaXQgPSBmdW5jdGlvbiAodHlwZSkge1xuXHR2YXIgaSwgbCwgbGlzdGVuZXIsIGxpc3RlbmVycywgYXJncztcblxuXHRpZiAoIWhhc093blByb3BlcnR5LmNhbGwodGhpcywgJ19fZWVfXycpKSByZXR1cm47XG5cdGxpc3RlbmVycyA9IHRoaXMuX19lZV9fW3R5cGVdO1xuXHRpZiAoIWxpc3RlbmVycykgcmV0dXJuO1xuXG5cdGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnb2JqZWN0Jykge1xuXHRcdGwgPSBhcmd1bWVudHMubGVuZ3RoO1xuXHRcdGFyZ3MgPSBuZXcgQXJyYXkobCAtIDEpO1xuXHRcdGZvciAoaSA9IDE7IGkgPCBsOyArK2kpIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0bGlzdGVuZXJzID0gbGlzdGVuZXJzLnNsaWNlKCk7XG5cdFx0Zm9yIChpID0gMDsgKGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldKTsgKytpKSB7XG5cdFx0XHRhcHBseS5jYWxsKGxpc3RlbmVyLCB0aGlzLCBhcmdzKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0c3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0Y2FzZSAxOlxuXHRcdFx0Y2FsbC5jYWxsKGxpc3RlbmVycywgdGhpcyk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDI6XG5cdFx0XHRjYWxsLmNhbGwobGlzdGVuZXJzLCB0aGlzLCBhcmd1bWVudHNbMV0pO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAzOlxuXHRcdFx0Y2FsbC5jYWxsKGxpc3RlbmVycywgdGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdGwgPSBhcmd1bWVudHMubGVuZ3RoO1xuXHRcdFx0YXJncyA9IG5ldyBBcnJheShsIC0gMSk7XG5cdFx0XHRmb3IgKGkgPSAxOyBpIDwgbDsgKytpKSB7XG5cdFx0XHRcdGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0fVxuXHRcdFx0YXBwbHkuY2FsbChsaXN0ZW5lcnMsIHRoaXMsIGFyZ3MpO1xuXHRcdH1cblx0fVxufTtcblxubWV0aG9kcyA9IHtcblx0b246IG9uLFxuXHRvbmNlOiBvbmNlLFxuXHRvZmY6IG9mZixcblx0ZW1pdDogZW1pdFxufTtcblxuZGVzY3JpcHRvcnMgPSB7XG5cdG9uOiBkKG9uKSxcblx0b25jZTogZChvbmNlKSxcblx0b2ZmOiBkKG9mZiksXG5cdGVtaXQ6IGQoZW1pdClcbn07XG5cbmJhc2UgPSBkZWZpbmVQcm9wZXJ0aWVzKHt9LCBkZXNjcmlwdG9ycyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZ1bmN0aW9uIChvKSB7XG5cdHJldHVybiAobyA9PSBudWxsKSA/IGNyZWF0ZShiYXNlKSA6IGRlZmluZVByb3BlcnRpZXMoT2JqZWN0KG8pLCBkZXNjcmlwdG9ycyk7XG59O1xuZXhwb3J0cy5tZXRob2RzID0gbWV0aG9kcztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9ldmVudC1lbWl0dGVyL2luZGV4LmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXNzaWduICAgICAgICA9IHJlcXVpcmUoJ2VzNS1leHQvb2JqZWN0L2Fzc2lnbicpXG4gICwgbm9ybWFsaXplT3B0cyA9IHJlcXVpcmUoJ2VzNS1leHQvb2JqZWN0L25vcm1hbGl6ZS1vcHRpb25zJylcbiAgLCBpc0NhbGxhYmxlICAgID0gcmVxdWlyZSgnZXM1LWV4dC9vYmplY3QvaXMtY2FsbGFibGUnKVxuICAsIGNvbnRhaW5zICAgICAgPSByZXF1aXJlKCdlczUtZXh0L3N0cmluZy8jL2NvbnRhaW5zJylcblxuICAsIGQ7XG5cbmQgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkc2NyLCB2YWx1ZS8qLCBvcHRpb25zKi8pIHtcblx0dmFyIGMsIGUsIHcsIG9wdGlvbnMsIGRlc2M7XG5cdGlmICgoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHx8ICh0eXBlb2YgZHNjciAhPT0gJ3N0cmluZycpKSB7XG5cdFx0b3B0aW9ucyA9IHZhbHVlO1xuXHRcdHZhbHVlID0gZHNjcjtcblx0XHRkc2NyID0gbnVsbDtcblx0fSBlbHNlIHtcblx0XHRvcHRpb25zID0gYXJndW1lbnRzWzJdO1xuXHR9XG5cdGlmIChkc2NyID09IG51bGwpIHtcblx0XHRjID0gdyA9IHRydWU7XG5cdFx0ZSA9IGZhbHNlO1xuXHR9IGVsc2Uge1xuXHRcdGMgPSBjb250YWlucy5jYWxsKGRzY3IsICdjJyk7XG5cdFx0ZSA9IGNvbnRhaW5zLmNhbGwoZHNjciwgJ2UnKTtcblx0XHR3ID0gY29udGFpbnMuY2FsbChkc2NyLCAndycpO1xuXHR9XG5cblx0ZGVzYyA9IHsgdmFsdWU6IHZhbHVlLCBjb25maWd1cmFibGU6IGMsIGVudW1lcmFibGU6IGUsIHdyaXRhYmxlOiB3IH07XG5cdHJldHVybiAhb3B0aW9ucyA/IGRlc2MgOiBhc3NpZ24obm9ybWFsaXplT3B0cyhvcHRpb25zKSwgZGVzYyk7XG59O1xuXG5kLmdzID0gZnVuY3Rpb24gKGRzY3IsIGdldCwgc2V0LyosIG9wdGlvbnMqLykge1xuXHR2YXIgYywgZSwgb3B0aW9ucywgZGVzYztcblx0aWYgKHR5cGVvZiBkc2NyICE9PSAnc3RyaW5nJykge1xuXHRcdG9wdGlvbnMgPSBzZXQ7XG5cdFx0c2V0ID0gZ2V0O1xuXHRcdGdldCA9IGRzY3I7XG5cdFx0ZHNjciA9IG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0b3B0aW9ucyA9IGFyZ3VtZW50c1szXTtcblx0fVxuXHRpZiAoZ2V0ID09IG51bGwpIHtcblx0XHRnZXQgPSB1bmRlZmluZWQ7XG5cdH0gZWxzZSBpZiAoIWlzQ2FsbGFibGUoZ2V0KSkge1xuXHRcdG9wdGlvbnMgPSBnZXQ7XG5cdFx0Z2V0ID0gc2V0ID0gdW5kZWZpbmVkO1xuXHR9IGVsc2UgaWYgKHNldCA9PSBudWxsKSB7XG5cdFx0c2V0ID0gdW5kZWZpbmVkO1xuXHR9IGVsc2UgaWYgKCFpc0NhbGxhYmxlKHNldCkpIHtcblx0XHRvcHRpb25zID0gc2V0O1xuXHRcdHNldCA9IHVuZGVmaW5lZDtcblx0fVxuXHRpZiAoZHNjciA9PSBudWxsKSB7XG5cdFx0YyA9IHRydWU7XG5cdFx0ZSA9IGZhbHNlO1xuXHR9IGVsc2Uge1xuXHRcdGMgPSBjb250YWlucy5jYWxsKGRzY3IsICdjJyk7XG5cdFx0ZSA9IGNvbnRhaW5zLmNhbGwoZHNjciwgJ2UnKTtcblx0fVxuXG5cdGRlc2MgPSB7IGdldDogZ2V0LCBzZXQ6IHNldCwgY29uZmlndXJhYmxlOiBjLCBlbnVtZXJhYmxlOiBlIH07XG5cdHJldHVybiAhb3B0aW9ucyA/IGRlc2MgOiBhc3NpZ24obm9ybWFsaXplT3B0cyhvcHRpb25zKSwgZGVzYyk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2QvaW5kZXguanMiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9pcy1pbXBsZW1lbnRlZFwiKSgpXG5cdD8gT2JqZWN0LmFzc2lnblxuXHQ6IHJlcXVpcmUoXCIuL3NoaW1cIik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvYXNzaWduL2luZGV4LmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgYXNzaWduID0gT2JqZWN0LmFzc2lnbiwgb2JqO1xuXHRpZiAodHlwZW9mIGFzc2lnbiAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gZmFsc2U7XG5cdG9iaiA9IHsgZm9vOiBcInJhelwiIH07XG5cdGFzc2lnbihvYmosIHsgYmFyOiBcImR3YVwiIH0sIHsgdHJ6eTogXCJ0cnp5XCIgfSk7XG5cdHJldHVybiAob2JqLmZvbyArIG9iai5iYXIgKyBvYmoudHJ6eSkgPT09IFwicmF6ZHdhdHJ6eVwiO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9hc3NpZ24vaXMtaW1wbGVtZW50ZWQuanMiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGtleXMgID0gcmVxdWlyZShcIi4uL2tleXNcIilcbiAgLCB2YWx1ZSA9IHJlcXVpcmUoXCIuLi92YWxpZC12YWx1ZVwiKVxuICAsIG1heCAgID0gTWF0aC5tYXg7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRlc3QsIHNyYyAvKiwg4oCmc3JjbiovKSB7XG5cdHZhciBlcnJvciwgaSwgbGVuZ3RoID0gbWF4KGFyZ3VtZW50cy5sZW5ndGgsIDIpLCBhc3NpZ247XG5cdGRlc3QgPSBPYmplY3QodmFsdWUoZGVzdCkpO1xuXHRhc3NpZ24gPSBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0dHJ5IHtcblx0XHRcdGRlc3Rba2V5XSA9IHNyY1trZXldO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZTtcblx0XHR9XG5cdH07XG5cdGZvciAoaSA9IDE7IGkgPCBsZW5ndGg7ICsraSkge1xuXHRcdHNyYyA9IGFyZ3VtZW50c1tpXTtcblx0XHRrZXlzKHNyYykuZm9yRWFjaChhc3NpZ24pO1xuXHR9XG5cdGlmIChlcnJvciAhPT0gdW5kZWZpbmVkKSB0aHJvdyBlcnJvcjtcblx0cmV0dXJuIGRlc3Q7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2Fzc2lnbi9zaGltLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vaXMtaW1wbGVtZW50ZWRcIikoKVxuXHQ/IE9iamVjdC5rZXlzXG5cdDogcmVxdWlyZShcIi4vc2hpbVwiKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9rZXlzL2luZGV4LmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHR0cnkge1xuXHRcdE9iamVjdC5rZXlzKFwicHJpbWl0aXZlXCIpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlKSB7XG4gcmV0dXJuIGZhbHNlO1xufVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9rZXlzL2lzLWltcGxlbWVudGVkLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc1ZhbHVlID0gcmVxdWlyZShcIi4uL2lzLXZhbHVlXCIpO1xuXG52YXIga2V5cyA9IE9iamVjdC5rZXlzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QpIHtcblx0cmV0dXJuIGtleXMoaXNWYWx1ZShvYmplY3QpID8gT2JqZWN0KG9iamVjdCkgOiBvYmplY3QpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9rZXlzL3NoaW0uanMiLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVtcHR5LWZ1bmN0aW9uXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHt9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2VzNS1leHQvZnVuY3Rpb24vbm9vcC5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNWYWx1ZSA9IHJlcXVpcmUoXCIuL2lzLXZhbHVlXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRpZiAoIWlzVmFsdWUodmFsdWUpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSBudWxsIG9yIHVuZGVmaW5lZFwiKTtcblx0cmV0dXJuIHZhbHVlO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC92YWxpZC12YWx1ZS5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNWYWx1ZSA9IHJlcXVpcmUoXCIuL2lzLXZhbHVlXCIpO1xuXG52YXIgZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLCBjcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xuXG52YXIgcHJvY2VzcyA9IGZ1bmN0aW9uIChzcmMsIG9iaikge1xuXHR2YXIga2V5O1xuXHRmb3IgKGtleSBpbiBzcmMpIG9ialtrZXldID0gc3JjW2tleV07XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9wdHMxIC8qLCDigKZvcHRpb25zKi8pIHtcblx0dmFyIHJlc3VsdCA9IGNyZWF0ZShudWxsKTtcblx0Zm9yRWFjaC5jYWxsKGFyZ3VtZW50cywgZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0XHRpZiAoIWlzVmFsdWUob3B0aW9ucykpIHJldHVybjtcblx0XHRwcm9jZXNzKE9iamVjdChvcHRpb25zKSwgcmVzdWx0KTtcblx0fSk7XG5cdHJldHVybiByZXN1bHQ7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L25vcm1hbGl6ZS1vcHRpb25zLmpzIiwiLy8gRGVwcmVjYXRlZFxuXG5cInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7XG4gcmV0dXJuIHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIjtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvaXMtY2FsbGFibGUuanMiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9pcy1pbXBsZW1lbnRlZFwiKSgpXG5cdD8gU3RyaW5nLnByb3RvdHlwZS5jb250YWluc1xuXHQ6IHJlcXVpcmUoXCIuL3NoaW1cIik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucy9pbmRleC5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3RyID0gXCJyYXpkd2F0cnp5XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHRpZiAodHlwZW9mIHN0ci5jb250YWlucyAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gZmFsc2U7XG5cdHJldHVybiAoc3RyLmNvbnRhaW5zKFwiZHdhXCIpID09PSB0cnVlKSAmJiAoc3RyLmNvbnRhaW5zKFwiZm9vXCIpID09PSBmYWxzZSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvaXMtaW1wbGVtZW50ZWQuanMiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGluZGV4T2YgPSBTdHJpbmcucHJvdG90eXBlLmluZGV4T2Y7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlYXJjaFN0cmluZy8qLCBwb3NpdGlvbiovKSB7XG5cdHJldHVybiBpbmRleE9mLmNhbGwodGhpcywgc2VhcmNoU3RyaW5nLCBhcmd1bWVudHNbMV0pID4gLTE7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvc2hpbS5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbikge1xuXHRpZiAodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoZm4gKyBcIiBpcyBub3QgYSBmdW5jdGlvblwiKTtcblx0cmV0dXJuIGZuO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC92YWxpZC1jYWxsYWJsZS5qcyIsIi8qIVxuICogdmFsaWRhdGUuanMgMC4xMS4xXG4gKlxuICogKGMpIDIwMTMtMjAxNiBOaWNrbGFzIEFuc21hbiwgMjAxMyBXcmFwcFxuICogVmFsaWRhdGUuanMgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKiBGb3IgYWxsIGRldGFpbHMgYW5kIGRvY3VtZW50YXRpb246XG4gKiBodHRwOi8vdmFsaWRhdGVqcy5vcmcvXG4gKi9cblxuKGZ1bmN0aW9uKGV4cG9ydHMsIG1vZHVsZSwgZGVmaW5lKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIC8vIFRoZSBtYWluIGZ1bmN0aW9uIHRoYXQgY2FsbHMgdGhlIHZhbGlkYXRvcnMgc3BlY2lmaWVkIGJ5IHRoZSBjb25zdHJhaW50cy5cbiAgLy8gVGhlIG9wdGlvbnMgYXJlIHRoZSBmb2xsb3dpbmc6XG4gIC8vICAgLSBmb3JtYXQgKHN0cmluZykgLSBBbiBvcHRpb24gdGhhdCBjb250cm9scyBob3cgdGhlIHJldHVybmVkIHZhbHVlIGlzIGZvcm1hdHRlZFxuICAvLyAgICAgKiBmbGF0IC0gUmV0dXJucyBhIGZsYXQgYXJyYXkgb2YganVzdCB0aGUgZXJyb3IgbWVzc2FnZXNcbiAgLy8gICAgICogZ3JvdXBlZCAtIFJldHVybnMgdGhlIG1lc3NhZ2VzIGdyb3VwZWQgYnkgYXR0cmlidXRlIChkZWZhdWx0KVxuICAvLyAgICAgKiBkZXRhaWxlZCAtIFJldHVybnMgYW4gYXJyYXkgb2YgdGhlIHJhdyB2YWxpZGF0aW9uIGRhdGFcbiAgLy8gICAtIGZ1bGxNZXNzYWdlcyAoYm9vbGVhbikgLSBJZiBgdHJ1ZWAgKGRlZmF1bHQpIHRoZSBhdHRyaWJ1dGUgbmFtZSBpcyBwcmVwZW5kZWQgdG8gdGhlIGVycm9yLlxuICAvL1xuICAvLyBQbGVhc2Ugbm90ZSB0aGF0IHRoZSBvcHRpb25zIGFyZSBhbHNvIHBhc3NlZCB0byBlYWNoIHZhbGlkYXRvci5cbiAgdmFyIHZhbGlkYXRlID0gZnVuY3Rpb24oYXR0cmlidXRlcywgY29uc3RyYWludHMsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gdi5leHRlbmQoe30sIHYub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICB2YXIgcmVzdWx0cyA9IHYucnVuVmFsaWRhdGlvbnMoYXR0cmlidXRlcywgY29uc3RyYWludHMsIG9wdGlvbnMpXG4gICAgICAsIGF0dHJcbiAgICAgICwgdmFsaWRhdG9yO1xuXG4gICAgZm9yIChhdHRyIGluIHJlc3VsdHMpIHtcbiAgICAgIGZvciAodmFsaWRhdG9yIGluIHJlc3VsdHNbYXR0cl0pIHtcbiAgICAgICAgaWYgKHYuaXNQcm9taXNlKHJlc3VsdHNbYXR0cl1bdmFsaWRhdG9yXSkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVc2UgdmFsaWRhdGUuYXN5bmMgaWYgeW91IHdhbnQgc3VwcG9ydCBmb3IgcHJvbWlzZXNcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbGlkYXRlLnByb2Nlc3NWYWxpZGF0aW9uUmVzdWx0cyhyZXN1bHRzLCBvcHRpb25zKTtcbiAgfTtcblxuICB2YXIgdiA9IHZhbGlkYXRlO1xuXG4gIC8vIENvcGllcyBvdmVyIGF0dHJpYnV0ZXMgZnJvbSBvbmUgb3IgbW9yZSBzb3VyY2VzIHRvIGEgc2luZ2xlIGRlc3RpbmF0aW9uLlxuICAvLyBWZXJ5IG11Y2ggc2ltaWxhciB0byB1bmRlcnNjb3JlJ3MgZXh0ZW5kLlxuICAvLyBUaGUgZmlyc3QgYXJndW1lbnQgaXMgdGhlIHRhcmdldCBvYmplY3QgYW5kIHRoZSByZW1haW5pbmcgYXJndW1lbnRzIHdpbGwgYmVcbiAgLy8gdXNlZCBhcyBzb3VyY2VzLlxuICB2LmV4dGVuZCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKS5mb3JFYWNoKGZ1bmN0aW9uKHNvdXJjZSkge1xuICAgICAgZm9yICh2YXIgYXR0ciBpbiBzb3VyY2UpIHtcbiAgICAgICAgb2JqW2F0dHJdID0gc291cmNlW2F0dHJdO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgdi5leHRlbmQodmFsaWRhdGUsIHtcbiAgICAvLyBUaGlzIGlzIHRoZSB2ZXJzaW9uIG9mIHRoZSBsaWJyYXJ5IGFzIGEgc2VtdmVyLlxuICAgIC8vIFRoZSB0b1N0cmluZyBmdW5jdGlvbiB3aWxsIGFsbG93IGl0IHRvIGJlIGNvZXJjZWQgaW50byBhIHN0cmluZ1xuICAgIHZlcnNpb246IHtcbiAgICAgIG1ham9yOiAwLFxuICAgICAgbWlub3I6IDExLFxuICAgICAgcGF0Y2g6IDEsXG4gICAgICBtZXRhZGF0YTogbnVsbCxcbiAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZlcnNpb24gPSB2LmZvcm1hdChcIiV7bWFqb3J9LiV7bWlub3J9LiV7cGF0Y2h9XCIsIHYudmVyc2lvbik7XG4gICAgICAgIGlmICghdi5pc0VtcHR5KHYudmVyc2lvbi5tZXRhZGF0YSkpIHtcbiAgICAgICAgICB2ZXJzaW9uICs9IFwiK1wiICsgdi52ZXJzaW9uLm1ldGFkYXRhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2ZXJzaW9uO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBCZWxvdyBpcyB0aGUgZGVwZW5kZW5jaWVzIHRoYXQgYXJlIHVzZWQgaW4gdmFsaWRhdGUuanNcblxuICAgIC8vIFRoZSBjb25zdHJ1Y3RvciBvZiB0aGUgUHJvbWlzZSBpbXBsZW1lbnRhdGlvbi5cbiAgICAvLyBJZiB5b3UgYXJlIHVzaW5nIFEuanMsIFJTVlAgb3IgYW55IG90aGVyIEErIGNvbXBhdGlibGUgaW1wbGVtZW50YXRpb25cbiAgICAvLyBvdmVycmlkZSB0aGlzIGF0dHJpYnV0ZSB0byBiZSB0aGUgY29uc3RydWN0b3Igb2YgdGhhdCBwcm9taXNlLlxuICAgIC8vIFNpbmNlIGpRdWVyeSBwcm9taXNlcyBhcmVuJ3QgQSsgY29tcGF0aWJsZSB0aGV5IHdvbid0IHdvcmsuXG4gICAgUHJvbWlzZTogdHlwZW9mIFByb21pc2UgIT09IFwidW5kZWZpbmVkXCIgPyBQcm9taXNlIDogLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gbnVsbCxcblxuICAgIEVNUFRZX1NUUklOR19SRUdFWFA6IC9eXFxzKiQvLFxuXG4gICAgLy8gUnVucyB0aGUgdmFsaWRhdG9ycyBzcGVjaWZpZWQgYnkgdGhlIGNvbnN0cmFpbnRzIG9iamVjdC5cbiAgICAvLyBXaWxsIHJldHVybiBhbiBhcnJheSBvZiB0aGUgZm9ybWF0OlxuICAgIC8vICAgICBbe2F0dHJpYnV0ZTogXCI8YXR0cmlidXRlIG5hbWU+XCIsIGVycm9yOiBcIjx2YWxpZGF0aW9uIHJlc3VsdD5cIn0sIC4uLl1cbiAgICBydW5WYWxpZGF0aW9uczogZnVuY3Rpb24oYXR0cmlidXRlcywgY29uc3RyYWludHMsIG9wdGlvbnMpIHtcbiAgICAgIHZhciByZXN1bHRzID0gW11cbiAgICAgICAgLCBhdHRyXG4gICAgICAgICwgdmFsaWRhdG9yTmFtZVxuICAgICAgICAsIHZhbHVlXG4gICAgICAgICwgdmFsaWRhdG9yc1xuICAgICAgICAsIHZhbGlkYXRvclxuICAgICAgICAsIHZhbGlkYXRvck9wdGlvbnNcbiAgICAgICAgLCBlcnJvcjtcblxuICAgICAgaWYgKHYuaXNEb21FbGVtZW50KGF0dHJpYnV0ZXMpIHx8IHYuaXNKcXVlcnlFbGVtZW50KGF0dHJpYnV0ZXMpKSB7XG4gICAgICAgIGF0dHJpYnV0ZXMgPSB2LmNvbGxlY3RGb3JtVmFsdWVzKGF0dHJpYnV0ZXMpO1xuICAgICAgfVxuXG4gICAgICAvLyBMb29wcyB0aHJvdWdoIGVhY2ggY29uc3RyYWludHMsIGZpbmRzIHRoZSBjb3JyZWN0IHZhbGlkYXRvciBhbmQgcnVuIGl0LlxuICAgICAgZm9yIChhdHRyIGluIGNvbnN0cmFpbnRzKSB7XG4gICAgICAgIHZhbHVlID0gdi5nZXREZWVwT2JqZWN0VmFsdWUoYXR0cmlidXRlcywgYXR0cik7XG4gICAgICAgIC8vIFRoaXMgYWxsb3dzIHRoZSBjb25zdHJhaW50cyBmb3IgYW4gYXR0cmlidXRlIHRvIGJlIGEgZnVuY3Rpb24uXG4gICAgICAgIC8vIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSB2YWx1ZSwgYXR0cmlidXRlIG5hbWUsIHRoZSBjb21wbGV0ZSBkaWN0IG9mXG4gICAgICAgIC8vIGF0dHJpYnV0ZXMgYXMgd2VsbCBhcyB0aGUgb3B0aW9ucyBhbmQgY29uc3RyYWludHMgcGFzc2VkIGluLlxuICAgICAgICAvLyBUaGlzIGlzIHVzZWZ1bCB3aGVuIHlvdSB3YW50IHRvIGhhdmUgZGlmZmVyZW50XG4gICAgICAgIC8vIHZhbGlkYXRpb25zIGRlcGVuZGluZyBvbiB0aGUgYXR0cmlidXRlIHZhbHVlLlxuICAgICAgICB2YWxpZGF0b3JzID0gdi5yZXN1bHQoY29uc3RyYWludHNbYXR0cl0sIHZhbHVlLCBhdHRyaWJ1dGVzLCBhdHRyLCBvcHRpb25zLCBjb25zdHJhaW50cyk7XG5cbiAgICAgICAgZm9yICh2YWxpZGF0b3JOYW1lIGluIHZhbGlkYXRvcnMpIHtcbiAgICAgICAgICB2YWxpZGF0b3IgPSB2LnZhbGlkYXRvcnNbdmFsaWRhdG9yTmFtZV07XG5cbiAgICAgICAgICBpZiAoIXZhbGlkYXRvcikge1xuICAgICAgICAgICAgZXJyb3IgPSB2LmZvcm1hdChcIlVua25vd24gdmFsaWRhdG9yICV7bmFtZX1cIiwge25hbWU6IHZhbGlkYXRvck5hbWV9KTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFsaWRhdG9yT3B0aW9ucyA9IHZhbGlkYXRvcnNbdmFsaWRhdG9yTmFtZV07XG4gICAgICAgICAgLy8gVGhpcyBhbGxvd3MgdGhlIG9wdGlvbnMgdG8gYmUgYSBmdW5jdGlvbi4gVGhlIGZ1bmN0aW9uIHdpbGwgYmVcbiAgICAgICAgICAvLyBjYWxsZWQgd2l0aCB0aGUgdmFsdWUsIGF0dHJpYnV0ZSBuYW1lLCB0aGUgY29tcGxldGUgZGljdCBvZlxuICAgICAgICAgIC8vIGF0dHJpYnV0ZXMgYXMgd2VsbCBhcyB0aGUgb3B0aW9ucyBhbmQgY29uc3RyYWludHMgcGFzc2VkIGluLlxuICAgICAgICAgIC8vIFRoaXMgaXMgdXNlZnVsIHdoZW4geW91IHdhbnQgdG8gaGF2ZSBkaWZmZXJlbnRcbiAgICAgICAgICAvLyB2YWxpZGF0aW9ucyBkZXBlbmRpbmcgb24gdGhlIGF0dHJpYnV0ZSB2YWx1ZS5cbiAgICAgICAgICB2YWxpZGF0b3JPcHRpb25zID0gdi5yZXN1bHQodmFsaWRhdG9yT3B0aW9ucywgdmFsdWUsIGF0dHJpYnV0ZXMsIGF0dHIsIG9wdGlvbnMsIGNvbnN0cmFpbnRzKTtcbiAgICAgICAgICBpZiAoIXZhbGlkYXRvck9wdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICAgICAgYXR0cmlidXRlOiBhdHRyLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3JOYW1lLFxuICAgICAgICAgICAgZ2xvYmFsT3B0aW9uczogb3B0aW9ucyxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IGF0dHJpYnV0ZXMsXG4gICAgICAgICAgICBvcHRpb25zOiB2YWxpZGF0b3JPcHRpb25zLFxuICAgICAgICAgICAgZXJyb3I6IHZhbGlkYXRvci5jYWxsKHZhbGlkYXRvcixcbiAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3JPcHRpb25zLFxuICAgICAgICAgICAgICAgIGF0dHIsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlcyxcbiAgICAgICAgICAgICAgICBvcHRpb25zKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0sXG5cbiAgICAvLyBUYWtlcyB0aGUgb3V0cHV0IGZyb20gcnVuVmFsaWRhdGlvbnMgYW5kIGNvbnZlcnRzIGl0IHRvIHRoZSBjb3JyZWN0XG4gICAgLy8gb3V0cHV0IGZvcm1hdC5cbiAgICBwcm9jZXNzVmFsaWRhdGlvblJlc3VsdHM6IGZ1bmN0aW9uKGVycm9ycywgb3B0aW9ucykge1xuICAgICAgZXJyb3JzID0gdi5wcnVuZUVtcHR5RXJyb3JzKGVycm9ycywgb3B0aW9ucyk7XG4gICAgICBlcnJvcnMgPSB2LmV4cGFuZE11bHRpcGxlRXJyb3JzKGVycm9ycywgb3B0aW9ucyk7XG4gICAgICBlcnJvcnMgPSB2LmNvbnZlcnRFcnJvck1lc3NhZ2VzKGVycm9ycywgb3B0aW9ucyk7XG5cbiAgICAgIHZhciBmb3JtYXQgPSBvcHRpb25zLmZvcm1hdCB8fCBcImdyb3VwZWRcIjtcblxuICAgICAgaWYgKHR5cGVvZiB2LmZvcm1hdHRlcnNbZm9ybWF0XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBlcnJvcnMgPSB2LmZvcm1hdHRlcnNbZm9ybWF0XShlcnJvcnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHYuZm9ybWF0KFwiVW5rbm93biBmb3JtYXQgJXtmb3JtYXR9XCIsIG9wdGlvbnMpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHYuaXNFbXB0eShlcnJvcnMpID8gdW5kZWZpbmVkIDogZXJyb3JzO1xuICAgIH0sXG5cbiAgICAvLyBSdW5zIHRoZSB2YWxpZGF0aW9ucyB3aXRoIHN1cHBvcnQgZm9yIHByb21pc2VzLlxuICAgIC8vIFRoaXMgZnVuY3Rpb24gd2lsbCByZXR1cm4gYSBwcm9taXNlIHRoYXQgaXMgc2V0dGxlZCB3aGVuIGFsbCB0aGVcbiAgICAvLyB2YWxpZGF0aW9uIHByb21pc2VzIGhhdmUgYmVlbiBjb21wbGV0ZWQuXG4gICAgLy8gSXQgY2FuIGJlIGNhbGxlZCBldmVuIGlmIG5vIHZhbGlkYXRpb25zIHJldHVybmVkIGEgcHJvbWlzZS5cbiAgICBhc3luYzogZnVuY3Rpb24oYXR0cmlidXRlcywgY29uc3RyYWludHMsIG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSB2LmV4dGVuZCh7fSwgdi5hc3luYy5vcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgdmFyIFdyYXBFcnJvcnMgPSBvcHRpb25zLndyYXBFcnJvcnMgfHwgZnVuY3Rpb24oZXJyb3JzKSB7XG4gICAgICAgIHJldHVybiBlcnJvcnM7XG4gICAgICB9O1xuXG4gICAgICAvLyBSZW1vdmVzIHVua25vd24gYXR0cmlidXRlc1xuICAgICAgaWYgKG9wdGlvbnMuY2xlYW5BdHRyaWJ1dGVzICE9PSBmYWxzZSkge1xuICAgICAgICBhdHRyaWJ1dGVzID0gdi5jbGVhbkF0dHJpYnV0ZXMoYXR0cmlidXRlcywgY29uc3RyYWludHMpO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVzdWx0cyA9IHYucnVuVmFsaWRhdGlvbnMoYXR0cmlidXRlcywgY29uc3RyYWludHMsIG9wdGlvbnMpO1xuXG4gICAgICByZXR1cm4gbmV3IHYuUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdi53YWl0Rm9yUmVzdWx0cyhyZXN1bHRzKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBlcnJvcnMgPSB2LnByb2Nlc3NWYWxpZGF0aW9uUmVzdWx0cyhyZXN1bHRzLCBvcHRpb25zKTtcbiAgICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICByZWplY3QobmV3IFdyYXBFcnJvcnMoZXJyb3JzLCBvcHRpb25zLCBhdHRyaWJ1dGVzLCBjb25zdHJhaW50cykpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKGF0dHJpYnV0ZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHNpbmdsZTogZnVuY3Rpb24odmFsdWUsIGNvbnN0cmFpbnRzLCBvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gdi5leHRlbmQoe30sIHYuc2luZ2xlLm9wdGlvbnMsIG9wdGlvbnMsIHtcbiAgICAgICAgZm9ybWF0OiBcImZsYXRcIixcbiAgICAgICAgZnVsbE1lc3NhZ2VzOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdih7c2luZ2xlOiB2YWx1ZX0sIHtzaW5nbGU6IGNvbnN0cmFpbnRzfSwgb3B0aW9ucyk7XG4gICAgfSxcblxuICAgIC8vIFJldHVybnMgYSBwcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiBhbGwgcHJvbWlzZXMgaW4gdGhlIHJlc3VsdHMgYXJyYXlcbiAgICAvLyBhcmUgc2V0dGxlZC4gVGhlIHByb21pc2UgcmV0dXJuZWQgZnJvbSB0aGlzIGZ1bmN0aW9uIGlzIGFsd2F5cyByZXNvbHZlZCxcbiAgICAvLyBuZXZlciByZWplY3RlZC5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIG1vZGlmaWVzIHRoZSBpbnB1dCBhcmd1bWVudCwgaXQgcmVwbGFjZXMgdGhlIHByb21pc2VzXG4gICAgLy8gd2l0aCB0aGUgdmFsdWUgcmV0dXJuZWQgZnJvbSB0aGUgcHJvbWlzZS5cbiAgICB3YWl0Rm9yUmVzdWx0czogZnVuY3Rpb24ocmVzdWx0cykge1xuICAgICAgLy8gQ3JlYXRlIGEgc2VxdWVuY2Ugb2YgYWxsIHRoZSByZXN1bHRzIHN0YXJ0aW5nIHdpdGggYSByZXNvbHZlZCBwcm9taXNlLlxuICAgICAgcmV0dXJuIHJlc3VsdHMucmVkdWNlKGZ1bmN0aW9uKG1lbW8sIHJlc3VsdCkge1xuICAgICAgICAvLyBJZiB0aGlzIHJlc3VsdCBpc24ndCBhIHByb21pc2Ugc2tpcCBpdCBpbiB0aGUgc2VxdWVuY2UuXG4gICAgICAgIGlmICghdi5pc1Byb21pc2UocmVzdWx0LmVycm9yKSkge1xuICAgICAgICAgIHJldHVybiBtZW1vO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1lbW8udGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmVycm9yLnRoZW4oZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgIHJlc3VsdC5lcnJvciA9IGVycm9yIHx8IG51bGw7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSwgbmV3IHYuUHJvbWlzZShmdW5jdGlvbihyKSB7IHIoKTsgfSkpOyAvLyBBIHJlc29sdmVkIHByb21pc2VcbiAgICB9LFxuXG4gICAgLy8gSWYgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIGEgY2FsbDogZnVuY3Rpb24gdGhlIGFuZDogZnVuY3Rpb24gcmV0dXJuIHRoZSB2YWx1ZVxuICAgIC8vIG90aGVyd2lzZSBqdXN0IHJldHVybiB0aGUgdmFsdWUuIEFkZGl0aW9uYWwgYXJndW1lbnRzIHdpbGwgYmUgcGFzc2VkIGFzXG4gICAgLy8gYXJndW1lbnRzIHRvIHRoZSBmdW5jdGlvbi5cbiAgICAvLyBFeGFtcGxlOlxuICAgIC8vIGBgYFxuICAgIC8vIHJlc3VsdCgnZm9vJykgLy8gJ2ZvbydcbiAgICAvLyByZXN1bHQoTWF0aC5tYXgsIDEsIDIpIC8vIDJcbiAgICAvLyBgYGBcbiAgICByZXN1bHQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuXG4gICAgLy8gQ2hlY2tzIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci4gVGhpcyBmdW5jdGlvbiBkb2VzIG5vdCBjb25zaWRlciBOYU4gYVxuICAgIC8vIG51bWJlciBsaWtlIG1hbnkgb3RoZXIgYGlzTnVtYmVyYCBmdW5jdGlvbnMgZG8uXG4gICAgaXNOdW1iZXI6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiAhaXNOYU4odmFsdWUpO1xuICAgIH0sXG5cbiAgICAvLyBSZXR1cm5zIGZhbHNlIGlmIHRoZSBvYmplY3QgaXMgbm90IGEgZnVuY3Rpb25cbiAgICBpc0Z1bmN0aW9uOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9LFxuXG4gICAgLy8gQSBzaW1wbGUgY2hlY2sgdG8gdmVyaWZ5IHRoYXQgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIuIFVzZXMgYGlzTnVtYmVyYFxuICAgIC8vIGFuZCBhIHNpbXBsZSBtb2R1bG8gY2hlY2suXG4gICAgaXNJbnRlZ2VyOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHYuaXNOdW1iZXIodmFsdWUpICYmIHZhbHVlICUgMSA9PT0gMDtcbiAgICB9LFxuXG4gICAgLy8gQ2hlY2tzIGlmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW5cbiAgICBpc0Jvb2xlYW46IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbic7XG4gICAgfSxcblxuICAgIC8vIFVzZXMgdGhlIGBPYmplY3RgIGZ1bmN0aW9uIHRvIGNoZWNrIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhbiBvYmplY3QuXG4gICAgaXNPYmplY3Q6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gT2JqZWN0KG9iaik7XG4gICAgfSxcblxuICAgIC8vIFNpbXBseSBjaGVja3MgaWYgdGhlIG9iamVjdCBpcyBhbiBpbnN0YW5jZSBvZiBhIGRhdGVcbiAgICBpc0RhdGU6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIERhdGU7XG4gICAgfSxcblxuICAgIC8vIFJldHVybnMgZmFsc2UgaWYgdGhlIG9iamVjdCBpcyBgbnVsbGAgb2YgYHVuZGVmaW5lZGBcbiAgICBpc0RlZmluZWQ6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAhPT0gbnVsbCAmJiBvYmogIT09IHVuZGVmaW5lZDtcbiAgICB9LFxuXG4gICAgLy8gQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhIHByb21pc2UuIEFueXRoaW5nIHdpdGggYSBgdGhlbmBcbiAgICAvLyBmdW5jdGlvbiBpcyBjb25zaWRlcmVkIGEgcHJvbWlzZS5cbiAgICBpc1Byb21pc2U6IGZ1bmN0aW9uKHApIHtcbiAgICAgIHJldHVybiAhIXAgJiYgdi5pc0Z1bmN0aW9uKHAudGhlbik7XG4gICAgfSxcblxuICAgIGlzSnF1ZXJ5RWxlbWVudDogZnVuY3Rpb24obykge1xuICAgICAgcmV0dXJuIG8gJiYgdi5pc1N0cmluZyhvLmpxdWVyeSk7XG4gICAgfSxcblxuICAgIGlzRG9tRWxlbWVudDogZnVuY3Rpb24obykge1xuICAgICAgaWYgKCFvKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFvLnF1ZXJ5U2VsZWN0b3JBbGwgfHwgIW8ucXVlcnlTZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICh2LmlzT2JqZWN0KGRvY3VtZW50KSAmJiBvID09PSBkb2N1bWVudCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzg0MzgwLzY5OTMwNFxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIGlmICh0eXBlb2YgSFRNTEVsZW1lbnQgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIG8gaW5zdGFuY2VvZiBIVE1MRWxlbWVudDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvICYmXG4gICAgICAgICAgdHlwZW9mIG8gPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICBvICE9PSBudWxsICYmXG4gICAgICAgICAgby5ub2RlVHlwZSA9PT0gMSAmJlxuICAgICAgICAgIHR5cGVvZiBvLm5vZGVOYW1lID09PSBcInN0cmluZ1wiO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBpc0VtcHR5OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIGF0dHI7XG5cbiAgICAgIC8vIE51bGwgYW5kIHVuZGVmaW5lZCBhcmUgZW1wdHlcbiAgICAgIGlmICghdi5pc0RlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBmdW5jdGlvbnMgYXJlIG5vbiBlbXB0eVxuICAgICAgaWYgKHYuaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBXaGl0ZXNwYWNlIG9ubHkgc3RyaW5ncyBhcmUgZW1wdHlcbiAgICAgIGlmICh2LmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdi5FTVBUWV9TVFJJTkdfUkVHRVhQLnRlc3QodmFsdWUpO1xuICAgICAgfVxuXG4gICAgICAvLyBGb3IgYXJyYXlzIHdlIHVzZSB0aGUgbGVuZ3RoIHByb3BlcnR5XG4gICAgICBpZiAodi5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoID09PSAwO1xuICAgICAgfVxuXG4gICAgICAvLyBEYXRlcyBoYXZlIG5vIGF0dHJpYnV0ZXMgYnV0IGFyZW4ndCBlbXB0eVxuICAgICAgaWYgKHYuaXNEYXRlKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHdlIGZpbmQgYXQgbGVhc3Qgb25lIHByb3BlcnR5IHdlIGNvbnNpZGVyIGl0IG5vbiBlbXB0eVxuICAgICAgaWYgKHYuaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgIGZvciAoYXR0ciBpbiB2YWx1ZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICAvLyBGb3JtYXRzIHRoZSBzcGVjaWZpZWQgc3RyaW5ncyB3aXRoIHRoZSBnaXZlbiB2YWx1ZXMgbGlrZSBzbzpcbiAgICAvLyBgYGBcbiAgICAvLyBmb3JtYXQoXCJGb286ICV7Zm9vfVwiLCB7Zm9vOiBcImJhclwifSkgLy8gXCJGb28gYmFyXCJcbiAgICAvLyBgYGBcbiAgICAvLyBJZiB5b3Ugd2FudCB0byB3cml0ZSAley4uLn0gd2l0aG91dCBoYXZpbmcgaXQgcmVwbGFjZWQgc2ltcGx5XG4gICAgLy8gcHJlZml4IGl0IHdpdGggJSBsaWtlIHRoaXMgYEZvbzogJSV7Zm9vfWAgYW5kIGl0IHdpbGwgYmUgcmV0dXJuZWRcbiAgICAvLyBhcyBgXCJGb286ICV7Zm9vfVwiYFxuICAgIGZvcm1hdDogdi5leHRlbmQoZnVuY3Rpb24oc3RyLCB2YWxzKSB7XG4gICAgICBpZiAoIXYuaXNTdHJpbmcoc3RyKSkge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKHYuZm9ybWF0LkZPUk1BVF9SRUdFWFAsIGZ1bmN0aW9uKG0wLCBtMSwgbTIpIHtcbiAgICAgICAgaWYgKG0xID09PSAnJScpIHtcbiAgICAgICAgICByZXR1cm4gXCIle1wiICsgbTIgKyBcIn1cIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHNbbTJdKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwge1xuICAgICAgLy8gRmluZHMgJXtrZXl9IHN0eWxlIHBhdHRlcm5zIGluIHRoZSBnaXZlbiBzdHJpbmdcbiAgICAgIEZPUk1BVF9SRUdFWFA6IC8oJT8pJVxceyhbXlxcfV0rKVxcfS9nXG4gICAgfSksXG5cbiAgICAvLyBcIlByZXR0aWZpZXNcIiB0aGUgZ2l2ZW4gc3RyaW5nLlxuICAgIC8vIFByZXR0aWZ5aW5nIG1lYW5zIHJlcGxhY2luZyBbLlxcXy1dIHdpdGggc3BhY2VzIGFzIHdlbGwgYXMgc3BsaXR0aW5nXG4gICAgLy8gY2FtZWwgY2FzZSB3b3Jkcy5cbiAgICBwcmV0dGlmeTogZnVuY3Rpb24oc3RyKSB7XG4gICAgICBpZiAodi5pc051bWJlcihzdHIpKSB7XG4gICAgICAgIC8vIElmIHRoZXJlIGFyZSBtb3JlIHRoYW4gMiBkZWNpbWFscyByb3VuZCBpdCB0byB0d29cbiAgICAgICAgaWYgKChzdHIgKiAxMDApICUgMSA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBcIlwiICsgc3RyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KE1hdGgucm91bmQoc3RyICogMTAwKSAvIDEwMCkudG9GaXhlZCgyKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodi5pc0FycmF5KHN0cikpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5tYXAoZnVuY3Rpb24ocykgeyByZXR1cm4gdi5wcmV0dGlmeShzKTsgfSkuam9pbihcIiwgXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAodi5pc09iamVjdChzdHIpKSB7XG4gICAgICAgIHJldHVybiBzdHIudG9TdHJpbmcoKTtcbiAgICAgIH1cblxuICAgICAgLy8gRW5zdXJlIHRoZSBzdHJpbmcgaXMgYWN0dWFsbHkgYSBzdHJpbmdcbiAgICAgIHN0ciA9IFwiXCIgKyBzdHI7XG5cbiAgICAgIHJldHVybiBzdHJcbiAgICAgICAgLy8gU3BsaXRzIGtleXMgc2VwYXJhdGVkIGJ5IHBlcmlvZHNcbiAgICAgICAgLnJlcGxhY2UoLyhbXlxcc10pXFwuKFteXFxzXSkvZywgJyQxICQyJylcbiAgICAgICAgLy8gUmVtb3ZlcyBiYWNrc2xhc2hlc1xuICAgICAgICAucmVwbGFjZSgvXFxcXCsvZywgJycpXG4gICAgICAgIC8vIFJlcGxhY2VzIC0gYW5kIC0gd2l0aCBzcGFjZVxuICAgICAgICAucmVwbGFjZSgvW18tXS9nLCAnICcpXG4gICAgICAgIC8vIFNwbGl0cyBjYW1lbCBjYXNlZCB3b3Jkc1xuICAgICAgICAucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgZnVuY3Rpb24obTAsIG0xLCBtMikge1xuICAgICAgICAgIHJldHVybiBcIlwiICsgbTEgKyBcIiBcIiArIG0yLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpO1xuICAgIH0sXG5cbiAgICBzdHJpbmdpZnlWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiB2LnByZXR0aWZ5KHZhbHVlKTtcbiAgICB9LFxuXG4gICAgaXNTdHJpbmc6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbiAgICB9LFxuXG4gICAgaXNBcnJheTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiB7fS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICB9LFxuXG4gICAgLy8gQ2hlY2tzIGlmIHRoZSBvYmplY3QgaXMgYSBoYXNoLCB3aGljaCBpcyBlcXVpdmFsZW50IHRvIGFuIG9iamVjdCB0aGF0XG4gICAgLy8gaXMgbmVpdGhlciBhbiBhcnJheSBub3IgYSBmdW5jdGlvbi5cbiAgICBpc0hhc2g6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdi5pc09iamVjdCh2YWx1ZSkgJiYgIXYuaXNBcnJheSh2YWx1ZSkgJiYgIXYuaXNGdW5jdGlvbih2YWx1ZSk7XG4gICAgfSxcblxuICAgIGNvbnRhaW5zOiBmdW5jdGlvbihvYmosIHZhbHVlKSB7XG4gICAgICBpZiAoIXYuaXNEZWZpbmVkKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHYuaXNBcnJheShvYmopKSB7XG4gICAgICAgIHJldHVybiBvYmouaW5kZXhPZih2YWx1ZSkgIT09IC0xO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlIGluIG9iajtcbiAgICB9LFxuXG4gICAgdW5pcXVlOiBmdW5jdGlvbihhcnJheSkge1xuICAgICAgaWYgKCF2LmlzQXJyYXkoYXJyYXkpKSB7XG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhcnJheS5maWx0ZXIoZnVuY3Rpb24oZWwsIGluZGV4LCBhcnJheSkge1xuICAgICAgICByZXR1cm4gYXJyYXkuaW5kZXhPZihlbCkgPT0gaW5kZXg7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgZm9yRWFjaEtleUluS2V5cGF0aDogZnVuY3Rpb24ob2JqZWN0LCBrZXlwYXRoLCBjYWxsYmFjaykge1xuICAgICAgaWYgKCF2LmlzU3RyaW5nKGtleXBhdGgpKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHZhciBrZXkgPSBcIlwiXG4gICAgICAgICwgaVxuICAgICAgICAsIGVzY2FwZSA9IGZhbHNlO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cGF0aC5sZW5ndGg7ICsraSkge1xuICAgICAgICBzd2l0Y2ggKGtleXBhdGhbaV0pIHtcbiAgICAgICAgICBjYXNlICcuJzpcbiAgICAgICAgICAgIGlmIChlc2NhcGUpIHtcbiAgICAgICAgICAgICAgZXNjYXBlID0gZmFsc2U7XG4gICAgICAgICAgICAgIGtleSArPSAnLic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBvYmplY3QgPSBjYWxsYmFjayhvYmplY3QsIGtleSwgZmFsc2UpO1xuICAgICAgICAgICAgICBrZXkgPSBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdcXFxcJzpcbiAgICAgICAgICAgIGlmIChlc2NhcGUpIHtcbiAgICAgICAgICAgICAgZXNjYXBlID0gZmFsc2U7XG4gICAgICAgICAgICAgIGtleSArPSAnXFxcXCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlc2NhcGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgZXNjYXBlID0gZmFsc2U7XG4gICAgICAgICAgICBrZXkgKz0ga2V5cGF0aFtpXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjYWxsYmFjayhvYmplY3QsIGtleSwgdHJ1ZSk7XG4gICAgfSxcblxuICAgIGdldERlZXBPYmplY3RWYWx1ZTogZnVuY3Rpb24ob2JqLCBrZXlwYXRoKSB7XG4gICAgICBpZiAoIXYuaXNPYmplY3Qob2JqKSkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdi5mb3JFYWNoS2V5SW5LZXlwYXRoKG9iaiwga2V5cGF0aCwgZnVuY3Rpb24ob2JqLCBrZXkpIHtcbiAgICAgICAgaWYgKHYuaXNPYmplY3Qob2JqKSkge1xuICAgICAgICAgIHJldHVybiBvYmpba2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8vIFRoaXMgcmV0dXJucyBhbiBvYmplY3Qgd2l0aCBhbGwgdGhlIHZhbHVlcyBvZiB0aGUgZm9ybS5cbiAgICAvLyBJdCB1c2VzIHRoZSBpbnB1dCBuYW1lIGFzIGtleSBhbmQgdGhlIHZhbHVlIGFzIHZhbHVlXG4gICAgLy8gU28gZm9yIGV4YW1wbGUgdGhpczpcbiAgICAvLyA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZW1haWxcIiB2YWx1ZT1cImZvb0BiYXIuY29tXCIgLz5cbiAgICAvLyB3b3VsZCByZXR1cm46XG4gICAgLy8ge2VtYWlsOiBcImZvb0BiYXIuY29tXCJ9XG4gICAgY29sbGVjdEZvcm1WYWx1ZXM6IGZ1bmN0aW9uKGZvcm0sIG9wdGlvbnMpIHtcbiAgICAgIHZhciB2YWx1ZXMgPSB7fVxuICAgICAgICAsIGlcbiAgICAgICAgLCBqXG4gICAgICAgICwgaW5wdXRcbiAgICAgICAgLCBpbnB1dHNcbiAgICAgICAgLCBvcHRpb25cbiAgICAgICAgLCB2YWx1ZTtcblxuICAgICAgaWYgKHYuaXNKcXVlcnlFbGVtZW50KGZvcm0pKSB7XG4gICAgICAgIGZvcm0gPSBmb3JtWzBdO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWZvcm0pIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgIH1cblxuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgIGlucHV0cyA9IGZvcm0ucXVlcnlTZWxlY3RvckFsbChcImlucHV0W25hbWVdLCB0ZXh0YXJlYVtuYW1lXVwiKTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaW5wdXQgPSBpbnB1dHMuaXRlbShpKTtcblxuICAgICAgICBpZiAodi5pc0RlZmluZWQoaW5wdXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZ25vcmVkXCIpKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFsdWUgPSB2LnNhbml0aXplRm9ybVZhbHVlKGlucHV0LnZhbHVlLCBvcHRpb25zKTtcbiAgICAgICAgaWYgKGlucHV0LnR5cGUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlID8gK3ZhbHVlIDogbnVsbDtcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dC50eXBlID09PSBcImNoZWNrYm94XCIpIHtcbiAgICAgICAgICBpZiAoaW5wdXQuYXR0cmlidXRlcy52YWx1ZSkge1xuICAgICAgICAgICAgaWYgKCFpbnB1dC5jaGVja2VkKSB7XG4gICAgICAgICAgICAgIHZhbHVlID0gdmFsdWVzW2lucHV0Lm5hbWVdIHx8IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlID0gaW5wdXQuY2hlY2tlZDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQudHlwZSA9PT0gXCJyYWRpb1wiKSB7XG4gICAgICAgICAgaWYgKCFpbnB1dC5jaGVja2VkKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlc1tpbnB1dC5uYW1lXSB8fCBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YWx1ZXNbaW5wdXQubmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgaW5wdXRzID0gZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwic2VsZWN0W25hbWVdXCIpO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpbnB1dCA9IGlucHV0cy5pdGVtKGkpO1xuICAgICAgICBpZiAoaW5wdXQubXVsdGlwbGUpIHtcbiAgICAgICAgICB2YWx1ZSA9IFtdO1xuICAgICAgICAgIGZvciAoaiBpbiBpbnB1dC5vcHRpb25zKSB7XG4gICAgICAgICAgICBvcHRpb24gPSBpbnB1dC5vcHRpb25zW2pdO1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICB2YWx1ZS5wdXNoKHYuc2FuaXRpemVGb3JtVmFsdWUob3B0aW9uLnZhbHVlLCBvcHRpb25zKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlID0gdi5zYW5pdGl6ZUZvcm1WYWx1ZShpbnB1dC5vcHRpb25zW2lucHV0LnNlbGVjdGVkSW5kZXhdLnZhbHVlLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZXNbaW5wdXQubmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9LFxuXG4gICAgc2FuaXRpemVGb3JtVmFsdWU6IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zKSB7XG4gICAgICBpZiAob3B0aW9ucy50cmltICYmIHYuaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUudHJpbSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5udWxsaWZ5ICE9PSBmYWxzZSAmJiB2YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuXG4gICAgY2FwaXRhbGl6ZTogZnVuY3Rpb24oc3RyKSB7XG4gICAgICBpZiAoIXYuaXNTdHJpbmcoc3RyKSkge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0clswXS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xuICAgIH0sXG5cbiAgICAvLyBSZW1vdmUgYWxsIGVycm9ycyB3aG8ncyBlcnJvciBhdHRyaWJ1dGUgaXMgZW1wdHkgKG51bGwgb3IgdW5kZWZpbmVkKVxuICAgIHBydW5lRW1wdHlFcnJvcnM6IGZ1bmN0aW9uKGVycm9ycykge1xuICAgICAgcmV0dXJuIGVycm9ycy5maWx0ZXIoZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuICF2LmlzRW1wdHkoZXJyb3IuZXJyb3IpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8vIEluXG4gICAgLy8gW3tlcnJvcjogW1wiZXJyMVwiLCBcImVycjJcIl0sIC4uLn1dXG4gICAgLy8gT3V0XG4gICAgLy8gW3tlcnJvcjogXCJlcnIxXCIsIC4uLn0sIHtlcnJvcjogXCJlcnIyXCIsIC4uLn1dXG4gICAgLy9cbiAgICAvLyBBbGwgYXR0cmlidXRlcyBpbiBhbiBlcnJvciB3aXRoIG11bHRpcGxlIG1lc3NhZ2VzIGFyZSBkdXBsaWNhdGVkXG4gICAgLy8gd2hlbiBleHBhbmRpbmcgdGhlIGVycm9ycy5cbiAgICBleHBhbmRNdWx0aXBsZUVycm9yczogZnVuY3Rpb24oZXJyb3JzKSB7XG4gICAgICB2YXIgcmV0ID0gW107XG4gICAgICBlcnJvcnMuZm9yRWFjaChmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAvLyBSZW1vdmVzIGVycm9ycyB3aXRob3V0IGEgbWVzc2FnZVxuICAgICAgICBpZiAodi5pc0FycmF5KGVycm9yLmVycm9yKSkge1xuICAgICAgICAgIGVycm9yLmVycm9yLmZvckVhY2goZnVuY3Rpb24obXNnKSB7XG4gICAgICAgICAgICByZXQucHVzaCh2LmV4dGVuZCh7fSwgZXJyb3IsIHtlcnJvcjogbXNnfSkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldC5wdXNoKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0cyB0aGUgZXJyb3IgbWVzYWdlcyBieSBwcmVwZW5kaW5nIHRoZSBhdHRyaWJ1dGUgbmFtZSB1bmxlc3MgdGhlXG4gICAgLy8gbWVzc2FnZSBpcyBwcmVmaXhlZCBieSBeXG4gICAgY29udmVydEVycm9yTWVzc2FnZXM6IGZ1bmN0aW9uKGVycm9ycywgb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgIHZhciByZXQgPSBbXTtcbiAgICAgIGVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uKGVycm9ySW5mbykge1xuICAgICAgICB2YXIgZXJyb3IgPSB2LnJlc3VsdChlcnJvckluZm8uZXJyb3IsXG4gICAgICAgICAgICBlcnJvckluZm8udmFsdWUsXG4gICAgICAgICAgICBlcnJvckluZm8uYXR0cmlidXRlLFxuICAgICAgICAgICAgZXJyb3JJbmZvLm9wdGlvbnMsXG4gICAgICAgICAgICBlcnJvckluZm8uYXR0cmlidXRlcyxcbiAgICAgICAgICAgIGVycm9ySW5mby5nbG9iYWxPcHRpb25zKTtcblxuICAgICAgICBpZiAoIXYuaXNTdHJpbmcoZXJyb3IpKSB7XG4gICAgICAgICAgcmV0LnB1c2goZXJyb3JJbmZvKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXJyb3JbMF0gPT09ICdeJykge1xuICAgICAgICAgIGVycm9yID0gZXJyb3Iuc2xpY2UoMSk7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5mdWxsTWVzc2FnZXMgIT09IGZhbHNlKSB7XG4gICAgICAgICAgZXJyb3IgPSB2LmNhcGl0YWxpemUodi5wcmV0dGlmeShlcnJvckluZm8uYXR0cmlidXRlKSkgKyBcIiBcIiArIGVycm9yO1xuICAgICAgICB9XG4gICAgICAgIGVycm9yID0gZXJyb3IucmVwbGFjZSgvXFxcXFxcXi9nLCBcIl5cIik7XG4gICAgICAgIGVycm9yID0gdi5mb3JtYXQoZXJyb3IsIHt2YWx1ZTogdi5zdHJpbmdpZnlWYWx1ZShlcnJvckluZm8udmFsdWUpfSk7XG4gICAgICAgIHJldC5wdXNoKHYuZXh0ZW5kKHt9LCBlcnJvckluZm8sIHtlcnJvcjogZXJyb3J9KSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcblxuICAgIC8vIEluOlxuICAgIC8vIFt7YXR0cmlidXRlOiBcIjxhdHRyaWJ1dGVOYW1lPlwiLCAuLi59XVxuICAgIC8vIE91dDpcbiAgICAvLyB7XCI8YXR0cmlidXRlTmFtZT5cIjogW3thdHRyaWJ1dGU6IFwiPGF0dHJpYnV0ZU5hbWU+XCIsIC4uLn1dfVxuICAgIGdyb3VwRXJyb3JzQnlBdHRyaWJ1dGU6IGZ1bmN0aW9uKGVycm9ycykge1xuICAgICAgdmFyIHJldCA9IHt9O1xuICAgICAgZXJyb3JzLmZvckVhY2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgdmFyIGxpc3QgPSByZXRbZXJyb3IuYXR0cmlidXRlXTtcbiAgICAgICAgaWYgKGxpc3QpIHtcbiAgICAgICAgICBsaXN0LnB1c2goZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldFtlcnJvci5hdHRyaWJ1dGVdID0gW2Vycm9yXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0sXG5cbiAgICAvLyBJbjpcbiAgICAvLyBbe2Vycm9yOiBcIjxtZXNzYWdlIDE+XCIsIC4uLn0sIHtlcnJvcjogXCI8bWVzc2FnZSAyPlwiLCAuLi59XVxuICAgIC8vIE91dDpcbiAgICAvLyBbXCI8bWVzc2FnZSAxPlwiLCBcIjxtZXNzYWdlIDI+XCJdXG4gICAgZmxhdHRlbkVycm9yc1RvQXJyYXk6IGZ1bmN0aW9uKGVycm9ycykge1xuICAgICAgcmV0dXJuIGVycm9yc1xuICAgICAgICAubWFwKGZ1bmN0aW9uKGVycm9yKSB7IHJldHVybiBlcnJvci5lcnJvcjsgfSlcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIHNlbGYpIHtcbiAgICAgICAgICByZXR1cm4gc2VsZi5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXg7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBjbGVhbkF0dHJpYnV0ZXM6IGZ1bmN0aW9uKGF0dHJpYnV0ZXMsIHdoaXRlbGlzdCkge1xuICAgICAgZnVuY3Rpb24gd2hpdGVsaXN0Q3JlYXRvcihvYmosIGtleSwgbGFzdCkge1xuICAgICAgICBpZiAodi5pc09iamVjdChvYmpba2V5XSkpIHtcbiAgICAgICAgICByZXR1cm4gb2JqW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChvYmpba2V5XSA9IGxhc3QgPyB0cnVlIDoge30pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBidWlsZE9iamVjdFdoaXRlbGlzdCh3aGl0ZWxpc3QpIHtcbiAgICAgICAgdmFyIG93ID0ge31cbiAgICAgICAgICAsIGxhc3RPYmplY3RcbiAgICAgICAgICAsIGF0dHI7XG4gICAgICAgIGZvciAoYXR0ciBpbiB3aGl0ZWxpc3QpIHtcbiAgICAgICAgICBpZiAoIXdoaXRlbGlzdFthdHRyXSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHYuZm9yRWFjaEtleUluS2V5cGF0aChvdywgYXR0ciwgd2hpdGVsaXN0Q3JlYXRvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG93O1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBjbGVhblJlY3Vyc2l2ZShhdHRyaWJ1dGVzLCB3aGl0ZWxpc3QpIHtcbiAgICAgICAgaWYgKCF2LmlzT2JqZWN0KGF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZXM7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmV0ID0gdi5leHRlbmQoe30sIGF0dHJpYnV0ZXMpXG4gICAgICAgICAgLCB3XG4gICAgICAgICAgLCBhdHRyaWJ1dGU7XG5cbiAgICAgICAgZm9yIChhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcykge1xuICAgICAgICAgIHcgPSB3aGl0ZWxpc3RbYXR0cmlidXRlXTtcblxuICAgICAgICAgIGlmICh2LmlzT2JqZWN0KHcpKSB7XG4gICAgICAgICAgICByZXRbYXR0cmlidXRlXSA9IGNsZWFuUmVjdXJzaXZlKHJldFthdHRyaWJ1dGVdLCB3KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCF3KSB7XG4gICAgICAgICAgICBkZWxldGUgcmV0W2F0dHJpYnV0ZV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG5cbiAgICAgIGlmICghdi5pc09iamVjdCh3aGl0ZWxpc3QpIHx8ICF2LmlzT2JqZWN0KGF0dHJpYnV0ZXMpKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH1cblxuICAgICAgd2hpdGVsaXN0ID0gYnVpbGRPYmplY3RXaGl0ZWxpc3Qod2hpdGVsaXN0KTtcbiAgICAgIHJldHVybiBjbGVhblJlY3Vyc2l2ZShhdHRyaWJ1dGVzLCB3aGl0ZWxpc3QpO1xuICAgIH0sXG5cbiAgICBleHBvc2VNb2R1bGU6IGZ1bmN0aW9uKHZhbGlkYXRlLCByb290LCBleHBvcnRzLCBtb2R1bGUsIGRlZmluZSkge1xuICAgICAgaWYgKGV4cG9ydHMpIHtcbiAgICAgICAgaWYgKG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHZhbGlkYXRlO1xuICAgICAgICB9XG4gICAgICAgIGV4cG9ydHMudmFsaWRhdGUgPSB2YWxpZGF0ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3QudmFsaWRhdGUgPSB2YWxpZGF0ZTtcbiAgICAgICAgaWYgKHZhbGlkYXRlLmlzRnVuY3Rpb24oZGVmaW5lKSAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgICAgZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7IHJldHVybiB2YWxpZGF0ZTsgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgd2FybjogZnVuY3Rpb24obXNnKSB7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS53YXJuKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIlt2YWxpZGF0ZS5qc10gXCIgKyBtc2cpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBlcnJvcjogZnVuY3Rpb24obXNnKSB7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS5lcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiW3ZhbGlkYXRlLmpzXSBcIiArIG1zZyk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICB2YWxpZGF0ZS52YWxpZGF0b3JzID0ge1xuICAgIC8vIFByZXNlbmNlIHZhbGlkYXRlcyB0aGF0IHRoZSB2YWx1ZSBpc24ndCBlbXB0eVxuICAgIHByZXNlbmNlOiBmdW5jdGlvbih2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHYuZXh0ZW5kKHt9LCB0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgaWYgKG9wdGlvbnMuYWxsb3dFbXB0eSA/ICF2LmlzRGVmaW5lZCh2YWx1ZSkgOiB2LmlzRW1wdHkodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLm1lc3NhZ2UgfHwgdGhpcy5tZXNzYWdlIHx8IFwiY2FuJ3QgYmUgYmxhbmtcIjtcbiAgICAgIH1cbiAgICB9LFxuICAgIGxlbmd0aDogZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMsIGF0dHJpYnV0ZSkge1xuICAgICAgLy8gRW1wdHkgdmFsdWVzIGFyZSBhbGxvd2VkXG4gICAgICBpZiAoIXYuaXNEZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIG9wdGlvbnMgPSB2LmV4dGVuZCh7fSwgdGhpcy5vcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgdmFyIGlzID0gb3B0aW9ucy5pc1xuICAgICAgICAsIG1heGltdW0gPSBvcHRpb25zLm1heGltdW1cbiAgICAgICAgLCBtaW5pbXVtID0gb3B0aW9ucy5taW5pbXVtXG4gICAgICAgICwgdG9rZW5pemVyID0gb3B0aW9ucy50b2tlbml6ZXIgfHwgZnVuY3Rpb24odmFsKSB7IHJldHVybiB2YWw7IH1cbiAgICAgICAgLCBlcnJcbiAgICAgICAgLCBlcnJvcnMgPSBbXTtcblxuICAgICAgdmFsdWUgPSB0b2tlbml6ZXIodmFsdWUpO1xuICAgICAgdmFyIGxlbmd0aCA9IHZhbHVlLmxlbmd0aDtcbiAgICAgIGlmKCF2LmlzTnVtYmVyKGxlbmd0aCkpIHtcbiAgICAgICAgdi5lcnJvcih2LmZvcm1hdChcIkF0dHJpYnV0ZSAle2F0dHJ9IGhhcyBhIG5vbiBudW1lcmljIHZhbHVlIGZvciBgbGVuZ3RoYFwiLCB7YXR0cjogYXR0cmlidXRlfSkpO1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5tZXNzYWdlIHx8IHRoaXMubm90VmFsaWQgfHwgXCJoYXMgYW4gaW5jb3JyZWN0IGxlbmd0aFwiO1xuICAgICAgfVxuXG4gICAgICAvLyBJcyBjaGVja3NcbiAgICAgIGlmICh2LmlzTnVtYmVyKGlzKSAmJiBsZW5ndGggIT09IGlzKSB7XG4gICAgICAgIGVyciA9IG9wdGlvbnMud3JvbmdMZW5ndGggfHxcbiAgICAgICAgICB0aGlzLndyb25nTGVuZ3RoIHx8XG4gICAgICAgICAgXCJpcyB0aGUgd3JvbmcgbGVuZ3RoIChzaG91bGQgYmUgJXtjb3VudH0gY2hhcmFjdGVycylcIjtcbiAgICAgICAgZXJyb3JzLnB1c2godi5mb3JtYXQoZXJyLCB7Y291bnQ6IGlzfSkpO1xuICAgICAgfVxuXG4gICAgICBpZiAodi5pc051bWJlcihtaW5pbXVtKSAmJiBsZW5ndGggPCBtaW5pbXVtKSB7XG4gICAgICAgIGVyciA9IG9wdGlvbnMudG9vU2hvcnQgfHxcbiAgICAgICAgICB0aGlzLnRvb1Nob3J0IHx8XG4gICAgICAgICAgXCJpcyB0b28gc2hvcnQgKG1pbmltdW0gaXMgJXtjb3VudH0gY2hhcmFjdGVycylcIjtcbiAgICAgICAgZXJyb3JzLnB1c2godi5mb3JtYXQoZXJyLCB7Y291bnQ6IG1pbmltdW19KSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh2LmlzTnVtYmVyKG1heGltdW0pICYmIGxlbmd0aCA+IG1heGltdW0pIHtcbiAgICAgICAgZXJyID0gb3B0aW9ucy50b29Mb25nIHx8XG4gICAgICAgICAgdGhpcy50b29Mb25nIHx8XG4gICAgICAgICAgXCJpcyB0b28gbG9uZyAobWF4aW11bSBpcyAle2NvdW50fSBjaGFyYWN0ZXJzKVwiO1xuICAgICAgICBlcnJvcnMucHVzaCh2LmZvcm1hdChlcnIsIHtjb3VudDogbWF4aW11bX0pKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLm1lc3NhZ2UgfHwgZXJyb3JzO1xuICAgICAgfVxuICAgIH0sXG4gICAgbnVtZXJpY2FsaXR5OiBmdW5jdGlvbih2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgLy8gRW1wdHkgdmFsdWVzIGFyZSBmaW5lXG4gICAgICBpZiAoIXYuaXNEZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIG9wdGlvbnMgPSB2LmV4dGVuZCh7fSwgdGhpcy5vcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgdmFyIGVycm9ycyA9IFtdXG4gICAgICAgICwgbmFtZVxuICAgICAgICAsIGNvdW50XG4gICAgICAgICwgY2hlY2tzID0ge1xuICAgICAgICAgICAgZ3JlYXRlclRoYW46ICAgICAgICAgIGZ1bmN0aW9uKHYsIGMpIHsgcmV0dXJuIHYgPiBjOyB9LFxuICAgICAgICAgICAgZ3JlYXRlclRoYW5PckVxdWFsVG86IGZ1bmN0aW9uKHYsIGMpIHsgcmV0dXJuIHYgPj0gYzsgfSxcbiAgICAgICAgICAgIGVxdWFsVG86ICAgICAgICAgICAgICBmdW5jdGlvbih2LCBjKSB7IHJldHVybiB2ID09PSBjOyB9LFxuICAgICAgICAgICAgbGVzc1RoYW46ICAgICAgICAgICAgIGZ1bmN0aW9uKHYsIGMpIHsgcmV0dXJuIHYgPCBjOyB9LFxuICAgICAgICAgICAgbGVzc1RoYW5PckVxdWFsVG86ICAgIGZ1bmN0aW9uKHYsIGMpIHsgcmV0dXJuIHYgPD0gYzsgfSxcbiAgICAgICAgICAgIGRpdmlzaWJsZUJ5OiAgICAgICAgICBmdW5jdGlvbih2LCBjKSB7IHJldHVybiB2ICUgYyA9PT0gMDsgfVxuICAgICAgICAgIH07XG5cbiAgICAgIC8vIFN0cmljdCB3aWxsIGNoZWNrIHRoYXQgaXQgaXMgYSB2YWxpZCBsb29raW5nIG51bWJlclxuICAgICAgaWYgKHYuaXNTdHJpbmcodmFsdWUpICYmIG9wdGlvbnMuc3RyaWN0KSB7XG4gICAgICAgIHZhciBwYXR0ZXJuID0gXCJeKDB8WzEtOV1cXFxcZCopXCI7XG4gICAgICAgIGlmICghb3B0aW9ucy5vbmx5SW50ZWdlcikge1xuICAgICAgICAgIHBhdHRlcm4gKz0gXCIoXFxcXC5cXFxcZCspP1wiO1xuICAgICAgICB9XG4gICAgICAgIHBhdHRlcm4gKz0gXCIkXCI7XG5cbiAgICAgICAgaWYgKCEobmV3IFJlZ0V4cChwYXR0ZXJuKS50ZXN0KHZhbHVlKSkpIHtcbiAgICAgICAgICByZXR1cm4gb3B0aW9ucy5tZXNzYWdlIHx8XG4gICAgICAgICAgICBvcHRpb25zLm5vdFZhbGlkIHx8XG4gICAgICAgICAgICB0aGlzLm5vdFZhbGlkIHx8XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgfHxcbiAgICAgICAgICAgIFwibXVzdCBiZSBhIHZhbGlkIG51bWJlclwiO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIENvZXJjZSB0aGUgdmFsdWUgdG8gYSBudW1iZXIgdW5sZXNzIHdlJ3JlIGJlaW5nIHN0cmljdC5cbiAgICAgIGlmIChvcHRpb25zLm5vU3RyaW5ncyAhPT0gdHJ1ZSAmJiB2LmlzU3RyaW5nKHZhbHVlKSAmJiAhdi5pc0VtcHR5KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSA9ICt2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgaXQncyBub3QgYSBudW1iZXIgd2Ugc2hvdWxkbid0IGNvbnRpbnVlIHNpbmNlIGl0IHdpbGwgY29tcGFyZSBpdC5cbiAgICAgIGlmICghdi5pc051bWJlcih2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMubWVzc2FnZSB8fFxuICAgICAgICAgIG9wdGlvbnMubm90VmFsaWQgfHxcbiAgICAgICAgICB0aGlzLm5vdFZhbGlkIHx8XG4gICAgICAgICAgdGhpcy5tZXNzYWdlIHx8XG4gICAgICAgICAgXCJpcyBub3QgYSBudW1iZXJcIjtcbiAgICAgIH1cblxuICAgICAgLy8gU2FtZSBsb2dpYyBhcyBhYm92ZSwgc29ydCBvZi4gRG9uJ3QgYm90aGVyIHdpdGggY29tcGFyaXNvbnMgaWYgdGhpc1xuICAgICAgLy8gZG9lc24ndCBwYXNzLlxuICAgICAgaWYgKG9wdGlvbnMub25seUludGVnZXIgJiYgIXYuaXNJbnRlZ2VyKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5tZXNzYWdlIHx8XG4gICAgICAgICAgb3B0aW9ucy5ub3RJbnRlZ2VyIHx8XG4gICAgICAgICAgdGhpcy5ub3RJbnRlZ2VyIHx8XG4gICAgICAgICAgdGhpcy5tZXNzYWdlIHx8XG4gICAgICAgICAgXCJtdXN0IGJlIGFuIGludGVnZXJcIjtcbiAgICAgIH1cblxuICAgICAgZm9yIChuYW1lIGluIGNoZWNrcykge1xuICAgICAgICBjb3VudCA9IG9wdGlvbnNbbmFtZV07XG4gICAgICAgIGlmICh2LmlzTnVtYmVyKGNvdW50KSAmJiAhY2hlY2tzW25hbWVdKHZhbHVlLCBjb3VudCkpIHtcbiAgICAgICAgICAvLyBUaGlzIHBpY2tzIHRoZSBkZWZhdWx0IG1lc3NhZ2UgaWYgc3BlY2lmaWVkXG4gICAgICAgICAgLy8gRm9yIGV4YW1wbGUgdGhlIGdyZWF0ZXJUaGFuIGNoZWNrIHVzZXMgdGhlIG1lc3NhZ2UgZnJvbVxuICAgICAgICAgIC8vIHRoaXMubm90R3JlYXRlclRoYW4gc28gd2UgY2FwaXRhbGl6ZSB0aGUgbmFtZSBhbmQgcHJlcGVuZCBcIm5vdFwiXG4gICAgICAgICAgdmFyIGtleSA9IFwibm90XCIgKyB2LmNhcGl0YWxpemUobmFtZSk7XG4gICAgICAgICAgdmFyIG1zZyA9IG9wdGlvbnNba2V5XSB8fFxuICAgICAgICAgICAgdGhpc1trZXldIHx8XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgfHxcbiAgICAgICAgICAgIFwibXVzdCBiZSAle3R5cGV9ICV7Y291bnR9XCI7XG5cbiAgICAgICAgICBlcnJvcnMucHVzaCh2LmZvcm1hdChtc2csIHtcbiAgICAgICAgICAgIGNvdW50OiBjb3VudCxcbiAgICAgICAgICAgIHR5cGU6IHYucHJldHRpZnkobmFtZSlcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMub2RkICYmIHZhbHVlICUgMiAhPT0gMSkge1xuICAgICAgICBlcnJvcnMucHVzaChvcHRpb25zLm5vdE9kZCB8fFxuICAgICAgICAgICAgdGhpcy5ub3RPZGQgfHxcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSB8fFxuICAgICAgICAgICAgXCJtdXN0IGJlIG9kZFwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLmV2ZW4gJiYgdmFsdWUgJSAyICE9PSAwKSB7XG4gICAgICAgIGVycm9ycy5wdXNoKG9wdGlvbnMubm90RXZlbiB8fFxuICAgICAgICAgICAgdGhpcy5ub3RFdmVuIHx8XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgfHxcbiAgICAgICAgICAgIFwibXVzdCBiZSBldmVuXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXJyb3JzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5tZXNzYWdlIHx8IGVycm9ycztcbiAgICAgIH1cbiAgICB9LFxuICAgIGRhdGV0aW1lOiB2LmV4dGVuZChmdW5jdGlvbih2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgaWYgKCF2LmlzRnVuY3Rpb24odGhpcy5wYXJzZSkgfHwgIXYuaXNGdW5jdGlvbih0aGlzLmZvcm1hdCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQm90aCB0aGUgcGFyc2UgYW5kIGZvcm1hdCBmdW5jdGlvbnMgbmVlZHMgdG8gYmUgc2V0IHRvIHVzZSB0aGUgZGF0ZXRpbWUvZGF0ZSB2YWxpZGF0b3JcIik7XG4gICAgICB9XG5cbiAgICAgIC8vIEVtcHR5IHZhbHVlcyBhcmUgZmluZVxuICAgICAgaWYgKCF2LmlzRGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBvcHRpb25zID0gdi5leHRlbmQoe30sIHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAgIHZhciBlcnJcbiAgICAgICAgLCBlcnJvcnMgPSBbXVxuICAgICAgICAsIGVhcmxpZXN0ID0gb3B0aW9ucy5lYXJsaWVzdCA/IHRoaXMucGFyc2Uob3B0aW9ucy5lYXJsaWVzdCwgb3B0aW9ucykgOiBOYU5cbiAgICAgICAgLCBsYXRlc3QgPSBvcHRpb25zLmxhdGVzdCA/IHRoaXMucGFyc2Uob3B0aW9ucy5sYXRlc3QsIG9wdGlvbnMpIDogTmFOO1xuXG4gICAgICB2YWx1ZSA9IHRoaXMucGFyc2UodmFsdWUsIG9wdGlvbnMpO1xuXG4gICAgICAvLyA4NjQwMDAwMCBpcyB0aGUgbnVtYmVyIG9mIHNlY29uZHMgaW4gYSBkYXksIHRoaXMgaXMgdXNlZCB0byByZW1vdmVcbiAgICAgIC8vIHRoZSB0aW1lIGZyb20gdGhlIGRhdGVcbiAgICAgIGlmIChpc05hTih2YWx1ZSkgfHwgb3B0aW9ucy5kYXRlT25seSAmJiB2YWx1ZSAlIDg2NDAwMDAwICE9PSAwKSB7XG4gICAgICAgIGVyciA9IG9wdGlvbnMubm90VmFsaWQgfHxcbiAgICAgICAgICBvcHRpb25zLm1lc3NhZ2UgfHxcbiAgICAgICAgICB0aGlzLm5vdFZhbGlkIHx8XG4gICAgICAgICAgXCJtdXN0IGJlIGEgdmFsaWQgZGF0ZVwiO1xuICAgICAgICByZXR1cm4gdi5mb3JtYXQoZXJyLCB7dmFsdWU6IGFyZ3VtZW50c1swXX0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGVhcmxpZXN0KSAmJiB2YWx1ZSA8IGVhcmxpZXN0KSB7XG4gICAgICAgIGVyciA9IG9wdGlvbnMudG9vRWFybHkgfHxcbiAgICAgICAgICBvcHRpb25zLm1lc3NhZ2UgfHxcbiAgICAgICAgICB0aGlzLnRvb0Vhcmx5IHx8XG4gICAgICAgICAgXCJtdXN0IGJlIG5vIGVhcmxpZXIgdGhhbiAle2RhdGV9XCI7XG4gICAgICAgIGVyciA9IHYuZm9ybWF0KGVyciwge1xuICAgICAgICAgIHZhbHVlOiB0aGlzLmZvcm1hdCh2YWx1ZSwgb3B0aW9ucyksXG4gICAgICAgICAgZGF0ZTogdGhpcy5mb3JtYXQoZWFybGllc3QsIG9wdGlvbnMpXG4gICAgICAgIH0pO1xuICAgICAgICBlcnJvcnMucHVzaChlcnIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGxhdGVzdCkgJiYgdmFsdWUgPiBsYXRlc3QpIHtcbiAgICAgICAgZXJyID0gb3B0aW9ucy50b29MYXRlIHx8XG4gICAgICAgICAgb3B0aW9ucy5tZXNzYWdlIHx8XG4gICAgICAgICAgdGhpcy50b29MYXRlIHx8XG4gICAgICAgICAgXCJtdXN0IGJlIG5vIGxhdGVyIHRoYW4gJXtkYXRlfVwiO1xuICAgICAgICBlcnIgPSB2LmZvcm1hdChlcnIsIHtcbiAgICAgICAgICBkYXRlOiB0aGlzLmZvcm1hdChsYXRlc3QsIG9wdGlvbnMpLFxuICAgICAgICAgIHZhbHVlOiB0aGlzLmZvcm1hdCh2YWx1ZSwgb3B0aW9ucylcbiAgICAgICAgfSk7XG4gICAgICAgIGVycm9ycy5wdXNoKGVycik7XG4gICAgICB9XG5cbiAgICAgIGlmIChlcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB2LnVuaXF1ZShlcnJvcnMpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIHBhcnNlOiBudWxsLFxuICAgICAgZm9ybWF0OiBudWxsXG4gICAgfSksXG4gICAgZGF0ZTogZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSB2LmV4dGVuZCh7fSwgb3B0aW9ucywge2RhdGVPbmx5OiB0cnVlfSk7XG4gICAgICByZXR1cm4gdi52YWxpZGF0b3JzLmRhdGV0aW1lLmNhbGwodi52YWxpZGF0b3JzLmRhdGV0aW1lLCB2YWx1ZSwgb3B0aW9ucyk7XG4gICAgfSxcbiAgICBmb3JtYXQ6IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zKSB7XG4gICAgICBpZiAodi5pc1N0cmluZyhvcHRpb25zKSB8fCAob3B0aW9ucyBpbnN0YW5jZW9mIFJlZ0V4cCkpIHtcbiAgICAgICAgb3B0aW9ucyA9IHtwYXR0ZXJuOiBvcHRpb25zfTtcbiAgICAgIH1cblxuICAgICAgb3B0aW9ucyA9IHYuZXh0ZW5kKHt9LCB0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICB2YXIgbWVzc2FnZSA9IG9wdGlvbnMubWVzc2FnZSB8fCB0aGlzLm1lc3NhZ2UgfHwgXCJpcyBpbnZhbGlkXCJcbiAgICAgICAgLCBwYXR0ZXJuID0gb3B0aW9ucy5wYXR0ZXJuXG4gICAgICAgICwgbWF0Y2g7XG5cbiAgICAgIC8vIEVtcHR5IHZhbHVlcyBhcmUgYWxsb3dlZFxuICAgICAgaWYgKCF2LmlzRGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCF2LmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHYuaXNTdHJpbmcocGF0dGVybikpIHtcbiAgICAgICAgcGF0dGVybiA9IG5ldyBSZWdFeHAob3B0aW9ucy5wYXR0ZXJuLCBvcHRpb25zLmZsYWdzKTtcbiAgICAgIH1cbiAgICAgIG1hdGNoID0gcGF0dGVybi5leGVjKHZhbHVlKTtcbiAgICAgIGlmICghbWF0Y2ggfHwgbWF0Y2hbMF0ubGVuZ3RoICE9IHZhbHVlLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGluY2x1c2lvbjogZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgIC8vIEVtcHR5IHZhbHVlcyBhcmUgZmluZVxuICAgICAgaWYgKCF2LmlzRGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHYuaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgICBvcHRpb25zID0ge3dpdGhpbjogb3B0aW9uc307XG4gICAgICB9XG4gICAgICBvcHRpb25zID0gdi5leHRlbmQoe30sIHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICBpZiAodi5jb250YWlucyhvcHRpb25zLndpdGhpbiwgdmFsdWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBtZXNzYWdlID0gb3B0aW9ucy5tZXNzYWdlIHx8XG4gICAgICAgIHRoaXMubWVzc2FnZSB8fFxuICAgICAgICBcIl4le3ZhbHVlfSBpcyBub3QgaW5jbHVkZWQgaW4gdGhlIGxpc3RcIjtcbiAgICAgIHJldHVybiB2LmZvcm1hdChtZXNzYWdlLCB7dmFsdWU6IHZhbHVlfSk7XG4gICAgfSxcbiAgICBleGNsdXNpb246IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zKSB7XG4gICAgICAvLyBFbXB0eSB2YWx1ZXMgYXJlIGZpbmVcbiAgICAgIGlmICghdi5pc0RlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh2LmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgICAgb3B0aW9ucyA9IHt3aXRoaW46IG9wdGlvbnN9O1xuICAgICAgfVxuICAgICAgb3B0aW9ucyA9IHYuZXh0ZW5kKHt9LCB0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgaWYgKCF2LmNvbnRhaW5zKG9wdGlvbnMud2l0aGluLCB2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIG1lc3NhZ2UgPSBvcHRpb25zLm1lc3NhZ2UgfHwgdGhpcy5tZXNzYWdlIHx8IFwiXiV7dmFsdWV9IGlzIHJlc3RyaWN0ZWRcIjtcbiAgICAgIHJldHVybiB2LmZvcm1hdChtZXNzYWdlLCB7dmFsdWU6IHZhbHVlfSk7XG4gICAgfSxcbiAgICBlbWFpbDogdi5leHRlbmQoZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSB2LmV4dGVuZCh7fSwgdGhpcy5vcHRpb25zLCBvcHRpb25zKTtcbiAgICAgIHZhciBtZXNzYWdlID0gb3B0aW9ucy5tZXNzYWdlIHx8IHRoaXMubWVzc2FnZSB8fCBcImlzIG5vdCBhIHZhbGlkIGVtYWlsXCI7XG4gICAgICAvLyBFbXB0eSB2YWx1ZXMgYXJlIGZpbmVcbiAgICAgIGlmICghdi5pc0RlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghdi5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuUEFUVEVSTi5leGVjKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBQQVRURVJOOiAvXlthLXowLTlcXHUwMDdGLVxcdWZmZmYhIyQlJicqK1xcLz0/Xl9ge3x9fi1dKyg/OlxcLlthLXowLTlcXHUwMDdGLVxcdWZmZmYhIyQlJicqK1xcLz0/Xl9ge3x9fi1dKykqQCg/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cXC4pK1thLXpdezIsfSQvaVxuICAgIH0pLFxuICAgIGVxdWFsaXR5OiBmdW5jdGlvbih2YWx1ZSwgb3B0aW9ucywgYXR0cmlidXRlLCBhdHRyaWJ1dGVzKSB7XG4gICAgICBpZiAoIXYuaXNEZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh2LmlzU3RyaW5nKG9wdGlvbnMpKSB7XG4gICAgICAgIG9wdGlvbnMgPSB7YXR0cmlidXRlOiBvcHRpb25zfTtcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMgPSB2LmV4dGVuZCh7fSwgdGhpcy5vcHRpb25zLCBvcHRpb25zKTtcbiAgICAgIHZhciBtZXNzYWdlID0gb3B0aW9ucy5tZXNzYWdlIHx8XG4gICAgICAgIHRoaXMubWVzc2FnZSB8fFxuICAgICAgICBcImlzIG5vdCBlcXVhbCB0byAle2F0dHJpYnV0ZX1cIjtcblxuICAgICAgaWYgKHYuaXNFbXB0eShvcHRpb25zLmF0dHJpYnV0ZSkgfHwgIXYuaXNTdHJpbmcob3B0aW9ucy5hdHRyaWJ1dGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBhdHRyaWJ1dGUgbXVzdCBiZSBhIG5vbiBlbXB0eSBzdHJpbmdcIik7XG4gICAgICB9XG5cbiAgICAgIHZhciBvdGhlclZhbHVlID0gdi5nZXREZWVwT2JqZWN0VmFsdWUoYXR0cmlidXRlcywgb3B0aW9ucy5hdHRyaWJ1dGUpXG4gICAgICAgICwgY29tcGFyYXRvciA9IG9wdGlvbnMuY29tcGFyYXRvciB8fCBmdW5jdGlvbih2MSwgdjIpIHtcbiAgICAgICAgICByZXR1cm4gdjEgPT09IHYyO1xuICAgICAgICB9O1xuXG4gICAgICBpZiAoIWNvbXBhcmF0b3IodmFsdWUsIG90aGVyVmFsdWUsIG9wdGlvbnMsIGF0dHJpYnV0ZSwgYXR0cmlidXRlcykpIHtcbiAgICAgICAgcmV0dXJuIHYuZm9ybWF0KG1lc3NhZ2UsIHthdHRyaWJ1dGU6IHYucHJldHRpZnkob3B0aW9ucy5hdHRyaWJ1dGUpfSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8vIEEgVVJMIHZhbGlkYXRvciB0aGF0IGlzIHVzZWQgdG8gdmFsaWRhdGUgVVJMcyB3aXRoIHRoZSBhYmlsaXR5IHRvXG4gICAgLy8gcmVzdHJpY3Qgc2NoZW1lcyBhbmQgc29tZSBkb21haW5zLlxuICAgIHVybDogZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgIGlmICghdi5pc0RlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgb3B0aW9ucyA9IHYuZXh0ZW5kKHt9LCB0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICB2YXIgbWVzc2FnZSA9IG9wdGlvbnMubWVzc2FnZSB8fCB0aGlzLm1lc3NhZ2UgfHwgXCJpcyBub3QgYSB2YWxpZCB1cmxcIlxuICAgICAgICAsIHNjaGVtZXMgPSBvcHRpb25zLnNjaGVtZXMgfHwgdGhpcy5zY2hlbWVzIHx8IFsnaHR0cCcsICdodHRwcyddXG4gICAgICAgICwgYWxsb3dMb2NhbCA9IG9wdGlvbnMuYWxsb3dMb2NhbCB8fCB0aGlzLmFsbG93TG9jYWwgfHwgZmFsc2U7XG5cbiAgICAgIGlmICghdi5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgICB9XG5cbiAgICAgIC8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2RwZXJpbmkvNzI5Mjk0XG4gICAgICB2YXIgcmVnZXggPVxuICAgICAgICBcIl5cIiArXG4gICAgICAgIC8vIHByb3RvY29sIGlkZW50aWZpZXJcbiAgICAgICAgXCIoPzooPzpcIiArIHNjaGVtZXMuam9pbihcInxcIikgKyBcIik6Ly8pXCIgK1xuICAgICAgICAvLyB1c2VyOnBhc3MgYXV0aGVudGljYXRpb25cbiAgICAgICAgXCIoPzpcXFxcUysoPzo6XFxcXFMqKT9AKT9cIiArXG4gICAgICAgIFwiKD86XCI7XG5cbiAgICAgIHZhciB0bGQgPSBcIig/OlxcXFwuKD86W2EtelxcXFx1MDBhMS1cXFxcdWZmZmZdezIsfSkpXCI7XG5cbiAgICAgIGlmIChhbGxvd0xvY2FsKSB7XG4gICAgICAgIHRsZCArPSBcIj9cIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlZ2V4ICs9XG4gICAgICAgICAgLy8gSVAgYWRkcmVzcyBleGNsdXNpb25cbiAgICAgICAgICAvLyBwcml2YXRlICYgbG9jYWwgbmV0d29ya3NcbiAgICAgICAgICBcIig/ISg/OjEwfDEyNykoPzpcXFxcLlxcXFxkezEsM30pezN9KVwiICtcbiAgICAgICAgICBcIig/ISg/OjE2OVxcXFwuMjU0fDE5MlxcXFwuMTY4KSg/OlxcXFwuXFxcXGR7MSwzfSl7Mn0pXCIgK1xuICAgICAgICAgIFwiKD8hMTcyXFxcXC4oPzoxWzYtOV18MlxcXFxkfDNbMC0xXSkoPzpcXFxcLlxcXFxkezEsM30pezJ9KVwiO1xuICAgICAgfVxuXG4gICAgICByZWdleCArPVxuICAgICAgICAgIC8vIElQIGFkZHJlc3MgZG90dGVkIG5vdGF0aW9uIG9jdGV0c1xuICAgICAgICAgIC8vIGV4Y2x1ZGVzIGxvb3BiYWNrIG5ldHdvcmsgMC4wLjAuMFxuICAgICAgICAgIC8vIGV4Y2x1ZGVzIHJlc2VydmVkIHNwYWNlID49IDIyNC4wLjAuMFxuICAgICAgICAgIC8vIGV4Y2x1ZGVzIG5ldHdvcmsgJiBicm9hY2FzdCBhZGRyZXNzZXNcbiAgICAgICAgICAvLyAoZmlyc3QgJiBsYXN0IElQIGFkZHJlc3Mgb2YgZWFjaCBjbGFzcylcbiAgICAgICAgICBcIig/OlsxLTldXFxcXGQ/fDFcXFxcZFxcXFxkfDJbMDFdXFxcXGR8MjJbMC0zXSlcIiArXG4gICAgICAgICAgXCIoPzpcXFxcLig/OjE/XFxcXGR7MSwyfXwyWzAtNF1cXFxcZHwyNVswLTVdKSl7Mn1cIiArXG4gICAgICAgICAgXCIoPzpcXFxcLig/OlsxLTldXFxcXGQ/fDFcXFxcZFxcXFxkfDJbMC00XVxcXFxkfDI1WzAtNF0pKVwiICtcbiAgICAgICAgXCJ8XCIgK1xuICAgICAgICAgIC8vIGhvc3QgbmFtZVxuICAgICAgICAgIFwiKD86KD86W2EtelxcXFx1MDBhMS1cXFxcdWZmZmYwLTldLSopKlthLXpcXFxcdTAwYTEtXFxcXHVmZmZmMC05XSspXCIgK1xuICAgICAgICAgIC8vIGRvbWFpbiBuYW1lXG4gICAgICAgICAgXCIoPzpcXFxcLig/OlthLXpcXFxcdTAwYTEtXFxcXHVmZmZmMC05XS0qKSpbYS16XFxcXHUwMGExLVxcXFx1ZmZmZjAtOV0rKSpcIiArXG4gICAgICAgICAgdGxkICtcbiAgICAgICAgXCIpXCIgK1xuICAgICAgICAvLyBwb3J0IG51bWJlclxuICAgICAgICBcIig/OjpcXFxcZHsyLDV9KT9cIiArXG4gICAgICAgIC8vIHJlc291cmNlIHBhdGhcbiAgICAgICAgXCIoPzpbLz8jXVxcXFxTKik/XCIgK1xuICAgICAgXCIkXCI7XG5cbiAgICAgIHZhciBQQVRURVJOID0gbmV3IFJlZ0V4cChyZWdleCwgJ2knKTtcbiAgICAgIGlmICghUEFUVEVSTi5leGVjKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFsaWRhdGUuZm9ybWF0dGVycyA9IHtcbiAgICBkZXRhaWxlZDogZnVuY3Rpb24oZXJyb3JzKSB7cmV0dXJuIGVycm9yczt9LFxuICAgIGZsYXQ6IHYuZmxhdHRlbkVycm9yc1RvQXJyYXksXG4gICAgZ3JvdXBlZDogZnVuY3Rpb24oZXJyb3JzKSB7XG4gICAgICB2YXIgYXR0cjtcblxuICAgICAgZXJyb3JzID0gdi5ncm91cEVycm9yc0J5QXR0cmlidXRlKGVycm9ycyk7XG4gICAgICBmb3IgKGF0dHIgaW4gZXJyb3JzKSB7XG4gICAgICAgIGVycm9yc1thdHRyXSA9IHYuZmxhdHRlbkVycm9yc1RvQXJyYXkoZXJyb3JzW2F0dHJdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlcnJvcnM7XG4gICAgfSxcbiAgICBjb25zdHJhaW50OiBmdW5jdGlvbihlcnJvcnMpIHtcbiAgICAgIHZhciBhdHRyO1xuICAgICAgZXJyb3JzID0gdi5ncm91cEVycm9yc0J5QXR0cmlidXRlKGVycm9ycyk7XG4gICAgICBmb3IgKGF0dHIgaW4gZXJyb3JzKSB7XG4gICAgICAgIGVycm9yc1thdHRyXSA9IGVycm9yc1thdHRyXS5tYXAoZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC52YWxpZGF0b3I7XG4gICAgICAgIH0pLnNvcnQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlcnJvcnM7XG4gICAgfVxuICB9O1xuXG4gIHZhbGlkYXRlLmV4cG9zZU1vZHVsZSh2YWxpZGF0ZSwgdGhpcywgZXhwb3J0cywgbW9kdWxlLCBkZWZpbmUpO1xufSkuY2FsbCh0aGlzLFxuICAgICAgICB0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcgPyAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyBleHBvcnRzIDogbnVsbCxcbiAgICAgICAgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyBtb2R1bGUgOiBudWxsLFxuICAgICAgICB0eXBlb2YgZGVmaW5lICE9PSAndW5kZWZpbmVkJyA/IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIGRlZmluZSA6IG51bGwpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRlLmpzL3ZhbGlkYXRlLmpzIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vYmluL2Vycm9yJyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvY3VzdG9tLWVycm9yLWluc3RhbmNlL2luZGV4LmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gQ3VzdG9tRXJyb3I7XG5DdXN0b21FcnJvci5mYWN0b3J5ID0gcmVxdWlyZSgnLi9mYWN0b3JpZXMuanMnKTtcblxudmFyIEVyciA9IEN1c3RvbUVycm9yKCdDdXN0b21FcnJvcicpO1xuRXJyLm9yZGVyID0gQ3VzdG9tRXJyb3IoRXJyLCB7IG1lc3NhZ2U6ICdBcmd1bWVudHMgb3V0IG9mIG9yZGVyLicsIGNvZGU6ICdFT0FSRycgfSk7XG5cbi8qKlxuICogQ3JlYXRlIGEgY3VzdG9tIGVycm9yXG4gKiBAcGFyYW0ge3N0cmluZ30gW25hbWVdIFRoZSBuYW1lIHRvIGdpdmUgdGhlIGVycm9yLiBEZWZhdWx0cyB0byB0aGUgbmFtZSBvZiBpdCdzIHBhcmVudC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFtwYXJlbnRdIFRoZSBFcnJvciBvciBDdXN0b21FcnJvciBjb25zdHJ1Y3RvciB0byBpbmhlcml0IGZyb20uXG4gKiBAcGFyYW0ge29iamVjdH0gW3Byb3BlcnRpZXNdIFRoZSBkZWZhdWx0IHByb3BlcnRpZXMgZm9yIHRoZSBjdXN0b20gZXJyb3IuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBbZmFjdG9yeV0gQSBmdW5jdGlvbiB0byBjYWxsIHRvIG1vZGlmeSB0aGUgY3VzdG9tIGVycm9yIGluc3RhbmNlIHdoZW4gaXQgaXMgaW5zdGFudGlhdGVkLlxuICogQHJldHVybnMge2Z1bmN0aW9ufSB0aGF0IHNob3VsZCBiZSB1c2VkIGFzIGEgY29uc3RydWN0b3IuXG4gKi9cbmZ1bmN0aW9uIEN1c3RvbUVycm9yKG5hbWUsIHBhcmVudCwgcHJvcGVydGllcywgZmFjdG9yeSkge1xuICAgIHZhciBjb25zdHJ1Y3Q7XG4gICAgdmFyIGlzUm9vdDtcblxuICAgIC8vIG5vcm1hbGl6ZSBhcmd1bWVudHNcbiAgICBwYXJlbnQgPSBmaW5kQXJnKGFyZ3VtZW50cywgMSwgRXJyb3IsIGlzUGFyZW50QXJnLCBbaXNQcm9wZXJ0aWVzQXJnLCBpc0ZhY3RvcnlBcmddKTtcbiAgICBwcm9wZXJ0aWVzID0gZmluZEFyZyhhcmd1bWVudHMsIDIsIHt9LCBpc1Byb3BlcnRpZXNBcmcsIFtpc0ZhY3RvcnlBcmddKTtcbiAgICBmYWN0b3J5ID0gZmluZEFyZyhhcmd1bWVudHMsIDMsIG5vb3AsIGlzRmFjdG9yeUFyZywgW10pO1xuICAgIG5hbWUgPSBmaW5kQXJnKGFyZ3VtZW50cywgMCwgcGFyZW50ID09PSBFcnJvciA/ICdFcnJvcicgOiBwYXJlbnQucHJvdG90eXBlLkN1c3RvbUVycm9yLm5hbWUsIGlzTmFtZUFyZywgW2lzUGFyZW50QXJnLCBpc1Byb3BlcnRpZXNBcmcsIGlzRmFjdG9yeUFyZ10pO1xuXG4gICAgLy8gaWYgdGhpcyBpcyB0aGUgcm9vdCBhbmQgdGhlaXIgaXMgbm8gZmFjdG9yeSB0aGVuIHVzZSB0aGUgZGVmYXVsdCByb290IGZhY3RvcnlcbiAgICBpc1Jvb3QgPSBwYXJlbnQgPT09IEVycm9yO1xuICAgIGlmIChpc1Jvb3QgJiYgZmFjdG9yeSA9PT0gbm9vcCkgZmFjdG9yeSA9IEN1c3RvbUVycm9yLmZhY3Rvcnkucm9vdDtcblxuICAgIC8vIGJ1aWxkIHRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvblxuICAgIGNvbnN0cnVjdCA9IGZ1bmN0aW9uKG1lc3NhZ2UsIGNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgdmFyIF90aGlzO1xuICAgICAgICB2YXIgYXI7XG4gICAgICAgIHZhciBmYWN0b3JpZXM7XG4gICAgICAgIHZhciBpO1xuICAgICAgICB2YXIgaXRlbTtcbiAgICAgICAgdmFyIHByb3BzO1xuXG4gICAgICAgIC8vIGZvcmNlIHRoaXMgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdpdGggdGhlIG5ldyBrZXl3b3JkXG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBjb25zdHJ1Y3QpKSByZXR1cm4gbmV3IGNvbnN0cnVjdChtZXNzYWdlLCBjb25maWd1cmF0aW9uKTtcblxuICAgICAgICAvLyByZW5hbWUgdGhlIGNvbnN0cnVjdG9yXG4gICAgICAgIGRlbGV0ZSB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmNvbnN0cnVjdG9yLCAnbmFtZScsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IG5hbWUsXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gbWFrZSBzdXJlIHRoYXQgdGhlIG1lc3NhZ2UgaXMgYW4gb2JqZWN0XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycpIG1lc3NhZ2UgPSB7IG1lc3NhZ2U6IG1lc3NhZ2UgfTtcbiAgICAgICAgaWYgKCFtZXNzYWdlKSBtZXNzYWdlID0ge307XG5cbiAgICAgICAgLy8gYnVpbGQgdGhlIHByb3BlcnRpZXMgb2JqZWN0XG4gICAgICAgIGFyID0gdGhpcy5DdXN0b21FcnJvci5jaGFpbi5zbGljZSgwKS5yZXZlcnNlKCkubWFwKGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZS5wcm9wZXJ0aWVzIH0pO1xuICAgICAgICBhci5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICBhci51bnNoaWZ0KHt9KTtcbiAgICAgICAgcHJvcHMgPSBPYmplY3QuYXNzaWduLmFwcGx5KE9iamVjdCwgYXIpO1xuXG4gICAgICAgIC8vIGJ1aWxkIHRoZSBmYWN0b3JpZXMgY2FsbGVyIChmb3JjaW5nIHNjb3BlIHRvIHRoaXMpXG4gICAgICAgIF90aGlzID0gdGhpcztcbiAgICAgICAgZmFjdG9yaWVzID0ge307XG4gICAgICAgIE9iamVjdC5rZXlzKEN1c3RvbUVycm9yLmZhY3RvcnkpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICBmYWN0b3JpZXNba2V5XSA9IGZ1bmN0aW9uKHByb3BzLCBjb25maWcpIHtcbiAgICAgICAgICAgICAgICBDdXN0b21FcnJvci5mYWN0b3J5W2tleV0uY2FsbChfdGhpcywgcHJvcHMsIGNvbmZpZywgZmFjdG9yaWVzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNhbGwgZWFjaCBmYWN0b3J5IGluIHRoZSBjaGFpbiwgc3RhcnRpbmcgYXQgdGhlIHJvb3RcbiAgICAgICAgZm9yIChpID0gdGhpcy5DdXN0b21FcnJvci5jaGFpbi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgaXRlbSA9IHRoaXMuQ3VzdG9tRXJyb3IuY2hhaW5baV07XG4gICAgICAgICAgICBpZiAoaXRlbS5mYWN0b3J5ICE9PSBub29wKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5mYWN0b3J5LmNhbGwodGhpcywgcHJvcHMsIGNvbmZpZ3VyYXRpb24sIGZhY3Rvcmllcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gY2F1c2UgdGhlIGZ1bmN0aW9uIHByb3RvdHlwZSB0byBpbmhlcml0IGZyb20gcGFyZW50J3MgcHJvdG90eXBlXG4gICAgY29uc3RydWN0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUocGFyZW50LnByb3RvdHlwZSk7XG4gICAgY29uc3RydWN0LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdDtcblxuICAgIC8vIHVwZGF0ZSBlcnJvciBuYW1lXG4gICAgY29uc3RydWN0LnByb3RvdHlwZS5uYW1lID0gbmFtZTtcblxuICAgIC8vIGFkZCBkZXRhaWxzIGFib3V0IHRoZSBjdXN0b20gZXJyb3IgdG8gdGhlIHByb3RvdHlwZVxuICAgIGNvbnN0cnVjdC5wcm90b3R5cGUuQ3VzdG9tRXJyb3IgPSB7XG4gICAgICAgIGNoYWluOiBpc1Jvb3QgPyBbXSA6IHBhcmVudC5wcm90b3R5cGUuQ3VzdG9tRXJyb3IuY2hhaW4uc2xpY2UoMCksXG4gICAgICAgIGZhY3Rvcnk6IGZhY3RvcnksXG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgICBwcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzXG4gICAgfTtcbiAgICBjb25zdHJ1Y3QucHJvdG90eXBlLkN1c3RvbUVycm9yLmNoYWluLnVuc2hpZnQoY29uc3RydWN0LnByb3RvdHlwZS5DdXN0b21FcnJvcik7XG5cbiAgICAvLyB1cGRhdGUgdGhlIHRvU3RyaW5nIG1ldGhvZCBvbiB0aGUgcHJvdG90eXBlIHRvIGFjY2VwdCBhIGNvZGVcbiAgICBjb25zdHJ1Y3QucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLkN1c3RvbUVycm9yLmNoYWluW3RoaXMuQ3VzdG9tRXJyb3IuY2hhaW4ubGVuZ3RoIC0gMV0ubmFtZTtcbiAgICAgICAgaWYgKHRoaXMuY29kZSkgcmVzdWx0ICArPSAnICcgKyB0aGlzLmNvZGU7XG4gICAgICAgIGlmICh0aGlzLm1lc3NhZ2UpIHJlc3VsdCArPSAnOiAnICsgdGhpcy5tZXNzYWdlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbiAgICByZXR1cm4gY29uc3RydWN0O1xufVxuXG5cblxuXG5mdW5jdGlvbiBmaW5kQXJnKGFyZ3MsIGluZGV4LCBkZWZhdWx0VmFsdWUsIGZpbHRlciwgYW50aUZpbHRlcnMpIHtcbiAgICB2YXIgYW50aSA9IC0xO1xuICAgIHZhciBmb3VuZCA9IC0xO1xuICAgIHZhciBpO1xuICAgIHZhciBqO1xuICAgIHZhciBsZW4gPSBpbmRleCA8IGFyZ3MubGVuZ3RoID8gaW5kZXggOiBhcmdzLmxlbmd0aDtcbiAgICB2YXIgdmFsO1xuXG4gICAgZm9yIChpID0gMDsgaSA8PSBsZW47IGkrKykge1xuICAgICAgICB2YWwgPSBhcmdzW2ldO1xuICAgICAgICBpZiAoYW50aSA9PT0gLTEpIHtcbiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBhbnRpRmlsdGVycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChhbnRpRmlsdGVyc1tqXSh2YWwpKSBhbnRpID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZm91bmQgPT09IC0xICYmIGZpbHRlcih2YWwpKSB7XG4gICAgICAgICAgICBmb3VuZCA9IGk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZm91bmQgIT09IC0xICYmIGFudGkgIT09IC0xICYmIGFudGkgPCBmb3VuZCkgdGhyb3cgbmV3IEVyci5vcmRlcigpO1xuICAgIHJldHVybiBmb3VuZCAhPT0gLTEgP2FyZ3NbZm91bmRdIDogZGVmYXVsdFZhbHVlO1xufVxuXG5mdW5jdGlvbiBpc0ZhY3RvcnlBcmcodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nICYmIHZhbHVlICE9PSBFcnJvciAmJiAhdmFsdWUucHJvdG90eXBlLkN1c3RvbUVycm9yO1xufVxuXG5mdW5jdGlvbiBpc05hbWVBcmcodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbn1cblxuZnVuY3Rpb24gaXNQYXJlbnRBcmcodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nICYmICh2YWx1ZSA9PT0gRXJyb3IgfHwgdmFsdWUucHJvdG90eXBlLkN1c3RvbUVycm9yKTtcbn1cblxuZnVuY3Rpb24gaXNQcm9wZXJ0aWVzQXJnKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCc7XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9jdXN0b20tZXJyb3ItaW5zdGFuY2UvYmluL2Vycm9yLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuZXhwZWN0UmVjZWl2ZSA9IGZ1bmN0aW9uKHByb3BlcnRpZXMsIGNvbmZpZ3VyYXRpb24sIGZhY3RvcnkpIHtcbiAgICB2YXIgbWVzc2FnZTtcbiAgICBmYWN0b3J5LnJvb3QocHJvcGVydGllcywgY29uZmlndXJhdGlvbiwgZmFjdG9yeSk7XG5cbiAgICBtZXNzYWdlID0gdGhpcy5tZXNzYWdlO1xuICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KCdleHBlY3RlZCcpKSBtZXNzYWdlICs9ICcgRXhwZWN0ZWQgJyArIHByb3BlcnRpZXMuZXhwZWN0ZWQgKyAnLic7XG4gICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoJ3JlY2VpdmVkJykpIG1lc3NhZ2UgKz0gJyBSZWNlaXZlZDogJyArIHByb3BlcnRpZXMucmVjZWl2ZWQgKyAnLic7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn07XG5cbmV4cG9ydHMucm9vdCA9IGZ1bmN0aW9uKHByb3BlcnRpZXMsIGNvbmZpZ3VyYXRpb24sIGZhY3Rvcmllcykge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdmFyIGNvZGU7XG4gICAgdmFyIGNvbmZpZyA9IHsgc3RhY2tMZW5ndGg6IEVycm9yLnN0YWNrVHJhY2VMaW1pdCwgcm9vdE9ubHk6IHRydWUgfTtcbiAgICB2YXIgbWVzc2FnZVN0ciA9ICcnO1xuICAgIHZhciBvcmlnaW5hbFN0YWNrTGVuZ3RoID0gRXJyb3Iuc3RhY2tUcmFjZUxpbWl0O1xuICAgIHZhciBzdGFjaztcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVN0YWNrKCkge1xuICAgICAgICBzdGFja1swXSA9IF90aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgIF90aGlzLnN0YWNrID0gc3RhY2suam9pbignXFxuJyk7XG4gICAgfVxuXG4gICAgLy8gZ2V0IGNvbmZpZ3VyYXRpb24gb3B0aW9uc1xuICAgIGlmICghY29uZmlndXJhdGlvbiB8fCB0eXBlb2YgY29uZmlndXJhdGlvbiAhPT0gJ29iamVjdCcpIGNvbmZpZ3VyYXRpb24gPSB7fTtcbiAgICBpZiAoY29uZmlndXJhdGlvbi5oYXNPd25Qcm9wZXJ0eSgnc3RhY2tMZW5ndGgnKSAmJlxuICAgICAgICB0eXBlb2YgY29uZmlndXJhdGlvbi5zdGFja0xlbmd0aCA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgIWlzTmFOKGNvbmZpZ3VyYXRpb24uc3RhY2tMZW5ndGgpICYmXG4gICAgICAgIGNvbmZpZ3VyYXRpb24uc3RhY2tMZW5ndGggPj0gMCkgY29uZmlnLnN0YWNrTGVuZ3RoID0gY29uZmlndXJhdGlvbi5zdGFja0xlbmd0aDtcbiAgICBpZiAoIWNvbmZpZ3VyYXRpb24uaGFzT3duUHJvcGVydHkoJ3Jvb3RPbmx5JykpIGNvbmZpZy5yb290T25seSA9IGNvbmZpZ3VyYXRpb24ucm9vdE9ubHk7XG5cbiAgICAvLyBjaGVjayBpZiB0aGlzIHNob3VsZCBvbmx5IGJlIHJ1biBhcyByb290XG4gICAgaWYgKCFjb25maWcucm9vdE9ubHkgfHwgdGhpcy5DdXN0b21FcnJvci5wYXJlbnQgPT09IEVycm9yKSB7XG5cbiAgICAgICAgLy8gY29weSBwcm9wZXJ0aWVzIG9udG8gdGhpcyBvYmplY3RcbiAgICAgICAgT2JqZWN0LmtleXMocHJvcGVydGllcykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgIHN3aXRjaChrZXkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdjb2RlJzpcbiAgICAgICAgICAgICAgICAgICAgY29kZSA9IHByb3BlcnRpZXMuY29kZSB8fCB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21lc3NhZ2UnOlxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlU3RyID0gcHJvcGVydGllcy5tZXNzYWdlIHx8ICcnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBfdGhpc1trZXldID0gcHJvcGVydGllc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBnZW5lcmF0ZSB0aGUgc3RhY2sgdHJhY2VcbiAgICAgICAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ID0gY29uZmlnLnN0YWNrTGVuZ3RoICsgMjtcbiAgICAgICAgc3RhY2sgPSAobmV3IEVycm9yKCkpLnN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICAgICAgc3RhY2suc3BsaWNlKDAsIDMpO1xuICAgICAgICBzdGFjay51bnNoaWZ0KCcnKTtcbiAgICAgICAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ID0gb3JpZ2luYWxTdGFja0xlbmd0aDtcbiAgICAgICAgdGhpcy5zdGFjayA9IHN0YWNrLmpvaW4oJ1xcbicpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnY29kZScsIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb2RlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjb2RlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdXBkYXRlU3RhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdtZXNzYWdlJywge1xuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2VTdHI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VTdHIgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB1cGRhdGVTdGFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG4gICAgICAgIHVwZGF0ZVN0YWNrKCk7XG5cbiAgICB9XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9jdXN0b20tZXJyb3ItaW5zdGFuY2UvYmluL2ZhY3Rvcmllcy5qcyIsImZ1bmN0aW9uIG5vcm1hbGl6ZVJlc3BvbnNlKCBwcm9taXNlLCBvcHRpb25zICkge1xuICAgIHJldHVybiBwcm9taXNlLnRoZW4oKCBkYXRhICkgPT4ge1xuICAgICAgICBpZiAoIHR5cGVvZiBvcHRpb25zLmNhbGxiYWNrID09PSAnZnVuY3Rpb24nICkge1xuICAgICAgICAgICAgb3B0aW9ucy5jYWxsYmFjayggbnVsbCwgZGF0YSApO1xuICAgICAgICB9XG4gICAgICAgIGlmICggdHlwZW9mIG9wdGlvbnMuc3VjY2VzcyA9PT0gJ2Z1bmN0aW9uJyApIHtcbiAgICAgICAgICAgIG9wdGlvbnMuc3VjY2VzcyggZGF0YSApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH0pXG4gICAgLmNhdGNoKCggZXJyb3IgKSA9PiB7XG4gICAgICAgIGlmICggdHlwZW9mIG9wdGlvbnMuY2FsbGJhY2sgPT09ICdmdW5jdGlvbicgKSB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9ucy5jYWxsYmFjayggZXJyb3IgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIHR5cGVvZiBvcHRpb25zLmVycm9yID09PSAnZnVuY3Rpb24nICkge1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMuZXJyb3IoIGVycm9yICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCBlcnJvciApO1xuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5vcm1hbGl6ZVJlc3BvbnNlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3ZhbGlkYXRlL25vcm1hbGl6ZVJlc3BvbnNlLmpzIiwiY2xhc3MgQnJpbmtiaXRFdmVudCB7XG4gICAgY29uc3RydWN0b3IoIGV2ZW50VHlwZSwgcmVzcG9uc2UgKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IGV2ZW50VHlwZTtcbiAgICAgICAgdGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCcmlua2JpdEV2ZW50O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2V2ZW50cy9pbmRleC5qcyIsImNvbnN0IGFuYWx5dGljcyA9IHJlcXVpcmUoICcuL2FuYWx5dGljcycgKTtcbmNvbnN0IGdhbWVEYXRhID0gcmVxdWlyZSggJy4vZ2FtZURhdGEnICk7XG5jb25zdCBwbGF5ZXJEYXRhID0gcmVxdWlyZSggJy4vcGxheWVyRGF0YScgKTtcbmNvbnN0IHBsYXllciA9IHJlcXVpcmUoICcuL3BsYXllcicgKTtcblxubW9kdWxlLmV4cG9ydHMgPSBbXG4gICAgcGxheWVyLFxuICAgIGFuYWx5dGljcyxcbiAgICBnYW1lRGF0YSxcbiAgICBwbGF5ZXJEYXRhLFxuXTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kZWZhdWx0cy9pbmRleC5qcyIsImNvbnN0IHY0ID0gcmVxdWlyZSggJ3V1aWQvdjQnICk7XG5jb25zdCBQbHVnaW4gPSByZXF1aXJlKCAnLi4vcGx1Z2luJyApO1xuY29uc3QgdmFsaWRhdGUgPSByZXF1aXJlKCAnLi4vdmFsaWRhdGUnICk7XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVQbGF5ZXJEYXRhKCBicmlua2JpdCwgcGxheWVyICkge1xuICAgIGNsYXNzIFBsYXllckRhdGEgZXh0ZW5kcyBQbHVnaW4ge1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKCBpbml0aWFsRGF0YSApIHtcbiAgICAgICAgICAgIHN1cGVyKCBicmlua2JpdCwge1xuICAgICAgICAgICAgICAgIGluaXRpYWxEYXRhLFxuICAgICAgICAgICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICAgICAgICAgIF9pZDogdjQoKSxcbiAgICAgICAgICAgICAgICAgICAgZGF0ZUNyZWF0ZWQ6IG5ldyBEYXRlKCkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgcGxheWVySWQ6IHBsYXllci5pZCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBsdWdpbklkOiAnYW5hbHl0aWNzJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAncGxheWVyJyxcbiAgICAgICAgICAgICAgICBwbGF5ZXIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMubWlkZGxld2FyZS5zYXZlID0gdGhpcy5zYXZlTWlkZGxld2FyZS5iaW5kKCB0aGlzICk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgdmFsaWRhdGUoIG1ldGhvZCwgZGF0YSApIHtcbiAgICAgICAgICAgIHJldHVybiB2YWxpZGF0ZSggZGF0YSwge1xuICAgICAgICAgICAgICAgIGRhdGVDcmVhdGVkOiB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgcHJlc2VuY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwbGF5ZXJJZDoge1xuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgIHByZXNlbmNlOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgIHByZXNlbmNlOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNhdmVNaWRkbGV3YXJlKCBvcHRpb25zICkge1xuICAgICAgICAgICAgY29uc3QgeyBib2R5IH0gPSBvcHRpb25zO1xuICAgICAgICAgICAgaWYgKCAhYm9keS5wbGF5ZXJJZCApIHtcbiAgICAgICAgICAgICAgICBib2R5LnBsYXllcklkID0gdGhpcy5wbGF5ZXIuaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIFBsYXllckRhdGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG5hbWU6ICdBbmFseXRpYycsXG4gICAgdHlwZTogJ3BsYXllcicsXG4gICAgaW5pdGlhbGl6ZTogaW5pdGlhbGl6ZVBsYXllckRhdGEsXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RlZmF1bHRzL2FuYWx5dGljcy5qcyIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuICBJbiB0aGVcbi8vIGJyb3dzZXIgdGhpcyBpcyBhIGxpdHRsZSBjb21wbGljYXRlZCBkdWUgdG8gdW5rbm93biBxdWFsaXR5IG9mIE1hdGgucmFuZG9tKClcbi8vIGFuZCBpbmNvbnNpc3RlbnQgc3VwcG9ydCBmb3IgdGhlIGBjcnlwdG9gIEFQSS4gIFdlIGRvIHRoZSBiZXN0IHdlIGNhbiB2aWFcbi8vIGZlYXR1cmUtZGV0ZWN0aW9uXG52YXIgcm5nO1xuXG52YXIgY3J5cHRvID0gZ2xvYmFsLmNyeXB0byB8fCBnbG9iYWwubXNDcnlwdG87IC8vIGZvciBJRSAxMVxuaWYgKGNyeXB0byAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gIC8vIFdIQVRXRyBjcnlwdG8gUk5HIC0gaHR0cDovL3dpa2kud2hhdHdnLm9yZy93aWtpL0NyeXB0b1xuICB2YXIgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiAgcm5nID0gZnVuY3Rpb24gd2hhdHdnUk5HKCkge1xuICAgIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMocm5kczgpO1xuICAgIHJldHVybiBybmRzODtcbiAgfTtcbn1cblxuaWYgKCFybmcpIHtcbiAgLy8gTWF0aC5yYW5kb20oKS1iYXNlZCAoUk5HKVxuICAvL1xuICAvLyBJZiBhbGwgZWxzZSBmYWlscywgdXNlIE1hdGgucmFuZG9tKCkuICBJdCdzIGZhc3QsIGJ1dCBpcyBvZiB1bnNwZWNpZmllZFxuICAvLyBxdWFsaXR5LlxuICB2YXIgcm5kcyA9IG5ldyBBcnJheSgxNik7XG4gIHJuZyA9IGZ1bmN0aW9uKCkge1xuICAgIGZvciAodmFyIGkgPSAwLCByOyBpIDwgMTY7IGkrKykge1xuICAgICAgaWYgKChpICYgMHgwMykgPT09IDApIHIgPSBNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDA7XG4gICAgICBybmRzW2ldID0gciA+Pj4gKChpICYgMHgwMykgPDwgMykgJiAweGZmO1xuICAgIH1cblxuICAgIHJldHVybiBybmRzO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJuZztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ybmctYnJvd3Nlci5qcyIsIi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xudmFyIGJ5dGVUb0hleCA9IFtdO1xuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXhbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xufVxuXG5mdW5jdGlvbiBieXRlc1RvVXVpZChidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IG9mZnNldCB8fCAwO1xuICB2YXIgYnRoID0gYnl0ZVRvSGV4O1xuICByZXR1cm4gYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ5dGVzVG9VdWlkO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3V1aWQvbGliL2J5dGVzVG9VdWlkLmpzIiwiY29uc3QgdjQgPSByZXF1aXJlKCAndXVpZC92NCcgKTtcbmNvbnN0IFBsdWdpbiA9IHJlcXVpcmUoICcuLi9wbHVnaW4nICk7XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVHYW1lRGF0YSggYnJpbmtiaXQgKSB7XG4gICAgY2xhc3MgR2FtZURhdGEgZXh0ZW5kcyBQbHVnaW4ge1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKCBpbml0aWFsRGF0YSApIHtcbiAgICAgICAgICAgIHN1cGVyKCBicmlua2JpdCwge1xuICAgICAgICAgICAgICAgIGluaXRpYWxEYXRhLFxuICAgICAgICAgICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICAgICAgICAgIF9pZDogdjQoKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBsdWdpbklkOiAnZ2FtZWRhdGEnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdnYW1lJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIEdhbWVEYXRhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBuYW1lOiAnRGF0YScsXG4gICAgdHlwZTogJ2dhbWUnLFxuICAgIGluaXRpYWxpemU6IGluaXRpYWxpemVHYW1lRGF0YSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZGVmYXVsdHMvZ2FtZURhdGEuanMiLCJjb25zdCB2NCA9IHJlcXVpcmUoICd1dWlkL3Y0JyApO1xuY29uc3QgUGx1Z2luID0gcmVxdWlyZSggJy4uL3BsdWdpbicgKTtcblxuZnVuY3Rpb24gaW5pdGlhbGl6ZVBsYXllckRhdGEoIGJyaW5rYml0LCBwbGF5ZXIgKSB7XG4gICAgY2xhc3MgUGxheWVyRGF0YSBleHRlbmRzIFBsdWdpbiB7XG5cbiAgICAgICAgY29uc3RydWN0b3IoIGluaXRpYWxEYXRhICkge1xuICAgICAgICAgICAgc3VwZXIoIGJyaW5rYml0LCB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbERhdGEsXG4gICAgICAgICAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgX2lkOiB2NCgpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcGx1Z2luSWQ6ICdwbGF5ZXJkYXRhJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAncGxheWVyJyxcbiAgICAgICAgICAgICAgICBwbGF5ZXIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQbGF5ZXJEYXRhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBuYW1lOiAnRGF0YScsXG4gICAgdHlwZTogJ3BsYXllcicsXG4gICAgaW5pdGlhbGl6ZTogaW5pdGlhbGl6ZVBsYXllckRhdGEsXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RlZmF1bHRzL3BsYXllckRhdGEuanMiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuXG5jb25zdCBtZXJnZSA9IHJlcXVpcmUoICdsb2Rhc2gubWVyZ2UnICk7XG5cbmNvbnN0IHZhbGlkYXRlID0gcmVxdWlyZSggJy4uL3ZhbGlkYXRlJyApO1xuY29uc3QgVmFsaWRhdGlvbkVycm9yID0gcmVxdWlyZSggJy4uL3ZhbGlkYXRlL3ZhbGlkYXRpb25FcnJvcicgKTtcbmNvbnN0IG5vcm1hbGl6ZUFyZ3VtZW50cyA9IHJlcXVpcmUoICcuLi92YWxpZGF0ZS9ub3JtYWxpemVBcmd1bWVudHMnICk7XG5jb25zdCBQbHVnaW4gPSByZXF1aXJlKCAnLi4vcGx1Z2luJyApO1xuXG5mdW5jdGlvbiBpbml0aWFsaXplKCBicmlua2JpdCApIHtcbiAgICBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBQbHVnaW4ge1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKCBpbml0aWFsRGF0YSApIHtcbiAgICAgICAgICAgIHN1cGVyKCBicmlua2JpdCwge1xuICAgICAgICAgICAgICAgIGluaXRpYWxEYXRhLFxuICAgICAgICAgICAgICAgIHJlYWQ6IFsgJ19pZCcsICdkYXRlQ3JlYXRlZCcsICdlbWFpbCcsICd1c2VybmFtZScgXSxcbiAgICAgICAgICAgICAgICB3cml0ZTogWyAnZW1haWwnLCAncGFzc3dvcmQnLCAndXNlcm5hbWUnIF0sXG4gICAgICAgICAgICAgICAgcGx1Z2luSWQ6ICdwbGF5ZXJzJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnY29yZScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICggaW5pdGlhbERhdGEgKSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGUuY29uc3RydWN0b3IoIGluaXRpYWxEYXRhLCB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1pZGRsZXdhcmUuc2F2ZSA9IHRoaXMuc2F2ZU1pZGRsZXdhcmUuYmluZCggdGhpcyApO1xuICAgICAgICAgICAgUGxheWVyLnBsdWdpbnMuZm9yRWFjaCgoIHBsdWdpbiApID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzW3BsdWdpbi5uYW1lXSA9IHBsdWdpbi5pbml0aWFsaXplKCBicmlua2JpdCwgdGhpcyApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBsb2dpbiggLi4uYXJncyApIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBub3JtYWxpemVBcmd1bWVudHMoIC4uLmFyZ3MgKTtcbiAgICAgICAgICAgIG9wdGlvbnMucGFzc3dvcmQgPSBvcHRpb25zLnVyaTtcbiAgICAgICAgICAgIG9wdGlvbnMudXJpID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnJpbmtiaXQubG9naW4oIG1lcmdlKHt9LCB0aGlzLmRhdGEsIG9wdGlvbnMgKSlcbiAgICAgICAgICAgIC50aGVuKCggdXNlciApID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRva2VuID0gdXNlci50b2tlbjtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9nb3V0KCkge1xuICAgICAgICAgICAgdGhpcy50b2tlbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmICggdGhpcy5pc1ByaW1hcnkgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5icmlua2JpdC5sb2dvdXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByb21vdGUoKSB7XG4gICAgICAgICAgICB0aGlzLmJyaW5rYml0LnByb21vdGVQbGF5ZXIoIHRoaXMgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcmdvdCggb3B0aW9ucyApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJyaW5rYml0LmZvcmdvdCggb3B0aW9ucyB8fCB0aGlzLmRhdGEgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNhdmVNaWRkbGV3YXJlKCBvcHRpb25zICkge1xuICAgICAgICAgICAgaWYgKCAhdGhpcy5pZCApIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnBhc3NUb2tlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuYm9keS5nYW1lSWQgPSBvcHRpb25zLmJvZHkuZ2FtZUlkIHx8IHRoaXMuYnJpbmtiaXQuZ2FtZUlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5ib2R5LnVzZXJuYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuYm9keS5wYXNzd29yZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFsaWRhdGUoIG1ldGhvZCwgZGF0YSApIHtcbiAgICAgICAgICAgIHN3aXRjaCAoIG1ldGhvZCApIHtcbiAgICAgICAgICAgICAgICBjYXNlICdkZWxldGUnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoIG5ldyBFcnJvciggJ0Nhbm5vdCBkZWxldGUgdXNlcicgKSk7XG4gICAgICAgICAgICAgICAgY2FzZSAncG9zdCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZGF0ZSggZGF0YSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlc2VuY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlc2VuY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlc2VuY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjYXNlICdwdXQnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsaWRhdGUoIGRhdGEsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXNlbmNlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVzZW5jZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMuaWQgPT09ICdzdHJpbmcnID9cbiAgICAgICAgICAgICAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIFByb21pc2UucmVqZWN0KCBuZXcgVmFsaWRhdGlvbkVycm9yKCAnQ2Fubm90IGZldGNoIHVzZXIgd2l0aG91dCBpZCcgKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIFBsYXllci5wbHVnaW5zID0gW107XG5cbiAgICByZXR1cm4gUGxheWVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBuYW1lOiAnUGxheWVyJyxcbiAgICB0eXBlOiAnY29yZScsXG4gICAgaW5pdGlhbGl6ZSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZGVmYXVsdHMvcGxheWVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==