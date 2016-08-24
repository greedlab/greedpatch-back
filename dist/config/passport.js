'use strict';

var _bluebird = require('bluebird');

var _koaPassport = require('koa-passport');

var _koaPassport2 = _interopRequireDefault(_koaPassport);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _passportLocal = require('passport-local');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_koaPassport2.default.use('local', new _passportLocal.Strategy({
    usernameField: 'email',
    passwordField: 'passwd',
    session: false
}, function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(username, password, done) {
        var user, isMatch;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _user2.default.findOne({ email: username });

                    case 3:
                        user = _context.sent;

                        if (user) {
                            _context.next = 6;
                            break;
                        }

                        return _context.abrupt('return', done(null, false));

                    case 6:
                        _context.prev = 6;
                        _context.next = 9;
                        return user.validatePassword(password);

                    case 9:
                        isMatch = _context.sent;

                        if (isMatch) {
                            _context.next = 12;
                            break;
                        }

                        return _context.abrupt('return', done(null, false));

                    case 12:
                        done(null, user);
                        _context.next = 18;
                        break;

                    case 15:
                        _context.prev = 15;
                        _context.t0 = _context['catch'](6);

                        done(_context.t0);

                    case 18:
                        _context.next = 23;
                        break;

                    case 20:
                        _context.prev = 20;
                        _context.t1 = _context['catch'](0);
                        return _context.abrupt('return', done(_context.t1));

                    case 23:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 20], [6, 15]]);
    }));

    return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}())); /**
        * Created by Bell on 16/8/10.
        */
//# sourceMappingURL=passport.js.map
