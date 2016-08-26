'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.add = exports.list = exports.check = exports.del = exports.detail = undefined;

var _bluebird = require('bluebird');

var detail = exports.detail = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx, next) {
        var patch_id, patch, project, user, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        patch_id = ctx.params.id;

                        if (!patch_id) {
                            ctx.throw(400, 'id can not be empty');
                        }

                        patch = null;
                        _context.prev = 3;
                        _context.next = 6;
                        return _patch2.default.findById(patch_id);

                    case 6:
                        patch = _context.sent;
                        _context.next = 12;
                        break;

                    case 9:
                        _context.prev = 9;
                        _context.t0 = _context['catch'](3);

                        ctx.throw(500);

                    case 12:
                        if (!patch) {
                            ctx.throw(404, 'patch is not existed');
                        }

                        project = null;
                        _context.prev = 14;
                        _context.next = 17;
                        return _project2.default.findById(patch.project_id);

                    case 17:
                        project = _context.sent;
                        _context.next = 23;
                        break;

                    case 20:
                        _context.prev = 20;
                        _context.t1 = _context['catch'](14);

                        ctx.throw(500);

                    case 23:
                        if (!project) {
                            ctx.throw(422, 'project is not existed');
                        }

                        _context.next = 26;
                        return auth.getUser(ctx);

                    case 26:
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

                    case 31:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[3, 9], [14, 20]]);
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
                        if (!patch) {
                            ctx.throw(404, 'patch is not existed');
                        }

                        project = null;
                        _context2.prev = 14;
                        _context2.next = 17;
                        return _project2.default.findById(patch.project_id);

                    case 17:
                        project = _context2.sent;
                        _context2.next = 23;
                        break;

                    case 20:
                        _context2.prev = 20;
                        _context2.t1 = _context2['catch'](14);

                        ctx.throw(500);

                    case 23:
                        if (!project) {
                            ctx.throw(422, 'project is not existed');
                        }

                        _context2.next = 26;
                        return auth.getUser(ctx);

                    case 26:
                        user = _context2.sent;

                        if (!user) {
                            ctx.throw(401);
                        }
                        if (user.role != 1) {
                            if (!project.isManager(user.id)) {
                                ctx.throw(403, 'no permission');
                            }
                        }

                        _context2.prev = 29;
                        _context2.next = 32;
                        return patch.remove();

                    case 32:
                        _context2.next = 37;
                        break;

                    case 34:
                        _context2.prev = 34;
                        _context2.t2 = _context2['catch'](29);

                        ctx.throw(500);

                    case 37:

                        ctx.status = 204;

                    case 38:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[3, 9], [14, 20], [29, 34]]);
    }));

    return function del(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var check = exports.check = function () {
    var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(ctx, next) {
        var project_id, project_version, patch_version, project, patches, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        debug(ctx.request.body);

                        project_id = ctx.request.body.project_id;

                        if (!project_id) {
                            ctx.throw(400, 'project_id can not be empty');
                        }

                        project_version = ctx.request.body.project_version;

                        if (!project_version) {
                            ctx.throw(400, 'project_version can not be empty');
                        }

                        patch_version = ctx.request.body.patch_version | 0;
                        project = null;
                        _context3.prev = 7;
                        _context3.next = 10;
                        return _project2.default.findById(project_id);

                    case 10:
                        project = _context3.sent;
                        _context3.next = 16;
                        break;

                    case 13:
                        _context3.prev = 13;
                        _context3.t0 = _context3['catch'](7);

                        ctx.throw(500);

                    case 16:
                        if (!project) {
                            ctx.throw(422, 'project is not existed');
                        }

                        patches = null;
                        _context3.prev = 18;
                        _context3.next = 21;
                        return _patch2.default.find({
                            project_id: project.id,
                            project_version: project_version,
                            patch_version: { $gt: patch_version }
                        }).sort({
                            patch_version: -1
                        }).limit(1);

                    case 21:
                        patches = _context3.sent;
                        _context3.next = 27;
                        break;

                    case 24:
                        _context3.prev = 24;
                        _context3.t1 = _context3['catch'](18);

                        ctx.throw(500);

                    case 27:
                        if (patches && patches.length > 0) {
                            response = patches[0].toJSON();

                            ctx.body = response;
                        } else {
                            ctx.status = 204;
                        }

                    case 28:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[7, 13], [18, 24]]);
    }));

    return function check(_x5, _x6) {
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

                        if (!project_id) {
                            ctx.throw(400, 'project can not be empty');
                        }

                        project = null;
                        _context4.prev = 3;
                        _context4.next = 6;
                        return _project2.default.findById(project_id);

                    case 6:
                        project = _context4.sent;
                        _context4.next = 12;
                        break;

                    case 9:
                        _context4.prev = 9;
                        _context4.t0 = _context4['catch'](3);

                        ctx.throw(500);

                    case 12:
                        if (!project) {
                            ctx.throw(422, 'project is not existed');
                        }

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
        }, _callee4, this, [[3, 9]]);
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


var add = exports.add = function () {
    var _ref5 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(ctx, next) {
        var body, project_id, project_version, patch_version, hash, patch_url, project, user, existed, patch_object, patch, response;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        body = ctx.request.body;

                        debug(body);
                        project_id = ctx.params.project;

                        if (!project_id) {
                            ctx.throw(400, 'project can not be empty');
                        }

                        project_version = body.project_version;

                        if (!project_version) {
                            ctx.throw(400, 'project_version can not be empty');
                        }

                        patch_version = body.patch_version;

                        if (!patch_version) {
                            ctx.throw(400, 'patch_version can not be empty');
                        }

                        hash = body.hash;

                        if (!hash) {
                            ctx.throw(400, 'hash can not be empty');
                        }

                        patch_url = body.patch_url;

                        if (!patch_url) {
                            ctx.throw(400, 'patch_url can not be empty');
                        }

                        project = null;
                        _context5.prev = 13;
                        _context5.next = 16;
                        return _project2.default.findById(project_id);

                    case 16:
                        project = _context5.sent;
                        _context5.next = 22;
                        break;

                    case 19:
                        _context5.prev = 19;
                        _context5.t0 = _context5['catch'](13);

                        ctx.throw(500, _context5.t0);

                    case 22:
                        if (!project) {
                            ctx.throw(422, 'project is not existed');
                        }

                        _context5.next = 25;
                        return auth.getUser(ctx);

                    case 25:
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
                        _context5.prev = 29;
                        _context5.next = 32;
                        return _patch2.default.findOne({
                            project_id: project_id,
                            project_version: project_version,
                            patch_version: patch_version
                        });

                    case 32:
                        existed = _context5.sent;
                        _context5.next = 38;
                        break;

                    case 35:
                        _context5.prev = 35;
                        _context5.t1 = _context5['catch'](29);

                        ctx.throw(500, _context5.t1);

                    case 38:
                        if (existed) {
                            ctx.throw(422, 'patch is existed');
                        }

                        patch_object = {
                            project_id: project_id,
                            project_version: project_version,
                            patch_version: patch_version,
                            hash: hash,
                            patch_url: patch_url
                        };
                        patch = new _patch2.default(patch_object);
                        _context5.prev = 41;
                        _context5.next = 44;
                        return patch.save();

                    case 44:
                        _context5.next = 49;
                        break;

                    case 46:
                        _context5.prev = 46;
                        _context5.t2 = _context5['catch'](41);

                        ctx.throw(500, _context5.t2);

                    case 49:
                        response = patch.toJSON();

                        ctx.status = 201;
                        ctx.body = response;

                    case 52:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this, [[13, 19], [29, 35], [41, 46]]);
    }));

    return function add(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();

var _project = require('../models/project');

var _project2 = _interopRequireDefault(_project);

var _patch = require('../models/patch');

var _patch2 = _interopRequireDefault(_patch);

var _auth = require('../tools/auth');

var auth = _interopRequireWildcard(_auth);

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
