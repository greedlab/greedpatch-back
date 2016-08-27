'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.saveToken = exports.getTokens = exports.delTokens = undefined;

var _bluebird = require('bluebird');

var delTokens = exports.delTokens = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(userid) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (userid) {
                            _context.next = 2;
                            break;
                        }

                        return _context.abrupt('return', false);

                    case 2:
                        _context.next = 4;
                        return _token2.default.remove({ userid: userid, status: 0 });

                    case 4:
                        return _context.abrupt('return', true);

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function delTokens(_x) {
        return _ref.apply(this, arguments);
    };
}(); /**
      * Created by Bell on 16/8/24.
      */

var getTokens = exports.getTokens = function () {
    var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(userid) {
        var docs, array, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, doc;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        if (userid) {
                            _context2.next = 2;
                            break;
                        }

                        return _context2.abrupt('return', null);

                    case 2:
                        _context2.next = 4;
                        return _token2.default.find({ userid: userid, status: 0 });

                    case 4:
                        docs = _context2.sent;
                        array = new Array();
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context2.prev = 9;

                        for (_iterator = docs[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            doc = _step.value;

                            if (doc.token) {
                                array.push(doc.token);
                            }
                        }
                        _context2.next = 17;
                        break;

                    case 13:
                        _context2.prev = 13;
                        _context2.t0 = _context2['catch'](9);
                        _didIteratorError = true;
                        _iteratorError = _context2.t0;

                    case 17:
                        _context2.prev = 17;
                        _context2.prev = 18;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 20:
                        _context2.prev = 20;

                        if (!_didIteratorError) {
                            _context2.next = 23;
                            break;
                        }

                        throw _iteratorError;

                    case 23:
                        return _context2.finish(20);

                    case 24:
                        return _context2.finish(17);

                    case 25:
                        return _context2.abrupt('return', array);

                    case 26:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[9, 13, 17, 25], [18,, 20, 24]]);
    }));

    return function getTokens(_x2) {
        return _ref2.apply(this, arguments);
    };
}();

var saveToken = exports.saveToken = function () {
    var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(token, userid, name, type) {
        var object, token_object;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        if (token) {
                            _context3.next = 2;
                            break;
                        }

                        return _context3.abrupt('return', false);

                    case 2:
                        if (userid) {
                            _context3.next = 4;
                            break;
                        }

                        return _context3.abrupt('return', false);

                    case 4:
                        object = { token: token, userid: userid };

                        if (name) {
                            object.name = name;
                        }
                        if (type) {
                            object.type = type;
                        }
                        token_object = new _token2.default(object);
                        _context3.next = 10;
                        return token_object.save();

                    case 10:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function saveToken(_x3, _x4, _x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var _token = require('../models/token');

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=token.js.map
