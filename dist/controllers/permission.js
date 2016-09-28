'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.set = exports.get = undefined;

var _bluebird = require('bluebird');

/**
 * get permission by type
 *
 * @param ctx
 * @param next
 * @returns {*}
 */
var get = exports.get = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx, next) {
        var type, permission, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        type = ctx.params.type;
                        permission = null;
                        _context.prev = 2;
                        _context.next = 5;
                        return _permission2.default.find({ type: type }, { _id: 0, __v: 0 }).limit(1);

                    case 5:
                        permission = _context.sent;
                        _context.next = 11;
                        break;

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](2);

                        ctx.throw(500);

                    case 11:
                        response = null;

                        if (permission && permission.length > 0) {
                            response = permission[0].toJSON();
                        } else {
                            response = {
                                type: type,
                                permission: 0,
                                domains: []
                            };
                        }

                        // response
                        ctx.body = response;

                        if (!next) {
                            _context.next = 16;
                            break;
                        }

                        return _context.abrupt('return', next());

                    case 16:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[2, 8]]);
    }));

    return function get(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * set permission for type
 * 
 * @param ctx
 * @param next
 * @returns {*}
 */


var set = exports.set = function () {
    var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(ctx, next) {
        var type, permission_object, permissions, permission;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        debug(ctx.request.body);
                        type = ctx.params.type;

                        if (!type) {
                            ctx.throw(400, 'type can not be empty');
                        }

                        permission_object = ctx.request.body;

                        permission_object.type = type;

                        _context2.prev = 5;
                        _context2.next = 8;
                        return _permission2.default.find({ type: type }).limit(1);

                    case 8:
                        permissions = _context2.sent;
                        permission = permissions && permissions.length > 0 ? permissions[0] : null;

                        if (!permission) {
                            _context2.next = 15;
                            break;
                        }

                        _context2.next = 13;
                        return permission.update({ $set: permission_object });

                    case 13:
                        _context2.next = 18;
                        break;

                    case 15:
                        permission = new _permission2.default(permission_object);
                        _context2.next = 18;
                        return permission.save();

                    case 18:
                        _context2.next = 23;
                        break;

                    case 20:
                        _context2.prev = 20;
                        _context2.t0 = _context2['catch'](5);

                        ctx.throw(500, _context2.t0.message);

                    case 23:

                        // response
                        ctx.status = 204;

                        if (!next) {
                            _context2.next = 26;
                            break;
                        }

                        return _context2.abrupt('return', next());

                    case 26:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[5, 20]]);
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
