'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.listProjectVersions = exports.create = exports.list = exports.checkPatch = exports.del = exports.detail = undefined;

var _bluebird = require('bluebird');

var detail = exports.detail = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx, next) {
        var patch_id, patch, project, user, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        patch_id = ctx.params.id;

                        if (check.checkPatchEmpty(ctx, 'patch_id', patch_id)) {
                            _context.next = 3;
                            break;
                        }

                        return _context.abrupt('return');

                    case 3:
                        patch = null;
                        _context.prev = 4;
                        _context.next = 7;
                        return _patch2.default.findById(patch_id);

                    case 7:
                        patch = _context.sent;
                        _context.next = 13;
                        break;

                    case 10:
                        _context.prev = 10;
                        _context.t0 = _context['catch'](4);

                        ctx.throw(500);

                    case 13:
                        if (check.checkPatchResourceEmpty(ctx, patch)) {
                            _context.next = 15;
                            break;
                        }

                        return _context.abrupt('return');

                    case 15:
                        project = null;
                        _context.prev = 16;
                        _context.next = 19;
                        return _project3.default.findById(patch.project_id);

                    case 19:
                        project = _context.sent;
                        _context.next = 25;
                        break;

                    case 22:
                        _context.prev = 22;
                        _context.t1 = _context['catch'](16);

                        ctx.throw(500);

                    case 25:
                        if (check.checkProjectResourceEmpty(ctx, project)) {
                            _context.next = 27;
                            break;
                        }

                        return _context.abrupt('return');

                    case 27:
                        _context.next = 29;
                        return auth.getUser(ctx);

                    case 29:
                        user = _context.sent;

                        if (!user) {
                            ctx.throw(401);
                        }
                        if (user.role != 1) {
                            if (!project.isMember(user.id)) {
                                ctx.throw(403, 'no permission');
                            }
                        }

                        response = patch.toJSON();

                        ctx.body = response;

                    case 34:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[4, 10], [16, 22]]);
    }));

    return function detail(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var del = exports.del = function () {
    var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(ctx, next) {
        var patch_id, patch, project, user;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        patch_id = ctx.params.id;

                        if (!patch_id) {
                            ctx.throw(400, 'id can not be empty');
                        }

                        patch = null;
                        _context2.prev = 3;
                        _context2.next = 6;
                        return _patch2.default.findById(patch_id);

                    case 6:
                        patch = _context2.sent;
                        _context2.next = 12;
                        break;

                    case 9:
                        _context2.prev = 9;
                        _context2.t0 = _context2['catch'](3);

                        ctx.throw(500);

                    case 12:
                        if (check.checkPatchResourceEmpty(ctx, patch)) {
                            _context2.next = 14;
                            break;
                        }

                        return _context2.abrupt('return');

                    case 14:
                        project = null;
                        _context2.prev = 15;
                        _context2.next = 18;
                        return _project3.default.findById(patch.project_id);

                    case 18:
                        project = _context2.sent;
                        _context2.next = 24;
                        break;

                    case 21:
                        _context2.prev = 21;
                        _context2.t1 = _context2['catch'](15);

                        ctx.throw(500);

                    case 24:
                        if (project.status != 0) {
                            project = null;
                        }

                        if (check.checkProjectResourceEmpty(ctx, project)) {
                            _context2.next = 27;
                            break;
                        }

                        return _context2.abrupt('return');

                    case 27:
                        _context2.next = 29;
                        return auth.getUser(ctx);

                    case 29:
                        user = _context2.sent;

                        if (!user) {
                            ctx.throw(401);
                        }
                        if (user.role != 1) {
                            if (!project.isManager(user.id)) {
                                ctx.throw(403, 'no permission');
                            }
                        }

                        _context2.prev = 32;
                        _context2.next = 35;
                        return patch.remove();

                    case 35:
                        _context2.next = 40;
                        break;

                    case 37:
                        _context2.prev = 37;
                        _context2.t2 = _context2['catch'](32);

                        ctx.throw(500);

                    case 40:

                        ctx.status = 204;

                    case 41:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[3, 9], [15, 21], [32, 37]]);
    }));

    return function del(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var checkPatch = exports.checkPatch = function () {
    var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(ctx, next) {
        var project_id, project_version, patch_version, project, patches, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        debug(ctx.request.body);

                        project_id = ctx.request.body.project_id;

                        if (check.checkPatchEmpty(ctx, 'project_id', project_id)) {
                            _context3.next = 4;
                            break;
                        }

                        return _context3.abrupt('return');

                    case 4:
                        project_version = ctx.request.body.project_version;

                        if (check.checkPatchEmpty(ctx, 'project_version', project_version)) {
                            _context3.next = 7;
                            break;
                        }

                        return _context3.abrupt('return');

                    case 7:
                        patch_version = ctx.request.body.patch_version | 0;
                        project = null;
                        _context3.prev = 9;
                        _context3.next = 12;
                        return _project3.default.findById(project_id);

                    case 12:
                        project = _context3.sent;
                        _context3.next = 18;
                        break;

                    case 15:
                        _context3.prev = 15;
                        _context3.t0 = _context3['catch'](9);

                        ctx.throw(500);

                    case 18:
                        if (check.checkProjectResourceEmpty(ctx, project)) {
                            _context3.next = 20;
                            break;
                        }

                        return _context3.abrupt('return');

                    case 20:
                        patches = null;
                        _context3.prev = 21;
                        _context3.next = 24;
                        return _patch2.default.find({
                            project_id: project.id,
                            project_version: project_version,
                            patch_version: { $gt: patch_version }
                        }).sort({
                            patch_version: -1
                        }).limit(1);

                    case 24:
                        patches = _context3.sent;
                        _context3.next = 30;
                        break;

                    case 27:
                        _context3.prev = 27;
                        _context3.t1 = _context3['catch'](21);

                        ctx.throw(500);

                    case 30:
                        if (patches && patches.length > 0) {
                            response = patches[0].toJSON();

                            ctx.body = response;
                        } else {
                            ctx.status = 204;
                        }

                    case 31:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[9, 15], [21, 27]]);
    }));

    return function checkPatch(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var list = exports.list = function () {
    var _ref4 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(ctx, next) {
        var project_id, project, user, patches;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        project_id = ctx.params.project;
                        project = null;
                        _context4.prev = 2;
                        _context4.next = 5;
                        return _project3.default.findById(project_id);

                    case 5:
                        project = _context4.sent;
                        _context4.next = 11;
                        break;

                    case 8:
                        _context4.prev = 8;
                        _context4.t0 = _context4['catch'](2);

                        ctx.throw(500);

                    case 11:
                        if (check.checkProjectResourceEmpty(ctx, project)) {
                            _context4.next = 13;
                            break;
                        }

                        return _context4.abrupt('return');

                    case 13:
                        _context4.next = 15;
                        return auth.getUser(ctx);

                    case 15:
                        user = _context4.sent;

                        if (!user) {
                            ctx.throw(401);
                        }
                        if (user.role != 1) {
                            if (!project.isMember(user.id)) {
                                ctx.throw(403, 'no permission');
                            }
                        }

                        _context4.next = 20;
                        return _patch2.default.find({
                            project_id: project_id
                        }).lean();

                    case 20:
                        patches = _context4.sent;

                        patches = patches || [];
                        ctx.body = patches;

                    case 23:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[2, 8]]);
    }));

    return function list(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

/**
 * add patch to project
 *
 * @param ctx
 * @param next
 * @returns {*}
 */


var create = exports.create = function () {
    var _ref5 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(ctx, next) {
        var body, project_id, project_version, hash, patch_url, project, user, existed, patch_version_objects, patch_version, patch_object, patch, response;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        body = ctx.request.body;

                        debug(body);
                        project_id = ctx.params.project;

                        if (check.checkPatchEmpty(ctx, 'project_id', project_id)) {
                            _context5.next = 5;
                            break;
                        }

                        return _context5.abrupt('return');

                    case 5:
                        project_version = body.project_version;

                        if (check.checkPatchEmpty(ctx, 'project_version', project_version)) {
                            _context5.next = 8;
                            break;
                        }

                        return _context5.abrupt('return');

                    case 8:
                        hash = body.hash;

                        if (check.checkPatchEmpty(ctx, 'hash', hash)) {
                            _context5.next = 11;
                            break;
                        }

                        return _context5.abrupt('return');

                    case 11:
                        patch_url = body.patch_url;

                        if (check.checkPatchEmpty(ctx, 'patch_url', patch_url)) {
                            _context5.next = 14;
                            break;
                        }

                        return _context5.abrupt('return');

                    case 14:
                        project = null;
                        _context5.prev = 15;
                        _context5.next = 18;
                        return _project3.default.findById(project_id);

                    case 18:
                        project = _context5.sent;
                        _context5.next = 24;
                        break;

                    case 21:
                        _context5.prev = 21;
                        _context5.t0 = _context5['catch'](15);

                        ctx.throw(500, _context5.t0);

                    case 24:

                        if (project.status != 0) {
                            project = null;
                        }

                        if (check.checkProjectResourceEmpty(ctx, project)) {
                            _context5.next = 27;
                            break;
                        }

                        return _context5.abrupt('return');

                    case 27:
                        _context5.next = 29;
                        return auth.getUser(ctx);

                    case 29:
                        user = _context5.sent;

                        if (!user) {
                            ctx.throw(401);
                        }
                        if (user.role != 1) {
                            if (!project.isMember(user.id)) {
                                ctx.throw(403, 'no permission');
                            }
                        }

                        existed = true;
                        _context5.prev = 33;
                        _context5.next = 36;
                        return _patch2.default.findOne({
                            project_id: project_id,
                            project_version: project_version,
                            patch_version: patch_version
                        });

                    case 36:
                        existed = _context5.sent;
                        _context5.next = 42;
                        break;

                    case 39:
                        _context5.prev = 39;
                        _context5.t1 = _context5['catch'](33);

                        ctx.throw(500, _context5.t1);

                    case 42:
                        if (!existed) {
                            _context5.next = 45;
                            break;
                        }

                        response_util.patchExisted(ctx);
                        return _context5.abrupt('return');

                    case 45:

                        // get max patch_version
                        patch_version_objects = null;
                        _context5.prev = 46;
                        _context5.next = 49;
                        return _patch2.default.find({
                            project_id: project_id,
                            project_version: project_version
                        }, { patch_version: 1 }).sort({ patch_version: -1 }).limit(1);

                    case 49:
                        patch_version_objects = _context5.sent;
                        _context5.next = 55;
                        break;

                    case 52:
                        _context5.prev = 52;
                        _context5.t2 = _context5['catch'](46);

                        ctx.throw(500);

                    case 55:

                        debug(patch_version_objects);
                        patch_version = 1;

                        if (patch_version_objects && patch_version_objects.length > 0) {
                            patch_version = Number(patch_version_objects[0].patch_version) + 1;
                        }

                        patch_object = {
                            project_id: project_id,
                            project_version: project_version,
                            patch_version: patch_version,
                            hash: hash,
                            patch_url: patch_url
                        };
                        patch = new _patch2.default(patch_object);
                        _context5.prev = 60;
                        _context5.next = 63;
                        return patch.save();

                    case 63:
                        _context5.next = 68;
                        break;

                    case 65:
                        _context5.prev = 65;
                        _context5.t3 = _context5['catch'](60);

                        ctx.throw(500, _context5.t3);

                    case 68:
                        response = patch.toJSON();

                        ctx.status = 201;
                        ctx.body = response;

                    case 71:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this, [[15, 21], [33, 39], [46, 52], [60, 65]]);
    }));

    return function create(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();

/**
 * list all project versions in project
 *
 * @param ctx
 * @param next
 */


var listProjectVersions = exports.listProjectVersions = function () {
    var _ref6 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee6(ctx, next) {
        var project_id, project, user, version_objects, data, _project;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        project_id = ctx.params.project;
                        project = null;
                        _context6.prev = 2;
                        _context6.next = 5;
                        return _project3.default.findById(project_id);

                    case 5:
                        project = _context6.sent;
                        _context6.next = 11;
                        break;

                    case 8:
                        _context6.prev = 8;
                        _context6.t0 = _context6['catch'](2);

                        ctx.throw(500);

                    case 11:
                        if (check.checkProjectResourceEmpty(ctx, project)) {
                            _context6.next = 13;
                            break;
                        }

                        return _context6.abrupt('return');

                    case 13:
                        _context6.next = 15;
                        return auth.getUser(ctx);

                    case 15:
                        user = _context6.sent;

                        if (!user) {
                            ctx.throw(401);
                        }
                        if (user.role != 1) {
                            if (!project.isMember(user.id)) {
                                ctx.throw(403);
                            }
                        }

                        _context6.next = 20;
                        return _patch2.default.aggregate([{ $match: { project_id: project_id } }, {
                            $group: {
                                _id: "$project_version",
                                patch_version: { $max: "$patch_version" }
                            }
                        }, { $sort: { project_version: 1 } }]);

                    case 20:
                        version_objects = _context6.sent;

                        debug(version_objects);

                        data = {
                            id: project_id,
                            versions: version_objects
                        };
                        _context6.prev = 23;
                        _context6.next = 26;
                        return _project3.default.findById(project_id);

                    case 26:
                        _project = _context6.sent;

                        if (_project) {
                            data.project_name = _project.name;
                        }
                        _context6.next = 33;
                        break;

                    case 30:
                        _context6.prev = 30;
                        _context6.t1 = _context6['catch'](23);

                        ctx.throw(500);

                    case 33:

                        ctx.body = data;

                    case 34:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this, [[2, 8], [23, 30]]);
    }));

    return function listProjectVersions(_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}();

var _project2 = require('../models/project');

var _project3 = _interopRequireDefault(_project2);

var _patch = require('../models/patch');

var _patch2 = _interopRequireDefault(_patch);

var _response = require('../utils/response');

var response_util = _interopRequireWildcard(_response);

var _auth = require('../tools/auth');

var auth = _interopRequireWildcard(_auth);

var _check = require('../tools/check');

var check = _interopRequireWildcard(_check);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = new _debug2.default(_package2.default.name); /**
                                                          * Created by Bell on 16/8/25.
                                                          */
//# sourceMappingURL=patch.js.map
