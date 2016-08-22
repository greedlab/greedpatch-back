/**
 * Created by Bell on 16/8/10.
 */

const Router = require('koa-router');

import { ensureUser } from '../utils/auth';
import * as controller from '../controllers/book';

let base_url = '/book';
let router = new Router({ prefix: base_url });

router
    .get('/list', controller.listBook)
    .get('/detail', controller.showBook)
    .post('/add', ensureUser, controller.addBook)
    .post('/delete', ensureUser, controller.deleteBook);

export default {
    baseUrl: base_url,
    router: router
};
