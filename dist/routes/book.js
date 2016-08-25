'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _auth = require('../tools/auth');

var _book = require('../controllers/book');

var controller = _interopRequireWildcard(_book);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Created by Bell on 16/8/10.
 */

var Router = require('koa-router');

var base_url = '/book';
var router = new Router({ prefix: base_url });

router.get('/list', controller.listBook).get('/detail', controller.showBook).post('/add', _auth.ensureUser, controller.addBook).post('/delete', _auth.ensureUser, controller.deleteBook);

exports.default = {
    baseUrl: base_url,
    router: router
};
//# sourceMappingURL=book.js.map
