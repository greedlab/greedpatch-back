'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.del = exports.list = exports.generate = undefined;

var _bluebird = require('bluebird');

var generate = exports.generate = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx, next) {
        var name, user, token, token_object, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        debug(ctx.request.body);
                        name = ctx.request.body.name;


                        if (!name) {
                            ctx.throw(400, 'name can not bel empty');
                        }

                        user = new auth.getUser(ctx);

                        if (!user) {
                            ctx.throw(401);
                        }

                        token = user.generateCheckPatchToken();

                        if (!token) {
                            ctx.throw(500);
                        }

                        token_object = new _token2.default({ token: token, name: name, type: 1 });
                        _context.next = 10;
                        return token_object.save();

                    case 10:

                        // TODO check save response

                        // response
                        response = token_object.toJSON();

                        ctx.body = response;

                        if (!next) {
                            _context.next = 14;
                            break;
                        }

                        return _context.abrupt('return', next());

                    case 14:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function generate(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var list = exports.list = function () {
    var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(ctx, next) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function list(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var del = exports.del = function () {
    var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(ctx, next) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function del(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var _koaPassport = require('koa-passport');

var _koaPassport2 = _interopRequireDefault(_koaPassport);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _token = require('../models/token');

var _token2 = _interopRequireDefault(_token);

var _unvalidToken = require('../utils/unvalid-token');

var _regex = require('../utils/regex');

var regex = _interopRequireWildcard(_regex);

var _auth = require('../utils/auth');

var auth = _interopRequireWildcard(_auth);

var _token3 = require('../utils/token');

var token_util = _interopRequireWildcard(_token3);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = new _debug2.default(_package2.default.name); /**
                                                          * Created by Bell on 16/8/24.
                                                          */
//# sourceMappingURL=token.js.map
