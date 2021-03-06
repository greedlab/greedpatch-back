'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateStatus = exports.updatePassword = exports.setPassword = exports.resetPassword = exports.profile = exports.myProfile = exports.modifyMyPassword = exports.logout = exports.login = exports.register = exports.list = undefined;

var _bluebird = require('bluebird');

/**
 * list users
 *
 * @example curl -H "Accept: application/vnd.greedlab+json" -H "Authorization: Bearer <token>" -X GET localhost:4002/users
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

                        users = users || [];
                        ctx.body = users;
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
 * @example curl -H "Accept: application/vnd.greedlab+json" -H "Content-Type: application/json" -X POST -d '{"email": "test@greedlab.com","password":"secretpasas"}' localhost:4002/register
 * @param ctx
 * @param next
 * @returns {*}
 */


var register = exports.register = function () {
    var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(ctx, next) {
        var email, permissions, permission, domain, password, user, first, existed, payload, token, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        email = ctx.request.body.email;

                        if (check.checkUserEmpty(ctx, 'email', email)) {
                            _context2.next = 3;
                            break;
                        }

                        return _context2.abrupt('return');

                    case 3:
                        if (check.checkValidEmail(ctx, email)) {
                            _context2.next = 5;
                            break;
                        }

                        return _context2.abrupt('return');

                    case 5:
                        permissions = null;
                        _context2.prev = 6;
                        _context2.next = 9;
                        return _permission2.default.find({ type: 0 }, { _id: 0, __v: 0 }).limit(1);

                    case 9:
                        permissions = _context2.sent;
                        _context2.next = 15;
                        break;

                    case 12:
                        _context2.prev = 12;
                        _context2.t0 = _context2['catch'](6);

                        ctx.throw(500);

                    case 15:
                        permission = null;

                        if (permissions && permissions.length > 0) {
                            permission = permissions[0].toJSON();
                        }

                        if (!(permission != null)) {
                            _context2.next = 28;
                            break;
                        }

                        if (!(permission.permission == 2)) {
                            _context2.next = 25;
                            break;
                        }

                        // fixed emails can register
                        domain = regex.getDomain(email);

                        if (!(domain && permission.domains && permission.domains.indexOf(domain) < 0)) {
                            _context2.next = 23;
                            break;
                        }

                        ctx.throw(403);
                        return _context2.abrupt('return');

                    case 23:
                        _context2.next = 28;
                        break;

                    case 25:
                        if (!(permission.permission == 1)) {
                            _context2.next = 28;
                            break;
                        }

                        // all can not register
                        ctx.throw(403);
                        return _context2.abrupt('return');

                    case 28:
                        password = ctx.request.body.password;

                        if (check.checkUserEmpty(ctx, 'password', password)) {
                            _context2.next = 31;
                            break;
                        }

                        return _context2.abrupt('return');

                    case 31:
                        if (check.checkValidPassword(ctx, password)) {
                            _context2.next = 33;
                            break;
                        }

                        return _context2.abrupt('return');

                    case 33:
                        user = new _user2.default({ email: email, password: password });
                        _context2.prev = 34;
                        _context2.next = 37;
                        return _user2.default.findOne();

                    case 37:
                        first = _context2.sent;

                        if (!first || first.length > 0) {
                            // no user
                            user.role = 1;
                        }

                        _context2.next = 41;
                        return _user2.default.findOne({ email: email });

                    case 41:
                        existed = _context2.sent;

                        if (!existed) {
                            _context2.next = 47;
                            break;
                        }

                        response_util.resourceAlreadyExists(ctx, 'User', 'email');
                        return _context2.abrupt('return');

                    case 47:
                        _context2.next = 49;
                        return user.save();

                    case 49:
                        _context2.next = 55;
                        break;

                    case 51:
                        _context2.prev = 51;
                        _context2.t1 = _context2['catch'](34);

                        debug(_context2.t1);
                        ctx.throw(500);

                    case 55:

                        // generate new token
                        payload = token_util.generatePayload(user.id);
                        token = token_util.generateTokenFromPayload(payload);
                        _context2.prev = 57;
                        _context2.next = 60;
                        return token_redis.add(token, payload.exp);

                    case 60:
                        _context2.next = 66;
                        break;

                    case 62:
                        _context2.prev = 62;
                        _context2.t2 = _context2['catch'](57);

                        debug(_context2.t2);
                        ctx.throw(500);

                    case 66:

                        // response
                        response = user.toJSON();

                        delete response.password;
                        ctx.body = {
                            token: token,
                            user: response
                        };

                        if (!next) {
                            _context2.next = 71;
                            break;
                        }

                        return _context2.abrupt('return', next());

                    case 71:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[6, 12], [34, 51], [57, 62]]);
    }));

    return function register(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

/**
 * login
 *
 * @example curl -H "Content-Type: application/json" -X POST -d '{ "email": "test@greedlab.com", "password": "secretpasas" }' localhost:4002/login
 * @param ctx
 * @param next
 * @returns {*}
 */


var login = exports.login = function () {
    var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(ctx, next) {
        var _this = this;

        var email, password, options;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        email = ctx.request.body.email;

                        if (check.checkUserEmpty(ctx, 'email', email)) {
                            _context4.next = 3;
                            break;
                        }

                        return _context4.abrupt('return');

                    case 3:
                        password = ctx.request.body.password;

                        if (check.checkUserEmpty(ctx, 'password', password)) {
                            _context4.next = 6;
                            break;
                        }

                        return _context4.abrupt('return');

                    case 6:
                        options = {
                            session: false
                        };
                        return _context4.abrupt('return', _koaPassport2.default.authenticate('local', options, function () {
                            var _ref4 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(user) {
                                var payload, token, response;
                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                    while (1) {
                                        switch (_context3.prev = _context3.next) {
                                            case 0:
                                                if (user) {
                                                    _context3.next = 3;
                                                    break;
                                                }

                                                response_util.authenticationFailed(ctx);
                                                return _context3.abrupt('return');

                                            case 3:

                                                // generate new token
                                                payload = token_util.generatePayload(user.id);
                                                token = token_util.generateTokenFromPayload(payload);
                                                _context3.prev = 5;
                                                _context3.next = 8;
                                                return token_redis.add(token, payload.exp);

                                            case 8:
                                                _context3.next = 13;
                                                break;

                                            case 10:
                                                _context3.prev = 10;
                                                _context3.t0 = _context3['catch'](5);

                                                ctx.throw(500, _context3.t0.message);

                                            case 13:
                                                response = user.toJSON();

                                                delete response.password;
                                                ctx.body = {
                                                    token: token,
                                                    user: response
                                                };

                                            case 16:
                                            case 'end':
                                                return _context3.stop();
                                        }
                                    }
                                }, _callee3, _this, [[5, 10]]);
                            }));

                            return function (_x7) {
                                return _ref4.apply(this, arguments);
                            };
                        }())(ctx, next));

                    case 8:
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
        var token, payload;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        token = auth.getToken(ctx);

                        if (!token) {
                            ctx.throw(422, 'unvalid token');
                        }

                        payload = token_util.getPayload(token);

                        if (!payload || !payload.id) {
                            ctx.throw(422, 'unvalid token');
                        }

                        _context5.prev = 4;
                        _context5.next = 7;
                        return token_redis.del(token);

                    case 7:
                        _context5.next = 12;
                        break;

                    case 9:
                        _context5.prev = 9;
                        _context5.t0 = _context5['catch'](4);

                        ctx.throw(500, _context5.t0.message);

                    case 12:
                        ctx.status = 204;

                    case 13:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this, [[4, 9]]);
    }));

    return function logout(_x8, _x9) {
        return _ref5.apply(this, arguments);
    };
}();

/**
 * modify my password
 *
 * @example curl -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -X POST -d '{"password": "secretpasas", "new_password": "new_password"}' localhost:4002/modify-my-password
 * @param ctx
 * @param next
 */


var modifyMyPassword = exports.modifyMyPassword = function () {
    var _ref6 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee6(ctx, next) {
        var user, password, new_password, equal, payload, token, old_token, response;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.next = 2;
                        return auth.getFullUser(ctx);

                    case 2:
                        user = _context6.sent;

                        if (!user) {
                            ctx.throw(401);
                        }
                        password = ctx.request.body.password;

                        if (check.checkUserEmpty(ctx, 'password', password)) {
                            _context6.next = 7;
                            break;
                        }

                        return _context6.abrupt('return');

                    case 7:
                        new_password = ctx.request.body.new_password;

                        if (check.checkUserEmpty(ctx, 'new_password', new_password)) {
                            _context6.next = 10;
                            break;
                        }

                        return _context6.abrupt('return');

                    case 10:
                        _context6.next = 12;
                        return user.validatePassword(password);

                    case 12:
                        equal = _context6.sent;

                        if (equal) {
                            _context6.next = 16;
                            break;
                        }

                        response_util.fieldInvalid(ctx, 'User', 'password', 'Wrong password');
                        return _context6.abrupt('return');

                    case 16:
                        if (!(new_password === password)) {
                            _context6.next = 19;
                            break;
                        }

                        response_util.fieldInvalid(ctx, 'User', 'new_password', 'Same to the original');
                        return _context6.abrupt('return');

                    case 19:
                        _context6.prev = 19;
                        _context6.next = 22;
                        return user.updatePassword(new_password);

                    case 22:
                        _context6.next = 24;
                        return user_redis.setTimestamp(user.id, Date.now());

                    case 24:
                        _context6.next = 29;
                        break;

                    case 26:
                        _context6.prev = 26;
                        _context6.t0 = _context6['catch'](19);

                        ctx.throw(500, _context6.t0.message);

                    case 29:

                        // generate new token
                        payload = token_util.generatePayload(user.id);
                        token = token_util.generateTokenFromPayload(payload);
                        _context6.prev = 31;
                        _context6.next = 34;
                        return token_redis.add(token, payload.exp);

                    case 34:
                        _context6.next = 39;
                        break;

                    case 36:
                        _context6.prev = 36;
                        _context6.t1 = _context6['catch'](31);

                        ctx.throw(500);

                    case 39:
                        _context6.prev = 39;
                        old_token = auth.getToken(ctx);
                        _context6.next = 43;
                        return token_redis.del(old_token);

                    case 43:
                        _context6.next = 48;
                        break;

                    case 45:
                        _context6.prev = 45;
                        _context6.t2 = _context6['catch'](39);

                        ctx.throw(500);

                    case 48:
                        response = user.toJSON();

                        delete response.password;
                        ctx.body = {
                            token: token,
                            user: response
                        };

                        if (!next) {
                            _context6.next = 53;
                            break;
                        }

                        return _context6.abrupt('return', next());

                    case 53:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this, [[19, 26], [31, 36], [39, 45]]);
    }));

    return function modifyMyPassword(_x10, _x11) {
        return _ref6.apply(this, arguments);
    };
}();

/**
 * get my profile
 *
 * @example curl -H "Authorization: Bearer <token>" -X GET localhost:4002/users/me/profile
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
                        _context7.next = 2;
                        return auth.getUser(ctx);

                    case 2:
                        user = _context7.sent;

                        if (!user) {
                            ctx.throw(401);
                        }
                        response = user.toJSON();

                        ctx.body = response;

                    case 6:
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
 * get user's profile. only administrator can call this function
 *
 * @example curl -H "Authorization: Bearer <token>" -X GET localhost:4002/users/me/profile
 * @param ctx
 * @param next
 */


var profile = exports.profile = function () {
    var _ref8 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee8(ctx, next) {
        var id, user, response;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        id = ctx.params.id;
                        user = null;
                        _context8.prev = 2;
                        _context8.next = 5;
                        return _user2.default.findById(id, { password: 0, __v: 0 });

                    case 5:
                        user = _context8.sent;
                        _context8.next = 11;
                        break;

                    case 8:
                        _context8.prev = 8;
                        _context8.t0 = _context8['catch'](2);

                        ctx.throw(500);

                    case 11:
                        if (user) {
                            _context8.next = 14;
                            break;
                        }

                        response_util.resourceNotExist(ctx, 'User', 'id');
                        return _context8.abrupt('return');

                    case 14:
                        response = user.toJSON();

                        ctx.body = response;

                    case 16:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, this, [[2, 8]]);
    }));

    return function profile(_x14, _x15) {
        return _ref8.apply(this, arguments);
    };
}();

/**
 * send mail for reset password
 *
 * @example curl -X POST -d '{"email": "greedpatch@greedlab.com"}' localhost:4002/reset-password
 * @param ctx
 * @param next
 */


var resetPassword = exports.resetPassword = function () {
    var _ref9 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee9(ctx, next) {
        var email, user, token, text, content;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        debug(ctx.request.body);
                        email = ctx.request.body.email;

                        if (check.checkUserEmpty(ctx, 'email', email)) {
                            _context9.next = 4;
                            break;
                        }

                        return _context9.abrupt('return');

                    case 4:
                        if (check.checkValidEmail(ctx, email)) {
                            _context9.next = 6;
                            break;
                        }

                        return _context9.abrupt('return');

                    case 6:

                        // get user
                        user = null;
                        _context9.prev = 7;
                        _context9.next = 10;
                        return _user2.default.findOne({ email: email });

                    case 10:
                        user = _context9.sent;
                        _context9.next = 16;
                        break;

                    case 13:
                        _context9.prev = 13;
                        _context9.t0 = _context9['catch'](7);

                        ctx.throw(500);

                    case 16:
                        if (!user) {
                            response_util.emailNotExist(ctx);
                        }

                        // save setPwdToken
                        token = new _setPwdToken2.default({ userid: user.id });
                        _context9.prev = 18;
                        _context9.next = 21;
                        return token.save();

                    case 21:
                        _context9.next = 26;
                        break;

                    case 23:
                        _context9.prev = 23;
                        _context9.t1 = _context9['catch'](18);

                        ctx.throw(500);

                    case 26:

                        // send mail
                        text = 'set your password from: ';

                        text += _url2.default.resolve(_config2.default.front_address, '/set-password/' + token.id);
                        content = {
                            from: _config2.default.mail_from, // sender address
                            to: email, // list of receivers
                            subject: 'Reset your password of greedpatch', // Subject line
                            text: text // plaintext body
                        };

                        debug(content);
                        _context9.next = 32;
                        return mail.send(content);

                    case 32:

                        ctx.body = {
                            message: 'Please set password from email'
                        };

                    case 33:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, this, [[7, 13], [18, 23]]);
    }));

    return function resetPassword(_x16, _x17) {
        return _ref9.apply(this, arguments);
    };
}();

/**
 * set password
 *
 * @example curl -X POST -d '{token: "token", password: "password"}' localhost:4002/set-password
 * @param ctx
 * @param next
 */


var setPassword = exports.setPassword = function () {
    var _ref10 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee10(ctx, next) {
        var token_id, password, setPwdToken, user, payload, token, response;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        token_id = ctx.request.body.token;

                        if (check.checkSetPwdTokenEmpty(ctx, 'token_id', token_id)) {
                            _context10.next = 3;
                            break;
                        }

                        return _context10.abrupt('return');

                    case 3:
                        password = ctx.request.body.password;

                        if (check.checkUserEmpty(ctx, 'password', password)) {
                            _context10.next = 6;
                            break;
                        }

                        return _context10.abrupt('return');

                    case 6:
                        if (check.checkValidPassword(ctx, password)) {
                            _context10.next = 8;
                            break;
                        }

                        return _context10.abrupt('return');

                    case 8:

                        // valid setPwdToken
                        setPwdToken = null;
                        _context10.prev = 9;
                        _context10.next = 12;
                        return _setPwdToken2.default.findOne({ _id: token_id, status: 0 });

                    case 12:
                        setPwdToken = _context10.sent;
                        _context10.next = 18;
                        break;

                    case 15:
                        _context10.prev = 15;
                        _context10.t0 = _context10['catch'](9);

                        ctx.throw(500);

                    case 18:
                        if (setPwdToken) {
                            _context10.next = 21;
                            break;
                        }

                        response_util.setPwdTokenNotExist(ctx);
                        return _context10.abrupt('return');

                    case 21:

                        // get user
                        user = null;
                        _context10.prev = 22;
                        _context10.next = 25;
                        return _user2.default.findById(setPwdToken.userid);

                    case 25:
                        user = _context10.sent;
                        _context10.next = 31;
                        break;

                    case 28:
                        _context10.prev = 28;
                        _context10.t1 = _context10['catch'](22);

                        ctx.throw(500);

                    case 31:
                        if (user) {
                            _context10.next = 34;
                            break;
                        }

                        response_util.userNotExist(ctx);
                        return _context10.abrupt('return');

                    case 34:
                        if (!(user.password != password)) {
                            _context10.next = 45;
                            break;
                        }

                        _context10.prev = 35;
                        _context10.next = 38;
                        return user.updatePassword(password);

                    case 38:
                        _context10.next = 40;
                        return user_redis.setTimestamp(user.id, Date.now());

                    case 40:
                        _context10.next = 45;
                        break;

                    case 42:
                        _context10.prev = 42;
                        _context10.t2 = _context10['catch'](35);

                        ctx.throw(500);

                    case 45:
                        _context10.prev = 45;
                        _context10.next = 48;
                        return setPwdToken.upate({ status: 1 });

                    case 48:
                        _context10.next = 53;
                        break;

                    case 50:
                        _context10.prev = 50;
                        _context10.t3 = _context10['catch'](45);

                        ctx.throw(500);

                    case 53:

                        // generate new token
                        payload = token_util.generatePayload(user.id);
                        token = token_util.generateTokenFromPayload(payload);
                        _context10.prev = 55;
                        _context10.next = 58;
                        return token_redis.add(token, payload.exp);

                    case 58:
                        _context10.next = 63;
                        break;

                    case 60:
                        _context10.prev = 60;
                        _context10.t4 = _context10['catch'](55);

                        ctx.throw(500);

                    case 63:
                        response = user.toJSON();

                        delete response.password;
                        ctx.body = {
                            token: token,
                            user: response
                        };

                    case 66:
                    case 'end':
                        return _context10.stop();
                }
            }
        }, _callee10, this, [[9, 15], [22, 28], [35, 42], [45, 50], [55, 60]]);
    }));

    return function setPassword(_x18, _x19) {
        return _ref10.apply(this, arguments);
    };
}();

/**
 * update user's password
 *
 * @example curl -H "Authorization: Bearer <token>" -X POST -d '{password: "password"}' localhost:4002/users/:id/password
 * @param ctx
 * @param next
 */


var updatePassword = exports.updatePassword = function () {
    var _ref11 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee11(ctx, next) {
        var userid, password, user;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        userid = ctx.params.id;

                        if (!userid) {
                            ctx.throw(400, 'id is empty');
                        }

                        password = ctx.request.body.password;

                        if (!password) {
                            ctx.throw(400, 'password is empty');
                        }
                        if (!regex.validPassword(password)) {
                            ctx.throw(400, 'unvalid password');
                        }

                        // get user
                        user = null;
                        _context11.prev = 6;
                        _context11.next = 9;
                        return _user2.default.findById(userid, { password: 0, __v: 0 });

                    case 9:
                        user = _context11.sent;
                        _context11.next = 15;
                        break;

                    case 12:
                        _context11.prev = 12;
                        _context11.t0 = _context11['catch'](6);

                        ctx.throw(422, 'unvalid id');

                    case 15:
                        if (!user) {
                            ctx.throw(422, 'user is not existed');
                        }

                        if (user.password === password) {
                            ctx.throw(422, 'please don not use the same password');
                        }

                        // udpate password and token valid timestamp
                        _context11.prev = 17;
                        _context11.next = 20;
                        return user.updatePassword(password);

                    case 20:
                        _context11.next = 22;
                        return user_redis.setTimestamp(user.id, Date.now());

                    case 22:
                        _context11.next = 27;
                        break;

                    case 24:
                        _context11.prev = 24;
                        _context11.t1 = _context11['catch'](17);

                        ctx.throw(500);

                    case 27:

                        ctx.status = 204;

                    case 28:
                    case 'end':
                        return _context11.stop();
                }
            }
        }, _callee11, this, [[6, 12], [17, 24]]);
    }));

    return function updatePassword(_x20, _x21) {
        return _ref11.apply(this, arguments);
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
    var _ref12 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee12(ctx, next) {
        var userid, status, user;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
                switch (_context12.prev = _context12.next) {
                    case 0:
                        debug(ctx.request.body);
                        userid = ctx.params.id;
                        status = ctx.request.body.status;

                        if (!(status < 0 || status > 1)) {
                            _context12.next = 6;
                            break;
                        }

                        response_util.fieldInvalid(ctx, 'User', 'status', 'Invalid status');
                        return _context12.abrupt('return');

                    case 6:

                        // get user
                        user = null;
                        _context12.prev = 7;
                        _context12.next = 10;
                        return _user2.default.findById(userid, { password: 0, __v: 0 });

                    case 10:
                        user = _context12.sent;
                        _context12.next = 16;
                        break;

                    case 13:
                        _context12.prev = 13;
                        _context12.t0 = _context12['catch'](7);

                        ctx.throw(500);

                    case 16:
                        if (user) {
                            _context12.next = 19;
                            break;
                        }

                        response_util.resourceNotExist(ctx, 'User', 'id');
                        return _context12.abrupt('return');

                    case 19:
                        _context12.prev = 19;
                        _context12.next = 22;
                        return user.update({ $set: { status: status } });

                    case 22:
                        _context12.next = 27;
                        break;

                    case 24:
                        _context12.prev = 24;
                        _context12.t1 = _context12['catch'](19);

                        ctx.throw(500);

                    case 27:

                        ctx.status = 204;

                    case 28:
                    case 'end':
                        return _context12.stop();
                }
            }
        }, _callee12, this, [[7, 13], [19, 24]]);
    }));

    return function updateStatus(_x22, _x23) {
        return _ref12.apply(this, arguments);
    };
}();

var _koaPassport = require('koa-passport');

var _koaPassport2 = _interopRequireDefault(_koaPassport);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _setPwdToken = require('../models/setPwdToken');

var _setPwdToken2 = _interopRequireDefault(_setPwdToken);

var _permission = require('../models/permission');

var _permission2 = _interopRequireDefault(_permission);

var _token = require('../redis/token');

var token_redis = _interopRequireWildcard(_token);

var _user3 = require('../redis/user');

var user_redis = _interopRequireWildcard(_user3);

var _encrypt = require('../utils/encrypt');

var encrypt = _interopRequireWildcard(_encrypt);

var _regex = require('../utils/regex');

var regex = _interopRequireWildcard(_regex);

var _token2 = require('../utils/token');

var token_util = _interopRequireWildcard(_token2);

var _mail = require('../utils/mail');

var mail = _interopRequireWildcard(_mail);

var _response = require('../utils/response');

var response_util = _interopRequireWildcard(_response);

var _auth = require('../tools/auth');

var auth = _interopRequireWildcard(_auth);

var _check = require('../tools/check');

var check = _interopRequireWildcard(_check);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = new _debug2.default(_package2.default.name); /**
                                                          * Created by Bell on 16/8/10.
                                                          */
//# sourceMappingURL=user.js.map
