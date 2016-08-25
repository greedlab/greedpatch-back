'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareHashString = exports.hashString = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

/**
 * get hashed string
 *
 * @param string
 * @returns hashed string
 */
var hashString = exports.hashString = function () {
  var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(string) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return hashAsync(string, 10);

          case 2:
            return _context.abrupt('return', _context.sent);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function hashString(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * compare string with hashed string
 *
 * @param string
 * @param hashedString
 * @returns {*}
 */


var compareHashString = exports.compareHashString = function () {
  var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(string, hashedString) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return compareAsync(string, hashedString);

          case 2:
            return _context2.abrupt('return', _context2.sent);

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function compareHashString(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Bell on 16/8/25.
 */

var hashAsync = _bluebird2.default.promisify(_bcrypt2.default.hash);
var compareAsync = _bluebird2.default.promisify(_bcrypt2.default.compare);
//# sourceMappingURL=auth.js.map
