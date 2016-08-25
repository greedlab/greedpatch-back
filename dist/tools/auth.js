'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPassword = exports.getUser = exports.ensureManager = exports.ensureSetPasswordToken = exports.ensureUser = undefined;

var _bluebird = require('bluebird');

/**
 * ensure user login successfully
 *
 * @param ctx ctx.request.header.authorization = "Bearer <token>"
 * @param next
 * @returns {*}
 */
/**
 * Created by Bell on 16/8/10.
 */

var ensureUser = exports.ensureUser = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx, next) {
        var token, existed, payload, user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        token = getToken(ctx);

                        if (!token) {
                            ctx.throw(401);
                        }

                        _context.next = 4;
                        return (0, _unvalidToken.existed)(token);

                    case 4:
                        existed = _context.sent;

                        if (existed) {
                            ctx.throw(401);
                        }

                        payload = null;

                        try {
                            payload = (0, _jsonwebtoken.verify)(token, _config2.default.token);
                        } catch (err) {
                            ctx.throw(401);
                        }

                        if (payload.exp && payload.exp < Date.now() / 1000) {
                            ctx.throw(401);
                        }

                        if (!payload.id) {
                            ctx.throw(401);
                        }

                        user = null;
                        _context.prev = 11;
                        _context.next = 14;
                        return _user2.default.findById(payload.id, { password: 0, __v: 0 });

                    case 14:
                        user = _context.sent;
                        _context.next = 20;
                        break;

                    case 17:
                        _context.prev = 17;
                        _context.t0 = _context['catch'](11);

                        ctx.throw(401);

                    case 20:
                        if (!user) {
                            ctx.throw(401);
                        }

                        if (user.status != 0) {
                            ctx.throw(403, 'user is disable');
                        }

                        return _context.abrupt('return', next());

                    case 23:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[11, 17]]);
    }));

    return function ensureUser(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * ensure token can set password
 *
 * @param ctx ctx.request.header.authorization = "Bearer <token>"
 * @param next
 * @returns {*}
 */


var ensureSetPasswordToken = exports.ensureSetPasswordToken = function () {
    var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(ctx, next) {
        var payload, scope;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        payload = getPayload(ctx);

                        if (!payload) {
                            ctx.throw(401);
                        }
                        scope = payload.scope;

                        if (!scope || scope != 'all') {
                            ctx.throw(403);
                        }
                        return _context2.abrupt('return', next());

                    case 5:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function ensureSetPasswordToken(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

/**
 * ensure the user is manager
 *
 * @param ctx ctx.request.header.authorization = "Bearer <token>"
 * @param next
 * @returns {*}
 */


var ensureManager = exports.ensureManager = function () {
    var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(ctx, next) {
        var user;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return getUser(ctx);

                    case 2:
                        user = _context3.sent;

                        if (!user) {
                            ctx.throw(401);
                        }
                        if (user.role != 1) {
                            ctx.throw(403);
                        }
                        return _context3.abrupt('return', next());

                    case 6:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function ensureManager(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

/**
 * get token from ctx.request header
 *
 * @param ctx ctx.request.header.authorization = "Bearer <token>"
 * @returns {*}
 */


/**
 * get User from ctx.request header
 * @param ctx
 * @returns {*}
 */
var getUser = exports.getUser = function () {
    var _ref4 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(ctx) {
        var id;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        id = getID(ctx);

                        if (!id) {
                            _context4.next = 5;
                            break;
                        }

                        _context4.next = 4;
                        return _user2.default.findById(id, { password: 0, __v: 0 });

                    case 4:
                        return _context4.abrupt('return', _context4.sent);

                    case 5:
                        return _context4.abrupt('return', null);

                    case 6:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function getUser(_x7) {
        return _ref4.apply(this, arguments);
    };
}();

/**
 * get password from user ID
 * @param userid
 * @returns {*}
 */


var getPassword = exports.getPassword = function () {
    var _ref5 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(userid) {
        var user;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        if (userid) {
                            _context5.next = 2;
                            break;
                        }

                        return _context5.abrupt('return', null);

                    case 2:
                        _context5.next = 4;
                        return _user2.default.findById(userid);

                    case 4:
                        user = _context5.sent;

                        if (user) {
                            _context5.next = 7;
                            break;
                        }

                        return _context5.abrupt('return', null);

                    case 7:
                        return _context5.abrupt('return', user.password);

                    case 8:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function getPassword(_x8) {
        return _ref5.apply(this, arguments);
    };
}();

exports.getToken = getToken;
exports.getPayload = getPayload;
exports.getID = getID;

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _jsonwebtoken = require('jsonwebtoken');

var _unvalidToken = require('./unvalid-token');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getToken(ctx) {
    var header = ctx.request.header.authorization;
    if (!header) {
        return null;
    }
    var parts = header.split(' ');
    if (parts.length !== 2) {
        return null;
    }
    var scheme = parts[0];
    var token = parts[1];
    if (/^Bearer$/i.test(scheme)) {
        return token;
    }
    return null;
}

/**
 * get payload from ctx.request header
 * @param ctx
 * @returns {*}
 */
function getPayload(ctx) {
    var token = getToken(ctx);
    if (token) {
        return (0, _jsonwebtoken.verify)(token, _config2.default.token);
    }
    return null;
}

/**
 * get user ID from ctx.request header
 * @param ctx
 * @returns {*}
 */
function getID(ctx) {
    var payload = getPayload(ctx);
    if (payload) {
        return payload.id;
    }
    return null;
}
//# sourceMappingURL=auth.js.map
