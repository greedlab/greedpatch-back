'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateStatus = exports.updatePassword = exports.setMyPassword = exports.resetPassword = exports.myProfile = exports.modifyMyPassword = exports.logout = exports.login = exports.register = exports.list = undefined;

var _bluebird = require('bluebird');

/**
 * list users
 *
 * @example curl -H "Authorization: Bearer <token>" -X POST localhost:4002/user/list
 *
 * @param ctx
 * @param next
 * @returns {*}
 */
var list = exports.list = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx, next) {
        var users;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _user2.default.find({}, { password: 0, __v: 0 });

                    case 3:
                        users = _context.sent;

                        if (!users) {
                            ctx.throw(404);
                        }
                        ctx.body = {
                            users: users
                        };
                        _context.next = 12;
                        break;

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](0);

                        if (_context.t0 === 404 || _context.t0.name === 'CastError') {
                            ctx.throw(404);
                        }
                        ctx.throw(500);

                    case 12:
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
        }, _callee, this, [[0, 8]]);
    }));

    return function list(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * register
 *
 * @example curl -H "Content-Type: application/json" -X POST -d '{ "email": "greedpatch@greedlab.com", "password": "secretpasas" }' localhost:4002/register
 * @param ctx
 * @param next
 * @returns {*}
 */


var register = exports.register = function () {
    var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(ctx, next) {
        var user, token, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        debug(ctx.request.body);
                        if (!regex.validEmail(ctx.request.body.email)) {
                            ctx.throw(400, 'invalid email');
                        }
                        if (!regex.validPassword(ctx.request.body.password)) {
                            ctx.throw(400, 'invalid password');
                        }
                        user = new _user2.default(ctx.request.body);
                        _context2.prev = 4;
                        _context2.next = 7;
                        return user.save();

                    case 7:
                        _context2.next = 12;
                        break;

                    case 9:
                        _context2.prev = 9;
                        _context2.t0 = _context2['catch'](4);

                        ctx.throw(422, 'email is existed');

                    case 12:
                        token = user.generateToken();
                        _context2.next = 15;
                        return token_util.saveToken(token);

                    case 15:

                        // response
                        response = user.toJSON();

                        delete response.password;
                        ctx.body = {
                            token: token,
                            user: response
                        };

                        if (!next) {
                            _context2.next = 20;
                            break;
                        }

                        return _context2.abrupt('return', next());

                    case 20:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[4, 9]]);
    }));

    return function register(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

/**
 * login
 *
 * @example curl -H "Content-Type: application/json" -X POST -d '{ "email": "greedpatch@greedlab.com", "password": "secretpasas" }' localhost:4002/login
 * @param ctx
 * @param next
 * @returns {*}
 */


var login = exports.login = function () {
    var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(ctx, next) {
        var _this = this;

        var options;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        options = {
                            session: false
                        };
                        return _context4.abrupt('return', _koaPassport2.default.authenticate('local', options, function () {
                            var _ref4 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(user) {
                                var token, response;
                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                    while (1) {
                                        switch (_context3.prev = _context3.next) {
                                            case 0:
                                                if (!user) {
                                                    ctx.throw('unvalid email or password', 401);
                                                }
                                                token = user.generateToken();
                                                _context3.next = 4;
                                                return token_util.saveToken(token);

                                            case 4:
                                                response = user.toJSON();

                                                delete response.password;
                                                ctx.body = {
                                                    token: token,
                                                    user: response
                                                };

                                            case 7:
                                            case 'end':
                                                return _context3.stop();
                                        }
                                    }
                                }, _callee3, _this);
                            }));

                            return function (_x7) {
                                return _ref4.apply(this, arguments);
                            };
                        }())(ctx, next));

                    case 2:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function login(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

/**
 * logout
 *
 * @example curl -H "Authorization: Bearer <token>" -X POST localhost:4002/logout
 * @param ctx
 * @param next
 * @returns {*}
 */


var logout = exports.logout = function () {
    var _ref5 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(ctx, next) {
        var token;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        try {
                            token = auth.getToken(ctx);

                            if (token) {
                                (0, _unvalidToken.addToken)(token);
                            }
                        } catch (err) {
                            ctx.throw(422, err.message);
                        }
                        ctx.status = 204;

                    case 2:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function logout(_x8, _x9) {
        return _ref5.apply(this, arguments);
    };
}();

/**
 * modify my password
 *
 * @example curl -H "Authorization: Bearer <token>" -X POST -d '{"password": "password", "new_password": "new_password"}' localhost:4002/modify-my-password
 * @param ctx
 * @param next
 */


var modifyMyPassword = exports.modifyMyPassword = function () {
    var _ref6 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee6(ctx, next) {
        var user, password, newPassword, equal, hashedNewPassword, token, response;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        debug(ctx.request.body);
                        user = auth.getUser(ctx);

                        if (!user) {
                            ctx.throw(401);
                        }
                        password = ctx.request.body.password;
                        newPassword = ctx.request.body.new_password;

                        if (!password || !newPassword) {
                            ctx.throw(400);
                        }
                        _context6.next = 8;
                        return auth.compareHashString(password, user.password);

                    case 8:
                        equal = _context6.sent;

                        if (!equal) {
                            ctx.throw(401);
                        }
                        _context6.next = 12;
                        return auth.hashString(newPassword);

                    case 12:
                        hashedNewPassword = _context6.sent;
                        _context6.prev = 13;
                        _context6.next = 16;
                        return user.update({ password: hashedNewPassword });

                    case 16:
                        _context6.next = 21;
                        break;

                    case 18:
                        _context6.prev = 18;
                        _context6.t0 = _context6['catch'](13);

                        ctx.throw(422, 'unvalid new_password');

                    case 21:
                        // set origin token unvalid
                        (0, _unvalidToken.addToken)(auth.getToken(ctx));

                        token = user.generateToken();
                        _context6.next = 25;
                        return token_util.saveToken(token);

                    case 25:
                        response = user.toJSON();

                        ctx.body = {
                            token: token,
                            user: response
                        };

                        if (!next) {
                            _context6.next = 29;
                            break;
                        }

                        return _context6.abrupt('return', next());

                    case 29:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this, [[13, 18]]);
    }));

    return function modifyMyPassword(_x10, _x11) {
        return _ref6.apply(this, arguments);
    };
}();

/**
 * get my profile
 *
 * @example curl -H "Authorization: Bearer <token>" -X GET localhost:4002/users/my/profile
 * @param ctx
 * @param next
 */


var myProfile = exports.myProfile = function () {
    var _ref7 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee7(ctx, next) {
        var user, response;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        debug(ctx.request.body);
                        user = auth.getUser(ctx);

                        if (!user) {
                            ctx.throw(401);
                        }
                        response = user.toJSON();

                        ctx.body = response;

                        if (!next) {
                            _context7.next = 7;
                            break;
                        }

                        return _context7.abrupt('return', next());

                    case 7:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, this);
    }));

    return function myProfile(_x12, _x13) {
        return _ref7.apply(this, arguments);
    };
}();

/**
 * reset my password
 *
 * @example curl -X POST -d '{"email": "greedpatch@greedlab.com"}' localhost:4002/reset-my-password
 * @param ctx
 * @param next
 */


var resetPassword = exports.resetPassword = function () {
    var _ref8 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee8(ctx, next) {
        var user, password, hashedPassword, token, tokenObject, response;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        debug(ctx.request.body);
                        user = auth.getUser(ctx);

                        if (!user) {
                            ctx.throw(401);
                        }
                        password = ctx.request.body.password;

                        if (!password) {
                            ctx.throw(400);
                        }
                        _context8.next = 7;
                        return auth.hashString(password);

                    case 7:
                        hashedPassword = _context8.sent;
                        _context8.prev = 8;
                        _context8.next = 11;
                        return user.update({ password: hashedPassword });

                    case 11:
                        _context8.next = 16;
                        break;

                    case 13:
                        _context8.prev = 13;
                        _context8.t0 = _context8['catch'](8);

                        ctx.throw(422, 'unvalid password');

                    case 16:
                        // set origin token unvalid
                        (0, _unvalidToken.addToken)(auth.getToken(ctx));

                        token = user.generateSetPasswordToken();

                        // save token

                        tokenObject = new _token2.default({ token: token, type: 2 });
                        _context8.next = 21;
                        return tokenObject.save();

                    case 21:
                        response = user.toJSON();

                        ctx.body = {
                            token: token,
                            user: response
                        };

                        if (!next) {
                            _context8.next = 25;
                            break;
                        }

                        return _context8.abrupt('return', next());

                    case 25:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, this, [[8, 13]]);
    }));

    return function resetPassword(_x14, _x15) {
        return _ref8.apply(this, arguments);
    };
}();

/**
 * set my password
 *
 * @example curl -H "Authorization: Bearer <token>" -X POST -d '{password: "password"}' localhost:4002/set-my-password
 * @param ctx
 * @param next
 */


var setMyPassword = exports.setMyPassword = function () {
    var _ref9 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee9(ctx, next) {
        var email, user, token;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        debug(ctx.request.body);
                        email = ctx.request.body.email;

                        if (!email) {
                            ctx.throw(400, 'email is empty');
                        }
                        if (!regex.validEmail(email)) {
                            ctx.throw(400, 'unvalid email');
                        }
                        user = null;
                        _context9.prev = 5;
                        _context9.next = 8;
                        return _user2.default.find({ email: email }, { password: 0, __v: 0 });

                    case 8:
                        user = _context9.sent;
                        _context9.next = 14;
                        break;

                    case 11:
                        _context9.prev = 11;
                        _context9.t0 = _context9['catch'](5);

                        ctx.throw(422, 'unvalid email');

                    case 14:
                        if (!user) {
                            ctx.throw(422, 'user is not existed');
                        }
                        // TODO send <front >/set-password?token=<token> to email
                        token = user.generateToken();
                        _context9.next = 18;
                        return token_util.saveToken(token);

                    case 18:

                        ctx.body = {
                            message: 'please set password through your email'
                        };

                        if (!next) {
                            _context9.next = 21;
                            break;
                        }

                        return _context9.abrupt('return', next());

                    case 21:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, this, [[5, 11]]);
    }));

    return function setMyPassword(_x16, _x17) {
        return _ref9.apply(this, arguments);
    };
}();

/**
 * udpate user's password
 *
 * @example curl -H "Authorization: Bearer <token>" -X POST -d '{password: "password"}' localhost:4002/users/:id/password
 * @param ctx
 * @param next
 */


var updatePassword = exports.updatePassword = function () {
    var _ref10 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee10(ctx, next) {
        var userid, password, user, docs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, doc, token;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        debug(ctx.request.body);
                        userid = ctx.params.id;
                        password = ctx.request.body.password;

                        if (!userid) {
                            ctx.throw(400, 'id is empty');
                        }
                        if (!password) {
                            ctx.throw(400, 'password is empty');
                        }
                        if (!regex.validPassword(password)) {
                            ctx.throw(400, 'unvalid password');
                        }
                        user = null;
                        _context10.prev = 7;
                        _context10.next = 10;
                        return _user2.default.findById(userid, { password: 0, __v: 0 });

                    case 10:
                        user = _context10.sent;
                        _context10.next = 16;
                        break;

                    case 13:
                        _context10.prev = 13;
                        _context10.t0 = _context10['catch'](7);

                        ctx.throw(422, 'unvalid id');

                    case 16:
                        if (!user) {
                            ctx.throw(422, 'user is not existed');
                        }

                        _context10.next = 19;
                        return _token2.default.find({ userid: userid, status: 0 });

                    case 19:
                        docs = _context10.sent;
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context10.prev = 23;
                        _iterator = docs[Symbol.iterator]();

                    case 25:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context10.next = 35;
                            break;
                        }

                        doc = _step.value;

                        if (!doc.token) {
                            _context10.next = 32;
                            break;
                        }

                        _context10.next = 30;
                        return (0, _unvalidToken.addToken)(doc.token);

                    case 30:
                        _context10.next = 32;
                        return doc.update({ status: 1 });

                    case 32:
                        _iteratorNormalCompletion = true;
                        _context10.next = 25;
                        break;

                    case 35:
                        _context10.next = 41;
                        break;

                    case 37:
                        _context10.prev = 37;
                        _context10.t1 = _context10['catch'](23);
                        _didIteratorError = true;
                        _iteratorError = _context10.t1;

                    case 41:
                        _context10.prev = 41;
                        _context10.prev = 42;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 44:
                        _context10.prev = 44;

                        if (!_didIteratorError) {
                            _context10.next = 47;
                            break;
                        }

                        throw _iteratorError;

                    case 47:
                        return _context10.finish(44);

                    case 48:
                        return _context10.finish(41);

                    case 49:
                        token = user.generateToken();
                        _context10.next = 52;
                        return token_util.saveToken(token);

                    case 52:
                        ctx.status = 204;

                        if (!next) {
                            _context10.next = 55;
                            break;
                        }

                        return _context10.abrupt('return', next());

                    case 55:
                    case 'end':
                        return _context10.stop();
                }
            }
        }, _callee10, this, [[7, 13], [23, 37, 41, 49], [42,, 44, 48]]);
    }));

    return function updatePassword(_x18, _x19) {
        return _ref10.apply(this, arguments);
    };
}();

/**
 * update user status
 *
 * @example curl -H "Authorization: Bearer <token>" -X POST -d '{password: "password"}' localhost:4002/users/:id/status
 * @param ctx
 * @param next
 * @returns {*}
 */


var updateStatus = exports.updateStatus = function () {
    var _ref11 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee11(ctx, next) {
        var userid, status, user;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        debug(ctx.request.body);
                        userid = ctx.params.id;
                        status = ctx.request.body.status;

                        if (!userid) {
                            ctx.throw(400, 'id is empty');
                        }
                        if (!status) {
                            ctx.throw(400, 'status is empty');
                        }
                        if (status < 0 || status > 1) {
                            ctx.throw(400, 'unvalid status');
                        }
                        user = null;
                        _context11.prev = 7;
                        _context11.next = 10;
                        return _user2.default.findById(userid, { password: 0, __v: 0 });

                    case 10:
                        user = _context11.sent;
                        _context11.next = 16;
                        break;

                    case 13:
                        _context11.prev = 13;
                        _context11.t0 = _context11['catch'](7);

                        ctx.throw(422, 'unvalid id');

                    case 16:
                        if (!user) {
                            ctx.throw(422, 'user is not existed');
                        }
                        _context11.prev = 17;
                        _context11.next = 20;
                        return user.update({ status: status });

                    case 20:
                        _context11.next = 25;
                        break;

                    case 22:
                        _context11.prev = 22;
                        _context11.t1 = _context11['catch'](17);

                        ctx.throw(422, 'unvalid status');

                    case 25:
                        ctx.status = 204;

                        if (!next) {
                            _context11.next = 28;
                            break;
                        }

                        return _context11.abrupt('return', next());

                    case 28:
                    case 'end':
                        return _context11.stop();
                }
            }
        }, _callee11, this, [[7, 13], [17, 22]]);
    }));

    return function updateStatus(_x20, _x21) {
        return _ref11.apply(this, arguments);
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

// import UnvalidToken from '../models/unvalid-token';
var debug = new _debug2.default(_package2.default.name); /**
                                                          * Created by Bell on 16/8/10.
                                                          */
//# sourceMappingURL=user.js.map
