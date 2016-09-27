'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _auth = require('../tools/auth');

var auth = _interopRequireWildcard(_auth);

var _user = require('../controllers/user');

var controller = _interopRequireWildcard(_user);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Created by Bell on 16/8/10.
 */

var Router = require('koa-router');

var base_url = '/users';
var router = new Router({ prefix: base_url });

router.get('/', auth.ensureUser, auth.ensureManager, controller.list).get('/me/profile', auth.ensureUser, controller.myProfile).post('/me/modify-password', auth.ensureUser, controller.modifyMyPassword).get('/:id/profile', auth.ensureUser, auth.ensureManager, controller.profile).post('/:id/password', auth.ensureUser, auth.ensureManager, controller.updatePassword).post('/:id/status', auth.ensureUser, auth.ensureManager, controller.updateStatus);

exports.default = {
    base_url: base_url,
    router: router
};
//# sourceMappingURL=user.js.map
