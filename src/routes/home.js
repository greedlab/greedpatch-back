/**
 * Created by Bell on 16/6/16.
 */

const Router = require('koa-router');

import * as controller from '../controllers/home';
import { ensureUser } from '../utils/auth';

let base_url = '/';
let router = new Router({ prefix: base_url });

router
    .get('/', controller.index);

export default {
    baseUrl: base_url,
    router: router
};
