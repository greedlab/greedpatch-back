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
        var name, userid, token, token_object, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        debug(ctx.request.body);
                        name = ctx.request.body.name;


                        if (!name) {
                            ctx.throw(400, 'name can not be empty');
                        }

                        userid = auth.getID(ctx);

                        if (!userid) {
                            ctx.throw(401);
                        }

                        token = token_util.generateCheckPatchToken(userid);

                        if (!token) {
                            ctx.throw(500);
                        }

                        token_object = new _token3.default({ userid: userid, token: token, name: name, type: 1 });
                        _context.prev = 8;
                        _context.next = 11;
                        return token_object.save();

                    case 11:
                        _context.next = 16;
                        break;

                    case 13:
                        _context.prev = 13;
                        _context.t0 = _context['catch'](8);

                        ctx.throw(500, _context.t0.message);

                    case 16:

                        // response
                        response = token_object.toJSON();

                        ctx.body = response;

                    case 18:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[8, 13]]);
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
        var status, type, userid, tokens, array, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, token;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        status = ctx.request.body.status || 0;
                        type = ctx.request.body.type || 1;
                        userid = auth.getID(ctx);

                        if (!userid) {
                            ctx.throw(403);
                        }
                        _context2.next = 6;
                        return _token3.default.find({ userid: userid, status: status, type: type }).lean();

                    case 6:
                        tokens = _context2.sent;
                        array = [];
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context2.prev = 11;

                        for (_iterator = tokens[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            token = _step.value;

                            delete token.token;
                            array.push(token);
                        }
                        _context2.next = 19;
                        break;

                    case 15:
                        _context2.prev = 15;
                        _context2.t0 = _context2['catch'](11);
                        _didIteratorError = true;
                        _iteratorError = _context2.t0;

                    case 19:
                        _context2.prev = 19;
                        _context2.prev = 20;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 22:
                        _context2.prev = 22;

                        if (!_didIteratorError) {
                            _context2.next = 25;
                            break;
                        }

                        throw _iteratorError;

                    case 25:
                        return _context2.finish(22);

                    case 26:
                        return _context2.finish(19);

                    case 27:
                        ctx.body = array || [];

                    case 28:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[11, 15, 19, 27], [20,, 22, 26]]);
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
                        return _token3.default.findById(id);

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
                        return _token3.default.remove({ _id: id, userid: userid });

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

var _token2 = require('../models/token');

var _token3 = _interopRequireDefault(_token2);

var _auth = require('../tools/auth');

var auth = _interopRequireWildcard(_auth);

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
