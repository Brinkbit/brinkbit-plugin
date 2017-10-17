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
            options.token = this.getToken(options);
            var promise = ensurePromise(this.getUrl('get')).then(function (uri) {
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
            options.token = this.getToken(options);
            options.method = options.method || (this.id ? 'put' : 'post');
            options.body = options.method === 'put' || options.method === 'post' ? this.writeable(this.data) : undefined;
            var promise = ensurePromise(this.getUrl(options.method)).then(function (uri) {
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

            options.uri = this.getUrl('delete');
            options.token = this.getToken(options);
            return ensurePromise(this.getUrl('delete')).then(function (uri) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4YWY5MzEyMDI4MjU2ZjY1NjgxMiIsIndlYnBhY2s6Ly8vLi9zcmMvcGx1Z2luLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2lzLXZhbHVlLmpzIiwid2VicGFjazovLy8uL3NyYy92YWxpZGF0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFsaWRhdGUvdmFsaWRhdGlvbkVycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL3Y0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gubWVyZ2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vYW1kLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFsaWRhdGUvbm9ybWFsaXplQXJndW1lbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoLnBpY2svaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC5nZXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC5zZXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V2ZW50LWVtaXR0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2Fzc2lnbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvYXNzaWduL2lzLWltcGxlbWVudGVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9hc3NpZ24vc2hpbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3Qva2V5cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3Qva2V5cy9pcy1pbXBsZW1lbnRlZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3Qva2V5cy9zaGltLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lczUtZXh0L2Z1bmN0aW9uL25vb3AuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L3ZhbGlkLXZhbHVlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9ub3JtYWxpemUtb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvaXMtY2FsbGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvaXMtaW1wbGVtZW50ZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvc2hpbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvdmFsaWQtY2FsbGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRlLmpzL3ZhbGlkYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jdXN0b20tZXJyb3ItaW5zdGFuY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2N1c3RvbS1lcnJvci1pbnN0YW5jZS9iaW4vZXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2N1c3RvbS1lcnJvci1pbnN0YW5jZS9iaW4vZmFjdG9yaWVzLmpzIiwid2VicGFjazovLy8uL3NyYy92YWxpZGF0ZS9ub3JtYWxpemVSZXNwb25zZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZGVmYXVsdHMvYW5hbHl0aWNzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ybmctYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXVpZC9saWIvYnl0ZXNUb1V1aWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlZmF1bHRzL2dhbWVEYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0cy9wbGF5ZXJEYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0cy9wbGF5ZXIuanMiXSwibmFtZXMiOlsibWVyZ2UiLCJyZXF1aXJlIiwicGljayIsImdldCIsInNldCIsImV2ZW50RW1pdHRlciIsInZhbGlkYXRlIiwibm9ybWFsaXplQXJndW1lbnRzIiwibm9ybWFsaXplUmVzcG9uc2UiLCJCcmlua2JpdEV2ZW50IiwiZW5zdXJlUHJvbWlzZSIsInByb21pc2lmeVZhbGlkYXRpb24iLCJQbHVnaW4iLCJicmlua2JpdCIsImNvbmZpZyIsImNvbnN0cnVjdG9yIiwidHlwZSIsImRhdGFUeXBlIiwicHJlc2VuY2UiLCJpbmNsdXNpb24iLCJwbGF5ZXIiLCJpbml0aWFsRGF0YSIsImRlZmF1bHRzIiwicmVhZCIsIndyaXRlIiwibWlkZGxld2FyZSIsInBsdWdpbklkIiwiUGxheWVyIiwicHJpbWFyeSIsImRhdGEiLCJfaWQiLCJpZCIsIkVycm9yIiwidG9rZW4iLCJQcm9taXNlIiwicmVzb2x2ZSIsIm1ldGhvZCIsImtleSIsImdldFBsYXllciIsIm9wdGlvbnMiLCJ1bmRlZmluZWQiLCJnZXRUb2tlbiIsInByb21pc2UiLCJnZXRVcmwiLCJ0aGVuIiwidXJpIiwicHJvY2Vzc01pZGRsZXdhcmUiLCJvcHRzIiwiX2dldCIsInJlc3BvbnNlIiwicmVhZGFibGUiLCJib2R5IiwiZGF0YVZhbHVlIiwiZW1pdCIsIndyaXRlYWJsZSIsIl9yZXF1ZXN0IiwiX2RlbGV0ZSIsInBhdGgiLCJhdHRyIiwidmFsdWUiLCJpbmNsdWRlcyIsImFyZ3MiLCJpbnN0YW5jZSIsInNhdmUiLCJwcm90b3R5cGUiLCJtb2R1bGUiLCJleHBvcnRzIiwiZyIsIkZ1bmN0aW9uIiwiZXZhbCIsImUiLCJ3aW5kb3ciLCJfdW5kZWZpbmVkIiwidmFsIiwidmFsaWRhdGVKcyIsIlZhbGlkYXRpb25FcnJvciIsInZhbGlkYXRvcnMiLCJ2YWxpZGF0ZURhdGFUeXBlIiwiY2FwaXRhbGl6ZSIsImluc3RhbmNlT2YiLCJ2YWxpZGF0ZUluc3RhbmNlb2YiLCJhdHRyaWJ1dGVzIiwiY29uc3RyYWludHMiLCJpbnZhbGlkIiwicmVqZWN0IiwibWVzc2FnZSIsImVycm9yIiwiZGV0YWlscyIsInZhbGlkYXRlQ29uc3RydWN0b3IiLCJUeXBlRXJyb3IiLCJjdXN0b21FcnJvciIsInJuZyIsImJ5dGVzVG9VdWlkIiwidjQiLCJidWYiLCJvZmZzZXQiLCJpIiwiQXJyYXkiLCJybmRzIiwicmFuZG9tIiwiaWkiLCJMQVJHRV9BUlJBWV9TSVpFIiwiSEFTSF9VTkRFRklORUQiLCJNQVhfU0FGRV9JTlRFR0VSIiwiYXJnc1RhZyIsImFycmF5VGFnIiwiYm9vbFRhZyIsImRhdGVUYWciLCJlcnJvclRhZyIsImZ1bmNUYWciLCJnZW5UYWciLCJtYXBUYWciLCJudW1iZXJUYWciLCJvYmplY3RUYWciLCJwcm9taXNlVGFnIiwicmVnZXhwVGFnIiwic2V0VGFnIiwic3RyaW5nVGFnIiwic3ltYm9sVGFnIiwid2Vha01hcFRhZyIsImFycmF5QnVmZmVyVGFnIiwiZGF0YVZpZXdUYWciLCJmbG9hdDMyVGFnIiwiZmxvYXQ2NFRhZyIsImludDhUYWciLCJpbnQxNlRhZyIsImludDMyVGFnIiwidWludDhUYWciLCJ1aW50OENsYW1wZWRUYWciLCJ1aW50MTZUYWciLCJ1aW50MzJUYWciLCJyZVJlZ0V4cENoYXIiLCJyZUZsYWdzIiwicmVJc0hvc3RDdG9yIiwicmVJc1VpbnQiLCJ0eXBlZEFycmF5VGFncyIsImNsb25lYWJsZVRhZ3MiLCJmcmVlR2xvYmFsIiwiZ2xvYmFsIiwiT2JqZWN0IiwiZnJlZVNlbGYiLCJzZWxmIiwicm9vdCIsImZyZWVFeHBvcnRzIiwibm9kZVR5cGUiLCJmcmVlTW9kdWxlIiwibW9kdWxlRXhwb3J0cyIsImZyZWVQcm9jZXNzIiwicHJvY2VzcyIsIm5vZGVVdGlsIiwiYmluZGluZyIsIm5vZGVJc1R5cGVkQXJyYXkiLCJpc1R5cGVkQXJyYXkiLCJhZGRNYXBFbnRyeSIsIm1hcCIsInBhaXIiLCJhZGRTZXRFbnRyeSIsImFkZCIsImFwcGx5IiwiZnVuYyIsInRoaXNBcmciLCJsZW5ndGgiLCJjYWxsIiwiYXJyYXlFYWNoIiwiYXJyYXkiLCJpdGVyYXRlZSIsImluZGV4IiwiYXJyYXlQdXNoIiwidmFsdWVzIiwiYXJyYXlSZWR1Y2UiLCJhY2N1bXVsYXRvciIsImluaXRBY2N1bSIsImJhc2VUaW1lcyIsIm4iLCJyZXN1bHQiLCJiYXNlVW5hcnkiLCJnZXRWYWx1ZSIsIm9iamVjdCIsImlzSG9zdE9iamVjdCIsInRvU3RyaW5nIiwibWFwVG9BcnJheSIsInNpemUiLCJmb3JFYWNoIiwib3ZlckFyZyIsInRyYW5zZm9ybSIsImFyZyIsInNldFRvQXJyYXkiLCJhcnJheVByb3RvIiwiZnVuY1Byb3RvIiwib2JqZWN0UHJvdG8iLCJjb3JlSnNEYXRhIiwibWFza1NyY0tleSIsInVpZCIsImV4ZWMiLCJrZXlzIiwiSUVfUFJPVE8iLCJmdW5jVG9TdHJpbmciLCJoYXNPd25Qcm9wZXJ0eSIsIm9iamVjdEN0b3JTdHJpbmciLCJvYmplY3RUb1N0cmluZyIsInJlSXNOYXRpdmUiLCJSZWdFeHAiLCJyZXBsYWNlIiwiQnVmZmVyIiwiU3ltYm9sIiwiVWludDhBcnJheSIsImdldFByb3RvdHlwZSIsImdldFByb3RvdHlwZU9mIiwib2JqZWN0Q3JlYXRlIiwiY3JlYXRlIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJzcGxpY2UiLCJuYXRpdmVHZXRTeW1ib2xzIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwibmF0aXZlSXNCdWZmZXIiLCJpc0J1ZmZlciIsIm5hdGl2ZUtleXMiLCJuYXRpdmVNYXgiLCJNYXRoIiwibWF4IiwiRGF0YVZpZXciLCJnZXROYXRpdmUiLCJNYXAiLCJTZXQiLCJXZWFrTWFwIiwibmF0aXZlQ3JlYXRlIiwiZGF0YVZpZXdDdG9yU3RyaW5nIiwidG9Tb3VyY2UiLCJtYXBDdG9yU3RyaW5nIiwicHJvbWlzZUN0b3JTdHJpbmciLCJzZXRDdG9yU3RyaW5nIiwid2Vha01hcEN0b3JTdHJpbmciLCJzeW1ib2xQcm90byIsInN5bWJvbFZhbHVlT2YiLCJ2YWx1ZU9mIiwiSGFzaCIsImVudHJpZXMiLCJjbGVhciIsImVudHJ5IiwiaGFzaENsZWFyIiwiX19kYXRhX18iLCJoYXNoRGVsZXRlIiwiaGFzIiwiaGFzaEdldCIsImhhc2hIYXMiLCJoYXNoU2V0IiwiTGlzdENhY2hlIiwibGlzdENhY2hlQ2xlYXIiLCJsaXN0Q2FjaGVEZWxldGUiLCJhc3NvY0luZGV4T2YiLCJsYXN0SW5kZXgiLCJwb3AiLCJsaXN0Q2FjaGVHZXQiLCJsaXN0Q2FjaGVIYXMiLCJsaXN0Q2FjaGVTZXQiLCJwdXNoIiwiTWFwQ2FjaGUiLCJtYXBDYWNoZUNsZWFyIiwibWFwQ2FjaGVEZWxldGUiLCJnZXRNYXBEYXRhIiwibWFwQ2FjaGVHZXQiLCJtYXBDYWNoZUhhcyIsIm1hcENhY2hlU2V0IiwiU3RhY2siLCJzdGFja0NsZWFyIiwic3RhY2tEZWxldGUiLCJzdGFja0dldCIsInN0YWNrSGFzIiwic3RhY2tTZXQiLCJjYWNoZSIsInBhaXJzIiwiYXJyYXlMaWtlS2V5cyIsImluaGVyaXRlZCIsImlzQXJyYXkiLCJpc0FyZ3VtZW50cyIsIlN0cmluZyIsInNraXBJbmRleGVzIiwiaXNJbmRleCIsImFzc2lnbk1lcmdlVmFsdWUiLCJlcSIsImFzc2lnblZhbHVlIiwib2JqVmFsdWUiLCJiYXNlQXNzaWduIiwic291cmNlIiwiY29weU9iamVjdCIsImJhc2VDbG9uZSIsImlzRGVlcCIsImlzRnVsbCIsImN1c3RvbWl6ZXIiLCJzdGFjayIsImlzT2JqZWN0IiwiaXNBcnIiLCJpbml0Q2xvbmVBcnJheSIsImNvcHlBcnJheSIsInRhZyIsImdldFRhZyIsImlzRnVuYyIsImNsb25lQnVmZmVyIiwiaW5pdENsb25lT2JqZWN0IiwiY29weVN5bWJvbHMiLCJpbml0Q2xvbmVCeVRhZyIsInN0YWNrZWQiLCJwcm9wcyIsImdldEFsbEtleXMiLCJzdWJWYWx1ZSIsImJhc2VDcmVhdGUiLCJwcm90byIsImJhc2VHZXRBbGxLZXlzIiwia2V5c0Z1bmMiLCJzeW1ib2xzRnVuYyIsImJhc2VHZXRUYWciLCJiYXNlSXNOYXRpdmUiLCJpc01hc2tlZCIsInBhdHRlcm4iLCJpc0Z1bmN0aW9uIiwidGVzdCIsImJhc2VJc1R5cGVkQXJyYXkiLCJpc09iamVjdExpa2UiLCJpc0xlbmd0aCIsImJhc2VLZXlzIiwiaXNQcm90b3R5cGUiLCJiYXNlS2V5c0luIiwibmF0aXZlS2V5c0luIiwiaXNQcm90byIsImJhc2VNZXJnZSIsInNyY0luZGV4Iiwic3JjVmFsdWUiLCJiYXNlTWVyZ2VEZWVwIiwibmV3VmFsdWUiLCJtZXJnZUZ1bmMiLCJpc0NvbW1vbiIsImlzQXJyYXlMaWtlT2JqZWN0IiwiaXNQbGFpbk9iamVjdCIsInRvUGxhaW5PYmplY3QiLCJiYXNlUmVzdCIsInN0YXJ0IiwiYXJndW1lbnRzIiwib3RoZXJBcmdzIiwiYnVmZmVyIiwic2xpY2UiLCJjb3B5IiwiY2xvbmVBcnJheUJ1ZmZlciIsImFycmF5QnVmZmVyIiwiYnl0ZUxlbmd0aCIsImNsb25lRGF0YVZpZXciLCJkYXRhVmlldyIsImJ5dGVPZmZzZXQiLCJjbG9uZU1hcCIsImNsb25lRnVuYyIsImNsb25lUmVnRXhwIiwicmVnZXhwIiwiY2xvbmVTZXQiLCJjbG9uZVN5bWJvbCIsInN5bWJvbCIsImNsb25lVHlwZWRBcnJheSIsInR5cGVkQXJyYXkiLCJnZXRTeW1ib2xzIiwiY3JlYXRlQXNzaWduZXIiLCJhc3NpZ25lciIsInNvdXJjZXMiLCJndWFyZCIsImlzSXRlcmF0ZWVDYWxsIiwiaXNLZXlhYmxlIiwic3R1YkFycmF5IiwiQXJyYXlCdWZmZXIiLCJDdG9yIiwiY3RvclN0cmluZyIsImlucHV0IiwiaXNBcnJheUxpa2UiLCJvdGhlciIsInN0dWJGYWxzZSIsImtleXNJbiIsIndlYnBhY2tQb2x5ZmlsbCIsImRlcHJlY2F0ZSIsInBhdGhzIiwiY2hpbGRyZW4iLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJsIiwiY2FsbGJhY2siLCJkZWZhdWx0UGx1Z2lucyIsIklORklOSVRZIiwiYXJyYXlNYXAiLCJzcHJlYWRhYmxlU3ltYm9sIiwiaXNDb25jYXRTcHJlYWRhYmxlIiwiYmFzZUZsYXR0ZW4iLCJkZXB0aCIsInByZWRpY2F0ZSIsImlzU3RyaWN0IiwiaXNGbGF0dGVuYWJsZSIsImJhc2VQaWNrIiwiYmFzZVBpY2tCeSIsInRvS2V5IiwiaXNTeW1ib2wiLCJGVU5DX0VSUk9SX1RFWFQiLCJyZUlzRGVlcFByb3AiLCJyZUlzUGxhaW5Qcm9wIiwicmVMZWFkaW5nRG90IiwicmVQcm9wTmFtZSIsInJlRXNjYXBlQ2hhciIsInN5bWJvbFRvU3RyaW5nIiwiYmFzZUdldCIsImlzS2V5IiwiY2FzdFBhdGgiLCJiYXNlVG9TdHJpbmciLCJzdHJpbmdUb1BhdGgiLCJtZW1vaXplIiwic3RyaW5nIiwibWF0Y2giLCJudW1iZXIiLCJxdW90ZSIsInJlc29sdmVyIiwibWVtb2l6ZWQiLCJDYWNoZSIsImRlZmF1bHRWYWx1ZSIsImJhc2VTZXQiLCJuZXN0ZWQiLCJkIiwiY2FsbGFibGUiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiZGVzY3JpcHRvciIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwib24iLCJvbmNlIiwib2ZmIiwibWV0aG9kcyIsImRlc2NyaXB0b3JzIiwiYmFzZSIsImxpc3RlbmVyIiwiX19lZV9fIiwiX19lZU9uY2VMaXN0ZW5lcl9fIiwibGlzdGVuZXJzIiwiY2FuZGlkYXRlIiwibyIsImFzc2lnbiIsIm5vcm1hbGl6ZU9wdHMiLCJpc0NhbGxhYmxlIiwiY29udGFpbnMiLCJkc2NyIiwiYyIsInciLCJkZXNjIiwiZ3MiLCJvYmoiLCJmb28iLCJiYXIiLCJ0cnp5IiwiZGVzdCIsInNyYyIsImlzVmFsdWUiLCJvcHRzMSIsInN0ciIsImluZGV4T2YiLCJzZWFyY2hTdHJpbmciLCJmbiIsImRlZmluZSIsInYiLCJleHRlbmQiLCJyZXN1bHRzIiwicnVuVmFsaWRhdGlvbnMiLCJ2YWxpZGF0b3IiLCJpc1Byb21pc2UiLCJwcm9jZXNzVmFsaWRhdGlvblJlc3VsdHMiLCJ2ZXJzaW9uIiwibWFqb3IiLCJtaW5vciIsInBhdGNoIiwibWV0YWRhdGEiLCJmb3JtYXQiLCJpc0VtcHR5IiwiRU1QVFlfU1RSSU5HX1JFR0VYUCIsInZhbGlkYXRvck5hbWUiLCJ2YWxpZGF0b3JPcHRpb25zIiwiaXNEb21FbGVtZW50IiwiaXNKcXVlcnlFbGVtZW50IiwiY29sbGVjdEZvcm1WYWx1ZXMiLCJnZXREZWVwT2JqZWN0VmFsdWUiLCJuYW1lIiwiYXR0cmlidXRlIiwiZ2xvYmFsT3B0aW9ucyIsImVycm9ycyIsInBydW5lRW1wdHlFcnJvcnMiLCJleHBhbmRNdWx0aXBsZUVycm9ycyIsImNvbnZlcnRFcnJvck1lc3NhZ2VzIiwiZm9ybWF0dGVycyIsImFzeW5jIiwiV3JhcEVycm9ycyIsIndyYXBFcnJvcnMiLCJjbGVhbkF0dHJpYnV0ZXMiLCJ3YWl0Rm9yUmVzdWx0cyIsImVyciIsInNpbmdsZSIsImZ1bGxNZXNzYWdlcyIsInJlZHVjZSIsIm1lbW8iLCJyIiwiaXNOdW1iZXIiLCJpc05hTiIsImlzSW50ZWdlciIsImlzQm9vbGVhbiIsImlzRGF0ZSIsIkRhdGUiLCJpc0RlZmluZWQiLCJwIiwiaXNTdHJpbmciLCJqcXVlcnkiLCJxdWVyeVNlbGVjdG9yQWxsIiwicXVlcnlTZWxlY3RvciIsImRvY3VtZW50IiwiSFRNTEVsZW1lbnQiLCJub2RlTmFtZSIsInZhbHMiLCJGT1JNQVRfUkVHRVhQIiwibTAiLCJtMSIsIm0yIiwicHJldHRpZnkiLCJwYXJzZUZsb2F0Iiwicm91bmQiLCJ0b0ZpeGVkIiwicyIsImpvaW4iLCJ0b0xvd2VyQ2FzZSIsInN0cmluZ2lmeVZhbHVlIiwiaXNIYXNoIiwidW5pcXVlIiwiZmlsdGVyIiwiZWwiLCJmb3JFYWNoS2V5SW5LZXlwYXRoIiwia2V5cGF0aCIsImVzY2FwZSIsImZvcm0iLCJqIiwiaW5wdXRzIiwib3B0aW9uIiwiaXRlbSIsImdldEF0dHJpYnV0ZSIsInNhbml0aXplRm9ybVZhbHVlIiwiY2hlY2tlZCIsIm11bHRpcGxlIiwic2VsZWN0ZWQiLCJzZWxlY3RlZEluZGV4IiwidHJpbSIsIm51bGxpZnkiLCJ0b1VwcGVyQ2FzZSIsInJldCIsIm1zZyIsImVycm9ySW5mbyIsImdyb3VwRXJyb3JzQnlBdHRyaWJ1dGUiLCJsaXN0IiwiZmxhdHRlbkVycm9yc1RvQXJyYXkiLCJ3aGl0ZWxpc3QiLCJ3aGl0ZWxpc3RDcmVhdG9yIiwibGFzdCIsImJ1aWxkT2JqZWN0V2hpdGVsaXN0Iiwib3ciLCJsYXN0T2JqZWN0IiwiY2xlYW5SZWN1cnNpdmUiLCJleHBvc2VNb2R1bGUiLCJhbWQiLCJ3YXJuIiwiY29uc29sZSIsImFsbG93RW1wdHkiLCJpcyIsIm1heGltdW0iLCJtaW5pbXVtIiwidG9rZW5pemVyIiwibm90VmFsaWQiLCJ3cm9uZ0xlbmd0aCIsImNvdW50IiwidG9vU2hvcnQiLCJ0b29Mb25nIiwibnVtZXJpY2FsaXR5IiwiY2hlY2tzIiwiZ3JlYXRlclRoYW4iLCJncmVhdGVyVGhhbk9yRXF1YWxUbyIsImVxdWFsVG8iLCJsZXNzVGhhbiIsImxlc3NUaGFuT3JFcXVhbFRvIiwiZGl2aXNpYmxlQnkiLCJzdHJpY3QiLCJvbmx5SW50ZWdlciIsIm5vU3RyaW5ncyIsIm5vdEludGVnZXIiLCJvZGQiLCJub3RPZGQiLCJldmVuIiwibm90RXZlbiIsImRhdGV0aW1lIiwicGFyc2UiLCJlYXJsaWVzdCIsIk5hTiIsImxhdGVzdCIsImRhdGVPbmx5IiwidG9vRWFybHkiLCJkYXRlIiwidG9vTGF0ZSIsImZsYWdzIiwid2l0aGluIiwiZXhjbHVzaW9uIiwiZW1haWwiLCJQQVRURVJOIiwiZXF1YWxpdHkiLCJvdGhlclZhbHVlIiwiY29tcGFyYXRvciIsInYxIiwidjIiLCJ1cmwiLCJzY2hlbWVzIiwiYWxsb3dMb2NhbCIsInJlZ2V4IiwidGxkIiwiZGV0YWlsZWQiLCJmbGF0IiwiZ3JvdXBlZCIsImNvbnN0cmFpbnQiLCJzb3J0IiwiQ3VzdG9tRXJyb3IiLCJmYWN0b3J5IiwiRXJyIiwib3JkZXIiLCJjb2RlIiwicGFyZW50IiwicHJvcGVydGllcyIsImNvbnN0cnVjdCIsImlzUm9vdCIsImZpbmRBcmciLCJpc1BhcmVudEFyZyIsImlzUHJvcGVydGllc0FyZyIsImlzRmFjdG9yeUFyZyIsIm5vb3AiLCJpc05hbWVBcmciLCJjb25maWd1cmF0aW9uIiwiX3RoaXMiLCJhciIsImZhY3RvcmllcyIsImNoYWluIiwicmV2ZXJzZSIsInVuc2hpZnQiLCJhbnRpRmlsdGVycyIsImFudGkiLCJmb3VuZCIsImxlbiIsImV4cGVjdFJlY2VpdmUiLCJleHBlY3RlZCIsInJlY2VpdmVkIiwic3RhY2tMZW5ndGgiLCJzdGFja1RyYWNlTGltaXQiLCJyb290T25seSIsIm1lc3NhZ2VTdHIiLCJvcmlnaW5hbFN0YWNrTGVuZ3RoIiwidXBkYXRlU3RhY2siLCJzcGxpdCIsInN1Y2Nlc3MiLCJjYXRjaCIsImV2ZW50VHlwZSIsImFuYWx5dGljcyIsImdhbWVEYXRhIiwicGxheWVyRGF0YSIsImluaXRpYWxpemVQbGF5ZXJEYXRhIiwiUGxheWVyRGF0YSIsImRhdGVDcmVhdGVkIiwicGxheWVySWQiLCJzYXZlTWlkZGxld2FyZSIsImJpbmQiLCJpbml0aWFsaXplIiwiY3J5cHRvIiwibXNDcnlwdG8iLCJnZXRSYW5kb21WYWx1ZXMiLCJybmRzOCIsIndoYXR3Z1JORyIsImJ5dGVUb0hleCIsInN1YnN0ciIsImJ0aCIsImluaXRpYWxpemVHYW1lRGF0YSIsIkdhbWVEYXRhIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsInBsdWdpbnMiLCJwbHVnaW4iLCJsb2dpbiIsImlzUHJpbWFyeSIsImxvZ291dCIsInByb21vdGVQbGF5ZXIiLCJmb3Jnb3QiLCJwYXNzVG9rZW4iLCJnYW1lSWQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REE7O0FBRUEsSUFBTUEsUUFBUSxtQkFBQUMsQ0FBUyxDQUFULENBQWQ7QUFDQSxJQUFNQyxPQUFPLG1CQUFBRCxDQUFTLEVBQVQsQ0FBYjtBQUNBLElBQU1FLE9BQU0sbUJBQUFGLENBQVMsRUFBVCxDQUFaO0FBQ0EsSUFBTUcsT0FBTSxtQkFBQUgsQ0FBUyxFQUFULENBQVo7QUFDQSxJQUFNSSxlQUFlLG1CQUFBSixDQUFTLEVBQVQsQ0FBckI7O0FBRUEsSUFBTUssV0FBVyxt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eUIsUUFBekIsR0FDSEMsUUFBUUMsT0FBUixFQURHLEdBRUhELFFBQVFrRCxNQUFSLENBQWdCLElBQUlULGVBQUosQ0FBcUIsdUJBQXJCLENBQWhCLENBRko7QUF0Q1I7QUEwQ0g7QUEvSHVCOztBQUFBO0FBQUEsTUFDUC9ELE1BRE87O0FBbUk1QmUsV0FBTzRvQixPQUFQLEdBQWlCLEVBQWpCOztBQUVBLFdBQU81b0IsTUFBUDtBQUNIOztBQUVEc0MsT0FBT0MsT0FBUCxHQUFpQjtBQUNiNFosVUFBTSxRQURPO0FBRWI5YyxVQUFNLE1BRk87QUFHYjBvQjtBQUhhLENBQWpCLEMiLCJmaWxlIjoiZGlzdC9icmlua2JpdC1wbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJicmlua2JpdC1wbHVnaW5cIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiYnJpbmtiaXQtcGx1Z2luXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA4YWY5MzEyMDI4MjU2ZjY1NjgxMiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG5cbmNvbnN0IG1lcmdlID0gcmVxdWlyZSggJ2xvZGFzaC5tZXJnZScgKTtcbmNvbnN0IHBpY2sgPSByZXF1aXJlKCAnbG9kYXNoLnBpY2snICk7XG5jb25zdCBnZXQgPSByZXF1aXJlKCAnbG9kYXNoLmdldCcgKTtcbmNvbnN0IHNldCA9IHJlcXVpcmUoICdsb2Rhc2guc2V0JyApO1xuY29uc3QgZXZlbnRFbWl0dGVyID0gcmVxdWlyZSggJ2V2ZW50LWVtaXR0ZXInICk7XG5cbmNvbnN0IHZhbGlkYXRlID0gcmVxdWlyZSggJy4vdmFsaWRhdGUnICk7XG5jb25zdCBub3JtYWxpemVBcmd1bWVudHMgPSByZXF1aXJlKCAnLi92YWxpZGF0ZS9ub3JtYWxpemVBcmd1bWVudHMnICk7XG5jb25zdCBub3JtYWxpemVSZXNwb25zZSA9IHJlcXVpcmUoICcuL3ZhbGlkYXRlL25vcm1hbGl6ZVJlc3BvbnNlJyApO1xuY29uc3QgQnJpbmtiaXRFdmVudCA9IHJlcXVpcmUoICcuL2V2ZW50cycgKTtcbmNvbnN0IHsgZW5zdXJlUHJvbWlzZSwgcHJvbWlzaWZ5VmFsaWRhdGlvbiB9ID0gcmVxdWlyZSggJy4vdXRpbCcgKTtcblxuY2xhc3MgUGx1Z2luIHtcblxuICAgIGNvbnN0cnVjdG9yKCBicmlua2JpdCwgY29uZmlnICkge1xuICAgICAgICB2YWxpZGF0ZS5jb25zdHJ1Y3RvciggY29uZmlnLCB7XG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgIHByZXNlbmNlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGluY2x1c2lvbjogW1xuICAgICAgICAgICAgICAgICAgICAncGxheWVyJyxcbiAgICAgICAgICAgICAgICAgICAgJ2dhbWUnLFxuICAgICAgICAgICAgICAgICAgICAnY29yZScsXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwbGF5ZXI6IHtcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5pdGlhbERhdGE6IHtcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVhZDoge1xuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnYXJyYXknLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHdyaXRlOiB7XG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdhcnJheScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWlkZGxld2FyZToge1xuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwbHVnaW5JZDoge1xuICAgICAgICAgICAgICAgIHByZXNlbmNlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBpbml0aWFsRGF0YSA9IHt9LFxuICAgICAgICAgICAgZGVmYXVsdHMgPSB7fSxcbiAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICByZWFkLFxuICAgICAgICAgICAgd3JpdGUsXG4gICAgICAgICAgICBtaWRkbGV3YXJlID0ge30sXG4gICAgICAgICAgICBwbHVnaW5JZCxcbiAgICAgICAgfSA9IGNvbmZpZztcbiAgICAgICAgY29uc3QgcGxheWVyID0gY29uZmlnLnBsYXllciB8fCBicmlua2JpdC5QbGF5ZXIucHJpbWFyeTtcbiAgICAgICAgdGhpcy5wbHVnaW5JZCA9IHBsdWdpbklkO1xuICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcbiAgICAgICAgdGhpcy5icmlua2JpdCA9IGJyaW5rYml0O1xuICAgICAgICB0aGlzLnJlYWQgPSByZWFkO1xuICAgICAgICB0aGlzLndyaXRlID0gd3JpdGU7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMubWlkZGxld2FyZSA9IG1pZGRsZXdhcmU7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBtZXJnZSh7fSwgZGVmYXVsdHMsIGluaXRpYWxEYXRhICk7XG4gICAgICAgIHZhbGlkYXRlLmNvbnN0cnVjdG9yKCBkYXRhLCB7XG4gICAgICAgICAgICBfaWQ6IHtcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgaWYgKCB0eXBlID09PSAnY29yZScgJiYgZGF0YS5faWQgKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gaW5pdGlhbERhdGEuX2lkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UGxheWVyKCkge1xuICAgICAgICBpZiAoICF0aGlzLnBsYXllciAmJiAhdGhpcy5icmlua2JpdC5QbGF5ZXIucHJpbWFyeSApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvciggJ05vIHBsYXllciBsb2dnZWQgaW4nICk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGxheWVyID0gdGhpcy5wbGF5ZXIgfHwgdGhpcy5icmlua2JpdC5QbGF5ZXIucHJpbWFyeTtcbiAgICAgICAgaWYgKCAhcGxheWVyLnRva2VuIHx8ICFwbGF5ZXIuaWQgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoICdObyBwbGF5ZXIgbG9nZ2VkIGluJyApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwbGF5ZXI7XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2xhc3MtbWV0aG9kcy11c2UtdGhpc1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgZ2V0VXJsKCBtZXRob2QgKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IHRoaXMuaWQgfHwgdGhpcy5kYXRhLl9pZDtcbiAgICAgICAgaWYgKCB0aGlzLnR5cGUgPT09ICdjb3JlJyApIHtcbiAgICAgICAgICAgIHN3aXRjaCAoIG1ldGhvZCApIHtcbiAgICAgICAgICAgICAgICBjYXNlICdwb3N0JzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAuLyR7dGhpcy5wbHVnaW5JZH0vYDtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYC4vJHt0aGlzLnBsdWdpbklkfS8ke2tleX0vYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIHRoaXMudHlwZSA9PT0gJ3BsYXllcicgKSB7XG4gICAgICAgICAgICByZXR1cm4gYC4vZGF0YS8ke3RoaXMucGx1Z2luSWR9L3BsYXllcnMvJHt0aGlzLmdldFBsYXllcigpLmlkfS9rZXlzLyR7a2V5fWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGAuL2RhdGEvJHt0aGlzLnBsdWdpbklkfS9rZXlzLyR7a2V5fWA7XG4gICAgfVxuXG4gICAgZ2V0VG9rZW4oIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy50b2tlbiB8fCB0aGlzLnRva2VuIHx8ICggdGhpcy50eXBlICE9PSAnY29yZScgPyB0aGlzLmdldFBsYXllcigpLnRva2VuIDogdW5kZWZpbmVkICk7XG4gICAgfVxuXG4gICAgZmV0Y2goIC4uLmFyZ3MgKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBub3JtYWxpemVBcmd1bWVudHMoIC4uLmFyZ3MgKTtcbiAgICAgICAgb3B0aW9ucy50b2tlbiA9IHRoaXMuZ2V0VG9rZW4oIG9wdGlvbnMgKTtcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IGVuc3VyZVByb21pc2UoIHRoaXMuZ2V0VXJsKCAnZ2V0JyApKVxuICAgICAgICAudGhlbigoIHVyaSApID0+IHtcbiAgICAgICAgICAgIG9wdGlvbnMudXJpID0gb3B0aW9ucy51cmkgfHwgdXJpO1xuICAgICAgICAgICAgcmV0dXJuIGVuc3VyZVByb21pc2UoIHRoaXMucHJvY2Vzc01pZGRsZXdhcmUoICdmZXRjaCcsIG9wdGlvbnMgKSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCBvcHRzID0+XG4gICAgICAgICAgICBwcm9taXNpZnlWYWxpZGF0aW9uKCB0aGlzLnZhbGlkYXRlKCAnZ2V0Jywgb3B0cyApKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5icmlua2JpdC5fZ2V0KCBvcHRzIClcbiAgICAgICAgKSlcbiAgICAgICAgLnRoZW4oKCByZXNwb25zZSApID0+IHtcbiAgICAgICAgICAgIG1lcmdlKFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSxcbiAgICAgICAgICAgICAgICB0aGlzLnJlYWRhYmxlKCB0aGlzLnR5cGUgPT09ICdjb3JlJyA/IHJlc3BvbnNlLmJvZHkgOiByZXNwb25zZS5ib2R5LmRhdGFWYWx1ZSApXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKCB0aGlzLmRhdGEuX2lkICkge1xuICAgICAgICAgICAgICAgIHRoaXMuaWQgPSB0aGlzLmRhdGEuX2lkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5lbWl0KCAnZmV0Y2gnLCBuZXcgQnJpbmtiaXRFdmVudCggJ2ZldGNoJywgcmVzcG9uc2UgKSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbm9ybWFsaXplUmVzcG9uc2UoIHByb21pc2UsIG9wdGlvbnMgKTtcbiAgICB9XG5cbiAgICBzYXZlKCAuLi5hcmdzICkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gbm9ybWFsaXplQXJndW1lbnRzKCAuLi5hcmdzICk7XG4gICAgICAgIGlmICggb3B0aW9ucy5ib2R5ICkge1xuICAgICAgICAgICAgdGhpcy5zZXQoIG9wdGlvbnMuYm9keSApO1xuICAgICAgICB9XG4gICAgICAgIG9wdGlvbnMudG9rZW4gPSB0aGlzLmdldFRva2VuKCBvcHRpb25zICk7XG4gICAgICAgIG9wdGlvbnMubWV0aG9kID0gb3B0aW9ucy5tZXRob2QgfHwgKCB0aGlzLmlkID8gJ3B1dCcgOiAncG9zdCcgKTtcbiAgICAgICAgb3B0aW9ucy5ib2R5ID0gb3B0aW9ucy5tZXRob2QgPT09ICdwdXQnIHx8IG9wdGlvbnMubWV0aG9kID09PSAncG9zdCcgPyB0aGlzLndyaXRlYWJsZSggdGhpcy5kYXRhICkgOiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IHByb21pc2UgPSBlbnN1cmVQcm9taXNlKCB0aGlzLmdldFVybCggb3B0aW9ucy5tZXRob2QgKSlcbiAgICAgICAgLnRoZW4oKCB1cmkgKSA9PiB7XG4gICAgICAgICAgICBvcHRpb25zLnVyaSA9IG9wdGlvbnMudXJpIHx8IHVyaTtcbiAgICAgICAgICAgIHJldHVybiBlbnN1cmVQcm9taXNlKCB0aGlzLnByb2Nlc3NNaWRkbGV3YXJlKCAnc2F2ZScsIG9wdGlvbnMgKSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCBvcHRzID0+XG4gICAgICAgICAgICBwcm9taXNpZnlWYWxpZGF0aW9uKCB0aGlzLnZhbGlkYXRlKCBvcHRpb25zLm1ldGhvZCwgb3B0cyApKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5icmlua2JpdC5fcmVxdWVzdCggb3B0cyApKVxuICAgICAgICApXG4gICAgICAgIC50aGVuKCggcmVzcG9uc2UgKSA9PiB7XG4gICAgICAgICAgICBtZXJnZShcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEsXG4gICAgICAgICAgICAgICAgdGhpcy5yZWFkYWJsZSggdGhpcy50eXBlID09PSAnY29yZScgPyByZXNwb25zZS5ib2R5IDogcmVzcG9uc2UuYm9keS5kYXRhVmFsdWUgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmICggdGhpcy5kYXRhLl9pZCApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlkID0gdGhpcy5kYXRhLl9pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZW1pdCggJ3NhdmUnLCBuZXcgQnJpbmtiaXRFdmVudCggJ3NhdmUnLCByZXNwb25zZSApKTtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBub3JtYWxpemVSZXNwb25zZSggcHJvbWlzZSwgb3B0aW9ucyApO1xuICAgIH1cblxuICAgIGRlc3Ryb3koIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBvcHRpb25zLnVyaSA9IHRoaXMuZ2V0VXJsKCAnZGVsZXRlJyApO1xuICAgICAgICBvcHRpb25zLnRva2VuID0gdGhpcy5nZXRUb2tlbiggb3B0aW9ucyApO1xuICAgICAgICByZXR1cm4gZW5zdXJlUHJvbWlzZSggdGhpcy5nZXRVcmwoICdkZWxldGUnICkpXG4gICAgICAgIC50aGVuKCggdXJpICkgPT4ge1xuICAgICAgICAgICAgb3B0aW9ucy51cmkgPSBvcHRpb25zLnVyaSB8fCB1cmk7XG4gICAgICAgICAgICByZXR1cm4gZW5zdXJlUHJvbWlzZSggdGhpcy5wcm9jZXNzTWlkZGxld2FyZSggJ2Rlc3Ryb3knLCBvcHRpb25zICkpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbiggb3B0cyA9PlxuICAgICAgICAgICAgcHJvbWlzaWZ5VmFsaWRhdGlvbiggdGhpcy52YWxpZGF0ZSggJ2RlbGV0ZScsIG9wdHMgKSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYnJpbmtiaXQuX2RlbGV0ZSggb3B0cyApKVxuICAgICAgICApXG4gICAgICAgIC50aGVuKCggcmVzcG9uc2UgKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5kYXRhLmlkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQoIHBhdGggKSB7XG4gICAgICAgIGlmICggdHlwZW9mIHBhdGggIT09ICdvYmplY3QnICYmIHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJyApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvciggYCR7dHlwZW9mIHBhdGh9IGlzIG5vdCBhIHZhbGlkIHR5cGUgZm9yIHBhdGhgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHR5cGVvZiBhdHRyID09PSAnc3RyaW5nJyA/IGdldCggdGhpcy5kYXRhLCBwYXRoICkgOiBwaWNrKCB0aGlzLmRhdGEsIHBhdGggKTtcbiAgICB9XG5cbiAgICBzZXQoIHBhdGgsIHZhbHVlICkge1xuICAgICAgICBpZiAoIHR5cGVvZiBwYXRoID09PSAnb2JqZWN0JyApIHtcbiAgICAgICAgICAgIG1lcmdlKCB0aGlzLmRhdGEsIHRoaXMud3JpdGVhYmxlKCBwYXRoICkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCB0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycgKSB7XG4gICAgICAgICAgICBpZiAoIHRoaXMud3JpdGUgJiYgIXRoaXMud3JpdGUuaW5jbHVkZXMoIHBhdGggKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvciggYFBhdGggJHtwYXRofSBpcyBub3Qgd3JpdGVhYmxlIWAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldCggdGhpcy5kYXRhLCBwYXRoLCB2YWx1ZSApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCBgJHt0eXBlb2YgcGF0aH0gaXMgbm90IGEgdmFsaWQgdHlwZSBmb3IgcGF0aGAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdyaXRlYWJsZSggZGF0YSApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud3JpdGUgPyBwaWNrKCBkYXRhLCB0aGlzLndyaXRlICkgOiBkYXRhO1xuICAgIH1cblxuICAgIHJlYWRhYmxlKCBkYXRhICkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkID8gcGljayggZGF0YSwgdGhpcy5yZWFkICkgOiBkYXRhO1xuICAgIH1cblxuICAgIHByb2Nlc3NNaWRkbGV3YXJlKCBtZXRob2QsIG9wdHMgKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5taWRkbGV3YXJlID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAgICAgdHlwZW9mIHRoaXMubWlkZGxld2FyZVttZXRob2RdID09PSAnZnVuY3Rpb24nID8gdGhpcy5taWRkbGV3YXJlW21ldGhvZF0oIG9wdHMgKSA6IG9wdHM7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZSggLi4uYXJncyApIHtcbiAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgdGhpcyggLi4uYXJncyApO1xuICAgICAgICByZXR1cm4gaW5zdGFuY2Uuc2F2ZSgpXG4gICAgICAgIC50aGVuKCgpID0+IGluc3RhbmNlICk7XG4gICAgfVxuXG59XG5cbmV2ZW50RW1pdHRlciggUGx1Z2luLnByb3RvdHlwZSApO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBsdWdpbjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wbHVnaW4uanMiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfdW5kZWZpbmVkID0gcmVxdWlyZShcIi4uL2Z1bmN0aW9uL25vb3BcIikoKTsgLy8gU3VwcG9ydCBFUzMgZW5naW5lc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWwpIHtcbiByZXR1cm4gKHZhbCAhPT0gX3VuZGVmaW5lZCkgJiYgKHZhbCAhPT0gbnVsbCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2lzLXZhbHVlLmpzIiwiY29uc3QgdmFsaWRhdGVKcyA9IHJlcXVpcmUoICd2YWxpZGF0ZS5qcycgKTtcbmNvbnN0IFZhbGlkYXRpb25FcnJvciA9IHJlcXVpcmUoICcuL3ZhbGlkYXRpb25FcnJvcicgKTtcblxudmFsaWRhdGVKcy52YWxpZGF0b3JzLmRhdGFUeXBlID0gZnVuY3Rpb24gdmFsaWRhdGVEYXRhVHlwZSggdmFsdWUsIG9wdGlvbnMgKSB7XG4gICAgcmV0dXJuICggdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWxpZGF0ZUpzW2BpcyR7dmFsaWRhdGVKcy5jYXBpdGFsaXplKCBvcHRpb25zICl9YF0oIHZhbHVlICkpID8gbnVsbCA6IGBpcyBub3Qgb2YgdHlwZSAke29wdGlvbnN9YDtcbn07XG5cbnZhbGlkYXRlSnMudmFsaWRhdG9ycy5pbnN0YW5jZU9mID0gZnVuY3Rpb24gdmFsaWRhdGVJbnN0YW5jZW9mKCB2YWx1ZSwgb3B0aW9ucyApIHtcbiAgICByZXR1cm4gKCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlIGluc3RhbmNlb2Ygb3B0aW9ucyApO1xufTtcblxuY29uc3QgdmFsaWRhdGUgPSBmdW5jdGlvbiB2YWxpZGF0ZSggYXR0cmlidXRlcywgY29uc3RyYWludHMgKSB7XG4gICAgY29uc3QgaW52YWxpZCA9IHZhbGlkYXRlSnMoIGF0dHJpYnV0ZXMsIGNvbnN0cmFpbnRzICk7XG4gICAgaWYgKCBpbnZhbGlkICkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoIG5ldyBWYWxpZGF0aW9uRXJyb3Ioe1xuICAgICAgICAgICAgbWVzc2FnZTogaW52YWxpZC5lcnJvcixcbiAgICAgICAgICAgIGRldGFpbHM6IGludmFsaWQsXG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xufTtcblxudmFsaWRhdGUuY29uc3RydWN0b3IgPSBmdW5jdGlvbiB2YWxpZGF0ZUNvbnN0cnVjdG9yKCBjb25maWcsIGNvbnN0cmFpbnRzICkge1xuICAgIGlmICggdHlwZW9mIGNvbmZpZyAhPT0gJ29iamVjdCcgKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoICdjb25maWcgbXVzdCBiZSBhbiBvYmplY3QnICk7XG4gICAgfVxuICAgIGNvbnN0IGludmFsaWQgPSB2YWxpZGF0ZUpzKCBjb25maWcsIGNvbnN0cmFpbnRzICk7XG4gICAgaWYgKCBpbnZhbGlkICkge1xuICAgICAgICB0aHJvdyBuZXcgVmFsaWRhdGlvbkVycm9yKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IGludmFsaWQuZXJyb3IsXG4gICAgICAgICAgICBkZXRhaWxzOiBpbnZhbGlkLFxuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHZhbGlkYXRlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3ZhbGlkYXRlL2luZGV4LmpzIiwiY29uc3QgY3VzdG9tRXJyb3IgPSByZXF1aXJlKCAnY3VzdG9tLWVycm9yLWluc3RhbmNlJyApO1xuXG5jb25zdCBWYWxpZGF0aW9uRXJyb3IgPSBjdXN0b21FcnJvciggJ1ZhbGlkYXRpb25FcnJvcicsIHtcbiAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbiBmYWlsZWQnLFxuICAgIGRldGFpbHM6IFtdLFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVmFsaWRhdGlvbkVycm9yO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3ZhbGlkYXRlL3ZhbGlkYXRpb25FcnJvci5qcyIsInZhciBybmcgPSByZXF1aXJlKCcuL2xpYi9ybmcnKTtcbnZhciBieXRlc1RvVXVpZCA9IHJlcXVpcmUoJy4vbGliL2J5dGVzVG9VdWlkJyk7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuXG4gIGlmICh0eXBlb2Yob3B0aW9ucykgPT0gJ3N0cmluZycpIHtcbiAgICBidWYgPSBvcHRpb25zID09ICdiaW5hcnknID8gbmV3IEFycmF5KDE2KSA6IG51bGw7XG4gICAgb3B0aW9ucyA9IG51bGw7XG4gIH1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpO1xuXG4gIC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcbiAgcm5kc1s2XSA9IChybmRzWzZdICYgMHgwZikgfCAweDQwO1xuICBybmRzWzhdID0gKHJuZHNbOF0gJiAweDNmKSB8IDB4ODA7XG5cbiAgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG4gIGlmIChidWYpIHtcbiAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgMTY7ICsraWkpIHtcbiAgICAgIGJ1ZltpICsgaWldID0gcm5kc1tpaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1ZiB8fCBieXRlc1RvVXVpZChybmRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2NDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy91dWlkL3Y0LmpzIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBzaXplIHRvIGVuYWJsZSBsYXJnZSBhcnJheSBvcHRpbWl6YXRpb25zLiAqL1xudmFyIExBUkdFX0FSUkFZX1NJWkUgPSAyMDA7XG5cbi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICBwcm9taXNlVGFnID0gJ1tvYmplY3QgUHJvbWlzZV0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBgUmVnRXhwYCBmbGFncyBmcm9tIHRoZWlyIGNvZXJjZWQgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUZsYWdzID0gL1xcdyokLztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIG9mIHR5cGVkIGFycmF5cy4gKi9cbnZhciB0eXBlZEFycmF5VGFncyA9IHt9O1xudHlwZWRBcnJheVRhZ3NbZmxvYXQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1tmbG9hdDY0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQ4VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2ludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50OFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG50eXBlZEFycmF5VGFnc1thcmdzVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2FycmF5VGFnXSA9XG50eXBlZEFycmF5VGFnc1thcnJheUJ1ZmZlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tib29sVGFnXSA9XG50eXBlZEFycmF5VGFnc1tkYXRhVmlld1RhZ10gPSB0eXBlZEFycmF5VGFnc1tkYXRlVGFnXSA9XG50eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPSB0eXBlZEFycmF5VGFnc1tmdW5jVGFnXSA9XG50eXBlZEFycmF5VGFnc1ttYXBUYWddID0gdHlwZWRBcnJheVRhZ3NbbnVtYmVyVGFnXSA9XG50eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID0gdHlwZWRBcnJheVRhZ3NbcmVnZXhwVGFnXSA9XG50eXBlZEFycmF5VGFnc1tzZXRUYWddID0gdHlwZWRBcnJheVRhZ3Nbc3RyaW5nVGFnXSA9XG50eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBzdXBwb3J0ZWQgYnkgYF8uY2xvbmVgLiAqL1xudmFyIGNsb25lYWJsZVRhZ3MgPSB7fTtcbmNsb25lYWJsZVRhZ3NbYXJnc1RhZ10gPSBjbG9uZWFibGVUYWdzW2FycmF5VGFnXSA9XG5jbG9uZWFibGVUYWdzW2FycmF5QnVmZmVyVGFnXSA9IGNsb25lYWJsZVRhZ3NbZGF0YVZpZXdUYWddID1cbmNsb25lYWJsZVRhZ3NbYm9vbFRhZ10gPSBjbG9uZWFibGVUYWdzW2RhdGVUYWddID1cbmNsb25lYWJsZVRhZ3NbZmxvYXQzMlRhZ10gPSBjbG9uZWFibGVUYWdzW2Zsb2F0NjRUYWddID1cbmNsb25lYWJsZVRhZ3NbaW50OFRhZ10gPSBjbG9uZWFibGVUYWdzW2ludDE2VGFnXSA9XG5jbG9uZWFibGVUYWdzW2ludDMyVGFnXSA9IGNsb25lYWJsZVRhZ3NbbWFwVGFnXSA9XG5jbG9uZWFibGVUYWdzW251bWJlclRhZ10gPSBjbG9uZWFibGVUYWdzW29iamVjdFRhZ10gPVxuY2xvbmVhYmxlVGFnc1tyZWdleHBUYWddID0gY2xvbmVhYmxlVGFnc1tzZXRUYWddID1cbmNsb25lYWJsZVRhZ3Nbc3RyaW5nVGFnXSA9IGNsb25lYWJsZVRhZ3Nbc3ltYm9sVGFnXSA9XG5jbG9uZWFibGVUYWdzW3VpbnQ4VGFnXSA9IGNsb25lYWJsZVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9XG5jbG9uZWFibGVUYWdzW3VpbnQxNlRhZ10gPSBjbG9uZWFibGVUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xuY2xvbmVhYmxlVGFnc1tlcnJvclRhZ10gPSBjbG9uZWFibGVUYWdzW2Z1bmNUYWddID1cbmNsb25lYWJsZVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgcHJvY2Vzc2AgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVQcm9jZXNzID0gbW9kdWxlRXhwb3J0cyAmJiBmcmVlR2xvYmFsLnByb2Nlc3M7XG5cbi8qKiBVc2VkIHRvIGFjY2VzcyBmYXN0ZXIgTm9kZS5qcyBoZWxwZXJzLiAqL1xudmFyIG5vZGVVdGlsID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIHJldHVybiBmcmVlUHJvY2VzcyAmJiBmcmVlUHJvY2Vzcy5iaW5kaW5nKCd1dGlsJyk7XG4gIH0gY2F0Y2ggKGUpIHt9XG59KCkpO1xuXG4vKiBOb2RlLmpzIGhlbHBlciByZWZlcmVuY2VzLiAqL1xudmFyIG5vZGVJc1R5cGVkQXJyYXkgPSBub2RlVXRpbCAmJiBub2RlVXRpbC5pc1R5cGVkQXJyYXk7XG5cbi8qKlxuICogQWRkcyB0aGUga2V5LXZhbHVlIGBwYWlyYCB0byBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHBhaXIgVGhlIGtleS12YWx1ZSBwYWlyIHRvIGFkZC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG1hcGAuXG4gKi9cbmZ1bmN0aW9uIGFkZE1hcEVudHJ5KG1hcCwgcGFpcikge1xuICAvLyBEb24ndCByZXR1cm4gYG1hcC5zZXRgIGJlY2F1c2UgaXQncyBub3QgY2hhaW5hYmxlIGluIElFIDExLlxuICBtYXAuc2V0KHBhaXJbMF0sIHBhaXJbMV0pO1xuICByZXR1cm4gbWFwO1xufVxuXG4vKipcbiAqIEFkZHMgYHZhbHVlYCB0byBgc2V0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFkZC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYHNldGAuXG4gKi9cbmZ1bmN0aW9uIGFkZFNldEVudHJ5KHNldCwgdmFsdWUpIHtcbiAgLy8gRG9uJ3QgcmV0dXJuIGBzZXQuYWRkYCBiZWNhdXNlIGl0J3Mgbm90IGNoYWluYWJsZSBpbiBJRSAxMS5cbiAgc2V0LmFkZCh2YWx1ZSk7XG4gIHJldHVybiBzZXQ7XG59XG5cbi8qKlxuICogQSBmYXN0ZXIgYWx0ZXJuYXRpdmUgdG8gYEZ1bmN0aW9uI2FwcGx5YCwgdGhpcyBmdW5jdGlvbiBpbnZva2VzIGBmdW5jYFxuICogd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgYHRoaXNBcmdgIGFuZCB0aGUgYXJndW1lbnRzIG9mIGBhcmdzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaW52b2tlLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzIFRoZSBhcmd1bWVudHMgdG8gaW52b2tlIGBmdW5jYCB3aXRoLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuXG4gKi9cbmZ1bmN0aW9uIGFwcGx5KGZ1bmMsIHRoaXNBcmcsIGFyZ3MpIHtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnKTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgfVxuICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uZm9yRWFjaGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5RWFjaChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpID09PSBmYWxzZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBBcHBlbmRzIHRoZSBlbGVtZW50cyBvZiBgdmFsdWVzYCB0byBgYXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFRoZSB2YWx1ZXMgdG8gYXBwZW5kLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5UHVzaChhcnJheSwgdmFsdWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gdmFsdWVzLmxlbmd0aCxcbiAgICAgIG9mZnNldCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W29mZnNldCArIGluZGV4XSA9IHZhbHVlc1tpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5yZWR1Y2VgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2FjY3VtdWxhdG9yXSBUaGUgaW5pdGlhbCB2YWx1ZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2luaXRBY2N1bV0gU3BlY2lmeSB1c2luZyB0aGUgZmlyc3QgZWxlbWVudCBvZiBgYXJyYXlgIGFzXG4gKiAgdGhlIGluaXRpYWwgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgYWNjdW11bGF0ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGFycmF5UmVkdWNlKGFycmF5LCBpdGVyYXRlZSwgYWNjdW11bGF0b3IsIGluaXRBY2N1bSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcblxuICBpZiAoaW5pdEFjY3VtICYmIGxlbmd0aCkge1xuICAgIGFjY3VtdWxhdG9yID0gYXJyYXlbKytpbmRleF07XG4gIH1cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhY2N1bXVsYXRvciA9IGl0ZXJhdGVlKGFjY3VtdWxhdG9yLCBhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSk7XG4gIH1cbiAgcmV0dXJuIGFjY3VtdWxhdG9yO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAqIG9yIG1heCBhcnJheSBsZW5ndGggY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGludm9rZSBgaXRlcmF0ZWVgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuYXJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIHN0b3JpbmcgbWV0YWRhdGEuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNhcCBhcmd1bWVudHMgZm9yLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY2FwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlVW5hcnkoZnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZnVuYyh2YWx1ZSk7XG4gIH07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGdldFZhbHVlKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QgaW4gSUUgPCA5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNIb3N0T2JqZWN0KHZhbHVlKSB7XG4gIC8vIE1hbnkgaG9zdCBvYmplY3RzIGFyZSBgT2JqZWN0YCBvYmplY3RzIHRoYXQgY2FuIGNvZXJjZSB0byBzdHJpbmdzXG4gIC8vIGRlc3BpdGUgaGF2aW5nIGltcHJvcGVybHkgZGVmaW5lZCBgdG9TdHJpbmdgIG1ldGhvZHMuXG4gIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgaWYgKHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlLnRvU3RyaW5nICE9ICdmdW5jdGlvbicpIHtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gISEodmFsdWUgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBtYXBgIHRvIGl0cyBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBrZXktdmFsdWUgcGFpcnMuXG4gKi9cbmZ1bmN0aW9uIG1hcFRvQXJyYXkobWFwKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobWFwLnNpemUpO1xuXG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSBba2V5LCB2YWx1ZV07XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB1bmFyeSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBmdW5jKHRyYW5zZm9ybShhcmcpKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgc2V0YCB0byBhbiBhcnJheSBvZiBpdHMgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBzZXRUb0FycmF5KHNldCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KHNldC5zaXplKTtcblxuICBzZXQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsXG4gICAgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbnZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdWlkID0gL1teLl0rJC8uZXhlYyhjb3JlSnNEYXRhICYmIGNvcmVKc0RhdGEua2V5cyAmJiBjb3JlSnNEYXRhLmtleXMuSUVfUFJPVE8gfHwgJycpO1xuICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG59KCkpO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBpbmZlciB0aGUgYE9iamVjdGAgY29uc3RydWN0b3IuICovXG52YXIgb2JqZWN0Q3RvclN0cmluZyA9IGZ1bmNUb1N0cmluZy5jYWxsKE9iamVjdCk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBCdWZmZXIgPSBtb2R1bGVFeHBvcnRzID8gcm9vdC5CdWZmZXIgOiB1bmRlZmluZWQsXG4gICAgU3ltYm9sID0gcm9vdC5TeW1ib2wsXG4gICAgVWludDhBcnJheSA9IHJvb3QuVWludDhBcnJheSxcbiAgICBnZXRQcm90b3R5cGUgPSBvdmVyQXJnKE9iamVjdC5nZXRQcm90b3R5cGVPZiwgT2JqZWN0KSxcbiAgICBvYmplY3RDcmVhdGUgPSBPYmplY3QuY3JlYXRlLFxuICAgIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGUsXG4gICAgc3BsaWNlID0gYXJyYXlQcm90by5zcGxpY2U7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVHZXRTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyxcbiAgICBuYXRpdmVJc0J1ZmZlciA9IEJ1ZmZlciA/IEJ1ZmZlci5pc0J1ZmZlciA6IHVuZGVmaW5lZCxcbiAgICBuYXRpdmVLZXlzID0gb3ZlckFyZyhPYmplY3Qua2V5cywgT2JqZWN0KSxcbiAgICBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIERhdGFWaWV3ID0gZ2V0TmF0aXZlKHJvb3QsICdEYXRhVmlldycpLFxuICAgIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyksXG4gICAgUHJvbWlzZSA9IGdldE5hdGl2ZShyb290LCAnUHJvbWlzZScpLFxuICAgIFNldCA9IGdldE5hdGl2ZShyb290LCAnU2V0JyksXG4gICAgV2Vha01hcCA9IGdldE5hdGl2ZShyb290LCAnV2Vha01hcCcpLFxuICAgIG5hdGl2ZUNyZWF0ZSA9IGdldE5hdGl2ZShPYmplY3QsICdjcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1hcHMsIHNldHMsIGFuZCB3ZWFrbWFwcy4gKi9cbnZhciBkYXRhVmlld0N0b3JTdHJpbmcgPSB0b1NvdXJjZShEYXRhVmlldyksXG4gICAgbWFwQ3RvclN0cmluZyA9IHRvU291cmNlKE1hcCksXG4gICAgcHJvbWlzZUN0b3JTdHJpbmcgPSB0b1NvdXJjZShQcm9taXNlKSxcbiAgICBzZXRDdG9yU3RyaW5nID0gdG9Tb3VyY2UoU2V0KSxcbiAgICB3ZWFrTWFwQ3RvclN0cmluZyA9IHRvU291cmNlKFdlYWtNYXApO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVmFsdWVPZiA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udmFsdWVPZiA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgaGFzaCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIEhhc2goZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIEhhc2hcbiAqL1xuZnVuY3Rpb24gaGFzaENsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmF0aXZlQ3JlYXRlID8gbmF0aXZlQ3JlYXRlKG51bGwpIDoge307XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoRGVsZXRlKGtleSkge1xuICByZXR1cm4gdGhpcy5oYXMoa2V5KSAmJiBkZWxldGUgdGhpcy5fX2RhdGFfX1trZXldO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGhhc2ggdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gaGFzaEdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAobmF0aXZlQ3JlYXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRhdGFba2V5XTtcbiAgICByZXR1cm4gcmVzdWx0ID09PSBIQVNIX1VOREVGSU5FRCA/IHVuZGVmaW5lZCA6IHJlc3VsdDtcbiAgfVxuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpID8gZGF0YVtrZXldIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGhhc2ggdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hIYXMoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgcmV0dXJuIG5hdGl2ZUNyZWF0ZSA/IGRhdGFba2V5XSAhPT0gdW5kZWZpbmVkIDogaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBoYXNoIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQgOiB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBIYXNoYC5cbkhhc2gucHJvdG90eXBlLmNsZWFyID0gaGFzaENsZWFyO1xuSGFzaC5wcm90b3R5cGVbJ2RlbGV0ZSddID0gaGFzaERlbGV0ZTtcbkhhc2gucHJvdG90eXBlLmdldCA9IGhhc2hHZXQ7XG5IYXNoLnByb3RvdHlwZS5oYXMgPSBoYXNoSGFzO1xuSGFzaC5wcm90b3R5cGUuc2V0ID0gaGFzaFNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGxpc3QgY2FjaGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBMaXN0Q2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IFtdO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgbGFzdEluZGV4ID0gZGF0YS5sZW5ndGggLSAxO1xuICBpZiAoaW5kZXggPT0gbGFzdEluZGV4KSB7XG4gICAgZGF0YS5wb3AoKTtcbiAgfSBlbHNlIHtcbiAgICBzcGxpY2UuY2FsbChkYXRhLCBpbmRleCwgMSk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogZGF0YVtpbmRleF1bMV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBhc3NvY0luZGV4T2YodGhpcy5fX2RhdGFfXywga2V5KSA+IC0xO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGxpc3QgY2FjaGUgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGxpc3QgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIGRhdGEucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9IGVsc2Uge1xuICAgIGRhdGFbaW5kZXhdWzFdID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBMaXN0Q2FjaGVgLlxuTGlzdENhY2hlLnByb3RvdHlwZS5jbGVhciA9IGxpc3RDYWNoZUNsZWFyO1xuTGlzdENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBsaXN0Q2FjaGVEZWxldGU7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmdldCA9IGxpc3RDYWNoZUdldDtcbkxpc3RDYWNoZS5wcm90b3R5cGUuaGFzID0gbGlzdENhY2hlSGFzO1xuTGlzdENhY2hlLnByb3RvdHlwZS5zZXQgPSBsaXN0Q2FjaGVTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcCBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBNYXBDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0ge1xuICAgICdoYXNoJzogbmV3IEhhc2gsXG4gICAgJ21hcCc6IG5ldyAoTWFwIHx8IExpc3RDYWNoZSksXG4gICAgJ3N0cmluZyc6IG5ldyBIYXNoXG4gIH07XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZURlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KVsnZGVsZXRlJ10oa2V5KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBtYXAgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlR2V0KGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmdldChrZXkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIG1hcCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIG1hcCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBtYXAgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLnNldChrZXksIHZhbHVlKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBNYXBDYWNoZWAuXG5NYXBDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBtYXBDYWNoZUNsZWFyO1xuTWFwQ2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IG1hcENhY2hlRGVsZXRlO1xuTWFwQ2FjaGUucHJvdG90eXBlLmdldCA9IG1hcENhY2hlR2V0O1xuTWFwQ2FjaGUucHJvdG90eXBlLmhhcyA9IG1hcENhY2hlSGFzO1xuTWFwQ2FjaGUucHJvdG90eXBlLnNldCA9IG1hcENhY2hlU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBzdGFjayBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTdGFjayhlbnRyaWVzKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlKGVudHJpZXMpO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIHN0YWNrLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIFN0YWNrXG4gKi9cbmZ1bmN0aW9uIHN0YWNrQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0RlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX19bJ2RlbGV0ZSddKGtleSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgc3RhY2sgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrR2V0KGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5nZXQoa2V5KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBzdGFjayB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrSGFzKGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBzdGFjayBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBzdGFjayBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgY2FjaGUgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAoY2FjaGUgaW5zdGFuY2VvZiBMaXN0Q2FjaGUpIHtcbiAgICB2YXIgcGFpcnMgPSBjYWNoZS5fX2RhdGFfXztcbiAgICBpZiAoIU1hcCB8fCAocGFpcnMubGVuZ3RoIDwgTEFSR0VfQVJSQVlfU0laRSAtIDEpKSB7XG4gICAgICBwYWlycy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgY2FjaGUgPSB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlKHBhaXJzKTtcbiAgfVxuICBjYWNoZS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgU3RhY2tgLlxuU3RhY2sucHJvdG90eXBlLmNsZWFyID0gc3RhY2tDbGVhcjtcblN0YWNrLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBzdGFja0RlbGV0ZTtcblN0YWNrLnByb3RvdHlwZS5nZXQgPSBzdGFja0dldDtcblN0YWNrLnByb3RvdHlwZS5oYXMgPSBzdGFja0hhcztcblN0YWNrLnByb3RvdHlwZS5zZXQgPSBzdGFja1NldDtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIHRoZSBhcnJheS1saWtlIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtib29sZWFufSBpbmhlcml0ZWQgU3BlY2lmeSByZXR1cm5pbmcgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYXJyYXlMaWtlS2V5cyh2YWx1ZSwgaW5oZXJpdGVkKSB7XG4gIC8vIFNhZmFyaSA4LjEgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIC8vIFNhZmFyaSA5IG1ha2VzIGBhcmd1bWVudHMubGVuZ3RoYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICB2YXIgcmVzdWx0ID0gKGlzQXJyYXkodmFsdWUpIHx8IGlzQXJndW1lbnRzKHZhbHVlKSlcbiAgICA/IGJhc2VUaW1lcyh2YWx1ZS5sZW5ndGgsIFN0cmluZylcbiAgICA6IFtdO1xuXG4gIHZhciBsZW5ndGggPSByZXN1bHQubGVuZ3RoLFxuICAgICAgc2tpcEluZGV4ZXMgPSAhIWxlbmd0aDtcblxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAoKGluaGVyaXRlZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSAmJlxuICAgICAgICAhKHNraXBJbmRleGVzICYmIChrZXkgPT0gJ2xlbmd0aCcgfHwgaXNJbmRleChrZXksIGxlbmd0aCkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgYGFzc2lnblZhbHVlYCBleGNlcHQgdGhhdCBpdCBkb2Vzbid0IGFzc2lnblxuICogYHVuZGVmaW5lZGAgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIGlmICgodmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhZXEob2JqZWN0W2tleV0sIHZhbHVlKSkgfHxcbiAgICAgICh0eXBlb2Yga2V5ID09ICdudW1iZXInICYmIHZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG59XG5cbi8qKlxuICogQXNzaWducyBgdmFsdWVgIHRvIGBrZXlgIG9mIGBvYmplY3RgIGlmIHRoZSBleGlzdGluZyB2YWx1ZSBpcyBub3QgZXF1aXZhbGVudFxuICogdXNpbmcgW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGZvciBlcXVhbGl0eSBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV07XG4gIGlmICghKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGVxKG9ialZhbHVlLCB2YWx1ZSkpIHx8XG4gICAgICAodmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSkge1xuICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIH1cbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgYGtleWAgaXMgZm91bmQgaW4gYGFycmF5YCBvZiBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSBrZXkgVGhlIGtleSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKGVxKGFycmF5W2xlbmd0aF1bMF0sIGtleSkpIHtcbiAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5hc3NpZ25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgbXVsdGlwbGUgc291cmNlc1xuICogb3IgYGN1c3RvbWl6ZXJgIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VBc3NpZ24ob2JqZWN0LCBzb3VyY2UpIHtcbiAgcmV0dXJuIG9iamVjdCAmJiBjb3B5T2JqZWN0KHNvdXJjZSwga2V5cyhzb3VyY2UpLCBvYmplY3QpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmNsb25lYCBhbmQgYF8uY2xvbmVEZWVwYCB3aGljaCB0cmFja3NcbiAqIHRyYXZlcnNlZCBvYmplY3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0Z1bGxdIFNwZWNpZnkgYSBjbG9uZSBpbmNsdWRpbmcgc3ltYm9scy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNsb25pbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2tleV0gVGhlIGtleSBvZiBgdmFsdWVgLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBwYXJlbnQgb2JqZWN0IG9mIGB2YWx1ZWAuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIG9iamVjdHMgYW5kIHRoZWlyIGNsb25lIGNvdW50ZXJwYXJ0cy5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBjbG9uZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VDbG9uZSh2YWx1ZSwgaXNEZWVwLCBpc0Z1bGwsIGN1c3RvbWl6ZXIsIGtleSwgb2JqZWN0LCBzdGFjaykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoY3VzdG9taXplcikge1xuICAgIHJlc3VsdCA9IG9iamVjdCA/IGN1c3RvbWl6ZXIodmFsdWUsIGtleSwgb2JqZWN0LCBzdGFjaykgOiBjdXN0b21pemVyKHZhbHVlKTtcbiAgfVxuICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZhciBpc0FyciA9IGlzQXJyYXkodmFsdWUpO1xuICBpZiAoaXNBcnIpIHtcbiAgICByZXN1bHQgPSBpbml0Q2xvbmVBcnJheSh2YWx1ZSk7XG4gICAgaWYgKCFpc0RlZXApIHtcbiAgICAgIHJldHVybiBjb3B5QXJyYXkodmFsdWUsIHJlc3VsdCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciB0YWcgPSBnZXRUYWcodmFsdWUpLFxuICAgICAgICBpc0Z1bmMgPSB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xuXG4gICAgaWYgKGlzQnVmZmVyKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGNsb25lQnVmZmVyKHZhbHVlLCBpc0RlZXApO1xuICAgIH1cbiAgICBpZiAodGFnID09IG9iamVjdFRhZyB8fCB0YWcgPT0gYXJnc1RhZyB8fCAoaXNGdW5jICYmICFvYmplY3QpKSB7XG4gICAgICBpZiAoaXNIb3N0T2JqZWN0KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gb2JqZWN0ID8gdmFsdWUgOiB7fTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCA9IGluaXRDbG9uZU9iamVjdChpc0Z1bmMgPyB7fSA6IHZhbHVlKTtcbiAgICAgIGlmICghaXNEZWVwKSB7XG4gICAgICAgIHJldHVybiBjb3B5U3ltYm9scyh2YWx1ZSwgYmFzZUFzc2lnbihyZXN1bHQsIHZhbHVlKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghY2xvbmVhYmxlVGFnc1t0YWddKSB7XG4gICAgICAgIHJldHVybiBvYmplY3QgPyB2YWx1ZSA6IHt9O1xuICAgICAgfVxuICAgICAgcmVzdWx0ID0gaW5pdENsb25lQnlUYWcodmFsdWUsIHRhZywgYmFzZUNsb25lLCBpc0RlZXApO1xuICAgIH1cbiAgfVxuICAvLyBDaGVjayBmb3IgY2lyY3VsYXIgcmVmZXJlbmNlcyBhbmQgcmV0dXJuIGl0cyBjb3JyZXNwb25kaW5nIGNsb25lLlxuICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldCh2YWx1ZSk7XG4gIGlmIChzdGFja2VkKSB7XG4gICAgcmV0dXJuIHN0YWNrZWQ7XG4gIH1cbiAgc3RhY2suc2V0KHZhbHVlLCByZXN1bHQpO1xuXG4gIGlmICghaXNBcnIpIHtcbiAgICB2YXIgcHJvcHMgPSBpc0Z1bGwgPyBnZXRBbGxLZXlzKHZhbHVlKSA6IGtleXModmFsdWUpO1xuICB9XG4gIGFycmF5RWFjaChwcm9wcyB8fCB2YWx1ZSwgZnVuY3Rpb24oc3ViVmFsdWUsIGtleSkge1xuICAgIGlmIChwcm9wcykge1xuICAgICAga2V5ID0gc3ViVmFsdWU7XG4gICAgICBzdWJWYWx1ZSA9IHZhbHVlW2tleV07XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IHBvcHVsYXRlIGNsb25lIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgYXNzaWduVmFsdWUocmVzdWx0LCBrZXksIGJhc2VDbG9uZShzdWJWYWx1ZSwgaXNEZWVwLCBpc0Z1bGwsIGN1c3RvbWl6ZXIsIGtleSwgdmFsdWUsIHN0YWNrKSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmNyZWF0ZWAgd2l0aG91dCBzdXBwb3J0IGZvciBhc3NpZ25pbmdcbiAqIHByb3BlcnRpZXMgdG8gdGhlIGNyZWF0ZWQgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvdG90eXBlIFRoZSBvYmplY3QgdG8gaW5oZXJpdCBmcm9tLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gYmFzZUNyZWF0ZShwcm90bykge1xuICByZXR1cm4gaXNPYmplY3QocHJvdG8pID8gb2JqZWN0Q3JlYXRlKHByb3RvKSA6IHt9O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRBbGxLZXlzYCBhbmQgYGdldEFsbEtleXNJbmAgd2hpY2ggdXNlc1xuICogYGtleXNGdW5jYCBhbmQgYHN5bWJvbHNGdW5jYCB0byBnZXQgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgYW5kXG4gKiBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3ltYm9sc0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRBbGxLZXlzKG9iamVjdCwga2V5c0Z1bmMsIHN5bWJvbHNGdW5jKSB7XG4gIHZhciByZXN1bHQgPSBrZXlzRnVuYyhvYmplY3QpO1xuICByZXR1cm4gaXNBcnJheShvYmplY3QpID8gcmVzdWx0IDogYXJyYXlQdXNoKHJlc3VsdCwgc3ltYm9sc0Z1bmMob2JqZWN0KSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICByZXR1cm4gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYXRpdmVgIHdpdGhvdXQgYmFkIHNoaW0gY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IChpc0Z1bmN0aW9uKHZhbHVlKSB8fCBpc0hvc3RPYmplY3QodmFsdWUpKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc1R5cGVkQXJyYXlgIHdpdGhvdXQgTm9kZS5qcyBvcHRpbWl6YXRpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJlxuICAgIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgISF0eXBlZEFycmF5VGFnc1tvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKV07XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c2Agd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5cyhvYmplY3QpIHtcbiAgaWYgKCFpc1Byb3RvdHlwZShvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXMob2JqZWN0KTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBrZXkgIT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzSW5gIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXNJbihvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXNJbihvYmplY3QpO1xuICB9XG4gIHZhciBpc1Byb3RvID0gaXNQcm90b3R5cGUob2JqZWN0KSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoIShrZXkgPT0gJ2NvbnN0cnVjdG9yJyAmJiAoaXNQcm90byB8fCAhaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tZXJnZWAgd2l0aG91dCBzdXBwb3J0IGZvciBtdWx0aXBsZSBzb3VyY2VzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtudW1iZXJ9IHNyY0luZGV4IFRoZSBpbmRleCBvZiBgc291cmNlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIG1lcmdlZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSB2YWx1ZXMgYW5kIHRoZWlyIG1lcmdlZFxuICogIGNvdW50ZXJwYXJ0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlKG9iamVjdCwgc291cmNlLCBzcmNJbmRleCwgY3VzdG9taXplciwgc3RhY2spIHtcbiAgaWYgKG9iamVjdCA9PT0gc291cmNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghKGlzQXJyYXkoc291cmNlKSB8fCBpc1R5cGVkQXJyYXkoc291cmNlKSkpIHtcbiAgICB2YXIgcHJvcHMgPSBiYXNlS2V5c0luKHNvdXJjZSk7XG4gIH1cbiAgYXJyYXlFYWNoKHByb3BzIHx8IHNvdXJjZSwgZnVuY3Rpb24oc3JjVmFsdWUsIGtleSkge1xuICAgIGlmIChwcm9wcykge1xuICAgICAga2V5ID0gc3JjVmFsdWU7XG4gICAgICBzcmNWYWx1ZSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgICBpZiAoaXNPYmplY3Qoc3JjVmFsdWUpKSB7XG4gICAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgICAgYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBzcmNJbmRleCwgYmFzZU1lcmdlLCBjdXN0b21pemVyLCBzdGFjayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgICAgICA/IGN1c3RvbWl6ZXIob2JqZWN0W2tleV0sIHNyY1ZhbHVlLCAoa2V5ICsgJycpLCBvYmplY3QsIHNvdXJjZSwgc3RhY2spXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICBpZiAobmV3VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBuZXdWYWx1ZSA9IHNyY1ZhbHVlO1xuICAgICAgfVxuICAgICAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlTWVyZ2VgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgbWVyZ2VzIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIG1lcmdlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gbWVyZ2UuXG4gKiBAcGFyYW0ge251bWJlcn0gc3JjSW5kZXggVGhlIGluZGV4IG9mIGBzb3VyY2VgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWVyZ2VGdW5jIFRoZSBmdW5jdGlvbiB0byBtZXJnZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBhc3NpZ25lZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSB2YWx1ZXMgYW5kIHRoZWlyIG1lcmdlZFxuICogIGNvdW50ZXJwYXJ0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBzcmNJbmRleCwgbWVyZ2VGdW5jLCBjdXN0b21pemVyLCBzdGFjaykge1xuICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgIHNyY1ZhbHVlID0gc291cmNlW2tleV0sXG4gICAgICBzdGFja2VkID0gc3RhY2suZ2V0KHNyY1ZhbHVlKTtcblxuICBpZiAoc3RhY2tlZCkge1xuICAgIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIHN0YWNrZWQpO1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgPyBjdXN0b21pemVyKG9ialZhbHVlLCBzcmNWYWx1ZSwgKGtleSArICcnKSwgb2JqZWN0LCBzb3VyY2UsIHN0YWNrKVxuICAgIDogdW5kZWZpbmVkO1xuXG4gIHZhciBpc0NvbW1vbiA9IG5ld1ZhbHVlID09PSB1bmRlZmluZWQ7XG5cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgbmV3VmFsdWUgPSBzcmNWYWx1ZTtcbiAgICBpZiAoaXNBcnJheShzcmNWYWx1ZSkgfHwgaXNUeXBlZEFycmF5KHNyY1ZhbHVlKSkge1xuICAgICAgaWYgKGlzQXJyYXkob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gb2JqVmFsdWU7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc0FycmF5TGlrZU9iamVjdChvYmpWYWx1ZSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBjb3B5QXJyYXkob2JqVmFsdWUpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgICAgIG5ld1ZhbHVlID0gYmFzZUNsb25lKHNyY1ZhbHVlLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChzcmNWYWx1ZSkgfHwgaXNBcmd1bWVudHMoc3JjVmFsdWUpKSB7XG4gICAgICBpZiAoaXNBcmd1bWVudHMob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gdG9QbGFpbk9iamVjdChvYmpWYWx1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICghaXNPYmplY3Qob2JqVmFsdWUpIHx8IChzcmNJbmRleCAmJiBpc0Z1bmN0aW9uKG9ialZhbHVlKSkpIHtcbiAgICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICAgICAgbmV3VmFsdWUgPSBiYXNlQ2xvbmUoc3JjVmFsdWUsIHRydWUpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG5ld1ZhbHVlID0gb2JqVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgLy8gUmVjdXJzaXZlbHkgbWVyZ2Ugb2JqZWN0cyBhbmQgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgc3RhY2suc2V0KHNyY1ZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgbWVyZ2VGdW5jKG5ld1ZhbHVlLCBzcmNWYWx1ZSwgc3JjSW5kZXgsIGN1c3RvbWl6ZXIsIHN0YWNrKTtcbiAgICBzdGFja1snZGVsZXRlJ10oc3JjVmFsdWUpO1xuICB9XG4gIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIG5ld1ZhbHVlKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5yZXN0YCB3aGljaCBkb2Vzbid0IHZhbGlkYXRlIG9yIGNvZXJjZSBhcmd1bWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVJlc3QoZnVuYywgc3RhcnQpIHtcbiAgc3RhcnQgPSBuYXRpdmVNYXgoc3RhcnQgPT09IHVuZGVmaW5lZCA/IChmdW5jLmxlbmd0aCAtIDEpIDogc3RhcnQsIDApO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IG5hdGl2ZU1heChhcmdzLmxlbmd0aCAtIHN0YXJ0LCAwKSxcbiAgICAgICAgYXJyYXkgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIGFycmF5W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgfVxuICAgIGluZGV4ID0gLTE7XG4gICAgdmFyIG90aGVyQXJncyA9IEFycmF5KHN0YXJ0ICsgMSk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBzdGFydCkge1xuICAgICAgb3RoZXJBcmdzW2luZGV4XSA9IGFyZ3NbaW5kZXhdO1xuICAgIH1cbiAgICBvdGhlckFyZ3Nbc3RhcnRdID0gYXJyYXk7XG4gICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXMsIG90aGVyQXJncyk7XG4gIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mICBgYnVmZmVyYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZmZlciBUaGUgYnVmZmVyIHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtCdWZmZXJ9IFJldHVybnMgdGhlIGNsb25lZCBidWZmZXIuXG4gKi9cbmZ1bmN0aW9uIGNsb25lQnVmZmVyKGJ1ZmZlciwgaXNEZWVwKSB7XG4gIGlmIChpc0RlZXApIHtcbiAgICByZXR1cm4gYnVmZmVyLnNsaWNlKCk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IG5ldyBidWZmZXIuY29uc3RydWN0b3IoYnVmZmVyLmxlbmd0aCk7XG4gIGJ1ZmZlci5jb3B5KHJlc3VsdCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBhcnJheUJ1ZmZlcmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IGFycmF5QnVmZmVyIFRoZSBhcnJheSBidWZmZXIgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7QXJyYXlCdWZmZXJ9IFJldHVybnMgdGhlIGNsb25lZCBhcnJheSBidWZmZXIuXG4gKi9cbmZ1bmN0aW9uIGNsb25lQXJyYXlCdWZmZXIoYXJyYXlCdWZmZXIpIHtcbiAgdmFyIHJlc3VsdCA9IG5ldyBhcnJheUJ1ZmZlci5jb25zdHJ1Y3RvcihhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgbmV3IFVpbnQ4QXJyYXkocmVzdWx0KS5zZXQobmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIpKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYGRhdGFWaWV3YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFWaWV3IFRoZSBkYXRhIHZpZXcgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIGRhdGEgdmlldy5cbiAqL1xuZnVuY3Rpb24gY2xvbmVEYXRhVmlldyhkYXRhVmlldywgaXNEZWVwKSB7XG4gIHZhciBidWZmZXIgPSBpc0RlZXAgPyBjbG9uZUFycmF5QnVmZmVyKGRhdGFWaWV3LmJ1ZmZlcikgOiBkYXRhVmlldy5idWZmZXI7XG4gIHJldHVybiBuZXcgZGF0YVZpZXcuY29uc3RydWN0b3IoYnVmZmVyLCBkYXRhVmlldy5ieXRlT2Zmc2V0LCBkYXRhVmlldy5ieXRlTGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjbG9uZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNsb25lRnVuYyBUaGUgZnVuY3Rpb24gdG8gY2xvbmUgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCBtYXAuXG4gKi9cbmZ1bmN0aW9uIGNsb25lTWFwKG1hcCwgaXNEZWVwLCBjbG9uZUZ1bmMpIHtcbiAgdmFyIGFycmF5ID0gaXNEZWVwID8gY2xvbmVGdW5jKG1hcFRvQXJyYXkobWFwKSwgdHJ1ZSkgOiBtYXBUb0FycmF5KG1hcCk7XG4gIHJldHVybiBhcnJheVJlZHVjZShhcnJheSwgYWRkTWFwRW50cnksIG5ldyBtYXAuY29uc3RydWN0b3IpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgcmVnZXhwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHJlZ2V4cCBUaGUgcmVnZXhwIHRvIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIHJlZ2V4cC5cbiAqL1xuZnVuY3Rpb24gY2xvbmVSZWdFeHAocmVnZXhwKSB7XG4gIHZhciByZXN1bHQgPSBuZXcgcmVnZXhwLmNvbnN0cnVjdG9yKHJlZ2V4cC5zb3VyY2UsIHJlRmxhZ3MuZXhlYyhyZWdleHApKTtcbiAgcmVzdWx0Lmxhc3RJbmRleCA9IHJlZ2V4cC5sYXN0SW5kZXg7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBzZXRgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjbG9uZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNsb25lIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgc2V0LlxuICovXG5mdW5jdGlvbiBjbG9uZVNldChzZXQsIGlzRGVlcCwgY2xvbmVGdW5jKSB7XG4gIHZhciBhcnJheSA9IGlzRGVlcCA/IGNsb25lRnVuYyhzZXRUb0FycmF5KHNldCksIHRydWUpIDogc2V0VG9BcnJheShzZXQpO1xuICByZXR1cm4gYXJyYXlSZWR1Y2UoYXJyYXksIGFkZFNldEVudHJ5LCBuZXcgc2V0LmNvbnN0cnVjdG9yKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgdGhlIGBzeW1ib2xgIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHN5bWJvbCBUaGUgc3ltYm9sIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCBzeW1ib2wgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBjbG9uZVN5bWJvbChzeW1ib2wpIHtcbiAgcmV0dXJuIHN5bWJvbFZhbHVlT2YgPyBPYmplY3Qoc3ltYm9sVmFsdWVPZi5jYWxsKHN5bWJvbCkpIDoge307XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGB0eXBlZEFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHR5cGVkQXJyYXkgVGhlIHR5cGVkIGFycmF5IHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCB0eXBlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gY2xvbmVUeXBlZEFycmF5KHR5cGVkQXJyYXksIGlzRGVlcCkge1xuICB2YXIgYnVmZmVyID0gaXNEZWVwID8gY2xvbmVBcnJheUJ1ZmZlcih0eXBlZEFycmF5LmJ1ZmZlcikgOiB0eXBlZEFycmF5LmJ1ZmZlcjtcbiAgcmV0dXJuIG5ldyB0eXBlZEFycmF5LmNvbnN0cnVjdG9yKGJ1ZmZlciwgdHlwZWRBcnJheS5ieXRlT2Zmc2V0LCB0eXBlZEFycmF5Lmxlbmd0aCk7XG59XG5cbi8qKlxuICogQ29waWVzIHRoZSB2YWx1ZXMgb2YgYHNvdXJjZWAgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gc291cmNlIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5PVtdXSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgdG8uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gY29weUFycmF5KHNvdXJjZSwgYXJyYXkpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBzb3VyY2UubGVuZ3RoO1xuXG4gIGFycmF5IHx8IChhcnJheSA9IEFycmF5KGxlbmd0aCkpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W2luZGV4XSA9IHNvdXJjZVtpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG4vKipcbiAqIENvcGllcyBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgaWRlbnRpZmllcnMgdG8gY29weS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0PXt9XSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyB0by5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvcGllZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBjb3B5T2JqZWN0KHNvdXJjZSwgcHJvcHMsIG9iamVjdCwgY3VzdG9taXplcikge1xuICBvYmplY3QgfHwgKG9iamVjdCA9IHt9KTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG5cbiAgICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgICA/IGN1c3RvbWl6ZXIob2JqZWN0W2tleV0sIHNvdXJjZVtrZXldLCBrZXksIG9iamVjdCwgc291cmNlKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUgPT09IHVuZGVmaW5lZCA/IHNvdXJjZVtrZXldIDogbmV3VmFsdWUpO1xuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbi8qKlxuICogQ29waWVzIG93biBzeW1ib2wgcHJvcGVydGllcyBvZiBgc291cmNlYCB0byBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IHRvIGNvcHkgc3ltYm9scyBmcm9tLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3Q9e31dIFRoZSBvYmplY3QgdG8gY29weSBzeW1ib2xzIHRvLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gY29weVN5bWJvbHMoc291cmNlLCBvYmplY3QpIHtcbiAgcmV0dXJuIGNvcHlPYmplY3Qoc291cmNlLCBnZXRTeW1ib2xzKHNvdXJjZSksIG9iamVjdCk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIGxpa2UgYF8uYXNzaWduYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gYXNzaWduZXIgVGhlIGZ1bmN0aW9uIHRvIGFzc2lnbiB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhc3NpZ25lciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQXNzaWduZXIoYXNzaWduZXIpIHtcbiAgcmV0dXJuIGJhc2VSZXN0KGZ1bmN0aW9uKG9iamVjdCwgc291cmNlcykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBzb3VyY2VzLmxlbmd0aCxcbiAgICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA+IDEgPyBzb3VyY2VzW2xlbmd0aCAtIDFdIDogdW5kZWZpbmVkLFxuICAgICAgICBndWFyZCA9IGxlbmd0aCA+IDIgPyBzb3VyY2VzWzJdIDogdW5kZWZpbmVkO1xuXG4gICAgY3VzdG9taXplciA9IChhc3NpZ25lci5sZW5ndGggPiAzICYmIHR5cGVvZiBjdXN0b21pemVyID09ICdmdW5jdGlvbicpXG4gICAgICA/IChsZW5ndGgtLSwgY3VzdG9taXplcilcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGd1YXJkICYmIGlzSXRlcmF0ZWVDYWxsKHNvdXJjZXNbMF0sIHNvdXJjZXNbMV0sIGd1YXJkKSkge1xuICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA8IDMgPyB1bmRlZmluZWQgOiBjdXN0b21pemVyO1xuICAgICAgbGVuZ3RoID0gMTtcbiAgICB9XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBzb3VyY2VzW2luZGV4XTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgYXNzaWduZXIob2JqZWN0LCBzb3VyY2UsIGluZGV4LCBjdXN0b21pemVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scy5cbiAqL1xuZnVuY3Rpb24gZ2V0QWxsS2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGJhc2VHZXRBbGxLZXlzKG9iamVjdCwga2V5cywgZ2V0U3ltYm9scyk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgZGF0YSBmb3IgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIHJlZmVyZW5jZSBrZXkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWFwIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGdldE1hcERhdGEobWFwLCBrZXkpIHtcbiAgdmFyIGRhdGEgPSBtYXAuX19kYXRhX187XG4gIHJldHVybiBpc0tleWFibGUoa2V5KVxuICAgID8gZGF0YVt0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8gJ3N0cmluZycgOiAnaGFzaCddXG4gICAgOiBkYXRhLm1hcDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBzeW1ib2wgcHJvcGVydGllcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBzeW1ib2xzLlxuICovXG52YXIgZ2V0U3ltYm9scyA9IG5hdGl2ZUdldFN5bWJvbHMgPyBvdmVyQXJnKG5hdGl2ZUdldFN5bWJvbHMsIE9iamVjdCkgOiBzdHViQXJyYXk7XG5cbi8qKlxuICogR2V0cyB0aGUgYHRvU3RyaW5nVGFnYCBvZiBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbnZhciBnZXRUYWcgPSBiYXNlR2V0VGFnO1xuXG4vLyBGYWxsYmFjayBmb3IgZGF0YSB2aWV3cywgbWFwcywgc2V0cywgYW5kIHdlYWsgbWFwcyBpbiBJRSAxMSxcbi8vIGZvciBkYXRhIHZpZXdzIGluIEVkZ2UgPCAxNCwgYW5kIHByb21pc2VzIGluIE5vZGUuanMuXG5pZiAoKERhdGFWaWV3ICYmIGdldFRhZyhuZXcgRGF0YVZpZXcobmV3IEFycmF5QnVmZmVyKDEpKSkgIT0gZGF0YVZpZXdUYWcpIHx8XG4gICAgKE1hcCAmJiBnZXRUYWcobmV3IE1hcCkgIT0gbWFwVGFnKSB8fFxuICAgIChQcm9taXNlICYmIGdldFRhZyhQcm9taXNlLnJlc29sdmUoKSkgIT0gcHJvbWlzZVRhZykgfHxcbiAgICAoU2V0ICYmIGdldFRhZyhuZXcgU2V0KSAhPSBzZXRUYWcpIHx8XG4gICAgKFdlYWtNYXAgJiYgZ2V0VGFnKG5ldyBXZWFrTWFwKSAhPSB3ZWFrTWFwVGFnKSkge1xuICBnZXRUYWcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciByZXN1bHQgPSBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSxcbiAgICAgICAgQ3RvciA9IHJlc3VsdCA9PSBvYmplY3RUYWcgPyB2YWx1ZS5jb25zdHJ1Y3RvciA6IHVuZGVmaW5lZCxcbiAgICAgICAgY3RvclN0cmluZyA9IEN0b3IgPyB0b1NvdXJjZShDdG9yKSA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChjdG9yU3RyaW5nKSB7XG4gICAgICBzd2l0Y2ggKGN0b3JTdHJpbmcpIHtcbiAgICAgICAgY2FzZSBkYXRhVmlld0N0b3JTdHJpbmc6IHJldHVybiBkYXRhVmlld1RhZztcbiAgICAgICAgY2FzZSBtYXBDdG9yU3RyaW5nOiByZXR1cm4gbWFwVGFnO1xuICAgICAgICBjYXNlIHByb21pc2VDdG9yU3RyaW5nOiByZXR1cm4gcHJvbWlzZVRhZztcbiAgICAgICAgY2FzZSBzZXRDdG9yU3RyaW5nOiByZXR1cm4gc2V0VGFnO1xuICAgICAgICBjYXNlIHdlYWtNYXBDdG9yU3RyaW5nOiByZXR1cm4gd2Vha01hcFRhZztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyBhbiBhcnJheSBjbG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNsb25lLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBpbml0aWFsaXplZCBjbG9uZS5cbiAqL1xuZnVuY3Rpb24gaW5pdENsb25lQXJyYXkoYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IGFycmF5LmNvbnN0cnVjdG9yKGxlbmd0aCk7XG5cbiAgLy8gQWRkIHByb3BlcnRpZXMgYXNzaWduZWQgYnkgYFJlZ0V4cCNleGVjYC5cbiAgaWYgKGxlbmd0aCAmJiB0eXBlb2YgYXJyYXlbMF0gPT0gJ3N0cmluZycgJiYgaGFzT3duUHJvcGVydHkuY2FsbChhcnJheSwgJ2luZGV4JykpIHtcbiAgICByZXN1bHQuaW5kZXggPSBhcnJheS5pbmRleDtcbiAgICByZXN1bHQuaW5wdXQgPSBhcnJheS5pbnB1dDtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIG9iamVjdCBjbG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZU9iamVjdChvYmplY3QpIHtcbiAgcmV0dXJuICh0eXBlb2Ygb2JqZWN0LmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgIWlzUHJvdG90eXBlKG9iamVjdCkpXG4gICAgPyBiYXNlQ3JlYXRlKGdldFByb3RvdHlwZShvYmplY3QpKVxuICAgIDoge307XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gb2JqZWN0IGNsb25lIGJhc2VkIG9uIGl0cyBgdG9TdHJpbmdUYWdgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIG9ubHkgc3VwcG9ydHMgY2xvbmluZyB2YWx1ZXMgd2l0aCB0YWdzIG9mXG4gKiBgQm9vbGVhbmAsIGBEYXRlYCwgYEVycm9yYCwgYE51bWJlcmAsIGBSZWdFeHBgLCBvciBgU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgYHRvU3RyaW5nVGFnYCBvZiB0aGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2xvbmVGdW5jIFRoZSBmdW5jdGlvbiB0byBjbG9uZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZUJ5VGFnKG9iamVjdCwgdGFnLCBjbG9uZUZ1bmMsIGlzRGVlcCkge1xuICB2YXIgQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcjtcbiAgc3dpdGNoICh0YWcpIHtcbiAgICBjYXNlIGFycmF5QnVmZmVyVGFnOlxuICAgICAgcmV0dXJuIGNsb25lQXJyYXlCdWZmZXIob2JqZWN0KTtcblxuICAgIGNhc2UgYm9vbFRhZzpcbiAgICBjYXNlIGRhdGVUYWc6XG4gICAgICByZXR1cm4gbmV3IEN0b3IoK29iamVjdCk7XG5cbiAgICBjYXNlIGRhdGFWaWV3VGFnOlxuICAgICAgcmV0dXJuIGNsb25lRGF0YVZpZXcob2JqZWN0LCBpc0RlZXApO1xuXG4gICAgY2FzZSBmbG9hdDMyVGFnOiBjYXNlIGZsb2F0NjRUYWc6XG4gICAgY2FzZSBpbnQ4VGFnOiBjYXNlIGludDE2VGFnOiBjYXNlIGludDMyVGFnOlxuICAgIGNhc2UgdWludDhUYWc6IGNhc2UgdWludDhDbGFtcGVkVGFnOiBjYXNlIHVpbnQxNlRhZzogY2FzZSB1aW50MzJUYWc6XG4gICAgICByZXR1cm4gY2xvbmVUeXBlZEFycmF5KG9iamVjdCwgaXNEZWVwKTtcblxuICAgIGNhc2UgbWFwVGFnOlxuICAgICAgcmV0dXJuIGNsb25lTWFwKG9iamVjdCwgaXNEZWVwLCBjbG9uZUZ1bmMpO1xuXG4gICAgY2FzZSBudW1iZXJUYWc6XG4gICAgY2FzZSBzdHJpbmdUYWc6XG4gICAgICByZXR1cm4gbmV3IEN0b3Iob2JqZWN0KTtcblxuICAgIGNhc2UgcmVnZXhwVGFnOlxuICAgICAgcmV0dXJuIGNsb25lUmVnRXhwKG9iamVjdCk7XG5cbiAgICBjYXNlIHNldFRhZzpcbiAgICAgIHJldHVybiBjbG9uZVNldChvYmplY3QsIGlzRGVlcCwgY2xvbmVGdW5jKTtcblxuICAgIGNhc2Ugc3ltYm9sVGFnOlxuICAgICAgcmV0dXJuIGNsb25lU3ltYm9sKG9iamVjdCk7XG4gIH1cbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gISFsZW5ndGggJiZcbiAgICAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSAmJlxuICAgICh2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgdmFsdWUgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IGluZGV4IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgaW5kZXggb3Iga2V5IGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBvYmplY3QgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBvYmplY3QgYXJndW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJdGVyYXRlZUNhbGwodmFsdWUsIGluZGV4LCBvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIGluZGV4O1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJ1xuICAgICAgICA/IChpc0FycmF5TGlrZShvYmplY3QpICYmIGlzSW5kZXgoaW5kZXgsIG9iamVjdC5sZW5ndGgpKVxuICAgICAgICA6ICh0eXBlID09ICdzdHJpbmcnICYmIGluZGV4IGluIG9iamVjdClcbiAgICAgICkge1xuICAgIHJldHVybiBlcShvYmplY3RbaW5kZXhdLCB2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciB1c2UgYXMgdW5pcXVlIG9iamVjdCBrZXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXlhYmxlKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKVxuICAgID8gKHZhbHVlICE9PSAnX19wcm90b19fJylcbiAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm90b3R5cGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgdmFyIEN0b3IgPSB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3RvID0gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUpIHx8IG9iamVjdFByb3RvO1xuXG4gIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBsaWtlXG4gKiBbYE9iamVjdC5rZXlzYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBleGNlcHQgdGhhdCBpdCBpbmNsdWRlcyBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBuYXRpdmVLZXlzSW4ob2JqZWN0KSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgaWYgKG9iamVjdCAhPSBudWxsKSB7XG4gICAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogUGVyZm9ybXMgYVxuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICByZXR1cm4gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICghcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpIHx8IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWcpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pc0FycmF5TGlrZWAgZXhjZXB0IHRoYXQgaXQgYWxzbyBjaGVja3MgaWYgYHZhbHVlYFxuICogaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LWxpa2Ugb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMy4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlciwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBCdWZmZXIoMikpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IFVpbnQ4QXJyYXkoMikpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQnVmZmVyID0gbmF0aXZlSXNCdWZmZXIgfHwgc3R1YkZhbHNlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDgtOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIHRoYXQgaXMsIGFuIG9iamVjdCBjcmVhdGVkIGJ5IHRoZVxuICogYE9iamVjdGAgY29uc3RydWN0b3Igb3Igb25lIHdpdGggYSBgW1tQcm90b3R5cGVdXWAgb2YgYG51bGxgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC44LjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqIH1cbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QobmV3IEZvbyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoeyAneCc6IDAsICd5JzogMCB9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdExpa2UodmFsdWUpIHx8XG4gICAgICBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSAhPSBvYmplY3RUYWcgfHwgaXNIb3N0T2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcHJvdG8gPSBnZXRQcm90b3R5cGUodmFsdWUpO1xuICBpZiAocHJvdG8gPT09IG51bGwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgQ3RvciA9IGhhc093blByb3BlcnR5LmNhbGwocHJvdG8sICdjb25zdHJ1Y3RvcicpICYmIHByb3RvLmNvbnN0cnVjdG9yO1xuICByZXR1cm4gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiZcbiAgICBDdG9yIGluc3RhbmNlb2YgQ3RvciAmJiBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShuZXcgVWludDhBcnJheSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkoW10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzVHlwZWRBcnJheSA9IG5vZGVJc1R5cGVkQXJyYXkgPyBiYXNlVW5hcnkobm9kZUlzVHlwZWRBcnJheSkgOiBiYXNlSXNUeXBlZEFycmF5O1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBwbGFpbiBvYmplY3QgZmxhdHRlbmluZyBpbmhlcml0ZWQgZW51bWVyYWJsZSBzdHJpbmdcbiAqIGtleWVkIHByb3BlcnRpZXMgb2YgYHZhbHVlYCB0byBvd24gcHJvcGVydGllcyBvZiB0aGUgcGxhaW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY29udmVydGVkIHBsYWluIG9iamVjdC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5hc3NpZ24oeyAnYSc6IDEgfSwgbmV3IEZvbyk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyIH1cbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBfLnRvUGxhaW5PYmplY3QobmV3IEZvbykpO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiwgJ2MnOiAzIH1cbiAqL1xuZnVuY3Rpb24gdG9QbGFpbk9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gY29weU9iamVjdCh2YWx1ZSwga2V5c0luKHZhbHVlKSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xuZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCkgOiBiYXNlS2V5cyhvYmplY3QpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzSW4obmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYicsICdjJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24ga2V5c0luKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0LCB0cnVlKSA6IGJhc2VLZXlzSW4ob2JqZWN0KTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmFzc2lnbmAgZXhjZXB0IHRoYXQgaXQgcmVjdXJzaXZlbHkgbWVyZ2VzIG93biBhbmRcbiAqIGluaGVyaXRlZCBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3RzIGludG8gdGhlXG4gKiBkZXN0aW5hdGlvbiBvYmplY3QuIFNvdXJjZSBwcm9wZXJ0aWVzIHRoYXQgcmVzb2x2ZSB0byBgdW5kZWZpbmVkYCBhcmVcbiAqIHNraXBwZWQgaWYgYSBkZXN0aW5hdGlvbiB2YWx1ZSBleGlzdHMuIEFycmF5IGFuZCBwbGFpbiBvYmplY3QgcHJvcGVydGllc1xuICogYXJlIG1lcmdlZCByZWN1cnNpdmVseS4gT3RoZXIgb2JqZWN0cyBhbmQgdmFsdWUgdHlwZXMgYXJlIG92ZXJyaWRkZW4gYnlcbiAqIGFzc2lnbm1lbnQuIFNvdXJjZSBvYmplY3RzIGFyZSBhcHBsaWVkIGZyb20gbGVmdCB0byByaWdodC4gU3Vic2VxdWVudFxuICogc291cmNlcyBvdmVyd3JpdGUgcHJvcGVydHkgYXNzaWdubWVudHMgb2YgcHJldmlvdXMgc291cmNlcy5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgbXV0YXRlcyBgb2JqZWN0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuNS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7XG4gKiAgICdhJzogW3sgJ2InOiAyIH0sIHsgJ2QnOiA0IH1dXG4gKiB9O1xuICpcbiAqIHZhciBvdGhlciA9IHtcbiAqICAgJ2EnOiBbeyAnYyc6IDMgfSwgeyAnZSc6IDUgfV1cbiAqIH07XG4gKlxuICogXy5tZXJnZShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IHsgJ2EnOiBbeyAnYic6IDIsICdjJzogMyB9LCB7ICdkJzogNCwgJ2UnOiA1IH1dIH1cbiAqL1xudmFyIG1lcmdlID0gY3JlYXRlQXNzaWduZXIoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4KSB7XG4gIGJhc2VNZXJnZShvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgpO1xufSk7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBhIG5ldyBlbXB0eSBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGVtcHR5IGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgYXJyYXlzID0gXy50aW1lcygyLCBfLnN0dWJBcnJheSk7XG4gKlxuICogY29uc29sZS5sb2coYXJyYXlzKTtcbiAqIC8vID0+IFtbXSwgW11dXG4gKlxuICogY29uc29sZS5sb2coYXJyYXlzWzBdID09PSBhcnJheXNbMV0pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gc3R1YkFycmF5KCkge1xuICByZXR1cm4gW107XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBgZmFsc2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50aW1lcygyLCBfLnN0dWJGYWxzZSk7XG4gKiAvLyA9PiBbZmFsc2UsIGZhbHNlXVxuICovXG5mdW5jdGlvbiBzdHViRmFsc2UoKSB7XG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtZXJnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gubWVyZ2UvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cdGlmKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRpZighbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR0aHJvdyBuZXcgRXJyb3IoXCJkZWZpbmUgY2Fubm90IGJlIHVzZWQgaW5kaXJlY3RcIik7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2FtZC1kZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gbm9ybWFsaXplQXJndW1lbnRzKCAuLi5hcmdzICkge1xuICAgIGxldCBvcHRpb25zID0ge307XG4gICAgaWYgKCB0eXBlb2YgYXJnc1swXSA9PT0gJ29iamVjdCcgKSB7XG4gICAgICAgIG9wdGlvbnMgPSBhcmdzWzBdO1xuICAgIH1cbiAgICBlbHNlIGlmICggdHlwZW9mIGFyZ3NbMV0gPT09ICdvYmplY3QnICkge1xuICAgICAgICBvcHRpb25zID0gYXJnc1sxXTtcbiAgICB9XG4gICAgZWxzZSBpZiAoIHR5cGVvZiBhcmdzWzFdID09PSAnc3RyaW5nJyApIHtcbiAgICAgICAgb3B0aW9ucy50b2tlbiA9IGFyZ3NbMV07XG4gICAgfVxuICAgIGlmICggdHlwZW9mIGFyZ3NbMF0gPT09ICdzdHJpbmcnICkge1xuICAgICAgICBvcHRpb25zLnVyaSA9IGFyZ3NbMF07XG4gICAgfVxuICAgIGlmICggYXJncy5sZW5ndGggPiAwICYmIHR5cGVvZiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0gPT09ICdmdW5jdGlvbicgKSB7XG4gICAgICAgIG9wdGlvbnMuY2FsbGJhY2sgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV07XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5vcm1hbGl6ZUFyZ3VtZW50cztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy92YWxpZGF0ZS9ub3JtYWxpemVBcmd1bWVudHMuanMiLCJjb25zdCBQbHVnaW4gPSByZXF1aXJlKCAnLi9wbHVnaW4nICk7XG5jb25zdCBkZWZhdWx0UGx1Z2lucyA9IHJlcXVpcmUoICcuL2RlZmF1bHRzJyApO1xuXG5QbHVnaW4uZGVmYXVsdHMgPSBkZWZhdWx0UGx1Z2lucztcblxubW9kdWxlLmV4cG9ydHMgPSBQbHVnaW47XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMCxcbiAgICBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKlxuICogQSBmYXN0ZXIgYWx0ZXJuYXRpdmUgdG8gYEZ1bmN0aW9uI2FwcGx5YCwgdGhpcyBmdW5jdGlvbiBpbnZva2VzIGBmdW5jYFxuICogd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgYHRoaXNBcmdgIGFuZCB0aGUgYXJndW1lbnRzIG9mIGBhcmdzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaW52b2tlLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzIFRoZSBhcmd1bWVudHMgdG8gaW52b2tlIGBmdW5jYCB3aXRoLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuXG4gKi9cbmZ1bmN0aW9uIGFwcGx5KGZ1bmMsIHRoaXNBcmcsIGFyZ3MpIHtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnKTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgfVxuICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ubWFwYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWVcbiAqIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBtYXBwZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TWFwKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMCxcbiAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQXBwZW5kcyB0aGUgZWxlbWVudHMgb2YgYHZhbHVlc2AgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgdmFsdWVzIHRvIGFwcGVuZC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheVB1c2goYXJyYXksIHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcy5sZW5ndGgsXG4gICAgICBvZmZzZXQgPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtvZmZzZXQgKyBpbmRleF0gPSB2YWx1ZXNbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sLFxuICAgIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGUsXG4gICAgc3ByZWFkYWJsZVN5bWJvbCA9IFN5bWJvbCA/IFN5bWJvbC5pc0NvbmNhdFNwcmVhZGFibGUgOiB1bmRlZmluZWQ7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mbGF0dGVuYCB3aXRoIHN1cHBvcnQgZm9yIHJlc3RyaWN0aW5nIGZsYXR0ZW5pbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBmbGF0dGVuLlxuICogQHBhcmFtIHtudW1iZXJ9IGRlcHRoIFRoZSBtYXhpbXVtIHJlY3Vyc2lvbiBkZXB0aC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3ByZWRpY2F0ZT1pc0ZsYXR0ZW5hYmxlXSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNTdHJpY3RdIFJlc3RyaWN0IHRvIHZhbHVlcyB0aGF0IHBhc3MgYHByZWRpY2F0ZWAgY2hlY2tzLlxuICogQHBhcmFtIHtBcnJheX0gW3Jlc3VsdD1bXV0gVGhlIGluaXRpYWwgcmVzdWx0IHZhbHVlLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZmxhdHRlbmVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlRmxhdHRlbihhcnJheSwgZGVwdGgsIHByZWRpY2F0ZSwgaXNTdHJpY3QsIHJlc3VsdCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBwcmVkaWNhdGUgfHwgKHByZWRpY2F0ZSA9IGlzRmxhdHRlbmFibGUpO1xuICByZXN1bHQgfHwgKHJlc3VsdCA9IFtdKTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XTtcbiAgICBpZiAoZGVwdGggPiAwICYmIHByZWRpY2F0ZSh2YWx1ZSkpIHtcbiAgICAgIGlmIChkZXB0aCA+IDEpIHtcbiAgICAgICAgLy8gUmVjdXJzaXZlbHkgZmxhdHRlbiBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgICAgYmFzZUZsYXR0ZW4odmFsdWUsIGRlcHRoIC0gMSwgcHJlZGljYXRlLCBpc1N0cmljdCwgcmVzdWx0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFycmF5UHVzaChyZXN1bHQsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFpc1N0cmljdCkge1xuICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucGlja2Agd2l0aG91dCBzdXBwb3J0IGZvciBpbmRpdmlkdWFsXG4gKiBwcm9wZXJ0eSBpZGVudGlmaWVycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nW119IHByb3BzIFRoZSBwcm9wZXJ0eSBpZGVudGlmaWVycyB0byBwaWNrLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gYmFzZVBpY2sob2JqZWN0LCBwcm9wcykge1xuICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgcmV0dXJuIGJhc2VQaWNrQnkob2JqZWN0LCBwcm9wcywgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgIHJldHVybiBrZXkgaW4gb2JqZWN0O1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiAgYF8ucGlja0J5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBwcm9wcyBUaGUgcHJvcGVydHkgaWRlbnRpZmllcnMgdG8gcGljayBmcm9tLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBwcm9wZXJ0eS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGJhc2VQaWNrQnkob2JqZWN0LCBwcm9wcywgcHJlZGljYXRlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0ge307XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdLFxuICAgICAgICB2YWx1ZSA9IG9iamVjdFtrZXldO1xuXG4gICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSwga2V5KSkge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5yZXN0YCB3aGljaCBkb2Vzbid0IHZhbGlkYXRlIG9yIGNvZXJjZSBhcmd1bWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVJlc3QoZnVuYywgc3RhcnQpIHtcbiAgc3RhcnQgPSBuYXRpdmVNYXgoc3RhcnQgPT09IHVuZGVmaW5lZCA/IChmdW5jLmxlbmd0aCAtIDEpIDogc3RhcnQsIDApO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IG5hdGl2ZU1heChhcmdzLmxlbmd0aCAtIHN0YXJ0LCAwKSxcbiAgICAgICAgYXJyYXkgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIGFycmF5W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgfVxuICAgIGluZGV4ID0gLTE7XG4gICAgdmFyIG90aGVyQXJncyA9IEFycmF5KHN0YXJ0ICsgMSk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBzdGFydCkge1xuICAgICAgb3RoZXJBcmdzW2luZGV4XSA9IGFyZ3NbaW5kZXhdO1xuICAgIH1cbiAgICBvdGhlckFyZ3Nbc3RhcnRdID0gYXJyYXk7XG4gICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXMsIG90aGVyQXJncyk7XG4gIH07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBmbGF0dGVuYWJsZSBgYXJndW1lbnRzYCBvYmplY3Qgb3IgYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZmxhdHRlbmFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNGbGF0dGVuYWJsZSh2YWx1ZSkge1xuICByZXR1cm4gaXNBcnJheSh2YWx1ZSkgfHwgaXNBcmd1bWVudHModmFsdWUpIHx8XG4gICAgISEoc3ByZWFkYWJsZVN5bWJvbCAmJiB2YWx1ZSAmJiB2YWx1ZVtzcHJlYWRhYmxlU3ltYm9sXSk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyBrZXkgaWYgaXQncyBub3QgYSBzdHJpbmcgb3Igc3ltYm9sLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHJldHVybnMge3N0cmluZ3xzeW1ib2x9IFJldHVybnMgdGhlIGtleS5cbiAqL1xuZnVuY3Rpb24gdG9LZXkodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fCBpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICByZXR1cm4gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICghcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpIHx8IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWcpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pc0FycmF5TGlrZWAgZXhjZXB0IHRoYXQgaXQgYWxzbyBjaGVja3MgaWYgYHZhbHVlYFxuICogaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LWxpa2Ugb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA4LTkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gb2JqZWN0IGNvbXBvc2VkIG9mIHRoZSBwaWNrZWQgYG9iamVjdGAgcHJvcGVydGllcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHsuLi4oc3RyaW5nfHN0cmluZ1tdKX0gW3Byb3BzXSBUaGUgcHJvcGVydHkgaWRlbnRpZmllcnMgdG8gcGljay5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSwgJ2InOiAnMicsICdjJzogMyB9O1xuICpcbiAqIF8ucGljayhvYmplY3QsIFsnYScsICdjJ10pO1xuICogLy8gPT4geyAnYSc6IDEsICdjJzogMyB9XG4gKi9cbnZhciBwaWNrID0gYmFzZVJlc3QoZnVuY3Rpb24ob2JqZWN0LCBwcm9wcykge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB7fSA6IGJhc2VQaWNrKG9iamVjdCwgYXJyYXlNYXAoYmFzZUZsYXR0ZW4ocHJvcHMsIDEpLCB0b0tleSkpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGljaztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gucGljay9pbmRleC5qcyIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyB0aGUgYFR5cGVFcnJvcmAgbWVzc2FnZSBmb3IgXCJGdW5jdGlvbnNcIiBtZXRob2RzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggcHJvcGVydHkgbmFtZXMgd2l0aGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlSXNEZWVwUHJvcCA9IC9cXC58XFxbKD86W15bXFxdXSp8KFtcIiddKSg/Oig/IVxcMSlbXlxcXFxdfFxcXFwuKSo/XFwxKVxcXS8sXG4gICAgcmVJc1BsYWluUHJvcCA9IC9eXFx3KiQvLFxuICAgIHJlTGVhZGluZ0RvdCA9IC9eXFwuLyxcbiAgICByZVByb3BOYW1lID0gL1teLltcXF1dK3xcXFsoPzooLT9cXGQrKD86XFwuXFxkKyk/KXwoW1wiJ10pKCg/Oig/IVxcMilbXlxcXFxdfFxcXFwuKSo/KVxcMilcXF18KD89KD86XFwufFxcW1xcXSkoPzpcXC58XFxbXFxdfCQpKS9nO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBiYWNrc2xhc2hlcyBpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciByZUVzY2FwZUNoYXIgPSAvXFxcXChcXFxcKT8vZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCBpbiBJRSA8IDkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0hvc3RPYmplY3QodmFsdWUpIHtcbiAgLy8gTWFueSBob3N0IG9iamVjdHMgYXJlIGBPYmplY3RgIG9iamVjdHMgdGhhdCBjYW4gY29lcmNlIHRvIHN0cmluZ3NcbiAgLy8gZGVzcGl0ZSBoYXZpbmcgaW1wcm9wZXJseSBkZWZpbmVkIGB0b1N0cmluZ2AgbWV0aG9kcy5cbiAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICBpZiAodmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUudG9TdHJpbmcgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSAhISh2YWx1ZSArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlLFxuICAgIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvdmVycmVhY2hpbmcgY29yZS1qcyBzaGltcy4gKi9cbnZhciBjb3JlSnNEYXRhID0gcm9vdFsnX19jb3JlLWpzX3NoYXJlZF9fJ107XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtZXRob2RzIG1hc3F1ZXJhZGluZyBhcyBuYXRpdmUuICovXG52YXIgbWFza1NyY0tleSA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHVpZCA9IC9bXi5dKyQvLmV4ZWMoY29yZUpzRGF0YSAmJiBjb3JlSnNEYXRhLmtleXMgJiYgY29yZUpzRGF0YS5rZXlzLklFX1BST1RPIHx8ICcnKTtcbiAgcmV0dXJuIHVpZCA/ICgnU3ltYm9sKHNyYylfMS4nICsgdWlkKSA6ICcnO1xufSgpKTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBmdW5jVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sLFxuICAgIHNwbGljZSA9IGFycmF5UHJvdG8uc3BsaWNlO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdNYXAnKSxcbiAgICBuYXRpdmVDcmVhdGUgPSBnZXROYXRpdmUoT2JqZWN0LCAnY3JlYXRlJyk7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xUb1N0cmluZyA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udG9TdHJpbmcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGhhc2ggb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBIYXNoKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKi9cbmZ1bmN0aW9uIGhhc2hDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5hdGl2ZUNyZWF0ZSA/IG5hdGl2ZUNyZWF0ZShudWxsKSA6IHt9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge09iamVjdH0gaGFzaCBUaGUgaGFzaCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaERlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIHRoaXMuaGFzKGtleSkgJiYgZGVsZXRlIHRoaXMuX19kYXRhX19ba2V5XTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBoYXNoIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGhhc2hHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKG5hdGl2ZUNyZWF0ZSkge1xuICAgIHZhciByZXN1bHQgPSBkYXRhW2tleV07XG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gSEFTSF9VTkRFRklORUQgPyB1bmRlZmluZWQgOiByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSA/IGRhdGFba2V5XSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBoYXNoIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoSGFzKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHJldHVybiBuYXRpdmVDcmVhdGUgPyBkYXRhW2tleV0gIT09IHVuZGVmaW5lZCA6IGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBoYXNoIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaGFzaCBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gaGFzaFNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgZGF0YVtrZXldID0gKG5hdGl2ZUNyZWF0ZSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IEhBU0hfVU5ERUZJTkVEIDogdmFsdWU7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgSGFzaGAuXG5IYXNoLnByb3RvdHlwZS5jbGVhciA9IGhhc2hDbGVhcjtcbkhhc2gucHJvdG90eXBlWydkZWxldGUnXSA9IGhhc2hEZWxldGU7XG5IYXNoLnByb3RvdHlwZS5nZXQgPSBoYXNoR2V0O1xuSGFzaC5wcm90b3R5cGUuaGFzID0gaGFzaEhhcztcbkhhc2gucHJvdG90eXBlLnNldCA9IGhhc2hTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBsaXN0IGNhY2hlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTGlzdENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBbXTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgIGRhdGEucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgcmV0dXJuIGluZGV4IDwgMCA/IHVuZGVmaW5lZCA6IGRhdGFbaW5kZXhdWzFdO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gYXNzb2NJbmRleE9mKHRoaXMuX19kYXRhX18sIGtleSkgPiAtMTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBsaXN0IGNhY2hlIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBsaXN0IGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICBkYXRhLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhW2luZGV4XVsxXSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTGlzdENhY2hlYC5cbkxpc3RDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBsaXN0Q2FjaGVDbGVhcjtcbkxpc3RDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbGlzdENhY2hlRGVsZXRlO1xuTGlzdENhY2hlLnByb3RvdHlwZS5nZXQgPSBsaXN0Q2FjaGVHZXQ7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmhhcyA9IGxpc3RDYWNoZUhhcztcbkxpc3RDYWNoZS5wcm90b3R5cGUuc2V0ID0gbGlzdENhY2hlU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXAgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTWFwQ2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IHtcbiAgICAnaGFzaCc6IG5ldyBIYXNoLFxuICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVEZWxldGUoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSlbJ2RlbGV0ZSddKGtleSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbWFwIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUdldChrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5nZXQoa2V5KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBtYXAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBtYXAgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbWFwIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIGdldE1hcERhdGEodGhpcywga2V5KS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTWFwQ2FjaGVgLlxuTWFwQ2FjaGUucHJvdG90eXBlLmNsZWFyID0gbWFwQ2FjaGVDbGVhcjtcbk1hcENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBtYXBDYWNoZURlbGV0ZTtcbk1hcENhY2hlLnByb3RvdHlwZS5nZXQgPSBtYXBDYWNoZUdldDtcbk1hcENhY2hlLnByb3RvdHlwZS5oYXMgPSBtYXBDYWNoZUhhcztcbk1hcENhY2hlLnByb3RvdHlwZS5zZXQgPSBtYXBDYWNoZVNldDtcblxuLyoqXG4gKiBHZXRzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgYGtleWAgaXMgZm91bmQgaW4gYGFycmF5YCBvZiBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSBrZXkgVGhlIGtleSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKGVxKGFycmF5W2xlbmd0aF1bMF0sIGtleSkpIHtcbiAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5nZXRgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVmYXVsdCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXQob2JqZWN0LCBwYXRoKSB7XG4gIHBhdGggPSBpc0tleShwYXRoLCBvYmplY3QpID8gW3BhdGhdIDogY2FzdFBhdGgocGF0aCk7XG5cbiAgdmFyIGluZGV4ID0gMCxcbiAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoO1xuXG4gIHdoaWxlIChvYmplY3QgIT0gbnVsbCAmJiBpbmRleCA8IGxlbmd0aCkge1xuICAgIG9iamVjdCA9IG9iamVjdFt0b0tleShwYXRoW2luZGV4KytdKV07XG4gIH1cbiAgcmV0dXJuIChpbmRleCAmJiBpbmRleCA9PSBsZW5ndGgpID8gb2JqZWN0IDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbixcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCBpc01hc2tlZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHBhdHRlcm4gPSAoaXNGdW5jdGlvbih2YWx1ZSkgfHwgaXNIb3N0T2JqZWN0KHZhbHVlKSkgPyByZUlzTmF0aXZlIDogcmVJc0hvc3RDdG9yO1xuICByZXR1cm4gcGF0dGVybi50ZXN0KHRvU291cmNlKHZhbHVlKSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udG9TdHJpbmdgIHdoaWNoIGRvZXNuJ3QgY29udmVydCBudWxsaXNoXG4gKiB2YWx1ZXMgdG8gZW1wdHkgc3RyaW5ncy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIC8vIEV4aXQgZWFybHkgZm9yIHN0cmluZ3MgdG8gYXZvaWQgYSBwZXJmb3JtYW5jZSBoaXQgaW4gc29tZSBlbnZpcm9ubWVudHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBzeW1ib2xUb1N0cmluZyA/IHN5bWJvbFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG4vKipcbiAqIENhc3RzIGB2YWx1ZWAgdG8gYSBwYXRoIGFycmF5IGlmIGl0J3Mgbm90IG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY2FzdCBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICovXG5mdW5jdGlvbiBjYXN0UGF0aCh2YWx1ZSkge1xuICByZXR1cm4gaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IHN0cmluZ1RvUGF0aCh2YWx1ZSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgZGF0YSBmb3IgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIHJlZmVyZW5jZSBrZXkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWFwIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGdldE1hcERhdGEobWFwLCBrZXkpIHtcbiAgdmFyIGRhdGEgPSBtYXAuX19kYXRhX187XG4gIHJldHVybiBpc0tleWFibGUoa2V5KVxuICAgID8gZGF0YVt0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8gJ3N0cmluZycgOiAnaGFzaCddXG4gICAgOiBkYXRhLm1hcDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHByb3BlcnR5IG5hbWUgYW5kIG5vdCBhIHByb3BlcnR5IHBhdGguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkga2V5cyBvbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvcGVydHkgbmFtZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleSh2YWx1ZSwgb2JqZWN0KSB7XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJyB8fFxuICAgICAgdmFsdWUgPT0gbnVsbCB8fCBpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gcmVJc1BsYWluUHJvcC50ZXN0KHZhbHVlKSB8fCAhcmVJc0RlZXBQcm9wLnRlc3QodmFsdWUpIHx8XG4gICAgKG9iamVjdCAhPSBudWxsICYmIHZhbHVlIGluIE9iamVjdChvYmplY3QpKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3IgdXNlIGFzIHVuaXF1ZSBvYmplY3Qga2V5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5YWJsZSh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICh0eXBlID09ICdzdHJpbmcnIHx8IHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJylcbiAgICA/ICh2YWx1ZSAhPT0gJ19fcHJvdG9fXycpXG4gICAgOiAodmFsdWUgPT09IG51bGwpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgZnVuY2AgaGFzIGl0cyBzb3VyY2UgbWFza2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgZnVuY2AgaXMgbWFza2VkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTWFza2VkKGZ1bmMpIHtcbiAgcmV0dXJuICEhbWFza1NyY0tleSAmJiAobWFza1NyY0tleSBpbiBmdW5jKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgc3RyaW5nYCB0byBhIHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICovXG52YXIgc3RyaW5nVG9QYXRoID0gbWVtb2l6ZShmdW5jdGlvbihzdHJpbmcpIHtcbiAgc3RyaW5nID0gdG9TdHJpbmcoc3RyaW5nKTtcblxuICB2YXIgcmVzdWx0ID0gW107XG4gIGlmIChyZUxlYWRpbmdEb3QudGVzdChzdHJpbmcpKSB7XG4gICAgcmVzdWx0LnB1c2goJycpO1xuICB9XG4gIHN0cmluZy5yZXBsYWNlKHJlUHJvcE5hbWUsIGZ1bmN0aW9uKG1hdGNoLCBudW1iZXIsIHF1b3RlLCBzdHJpbmcpIHtcbiAgICByZXN1bHQucHVzaChxdW90ZSA/IHN0cmluZy5yZXBsYWNlKHJlRXNjYXBlQ2hhciwgJyQxJykgOiAobnVtYmVyIHx8IG1hdGNoKSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufSk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyBrZXkgaWYgaXQncyBub3QgYSBzdHJpbmcgb3Igc3ltYm9sLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHJldHVybnMge3N0cmluZ3xzeW1ib2x9IFJldHVybnMgdGhlIGtleS5cbiAqL1xuZnVuY3Rpb24gdG9LZXkodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fCBpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgbWVtb2l6ZXMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuIElmIGByZXNvbHZlcmAgaXNcbiAqIHByb3ZpZGVkLCBpdCBkZXRlcm1pbmVzIHRoZSBjYWNoZSBrZXkgZm9yIHN0b3JpbmcgdGhlIHJlc3VsdCBiYXNlZCBvbiB0aGVcbiAqIGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24uIEJ5IGRlZmF1bHQsIHRoZSBmaXJzdCBhcmd1bWVudFxuICogcHJvdmlkZWQgdG8gdGhlIG1lbW9pemVkIGZ1bmN0aW9uIGlzIHVzZWQgYXMgdGhlIG1hcCBjYWNoZSBrZXkuIFRoZSBgZnVuY2BcbiAqIGlzIGludm9rZWQgd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgdGhlIG1lbW9pemVkIGZ1bmN0aW9uLlxuICpcbiAqICoqTm90ZToqKiBUaGUgY2FjaGUgaXMgZXhwb3NlZCBhcyB0aGUgYGNhY2hlYCBwcm9wZXJ0eSBvbiB0aGUgbWVtb2l6ZWRcbiAqIGZ1bmN0aW9uLiBJdHMgY3JlYXRpb24gbWF5IGJlIGN1c3RvbWl6ZWQgYnkgcmVwbGFjaW5nIHRoZSBgXy5tZW1vaXplLkNhY2hlYFxuICogY29uc3RydWN0b3Igd2l0aCBvbmUgd2hvc2UgaW5zdGFuY2VzIGltcGxlbWVudCB0aGVcbiAqIFtgTWFwYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcHJvcGVydGllcy1vZi10aGUtbWFwLXByb3RvdHlwZS1vYmplY3QpXG4gKiBtZXRob2QgaW50ZXJmYWNlIG9mIGBkZWxldGVgLCBgZ2V0YCwgYGhhc2AsIGFuZCBgc2V0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGhhdmUgaXRzIG91dHB1dCBtZW1vaXplZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZXNvbHZlcl0gVGhlIGZ1bmN0aW9uIHRvIHJlc29sdmUgdGhlIGNhY2hlIGtleS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IG1lbW9pemVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogMiB9O1xuICogdmFyIG90aGVyID0geyAnYyc6IDMsICdkJzogNCB9O1xuICpcbiAqIHZhciB2YWx1ZXMgPSBfLm1lbW9pemUoXy52YWx1ZXMpO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiB2YWx1ZXMob3RoZXIpO1xuICogLy8gPT4gWzMsIDRdXG4gKlxuICogb2JqZWN0LmEgPSAyO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiAvLyBNb2RpZnkgdGhlIHJlc3VsdCBjYWNoZS5cbiAqIHZhbHVlcy5jYWNoZS5zZXQob2JqZWN0LCBbJ2EnLCAnYiddKTtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWydhJywgJ2InXVxuICpcbiAqIC8vIFJlcGxhY2UgYF8ubWVtb2l6ZS5DYWNoZWAuXG4gKiBfLm1lbW9pemUuQ2FjaGUgPSBXZWFrTWFwO1xuICovXG5mdW5jdGlvbiBtZW1vaXplKGZ1bmMsIHJlc29sdmVyKSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nIHx8IChyZXNvbHZlciAmJiB0eXBlb2YgcmVzb2x2ZXIgIT0gJ2Z1bmN0aW9uJykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgdmFyIG1lbW9pemVkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGtleSA9IHJlc29sdmVyID8gcmVzb2x2ZXIuYXBwbHkodGhpcywgYXJncykgOiBhcmdzWzBdLFxuICAgICAgICBjYWNoZSA9IG1lbW9pemVkLmNhY2hlO1xuXG4gICAgaWYgKGNhY2hlLmhhcyhrZXkpKSB7XG4gICAgICByZXR1cm4gY2FjaGUuZ2V0KGtleSk7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIG1lbW9pemVkLmNhY2hlID0gY2FjaGUuc2V0KGtleSwgcmVzdWx0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBtZW1vaXplZC5jYWNoZSA9IG5ldyAobWVtb2l6ZS5DYWNoZSB8fCBNYXBDYWNoZSk7XG4gIHJldHVybiBtZW1vaXplZDtcbn1cblxuLy8gQXNzaWduIGNhY2hlIHRvIGBfLm1lbW9pemVgLlxubWVtb2l6ZS5DYWNoZSA9IE1hcENhY2hlO1xuXG4vKipcbiAqIFBlcmZvcm1zIGFcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiAxIH07XG4gKlxuICogXy5lcShvYmplY3QsIG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcSgnYScsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcSgnYScsIE9iamVjdCgnYScpKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcShOYU4sIE5hTik7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGVxKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gdmFsdWUgPT09IG90aGVyIHx8ICh2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOC05IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBpc09iamVjdCh2YWx1ZSkgPyBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZCBmb3IgYG51bGxgXG4gKiBhbmQgYHVuZGVmaW5lZGAgdmFsdWVzLiBUaGUgc2lnbiBvZiBgLTBgIGlzIHByZXNlcnZlZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b1N0cmluZyhudWxsKTtcbiAqIC8vID0+ICcnXG4gKlxuICogXy50b1N0cmluZygtMCk7XG4gKiAvLyA9PiAnLTAnXG4gKlxuICogXy50b1N0cmluZyhbMSwgMiwgM10pO1xuICogLy8gPT4gJzEsMiwzJ1xuICovXG5mdW5jdGlvbiB0b1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogYmFzZVRvU3RyaW5nKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBgcGF0aGAgb2YgYG9iamVjdGAuIElmIHRoZSByZXNvbHZlZCB2YWx1ZSBpc1xuICogYHVuZGVmaW5lZGAsIHRoZSBgZGVmYXVsdFZhbHVlYCBpcyByZXR1cm5lZCBpbiBpdHMgcGxhY2UuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjcuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEBwYXJhbSB7Kn0gW2RlZmF1bHRWYWx1ZV0gVGhlIHZhbHVlIHJldHVybmVkIGZvciBgdW5kZWZpbmVkYCByZXNvbHZlZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogW3sgJ2InOiB7ICdjJzogMyB9IH1dIH07XG4gKlxuICogXy5nZXQob2JqZWN0LCAnYVswXS5iLmMnKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLmdldChvYmplY3QsIFsnYScsICcwJywgJ2InLCAnYyddKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLmdldChvYmplY3QsICdhLmIuYycsICdkZWZhdWx0Jyk7XG4gKiAvLyA9PiAnZGVmYXVsdCdcbiAqL1xuZnVuY3Rpb24gZ2V0KG9iamVjdCwgcGF0aCwgZGVmYXVsdFZhbHVlKSB7XG4gIHZhciByZXN1bHQgPSBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IGJhc2VHZXQob2JqZWN0LCBwYXRoKTtcbiAgcmV0dXJuIHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdFZhbHVlIDogcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2guZ2V0L2luZGV4LmpzIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBgVHlwZUVycm9yYCBtZXNzYWdlIGZvciBcIkZ1bmN0aW9uc1wiIG1ldGhvZHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDAsXG4gICAgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBwcm9wZXJ0eSBuYW1lcyB3aXRoaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVJc0RlZXBQcm9wID0gL1xcLnxcXFsoPzpbXltcXF1dKnwoW1wiJ10pKD86KD8hXFwxKVteXFxcXF18XFxcXC4pKj9cXDEpXFxdLyxcbiAgICByZUlzUGxhaW5Qcm9wID0gL15cXHcqJC8sXG4gICAgcmVMZWFkaW5nRG90ID0gL15cXC4vLFxuICAgIHJlUHJvcE5hbWUgPSAvW14uW1xcXV0rfFxcWyg/OigtP1xcZCsoPzpcXC5cXGQrKT8pfChbXCInXSkoKD86KD8hXFwyKVteXFxcXF18XFxcXC4pKj8pXFwyKVxcXXwoPz0oPzpcXC58XFxbXFxdKSg/OlxcLnxcXFtcXF18JCkpL2c7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2c7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGJhY2tzbGFzaGVzIGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlRXNjYXBlQ2hhciA9IC9cXFxcKFxcXFwpPy9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBnZXRWYWx1ZShvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0IGluIElFIDwgOS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSG9zdE9iamVjdCh2YWx1ZSkge1xuICAvLyBNYW55IGhvc3Qgb2JqZWN0cyBhcmUgYE9iamVjdGAgb2JqZWN0cyB0aGF0IGNhbiBjb2VyY2UgdG8gc3RyaW5nc1xuICAvLyBkZXNwaXRlIGhhdmluZyBpbXByb3Blcmx5IGRlZmluZWQgYHRvU3RyaW5nYCBtZXRob2RzLlxuICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gIGlmICh2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZS50b1N0cmluZyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9ICEhKHZhbHVlICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsXG4gICAgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbnZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdWlkID0gL1teLl0rJC8uZXhlYyhjb3JlSnNEYXRhICYmIGNvcmVKc0RhdGEua2V5cyAmJiBjb3JlSnNEYXRhLmtleXMuSUVfUFJPVE8gfHwgJycpO1xuICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG59KCkpO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2wsXG4gICAgc3BsaWNlID0gYXJyYXlQcm90by5zcGxpY2U7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpLFxuICAgIG5hdGl2ZUNyZWF0ZSA9IGdldE5hdGl2ZShPYmplY3QsICdjcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFRvU3RyaW5nID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by50b1N0cmluZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgaGFzaCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIEhhc2goZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIEhhc2hcbiAqL1xuZnVuY3Rpb24gaGFzaENsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmF0aXZlQ3JlYXRlID8gbmF0aXZlQ3JlYXRlKG51bGwpIDoge307XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoRGVsZXRlKGtleSkge1xuICByZXR1cm4gdGhpcy5oYXMoa2V5KSAmJiBkZWxldGUgdGhpcy5fX2RhdGFfX1trZXldO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGhhc2ggdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gaGFzaEdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAobmF0aXZlQ3JlYXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRhdGFba2V5XTtcbiAgICByZXR1cm4gcmVzdWx0ID09PSBIQVNIX1VOREVGSU5FRCA/IHVuZGVmaW5lZCA6IHJlc3VsdDtcbiAgfVxuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpID8gZGF0YVtrZXldIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGhhc2ggdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hIYXMoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgcmV0dXJuIG5hdGl2ZUNyZWF0ZSA/IGRhdGFba2V5XSAhPT0gdW5kZWZpbmVkIDogaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBoYXNoIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQgOiB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBIYXNoYC5cbkhhc2gucHJvdG90eXBlLmNsZWFyID0gaGFzaENsZWFyO1xuSGFzaC5wcm90b3R5cGVbJ2RlbGV0ZSddID0gaGFzaERlbGV0ZTtcbkhhc2gucHJvdG90eXBlLmdldCA9IGhhc2hHZXQ7XG5IYXNoLnByb3RvdHlwZS5oYXMgPSBoYXNoSGFzO1xuSGFzaC5wcm90b3R5cGUuc2V0ID0gaGFzaFNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGxpc3QgY2FjaGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBMaXN0Q2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IFtdO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgbGFzdEluZGV4ID0gZGF0YS5sZW5ndGggLSAxO1xuICBpZiAoaW5kZXggPT0gbGFzdEluZGV4KSB7XG4gICAgZGF0YS5wb3AoKTtcbiAgfSBlbHNlIHtcbiAgICBzcGxpY2UuY2FsbChkYXRhLCBpbmRleCwgMSk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogZGF0YVtpbmRleF1bMV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBhc3NvY0luZGV4T2YodGhpcy5fX2RhdGFfXywga2V5KSA+IC0xO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGxpc3QgY2FjaGUgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGxpc3QgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIGRhdGEucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9IGVsc2Uge1xuICAgIGRhdGFbaW5kZXhdWzFdID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBMaXN0Q2FjaGVgLlxuTGlzdENhY2hlLnByb3RvdHlwZS5jbGVhciA9IGxpc3RDYWNoZUNsZWFyO1xuTGlzdENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBsaXN0Q2FjaGVEZWxldGU7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmdldCA9IGxpc3RDYWNoZUdldDtcbkxpc3RDYWNoZS5wcm90b3R5cGUuaGFzID0gbGlzdENhY2hlSGFzO1xuTGlzdENhY2hlLnByb3RvdHlwZS5zZXQgPSBsaXN0Q2FjaGVTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcCBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBNYXBDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0ge1xuICAgICdoYXNoJzogbmV3IEhhc2gsXG4gICAgJ21hcCc6IG5ldyAoTWFwIHx8IExpc3RDYWNoZSksXG4gICAgJ3N0cmluZyc6IG5ldyBIYXNoXG4gIH07XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZURlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KVsnZGVsZXRlJ10oa2V5KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBtYXAgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlR2V0KGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmdldChrZXkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIG1hcCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIG1hcCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBtYXAgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLnNldChrZXksIHZhbHVlKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBNYXBDYWNoZWAuXG5NYXBDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBtYXBDYWNoZUNsZWFyO1xuTWFwQ2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IG1hcENhY2hlRGVsZXRlO1xuTWFwQ2FjaGUucHJvdG90eXBlLmdldCA9IG1hcENhY2hlR2V0O1xuTWFwQ2FjaGUucHJvdG90eXBlLmhhcyA9IG1hcENhY2hlSGFzO1xuTWFwQ2FjaGUucHJvdG90eXBlLnNldCA9IG1hcENhY2hlU2V0O1xuXG4vKipcbiAqIEFzc2lnbnMgYHZhbHVlYCB0byBga2V5YCBvZiBgb2JqZWN0YCBpZiB0aGUgZXhpc3RpbmcgdmFsdWUgaXMgbm90IGVxdWl2YWxlbnRcbiAqIHVzaW5nIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldO1xuICBpZiAoIShoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBlcShvYmpWYWx1ZSwgdmFsdWUpKSB8fFxuICAgICAgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG59XG5cbi8qKlxuICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGBrZXlgIGlzIGZvdW5kIGluIGBhcnJheWAgb2Yga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0ga2V5IFRoZSBrZXkgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGFzc29jSW5kZXhPZihhcnJheSwga2V5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChlcShhcnJheVtsZW5ndGhdWzBdLCBrZXkpKSB7XG4gICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYXRpdmVgIHdpdGhvdXQgYmFkIHNoaW0gY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IChpc0Z1bmN0aW9uKHZhbHVlKSB8fCBpc0hvc3RPYmplY3QodmFsdWUpKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5zZXRgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIHBhdGggY3JlYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlU2V0KG9iamVjdCwgcGF0aCwgdmFsdWUsIGN1c3RvbWl6ZXIpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuICBwYXRoID0gaXNLZXkocGF0aCwgb2JqZWN0KSA/IFtwYXRoXSA6IGNhc3RQYXRoKHBhdGgpO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGgsXG4gICAgICBsYXN0SW5kZXggPSBsZW5ndGggLSAxLFxuICAgICAgbmVzdGVkID0gb2JqZWN0O1xuXG4gIHdoaWxlIChuZXN0ZWQgIT0gbnVsbCAmJiArK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHRvS2V5KHBhdGhbaW5kZXhdKSxcbiAgICAgICAgbmV3VmFsdWUgPSB2YWx1ZTtcblxuICAgIGlmIChpbmRleCAhPSBsYXN0SW5kZXgpIHtcbiAgICAgIHZhciBvYmpWYWx1ZSA9IG5lc3RlZFtrZXldO1xuICAgICAgbmV3VmFsdWUgPSBjdXN0b21pemVyID8gY3VzdG9taXplcihvYmpWYWx1ZSwga2V5LCBuZXN0ZWQpIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKG5ld1ZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBpc09iamVjdChvYmpWYWx1ZSlcbiAgICAgICAgICA/IG9ialZhbHVlXG4gICAgICAgICAgOiAoaXNJbmRleChwYXRoW2luZGV4ICsgMV0pID8gW10gOiB7fSk7XG4gICAgICB9XG4gICAgfVxuICAgIGFzc2lnblZhbHVlKG5lc3RlZCwga2V5LCBuZXdWYWx1ZSk7XG4gICAgbmVzdGVkID0gbmVzdGVkW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50b1N0cmluZ2Agd2hpY2ggZG9lc24ndCBjb252ZXJ0IG51bGxpc2hcbiAqIHZhbHVlcyB0byBlbXB0eSBzdHJpbmdzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgLy8gRXhpdCBlYXJseSBmb3Igc3RyaW5ncyB0byBhdm9pZCBhIHBlcmZvcm1hbmNlIGhpdCBpbiBzb21lIGVudmlyb25tZW50cy5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHN5bWJvbFRvU3RyaW5nID8gc3ltYm9sVG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ2FzdHMgYHZhbHVlYCB0byBhIHBhdGggYXJyYXkgaWYgaXQncyBub3Qgb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjYXN0IHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGNhc3RQYXRoKHZhbHVlKSB7XG4gIHJldHVybiBpc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogc3RyaW5nVG9QYXRoKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBkYXRhIGZvciBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgcmVmZXJlbmNlIGtleS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXAgZGF0YS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFwRGF0YShtYXAsIGtleSkge1xuICB2YXIgZGF0YSA9IG1hcC5fX2RhdGFfXztcbiAgcmV0dXJuIGlzS2V5YWJsZShrZXkpXG4gICAgPyBkYXRhW3R5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyAnc3RyaW5nJyA6ICdoYXNoJ11cbiAgICA6IGRhdGEubWFwO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZ2V0VmFsdWUob2JqZWN0LCBrZXkpO1xuICByZXR1cm4gYmFzZUlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiAhIWxlbmd0aCAmJlxuICAgICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHwgcmVJc1VpbnQudGVzdCh2YWx1ZSkpICYmXG4gICAgKHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGgpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcHJvcGVydHkgbmFtZSBhbmQgbm90IGEgcHJvcGVydHkgcGF0aC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeSBrZXlzIG9uLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm9wZXJ0eSBuYW1lLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5KHZhbHVlLCBvYmplY3QpIHtcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nIHx8XG4gICAgICB2YWx1ZSA9PSBudWxsIHx8IGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiByZUlzUGxhaW5Qcm9wLnRlc3QodmFsdWUpIHx8ICFyZUlzRGVlcFByb3AudGVzdCh2YWx1ZSkgfHxcbiAgICAob2JqZWN0ICE9IG51bGwgJiYgdmFsdWUgaW4gT2JqZWN0KG9iamVjdCkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciB1c2UgYXMgdW5pcXVlIG9iamVjdCBrZXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXlhYmxlKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKVxuICAgID8gKHZhbHVlICE9PSAnX19wcm90b19fJylcbiAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBzdHJpbmdgIHRvIGEgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKi9cbnZhciBzdHJpbmdUb1BhdGggPSBtZW1vaXplKGZ1bmN0aW9uKHN0cmluZykge1xuICBzdHJpbmcgPSB0b1N0cmluZyhzdHJpbmcpO1xuXG4gIHZhciByZXN1bHQgPSBbXTtcbiAgaWYgKHJlTGVhZGluZ0RvdC50ZXN0KHN0cmluZykpIHtcbiAgICByZXN1bHQucHVzaCgnJyk7XG4gIH1cbiAgc3RyaW5nLnJlcGxhY2UocmVQcm9wTmFtZSwgZnVuY3Rpb24obWF0Y2gsIG51bWJlciwgcXVvdGUsIHN0cmluZykge1xuICAgIHJlc3VsdC5wdXNoKHF1b3RlID8gc3RyaW5nLnJlcGxhY2UocmVFc2NhcGVDaGFyLCAnJDEnKSA6IChudW1iZXIgfHwgbWF0Y2gpKTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59KTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGtleSBpZiBpdCdzIG5vdCBhIHN0cmluZyBvciBzeW1ib2wuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7c3RyaW5nfHN5bWJvbH0gUmV0dXJucyB0aGUga2V5LlxuICovXG5mdW5jdGlvbiB0b0tleSh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8IGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ29udmVydHMgYGZ1bmNgIHRvIGl0cyBzb3VyY2UgY29kZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHNvdXJjZSBjb2RlLlxuICovXG5mdW5jdGlvbiB0b1NvdXJjZShmdW5jKSB7XG4gIGlmIChmdW5jICE9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmNUb1N0cmluZy5jYWxsKGZ1bmMpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoZnVuYyArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBtZW1vaXplcyB0aGUgcmVzdWx0IG9mIGBmdW5jYC4gSWYgYHJlc29sdmVyYCBpc1xuICogcHJvdmlkZWQsIGl0IGRldGVybWluZXMgdGhlIGNhY2hlIGtleSBmb3Igc3RvcmluZyB0aGUgcmVzdWx0IGJhc2VkIG9uIHRoZVxuICogYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBtZW1vaXplZCBmdW5jdGlvbi4gQnkgZGVmYXVsdCwgdGhlIGZpcnN0IGFyZ3VtZW50XG4gKiBwcm92aWRlZCB0byB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24gaXMgdXNlZCBhcyB0aGUgbWFwIGNhY2hlIGtleS4gVGhlIGBmdW5jYFxuICogaXMgaW52b2tlZCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24uXG4gKlxuICogKipOb3RlOioqIFRoZSBjYWNoZSBpcyBleHBvc2VkIGFzIHRoZSBgY2FjaGVgIHByb3BlcnR5IG9uIHRoZSBtZW1vaXplZFxuICogZnVuY3Rpb24uIEl0cyBjcmVhdGlvbiBtYXkgYmUgY3VzdG9taXplZCBieSByZXBsYWNpbmcgdGhlIGBfLm1lbW9pemUuQ2FjaGVgXG4gKiBjb25zdHJ1Y3RvciB3aXRoIG9uZSB3aG9zZSBpbnN0YW5jZXMgaW1wbGVtZW50IHRoZVxuICogW2BNYXBgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wcm9wZXJ0aWVzLW9mLXRoZS1tYXAtcHJvdG90eXBlLW9iamVjdClcbiAqIG1ldGhvZCBpbnRlcmZhY2Ugb2YgYGRlbGV0ZWAsIGBnZXRgLCBgaGFzYCwgYW5kIGBzZXRgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaGF2ZSBpdHMgb3V0cHV0IG1lbW9pemVkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3Jlc29sdmVyXSBUaGUgZnVuY3Rpb24gdG8gcmVzb2x2ZSB0aGUgY2FjaGUga2V5LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgbWVtb2l6ZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSwgJ2InOiAyIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdjJzogMywgJ2QnOiA0IH07XG4gKlxuICogdmFyIHZhbHVlcyA9IF8ubWVtb2l6ZShfLnZhbHVlcyk7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIHZhbHVlcyhvdGhlcik7XG4gKiAvLyA9PiBbMywgNF1cbiAqXG4gKiBvYmplY3QuYSA9IDI7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIC8vIE1vZGlmeSB0aGUgcmVzdWx0IGNhY2hlLlxuICogdmFsdWVzLmNhY2hlLnNldChvYmplY3QsIFsnYScsICdiJ10pO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddXG4gKlxuICogLy8gUmVwbGFjZSBgXy5tZW1vaXplLkNhY2hlYC5cbiAqIF8ubWVtb2l6ZS5DYWNoZSA9IFdlYWtNYXA7XG4gKi9cbmZ1bmN0aW9uIG1lbW9pemUoZnVuYywgcmVzb2x2ZXIpIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicgfHwgKHJlc29sdmVyICYmIHR5cGVvZiByZXNvbHZlciAhPSAnZnVuY3Rpb24nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB2YXIgbWVtb2l6ZWQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAga2V5ID0gcmVzb2x2ZXIgPyByZXNvbHZlci5hcHBseSh0aGlzLCBhcmdzKSA6IGFyZ3NbMF0sXG4gICAgICAgIGNhY2hlID0gbWVtb2l6ZWQuY2FjaGU7XG5cbiAgICBpZiAoY2FjaGUuaGFzKGtleSkpIHtcbiAgICAgIHJldHVybiBjYWNoZS5nZXQoa2V5KTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgbWVtb2l6ZWQuY2FjaGUgPSBjYWNoZS5zZXQoa2V5LCByZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIG1lbW9pemVkLmNhY2hlID0gbmV3IChtZW1vaXplLkNhY2hlIHx8IE1hcENhY2hlKTtcbiAgcmV0dXJuIG1lbW9pemVkO1xufVxuXG4vLyBBc3NpZ24gY2FjaGUgdG8gYF8ubWVtb2l6ZWAuXG5tZW1vaXplLkNhY2hlID0gTWFwQ2FjaGU7XG5cbi8qKlxuICogUGVyZm9ybXMgYVxuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA4LTkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZy4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkIGZvciBgbnVsbGBcbiAqIGFuZCBgdW5kZWZpbmVkYCB2YWx1ZXMuIFRoZSBzaWduIG9mIGAtMGAgaXMgcHJlc2VydmVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvU3RyaW5nKG51bGwpO1xuICogLy8gPT4gJydcbiAqXG4gKiBfLnRvU3RyaW5nKC0wKTtcbiAqIC8vID0+ICctMCdcbiAqXG4gKiBfLnRvU3RyaW5nKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAnMSwyLDMnXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiBiYXNlVG9TdHJpbmcodmFsdWUpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIHZhbHVlIGF0IGBwYXRoYCBvZiBgb2JqZWN0YC4gSWYgYSBwb3J0aW9uIG9mIGBwYXRoYCBkb2Vzbid0IGV4aXN0LFxuICogaXQncyBjcmVhdGVkLiBBcnJheXMgYXJlIGNyZWF0ZWQgZm9yIG1pc3NpbmcgaW5kZXggcHJvcGVydGllcyB3aGlsZSBvYmplY3RzXG4gKiBhcmUgY3JlYXRlZCBmb3IgYWxsIG90aGVyIG1pc3NpbmcgcHJvcGVydGllcy4gVXNlIGBfLnNldFdpdGhgIHRvIGN1c3RvbWl6ZVxuICogYHBhdGhgIGNyZWF0aW9uLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBtdXRhdGVzIGBvYmplY3RgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy43LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiBbeyAnYic6IHsgJ2MnOiAzIH0gfV0gfTtcbiAqXG4gKiBfLnNldChvYmplY3QsICdhWzBdLmIuYycsIDQpO1xuICogY29uc29sZS5sb2cob2JqZWN0LmFbMF0uYi5jKTtcbiAqIC8vID0+IDRcbiAqXG4gKiBfLnNldChvYmplY3QsIFsneCcsICcwJywgJ3knLCAneiddLCA1KTtcbiAqIGNvbnNvbGUubG9nKG9iamVjdC54WzBdLnkueik7XG4gKiAvLyA9PiA1XG4gKi9cbmZ1bmN0aW9uIHNldChvYmplY3QsIHBhdGgsIHZhbHVlKSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IG9iamVjdCA6IGJhc2VTZXQob2JqZWN0LCBwYXRoLCB2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC5zZXQvaW5kZXguanMiLCIndXNlIHN0cmljdCc7XG5cbnZhciBkICAgICAgICA9IHJlcXVpcmUoJ2QnKVxuICAsIGNhbGxhYmxlID0gcmVxdWlyZSgnZXM1LWV4dC9vYmplY3QvdmFsaWQtY2FsbGFibGUnKVxuXG4gICwgYXBwbHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHksIGNhbGwgPSBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbFxuICAsIGNyZWF0ZSA9IE9iamVjdC5jcmVhdGUsIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5XG4gICwgZGVmaW5lUHJvcGVydGllcyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzXG4gICwgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5XG4gICwgZGVzY3JpcHRvciA9IHsgY29uZmlndXJhYmxlOiB0cnVlLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUgfVxuXG4gICwgb24sIG9uY2UsIG9mZiwgZW1pdCwgbWV0aG9kcywgZGVzY3JpcHRvcnMsIGJhc2U7XG5cbm9uID0gZnVuY3Rpb24gKHR5cGUsIGxpc3RlbmVyKSB7XG5cdHZhciBkYXRhO1xuXG5cdGNhbGxhYmxlKGxpc3RlbmVyKTtcblxuXHRpZiAoIWhhc093blByb3BlcnR5LmNhbGwodGhpcywgJ19fZWVfXycpKSB7XG5cdFx0ZGF0YSA9IGRlc2NyaXB0b3IudmFsdWUgPSBjcmVhdGUobnVsbCk7XG5cdFx0ZGVmaW5lUHJvcGVydHkodGhpcywgJ19fZWVfXycsIGRlc2NyaXB0b3IpO1xuXHRcdGRlc2NyaXB0b3IudmFsdWUgPSBudWxsO1xuXHR9IGVsc2Uge1xuXHRcdGRhdGEgPSB0aGlzLl9fZWVfXztcblx0fVxuXHRpZiAoIWRhdGFbdHlwZV0pIGRhdGFbdHlwZV0gPSBsaXN0ZW5lcjtcblx0ZWxzZSBpZiAodHlwZW9mIGRhdGFbdHlwZV0gPT09ICdvYmplY3QnKSBkYXRhW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuXHRlbHNlIGRhdGFbdHlwZV0gPSBbZGF0YVt0eXBlXSwgbGlzdGVuZXJdO1xuXG5cdHJldHVybiB0aGlzO1xufTtcblxub25jZSA9IGZ1bmN0aW9uICh0eXBlLCBsaXN0ZW5lcikge1xuXHR2YXIgb25jZSwgc2VsZjtcblxuXHRjYWxsYWJsZShsaXN0ZW5lcik7XG5cdHNlbGYgPSB0aGlzO1xuXHRvbi5jYWxsKHRoaXMsIHR5cGUsIG9uY2UgPSBmdW5jdGlvbiAoKSB7XG5cdFx0b2ZmLmNhbGwoc2VsZiwgdHlwZSwgb25jZSk7XG5cdFx0YXBwbHkuY2FsbChsaXN0ZW5lciwgdGhpcywgYXJndW1lbnRzKTtcblx0fSk7XG5cblx0b25jZS5fX2VlT25jZUxpc3RlbmVyX18gPSBsaXN0ZW5lcjtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG5vZmYgPSBmdW5jdGlvbiAodHlwZSwgbGlzdGVuZXIpIHtcblx0dmFyIGRhdGEsIGxpc3RlbmVycywgY2FuZGlkYXRlLCBpO1xuXG5cdGNhbGxhYmxlKGxpc3RlbmVyKTtcblxuXHRpZiAoIWhhc093blByb3BlcnR5LmNhbGwodGhpcywgJ19fZWVfXycpKSByZXR1cm4gdGhpcztcblx0ZGF0YSA9IHRoaXMuX19lZV9fO1xuXHRpZiAoIWRhdGFbdHlwZV0pIHJldHVybiB0aGlzO1xuXHRsaXN0ZW5lcnMgPSBkYXRhW3R5cGVdO1xuXG5cdGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnb2JqZWN0Jykge1xuXHRcdGZvciAoaSA9IDA7IChjYW5kaWRhdGUgPSBsaXN0ZW5lcnNbaV0pOyArK2kpIHtcblx0XHRcdGlmICgoY2FuZGlkYXRlID09PSBsaXN0ZW5lcikgfHxcblx0XHRcdFx0XHQoY2FuZGlkYXRlLl9fZWVPbmNlTGlzdGVuZXJfXyA9PT0gbGlzdGVuZXIpKSB7XG5cdFx0XHRcdGlmIChsaXN0ZW5lcnMubGVuZ3RoID09PSAyKSBkYXRhW3R5cGVdID0gbGlzdGVuZXJzW2kgPyAwIDogMV07XG5cdFx0XHRcdGVsc2UgbGlzdGVuZXJzLnNwbGljZShpLCAxKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0aWYgKChsaXN0ZW5lcnMgPT09IGxpc3RlbmVyKSB8fFxuXHRcdFx0XHQobGlzdGVuZXJzLl9fZWVPbmNlTGlzdGVuZXJfXyA9PT0gbGlzdGVuZXIpKSB7XG5cdFx0XHRkZWxldGUgZGF0YVt0eXBlXTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbmVtaXQgPSBmdW5jdGlvbiAodHlwZSkge1xuXHR2YXIgaSwgbCwgbGlzdGVuZXIsIGxpc3RlbmVycywgYXJncztcblxuXHRpZiAoIWhhc093blByb3BlcnR5LmNhbGwodGhpcywgJ19fZWVfXycpKSByZXR1cm47XG5cdGxpc3RlbmVycyA9IHRoaXMuX19lZV9fW3R5cGVdO1xuXHRpZiAoIWxpc3RlbmVycykgcmV0dXJuO1xuXG5cdGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnb2JqZWN0Jykge1xuXHRcdGwgPSBhcmd1bWVudHMubGVuZ3RoO1xuXHRcdGFyZ3MgPSBuZXcgQXJyYXkobCAtIDEpO1xuXHRcdGZvciAoaSA9IDE7IGkgPCBsOyArK2kpIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0bGlzdGVuZXJzID0gbGlzdGVuZXJzLnNsaWNlKCk7XG5cdFx0Zm9yIChpID0gMDsgKGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldKTsgKytpKSB7XG5cdFx0XHRhcHBseS5jYWxsKGxpc3RlbmVyLCB0aGlzLCBhcmdzKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0c3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0Y2FzZSAxOlxuXHRcdFx0Y2FsbC5jYWxsKGxpc3RlbmVycywgdGhpcyk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDI6XG5cdFx0XHRjYWxsLmNhbGwobGlzdGVuZXJzLCB0aGlzLCBhcmd1bWVudHNbMV0pO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAzOlxuXHRcdFx0Y2FsbC5jYWxsKGxpc3RlbmVycywgdGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdGwgPSBhcmd1bWVudHMubGVuZ3RoO1xuXHRcdFx0YXJncyA9IG5ldyBBcnJheShsIC0gMSk7XG5cdFx0XHRmb3IgKGkgPSAxOyBpIDwgbDsgKytpKSB7XG5cdFx0XHRcdGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0fVxuXHRcdFx0YXBwbHkuY2FsbChsaXN0ZW5lcnMsIHRoaXMsIGFyZ3MpO1xuXHRcdH1cblx0fVxufTtcblxubWV0aG9kcyA9IHtcblx0b246IG9uLFxuXHRvbmNlOiBvbmNlLFxuXHRvZmY6IG9mZixcblx0ZW1pdDogZW1pdFxufTtcblxuZGVzY3JpcHRvcnMgPSB7XG5cdG9uOiBkKG9uKSxcblx0b25jZTogZChvbmNlKSxcblx0b2ZmOiBkKG9mZiksXG5cdGVtaXQ6IGQoZW1pdClcbn07XG5cbmJhc2UgPSBkZWZpbmVQcm9wZXJ0aWVzKHt9LCBkZXNjcmlwdG9ycyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZ1bmN0aW9uIChvKSB7XG5cdHJldHVybiAobyA9PSBudWxsKSA/IGNyZWF0ZShiYXNlKSA6IGRlZmluZVByb3BlcnRpZXMoT2JqZWN0KG8pLCBkZXNjcmlwdG9ycyk7XG59O1xuZXhwb3J0cy5tZXRob2RzID0gbWV0aG9kcztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9ldmVudC1lbWl0dGVyL2luZGV4LmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXNzaWduICAgICAgICA9IHJlcXVpcmUoJ2VzNS1leHQvb2JqZWN0L2Fzc2lnbicpXG4gICwgbm9ybWFsaXplT3B0cyA9IHJlcXVpcmUoJ2VzNS1leHQvb2JqZWN0L25vcm1hbGl6ZS1vcHRpb25zJylcbiAgLCBpc0NhbGxhYmxlICAgID0gcmVxdWlyZSgnZXM1LWV4dC9vYmplY3QvaXMtY2FsbGFibGUnKVxuICAsIGNvbnRhaW5zICAgICAgPSByZXF1aXJlKCdlczUtZXh0L3N0cmluZy8jL2NvbnRhaW5zJylcblxuICAsIGQ7XG5cbmQgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkc2NyLCB2YWx1ZS8qLCBvcHRpb25zKi8pIHtcblx0dmFyIGMsIGUsIHcsIG9wdGlvbnMsIGRlc2M7XG5cdGlmICgoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHx8ICh0eXBlb2YgZHNjciAhPT0gJ3N0cmluZycpKSB7XG5cdFx0b3B0aW9ucyA9IHZhbHVlO1xuXHRcdHZhbHVlID0gZHNjcjtcblx0XHRkc2NyID0gbnVsbDtcblx0fSBlbHNlIHtcblx0XHRvcHRpb25zID0gYXJndW1lbnRzWzJdO1xuXHR9XG5cdGlmIChkc2NyID09IG51bGwpIHtcblx0XHRjID0gdyA9IHRydWU7XG5cdFx0ZSA9IGZhbHNlO1xuXHR9IGVsc2Uge1xuXHRcdGMgPSBjb250YWlucy5jYWxsKGRzY3IsICdjJyk7XG5cdFx0ZSA9IGNvbnRhaW5zLmNhbGwoZHNjciwgJ2UnKTtcblx0XHR3ID0gY29udGFpbnMuY2FsbChkc2NyLCAndycpO1xuXHR9XG5cblx0ZGVzYyA9IHsgdmFsdWU6IHZhbHVlLCBjb25maWd1cmFibGU6IGMsIGVudW1lcmFibGU6IGUsIHdyaXRhYmxlOiB3IH07XG5cdHJldHVybiAhb3B0aW9ucyA/IGRlc2MgOiBhc3NpZ24obm9ybWFsaXplT3B0cyhvcHRpb25zKSwgZGVzYyk7XG59O1xuXG5kLmdzID0gZnVuY3Rpb24gKGRzY3IsIGdldCwgc2V0LyosIG9wdGlvbnMqLykge1xuXHR2YXIgYywgZSwgb3B0aW9ucywgZGVzYztcblx0aWYgKHR5cGVvZiBkc2NyICE9PSAnc3RyaW5nJykge1xuXHRcdG9wdGlvbnMgPSBzZXQ7XG5cdFx0c2V0ID0gZ2V0O1xuXHRcdGdldCA9IGRzY3I7XG5cdFx0ZHNjciA9IG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0b3B0aW9ucyA9IGFyZ3VtZW50c1szXTtcblx0fVxuXHRpZiAoZ2V0ID09IG51bGwpIHtcblx0XHRnZXQgPSB1bmRlZmluZWQ7XG5cdH0gZWxzZSBpZiAoIWlzQ2FsbGFibGUoZ2V0KSkge1xuXHRcdG9wdGlvbnMgPSBnZXQ7XG5cdFx0Z2V0ID0gc2V0ID0gdW5kZWZpbmVkO1xuXHR9IGVsc2UgaWYgKHNldCA9PSBudWxsKSB7XG5cdFx0c2V0ID0gdW5kZWZpbmVkO1xuXHR9IGVsc2UgaWYgKCFpc0NhbGxhYmxlKHNldCkpIHtcblx0XHRvcHRpb25zID0gc2V0O1xuXHRcdHNldCA9IHVuZGVmaW5lZDtcblx0fVxuXHRpZiAoZHNjciA9PSBudWxsKSB7XG5cdFx0YyA9IHRydWU7XG5cdFx0ZSA9IGZhbHNlO1xuXHR9IGVsc2Uge1xuXHRcdGMgPSBjb250YWlucy5jYWxsKGRzY3IsICdjJyk7XG5cdFx0ZSA9IGNvbnRhaW5zLmNhbGwoZHNjciwgJ2UnKTtcblx0fVxuXG5cdGRlc2MgPSB7IGdldDogZ2V0LCBzZXQ6IHNldCwgY29uZmlndXJhYmxlOiBjLCBlbnVtZXJhYmxlOiBlIH07XG5cdHJldHVybiAhb3B0aW9ucyA/IGRlc2MgOiBhc3NpZ24obm9ybWFsaXplT3B0cyhvcHRpb25zKSwgZGVzYyk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2QvaW5kZXguanMiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9pcy1pbXBsZW1lbnRlZFwiKSgpXG5cdD8gT2JqZWN0LmFzc2lnblxuXHQ6IHJlcXVpcmUoXCIuL3NoaW1cIik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvYXNzaWduL2luZGV4LmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgYXNzaWduID0gT2JqZWN0LmFzc2lnbiwgb2JqO1xuXHRpZiAodHlwZW9mIGFzc2lnbiAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gZmFsc2U7XG5cdG9iaiA9IHsgZm9vOiBcInJhelwiIH07XG5cdGFzc2lnbihvYmosIHsgYmFyOiBcImR3YVwiIH0sIHsgdHJ6eTogXCJ0cnp5XCIgfSk7XG5cdHJldHVybiAob2JqLmZvbyArIG9iai5iYXIgKyBvYmoudHJ6eSkgPT09IFwicmF6ZHdhdHJ6eVwiO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9hc3NpZ24vaXMtaW1wbGVtZW50ZWQuanMiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGtleXMgID0gcmVxdWlyZShcIi4uL2tleXNcIilcbiAgLCB2YWx1ZSA9IHJlcXVpcmUoXCIuLi92YWxpZC12YWx1ZVwiKVxuICAsIG1heCAgID0gTWF0aC5tYXg7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRlc3QsIHNyYyAvKiwg4oCmc3JjbiovKSB7XG5cdHZhciBlcnJvciwgaSwgbGVuZ3RoID0gbWF4KGFyZ3VtZW50cy5sZW5ndGgsIDIpLCBhc3NpZ247XG5cdGRlc3QgPSBPYmplY3QodmFsdWUoZGVzdCkpO1xuXHRhc3NpZ24gPSBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0dHJ5IHtcblx0XHRcdGRlc3Rba2V5XSA9IHNyY1trZXldO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZTtcblx0XHR9XG5cdH07XG5cdGZvciAoaSA9IDE7IGkgPCBsZW5ndGg7ICsraSkge1xuXHRcdHNyYyA9IGFyZ3VtZW50c1tpXTtcblx0XHRrZXlzKHNyYykuZm9yRWFjaChhc3NpZ24pO1xuXHR9XG5cdGlmIChlcnJvciAhPT0gdW5kZWZpbmVkKSB0aHJvdyBlcnJvcjtcblx0cmV0dXJuIGRlc3Q7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2Fzc2lnbi9zaGltLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vaXMtaW1wbGVtZW50ZWRcIikoKVxuXHQ/IE9iamVjdC5rZXlzXG5cdDogcmVxdWlyZShcIi4vc2hpbVwiKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9rZXlzL2luZGV4LmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHR0cnkge1xuXHRcdE9iamVjdC5rZXlzKFwicHJpbWl0aXZlXCIpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlKSB7XG4gcmV0dXJuIGZhbHNlO1xufVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9rZXlzL2lzLWltcGxlbWVudGVkLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc1ZhbHVlID0gcmVxdWlyZShcIi4uL2lzLXZhbHVlXCIpO1xuXG52YXIga2V5cyA9IE9iamVjdC5rZXlzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QpIHtcblx0cmV0dXJuIGtleXMoaXNWYWx1ZShvYmplY3QpID8gT2JqZWN0KG9iamVjdCkgOiBvYmplY3QpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9rZXlzL3NoaW0uanMiLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVtcHR5LWZ1bmN0aW9uXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHt9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2VzNS1leHQvZnVuY3Rpb24vbm9vcC5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNWYWx1ZSA9IHJlcXVpcmUoXCIuL2lzLXZhbHVlXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRpZiAoIWlzVmFsdWUodmFsdWUpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSBudWxsIG9yIHVuZGVmaW5lZFwiKTtcblx0cmV0dXJuIHZhbHVlO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC92YWxpZC12YWx1ZS5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNWYWx1ZSA9IHJlcXVpcmUoXCIuL2lzLXZhbHVlXCIpO1xuXG52YXIgZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLCBjcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xuXG52YXIgcHJvY2VzcyA9IGZ1bmN0aW9uIChzcmMsIG9iaikge1xuXHR2YXIga2V5O1xuXHRmb3IgKGtleSBpbiBzcmMpIG9ialtrZXldID0gc3JjW2tleV07XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9wdHMxIC8qLCDigKZvcHRpb25zKi8pIHtcblx0dmFyIHJlc3VsdCA9IGNyZWF0ZShudWxsKTtcblx0Zm9yRWFjaC5jYWxsKGFyZ3VtZW50cywgZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0XHRpZiAoIWlzVmFsdWUob3B0aW9ucykpIHJldHVybjtcblx0XHRwcm9jZXNzKE9iamVjdChvcHRpb25zKSwgcmVzdWx0KTtcblx0fSk7XG5cdHJldHVybiByZXN1bHQ7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L25vcm1hbGl6ZS1vcHRpb25zLmpzIiwiLy8gRGVwcmVjYXRlZFxuXG5cInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7XG4gcmV0dXJuIHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIjtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvaXMtY2FsbGFibGUuanMiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9pcy1pbXBsZW1lbnRlZFwiKSgpXG5cdD8gU3RyaW5nLnByb3RvdHlwZS5jb250YWluc1xuXHQ6IHJlcXVpcmUoXCIuL3NoaW1cIik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucy9pbmRleC5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3RyID0gXCJyYXpkd2F0cnp5XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHRpZiAodHlwZW9mIHN0ci5jb250YWlucyAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gZmFsc2U7XG5cdHJldHVybiAoc3RyLmNvbnRhaW5zKFwiZHdhXCIpID09PSB0cnVlKSAmJiAoc3RyLmNvbnRhaW5zKFwiZm9vXCIpID09PSBmYWxzZSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvaXMtaW1wbGVtZW50ZWQuanMiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGluZGV4T2YgPSBTdHJpbmcucHJvdG90eXBlLmluZGV4T2Y7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlYXJjaFN0cmluZy8qLCBwb3NpdGlvbiovKSB7XG5cdHJldHVybiBpbmRleE9mLmNhbGwodGhpcywgc2VhcmNoU3RyaW5nLCBhcmd1bWVudHNbMV0pID4gLTE7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvc2hpbS5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbikge1xuXHRpZiAodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoZm4gKyBcIiBpcyBub3QgYSBmdW5jdGlvblwiKTtcblx0cmV0dXJuIGZuO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC92YWxpZC1jYWxsYWJsZS5qcyIsIi8qIVxuICogdmFsaWRhdGUuanMgMC4xMS4xXG4gKlxuICogKGMpIDIwMTMtMjAxNiBOaWNrbGFzIEFuc21hbiwgMjAxMyBXcmFwcFxuICogVmFsaWRhdGUuanMgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKiBGb3IgYWxsIGRldGFpbHMgYW5kIGRvY3VtZW50YXRpb246XG4gKiBodHRwOi8vdmFsaWRhdGVqcy5vcmcvXG4gKi9cblxuKGZ1bmN0aW9uKGV4cG9ydHMsIG1vZHVsZSwgZGVmaW5lKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIC8vIFRoZSBtYWluIGZ1bmN0aW9uIHRoYXQgY2FsbHMgdGhlIHZhbGlkYXRvcnMgc3BlY2lmaWVkIGJ5IHRoZSBjb25zdHJhaW50cy5cbiAgLy8gVGhlIG9wdGlvbnMgYXJlIHRoZSBmb2xsb3dpbmc6XG4gIC8vICAgLSBmb3JtYXQgKHN0cmluZykgLSBBbiBvcHRpb24gdGhhdCBjb250cm9scyBob3cgdGhlIHJldHVybmVkIHZhbHVlIGlzIGZvcm1hdHRlZFxuICAvLyAgICAgKiBmbGF0IC0gUmV0dXJucyBhIGZsYXQgYXJyYXkgb2YganVzdCB0aGUgZXJyb3IgbWVzc2FnZXNcbiAgLy8gICAgICogZ3JvdXBlZCAtIFJldHVybnMgdGhlIG1lc3NhZ2VzIGdyb3VwZWQgYnkgYXR0cmlidXRlIChkZWZhdWx0KVxuICAvLyAgICAgKiBkZXRhaWxlZCAtIFJldHVybnMgYW4gYXJyYXkgb2YgdGhlIHJhdyB2YWxpZGF0aW9uIGRhdGFcbiAgLy8gICAtIGZ1bGxNZXNzYWdlcyAoYm9vbGVhbikgLSBJZiBgdHJ1ZWAgKGRlZmF1bHQpIHRoZSBhdHRyaWJ1dGUgbmFtZSBpcyBwcmVwZW5kZWQgdG8gdGhlIGVycm9yLlxuICAvL1xuICAvLyBQbGVhc2Ugbm90ZSB0aGF0IHRoZSBvcHRpb25zIGFyZSBhbHNvIHBhc3NlZCB0byBlYWNoIHZhbGlkYXRvci5cbiAgdmFyIHZhbGlkYXRlID0gZnVuY3Rpb24oYXR0cmlidXRlcywgY29uc3RyYWludHMsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gdi5leHRlbmQoe30sIHYub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICB2YXIgcmVzdWx0cyA9IHYucnVuVmFsaWRhdGlvbnMoYXR0cmlidXRlcywgY29uc3RyYWludHMsIG9wdGlvbnMpXG4gICAgICAsIGF0dHJcbiAgICAgICwgdmFsaWRhdG9yO1xuXG4gICAgZm9yIChhdHRyIGluIHJlc3VsdHMpIHtcbiAgICAgIGZvciAodmFsaWRhdG9yIGluIHJlc3VsdHNbYXR0cl0pIHtcbiAgICAgICAgaWYgKHYuaXNQcm9taXNlKHJlc3VsdHNbYXR0cl1bdmFsaWRhdG9yXSkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVc2UgdmFsaWRhdGUuYXN5bmMgaWYgeW91IHdhbnQgc3VwcG9ydCBmb3IgcHJvbWlzZXNcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbGlkYXRlLnByb2Nlc3NWYWxpZGF0aW9uUmVzdWx0cyhyZXN1bHRzLCBvcHRpb25zKTtcbiAgfTtcblxuICB2YXIgdiA9IHZhbGlkYXRlO1xuXG4gIC8vIENvcGllcyBvdmVyIGF0dHJpYnV0ZXMgZnJvbSBvbmUgb3IgbW9yZSBzb3VyY2VzIHRvIGEgc2luZ2xlIGRlc3RpbmF0aW9uLlxuICAvLyBWZXJ5IG11Y2ggc2ltaWxhciB0byB1bmRlcnNjb3JlJ3MgZXh0ZW5kLlxuICAvLyBUaGUgZmlyc3QgYXJndW1lbnQgaXMgdGhlIHRhcmdldCBvYmplY3QgYW5kIHRoZSByZW1haW5pbmcgYXJndW1lbnRzIHdpbGwgYmVcbiAgLy8gdXNlZCBhcyBzb3VyY2VzLlxuICB2LmV4dGVuZCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKS5mb3JFYWNoKGZ1bmN0aW9uKHNvdXJjZSkge1xuICAgICAgZm9yICh2YXIgYXR0ciBpbiBzb3VyY2UpIHtcbiAgICAgICAgb2JqW2F0dHJdID0gc291cmNlW2F0dHJdO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgdi5leHRlbmQodmFsaWRhdGUsIHtcbiAgICAvLyBUaGlzIGlzIHRoZSB2ZXJzaW9uIG9mIHRoZSBsaWJyYXJ5IGFzIGEgc2VtdmVyLlxuICAgIC8vIFRoZSB0b1N0cmluZyBmdW5jdGlvbiB3aWxsIGFsbG93IGl0IHRvIGJlIGNvZXJjZWQgaW50byBhIHN0cmluZ1xuICAgIHZlcnNpb246IHtcbiAgICAgIG1ham9yOiAwLFxuICAgICAgbWlub3I6IDExLFxuICAgICAgcGF0Y2g6IDEsXG4gICAgICBtZXRhZGF0YTogbnVsbCxcbiAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZlcnNpb24gPSB2LmZvcm1hdChcIiV7bWFqb3J9LiV7bWlub3J9LiV7cGF0Y2h9XCIsIHYudmVyc2lvbik7XG4gICAgICAgIGlmICghdi5pc0VtcHR5KHYudmVyc2lvbi5tZXRhZGF0YSkpIHtcbiAgICAgICAgICB2ZXJzaW9uICs9IFwiK1wiICsgdi52ZXJzaW9uLm1ldGFkYXRhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2ZXJzaW9uO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBCZWxvdyBpcyB0aGUgZGVwZW5kZW5jaWVzIHRoYXQgYXJlIHVzZWQgaW4gdmFsaWRhdGUuanNcblxuICAgIC8vIFRoZSBjb25zdHJ1Y3RvciBvZiB0aGUgUHJvbWlzZSBpbXBsZW1lbnRhdGlvbi5cbiAgICAvLyBJZiB5b3UgYXJlIHVzaW5nIFEuanMsIFJTVlAgb3IgYW55IG90aGVyIEErIGNvbXBhdGlibGUgaW1wbGVtZW50YXRpb25cbiAgICAvLyBvdmVycmlkZSB0aGlzIGF0dHJpYnV0ZSB0byBiZSB0aGUgY29uc3RydWN0b3Igb2YgdGhhdCBwcm9taXNlLlxuICAgIC8vIFNpbmNlIGpRdWVyeSBwcm9taXNlcyBhcmVuJ3QgQSsgY29tcGF0aWJsZSB0aGV5IHdvbid0IHdvcmsuXG4gICAgUHJvbWlzZTogdHlwZW9mIFByb21pc2UgIT09IFwidW5kZWZpbmVkXCIgPyBQcm9taXNlIDogLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gbnVsbCxcblxuICAgIEVNUFRZX1NUUklOR19SRUdFWFA6IC9eXFxzKiQvLFxuXG4gICAgLy8gUnVucyB0aGUgdmFsaWRhdG9ycyBzcGVjaWZpZWQgYnkgdGhlIGNvbnN0cmFpbnRzIG9iamVjdC5cbiAgICAvLyBXaWxsIHJldHVybiBhbiBhcnJheSBvZiB0aGUgZm9ybWF0OlxuICAgIC8vICAgICBbe2F0dHJpYnV0ZTogXCI8YXR0cmlidXRlIG5hbWU+XCIsIGVycm9yOiBcIjx2YWxpZGF0aW9uIHJlc3VsdD5cIn0sIC4uLl1cbiAgICBydW5WYWxpZGF0aW9uczogZnVuY3Rpb24oYXR0cmlidXRlcywgY29uc3RyYWludHMsIG9wdGlvbnMpIHtcbiAgICAgIHZhciByZXN1bHRzID0gW11cbiAgICAgICAgLCBhdHRyXG4gICAgICAgICwgdmFsaWRhdG9yTmFtZVxuICAgICAgICAsIHZhbHVlXG4gICAgICAgICwgdmFsaWRhdG9yc1xuICAgICAgICAsIHZhbGlkYXRvclxuICAgICAgICAsIHZhbGlkYXRvck9wdGlvbnNcbiAgICAgICAgLCBlcnJvcjtcblxuICAgICAgaWYgKHYuaXNEb21FbGVtZW50KGF0dHJpYnV0ZXMpIHx8IHYuaXNKcXVlcnlFbGVtZW50KGF0dHJpYnV0ZXMpKSB7XG4gICAgICAgIGF0dHJpYnV0ZXMgPSB2LmNvbGxlY3RGb3JtVmFsdWVzKGF0dHJpYnV0ZXMpO1xuICAgICAgfVxuXG4gICAgICAvLyBMb29wcyB0aHJvdWdoIGVhY2ggY29uc3RyYWludHMsIGZpbmRzIHRoZSBjb3JyZWN0IHZhbGlkYXRvciBhbmQgcnVuIGl0LlxuICAgICAgZm9yIChhdHRyIGluIGNvbnN0cmFpbnRzKSB7XG4gICAgICAgIHZhbHVlID0gdi5nZXREZWVwT2JqZWN0VmFsdWUoYXR0cmlidXRlcywgYXR0cik7XG4gICAgICAgIC8vIFRoaXMgYWxsb3dzIHRoZSBjb25zdHJhaW50cyBmb3IgYW4gYXR0cmlidXRlIHRvIGJlIGEgZnVuY3Rpb24uXG4gICAgICAgIC8vIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSB2YWx1ZSwgYXR0cmlidXRlIG5hbWUsIHRoZSBjb21wbGV0ZSBkaWN0IG9mXG4gICAgICAgIC8vIGF0dHJpYnV0ZXMgYXMgd2VsbCBhcyB0aGUgb3B0aW9ucyBhbmQgY29uc3RyYWludHMgcGFzc2VkIGluLlxuICAgICAgICAvLyBUaGlzIGlzIHVzZWZ1bCB3aGVuIHlvdSB3YW50IHRvIGhhdmUgZGlmZmVyZW50XG4gICAgICAgIC8vIHZhbGlkYXRpb25zIGRlcGVuZGluZyBvbiB0aGUgYXR0cmlidXRlIHZhbHVlLlxuICAgICAgICB2YWxpZGF0b3JzID0gdi5yZXN1bHQoY29uc3RyYWludHNbYXR0cl0sIHZhbHVlLCBhdHRyaWJ1dGVzLCBhdHRyLCBvcHRpb25zLCBjb25zdHJhaW50cyk7XG5cbiAgICAgICAgZm9yICh2YWxpZGF0b3JOYW1lIGluIHZhbGlkYXRvcnMpIHtcbiAgICAgICAgICB2YWxpZGF0b3IgPSB2LnZhbGlkYXRvcnNbdmFsaWRhdG9yTmFtZV07XG5cbiAgICAgICAgICBpZiAoIXZhbGlkYXRvcikge1xuICAgICAgICAgICAgZXJyb3IgPSB2LmZvcm1hdChcIlVua25vd24gdmFsaWRhdG9yICV7bmFtZX1cIiwge25hbWU6IHZhbGlkYXRvck5hbWV9KTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFsaWRhdG9yT3B0aW9ucyA9IHZhbGlkYXRvcnNbdmFsaWRhdG9yTmFtZV07XG4gICAgICAgICAgLy8gVGhpcyBhbGxvd3MgdGhlIG9wdGlvbnMgdG8gYmUgYSBmdW5jdGlvbi4gVGhlIGZ1bmN0aW9uIHdpbGwgYmVcbiAgICAgICAgICAvLyBjYWxsZWQgd2l0aCB0aGUgdmFsdWUsIGF0dHJpYnV0ZSBuYW1lLCB0aGUgY29tcGxldGUgZGljdCBvZlxuICAgICAgICAgIC8vIGF0dHJpYnV0ZXMgYXMgd2VsbCBhcyB0aGUgb3B0aW9ucyBhbmQgY29uc3RyYWludHMgcGFzc2VkIGluLlxuICAgICAgICAgIC8vIFRoaXMgaXMgdXNlZnVsIHdoZW4geW91IHdhbnQgdG8gaGF2ZSBkaWZmZXJlbnRcbiAgICAgICAgICAvLyB2YWxpZGF0aW9ucyBkZXBlbmRpbmcgb24gdGhlIGF0dHJpYnV0ZSB2YWx1ZS5cbiAgICAgICAgICB2YWxpZGF0b3JPcHRpb25zID0gdi5yZXN1bHQodmFsaWRhdG9yT3B0aW9ucywgdmFsdWUsIGF0dHJpYnV0ZXMsIGF0dHIsIG9wdGlvbnMsIGNvbnN0cmFpbnRzKTtcbiAgICAgICAgICBpZiAoIXZhbGlkYXRvck9wdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICAgICAgYXR0cmlidXRlOiBhdHRyLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3JOYW1lLFxuICAgICAgICAgICAgZ2xvYmFsT3B0aW9uczogb3B0aW9ucyxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IGF0dHJpYnV0ZXMsXG4gICAgICAgICAgICBvcHRpb25zOiB2YWxpZGF0b3JPcHRpb25zLFxuICAgICAgICAgICAgZXJyb3I6IHZhbGlkYXRvci5jYWxsKHZhbGlkYXRvcixcbiAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3JPcHRpb25zLFxuICAgICAgICAgICAgICAgIGF0dHIsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlcyxcbiAgICAgICAgICAgICAgICBvcHRpb25zKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0sXG5cbiAgICAvLyBUYWtlcyB0aGUgb3V0cHV0IGZyb20gcnVuVmFsaWRhdGlvbnMgYW5kIGNvbnZlcnRzIGl0IHRvIHRoZSBjb3JyZWN0XG4gICAgLy8gb3V0cHV0IGZvcm1hdC5cbiAgICBwcm9jZXNzVmFsaWRhdGlvblJlc3VsdHM6IGZ1bmN0aW9uKGVycm9ycywgb3B0aW9ucykge1xuICAgICAgZXJyb3JzID0gdi5wcnVuZUVtcHR5RXJyb3JzKGVycm9ycywgb3B0aW9ucyk7XG4gICAgICBlcnJvcnMgPSB2LmV4cGFuZE11bHRpcGxlRXJyb3JzKGVycm9ycywgb3B0aW9ucyk7XG4gICAgICBlcnJvcnMgPSB2LmNvbnZlcnRFcnJvck1lc3NhZ2VzKGVycm9ycywgb3B0aW9ucyk7XG5cbiAgICAgIHZhciBmb3JtYXQgPSBvcHRpb25zLmZvcm1hdCB8fCBcImdyb3VwZWRcIjtcblxuICAgICAgaWYgKHR5cGVvZiB2LmZvcm1hdHRlcnNbZm9ybWF0XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBlcnJvcnMgPSB2LmZvcm1hdHRlcnNbZm9ybWF0XShlcnJvcnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHYuZm9ybWF0KFwiVW5rbm93biBmb3JtYXQgJXtmb3JtYXR9XCIsIG9wdGlvbnMpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHYuaXNFbXB0eShlcnJvcnMpID8gdW5kZWZpbmVkIDogZXJyb3JzO1xuICAgIH0sXG5cbiAgICAvLyBSdW5zIHRoZSB2YWxpZGF0aW9ucyB3aXRoIHN1cHBvcnQgZm9yIHByb21pc2VzLlxuICAgIC8vIFRoaXMgZnVuY3Rpb24gd2lsbCByZXR1cm4gYSBwcm9taXNlIHRoYXQgaXMgc2V0dGxlZCB3aGVuIGFsbCB0aGVcbiAgICAvLyB2YWxpZGF0aW9uIHByb21pc2VzIGhhdmUgYmVlbiBjb21wbGV0ZWQuXG4gICAgLy8gSXQgY2FuIGJlIGNhbGxlZCBldmVuIGlmIG5vIHZhbGlkYXRpb25zIHJldHVybmVkIGEgcHJvbWlzZS5cbiAgICBhc3luYzogZnVuY3Rpb24oYXR0cmlidXRlcywgY29uc3RyYWludHMsIG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSB2LmV4dGVuZCh7fSwgdi5hc3luYy5vcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgdmFyIFdyYXBFcnJvcnMgPSBvcHRpb25zLndyYXBFcnJvcnMgfHwgZnVuY3Rpb24oZXJyb3JzKSB7XG4gICAgICAgIHJldHVybiBlcnJvcnM7XG4gICAgICB9O1xuXG4gICAgICAvLyBSZW1vdmVzIHVua25vd24gYXR0cmlidXRlc1xuICAgICAgaWYgKG9wdGlvbnMuY2xlYW5BdHRyaWJ1dGVzICE9PSBmYWxzZSkge1xuICAgICAgICBhdHRyaWJ1dGVzID0gdi5jbGVhbkF0dHJpYnV0ZXMoYXR0cmlidXRlcywgY29uc3RyYWludHMpO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVzdWx0cyA9IHYucnVuVmFsaWRhdGlvbnMoYXR0cmlidXRlcywgY29uc3RyYWludHMsIG9wdGlvbnMpO1xuXG4gICAgICByZXR1cm4gbmV3IHYuUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdi53YWl0Rm9yUmVzdWx0cyhyZXN1bHRzKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBlcnJvcnMgPSB2LnByb2Nlc3NWYWxpZGF0aW9uUmVzdWx0cyhyZXN1bHRzLCBvcHRpb25zKTtcbiAgICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICByZWplY3QobmV3IFdyYXBFcnJvcnMoZXJyb3JzLCBvcHRpb25zLCBhdHRyaWJ1dGVzLCBjb25zdHJhaW50cykpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKGF0dHJpYnV0ZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHNpbmdsZTogZnVuY3Rpb24odmFsdWUsIGNvbnN0cmFpbnRzLCBvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gdi5leHRlbmQoe30sIHYuc2luZ2xlLm9wdGlvbnMsIG9wdGlvbnMsIHtcbiAgICAgICAgZm9ybWF0OiBcImZsYXRcIixcbiAgICAgICAgZnVsbE1lc3NhZ2VzOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdih7c2luZ2xlOiB2YWx1ZX0sIHtzaW5nbGU6IGNvbnN0cmFpbnRzfSwgb3B0aW9ucyk7XG4gICAgfSxcblxuICAgIC8vIFJldHVybnMgYSBwcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiBhbGwgcHJvbWlzZXMgaW4gdGhlIHJlc3VsdHMgYXJyYXlcbiAgICAvLyBhcmUgc2V0dGxlZC4gVGhlIHByb21pc2UgcmV0dXJuZWQgZnJvbSB0aGlzIGZ1bmN0aW9uIGlzIGFsd2F5cyByZXNvbHZlZCxcbiAgICAvLyBuZXZlciByZWplY3RlZC5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIG1vZGlmaWVzIHRoZSBpbnB1dCBhcmd1bWVudCwgaXQgcmVwbGFjZXMgdGhlIHByb21pc2VzXG4gICAgLy8gd2l0aCB0aGUgdmFsdWUgcmV0dXJuZWQgZnJvbSB0aGUgcHJvbWlzZS5cbiAgICB3YWl0Rm9yUmVzdWx0czogZnVuY3Rpb24ocmVzdWx0cykge1xuICAgICAgLy8gQ3JlYXRlIGEgc2VxdWVuY2Ugb2YgYWxsIHRoZSByZXN1bHRzIHN0YXJ0aW5nIHdpdGggYSByZXNvbHZlZCBwcm9taXNlLlxuICAgICAgcmV0dXJuIHJlc3VsdHMucmVkdWNlKGZ1bmN0aW9uKG1lbW8sIHJlc3VsdCkge1xuICAgICAgICAvLyBJZiB0aGlzIHJlc3VsdCBpc24ndCBhIHByb21pc2Ugc2tpcCBpdCBpbiB0aGUgc2VxdWVuY2UuXG4gICAgICAgIGlmICghdi5pc1Byb21pc2UocmVzdWx0LmVycm9yKSkge1xuICAgICAgICAgIHJldHVybiBtZW1vO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1lbW8udGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmVycm9yLnRoZW4oZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgIHJlc3VsdC5lcnJvciA9IGVycm9yIHx8IG51bGw7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSwgbmV3IHYuUHJvbWlzZShmdW5jdGlvbihyKSB7IHIoKTsgfSkpOyAvLyBBIHJlc29sdmVkIHByb21pc2VcbiAgICB9LFxuXG4gICAgLy8gSWYgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIGEgY2FsbDogZnVuY3Rpb24gdGhlIGFuZDogZnVuY3Rpb24gcmV0dXJuIHRoZSB2YWx1ZVxuICAgIC8vIG90aGVyd2lzZSBqdXN0IHJldHVybiB0aGUgdmFsdWUuIEFkZGl0aW9uYWwgYXJndW1lbnRzIHdpbGwgYmUgcGFzc2VkIGFzXG4gICAgLy8gYXJndW1lbnRzIHRvIHRoZSBmdW5jdGlvbi5cbiAgICAvLyBFeGFtcGxlOlxuICAgIC8vIGBgYFxuICAgIC8vIHJlc3VsdCgnZm9vJykgLy8gJ2ZvbydcbiAgICAvLyByZXN1bHQoTWF0aC5tYXgsIDEsIDIpIC8vIDJcbiAgICAvLyBgYGBcbiAgICByZXN1bHQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuXG4gICAgLy8gQ2hlY2tzIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci4gVGhpcyBmdW5jdGlvbiBkb2VzIG5vdCBjb25zaWRlciBOYU4gYVxuICAgIC8vIG51bWJlciBsaWtlIG1hbnkgb3RoZXIgYGlzTnVtYmVyYCBmdW5jdGlvbnMgZG8uXG4gICAgaXNOdW1iZXI6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiAhaXNOYU4odmFsdWUpO1xuICAgIH0sXG5cbiAgICAvLyBSZXR1cm5zIGZhbHNlIGlmIHRoZSBvYmplY3QgaXMgbm90IGEgZnVuY3Rpb25cbiAgICBpc0Z1bmN0aW9uOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9LFxuXG4gICAgLy8gQSBzaW1wbGUgY2hlY2sgdG8gdmVyaWZ5IHRoYXQgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIuIFVzZXMgYGlzTnVtYmVyYFxuICAgIC8vIGFuZCBhIHNpbXBsZSBtb2R1bG8gY2hlY2suXG4gICAgaXNJbnRlZ2VyOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHYuaXNOdW1iZXIodmFsdWUpICYmIHZhbHVlICUgMSA9PT0gMDtcbiAgICB9LFxuXG4gICAgLy8gQ2hlY2tzIGlmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW5cbiAgICBpc0Jvb2xlYW46IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbic7XG4gICAgfSxcblxuICAgIC8vIFVzZXMgdGhlIGBPYmplY3RgIGZ1bmN0aW9uIHRvIGNoZWNrIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhbiBvYmplY3QuXG4gICAgaXNPYmplY3Q6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gT2JqZWN0KG9iaik7XG4gICAgfSxcblxuICAgIC8vIFNpbXBseSBjaGVja3MgaWYgdGhlIG9iamVjdCBpcyBhbiBpbnN0YW5jZSBvZiBhIGRhdGVcbiAgICBpc0RhdGU6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIERhdGU7XG4gICAgfSxcblxuICAgIC8vIFJldHVybnMgZmFsc2UgaWYgdGhlIG9iamVjdCBpcyBgbnVsbGAgb2YgYHVuZGVmaW5lZGBcbiAgICBpc0RlZmluZWQ6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAhPT0gbnVsbCAmJiBvYmogIT09IHVuZGVmaW5lZDtcbiAgICB9LFxuXG4gICAgLy8gQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhIHByb21pc2UuIEFueXRoaW5nIHdpdGggYSBgdGhlbmBcbiAgICAvLyBmdW5jdGlvbiBpcyBjb25zaWRlcmVkIGEgcHJvbWlzZS5cbiAgICBpc1Byb21pc2U6IGZ1bmN0aW9uKHApIHtcbiAgICAgIHJldHVybiAhIXAgJiYgdi5pc0Z1bmN0aW9uKHAudGhlbik7XG4gICAgfSxcblxuICAgIGlzSnF1ZXJ5RWxlbWVudDogZnVuY3Rpb24obykge1xuICAgICAgcmV0dXJuIG8gJiYgdi5pc1N0cmluZyhvLmpxdWVyeSk7XG4gICAgfSxcblxuICAgIGlzRG9tRWxlbWVudDogZnVuY3Rpb24obykge1xuICAgICAgaWYgKCFvKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFvLnF1ZXJ5U2VsZWN0b3JBbGwgfHwgIW8ucXVlcnlTZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICh2LmlzT2JqZWN0KGRvY3VtZW50KSAmJiBvID09PSBkb2N1bWVudCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzg0MzgwLzY5OTMwNFxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIGlmICh0eXBlb2YgSFRNTEVsZW1lbnQgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIG8gaW5zdGFuY2VvZiBIVE1MRWxlbWVudDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvICYmXG4gICAgICAgICAgdHlwZW9mIG8gPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICBvICE9PSBudWxsICYmXG4gICAgICAgICAgby5ub2RlVHlwZSA9PT0gMSAmJlxuICAgICAgICAgIHR5cGVvZiBvLm5vZGVOYW1lID09PSBcInN0cmluZ1wiO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBpc0VtcHR5OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIGF0dHI7XG5cbiAgICAgIC8vIE51bGwgYW5kIHVuZGVmaW5lZCBhcmUgZW1wdHlcbiAgICAgIGlmICghdi5pc0RlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBmdW5jdGlvbnMgYXJlIG5vbiBlbXB0eVxuICAgICAgaWYgKHYuaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBXaGl0ZXNwYWNlIG9ubHkgc3RyaW5ncyBhcmUgZW1wdHlcbiAgICAgIGlmICh2LmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdi5FTVBUWV9TVFJJTkdfUkVHRVhQLnRlc3QodmFsdWUpO1xuICAgICAgfVxuXG4gICAgICAvLyBGb3IgYXJyYXlzIHdlIHVzZSB0aGUgbGVuZ3RoIHByb3BlcnR5XG4gICAgICBpZiAodi5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoID09PSAwO1xuICAgICAgfVxuXG4gICAgICAvLyBEYXRlcyBoYXZlIG5vIGF0dHJpYnV0ZXMgYnV0IGFyZW4ndCBlbXB0eVxuICAgICAgaWYgKHYuaXNEYXRlKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHdlIGZpbmQgYXQgbGVhc3Qgb25lIHByb3BlcnR5IHdlIGNvbnNpZGVyIGl0IG5vbiBlbXB0eVxuICAgICAgaWYgKHYuaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgIGZvciAoYXR0ciBpbiB2YWx1ZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICAvLyBGb3JtYXRzIHRoZSBzcGVjaWZpZWQgc3RyaW5ncyB3aXRoIHRoZSBnaXZlbiB2YWx1ZXMgbGlrZSBzbzpcbiAgICAvLyBgYGBcbiAgICAvLyBmb3JtYXQoXCJGb286ICV7Zm9vfVwiLCB7Zm9vOiBcImJhclwifSkgLy8gXCJGb28gYmFyXCJcbiAgICAvLyBgYGBcbiAgICAvLyBJZiB5b3Ugd2FudCB0byB3cml0ZSAley4uLn0gd2l0aG91dCBoYXZpbmcgaXQgcmVwbGFjZWQgc2ltcGx5XG4gICAgLy8gcHJlZml4IGl0IHdpdGggJSBsaWtlIHRoaXMgYEZvbzogJSV7Zm9vfWAgYW5kIGl0IHdpbGwgYmUgcmV0dXJuZWRcbiAgICAvLyBhcyBgXCJGb286ICV7Zm9vfVwiYFxuICAgIGZvcm1hdDogdi5leHRlbmQoZnVuY3Rpb24oc3RyLCB2YWxzKSB7XG4gICAgICBpZiAoIXYuaXNTdHJpbmcoc3RyKSkge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKHYuZm9ybWF0LkZPUk1BVF9SRUdFWFAsIGZ1bmN0aW9uKG0wLCBtMSwgbTIpIHtcbiAgICAgICAgaWYgKG0xID09PSAnJScpIHtcbiAgICAgICAgICByZXR1cm4gXCIle1wiICsgbTIgKyBcIn1cIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHNbbTJdKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwge1xuICAgICAgLy8gRmluZHMgJXtrZXl9IHN0eWxlIHBhdHRlcm5zIGluIHRoZSBnaXZlbiBzdHJpbmdcbiAgICAgIEZPUk1BVF9SRUdFWFA6IC8oJT8pJVxceyhbXlxcfV0rKVxcfS9nXG4gICAgfSksXG5cbiAgICAvLyBcIlByZXR0aWZpZXNcIiB0aGUgZ2l2ZW4gc3RyaW5nLlxuICAgIC8vIFByZXR0aWZ5aW5nIG1lYW5zIHJlcGxhY2luZyBbLlxcXy1dIHdpdGggc3BhY2VzIGFzIHdlbGwgYXMgc3BsaXR0aW5nXG4gICAgLy8gY2FtZWwgY2FzZSB3b3Jkcy5cbiAgICBwcmV0dGlmeTogZnVuY3Rpb24oc3RyKSB7XG4gICAgICBpZiAodi5pc051bWJlcihzdHIpKSB7XG4gICAgICAgIC8vIElmIHRoZXJlIGFyZSBtb3JlIHRoYW4gMiBkZWNpbWFscyByb3VuZCBpdCB0byB0d29cbiAgICAgICAgaWYgKChzdHIgKiAxMDApICUgMSA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBcIlwiICsgc3RyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KE1hdGgucm91bmQoc3RyICogMTAwKSAvIDEwMCkudG9GaXhlZCgyKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodi5pc0FycmF5KHN0cikpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5tYXAoZnVuY3Rpb24ocykgeyByZXR1cm4gdi5wcmV0dGlmeShzKTsgfSkuam9pbihcIiwgXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAodi5pc09iamVjdChzdHIpKSB7XG4gICAgICAgIHJldHVybiBzdHIudG9TdHJpbmcoKTtcbiAgICAgIH1cblxuICAgICAgLy8gRW5zdXJlIHRoZSBzdHJpbmcgaXMgYWN0dWFsbHkgYSBzdHJpbmdcbiAgICAgIHN0ciA9IFwiXCIgKyBzdHI7XG5cbiAgICAgIHJldHVybiBzdHJcbiAgICAgICAgLy8gU3BsaXRzIGtleXMgc2VwYXJhdGVkIGJ5IHBlcmlvZHNcbiAgICAgICAgLnJlcGxhY2UoLyhbXlxcc10pXFwuKFteXFxzXSkvZywgJyQxICQyJylcbiAgICAgICAgLy8gUmVtb3ZlcyBiYWNrc2xhc2hlc1xuICAgICAgICAucmVwbGFjZSgvXFxcXCsvZywgJycpXG4gICAgICAgIC8vIFJlcGxhY2VzIC0gYW5kIC0gd2l0aCBzcGFjZVxuICAgICAgICAucmVwbGFjZSgvW18tXS9nLCAnICcpXG4gICAgICAgIC8vIFNwbGl0cyBjYW1lbCBjYXNlZCB3b3Jkc1xuICAgICAgICAucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgZnVuY3Rpb24obTAsIG0xLCBtMikge1xuICAgICAgICAgIHJldHVybiBcIlwiICsgbTEgKyBcIiBcIiArIG0yLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpO1xuICAgIH0sXG5cbiAgICBzdHJpbmdpZnlWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiB2LnByZXR0aWZ5KHZhbHVlKTtcbiAgICB9LFxuXG4gICAgaXNTdHJpbmc6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbiAgICB9LFxuXG4gICAgaXNBcnJheTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiB7fS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICB9LFxuXG4gICAgLy8gQ2hlY2tzIGlmIHRoZSBvYmplY3QgaXMgYSBoYXNoLCB3aGljaCBpcyBlcXVpdmFsZW50IHRvIGFuIG9iamVjdCB0aGF0XG4gICAgLy8gaXMgbmVpdGhlciBhbiBhcnJheSBub3IgYSBmdW5jdGlvbi5cbiAgICBpc0hhc2g6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdi5pc09iamVjdCh2YWx1ZSkgJiYgIXYuaXNBcnJheSh2YWx1ZSkgJiYgIXYuaXNGdW5jdGlvbih2YWx1ZSk7XG4gICAgfSxcblxuICAgIGNvbnRhaW5zOiBmdW5jdGlvbihvYmosIHZhbHVlKSB7XG4gICAgICBpZiAoIXYuaXNEZWZpbmVkKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHYuaXNBcnJheShvYmopKSB7XG4gICAgICAgIHJldHVybiBvYmouaW5kZXhPZih2YWx1ZSkgIT09IC0xO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlIGluIG9iajtcbiAgICB9LFxuXG4gICAgdW5pcXVlOiBmdW5jdGlvbihhcnJheSkge1xuICAgICAgaWYgKCF2LmlzQXJyYXkoYXJyYXkpKSB7XG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhcnJheS5maWx0ZXIoZnVuY3Rpb24oZWwsIGluZGV4LCBhcnJheSkge1xuICAgICAgICByZXR1cm4gYXJyYXkuaW5kZXhPZihlbCkgPT0gaW5kZXg7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgZm9yRWFjaEtleUluS2V5cGF0aDogZnVuY3Rpb24ob2JqZWN0LCBrZXlwYXRoLCBjYWxsYmFjaykge1xuICAgICAgaWYgKCF2LmlzU3RyaW5nKGtleXBhdGgpKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHZhciBrZXkgPSBcIlwiXG4gICAgICAgICwgaVxuICAgICAgICAsIGVzY2FwZSA9IGZhbHNlO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cGF0aC5sZW5ndGg7ICsraSkge1xuICAgICAgICBzd2l0Y2ggKGtleXBhdGhbaV0pIHtcbiAgICAgICAgICBjYXNlICcuJzpcbiAgICAgICAgICAgIGlmIChlc2NhcGUpIHtcbiAgICAgICAgICAgICAgZXNjYXBlID0gZmFsc2U7XG4gICAgICAgICAgICAgIGtleSArPSAnLic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBvYmplY3QgPSBjYWxsYmFjayhvYmplY3QsIGtleSwgZmFsc2UpO1xuICAgICAgICAgICAgICBrZXkgPSBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdcXFxcJzpcbiAgICAgICAgICAgIGlmIChlc2NhcGUpIHtcbiAgICAgICAgICAgICAgZXNjYXBlID0gZmFsc2U7XG4gICAgICAgICAgICAgIGtleSArPSAnXFxcXCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlc2NhcGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgZXNjYXBlID0gZmFsc2U7XG4gICAgICAgICAgICBrZXkgKz0ga2V5cGF0aFtpXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjYWxsYmFjayhvYmplY3QsIGtleSwgdHJ1ZSk7XG4gICAgfSxcblxuICAgIGdldERlZXBPYmplY3RWYWx1ZTogZnVuY3Rpb24ob2JqLCBrZXlwYXRoKSB7XG4gICAgICBpZiAoIXYuaXNPYmplY3Qob2JqKSkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdi5mb3JFYWNoS2V5SW5LZXlwYXRoKG9iaiwga2V5cGF0aCwgZnVuY3Rpb24ob2JqLCBrZXkpIHtcbiAgICAgICAgaWYgKHYuaXNPYmplY3Qob2JqKSkge1xuICAgICAgICAgIHJldHVybiBvYmpba2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8vIFRoaXMgcmV0dXJucyBhbiBvYmplY3Qgd2l0aCBhbGwgdGhlIHZhbHVlcyBvZiB0aGUgZm9ybS5cbiAgICAvLyBJdCB1c2VzIHRoZSBpbnB1dCBuYW1lIGFzIGtleSBhbmQgdGhlIHZhbHVlIGFzIHZhbHVlXG4gICAgLy8gU28gZm9yIGV4YW1wbGUgdGhpczpcbiAgICAvLyA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZW1haWxcIiB2YWx1ZT1cImZvb0BiYXIuY29tXCIgLz5cbiAgICAvLyB3b3VsZCByZXR1cm46XG4gICAgLy8ge2VtYWlsOiBcImZvb0BiYXIuY29tXCJ9XG4gICAgY29sbGVjdEZvcm1WYWx1ZXM6IGZ1bmN0aW9uKGZvcm0sIG9wdGlvbnMpIHtcbiAgICAgIHZhciB2YWx1ZXMgPSB7fVxuICAgICAgICAsIGlcbiAgICAgICAgLCBqXG4gICAgICAgICwgaW5wdXRcbiAgICAgICAgLCBpbnB1dHNcbiAgICAgICAgLCBvcHRpb25cbiAgICAgICAgLCB2YWx1ZTtcblxuICAgICAgaWYgKHYuaXNKcXVlcnlFbGVtZW50KGZvcm0pKSB7XG4gICAgICAgIGZvcm0gPSBmb3JtWzBdO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWZvcm0pIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgIH1cblxuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgIGlucHV0cyA9IGZvcm0ucXVlcnlTZWxlY3RvckFsbChcImlucHV0W25hbWVdLCB0ZXh0YXJlYVtuYW1lXVwiKTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaW5wdXQgPSBpbnB1dHMuaXRlbShpKTtcblxuICAgICAgICBpZiAodi5pc0RlZmluZWQoaW5wdXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZ25vcmVkXCIpKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFsdWUgPSB2LnNhbml0aXplRm9ybVZhbHVlKGlucHV0LnZhbHVlLCBvcHRpb25zKTtcbiAgICAgICAgaWYgKGlucHV0LnR5cGUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlID8gK3ZhbHVlIDogbnVsbDtcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dC50eXBlID09PSBcImNoZWNrYm94XCIpIHtcbiAgICAgICAgICBpZiAoaW5wdXQuYXR0cmlidXRlcy52YWx1ZSkge1xuICAgICAgICAgICAgaWYgKCFpbnB1dC5jaGVja2VkKSB7XG4gICAgICAgICAgICAgIHZhbHVlID0gdmFsdWVzW2lucHV0Lm5hbWVdIHx8IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlID0gaW5wdXQuY2hlY2tlZDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQudHlwZSA9PT0gXCJyYWRpb1wiKSB7XG4gICAgICAgICAgaWYgKCFpbnB1dC5jaGVja2VkKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlc1tpbnB1dC5uYW1lXSB8fCBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YWx1ZXNbaW5wdXQubmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgaW5wdXRzID0gZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwic2VsZWN0W25hbWVdXCIpO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpbnB1dCA9IGlucHV0cy5pdGVtKGkpO1xuICAgICAgICBpZiAoaW5wdXQubXVsdGlwbGUpIHtcbiAgICAgICAgICB2YWx1ZSA9IFtdO1xuICAgICAgICAgIGZvciAoaiBpbiBpbnB1dC5vcHRpb25zKSB7XG4gICAgICAgICAgICBvcHRpb24gPSBpbnB1dC5vcHRpb25zW2pdO1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICB2YWx1ZS5wdXNoKHYuc2FuaXRpemVGb3JtVmFsdWUob3B0aW9uLnZhbHVlLCBvcHRpb25zKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlID0gdi5zYW5pdGl6ZUZvcm1WYWx1ZShpbnB1dC5vcHRpb25zW2lucHV0LnNlbGVjdGVkSW5kZXhdLnZhbHVlLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZXNbaW5wdXQubmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9LFxuXG4gICAgc2FuaXRpemVGb3JtVmFsdWU6IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zKSB7XG4gICAgICBpZiAob3B0aW9ucy50cmltICYmIHYuaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUudHJpbSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5udWxsaWZ5ICE9PSBmYWxzZSAmJiB2YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuXG4gICAgY2FwaXRhbGl6ZTogZnVuY3Rpb24oc3RyKSB7XG4gICAgICBpZiAoIXYuaXNTdHJpbmcoc3RyKSkge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0clswXS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xuICAgIH0sXG5cbiAgICAvLyBSZW1vdmUgYWxsIGVycm9ycyB3aG8ncyBlcnJvciBhdHRyaWJ1dGUgaXMgZW1wdHkgKG51bGwgb3IgdW5kZWZpbmVkKVxuICAgIHBydW5lRW1wdHlFcnJvcnM6IGZ1bmN0aW9uKGVycm9ycykge1xuICAgICAgcmV0dXJuIGVycm9ycy5maWx0ZXIoZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuICF2LmlzRW1wdHkoZXJyb3IuZXJyb3IpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8vIEluXG4gICAgLy8gW3tlcnJvcjogW1wiZXJyMVwiLCBcImVycjJcIl0sIC4uLn1dXG4gICAgLy8gT3V0XG4gICAgLy8gW3tlcnJvcjogXCJlcnIxXCIsIC4uLn0sIHtlcnJvcjogXCJlcnIyXCIsIC4uLn1dXG4gICAgLy9cbiAgICAvLyBBbGwgYXR0cmlidXRlcyBpbiBhbiBlcnJvciB3aXRoIG11bHRpcGxlIG1lc3NhZ2VzIGFyZSBkdXBsaWNhdGVkXG4gICAgLy8gd2hlbiBleHBhbmRpbmcgdGhlIGVycm9ycy5cbiAgICBleHBhbmRNdWx0aXBsZUVycm9yczogZnVuY3Rpb24oZXJyb3JzKSB7XG4gICAgICB2YXIgcmV0ID0gW107XG4gICAgICBlcnJvcnMuZm9yRWFjaChmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAvLyBSZW1vdmVzIGVycm9ycyB3aXRob3V0IGEgbWVzc2FnZVxuICAgICAgICBpZiAodi5pc0FycmF5KGVycm9yLmVycm9yKSkge1xuICAgICAgICAgIGVycm9yLmVycm9yLmZvckVhY2goZnVuY3Rpb24obXNnKSB7XG4gICAgICAgICAgICByZXQucHVzaCh2LmV4dGVuZCh7fSwgZXJyb3IsIHtlcnJvcjogbXNnfSkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldC5wdXNoKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0cyB0aGUgZXJyb3IgbWVzYWdlcyBieSBwcmVwZW5kaW5nIHRoZSBhdHRyaWJ1dGUgbmFtZSB1bmxlc3MgdGhlXG4gICAgLy8gbWVzc2FnZSBpcyBwcmVmaXhlZCBieSBeXG4gICAgY29udmVydEVycm9yTWVzc2FnZXM6IGZ1bmN0aW9uKGVycm9ycywgb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgIHZhciByZXQgPSBbXTtcbiAgICAgIGVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uKGVycm9ySW5mbykge1xuICAgICAgICB2YXIgZXJyb3IgPSB2LnJlc3VsdChlcnJvckluZm8uZXJyb3IsXG4gICAgICAgICAgICBlcnJvckluZm8udmFsdWUsXG4gICAgICAgICAgICBlcnJvckluZm8uYXR0cmlidXRlLFxuICAgICAgICAgICAgZXJyb3JJbmZvLm9wdGlvbnMsXG4gICAgICAgICAgICBlcnJvckluZm8uYXR0cmlidXRlcyxcbiAgICAgICAgICAgIGVycm9ySW5mby5nbG9iYWxPcHRpb25zKTtcblxuICAgICAgICBpZiAoIXYuaXNTdHJpbmcoZXJyb3IpKSB7XG4gICAgICAgICAgcmV0LnB1c2goZXJyb3JJbmZvKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXJyb3JbMF0gPT09ICdeJykge1xuICAgICAgICAgIGVycm9yID0gZXJyb3Iuc2xpY2UoMSk7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5mdWxsTWVzc2FnZXMgIT09IGZhbHNlKSB7XG4gICAgICAgICAgZXJyb3IgPSB2LmNhcGl0YWxpemUodi5wcmV0dGlmeShlcnJvckluZm8uYXR0cmlidXRlKSkgKyBcIiBcIiArIGVycm9yO1xuICAgICAgICB9XG4gICAgICAgIGVycm9yID0gZXJyb3IucmVwbGFjZSgvXFxcXFxcXi9nLCBcIl5cIik7XG4gICAgICAgIGVycm9yID0gdi5mb3JtYXQoZXJyb3IsIHt2YWx1ZTogdi5zdHJpbmdpZnlWYWx1ZShlcnJvckluZm8udmFsdWUpfSk7XG4gICAgICAgIHJldC5wdXNoKHYuZXh0ZW5kKHt9LCBlcnJvckluZm8sIHtlcnJvcjogZXJyb3J9KSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcblxuICAgIC8vIEluOlxuICAgIC8vIFt7YXR0cmlidXRlOiBcIjxhdHRyaWJ1dGVOYW1lPlwiLCAuLi59XVxuICAgIC8vIE91dDpcbiAgICAvLyB7XCI8YXR0cmlidXRlTmFtZT5cIjogW3thdHRyaWJ1dGU6IFwiPGF0dHJpYnV0ZU5hbWU+XCIsIC4uLn1dfVxuICAgIGdyb3VwRXJyb3JzQnlBdHRyaWJ1dGU6IGZ1bmN0aW9uKGVycm9ycykge1xuICAgICAgdmFyIHJldCA9IHt9O1xuICAgICAgZXJyb3JzLmZvckVhY2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgdmFyIGxpc3QgPSByZXRbZXJyb3IuYXR0cmlidXRlXTtcbiAgICAgICAgaWYgKGxpc3QpIHtcbiAgICAgICAgICBsaXN0LnB1c2goZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldFtlcnJvci5hdHRyaWJ1dGVdID0gW2Vycm9yXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0sXG5cbiAgICAvLyBJbjpcbiAgICAvLyBbe2Vycm9yOiBcIjxtZXNzYWdlIDE+XCIsIC4uLn0sIHtlcnJvcjogXCI8bWVzc2FnZSAyPlwiLCAuLi59XVxuICAgIC8vIE91dDpcbiAgICAvLyBbXCI8bWVzc2FnZSAxPlwiLCBcIjxtZXNzYWdlIDI+XCJdXG4gICAgZmxhdHRlbkVycm9yc1RvQXJyYXk6IGZ1bmN0aW9uKGVycm9ycykge1xuICAgICAgcmV0dXJuIGVycm9yc1xuICAgICAgICAubWFwKGZ1bmN0aW9uKGVycm9yKSB7IHJldHVybiBlcnJvci5lcnJvcjsgfSlcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIHNlbGYpIHtcbiAgICAgICAgICByZXR1cm4gc2VsZi5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXg7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBjbGVhbkF0dHJpYnV0ZXM6IGZ1bmN0aW9uKGF0dHJpYnV0ZXMsIHdoaXRlbGlzdCkge1xuICAgICAgZnVuY3Rpb24gd2hpdGVsaXN0Q3JlYXRvcihvYmosIGtleSwgbGFzdCkge1xuICAgICAgICBpZiAodi5pc09iamVjdChvYmpba2V5XSkpIHtcbiAgICAgICAgICByZXR1cm4gb2JqW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChvYmpba2V5XSA9IGxhc3QgPyB0cnVlIDoge30pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBidWlsZE9iamVjdFdoaXRlbGlzdCh3aGl0ZWxpc3QpIHtcbiAgICAgICAgdmFyIG93ID0ge31cbiAgICAgICAgICAsIGxhc3RPYmplY3RcbiAgICAgICAgICAsIGF0dHI7XG4gICAgICAgIGZvciAoYXR0ciBpbiB3aGl0ZWxpc3QpIHtcbiAgICAgICAgICBpZiAoIXdoaXRlbGlzdFthdHRyXSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHYuZm9yRWFjaEtleUluS2V5cGF0aChvdywgYXR0ciwgd2hpdGVsaXN0Q3JlYXRvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG93O1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBjbGVhblJlY3Vyc2l2ZShhdHRyaWJ1dGVzLCB3aGl0ZWxpc3QpIHtcbiAgICAgICAgaWYgKCF2LmlzT2JqZWN0KGF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZXM7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmV0ID0gdi5leHRlbmQoe30sIGF0dHJpYnV0ZXMpXG4gICAgICAgICAgLCB3XG4gICAgICAgICAgLCBhdHRyaWJ1dGU7XG5cbiAgICAgICAgZm9yIChhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcykge1xuICAgICAgICAgIHcgPSB3aGl0ZWxpc3RbYXR0cmlidXRlXTtcblxuICAgICAgICAgIGlmICh2LmlzT2JqZWN0KHcpKSB7XG4gICAgICAgICAgICByZXRbYXR0cmlidXRlXSA9IGNsZWFuUmVjdXJzaXZlKHJldFthdHRyaWJ1dGVdLCB3KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCF3KSB7XG4gICAgICAgICAgICBkZWxldGUgcmV0W2F0dHJpYnV0ZV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG5cbiAgICAgIGlmICghdi5pc09iamVjdCh3aGl0ZWxpc3QpIHx8ICF2LmlzT2JqZWN0KGF0dHJpYnV0ZXMpKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH1cblxuICAgICAgd2hpdGVsaXN0ID0gYnVpbGRPYmplY3RXaGl0ZWxpc3Qod2hpdGVsaXN0KTtcbiAgICAgIHJldHVybiBjbGVhblJlY3Vyc2l2ZShhdHRyaWJ1dGVzLCB3aGl0ZWxpc3QpO1xuICAgIH0sXG5cbiAgICBleHBvc2VNb2R1bGU6IGZ1bmN0aW9uKHZhbGlkYXRlLCByb290LCBleHBvcnRzLCBtb2R1bGUsIGRlZmluZSkge1xuICAgICAgaWYgKGV4cG9ydHMpIHtcbiAgICAgICAgaWYgKG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHZhbGlkYXRlO1xuICAgICAgICB9XG4gICAgICAgIGV4cG9ydHMudmFsaWRhdGUgPSB2YWxpZGF0ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3QudmFsaWRhdGUgPSB2YWxpZGF0ZTtcbiAgICAgICAgaWYgKHZhbGlkYXRlLmlzRnVuY3Rpb24oZGVmaW5lKSAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgICAgZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7IHJldHVybiB2YWxpZGF0ZTsgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgd2FybjogZnVuY3Rpb24obXNnKSB7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS53YXJuKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIlt2YWxpZGF0ZS5qc10gXCIgKyBtc2cpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBlcnJvcjogZnVuY3Rpb24obXNnKSB7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS5lcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiW3ZhbGlkYXRlLmpzXSBcIiArIG1zZyk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICB2YWxpZGF0ZS52YWxpZGF0b3JzID0ge1xuICAgIC8vIFByZXNlbmNlIHZhbGlkYXRlcyB0aGF0IHRoZSB2YWx1ZSBpc24ndCBlbXB0eVxuICAgIHByZXNlbmNlOiBmdW5jdGlvbih2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHYuZXh0ZW5kKHt9LCB0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgaWYgKG9wdGlvbnMuYWxsb3dFbXB0eSA/ICF2LmlzRGVmaW5lZCh2YWx1ZSkgOiB2LmlzRW1wdHkodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLm1lc3NhZ2UgfHwgdGhpcy5tZXNzYWdlIHx8IFwiY2FuJ3QgYmUgYmxhbmtcIjtcbiAgICAgIH1cbiAgICB9LFxuICAgIGxlbmd0aDogZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMsIGF0dHJpYnV0ZSkge1xuICAgICAgLy8gRW1wdHkgdmFsdWVzIGFyZSBhbGxvd2VkXG4gICAgICBpZiAoIXYuaXNEZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIG9wdGlvbnMgPSB2LmV4dGVuZCh7fSwgdGhpcy5vcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgdmFyIGlzID0gb3B0aW9ucy5pc1xuICAgICAgICAsIG1heGltdW0gPSBvcHRpb25zLm1heGltdW1cbiAgICAgICAgLCBtaW5pbXVtID0gb3B0aW9ucy5taW5pbXVtXG4gICAgICAgICwgdG9rZW5pemVyID0gb3B0aW9ucy50b2tlbml6ZXIgfHwgZnVuY3Rpb24odmFsKSB7IHJldHVybiB2YWw7IH1cbiAgICAgICAgLCBlcnJcbiAgICAgICAgLCBlcnJvcnMgPSBbXTtcblxuICAgICAgdmFsdWUgPSB0b2tlbml6ZXIodmFsdWUpO1xuICAgICAgdmFyIGxlbmd0aCA9IHZhbHVlLmxlbmd0aDtcbiAgICAgIGlmKCF2LmlzTnVtYmVyKGxlbmd0aCkpIHtcbiAgICAgICAgdi5lcnJvcih2LmZvcm1hdChcIkF0dHJpYnV0ZSAle2F0dHJ9IGhhcyBhIG5vbiBudW1lcmljIHZhbHVlIGZvciBgbGVuZ3RoYFwiLCB7YXR0cjogYXR0cmlidXRlfSkpO1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5tZXNzYWdlIHx8IHRoaXMubm90VmFsaWQgfHwgXCJoYXMgYW4gaW5jb3JyZWN0IGxlbmd0aFwiO1xuICAgICAgfVxuXG4gICAgICAvLyBJcyBjaGVja3NcbiAgICAgIGlmICh2LmlzTnVtYmVyKGlzKSAmJiBsZW5ndGggIT09IGlzKSB7XG4gICAgICAgIGVyciA9IG9wdGlvbnMud3JvbmdMZW5ndGggfHxcbiAgICAgICAgICB0aGlzLndyb25nTGVuZ3RoIHx8XG4gICAgICAgICAgXCJpcyB0aGUgd3JvbmcgbGVuZ3RoIChzaG91bGQgYmUgJXtjb3VudH0gY2hhcmFjdGVycylcIjtcbiAgICAgICAgZXJyb3JzLnB1c2godi5mb3JtYXQoZXJyLCB7Y291bnQ6IGlzfSkpO1xuICAgICAgfVxuXG4gICAgICBpZiAodi5pc051bWJlcihtaW5pbXVtKSAmJiBsZW5ndGggPCBtaW5pbXVtKSB7XG4gICAgICAgIGVyciA9IG9wdGlvbnMudG9vU2hvcnQgfHxcbiAgICAgICAgICB0aGlzLnRvb1Nob3J0IHx8XG4gICAgICAgICAgXCJpcyB0b28gc2hvcnQgKG1pbmltdW0gaXMgJXtjb3VudH0gY2hhcmFjdGVycylcIjtcbiAgICAgICAgZXJyb3JzLnB1c2godi5mb3JtYXQoZXJyLCB7Y291bnQ6IG1pbmltdW19KSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh2LmlzTnVtYmVyKG1heGltdW0pICYmIGxlbmd0aCA+IG1heGltdW0pIHtcbiAgICAgICAgZXJyID0gb3B0aW9ucy50b29Mb25nIHx8XG4gICAgICAgICAgdGhpcy50b29Mb25nIHx8XG4gICAgICAgICAgXCJpcyB0b28gbG9uZyAobWF4aW11bSBpcyAle2NvdW50fSBjaGFyYWN0ZXJzKVwiO1xuICAgICAgICBlcnJvcnMucHVzaCh2LmZvcm1hdChlcnIsIHtjb3VudDogbWF4aW11bX0pKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLm1lc3NhZ2UgfHwgZXJyb3JzO1xuICAgICAgfVxuICAgIH0sXG4gICAgbnVtZXJpY2FsaXR5OiBmdW5jdGlvbih2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgLy8gRW1wdHkgdmFsdWVzIGFyZSBmaW5lXG4gICAgICBpZiAoIXYuaXNEZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIG9wdGlvbnMgPSB2LmV4dGVuZCh7fSwgdGhpcy5vcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgdmFyIGVycm9ycyA9IFtdXG4gICAgICAgICwgbmFtZVxuICAgICAgICAsIGNvdW50XG4gICAgICAgICwgY2hlY2tzID0ge1xuICAgICAgICAgICAgZ3JlYXRlclRoYW46ICAgICAgICAgIGZ1bmN0aW9uKHYsIGMpIHsgcmV0dXJuIHYgPiBjOyB9LFxuICAgICAgICAgICAgZ3JlYXRlclRoYW5PckVxdWFsVG86IGZ1bmN0aW9uKHYsIGMpIHsgcmV0dXJuIHYgPj0gYzsgfSxcbiAgICAgICAgICAgIGVxdWFsVG86ICAgICAgICAgICAgICBmdW5jdGlvbih2LCBjKSB7IHJldHVybiB2ID09PSBjOyB9LFxuICAgICAgICAgICAgbGVzc1RoYW46ICAgICAgICAgICAgIGZ1bmN0aW9uKHYsIGMpIHsgcmV0dXJuIHYgPCBjOyB9LFxuICAgICAgICAgICAgbGVzc1RoYW5PckVxdWFsVG86ICAgIGZ1bmN0aW9uKHYsIGMpIHsgcmV0dXJuIHYgPD0gYzsgfSxcbiAgICAgICAgICAgIGRpdmlzaWJsZUJ5OiAgICAgICAgICBmdW5jdGlvbih2LCBjKSB7IHJldHVybiB2ICUgYyA9PT0gMDsgfVxuICAgICAgICAgIH07XG5cbiAgICAgIC8vIFN0cmljdCB3aWxsIGNoZWNrIHRoYXQgaXQgaXMgYSB2YWxpZCBsb29raW5nIG51bWJlclxuICAgICAgaWYgKHYuaXNTdHJpbmcodmFsdWUpICYmIG9wdGlvbnMuc3RyaWN0KSB7XG4gICAgICAgIHZhciBwYXR0ZXJuID0gXCJeKDB8WzEtOV1cXFxcZCopXCI7XG4gICAgICAgIGlmICghb3B0aW9ucy5vbmx5SW50ZWdlcikge1xuICAgICAgICAgIHBhdHRlcm4gKz0gXCIoXFxcXC5cXFxcZCspP1wiO1xuICAgICAgICB9XG4gICAgICAgIHBhdHRlcm4gKz0gXCIkXCI7XG5cbiAgICAgICAgaWYgKCEobmV3IFJlZ0V4cChwYXR0ZXJuKS50ZXN0KHZhbHVlKSkpIHtcbiAgICAgICAgICByZXR1cm4gb3B0aW9ucy5tZXNzYWdlIHx8XG4gICAgICAgICAgICBvcHRpb25zLm5vdFZhbGlkIHx8XG4gICAgICAgICAgICB0aGlzLm5vdFZhbGlkIHx8XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgfHxcbiAgICAgICAgICAgIFwibXVzdCBiZSBhIHZhbGlkIG51bWJlclwiO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIENvZXJjZSB0aGUgdmFsdWUgdG8gYSBudW1iZXIgdW5sZXNzIHdlJ3JlIGJlaW5nIHN0cmljdC5cbiAgICAgIGlmIChvcHRpb25zLm5vU3RyaW5ncyAhPT0gdHJ1ZSAmJiB2LmlzU3RyaW5nKHZhbHVlKSAmJiAhdi5pc0VtcHR5KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSA9ICt2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgaXQncyBub3QgYSBudW1iZXIgd2Ugc2hvdWxkbid0IGNvbnRpbnVlIHNpbmNlIGl0IHdpbGwgY29tcGFyZSBpdC5cbiAgICAgIGlmICghdi5pc051bWJlcih2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMubWVzc2FnZSB8fFxuICAgICAgICAgIG9wdGlvbnMubm90VmFsaWQgfHxcbiAgICAgICAgICB0aGlzLm5vdFZhbGlkIHx8XG4gICAgICAgICAgdGhpcy5tZXNzYWdlIHx8XG4gICAgICAgICAgXCJpcyBub3QgYSBudW1iZXJcIjtcbiAgICAgIH1cblxuICAgICAgLy8gU2FtZSBsb2dpYyBhcyBhYm92ZSwgc29ydCBvZi4gRG9uJ3QgYm90aGVyIHdpdGggY29tcGFyaXNvbnMgaWYgdGhpc1xuICAgICAgLy8gZG9lc24ndCBwYXNzLlxuICAgICAgaWYgKG9wdGlvbnMub25seUludGVnZXIgJiYgIXYuaXNJbnRlZ2VyKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5tZXNzYWdlIHx8XG4gICAgICAgICAgb3B0aW9ucy5ub3RJbnRlZ2VyIHx8XG4gICAgICAgICAgdGhpcy5ub3RJbnRlZ2VyIHx8XG4gICAgICAgICAgdGhpcy5tZXNzYWdlIHx8XG4gICAgICAgICAgXCJtdXN0IGJlIGFuIGludGVnZXJcIjtcbiAgICAgIH1cblxuICAgICAgZm9yIChuYW1lIGluIGNoZWNrcykge1xuICAgICAgICBjb3VudCA9IG9wdGlvbnNbbmFtZV07XG4gICAgICAgIGlmICh2LmlzTnVtYmVyKGNvdW50KSAmJiAhY2hlY2tzW25hbWVdKHZhbHVlLCBjb3VudCkpIHtcbiAgICAgICAgICAvLyBUaGlzIHBpY2tzIHRoZSBkZWZhdWx0IG1lc3NhZ2UgaWYgc3BlY2lmaWVkXG4gICAgICAgICAgLy8gRm9yIGV4YW1wbGUgdGhlIGdyZWF0ZXJUaGFuIGNoZWNrIHVzZXMgdGhlIG1lc3NhZ2UgZnJvbVxuICAgICAgICAgIC8vIHRoaXMubm90R3JlYXRlclRoYW4gc28gd2UgY2FwaXRhbGl6ZSB0aGUgbmFtZSBhbmQgcHJlcGVuZCBcIm5vdFwiXG4gICAgICAgICAgdmFyIGtleSA9IFwibm90XCIgKyB2LmNhcGl0YWxpemUobmFtZSk7XG4gICAgICAgICAgdmFyIG1zZyA9IG9wdGlvbnNba2V5XSB8fFxuICAgICAgICAgICAgdGhpc1trZXldIHx8XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgfHxcbiAgICAgICAgICAgIFwibXVzdCBiZSAle3R5cGV9ICV7Y291bnR9XCI7XG5cbiAgICAgICAgICBlcnJvcnMucHVzaCh2LmZvcm1hdChtc2csIHtcbiAgICAgICAgICAgIGNvdW50OiBjb3VudCxcbiAgICAgICAgICAgIHR5cGU6IHYucHJldHRpZnkobmFtZSlcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMub2RkICYmIHZhbHVlICUgMiAhPT0gMSkge1xuICAgICAgICBlcnJvcnMucHVzaChvcHRpb25zLm5vdE9kZCB8fFxuICAgICAgICAgICAgdGhpcy5ub3RPZGQgfHxcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSB8fFxuICAgICAgICAgICAgXCJtdXN0IGJlIG9kZFwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLmV2ZW4gJiYgdmFsdWUgJSAyICE9PSAwKSB7XG4gICAgICAgIGVycm9ycy5wdXNoKG9wdGlvbnMubm90RXZlbiB8fFxuICAgICAgICAgICAgdGhpcy5ub3RFdmVuIHx8XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgfHxcbiAgICAgICAgICAgIFwibXVzdCBiZSBldmVuXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXJyb3JzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5tZXNzYWdlIHx8IGVycm9ycztcbiAgICAgIH1cbiAgICB9LFxuICAgIGRhdGV0aW1lOiB2LmV4dGVuZChmdW5jdGlvbih2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgaWYgKCF2LmlzRnVuY3Rpb24odGhpcy5wYXJzZSkgfHwgIXYuaXNGdW5jdGlvbih0aGlzLmZvcm1hdCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQm90aCB0aGUgcGFyc2UgYW5kIGZvcm1hdCBmdW5jdGlvbnMgbmVlZHMgdG8gYmUgc2V0IHRvIHVzZSB0aGUgZGF0ZXRpbWUvZGF0ZSB2YWxpZGF0b3JcIik7XG4gICAgICB9XG5cbiAgICAgIC8vIEVtcHR5IHZhbHVlcyBhcmUgZmluZVxuICAgICAgaWYgKCF2LmlzRGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBvcHRpb25zID0gdi5leHRlbmQoe30sIHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAgIHZhciBlcnJcbiAgICAgICAgLCBlcnJvcnMgPSBbXVxuICAgICAgICAsIGVhcmxpZXN0ID0gb3B0aW9ucy5lYXJsaWVzdCA/IHRoaXMucGFyc2Uob3B0aW9ucy5lYXJsaWVzdCwgb3B0aW9ucykgOiBOYU5cbiAgICAgICAgLCBsYXRlc3QgPSBvcHRpb25zLmxhdGVzdCA/IHRoaXMucGFyc2Uob3B0aW9ucy5sYXRlc3QsIG9wdGlvbnMpIDogTmFOO1xuXG4gICAgICB2YWx1ZSA9IHRoaXMucGFyc2UodmFsdWUsIG9wdGlvbnMpO1xuXG4gICAgICAvLyA4NjQwMDAwMCBpcyB0aGUgbnVtYmVyIG9mIHNlY29uZHMgaW4gYSBkYXksIHRoaXMgaXMgdXNlZCB0byByZW1vdmVcbiAgICAgIC8vIHRoZSB0aW1lIGZyb20gdGhlIGRhdGVcbiAgICAgIGlmIChpc05hTih2YWx1ZSkgfHwgb3B0aW9ucy5kYXRlT25seSAmJiB2YWx1ZSAlIDg2NDAwMDAwICE9PSAwKSB7XG4gICAgICAgIGVyciA9IG9wdGlvbnMubm90VmFsaWQgfHxcbiAgICAgICAgICBvcHRpb25zLm1lc3NhZ2UgfHxcbiAgICAgICAgICB0aGlzLm5vdFZhbGlkIHx8XG4gICAgICAgICAgXCJtdXN0IGJlIGEgdmFsaWQgZGF0ZVwiO1xuICAgICAgICByZXR1cm4gdi5mb3JtYXQoZXJyLCB7dmFsdWU6IGFyZ3VtZW50c1swXX0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGVhcmxpZXN0KSAmJiB2YWx1ZSA8IGVhcmxpZXN0KSB7XG4gICAgICAgIGVyciA9IG9wdGlvbnMudG9vRWFybHkgfHxcbiAgICAgICAgICBvcHRpb25zLm1lc3NhZ2UgfHxcbiAgICAgICAgICB0aGlzLnRvb0Vhcmx5IHx8XG4gICAgICAgICAgXCJtdXN0IGJlIG5vIGVhcmxpZXIgdGhhbiAle2RhdGV9XCI7XG4gICAgICAgIGVyciA9IHYuZm9ybWF0KGVyciwge1xuICAgICAgICAgIHZhbHVlOiB0aGlzLmZvcm1hdCh2YWx1ZSwgb3B0aW9ucyksXG4gICAgICAgICAgZGF0ZTogdGhpcy5mb3JtYXQoZWFybGllc3QsIG9wdGlvbnMpXG4gICAgICAgIH0pO1xuICAgICAgICBlcnJvcnMucHVzaChlcnIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGxhdGVzdCkgJiYgdmFsdWUgPiBsYXRlc3QpIHtcbiAgICAgICAgZXJyID0gb3B0aW9ucy50b29MYXRlIHx8XG4gICAgICAgICAgb3B0aW9ucy5tZXNzYWdlIHx8XG4gICAgICAgICAgdGhpcy50b29MYXRlIHx8XG4gICAgICAgICAgXCJtdXN0IGJlIG5vIGxhdGVyIHRoYW4gJXtkYXRlfVwiO1xuICAgICAgICBlcnIgPSB2LmZvcm1hdChlcnIsIHtcbiAgICAgICAgICBkYXRlOiB0aGlzLmZvcm1hdChsYXRlc3QsIG9wdGlvbnMpLFxuICAgICAgICAgIHZhbHVlOiB0aGlzLmZvcm1hdCh2YWx1ZSwgb3B0aW9ucylcbiAgICAgICAgfSk7XG4gICAgICAgIGVycm9ycy5wdXNoKGVycik7XG4gICAgICB9XG5cbiAgICAgIGlmIChlcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB2LnVuaXF1ZShlcnJvcnMpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIHBhcnNlOiBudWxsLFxuICAgICAgZm9ybWF0OiBudWxsXG4gICAgfSksXG4gICAgZGF0ZTogZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSB2LmV4dGVuZCh7fSwgb3B0aW9ucywge2RhdGVPbmx5OiB0cnVlfSk7XG4gICAgICByZXR1cm4gdi52YWxpZGF0b3JzLmRhdGV0aW1lLmNhbGwodi52YWxpZGF0b3JzLmRhdGV0aW1lLCB2YWx1ZSwgb3B0aW9ucyk7XG4gICAgfSxcbiAgICBmb3JtYXQ6IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zKSB7XG4gICAgICBpZiAodi5pc1N0cmluZyhvcHRpb25zKSB8fCAob3B0aW9ucyBpbnN0YW5jZW9mIFJlZ0V4cCkpIHtcbiAgICAgICAgb3B0aW9ucyA9IHtwYXR0ZXJuOiBvcHRpb25zfTtcbiAgICAgIH1cblxuICAgICAgb3B0aW9ucyA9IHYuZXh0ZW5kKHt9LCB0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICB2YXIgbWVzc2FnZSA9IG9wdGlvbnMubWVzc2FnZSB8fCB0aGlzLm1lc3NhZ2UgfHwgXCJpcyBpbnZhbGlkXCJcbiAgICAgICAgLCBwYXR0ZXJuID0gb3B0aW9ucy5wYXR0ZXJuXG4gICAgICAgICwgbWF0Y2g7XG5cbiAgICAgIC8vIEVtcHR5IHZhbHVlcyBhcmUgYWxsb3dlZFxuICAgICAgaWYgKCF2LmlzRGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCF2LmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHYuaXNTdHJpbmcocGF0dGVybikpIHtcbiAgICAgICAgcGF0dGVybiA9IG5ldyBSZWdFeHAob3B0aW9ucy5wYXR0ZXJuLCBvcHRpb25zLmZsYWdzKTtcbiAgICAgIH1cbiAgICAgIG1hdGNoID0gcGF0dGVybi5leGVjKHZhbHVlKTtcbiAgICAgIGlmICghbWF0Y2ggfHwgbWF0Y2hbMF0ubGVuZ3RoICE9IHZhbHVlLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGluY2x1c2lvbjogZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgIC8vIEVtcHR5IHZhbHVlcyBhcmUgZmluZVxuICAgICAgaWYgKCF2LmlzRGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHYuaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgICBvcHRpb25zID0ge3dpdGhpbjogb3B0aW9uc307XG4gICAgICB9XG4gICAgICBvcHRpb25zID0gdi5leHRlbmQoe30sIHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICBpZiAodi5jb250YWlucyhvcHRpb25zLndpdGhpbiwgdmFsdWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBtZXNzYWdlID0gb3B0aW9ucy5tZXNzYWdlIHx8XG4gICAgICAgIHRoaXMubWVzc2FnZSB8fFxuICAgICAgICBcIl4le3ZhbHVlfSBpcyBub3QgaW5jbHVkZWQgaW4gdGhlIGxpc3RcIjtcbiAgICAgIHJldHVybiB2LmZvcm1hdChtZXNzYWdlLCB7dmFsdWU6IHZhbHVlfSk7XG4gICAgfSxcbiAgICBleGNsdXNpb246IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zKSB7XG4gICAgICAvLyBFbXB0eSB2YWx1ZXMgYXJlIGZpbmVcbiAgICAgIGlmICghdi5pc0RlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh2LmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgICAgb3B0aW9ucyA9IHt3aXRoaW46IG9wdGlvbnN9O1xuICAgICAgfVxuICAgICAgb3B0aW9ucyA9IHYuZXh0ZW5kKHt9LCB0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgaWYgKCF2LmNvbnRhaW5zKG9wdGlvbnMud2l0aGluLCB2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIG1lc3NhZ2UgPSBvcHRpb25zLm1lc3NhZ2UgfHwgdGhpcy5tZXNzYWdlIHx8IFwiXiV7dmFsdWV9IGlzIHJlc3RyaWN0ZWRcIjtcbiAgICAgIHJldHVybiB2LmZvcm1hdChtZXNzYWdlLCB7dmFsdWU6IHZhbHVlfSk7XG4gICAgfSxcbiAgICBlbWFpbDogdi5leHRlbmQoZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSB2LmV4dGVuZCh7fSwgdGhpcy5vcHRpb25zLCBvcHRpb25zKTtcbiAgICAgIHZhciBtZXNzYWdlID0gb3B0aW9ucy5tZXNzYWdlIHx8IHRoaXMubWVzc2FnZSB8fCBcImlzIG5vdCBhIHZhbGlkIGVtYWlsXCI7XG4gICAgICAvLyBFbXB0eSB2YWx1ZXMgYXJlIGZpbmVcbiAgICAgIGlmICghdi5pc0RlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghdi5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuUEFUVEVSTi5leGVjKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBQQVRURVJOOiAvXlthLXowLTlcXHUwMDdGLVxcdWZmZmYhIyQlJicqK1xcLz0/Xl9ge3x9fi1dKyg/OlxcLlthLXowLTlcXHUwMDdGLVxcdWZmZmYhIyQlJicqK1xcLz0/Xl9ge3x9fi1dKykqQCg/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cXC4pK1thLXpdezIsfSQvaVxuICAgIH0pLFxuICAgIGVxdWFsaXR5OiBmdW5jdGlvbih2YWx1ZSwgb3B0aW9ucywgYXR0cmlidXRlLCBhdHRyaWJ1dGVzKSB7XG4gICAgICBpZiAoIXYuaXNEZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh2LmlzU3RyaW5nKG9wdGlvbnMpKSB7XG4gICAgICAgIG9wdGlvbnMgPSB7YXR0cmlidXRlOiBvcHRpb25zfTtcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMgPSB2LmV4dGVuZCh7fSwgdGhpcy5vcHRpb25zLCBvcHRpb25zKTtcbiAgICAgIHZhciBtZXNzYWdlID0gb3B0aW9ucy5tZXNzYWdlIHx8XG4gICAgICAgIHRoaXMubWVzc2FnZSB8fFxuICAgICAgICBcImlzIG5vdCBlcXVhbCB0byAle2F0dHJpYnV0ZX1cIjtcblxuICAgICAgaWYgKHYuaXNFbXB0eShvcHRpb25zLmF0dHJpYnV0ZSkgfHwgIXYuaXNTdHJpbmcob3B0aW9ucy5hdHRyaWJ1dGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBhdHRyaWJ1dGUgbXVzdCBiZSBhIG5vbiBlbXB0eSBzdHJpbmdcIik7XG4gICAgICB9XG5cbiAgICAgIHZhciBvdGhlclZhbHVlID0gdi5nZXREZWVwT2JqZWN0VmFsdWUoYXR0cmlidXRlcywgb3B0aW9ucy5hdHRyaWJ1dGUpXG4gICAgICAgICwgY29tcGFyYXRvciA9IG9wdGlvbnMuY29tcGFyYXRvciB8fCBmdW5jdGlvbih2MSwgdjIpIHtcbiAgICAgICAgICByZXR1cm4gdjEgPT09IHYyO1xuICAgICAgICB9O1xuXG4gICAgICBpZiAoIWNvbXBhcmF0b3IodmFsdWUsIG90aGVyVmFsdWUsIG9wdGlvbnMsIGF0dHJpYnV0ZSwgYXR0cmlidXRlcykpIHtcbiAgICAgICAgcmV0dXJuIHYuZm9ybWF0KG1lc3NhZ2UsIHthdHRyaWJ1dGU6IHYucHJldHRpZnkob3B0aW9ucy5hdHRyaWJ1dGUpfSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8vIEEgVVJMIHZhbGlkYXRvciB0aGF0IGlzIHVzZWQgdG8gdmFsaWRhdGUgVVJMcyB3aXRoIHRoZSBhYmlsaXR5IHRvXG4gICAgLy8gcmVzdHJpY3Qgc2NoZW1lcyBhbmQgc29tZSBkb21haW5zLlxuICAgIHVybDogZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgIGlmICghdi5pc0RlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgb3B0aW9ucyA9IHYuZXh0ZW5kKHt9LCB0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICB2YXIgbWVzc2FnZSA9IG9wdGlvbnMubWVzc2FnZSB8fCB0aGlzLm1lc3NhZ2UgfHwgXCJpcyBub3QgYSB2YWxpZCB1cmxcIlxuICAgICAgICAsIHNjaGVtZXMgPSBvcHRpb25zLnNjaGVtZXMgfHwgdGhpcy5zY2hlbWVzIHx8IFsnaHR0cCcsICdodHRwcyddXG4gICAgICAgICwgYWxsb3dMb2NhbCA9IG9wdGlvbnMuYWxsb3dMb2NhbCB8fCB0aGlzLmFsbG93TG9jYWwgfHwgZmFsc2U7XG5cbiAgICAgIGlmICghdi5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgICB9XG5cbiAgICAgIC8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2RwZXJpbmkvNzI5Mjk0XG4gICAgICB2YXIgcmVnZXggPVxuICAgICAgICBcIl5cIiArXG4gICAgICAgIC8vIHByb3RvY29sIGlkZW50aWZpZXJcbiAgICAgICAgXCIoPzooPzpcIiArIHNjaGVtZXMuam9pbihcInxcIikgKyBcIik6Ly8pXCIgK1xuICAgICAgICAvLyB1c2VyOnBhc3MgYXV0aGVudGljYXRpb25cbiAgICAgICAgXCIoPzpcXFxcUysoPzo6XFxcXFMqKT9AKT9cIiArXG4gICAgICAgIFwiKD86XCI7XG5cbiAgICAgIHZhciB0bGQgPSBcIig/OlxcXFwuKD86W2EtelxcXFx1MDBhMS1cXFxcdWZmZmZdezIsfSkpXCI7XG5cbiAgICAgIGlmIChhbGxvd0xvY2FsKSB7XG4gICAgICAgIHRsZCArPSBcIj9cIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlZ2V4ICs9XG4gICAgICAgICAgLy8gSVAgYWRkcmVzcyBleGNsdXNpb25cbiAgICAgICAgICAvLyBwcml2YXRlICYgbG9jYWwgbmV0d29ya3NcbiAgICAgICAgICBcIig/ISg/OjEwfDEyNykoPzpcXFxcLlxcXFxkezEsM30pezN9KVwiICtcbiAgICAgICAgICBcIig/ISg/OjE2OVxcXFwuMjU0fDE5MlxcXFwuMTY4KSg/OlxcXFwuXFxcXGR7MSwzfSl7Mn0pXCIgK1xuICAgICAgICAgIFwiKD8hMTcyXFxcXC4oPzoxWzYtOV18MlxcXFxkfDNbMC0xXSkoPzpcXFxcLlxcXFxkezEsM30pezJ9KVwiO1xuICAgICAgfVxuXG4gICAgICByZWdleCArPVxuICAgICAgICAgIC8vIElQIGFkZHJlc3MgZG90dGVkIG5vdGF0aW9uIG9jdGV0c1xuICAgICAgICAgIC8vIGV4Y2x1ZGVzIGxvb3BiYWNrIG5ldHdvcmsgMC4wLjAuMFxuICAgICAgICAgIC8vIGV4Y2x1ZGVzIHJlc2VydmVkIHNwYWNlID49IDIyNC4wLjAuMFxuICAgICAgICAgIC8vIGV4Y2x1ZGVzIG5ldHdvcmsgJiBicm9hY2FzdCBhZGRyZXNzZXNcbiAgICAgICAgICAvLyAoZmlyc3QgJiBsYXN0IElQIGFkZHJlc3Mgb2YgZWFjaCBjbGFzcylcbiAgICAgICAgICBcIig/OlsxLTldXFxcXGQ/fDFcXFxcZFxcXFxkfDJbMDFdXFxcXGR8MjJbMC0zXSlcIiArXG4gICAgICAgICAgXCIoPzpcXFxcLig/OjE/XFxcXGR7MSwyfXwyWzAtNF1cXFxcZHwyNVswLTVdKSl7Mn1cIiArXG4gICAgICAgICAgXCIoPzpcXFxcLig/OlsxLTldXFxcXGQ/fDFcXFxcZFxcXFxkfDJbMC00XVxcXFxkfDI1WzAtNF0pKVwiICtcbiAgICAgICAgXCJ8XCIgK1xuICAgICAgICAgIC8vIGhvc3QgbmFtZVxuICAgICAgICAgIFwiKD86KD86W2EtelxcXFx1MDBhMS1cXFxcdWZmZmYwLTldLSopKlthLXpcXFxcdTAwYTEtXFxcXHVmZmZmMC05XSspXCIgK1xuICAgICAgICAgIC8vIGRvbWFpbiBuYW1lXG4gICAgICAgICAgXCIoPzpcXFxcLig/OlthLXpcXFxcdTAwYTEtXFxcXHVmZmZmMC05XS0qKSpbYS16XFxcXHUwMGExLVxcXFx1ZmZmZjAtOV0rKSpcIiArXG4gICAgICAgICAgdGxkICtcbiAgICAgICAgXCIpXCIgK1xuICAgICAgICAvLyBwb3J0IG51bWJlclxuICAgICAgICBcIig/OjpcXFxcZHsyLDV9KT9cIiArXG4gICAgICAgIC8vIHJlc291cmNlIHBhdGhcbiAgICAgICAgXCIoPzpbLz8jXVxcXFxTKik/XCIgK1xuICAgICAgXCIkXCI7XG5cbiAgICAgIHZhciBQQVRURVJOID0gbmV3IFJlZ0V4cChyZWdleCwgJ2knKTtcbiAgICAgIGlmICghUEFUVEVSTi5leGVjKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFsaWRhdGUuZm9ybWF0dGVycyA9IHtcbiAgICBkZXRhaWxlZDogZnVuY3Rpb24oZXJyb3JzKSB7cmV0dXJuIGVycm9yczt9LFxuICAgIGZsYXQ6IHYuZmxhdHRlbkVycm9yc1RvQXJyYXksXG4gICAgZ3JvdXBlZDogZnVuY3Rpb24oZXJyb3JzKSB7XG4gICAgICB2YXIgYXR0cjtcblxuICAgICAgZXJyb3JzID0gdi5ncm91cEVycm9yc0J5QXR0cmlidXRlKGVycm9ycyk7XG4gICAgICBmb3IgKGF0dHIgaW4gZXJyb3JzKSB7XG4gICAgICAgIGVycm9yc1thdHRyXSA9IHYuZmxhdHRlbkVycm9yc1RvQXJyYXkoZXJyb3JzW2F0dHJdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlcnJvcnM7XG4gICAgfSxcbiAgICBjb25zdHJhaW50OiBmdW5jdGlvbihlcnJvcnMpIHtcbiAgICAgIHZhciBhdHRyO1xuICAgICAgZXJyb3JzID0gdi5ncm91cEVycm9yc0J5QXR0cmlidXRlKGVycm9ycyk7XG4gICAgICBmb3IgKGF0dHIgaW4gZXJyb3JzKSB7XG4gICAgICAgIGVycm9yc1thdHRyXSA9IGVycm9yc1thdHRyXS5tYXAoZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC52YWxpZGF0b3I7XG4gICAgICAgIH0pLnNvcnQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlcnJvcnM7XG4gICAgfVxuICB9O1xuXG4gIHZhbGlkYXRlLmV4cG9zZU1vZHVsZSh2YWxpZGF0ZSwgdGhpcywgZXhwb3J0cywgbW9kdWxlLCBkZWZpbmUpO1xufSkuY2FsbCh0aGlzLFxuICAgICAgICB0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcgPyAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyBleHBvcnRzIDogbnVsbCxcbiAgICAgICAgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyBtb2R1bGUgOiBudWxsLFxuICAgICAgICB0eXBlb2YgZGVmaW5lICE9PSAndW5kZWZpbmVkJyA/IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIGRlZmluZSA6IG51bGwpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRlLmpzL3ZhbGlkYXRlLmpzIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vYmluL2Vycm9yJyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvY3VzdG9tLWVycm9yLWluc3RhbmNlL2luZGV4LmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gQ3VzdG9tRXJyb3I7XG5DdXN0b21FcnJvci5mYWN0b3J5ID0gcmVxdWlyZSgnLi9mYWN0b3JpZXMuanMnKTtcblxudmFyIEVyciA9IEN1c3RvbUVycm9yKCdDdXN0b21FcnJvcicpO1xuRXJyLm9yZGVyID0gQ3VzdG9tRXJyb3IoRXJyLCB7IG1lc3NhZ2U6ICdBcmd1bWVudHMgb3V0IG9mIG9yZGVyLicsIGNvZGU6ICdFT0FSRycgfSk7XG5cbi8qKlxuICogQ3JlYXRlIGEgY3VzdG9tIGVycm9yXG4gKiBAcGFyYW0ge3N0cmluZ30gW25hbWVdIFRoZSBuYW1lIHRvIGdpdmUgdGhlIGVycm9yLiBEZWZhdWx0cyB0byB0aGUgbmFtZSBvZiBpdCdzIHBhcmVudC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFtwYXJlbnRdIFRoZSBFcnJvciBvciBDdXN0b21FcnJvciBjb25zdHJ1Y3RvciB0byBpbmhlcml0IGZyb20uXG4gKiBAcGFyYW0ge29iamVjdH0gW3Byb3BlcnRpZXNdIFRoZSBkZWZhdWx0IHByb3BlcnRpZXMgZm9yIHRoZSBjdXN0b20gZXJyb3IuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBbZmFjdG9yeV0gQSBmdW5jdGlvbiB0byBjYWxsIHRvIG1vZGlmeSB0aGUgY3VzdG9tIGVycm9yIGluc3RhbmNlIHdoZW4gaXQgaXMgaW5zdGFudGlhdGVkLlxuICogQHJldHVybnMge2Z1bmN0aW9ufSB0aGF0IHNob3VsZCBiZSB1c2VkIGFzIGEgY29uc3RydWN0b3IuXG4gKi9cbmZ1bmN0aW9uIEN1c3RvbUVycm9yKG5hbWUsIHBhcmVudCwgcHJvcGVydGllcywgZmFjdG9yeSkge1xuICAgIHZhciBjb25zdHJ1Y3Q7XG4gICAgdmFyIGlzUm9vdDtcblxuICAgIC8vIG5vcm1hbGl6ZSBhcmd1bWVudHNcbiAgICBwYXJlbnQgPSBmaW5kQXJnKGFyZ3VtZW50cywgMSwgRXJyb3IsIGlzUGFyZW50QXJnLCBbaXNQcm9wZXJ0aWVzQXJnLCBpc0ZhY3RvcnlBcmddKTtcbiAgICBwcm9wZXJ0aWVzID0gZmluZEFyZyhhcmd1bWVudHMsIDIsIHt9LCBpc1Byb3BlcnRpZXNBcmcsIFtpc0ZhY3RvcnlBcmddKTtcbiAgICBmYWN0b3J5ID0gZmluZEFyZyhhcmd1bWVudHMsIDMsIG5vb3AsIGlzRmFjdG9yeUFyZywgW10pO1xuICAgIG5hbWUgPSBmaW5kQXJnKGFyZ3VtZW50cywgMCwgcGFyZW50ID09PSBFcnJvciA/ICdFcnJvcicgOiBwYXJlbnQucHJvdG90eXBlLkN1c3RvbUVycm9yLm5hbWUsIGlzTmFtZUFyZywgW2lzUGFyZW50QXJnLCBpc1Byb3BlcnRpZXNBcmcsIGlzRmFjdG9yeUFyZ10pO1xuXG4gICAgLy8gaWYgdGhpcyBpcyB0aGUgcm9vdCBhbmQgdGhlaXIgaXMgbm8gZmFjdG9yeSB0aGVuIHVzZSB0aGUgZGVmYXVsdCByb290IGZhY3RvcnlcbiAgICBpc1Jvb3QgPSBwYXJlbnQgPT09IEVycm9yO1xuICAgIGlmIChpc1Jvb3QgJiYgZmFjdG9yeSA9PT0gbm9vcCkgZmFjdG9yeSA9IEN1c3RvbUVycm9yLmZhY3Rvcnkucm9vdDtcblxuICAgIC8vIGJ1aWxkIHRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvblxuICAgIGNvbnN0cnVjdCA9IGZ1bmN0aW9uKG1lc3NhZ2UsIGNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgdmFyIF90aGlzO1xuICAgICAgICB2YXIgYXI7XG4gICAgICAgIHZhciBmYWN0b3JpZXM7XG4gICAgICAgIHZhciBpO1xuICAgICAgICB2YXIgaXRlbTtcbiAgICAgICAgdmFyIHByb3BzO1xuXG4gICAgICAgIC8vIGZvcmNlIHRoaXMgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdpdGggdGhlIG5ldyBrZXl3b3JkXG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBjb25zdHJ1Y3QpKSByZXR1cm4gbmV3IGNvbnN0cnVjdChtZXNzYWdlLCBjb25maWd1cmF0aW9uKTtcblxuICAgICAgICAvLyByZW5hbWUgdGhlIGNvbnN0cnVjdG9yXG4gICAgICAgIGRlbGV0ZSB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmNvbnN0cnVjdG9yLCAnbmFtZScsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IG5hbWUsXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gbWFrZSBzdXJlIHRoYXQgdGhlIG1lc3NhZ2UgaXMgYW4gb2JqZWN0XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycpIG1lc3NhZ2UgPSB7IG1lc3NhZ2U6IG1lc3NhZ2UgfTtcbiAgICAgICAgaWYgKCFtZXNzYWdlKSBtZXNzYWdlID0ge307XG5cbiAgICAgICAgLy8gYnVpbGQgdGhlIHByb3BlcnRpZXMgb2JqZWN0XG4gICAgICAgIGFyID0gdGhpcy5DdXN0b21FcnJvci5jaGFpbi5zbGljZSgwKS5yZXZlcnNlKCkubWFwKGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZS5wcm9wZXJ0aWVzIH0pO1xuICAgICAgICBhci5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICBhci51bnNoaWZ0KHt9KTtcbiAgICAgICAgcHJvcHMgPSBPYmplY3QuYXNzaWduLmFwcGx5KE9iamVjdCwgYXIpO1xuXG4gICAgICAgIC8vIGJ1aWxkIHRoZSBmYWN0b3JpZXMgY2FsbGVyIChmb3JjaW5nIHNjb3BlIHRvIHRoaXMpXG4gICAgICAgIF90aGlzID0gdGhpcztcbiAgICAgICAgZmFjdG9yaWVzID0ge307XG4gICAgICAgIE9iamVjdC5rZXlzKEN1c3RvbUVycm9yLmZhY3RvcnkpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICBmYWN0b3JpZXNba2V5XSA9IGZ1bmN0aW9uKHByb3BzLCBjb25maWcpIHtcbiAgICAgICAgICAgICAgICBDdXN0b21FcnJvci5mYWN0b3J5W2tleV0uY2FsbChfdGhpcywgcHJvcHMsIGNvbmZpZywgZmFjdG9yaWVzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNhbGwgZWFjaCBmYWN0b3J5IGluIHRoZSBjaGFpbiwgc3RhcnRpbmcgYXQgdGhlIHJvb3RcbiAgICAgICAgZm9yIChpID0gdGhpcy5DdXN0b21FcnJvci5jaGFpbi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgaXRlbSA9IHRoaXMuQ3VzdG9tRXJyb3IuY2hhaW5baV07XG4gICAgICAgICAgICBpZiAoaXRlbS5mYWN0b3J5ICE9PSBub29wKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5mYWN0b3J5LmNhbGwodGhpcywgcHJvcHMsIGNvbmZpZ3VyYXRpb24sIGZhY3Rvcmllcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gY2F1c2UgdGhlIGZ1bmN0aW9uIHByb3RvdHlwZSB0byBpbmhlcml0IGZyb20gcGFyZW50J3MgcHJvdG90eXBlXG4gICAgY29uc3RydWN0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUocGFyZW50LnByb3RvdHlwZSk7XG4gICAgY29uc3RydWN0LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdDtcblxuICAgIC8vIHVwZGF0ZSBlcnJvciBuYW1lXG4gICAgY29uc3RydWN0LnByb3RvdHlwZS5uYW1lID0gbmFtZTtcblxuICAgIC8vIGFkZCBkZXRhaWxzIGFib3V0IHRoZSBjdXN0b20gZXJyb3IgdG8gdGhlIHByb3RvdHlwZVxuICAgIGNvbnN0cnVjdC5wcm90b3R5cGUuQ3VzdG9tRXJyb3IgPSB7XG4gICAgICAgIGNoYWluOiBpc1Jvb3QgPyBbXSA6IHBhcmVudC5wcm90b3R5cGUuQ3VzdG9tRXJyb3IuY2hhaW4uc2xpY2UoMCksXG4gICAgICAgIGZhY3Rvcnk6IGZhY3RvcnksXG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgICBwcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzXG4gICAgfTtcbiAgICBjb25zdHJ1Y3QucHJvdG90eXBlLkN1c3RvbUVycm9yLmNoYWluLnVuc2hpZnQoY29uc3RydWN0LnByb3RvdHlwZS5DdXN0b21FcnJvcik7XG5cbiAgICAvLyB1cGRhdGUgdGhlIHRvU3RyaW5nIG1ldGhvZCBvbiB0aGUgcHJvdG90eXBlIHRvIGFjY2VwdCBhIGNvZGVcbiAgICBjb25zdHJ1Y3QucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLkN1c3RvbUVycm9yLmNoYWluW3RoaXMuQ3VzdG9tRXJyb3IuY2hhaW4ubGVuZ3RoIC0gMV0ubmFtZTtcbiAgICAgICAgaWYgKHRoaXMuY29kZSkgcmVzdWx0ICArPSAnICcgKyB0aGlzLmNvZGU7XG4gICAgICAgIGlmICh0aGlzLm1lc3NhZ2UpIHJlc3VsdCArPSAnOiAnICsgdGhpcy5tZXNzYWdlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbiAgICByZXR1cm4gY29uc3RydWN0O1xufVxuXG5cblxuXG5mdW5jdGlvbiBmaW5kQXJnKGFyZ3MsIGluZGV4LCBkZWZhdWx0VmFsdWUsIGZpbHRlciwgYW50aUZpbHRlcnMpIHtcbiAgICB2YXIgYW50aSA9IC0xO1xuICAgIHZhciBmb3VuZCA9IC0xO1xuICAgIHZhciBpO1xuICAgIHZhciBqO1xuICAgIHZhciBsZW4gPSBpbmRleCA8IGFyZ3MubGVuZ3RoID8gaW5kZXggOiBhcmdzLmxlbmd0aDtcbiAgICB2YXIgdmFsO1xuXG4gICAgZm9yIChpID0gMDsgaSA8PSBsZW47IGkrKykge1xuICAgICAgICB2YWwgPSBhcmdzW2ldO1xuICAgICAgICBpZiAoYW50aSA9PT0gLTEpIHtcbiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBhbnRpRmlsdGVycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChhbnRpRmlsdGVyc1tqXSh2YWwpKSBhbnRpID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZm91bmQgPT09IC0xICYmIGZpbHRlcih2YWwpKSB7XG4gICAgICAgICAgICBmb3VuZCA9IGk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZm91bmQgIT09IC0xICYmIGFudGkgIT09IC0xICYmIGFudGkgPCBmb3VuZCkgdGhyb3cgbmV3IEVyci5vcmRlcigpO1xuICAgIHJldHVybiBmb3VuZCAhPT0gLTEgP2FyZ3NbZm91bmRdIDogZGVmYXVsdFZhbHVlO1xufVxuXG5mdW5jdGlvbiBpc0ZhY3RvcnlBcmcodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nICYmIHZhbHVlICE9PSBFcnJvciAmJiAhdmFsdWUucHJvdG90eXBlLkN1c3RvbUVycm9yO1xufVxuXG5mdW5jdGlvbiBpc05hbWVBcmcodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbn1cblxuZnVuY3Rpb24gaXNQYXJlbnRBcmcodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nICYmICh2YWx1ZSA9PT0gRXJyb3IgfHwgdmFsdWUucHJvdG90eXBlLkN1c3RvbUVycm9yKTtcbn1cblxuZnVuY3Rpb24gaXNQcm9wZXJ0aWVzQXJnKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCc7XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9jdXN0b20tZXJyb3ItaW5zdGFuY2UvYmluL2Vycm9yLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuZXhwZWN0UmVjZWl2ZSA9IGZ1bmN0aW9uKHByb3BlcnRpZXMsIGNvbmZpZ3VyYXRpb24sIGZhY3RvcnkpIHtcbiAgICB2YXIgbWVzc2FnZTtcbiAgICBmYWN0b3J5LnJvb3QocHJvcGVydGllcywgY29uZmlndXJhdGlvbiwgZmFjdG9yeSk7XG5cbiAgICBtZXNzYWdlID0gdGhpcy5tZXNzYWdlO1xuICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KCdleHBlY3RlZCcpKSBtZXNzYWdlICs9ICcgRXhwZWN0ZWQgJyArIHByb3BlcnRpZXMuZXhwZWN0ZWQgKyAnLic7XG4gICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoJ3JlY2VpdmVkJykpIG1lc3NhZ2UgKz0gJyBSZWNlaXZlZDogJyArIHByb3BlcnRpZXMucmVjZWl2ZWQgKyAnLic7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn07XG5cbmV4cG9ydHMucm9vdCA9IGZ1bmN0aW9uKHByb3BlcnRpZXMsIGNvbmZpZ3VyYXRpb24sIGZhY3Rvcmllcykge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdmFyIGNvZGU7XG4gICAgdmFyIGNvbmZpZyA9IHsgc3RhY2tMZW5ndGg6IEVycm9yLnN0YWNrVHJhY2VMaW1pdCwgcm9vdE9ubHk6IHRydWUgfTtcbiAgICB2YXIgbWVzc2FnZVN0ciA9ICcnO1xuICAgIHZhciBvcmlnaW5hbFN0YWNrTGVuZ3RoID0gRXJyb3Iuc3RhY2tUcmFjZUxpbWl0O1xuICAgIHZhciBzdGFjaztcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVN0YWNrKCkge1xuICAgICAgICBzdGFja1swXSA9IF90aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgIF90aGlzLnN0YWNrID0gc3RhY2suam9pbignXFxuJyk7XG4gICAgfVxuXG4gICAgLy8gZ2V0IGNvbmZpZ3VyYXRpb24gb3B0aW9uc1xuICAgIGlmICghY29uZmlndXJhdGlvbiB8fCB0eXBlb2YgY29uZmlndXJhdGlvbiAhPT0gJ29iamVjdCcpIGNvbmZpZ3VyYXRpb24gPSB7fTtcbiAgICBpZiAoY29uZmlndXJhdGlvbi5oYXNPd25Qcm9wZXJ0eSgnc3RhY2tMZW5ndGgnKSAmJlxuICAgICAgICB0eXBlb2YgY29uZmlndXJhdGlvbi5zdGFja0xlbmd0aCA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgIWlzTmFOKGNvbmZpZ3VyYXRpb24uc3RhY2tMZW5ndGgpICYmXG4gICAgICAgIGNvbmZpZ3VyYXRpb24uc3RhY2tMZW5ndGggPj0gMCkgY29uZmlnLnN0YWNrTGVuZ3RoID0gY29uZmlndXJhdGlvbi5zdGFja0xlbmd0aDtcbiAgICBpZiAoIWNvbmZpZ3VyYXRpb24uaGFzT3duUHJvcGVydHkoJ3Jvb3RPbmx5JykpIGNvbmZpZy5yb290T25seSA9IGNvbmZpZ3VyYXRpb24ucm9vdE9ubHk7XG5cbiAgICAvLyBjaGVjayBpZiB0aGlzIHNob3VsZCBvbmx5IGJlIHJ1biBhcyByb290XG4gICAgaWYgKCFjb25maWcucm9vdE9ubHkgfHwgdGhpcy5DdXN0b21FcnJvci5wYXJlbnQgPT09IEVycm9yKSB7XG5cbiAgICAgICAgLy8gY29weSBwcm9wZXJ0aWVzIG9udG8gdGhpcyBvYmplY3RcbiAgICAgICAgT2JqZWN0LmtleXMocHJvcGVydGllcykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgIHN3aXRjaChrZXkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdjb2RlJzpcbiAgICAgICAgICAgICAgICAgICAgY29kZSA9IHByb3BlcnRpZXMuY29kZSB8fCB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21lc3NhZ2UnOlxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlU3RyID0gcHJvcGVydGllcy5tZXNzYWdlIHx8ICcnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBfdGhpc1trZXldID0gcHJvcGVydGllc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBnZW5lcmF0ZSB0aGUgc3RhY2sgdHJhY2VcbiAgICAgICAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ID0gY29uZmlnLnN0YWNrTGVuZ3RoICsgMjtcbiAgICAgICAgc3RhY2sgPSAobmV3IEVycm9yKCkpLnN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICAgICAgc3RhY2suc3BsaWNlKDAsIDMpO1xuICAgICAgICBzdGFjay51bnNoaWZ0KCcnKTtcbiAgICAgICAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ID0gb3JpZ2luYWxTdGFja0xlbmd0aDtcbiAgICAgICAgdGhpcy5zdGFjayA9IHN0YWNrLmpvaW4oJ1xcbicpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnY29kZScsIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb2RlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjb2RlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdXBkYXRlU3RhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdtZXNzYWdlJywge1xuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2VTdHI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VTdHIgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB1cGRhdGVTdGFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG4gICAgICAgIHVwZGF0ZVN0YWNrKCk7XG5cbiAgICB9XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9jdXN0b20tZXJyb3ItaW5zdGFuY2UvYmluL2ZhY3Rvcmllcy5qcyIsImZ1bmN0aW9uIG5vcm1hbGl6ZVJlc3BvbnNlKCBwcm9taXNlLCBvcHRpb25zICkge1xuICAgIHJldHVybiBwcm9taXNlLnRoZW4oKCBkYXRhICkgPT4ge1xuICAgICAgICBpZiAoIHR5cGVvZiBvcHRpb25zLmNhbGxiYWNrID09PSAnZnVuY3Rpb24nICkge1xuICAgICAgICAgICAgb3B0aW9ucy5jYWxsYmFjayggbnVsbCwgZGF0YSApO1xuICAgICAgICB9XG4gICAgICAgIGlmICggdHlwZW9mIG9wdGlvbnMuc3VjY2VzcyA9PT0gJ2Z1bmN0aW9uJyApIHtcbiAgICAgICAgICAgIG9wdGlvbnMuc3VjY2VzcyggZGF0YSApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH0pXG4gICAgLmNhdGNoKCggZXJyb3IgKSA9PiB7XG4gICAgICAgIGlmICggdHlwZW9mIG9wdGlvbnMuY2FsbGJhY2sgPT09ICdmdW5jdGlvbicgKSB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9ucy5jYWxsYmFjayggZXJyb3IgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIHR5cGVvZiBvcHRpb25zLmVycm9yID09PSAnZnVuY3Rpb24nICkge1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMuZXJyb3IoIGVycm9yICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCBlcnJvciApO1xuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5vcm1hbGl6ZVJlc3BvbnNlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3ZhbGlkYXRlL25vcm1hbGl6ZVJlc3BvbnNlLmpzIiwiY2xhc3MgQnJpbmtiaXRFdmVudCB7XG4gICAgY29uc3RydWN0b3IoIGV2ZW50VHlwZSwgcmVzcG9uc2UgKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IGV2ZW50VHlwZTtcbiAgICAgICAgdGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCcmlua2JpdEV2ZW50O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2V2ZW50cy9pbmRleC5qcyIsImNvbnN0IFZhbGlkYXRpb25FcnJvciA9IHJlcXVpcmUoICcuL3ZhbGlkYXRlL3ZhbGlkYXRpb25FcnJvcicgKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZW5zdXJlUHJvbWlzZTogZnVuY3Rpb24gZW5zdXJlUHJvbWlzZSggdmFsdWUgKSB7XG4gICAgICAgIGlmICggdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JyApIHJldHVybiBQcm9taXNlLnJlc29sdmUoIHZhbHVlICk7XG4gICAgICAgIGlmICggdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbicgKSByZXR1cm4gdmFsdWU7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHZhbHVlIGluc3RhbmNlb2YgRXJyb3IgfHxcbiAgICAgICAgICAgIHZhbHVlIGluc3RhbmNlb2YgVHlwZUVycm9yXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCB2YWx1ZSApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIHZhbHVlICk7XG4gICAgfSxcbiAgICBwcm9taXNpZnlWYWxpZGF0aW9uOiBmdW5jdGlvbiBwcm9taXNpZnlWYWxpZGF0aW9uKCB2YWx1ZSApIHtcbiAgICAgICAgaWYgKCB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICkge1xuICAgICAgICAgICAgaWYgKCB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJyApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICB2YWx1ZSBpbnN0YW5jZW9mIFZhbGlkYXRpb25FcnJvciB8fFxuICAgICAgICAgICAgICAgIHZhbHVlIGluc3RhbmNlb2YgRXJyb3IgfHxcbiAgICAgICAgICAgICAgICB2YWx1ZSBpbnN0YW5jZW9mIFR5cGVFcnJvclxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCB2YWx1ZSApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgVmFsaWRhdGlvbkVycm9yKCk7XG4gICAgICAgICAgICBlcnJvci5kZXRhaWxzID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoIGVycm9yICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoIHZhbHVlICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWwuanMiLCJjb25zdCBhbmFseXRpY3MgPSByZXF1aXJlKCAnLi9hbmFseXRpY3MnICk7XG5jb25zdCBnYW1lRGF0YSA9IHJlcXVpcmUoICcuL2dhbWVEYXRhJyApO1xuY29uc3QgcGxheWVyRGF0YSA9IHJlcXVpcmUoICcuL3BsYXllckRhdGEnICk7XG5jb25zdCBwbGF5ZXIgPSByZXF1aXJlKCAnLi9wbGF5ZXInICk7XG5cbm1vZHVsZS5leHBvcnRzID0gW1xuICAgIHBsYXllcixcbiAgICBhbmFseXRpY3MsXG4gICAgZ2FtZURhdGEsXG4gICAgcGxheWVyRGF0YSxcbl07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZGVmYXVsdHMvaW5kZXguanMiLCJjb25zdCB2NCA9IHJlcXVpcmUoICd1dWlkL3Y0JyApO1xuY29uc3QgUGx1Z2luID0gcmVxdWlyZSggJy4uL3BsdWdpbicgKTtcbmNvbnN0IHZhbGlkYXRlID0gcmVxdWlyZSggJy4uL3ZhbGlkYXRlJyApO1xuXG5mdW5jdGlvbiBpbml0aWFsaXplUGxheWVyRGF0YSggYnJpbmtiaXQsIHBsYXllciApIHtcbiAgICBjbGFzcyBQbGF5ZXJEYXRhIGV4dGVuZHMgUGx1Z2luIHtcblxuICAgICAgICBjb25zdHJ1Y3RvciggaW5pdGlhbERhdGEgKSB7XG4gICAgICAgICAgICBzdXBlciggYnJpbmtiaXQsIHtcbiAgICAgICAgICAgICAgICBpbml0aWFsRGF0YSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgICAgICAgICBfaWQ6IHY0KCksXG4gICAgICAgICAgICAgICAgICAgIGRhdGVDcmVhdGVkOiBuZXcgRGF0ZSgpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHBsYXllcklkOiBwbGF5ZXIuaWQsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwbHVnaW5JZDogJ2FuYWx5dGljcycsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3BsYXllcicsXG4gICAgICAgICAgICAgICAgcGxheWVyLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm1pZGRsZXdhcmUuc2F2ZSA9IHRoaXMuc2F2ZU1pZGRsZXdhcmUuYmluZCggdGhpcyApO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGljIHZhbGlkYXRlKCBtZXRob2QsIGRhdGEgKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsaWRhdGUoIGRhdGEsIHtcbiAgICAgICAgICAgICAgICBkYXRlQ3JlYXRlZDoge1xuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgIHByZXNlbmNlOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcGxheWVySWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgICAgICBwcmVzZW5jZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgICAgICBwcmVzZW5jZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBzYXZlTWlkZGxld2FyZSggb3B0aW9ucyApIHtcbiAgICAgICAgICAgIGNvbnN0IHsgYm9keSB9ID0gb3B0aW9ucztcbiAgICAgICAgICAgIGlmICggIWJvZHkucGxheWVySWQgKSB7XG4gICAgICAgICAgICAgICAgYm9keS5wbGF5ZXJJZCA9IHRoaXMucGxheWVyLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBQbGF5ZXJEYXRhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBuYW1lOiAnQW5hbHl0aWMnLFxuICAgIHR5cGU6ICdwbGF5ZXInLFxuICAgIGluaXRpYWxpemU6IGluaXRpYWxpemVQbGF5ZXJEYXRhLFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kZWZhdWx0cy9hbmFseXRpY3MuanMiLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiAgSW4gdGhlXG4vLyBicm93c2VyIHRoaXMgaXMgYSBsaXR0bGUgY29tcGxpY2F0ZWQgZHVlIHRvIHVua25vd24gcXVhbGl0eSBvZiBNYXRoLnJhbmRvbSgpXG4vLyBhbmQgaW5jb25zaXN0ZW50IHN1cHBvcnQgZm9yIHRoZSBgY3J5cHRvYCBBUEkuICBXZSBkbyB0aGUgYmVzdCB3ZSBjYW4gdmlhXG4vLyBmZWF0dXJlLWRldGVjdGlvblxudmFyIHJuZztcblxudmFyIGNyeXB0byA9IGdsb2JhbC5jcnlwdG8gfHwgZ2xvYmFsLm1zQ3J5cHRvOyAvLyBmb3IgSUUgMTFcbmlmIChjcnlwdG8gJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xuICAvLyBXSEFUV0cgY3J5cHRvIFJORyAtIGh0dHA6Ly93aWtpLndoYXR3Zy5vcmcvd2lraS9DcnlwdG9cbiAgdmFyIHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4gIHJuZyA9IGZ1bmN0aW9uIHdoYXR3Z1JORygpIHtcbiAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbiAgICByZXR1cm4gcm5kczg7XG4gIH07XG59XG5cbmlmICghcm5nKSB7XG4gIC8vIE1hdGgucmFuZG9tKCktYmFzZWQgKFJORylcbiAgLy9cbiAgLy8gSWYgYWxsIGVsc2UgZmFpbHMsIHVzZSBNYXRoLnJhbmRvbSgpLiAgSXQncyBmYXN0LCBidXQgaXMgb2YgdW5zcGVjaWZpZWRcbiAgLy8gcXVhbGl0eS5cbiAgdmFyIHJuZHMgPSBuZXcgQXJyYXkoMTYpO1xuICBybmcgPSBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgcjsgaSA8IDE2OyBpKyspIHtcbiAgICAgIGlmICgoaSAmIDB4MDMpID09PSAwKSByID0gTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgcm5kc1tpXSA9IHIgPj4+ICgoaSAmIDB4MDMpIDw8IDMpICYgMHhmZjtcbiAgICB9XG5cbiAgICByZXR1cm4gcm5kcztcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBybmc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdXVpZC9saWIvcm5nLWJyb3dzZXIuanMiLCIvKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cbnZhciBieXRlVG9IZXggPSBbXTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4W2ldID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKTtcbn1cblxuZnVuY3Rpb24gYnl0ZXNUb1V1aWQoYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBvZmZzZXQgfHwgMDtcbiAgdmFyIGJ0aCA9IGJ5dGVUb0hleDtcbiAgcmV0dXJuIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBieXRlc1RvVXVpZDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ieXRlc1RvVXVpZC5qcyIsImNvbnN0IHY0ID0gcmVxdWlyZSggJ3V1aWQvdjQnICk7XG5jb25zdCBQbHVnaW4gPSByZXF1aXJlKCAnLi4vcGx1Z2luJyApO1xuXG5mdW5jdGlvbiBpbml0aWFsaXplR2FtZURhdGEoIGJyaW5rYml0ICkge1xuICAgIGNsYXNzIEdhbWVEYXRhIGV4dGVuZHMgUGx1Z2luIHtcblxuICAgICAgICBjb25zdHJ1Y3RvciggaW5pdGlhbERhdGEgKSB7XG4gICAgICAgICAgICBzdXBlciggYnJpbmtiaXQsIHtcbiAgICAgICAgICAgICAgICBpbml0aWFsRGF0YSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgICAgICAgICBfaWQ6IHY0KCksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwbHVnaW5JZDogJ2dhbWVkYXRhJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnZ2FtZScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBHYW1lRGF0YTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbmFtZTogJ0RhdGEnLFxuICAgIHR5cGU6ICdnYW1lJyxcbiAgICBpbml0aWFsaXplOiBpbml0aWFsaXplR2FtZURhdGEsXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RlZmF1bHRzL2dhbWVEYXRhLmpzIiwiY29uc3QgdjQgPSByZXF1aXJlKCAndXVpZC92NCcgKTtcbmNvbnN0IFBsdWdpbiA9IHJlcXVpcmUoICcuLi9wbHVnaW4nICk7XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVQbGF5ZXJEYXRhKCBicmlua2JpdCwgcGxheWVyICkge1xuICAgIGNsYXNzIFBsYXllckRhdGEgZXh0ZW5kcyBQbHVnaW4ge1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKCBpbml0aWFsRGF0YSApIHtcbiAgICAgICAgICAgIHN1cGVyKCBicmlua2JpdCwge1xuICAgICAgICAgICAgICAgIGluaXRpYWxEYXRhLFxuICAgICAgICAgICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICAgICAgICAgIF9pZDogdjQoKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBsdWdpbklkOiAncGxheWVyZGF0YScsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3BsYXllcicsXG4gICAgICAgICAgICAgICAgcGxheWVyLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUGxheWVyRGF0YTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbmFtZTogJ0RhdGEnLFxuICAgIHR5cGU6ICdwbGF5ZXInLFxuICAgIGluaXRpYWxpemU6IGluaXRpYWxpemVQbGF5ZXJEYXRhLFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kZWZhdWx0cy9wbGF5ZXJEYXRhLmpzIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cblxuY29uc3QgbWVyZ2UgPSByZXF1aXJlKCAnbG9kYXNoLm1lcmdlJyApO1xuXG5jb25zdCB2YWxpZGF0ZSA9IHJlcXVpcmUoICcuLi92YWxpZGF0ZScgKTtcbmNvbnN0IFZhbGlkYXRpb25FcnJvciA9IHJlcXVpcmUoICcuLi92YWxpZGF0ZS92YWxpZGF0aW9uRXJyb3InICk7XG5jb25zdCBub3JtYWxpemVBcmd1bWVudHMgPSByZXF1aXJlKCAnLi4vdmFsaWRhdGUvbm9ybWFsaXplQXJndW1lbnRzJyApO1xuY29uc3QgUGx1Z2luID0gcmVxdWlyZSggJy4uL3BsdWdpbicgKTtcblxuZnVuY3Rpb24gaW5pdGlhbGl6ZSggYnJpbmtiaXQgKSB7XG4gICAgY2xhc3MgUGxheWVyIGV4dGVuZHMgUGx1Z2luIHtcblxuICAgICAgICBjb25zdHJ1Y3RvciggaW5pdGlhbERhdGEgKSB7XG4gICAgICAgICAgICBzdXBlciggYnJpbmtiaXQsIHtcbiAgICAgICAgICAgICAgICBpbml0aWFsRGF0YSxcbiAgICAgICAgICAgICAgICByZWFkOiBbICdfaWQnLCAnZGF0ZUNyZWF0ZWQnLCAnZW1haWwnLCAndXNlcm5hbWUnIF0sXG4gICAgICAgICAgICAgICAgd3JpdGU6IFsgJ2VtYWlsJywgJ3Bhc3N3b3JkJywgJ3VzZXJuYW1lJyBdLFxuICAgICAgICAgICAgICAgIHBsdWdpbklkOiAncGxheWVycycsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2NvcmUnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIGluaXRpYWxEYXRhICkge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRlLmNvbnN0cnVjdG9yKCBpbml0aWFsRGF0YSwge1xuICAgICAgICAgICAgICAgICAgICB1c2VybmFtZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB0b2tlbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmICggaW5pdGlhbERhdGEudG9rZW4gKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9rZW4gPSBpbml0aWFsRGF0YS50b2tlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1pZGRsZXdhcmUuc2F2ZSA9IHRoaXMuc2F2ZU1pZGRsZXdhcmUuYmluZCggdGhpcyApO1xuICAgICAgICAgICAgUGxheWVyLnBsdWdpbnMuZm9yRWFjaCgoIHBsdWdpbiApID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzW3BsdWdpbi5uYW1lXSA9IHBsdWdpbi5pbml0aWFsaXplKCBicmlua2JpdCwgdGhpcyApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBsb2dpbiggLi4uYXJncyApIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBub3JtYWxpemVBcmd1bWVudHMoIC4uLmFyZ3MgKTtcbiAgICAgICAgICAgIG9wdGlvbnMucGFzc3dvcmQgPSBvcHRpb25zLnVyaTtcbiAgICAgICAgICAgIG9wdGlvbnMudXJpID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29uc3Qgb3B0cyA9IG1lcmdlKHt9LCB0aGlzLmRhdGEsIG9wdGlvbnMgKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJyaW5rYml0LmxvZ2luKCBvcHRzLCB0aGlzIClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvZ291dCgpIHtcbiAgICAgICAgICAgIHRoaXMudG9rZW4gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoIHRoaXMuaXNQcmltYXJ5ICkge1xuICAgICAgICAgICAgICAgIHRoaXMuYnJpbmtiaXQubG9nb3V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcm9tb3RlKCkge1xuICAgICAgICAgICAgdGhpcy5icmlua2JpdC5wcm9tb3RlUGxheWVyKCB0aGlzICk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3Jnb3QoIG9wdGlvbnMgKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5icmlua2JpdC5mb3Jnb3QoIG9wdGlvbnMgfHwgdGhpcy5kYXRhICk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRVcmwoIG1ldGhvZCApIHtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHRoaXMuaWQgfHwgdGhpcy5kYXRhLl9pZDtcbiAgICAgICAgICAgIGlmICggbWV0aG9kID09PSAnZ2V0JyAmJiAhdGhpcy5pZCApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJy4vcGxheWVyaW5mby8nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCBtZXRob2QgPT09ICdwb3N0JyApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJy4vcGxheWVycy8nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGAuL3BsYXllcnMvJHtrZXl9L2A7XG4gICAgICAgIH1cblxuICAgICAgICBzYXZlTWlkZGxld2FyZSggb3B0aW9ucyApIHtcbiAgICAgICAgICAgIGlmICggIXRoaXMuaWQgKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wYXNzVG9rZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmJvZHkuZ2FtZUlkID0gb3B0aW9ucy5ib2R5LmdhbWVJZCB8fCB0aGlzLmJyaW5rYml0LmdhbWVJZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLmJvZHkudXNlcm5hbWU7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMuYm9keS5wYXNzd29yZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFsaWRhdGUoIG1ldGhvZCwgb3B0aW9ucyApIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBvcHRpb25zLmJvZHk7XG4gICAgICAgICAgICBzd2l0Y2ggKCBtZXRob2QgKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZGVsZXRlJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCBuZXcgRXJyb3IoICdDYW5ub3QgZGVsZXRlIHVzZXInICkpO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3Bvc3QnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsaWRhdGUoIGRhdGEsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXNlbmNlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXNlbmNlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXNlbmNlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY2FzZSAncHV0JzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRlKCBkYXRhLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VybmFtZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVzZW5jZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlc2VuY2U6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIG9wdGlvbnMudG9rZW4gPT09ICdzdHJpbmcnID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5yZWplY3QoIG5ldyBWYWxpZGF0aW9uRXJyb3IoICdVc2VyIGlzIG5vdCBsb2dnZWQgaW4nICkpXG4gICAgICAgICAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygb3B0aW9ucy50b2tlbiA9PT0gJ3N0cmluZycgP1xuICAgICAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5yZWplY3QoIG5ldyBWYWxpZGF0aW9uRXJyb3IoICdVc2VyIGlzIG5vdCBsb2dnZWQgaW4nICkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBQbGF5ZXIucGx1Z2lucyA9IFtdO1xuXG4gICAgcmV0dXJuIFBsYXllcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbmFtZTogJ1BsYXllcicsXG4gICAgdHlwZTogJ2NvcmUnLFxuICAgIGluaXRpYWxpemUsXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RlZmF1bHRzL3BsYXllci5qcyJdLCJzb3VyY2VSb290IjoiIn0=