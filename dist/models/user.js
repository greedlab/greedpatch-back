'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bluebird = require('bluebird');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _encrypt = require('../utils/encrypt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Bell on 16/8/10.
 */

_mongoose2.default.Promise = global.Promise;

var User = new _mongoose2.default.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: Number, default: 0 },
    role: { type: Number, default: 0 }
});

User.pre('save', function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(next) {
        var user, hash;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        user = this;

                        if (user.isModified('password')) {
                            _context.next = 3;
                            break;
                        }

                        return _context.abrupt('return', next());

                    case 3:
                        _context.prev = 3;
                        _context.next = 6;
                        return (0, _encrypt.hashPassword)(user.password);

                    case 6:
                        hash = _context.sent;

                        user.password = hash;
                        return _context.abrupt('return', next());

                    case 11:
                        _context.prev = 11;
                        _context.t0 = _context['catch'](3);
                        return _context.abrupt('return', next(_context.t0));

                    case 14:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[3, 11]]);
    }));

    function preSave(_x) {
        return _ref.apply(this, arguments);
    }

    return preSave;
}());

User.methods.validatePassword = function () {
    var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(password) {
        var user, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        user = this;
                        _context2.next = 3;
                        return (0, _encrypt.compareHashString)(password, user.password);

                    case 3:
                        result = _context2.sent;
                        return _context2.abrupt('return', result);

                    case 5:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    function validatePassword(_x2) {
        return _ref2.apply(this, arguments);
    }

    return validatePassword;
}();

User.methods.generateToken = function generateToken() {
    var user = this;
    var iat = Date.now() / 1000;
    var exp = iat + 30 * 24 * 60 * 60;
    var scope = 'default';
    return _jsonwebtoken2.default.sign({ iat: iat, exp: exp, id: user.id, scope: scope }, _config2.default.token);
};

User.methods.generateCheckPatchToken = function generateCheckPatchToken() {
    var user = this;
    var iat = Date.now();
    var scope = 'patch:check';
    return _jsonwebtoken2.default.sign({ iat: iat, id: user.id, scope: scope }, _config2.default.token);
};

User.methods.generateSetPasswordToken = function generateSetPasswordToken() {
    var user = this;
    var iat = Date.now() / 1000;
    var exp = iat + 24 * 60 * 60;
    var scope = 'all';
    return _jsonwebtoken2.default.sign({ iat: iat, exp: exp, id: user.id, scope: scope }, _config2.default.token);
};

exports.default = _mongoose2.default.model('user', User);
//# sourceMappingURL=user.js.map
