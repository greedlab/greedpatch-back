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
                        debug(ctx.request.body);
                        patch_id = ctx.params.id;

                        if (!patch_id) {
                            ctx.throw(400, 'id can not be empty');
                        }

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
                        if (!patch) {
                            ctx.throw(404, 'patch is not existed');
                        }

                        project = null;
                        _context.prev = 15;
                        _context.next = 18;
                        return _project2.default.findById(patch.project_id);

                    case 18:
                        project = _context.sent;
                        _context.next = 24;
                        break;

                    case 21:
                        _context.prev = 21;
                        _context.t1 = _context['catch'](15);

                        ctx.throw(500);

                    case 24:
                        if (!project) {
                            ctx.throw(422, 'project is not existed');
                        }

                        _context.next = 27;
                        return auth.getUser(ctx);

                    case 27:
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

                        if (!next) {
                            _context.next = 34;
                            break;
                        }

                        return _context.abrupt('return', next());

                    case 34:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[4, 10], [15, 21]]);
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
                        debug(ctx.request.body);
                        patch_id = ctx.params.id;

                        if (!patch_id) {
                            ctx.throw(400, 'id can not be empty');
                        }

                        patch = null;
                        _context2.prev = 4;
                        _context2.next = 7;
                        return _patch2.default.findById(patch_id);

                    case 7:
                        patch = _context2.sent;
                        _context2.next = 13;
                        break;

                    case 10:
                        _context2.prev = 10;
                        _context2.t0 = _context2['catch'](4);

                        ctx.throw(500);

                    case 13:
                        if (!patch) {
                            ctx.throw(404, 'patch is not existed');
                        }

                        project = null;
                        _context2.prev = 15;
                        _context2.next = 18;
                        return _project2.default.findById(patch.project_id);

                    case 18:
                        project = _context2.sent;
                        _context2.next = 24;
                        break;

                    case 21:
                        _context2.prev = 21;
                        _context2.t1 = _context2['catch'](15);

                        ctx.throw(500);

                    case 24:
                        if (!project) {
                            ctx.throw(422, 'project is not existed');
                        }

                        _context2.next = 27;
                        return auth.getUser(ctx);

                    case 27:
                        user = _context2.sent;

                        if (!user) {
                            ctx.throw(401);
                        }
                        if (user.role != 1) {
                            if (!project.isManager(user.id)) {
                                ctx.throw(403, 'no permission');
                            }
                        }

                        _context2.prev = 30;
                        _context2.next = 33;
                        return patch.remove();

                    case 33:
                        _context2.next = 38;
                        break;

                    case 35:
                        _context2.prev = 35;
                        _context2.t2 = _context2['catch'](30);

                        ctx.throw(500);

                    case 38:

                        ctx.status = 204;

                        if (!next) {
                            _context2.next = 41;
                            break;
                        }

                        return _context2.abrupt('return', next());

                    case 41:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[4, 10], [15, 21], [30, 35]]);
    }));

    return function del(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var check = exports.check = function () {
    var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(ctx, next) {
        var bundle_id, client, project_version, patch_version, project, patches, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        debug(ctx.request.body);

                        bundle_id = ctx.request.body.bundle_id;

                        if (!bundle_id) {
                            ctx.throw(400, 'bundle_id can not be empty');
                        }

                        client = ctx.request.body.client;

                        if (!client) {
                            ctx.throw(400, 'client can not be empty');
                        }

                        project_version = ctx.request.body.app_version;

                        if (!project_version) {
                            ctx.throw(400, 'app_version can not be empty');
                        }

                        patch_version = ctx.request.body.patch_version | 0;
                        project = null;
                        _context3.prev = 9;
                        _context3.next = 12;
                        return _project2.default.findOne({ bundle_id: bundle_id });

                    case 12:
                        project = _context3.sent;
                        _context3.next = 18;
                        break;

                    case 15:
                        _context3.prev = 15;
                        _context3.t0 = _context3['catch'](9);

                        ctx.throw(500);

                    case 18:
                        if (!project) {
                            ctx.throw(422, 'project is not existed');
                        }

                        patches = null;
                        _context3.prev = 20;
                        _context3.next = 23;
                        return _patch2.default.find({
                            project_id: project.id,
                            project_version: project_version,
                            patch_version: { $gt: patch_version }
                        }).sort({
                            patch_version: -1
                        }).limit(1);

                    case 23:
                        patches = _context3.sent;
                        _context3.next = 29;
                        break;

                    case 26:
                        _context3.prev = 26;
                        _context3.t1 = _context3['catch'](20);

                        ctx.throw(500);

                    case 29:
                        if (!patches || patches.length == 0) {
                            ctx.status = 204;
                        }

                        response = patches[0].toJSON();

                        ctx.body = response;

                        if (!next) {
                            _context3.next = 34;
                            break;
                        }

                        return _context3.abrupt('return', next());

                    case 34:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[9, 15], [20, 26]]);
    }));

    return function check(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var list = exports.list = function () {
    var _ref4 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(ctx, next) {
        var project_id, project, user, patches, response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        debug(ctx.request.body);
                        project_id = ctx.params.project;

                        if (!project_id) {
                            ctx.throw(400, 'project can not be empty');
                        }

                        project = null;
                        _context4.prev = 4;
                        _context4.next = 7;
                        return _project2.default.findById(project_id);

                    case 7:
                        project = _context4.sent;
                        _context4.next = 13;
                        break;

                    case 10:
                        _context4.prev = 10;
                        _context4.t0 = _context4['catch'](4);

                        ctx.throw(500);

                    case 13:
                        if (!project) {
                            ctx.throw(422, 'project is not existed');
                        }

                        _context4.next = 16;
                        return auth.getUser(ctx);

                    case 16:
                        user = _context4.sent;

                        if (!user) {
                            ctx.throw(401);
                        }
                        if (user.role != 1) {
                            if (!project.isMember(user.id)) {
                                ctx.throw(403, 'no permission');
                            }
                        }

                        _context4.next = 21;
                        return _patch2.default.find({
                            project_id: project_id
                        });

                    case 21:
                        patches = _context4.sent;
                        response = patches.toJSON();

                        ctx.body = {
                            patches: response
                        };

                        if (!next) {
                            _context4.next = 26;
                            break;
                        }

                        return _context4.abrupt('return', next());

                    case 26:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[4, 10]]);
    }));

    return function list(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

var add = exports.add = function () {
    var _ref5 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(ctx, next) {
        var project_id, project, user, patch, response;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        debug(ctx.request.body);
                        project_id = ctx.params.project;

                        if (!project_id) {
                            ctx.throw(400, 'project can not be empty');
                        }

                        project = null;
                        _context5.prev = 4;
                        _context5.next = 7;
                        return _project2.default.findById(project_id);

                    case 7:
                        project = _context5.sent;
                        _context5.next = 13;
                        break;

                    case 10:
                        _context5.prev = 10;
                        _context5.t0 = _context5['catch'](4);

                        ctx.throw(500);

                    case 13:
                        if (!project) {
                            ctx.throw(422, 'project is not existed');
                        }

                        _context5.next = 16;
                        return auth.getUser(ctx);

                    case 16:
                        user = _context5.sent;

                        if (!user) {
                            ctx.throw(401);
                        }
                        if (user.role != 1) {
                            if (!project.isMember(user.id)) {
                                ctx.throw(403, 'no permission');
                            }
                        }

                        patch = new _patch2.default(ctx.request.body);
                        _context5.prev = 20;
                        _context5.next = 23;
                        return patch.save();

                    case 23:
                        _context5.next = 28;
                        break;

                    case 25:
                        _context5.prev = 25;
                        _context5.t1 = _context5['catch'](20);

                        ctx.throw(500);

                    case 28:
                        response = patch.toJSON();

                        ctx.status = 201;
                        ctx.body = response;

                        if (!next) {
                            _context5.next = 33;
                            break;
                        }

                        return _context5.abrupt('return', next());

                    case 33:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this, [[4, 10], [20, 25]]);
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
