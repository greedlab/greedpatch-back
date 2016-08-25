'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.index = undefined;

var _bluebird = require('bluebird');

/**
 * Created by Bell on 16/8/10.
 */

/**
 * get api list
 *
 * @example curl -X GET localhost:4002/
 * @param ctx
 * @param next
 */
var index = exports.index = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx, next) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        ctx.body = {
                            registerUser: '<domain>/user/register',
                            loginUser: '<domain>/user/login',
                            logoutUser: '<domain>/user/logout',
                            listUser: '<domain>/user/list',
                            addBook: '<domain>/book/add',
                            listBook: '<domain>/book/list',
                            showBook: '<domain>/book/detail',
                            deleteBook: '<domain>/book/delete'
                        };

                    case 1:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function index(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
//# sourceMappingURL=home.js.map
