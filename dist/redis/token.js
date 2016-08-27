'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.existed = exports.del = exports.add = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

/**
 * add token and iat to redis
 *
 * @param token
 */
var add = exports.add = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(token, exp) {
        var key;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        key = getKey(token);
                        _context.next = 3;
                        return client.setAsync(key, 1);

                    case 3:
                        if (!exp) {
                            _context.next = 6;
                            break;
                        }

                        _context.next = 6;
                        return client.pexpireatAsync(key, exp);

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function add(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * delete token from redis
 *
 * @param userid
 * @param token
 */


var del = exports.del = function () {
    var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(token) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return client.delAsync(getKey(token));

                    case 2:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function del(_x3) {
        return _ref2.apply(this, arguments);
    };
}();

/**
 * whether token is existed in redis
 * if true,the token is unvalid
 *
 * @param userid
 * @param token
 * @returns {boolean}
 */


var existed = exports.existed = function () {
    var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(token) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return client.existsAsync(getKey(token));

                    case 2:
                        return _context3.abrupt('return', _context3.sent);

                    case 3:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function existed(_x4) {
        return _ref3.apply(this, arguments);
    };
}();

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = new _debug2.default(_package2.default.name); /**
                                                          * Created by Bell on 16/8/27.
                                                          */

_bluebird2.default.promisifyAll(_redis2.default.RedisClient.prototype);

var client = _redis2.default.createClient(_config2.default.redisOptions);

client.on("error", function (err) {
    debug("Error: " + err);
});

function getKey(token) {
    return "token:" + token;
}
//# sourceMappingURL=token.js.map
