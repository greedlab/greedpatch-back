/**
 * Created by Bell on 16/8/25.
 */

const Router = require('koa-router');

import { ensureUser,ensureManager } from '../tools/auth';
import * as project from '../controllers/project';
import * as patch from '../controllers/patch';

let base_url = '/projects';
let router = new Router({ prefix: base_url });

router
    .post('/', ensureUser, project.add)
    .get('/:id', ensureUser, project.detail)
    .delete('/:id', ensureUser, project.del)
    .get('/', ensureUser, ensureManager, project.listAll)
    .get('/my', ensureUser, project.listMy)
    .post('/:project/members', ensureUser, project.addMember)
    .get('/:project/members', ensureUser, project.listMembers)
    .delete('/:project/members/:member', ensureUser, project.delMember)
    .post('/:project/patches', ensureUser, patch.add)
    .get('/:project/patches', ensureUser, patch.list);

export default {
    baseUrl: base_url,
    router: router
};
