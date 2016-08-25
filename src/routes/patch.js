/**
 * Created by Bell on 16/8/25.
 */

const Router = require('koa-router');

import { ensureUser } from '../tools/auth';
import * as controller from '../controllers/patch';

let base_url = '/projects';
let router = new Router({ prefix: base_url });

router
    .get('/:id', ensureUser, controller.detail)
    .delete('/:id', ensureUser, controller.del)
    .get('/check', ensureUser, controller.check);

export default {
    baseUrl: base_url,
    router: router
};
