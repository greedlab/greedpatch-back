'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _auth = require('../tools/auth');

var _patch = require('../controllers/patch');

var controller = _interopRequireWildcard(_patch);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Created by Bell on 16/8/25.
 */

var Router = require('koa-router');

var base_url = '/projects';
var router = new Router({ prefix: base_url });

router.get('/:id', _auth.ensureUser, controller.detail).delete('/:id', _auth.ensureUser, controller.del).get('/check', _auth.ensureUser, controller.check);

exports.default = {
    baseUrl: base_url,
    router: router
};
//# sourceMappingURL=patch.js.map
