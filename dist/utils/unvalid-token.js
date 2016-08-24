'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.existed = exports.delToken = exports.addToken = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

/**
 * add unvalid token to redis
 *
 * @param token
 */
var addToken = exports.addToken = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(token) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return client.setAsync(token, 1);

                    case 2:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function addToken(_x) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * delete unvalid token from redis
 *
 * @param token
 */


var delToken = exports.delToken = function () {
    var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(token) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return client.delAsync(token);

                    case 2:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function delToken(_x2) {
        return _ref2.apply(this, arguments);
    };
}();

/**
 * whether unvalid token is existed in redis
 * if true,the token is unvalid
 *
 * @param token
 * @returns {boolean}
 */


var existed = exports.existed = function () {
    var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(token) {
        var result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return client.getAsync(token);

                    case 3:
                        result = _context3.sent;

                        if (!result) {
                            _context3.next = 8;
                            break;
                        }

                        return _context3.abrupt('return', true);

                    case 8:
                        return _context3.abrupt('return', false);

                    case 9:
                        _context3.next = 14;
                        break;

                    case 11:
                        _context3.prev = 11;
                        _context3.t0 = _context3['catch'](0);
                        return _context3.abrupt('return', true);

                    case 14:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[0, 11]]);
    }));

    return function existed(_x3) {
        return _ref3.apply(this, arguments);
    };
}();

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = _redis2.default.createClient(_config2.default.redisOptions); /**
                                                                           * unvalid token
                                                                           *
                                                                           * Created by Bell on 16/8/12.
                                                                           */

_bluebird2.default.promisifyAll(_redis2.default.RedisClient.prototype);
//# sourceMappingURL=unvalid-token.js.map
