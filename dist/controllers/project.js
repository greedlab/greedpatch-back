'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.delMember = exports.listMembers = exports.addMember = exports.listMy = exports.listAll = exports.updateStatus = exports.update = exports.del = exports.detail = exports.create = undefined;

var _bluebird = require('bluebird');

/**
 * add project
 *
 * @param ctx
 * @param next
 * @returns {*}
 */
var create = exports.create = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx, next) {
        var name, user, project_object, project, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        name = ctx.request.body.name;

                        if (check.checkProjectEmpty(ctx, 'name', name)) {
                            _context.next = 3;
                            break;
                        }

                        return _context.abrupt('return');

                    case 3:
                        user = null;
                        _context.prev = 4;
                        _context.next = 7;
                        return auth.getUser(ctx);

                    case 7:
                        user = _context.sent;
                        _context.next = 13;
                        break;

                    case 10:
                        _context.prev = 10;
                        _context.t0 = _context['catch'](4);

                        ctx.throw(500);

                    case 13:
                        if (!user) {
                            ctx.throw(401);
                        }

                        project_object = ctx.request.body;

                        project_object.members = [{
                            id: user.id,
                            email: user.email,
                            role: 1
                        }];
                        project = new _project2.default(project_object);
                        _context.prev = 17;
                        _context.next = 20;
                        return project.save();

                    case 20:
                        _context.next = 25;
                        break;

                    case 22:
                        _context.prev = 22;
                        _context.t1 = _context['catch'](17);

                        ctx.throw(500);

                    case 25:

                        // response
                        response = project.toJSON();

                        ctx.status = 201;
                        ctx.body = response;

                    case 28:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[4, 10], [17, 22]]);
    }));

    return function create(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * get project detail
 *
 * @param ctx
 * @param next
 * @returns {*}
 */


var detail = exports.detail = function () {
    var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(ctx, next) {
        var id, project, user, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        id = ctx.params.id;
                        project = null;
                        _context2.prev = 2;
                        _context2.next = 5;
                        return _project2.default.findById(id);

                    case 5:
                        project = _context2.sent;
                        _context2.next = 11;
                        break;

                    case 8:
                        _context2.prev = 8;
                        _context2.t0 = _context2['catch'](2);

                        ctx.throw(500, _context2.t0.message);

                    case 11:
                        if (!(!project || project.status != 0)) {
                            _context2.next = 14;
                            break;
                        }

                        response_util.projectNotExist(ctx);
                        return _context2.abrupt('return');

                    case 14:
                        _context2.next = 16;
                        return auth.getUser(ctx);

                    case 16:
                        user = _context2.sent;

                        if (!user) {
                            ctx.throw(401);
                        }

                        if (user.role != 1) {
                            // not manager
                            if (!project.isMember(user.id)) {
                                ctx.throw(403);
                            }
                        }

                        // response
                        response = project.toJSON();

                        ctx.body = response;

                    case 21:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[2, 8]]);
    }));

    return function detail(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

/**
 * delete project
 *
 * @param ctx
 * @param next
 * @returns {*}
 */


var del = exports.del = function () {
    var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(ctx, next) {
        var id, project, user;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        id = ctx.params.id;
                        project = null;
                        _context3.prev = 2;
                        _context3.next = 5;
                        return _project2.default.findById(id);

                    case 5:
                        project = _context3.sent;
                        _context3.next = 11;
                        break;

                    case 8:
                        _context3.prev = 8;
                        _context3.t0 = _context3['catch'](2);

                        ctx.throw(500, _context3.t0.message);

                    case 11:
                        if (check.checkProjectResourceEmpty(ctx, project)) {
                            _context3.next = 13;
                            break;
                        }

                        return _context3.abrupt('return');

                    case 13:
                        _context3.next = 15;
                        return auth.getUser(ctx);

                    case 15:
                        user = _context3.sent;

                        if (!user) {
                            ctx.throw(401);
                        }

                        if (user.role != 1) {
                            // not manager
                            if (!project.isManager(user.id)) {
                                ctx.throw(403, 'no permission');
                            }
                        }

                        _context3.prev = 18;
                        _context3.next = 21;
                        return project.remove();

                    case 21:
                        _context3.next = 26;
                        break;

                    case 23:
                        _context3.prev = 23;
                        _context3.t1 = _context3['catch'](18);

                        ctx.throw(500, _context3.t1.message);

                    case 26:

                        // response
                        ctx.status = 204;

                    case 27:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[2, 8], [18, 23]]);
    }));

    return function del(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

/**
 * update project
 *
 * @param ctx
 * @param next
 * @returns {*}
 */


var update = exports.update = function () {
    var _ref4 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(ctx, next) {
        var id, project, user, object, name, introduction, bundle_id;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        id = ctx.params.id;
                        project = null;
                        _context4.prev = 2;
                        _context4.next = 5;
                        return _project2.default.findById(id);

                    case 5:
                        project = _context4.sent;
                        _context4.next = 11;
                        break;

                    case 8:
                        _context4.prev = 8;
                        _context4.t0 = _context4['catch'](2);

                        ctx.throw(500, _context4.t0.message);

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
                            if (!project.isManager(user.id)) {
                                ctx.throw(403);
                            }
                        }

                        object = {};
                        name = ctx.request.body.name;

                        if (name) {
                            object.name = name;
                        }
                        introduction = ctx.request.body.introduction;

                        if (introduction) {
                            object.introduction = introduction;
                        }
                        bundle_id = ctx.request.body.bundle_id;

                        if (bundle_id) {
                            object.bundle_id = bundle_id;
                        }
                        _context4.prev = 25;
                        _context4.next = 28;
                        return project.update({ $set: object });

                    case 28:
                        _context4.next = 33;
                        break;

                    case 30:
                        _context4.prev = 30;
                        _context4.t1 = _context4['catch'](25);

                        ctx.throw(500);

                    case 33:

                        // response
                        ctx.status = 204;

                    case 34:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[2, 8], [25, 30]]);
    }));

    return function update(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

/**
 * update status
 *
 * @param ctx
 * @param next
 */


var updateStatus = exports.updateStatus = function () {
    var _ref5 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(ctx, next) {
        var id, status, project, user;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        id = ctx.params.id;
                        status = ctx.request.body.status;

                        if (!(status < 0 || status > 1)) {
                            _context5.next = 5;
                            break;
                        }

                        response_util.fieldInvalid(ctx, 'Project', 'status', 'Invalid status');
                        return _context5.abrupt('return');

                    case 5:
                        project = null;
                        _context5.prev = 6;
                        _context5.next = 9;
                        return _project2.default.findById(id);

                    case 9:
                        project = _context5.sent;
                        _context5.next = 15;
                        break;

                    case 12:
                        _context5.prev = 12;
                        _context5.t0 = _context5['catch'](6);

                        ctx.throw(500, _context5.t0.message);

                    case 15:
                        if (check.checkProjectResourceEmpty(ctx, project)) {
                            _context5.next = 17;
                            break;
                        }

                        return _context5.abrupt('return');

                    case 17:
                        _context5.next = 19;
                        return auth.getUser(ctx);

                    case 19:
                        user = _context5.sent;

                        if (!user) {
                            ctx.throw(401);
                        }

                        if (user.role != 1) {
                            // not manager
                            if (!project.isManager(user.id)) {
                                ctx.throw(403, 'no permission');
                            }
                        }

                        _context5.prev = 22;
                        _context5.next = 25;
                        return project.update({ $set: { status: status } });

                    case 25:
                        _context5.next = 30;
                        break;

                    case 27:
                        _context5.prev = 27;
                        _context5.t1 = _context5['catch'](22);

                        ctx.throw(500, _context5.t1.message);

                    case 30:

                        // response
                        ctx.status = 204;

                    case 31:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this, [[6, 12], [22, 27]]);
    }));

    return function updateStatus(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();

/**
 * list all projects
 *
 * @param ctx
 * @param next
 */


var listAll = exports.listAll = function () {
    var _ref6 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee6(ctx, next) {
        var user, projects;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.next = 2;
                        return auth.getUser(ctx);

                    case 2:
                        user = _context6.sent;

                        if (!user) {
                            ctx.throw(401);
                        }

                        if (user.role != 1) {
                            ctx.throw(403);
                        }

                        projects = null;
                        _context6.prev = 6;
                        _context6.next = 9;
                        return _project2.default.find().sort({ _id: -1 }).lean();

                    case 9:
                        projects = _context6.sent;
                        _context6.next = 15;
                        break;

                    case 12:
                        _context6.prev = 12;
                        _context6.t0 = _context6['catch'](6);

                        ctx.throw(500);

                    case 15:

                        // response
                        ctx.body = projects || [];

                    case 16:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this, [[6, 12]]);
    }));

    return function listAll(_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}();

/**
 * list my projects
 *
 * @param ctx
 * @param next
 */


var listMy = exports.listMy = function () {
    var _ref7 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee7(ctx, next) {
        var userid, projects;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        userid = auth.getID(ctx);


                        if (!userid) {
                            ctx.throw(401);
                        }

                        projects = null;
                        _context7.prev = 3;
                        _context7.next = 6;
                        return _project2.default.find({ 'members.id': userid, 'status': 0 }).sort({ _id: -1 }).lean();

                    case 6:
                        projects = _context7.sent;
                        _context7.next = 12;
                        break;

                    case 9:
                        _context7.prev = 9;
                        _context7.t0 = _context7['catch'](3);

                        ctx.throw(500);

                    case 12:

                        // response
                        ctx.body = projects || [];

                    case 13:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, this, [[3, 9]]);
    }));

    return function listMy(_x13, _x14) {
        return _ref7.apply(this, arguments);
    };
}();

/**
 * add member to project
 *
 * @param ctx
 * @param next
 */


var addMember = exports.addMember = function () {
    var _ref8 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee8(ctx, next) {
        var email, project_id, project, user, add_user, members;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        debug(ctx.request.body);

                        email = ctx.request.body.email;

                        if (check.checkProjectEmpty(ctx, 'email', email)) {
                            _context8.next = 4;
                            break;
                        }

                        return _context8.abrupt('return');

                    case 4:
                        project_id = ctx.params.project;
                        project = null;
                        _context8.prev = 6;
                        _context8.next = 9;
                        return _project2.default.findById(project_id);

                    case 9:
                        project = _context8.sent;
                        _context8.next = 15;
                        break;

                    case 12:
                        _context8.prev = 12;
                        _context8.t0 = _context8['catch'](6);

                        ctx.throw(500, _context8.t0.message);

                    case 15:
                        if (project.status != 0) {
                            project = null;
                        }

                        if (check.checkProjectResourceEmpty(ctx, project)) {
                            _context8.next = 18;
                            break;
                        }

                        return _context8.abrupt('return');

                    case 18:
                        _context8.next = 20;
                        return auth.getUser(ctx);

                    case 20:
                        user = _context8.sent;

                        if (!user) {
                            ctx.throw(401);
                        }
                        if (user.role != 1) {
                            if (!project.isManager(user.id)) {
                                ctx.throw(403, 'no permission');
                            }
                        }

                        add_user = null;
                        _context8.prev = 24;
                        _context8.next = 27;
                        return _user2.default.findOne({ email: email });

                    case 27:
                        add_user = _context8.sent;
                        _context8.next = 33;
                        break;

                    case 30:
                        _context8.prev = 30;
                        _context8.t1 = _context8['catch'](24);

                        ctx.throw(500, _context8.t1.message);

                    case 33:
                        if (add_user) {
                            _context8.next = 36;
                            break;
                        }

                        response_util.resourceNotExist(ctx, 'User', 'email');
                        return _context8.abrupt('return');

                    case 36:
                        if (!project.isMember(add_user.id)) {
                            _context8.next = 39;
                            break;
                        }

                        response_util.resourceAlreadyExists(ctx, 'User', 'email');
                        return _context8.abrupt('return');

                    case 39:
                        members = project.members || [];

                        members.push({
                            id: add_user.id,
                            email: add_user.email,
                            role: 0
                        });
                        _context8.prev = 41;
                        _context8.next = 44;
                        return project.update({ $set: { members: members } });

                    case 44:
                        _context8.next = 49;
                        break;

                    case 46:
                        _context8.prev = 46;
                        _context8.t2 = _context8['catch'](41);

                        ctx.throw(500, _context8.t2.message);

                    case 49:
                        // response
                        ctx.status = 204;

                    case 50:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, this, [[6, 12], [24, 30], [41, 46]]);
    }));

    return function addMember(_x15, _x16) {
        return _ref8.apply(this, arguments);
    };
}();

/**
 * list all members in project
 *
 * @param ctx
 * @param next
 */


var listMembers = exports.listMembers = function () {
    var _ref9 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee9(ctx, next) {
        var project_id, project, user, response;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        project_id = ctx.params.project;

                        if (!check.checkProjectEmpty(ctx, 'project_id', project_id)) {
                            _context9.next = 3;
                            break;
                        }

                        return _context9.abrupt('return');

                    case 3:
                        project = null;
                        _context9.prev = 4;
                        _context9.next = 7;
                        return _project2.default.findById(project_id);

                    case 7:
                        project = _context9.sent;
                        _context9.next = 13;
                        break;

                    case 10:
                        _context9.prev = 10;
                        _context9.t0 = _context9['catch'](4);

                        ctx.throw(500, _context9.t0.message);

                    case 13:
                        if (!check.checkProjectResourceEmpty(ctx, project)) {
                            _context9.next = 15;
                            break;
                        }

                        return _context9.abrupt('return');

                    case 15:
                        _context9.next = 17;
                        return auth.getUser(ctx);

                    case 17:
                        user = _context9.sent;

                        if (!user) {
                            ctx.throw(401);
                        }
                        if (user.role != 1) {
                            if (!project.isMember(user.id)) {
                                ctx.throw(403, 'no permission');
                            }
                        }

                        // response
                        response = project.members || [];

                        ctx.body = {
                            members: response
                        };

                    case 22:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, this, [[4, 10]]);
    }));

    return function listMembers(_x17, _x18) {
        return _ref9.apply(this, arguments);
    };
}();

/**
 * delete member in project
 *
 * @param ctx
 * @param next
 */


var delMember = exports.delMember = function () {
    var _ref10 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee10(ctx, next) {
        var member_id, project_id, project, user, index, members;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        debug(ctx.request.body);
                        member_id = ctx.params.member;
                        project_id = ctx.params.project;

                        if (check.checkProjectEmpty(ctx, 'project_id', project_id)) {
                            _context10.next = 5;
                            break;
                        }

                        return _context10.abrupt('return');

                    case 5:
                        project = null;
                        _context10.prev = 6;
                        _context10.next = 9;
                        return _project2.default.findById(project_id);

                    case 9:
                        project = _context10.sent;
                        _context10.next = 15;
                        break;

                    case 12:
                        _context10.prev = 12;
                        _context10.t0 = _context10['catch'](6);

                        ctx.throw(500, _context10.t0.message);

                    case 15:
                        if (project.status != 0) {
                            project = null;
                        }

                        if (check.checkProjectResourceEmpty(ctx, project)) {
                            _context10.next = 18;
                            break;
                        }

                        return _context10.abrupt('return');

                    case 18:
                        _context10.next = 20;
                        return auth.getUser(ctx);

                    case 20:
                        user = _context10.sent;

                        if (!user) {
                            ctx.throw(401);
                        }
                        if (user.role != 1) {
                            if (!project.isManager(user.id)) {
                                ctx.throw(403);
                            }
                        }

                        if (project.isManager(member_id)) {
                            ctx.throw(403);
                        }

                        index = project.indexOf(member_id);

                        if (!(index < 0)) {
                            _context10.next = 28;
                            break;
                        }

                        response_util.fieldInvalid(ctx, 'Project', 'member', 'member is not in the project');
                        return _context10.abrupt('return');

                    case 28:
                        members = project.members;

                        members.splice(index, 1);

                        _context10.prev = 30;
                        _context10.next = 33;
                        return project.update({ $set: { members: members } });

                    case 33:
                        _context10.next = 38;
                        break;

                    case 35:
                        _context10.prev = 35;
                        _context10.t1 = _context10['catch'](30);

                        ctx.throw(500);

                    case 38:

                        ctx.status = 204;

                    case 39:
                    case 'end':
                        return _context10.stop();
                }
            }
        }, _callee10, this, [[6, 12], [30, 35]]);
    }));

    return function delMember(_x19, _x20) {
        return _ref10.apply(this, arguments);
    };
}();

var _project = require('../models/project');

var _project2 = _interopRequireDefault(_project);

var _patch = require('../models/patch');

var _patch2 = _interopRequireDefault(_patch);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _auth = require('../tools/auth');

var auth = _interopRequireWildcard(_auth);

var _check = require('../tools/check');

var check = _interopRequireWildcard(_check);

var _response = require('../utils/response');

var response_util = _interopRequireWildcard(_response);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Bell on 16/8/25.
 */

var debug = new _debug2.default(_package2.default.name);
//# sourceMappingURL=project.js.map
