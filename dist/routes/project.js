'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _auth = require('../tools/auth');

var _project = require('../controllers/project');

var project = _interopRequireWildcard(_project);

var _patch = require('../controllers/patch');

var patch = _interopRequireWildcard(_patch);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Created by Bell on 16/8/25.
 */

var Router = require('koa-router');

var base_url = '/projects';
var router = new Router({ prefix: base_url });

router.post('/', _auth.ensureUser, project.add).post('/:id', _auth.ensureUser, project.update).delete('/:id', _auth.ensureUser, project.del).get('/', _auth.ensureUser, _auth.ensureManager, project.listAll).get('/my', _auth.ensureUser, project.listMy).get('/:id', _auth.ensureUser, project.detail).post('/:project/members', _auth.ensureUser, project.addMember).get('/:project/members', _auth.ensureUser, project.listMembers).delete('/:project/members/:member', _auth.ensureUser, project.delMember).post('/:project/patches', _auth.ensureUser, patch.add).get('/:project/patches', _auth.ensureUser, patch.list);

exports.default = {
    baseUrl: base_url,
    router: router
};
//# sourceMappingURL=project.js.map
