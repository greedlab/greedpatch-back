/**
 * Created by Bell on 16/8/10.
 */

const Router = require('koa-router');

import { ensureUser } from '../utils/auth';
import * as controller from '../controllers/user';

let base_url = '/user';
let router = new Router({ prefix: base_url });

router
    .post('/list', ensureUser, controller.list)
    .post('/register', controller.register)
    .post('/login', controller.login)
    .post('/logout', ensureUser, controller.logout);

export default {
    baseUrl: base_url,
    router: router
};
