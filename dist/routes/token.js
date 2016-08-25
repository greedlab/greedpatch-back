'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _auth = require('../tools/auth');

var _token = require('../controllers/token');

var controller = _interopRequireWildcard(_token);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Created by Bell on 16/8/24.
 */

var Router = require('koa-router');

var base_url = '/tokens';
var router = new Router({ prefix: base_url });

router.get('/', _auth.ensureUser, controller.list).post('/', _auth.ensureUser, controller.generate).post('/:id', _auth.ensureUser, controller.detail).delete('/:id', _auth.ensureUser, controller.del);

exports.default = {
    baseUrl: base_url,
    router: router
};
//# sourceMappingURL=token.js.map
