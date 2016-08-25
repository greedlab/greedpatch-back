'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.set = exports.get = undefined;

var _bluebird = require('bluebird');

var get = exports.get = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx, next) {
        var id, permission, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        debug(ctx.request.body);
                        id = ctx.params.id;

                        if (!id) {
                            ctx.throw(400, 'id can not be empty');
                        }

                        permission = null;
                        _context.prev = 4;
                        _context.next = 7;
                        return _permission2.default.findById(id);

                    case 7:
                        permission = _context.sent;
                        _context.next = 13;
                        break;

                    case 10:
                        _context.prev = 10;
                        _context.t0 = _context['catch'](4);

                        ctx.throw(500);

                    case 13:
                        if (!permission) {
                            permission = new _permission2.default({
                                id: id,
                                permission: 0,
                                domains: []
                            });
                        }

                        // response
                        response = permission.toJSON();

                        ctx.body = response;

                        if (!next) {
                            _context.next = 18;
                            break;
                        }

                        return _context.abrupt('return', next());

                    case 18:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[4, 10]]);
    }));

    return function get(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var set = exports.set = function () {
    var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(ctx, next) {
        var id, permission;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        debug(ctx.request.body);
                        id = ctx.params.id;

                        if (!id) {
                            ctx.throw(400, 'id can not be empty');
                        }

                        permission = null;
                        _context2.prev = 4;
                        _context2.next = 7;
                        return _permission2.default.findById(id);

                    case 7:
                        permission = _context2.sent;
                        _context2.next = 13;
                        break;

                    case 10:
                        _context2.prev = 10;
                        _context2.t0 = _context2['catch'](4);

                        ctx.throw(500);

                    case 13:
                        if (permission) {
                            _context2.next = 26;
                            break;
                        }

                        permission = new _permission2.default(ctx.request.body);
                        permission.id = id;
                        _context2.prev = 16;
                        _context2.next = 19;
                        return permission.save();

                    case 19:
                        _context2.next = 24;
                        break;

                    case 21:
                        _context2.prev = 21;
                        _context2.t1 = _context2['catch'](16);

                        ctx.throw(500);

                    case 24:
                        _context2.next = 27;
                        break;

                    case 26:
                        permission.update(ctx.request.body);

                    case 27:

                        // response
                        ctx.status = 204;

                        if (!next) {
                            _context2.next = 30;
                            break;
                        }

                        return _context2.abrupt('return', next());

                    case 30:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[4, 10], [16, 21]]);
    }));

    return function set(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var _permission = require('../models/permission');

var _permission2 = _interopRequireDefault(_permission);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = new _debug2.default(_package2.default.name); /**
                                                          * Created by Bell on 16/8/25.
                                                          */
//# sourceMappingURL=permission.js.map
