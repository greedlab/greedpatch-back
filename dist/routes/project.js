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

router.get('/', _auth.ensureUser, _auth.ensureManager, project.listAll).post('/', _auth.ensureUser, project.create).get('/my', _auth.ensureUser, project.listMy).post('/:id/status', _auth.ensureUser, project.updateStatus).get('/:id', _auth.ensureUser, project.detail).post('/:id', _auth.ensureUser, project.update).delete('/:id', _auth.ensureUser, project.del).post('/:project/members', _auth.ensureUser, project.addMember).get('/:project/members', _auth.ensureUser, project.listMembers).delete('/:project/members/:member', _auth.ensureUser, project.delMember).post('/:project/patches', _auth.ensureUser, patch.create).get('/:project/patches', _auth.ensureUser, patch.list).get('/:project/versions', _auth.ensureUser, patch.listProjectVersions);

exports.default = {
    base_url: base_url,
    router: router
};
//# sourceMappingURL=project.js.map
