'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatus = exports.setStatus = exports.getTimestamp = exports.setTimestamp = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

/**
 * set timestamp for user
 *
 * @param userid
 * @param timestamp will be valid after the timestamp
 */
var setTimestamp = exports.setTimestamp = function () {
  var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(userid, timestamp) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return client.hsetAsync(NAME + userid, 'timestamp', timestamp);

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function setTimestamp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * get timestamp from user
 *
 * @param userid
 * @returns timestamp will be valid after the timestamp
 */


var getTimestamp = exports.getTimestamp = function () {
  var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(userid) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return client.hgetAsync(NAME + userid, 'timestamp');

          case 2:
            return _context2.abrupt('return', _context2.sent);

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getTimestamp(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * set status for user
 *
 * @param userid
 * @param status
 */


var setStatus = exports.setStatus = function () {
  var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(userid, status) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return client.hsetAsync(NAME + userid, 'status', status);

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function setStatus(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * get status from user
 *
 * @param userid
 * @returns status
 */


var getStatus = exports.getStatus = function () {
  var _ref4 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(userid) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return client.hgetAsync(NAME + userid, 'status');

          case 2:
            return _context4.abrupt('return', _context4.sent);

          case 3:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getStatus(_x6) {
    return _ref4.apply(this, arguments);
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

var NAME = "user:";
var client = _redis2.default.createClient(_config2.default.redisOptions);

client.on("error", function (err) {
  debug("Error: " + err);
});
//# sourceMappingURL=user.js.map
