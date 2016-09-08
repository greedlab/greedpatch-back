'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.del = exports.detail = exports.list = exports.generate = undefined;

var _bluebird = require('bluebird');

/**
 * generate new token
 *
 * @param ctx
 * @param next
 * @returns {*}
 */
var generate = exports.generate = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx, next) {
        var name, password, user, result, payload, token, token_object, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        debug(ctx.request.body);
                        name = ctx.request.body.name;

                        if (check.checkEmpty(ctx, 'Token', 'name', name)) {
                            _context.next = 4;
                            break;
                        }

                        return _context.abrupt('return');

                    case 4:
                        password = ctx.request.body.password;

                        if (check.checkEmpty(ctx, 'User', 'password', password)) {
                            _context.next = 7;
                            break;
                        }

                        return _context.abrupt('return');

                    case 7:
                        user = null;
                        _context.prev = 8;
                        _context.next = 11;
                        return auth.getFullUser(ctx);

                    case 11:
                        user = _context.sent;
                        _context.next = 17;
                        break;

                    case 14:
                        _context.prev = 14;
                        _context.t0 = _context['catch'](8);

                        ctx.throw(500);

                    case 17:

                        if (!user) {
                            ctx.throw(401);
                        }

                        // validate password
                        result = false;
                        _context.prev = 19;
                        _context.next = 22;
                        return user.validatePassword(password);

                    case 22:
                        result = _context.sent;
                        _context.next = 28;
                        break;

                    case 25:
                        _context.prev = 25;
                        _context.t1 = _context['catch'](19);

                        ctx.throw(500);

                    case 28:
                        if (result) {
                            _context.next = 31;
                            break;
                        }

                        response_util.fieldInvalid(ctx, 'User', 'password', 'Invalid password');
                        return _context.abrupt('return');

                    case 31:
                        payload = token_util.generateCheckPatchPayload(user.id);
                        token = token_util.generateTokenFromPayload(payload);

                        if (!token) {
                            ctx.throw(500);
                        }

                        token_object = new _token4.default({ userid: user.id, token: token, name: name, type: 1 });
                        _context.prev = 35;
                        _context.next = 38;
                        return token_object.save();

                    case 38:
                        _context.next = 40;
                        return token_redis.add(token, payload.exp);

                    case 40:
                        _context.next = 45;
                        break;

                    case 42:
                        _context.prev = 42;
                        _context.t2 = _context['catch'](35);

                        ctx.throw(500, _context.t2.message);

                    case 45:

                        // response
                        response = token_object.toJSON();

                        ctx.body = response;
                        ctx.statusCode = 201;

                    case 48:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[8, 14], [19, 25], [35, 42]]);
    }));

    return function generate(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * generate new token
 *
 * @param ctx
 * @param next
 * @returns {*}
 */


var list = exports.list = function () {
    var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(ctx, next) {
        var type, userid, token_objects, array, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, token_object, payload, timestamp;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        type = ctx.request.body.type || 1;
                        userid = auth.getID(ctx);

                        if (!userid) {
                            ctx.throw(401);
                        }
                        _context2.next = 5;
                        return _token4.default.find({ userid: userid, type: type }).lean();

                    case 5:
                        token_objects = _context2.sent;
                        array = [];
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context2.prev = 10;
                        _iterator = token_objects[Symbol.iterator]();

                    case 12:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context2.next = 23;
                            break;
                        }

                        token_object = _step.value;
                        payload = token_util.getPayload(token_object.token);

                        if (!payload) {
                            _context2.next = 20;
                            break;
                        }

                        _context2.next = 18;
                        return user_redis.getTimestamp(payload.id);

                    case 18:
                        timestamp = _context2.sent;

                        // whether token is valid
                        if (!timestamp || timestamp == 0 || payload.iat > timestamp) {
                            delete token_object.token;
                            array.push(token_object);
                        }

                    case 20:
                        _iteratorNormalCompletion = true;
                        _context2.next = 12;
                        break;

                    case 23:
                        _context2.next = 29;
                        break;

                    case 25:
                        _context2.prev = 25;
                        _context2.t0 = _context2['catch'](10);
                        _didIteratorError = true;
                        _iteratorError = _context2.t0;

                    case 29:
                        _context2.prev = 29;
                        _context2.prev = 30;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 32:
                        _context2.prev = 32;

                        if (!_didIteratorError) {
                            _context2.next = 35;
                            break;
                        }

                        throw _iteratorError;

                    case 35:
                        return _context2.finish(32);

                    case 36:
                        return _context2.finish(29);

                    case 37:
                        ctx.body = array || [];

                    case 38:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[10, 25, 29, 37], [30,, 32, 36]]);
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
        var id, password, user, result, token, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        id = ctx.params.id;

                        if (!id) {
                            ctx.throw(400, 'id can not be empty');
                        }
                        password = ctx.request.body.password;

                        if (!password) {
                            ctx.throw(400, 'password can not be empty');
                        }

                        _context3.next = 6;
                        return auth.getFullUser(ctx);

                    case 6:
                        user = _context3.sent;

                        if (!user) {
                            ctx.throw(403, 'unvalid token');
                        }

                        _context3.next = 10;
                        return user.validatePassword(password);

                    case 10:
                        result = _context3.sent;

                        if (!result) {
                            ctx.throw(403, 'error password');
                        }

                        token = null;
                        _context3.prev = 13;
                        _context3.next = 16;
                        return _token4.default.findById(id);

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
                        if (token.userid != user.id) {
                            ctx.throw(403, 'no permission');
                        }

                        // response
                        response = token.toJSON();

                        ctx.body = response;

                    case 26:
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
                        id = ctx.params.id;

                        if (!id) {
                            ctx.throw(400, 'id can not be empty');
                        }
                        userid = auth.getID(ctx);

                        if (!userid) {
                            ctx.throw(403);
                        }
                        _context4.prev = 4;
                        _context4.next = 7;
                        return _token4.default.remove({ _id: id, userid: userid });

                    case 7:
                        _context4.next = 12;
                        break;

                    case 9:
                        _context4.prev = 9;
                        _context4.t0 = _context4['catch'](4);

                        ctx.throw(422, 'unvalid id');

                    case 12:
                        ctx.status = 204;

                    case 13:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[4, 9]]);
    }));

    return function del(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

var _token = require('../utils/token');

var token_util = _interopRequireWildcard(_token);

var _response = require('../utils/response');

var response_util = _interopRequireWildcard(_response);

var _token2 = require('../redis/token');

var token_redis = _interopRequireWildcard(_token2);

var _user = require('../redis/user');

var user_redis = _interopRequireWildcard(_user);

var _token3 = require('../models/token');

var _token4 = _interopRequireDefault(_token3);

var _auth = require('../tools/auth');

var auth = _interopRequireWildcard(_auth);

var _check = require('../tools/check');

var check = _interopRequireWildcard(_check);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var debug = new _debug2.default(_package2.default.name); /**
                                                          * Created by Bell on 16/8/24.
                                                          */
//# sourceMappingURL=token.js.map
