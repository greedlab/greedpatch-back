'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPassword = exports.getUser = exports.getFullUser = exports.ensureManager = exports.ensureSetPasswordToken = exports.ensureUser = undefined;

var _bluebird = require('bluebird');

/**
 * ensure user login successfully
 *
 * @param ctx ctx.request.header.authorization = "Bearer <token>"
 * @param next
 * @returns {*}
 */
var ensureUser = exports.ensureUser = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx, next) {
        var token, payload, userid, timestamp, status, existed;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        token = getToken(ctx);

                        if (!token) {
                            ctx.throw(401);
                        }

                        payload = token_util.getPayload(token);

                        if (!token) {
                            ctx.throw(401);
                        }

                        if (payload.exp && payload.exp < Date.now()) {
                            ctx.throw(401);
                        }

                        userid = payload.id;

                        if (!userid) {
                            ctx.throw(401);
                        }

                        // whether the iat of token less than valid timestamp
                        _context.next = 9;
                        return user_redis.getTimestamp(userid);

                    case 9:
                        timestamp = _context.sent;

                        if (timestamp && timestamp > 0) {
                            if (timestamp > payload.iat) {
                                ctx.throw(401);
                            }
                        }

                        // whether user is disabled
                        _context.next = 13;
                        return user_redis.getStatus(userid);

                    case 13:
                        status = _context.sent;

                        if (status && status != 0) {
                            ctx.throw(403, 'user is disabled');
                        }

                        // whether the token is in redis
                        _context.next = 17;
                        return token_redis.existed(token);

                    case 17:
                        existed = _context.sent;

                        if (existed == 0) {
                            ctx.throw(401);
                        }

                        return _context.abrupt('return', next());

                    case 20:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
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
/**
 * Created by Bell on 16/8/10.
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
 * get User with password from ctx.request header
 * @param ctx
 * @returns {*}
 */
var getFullUser = exports.getFullUser = function () {
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
                        return _user2.default.findById(id);

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

    return function getFullUser(_x7) {
        return _ref4.apply(this, arguments);
    };
}();

/**
 * get User with out password from ctx.request header
 * @param ctx
 * @returns {*}
 */


var getUser = exports.getUser = function () {
    var _ref5 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(ctx) {
        var id;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        id = getID(ctx);

                        if (!id) {
                            _context5.next = 5;
                            break;
                        }

                        _context5.next = 4;
                        return _user2.default.findById(id, { password: 0, __v: 0 });

                    case 4:
                        return _context5.abrupt('return', _context5.sent);

                    case 5:
                        return _context5.abrupt('return', null);

                    case 6:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function getUser(_x8) {
        return _ref5.apply(this, arguments);
    };
}();

/**
 * get password from user ID
 * @param userid
 * @returns {*}
 */


var getPassword = exports.getPassword = function () {
    var _ref6 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee6(userid) {
        var user;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        if (userid) {
                            _context6.next = 2;
                            break;
                        }

                        return _context6.abrupt('return', null);

                    case 2:
                        _context6.next = 4;
                        return _user2.default.findById(userid);

                    case 4:
                        user = _context6.sent;

                        if (user) {
                            _context6.next = 7;
                            break;
                        }

                        return _context6.abrupt('return', null);

                    case 7:
                        return _context6.abrupt('return', user.password);

                    case 8:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));

    return function getPassword(_x9) {
        return _ref6.apply(this, arguments);
    };
}();

exports.getToken = getToken;
exports.getPayload = getPayload;
exports.getID = getID;

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _token = require('../redis/token');

var token_redis = _interopRequireWildcard(_token);

var _user3 = require('../redis/user');

var user_redis = _interopRequireWildcard(_user3);

var _token2 = require('../utils/token');

var token_util = _interopRequireWildcard(_token2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
        return token_util.getPayload(token);
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
