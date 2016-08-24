'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteBook = exports.showBook = exports.addBook = exports.listBook = undefined;

var _bluebird = require('bluebird');

/**
 * list books
 *
 * @example curl -X GET localhost:4002/book/list
 *
 * @param ctx
 * @param next
 * @returns {books:[{name: "book", price: "$100"}]}
 */
var listBook = exports.listBook = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx, next) {
        var books;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _book2.default.find();

                    case 3:
                        books = _context.sent;

                        if (!books) {
                            ctx.throw(404);
                        }
                        ctx.body = {
                            books: books
                        };
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
                        ;

                    case 15:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 8]]);
    }));

    return function listBook(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * add book
 *
 * @example curl -H "Authorization: Bearer <token>" -X POST -d 'name=book name&price=$100'  localhost:4002/book/add
 * @param ctx
 *
 * @param next
 * @returns {id: "XXXXXX", name: "book", price: "$100"}
 */


var addBook = exports.addBook = function () {
    var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(ctx, next) {
        var book, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        debug(ctx.request.body);
                        book = new _book2.default(ctx.request.body);
                        _context2.prev = 2;
                        _context2.next = 5;
                        return book.save();

                    case 5:
                        _context2.next = 10;
                        break;

                    case 7:
                        _context2.prev = 7;
                        _context2.t0 = _context2['catch'](2);

                        ctx.throw(422, _context2.t0.message);

                    case 10:
                        response = book.toJSON();

                        ctx.body = response;

                        if (!next) {
                            _context2.next = 14;
                            break;
                        }

                        return _context2.abrupt('return', next());

                    case 14:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[2, 7]]);
    }));

    return function addBook(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

/**
 * show book detail
 *
 * @example curl -X GET localhost:4002/book/detail?id=57ac63281bc525c5243715c6
 *
 * @param ctx
 * @param next
 * @returns {*}
 */


var showBook = exports.showBook = function () {
    var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(ctx, next) {
        var book;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return _book2.default.findById(ctx.request.query.id);

                    case 3:
                        book = _context3.sent;

                        if (!book) {
                            ctx.throw(404);
                        }
                        ctx.body = {
                            book: book
                        };
                        _context3.next = 12;
                        break;

                    case 8:
                        _context3.prev = 8;
                        _context3.t0 = _context3['catch'](0);

                        if (_context3.t0 === 404 || _context3.t0.name === 'CastError') {
                            ctx.throw(404);
                        }
                        ctx.throw(500);

                    case 12:
                        if (!next) {
                            _context3.next = 14;
                            break;
                        }

                        return _context3.abrupt('return', next());

                    case 14:
                        ;

                    case 15:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[0, 8]]);
    }));

    return function showBook(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

/**
 * delete book
 *
 * @example curl -H "Authorization: Bearer <token>" -X POST -d 'id=57ac63281bc525c5243715c6'  localhost:4002/book/delete
 * @param ctx
 * @param next
 */


var deleteBook = exports.deleteBook = function () {
    var _ref4 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(ctx, next) {
        var book;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        book = new _book2.default(ctx.request.body);
                        _context4.next = 4;
                        return book.remove();

                    case 4:
                        _context4.next = 9;
                        break;

                    case 6:
                        _context4.prev = 6;
                        _context4.t0 = _context4['catch'](0);

                        ctx.throw(500);

                    case 9:
                        ctx.status = 200;
                        ctx.body = {
                            success: true
                        };

                    case 11:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[0, 6]]);
    }));

    return function deleteBook(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

var _book = require('../models/book');

var _book2 = _interopRequireDefault(_book);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = new _debug2.default(_package2.default.name); /**
                                                          * Created by Bell on 16/8/10.
                                                          */
//# sourceMappingURL=book.js.map
