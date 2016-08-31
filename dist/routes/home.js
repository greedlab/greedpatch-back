'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _home = require('../controllers/home');

var home = _interopRequireWildcard(_home);

var _user = require('../controllers/user');

var user = _interopRequireWildcard(_user);

var _auth = require('../tools/auth');

var auth = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Created by Bell on 16/6/16.
 */

var Router = require('koa-router');

var base_url = '/';
var router = new Router();

router.get('/', home.index).post('/register', user.register).post('/login', user.login).post('/logout', auth.ensureUser, user.logout).post('/modify-my-password', auth.ensureUser, user.modifyMyPassword).post('/reset-password', user.resetPassword).post('/set-password', user.setPassword);

exports.default = {
    base_url: base_url,
    router: router
};
//# sourceMappingURL=home.js.map
