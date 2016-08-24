/**
 * Created by Bell on 16/8/24.
 */

const Router = require('koa-router');

import { ensureUser } from '../utils/auth';
import * as controller from '../controllers/token';

let base_url = '/books';
let router = new Router({ prefix: base_url });

router
    .get('/', ensureUser, controller.list)
    .post('/', ensureUser, controller.generate)
    .delete('/:id', ensureUser, controller.del);

export default {
    baseUrl: base_url,
    router: router
};
