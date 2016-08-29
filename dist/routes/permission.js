'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _auth = require('../tools/auth');

var _permission = require('../controllers/permission');

var controller = _interopRequireWildcard(_permission);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Created by Bell on 16/8/25.
 */

var Router = require('koa-router');

var base_url = '/permissions';
var router = new Router({ prefix: base_url });

router.get('/:type', _auth.ensureUser, _auth.ensureManager, controller.get).put('/:type', _auth.ensureUser, _auth.ensureManager, controller.set);

exports.default = {
    base_url: base_url,
    router: router
};
//# sourceMappingURL=permission.js.map
