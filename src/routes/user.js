/**
 * Created by Bell on 16/8/10.
 */

const Router = require('koa-router');

import * as auth from '../tools/auth';
import * as controller from '../controllers/user';

let base_url = '/users';
let router = new Router({ prefix: base_url });

router
    .get('/', auth.ensureUser, auth.ensureManager, controller.list)
    .get('/me/profile', auth.ensureUser, controller.myProfile)
    .post('/me/modify-password', auth.ensureUser, controller.modifyMyPassword)
    .get('/:id/profile', auth.ensureUser, auth.ensureManager, controller.profile)
    .post('/:id/password', auth.ensureUser, auth.ensureManager, controller.updatePassword)
    .post('/:id/status', auth.ensureUser, auth.ensureManager, controller.updateStatus);

export default {
    base_url,
    router: router
};
