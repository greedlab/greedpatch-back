'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.del = exports.detail = exports.list = exports.generate = undefined;

var _bluebird = require('bluebird');

/**
 * generate new token
 *
 * @example curl -H "Content-Type: application/json" -X POST -d '{ "name": "test generate token" }' localhost:4002/tokens
 * @param ctx
 * @param next
 * @returns {*}
 */
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
                            ctx.throw(400, 'name can not be empty');
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

/**
 * generate new token
 *
 * @example curl -H "Content-Type: application/json" -X GET -d '{ "status": 0, "type": 1 }' localhost:4002/tokens
 * @param ctx
 * @param next
 * @returns {*}
 */


var list = exports.list = function () {
    var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(ctx, next) {
        var status, type, userid, tokens, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        debug(ctx.request.body);
                        status = ctx.request.body.status | 0;
                        type = ctx.request.body.type | 1;
                        userid = auth.getID(ctx);

                        if (!userid) {
                            ctx.throw(403);
                        }
                        _context2.next = 7;
                        return _token2.default.find({ userid: userid, status: status, type: type });

                    case 7:
                        tokens = _context2.sent;

                        // response
                        response = tokens.toJSON();

                        ctx.body = response;

                        if (!next) {
                            _context2.next = 12;
                            break;
                        }

                        return _context2.abrupt('return', next());

                    case 12:
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

/**
 * get token detail
 *
 * @example curl -H "Content-Type: application/json" -X POST localhost:4002/tokens/:id
 * @param ctx
 * @param next
 * @returns {*}
 */


var detail = exports.detail = function () {
    var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(ctx, next) {
        var id, password, userid, hashed_password, result, token, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        debug(ctx.request.body);
                        id = ctx.params.id;

                        if (!id) {
                            ctx.throw(400, 'id can not be empty');
                        }
                        password = ctx.params.password;

                        if (!password) {
                            ctx.throw(400, 'password can not be empty');
                        }
                        userid = auth.getID(ctx);

                        if (!userid) {
                            ctx.throw(403, 'unvalid token');
                        }

                        hashed_password = auth.getPassword(userid);
                        _context3.next = 10;
                        return encrypt.compareHashString(password, hashed_password);

                    case 10:
                        result = _context3.sent;

                        if (!result) {
                            ctx.throw(403, 'error password');
                        }

                        token = null;
                        _context3.prev = 13;
                        _context3.next = 16;
                        return _token2.default.findById(id, userid);

                    case 16:
                        token = _context3.sent;
                        _context3.next = 22;
                        break;

                    case 19:
                        _context3.prev = 19;
                        _context3.t0 = _context3['catch'](13);

                        ctx.throw(422, 'unvalid id');

                    case 22:
                        if (!token) {
                            ctx.throw(422, 'unvalid id');
                        }

                        // response
                        response = token.toJSON();

                        ctx.body = response;

                        if (!next) {
                            _context3.next = 27;
                            break;
                        }

                        return _context3.abrupt('return', next());

                    case 27:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[13, 19]]);
    }));

    return function detail(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

/**
 * delete token
 *
 * @example curl -H "Content-Type: application/json" -X DELETE localhost:4002/tokens/:id
 * @param ctx
 * @param next
 * @returns {*}
 */


var del = exports.del = function () {
    var _ref4 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(ctx, next) {
        var id, userid;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        debug(ctx.request.body);
                        id = ctx.params.id;

                        if (!id) {
                            ctx.throw(400, 'id can not be empty');
                        }
                        userid = auth.getID(ctx);

                        if (!userid) {
                            ctx.throw(403);
                        }
                        _context4.prev = 5;
                        _context4.next = 8;
                        return _token2.default.remove(id, userid);

                    case 8:
                        _context4.next = 13;
                        break;

                    case 10:
                        _context4.prev = 10;
                        _context4.t0 = _context4['catch'](5);

                        ctx.throw(422, 'unvalid id');

                    case 13:
                        ctx.status = 204;

                        if (!next) {
                            _context4.next = 16;
                            break;
                        }

                        return _context4.abrupt('return', next());

                    case 16:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[5, 10]]);
    }));

    return function del(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

var _token = require('../models/token');

var _token2 = _interopRequireDefault(_token);

var _auth = require('../tools/auth');

var auth = _interopRequireWildcard(_auth);

var _encrypt = require('../utils/encrypt');

var encrypt = _interopRequireWildcard(_encrypt);

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
