'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.compareHashString = exports.hashString = exports.getUser = exports.ensureManager = exports.ensureSetPasswordToken = exports.ensureUser = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

/**
 * ensure user login successfully
 *
 * @param ctx ctx.request.header.authorization = "Bearer <token>"
 * @param next
 * @returns {*}
 */
var ensureUser = exports.ensureUser = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx, next) {
        var token, payload, user, existed;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        token = getToken(ctx);


                        if (!token) {
                            ctx.throw(401);
                        }

                        payload = null;

                        try {
                            payload = (0, _jsonwebtoken.verify)(token, _config2.default.token);
                        } catch (err) {
                            ctx.throw(401);
                        }

                        _context.next = 6;
                        return _user2.default.findById(payload.id, '-password');

                    case 6:
                        user = _context.sent;

                        if (!user) {
                            ctx.throw(401);
                        }

                        if (user.status != 0) {
                            ctx.throw(403);
                        }

                        _context.next = 11;
                        return (0, _unvalidToken.existed)(token);

                    case 11:
                        existed = _context.sent;

                        if (existed) {
                            ctx.throw(401);
                        }

                        return _context.abrupt('return', next());

                    case 14:
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


var ensureSetPasswordToken = exports.ensureSetPasswordToken = function () {
    var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(ctx, next) {
        var token, payload, scope;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        token = getToken(ctx);

                        if (!token) {
                            ctx.throw(401);
                        }
                        payload = null;

                        try {
                            payload = (0, _jsonwebtoken.verify)(token, _config2.default.token);
                        } catch (err) {
                            ctx.throw(401);
                        }
                        scope = payload.scope;

                        if (!scope || scope != 'all') {
                            ctx.throw(403);
                        }
                        return _context2.abrupt('return', next());

                    case 7:
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
        var token, payload, user;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        token = getToken(ctx);

                        if (!token) {
                            ctx.throw(401);
                        }
                        payload = null;

                        try {
                            payload = (0, _jsonwebtoken.verify)(token, _config2.default.token);
                        } catch (err) {
                            ctx.throw(401);
                        }
                        _context3.next = 6;
                        return _user2.default.findById(payload.id, '-password');

                    case 6:
                        user = _context3.sent;

                        if (!user) {
                            ctx.throw(401);
                        }
                        if (user.role != 1) {
                            ctx.throw(403);
                        }
                        return _context3.abrupt('return', next());

                    case 10:
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
                        return _user2.default.findById(id, '-password');

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
 * get hashed string
 *
 * @param string
 * @returns hashed string
 */


var hashString = exports.hashString = function () {
    var _ref5 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(string) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return hashAsync(string, 10);

                    case 2:
                        return _context5.abrupt('return', _context5.sent);

                    case 3:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function hashString(_x8) {
        return _ref5.apply(this, arguments);
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
    var _ref6 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee6(string, hashedString) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.next = 2;
                        return compareAsync(string, hashedString);

                    case 2:
                        return _context6.abrupt('return', _context6.sent);

                    case 3:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));

    return function compareHashString(_x9, _x10) {
        return _ref6.apply(this, arguments);
    };
}();

exports.getToken = getToken;
exports.getPayload = getPayload;
exports.getID = getID;

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _jsonwebtoken = require('jsonwebtoken');

var _unvalidToken = require('../utils/unvalid-token');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Bell on 16/8/10.
 */

var hashAsync = _bluebird2.default.promisify(_bcrypt2.default.hash);
var compareAsync = _bluebird2.default.promisify(_bcrypt2.default.compare);function getToken(ctx) {
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
 * get id from ctx.request header
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
