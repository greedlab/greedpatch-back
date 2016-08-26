/**
 * Created by Bell on 16/8/25.
 */

const Router = require('koa-router');

import { ensureUser, ensureManager } from '../tools/auth';
import * as controller from '../controllers/permission';

let base_url = '/permissions';
let router = new Router({ prefix: base_url });

router
    .get('/:type', ensureUser, ensureManager, controller.get)
    .put('/:type', ensureUser, ensureManager, controller.set);

export default {
    baseUrl: base_url,
    router: router
};
