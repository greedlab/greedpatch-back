'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.delMember = exports.listMembers = exports.addMember = exports.listMy = exports.listAll = exports.update = exports.del = exports.detail = exports.create = undefined;

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
                        if (project) {
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
 * list all projects
 *
 * @param ctx
 * @param next
 */


var listAll = exports.listAll = function () {
    var _ref5 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(ctx, next) {
        var user, projects;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return auth.getUser(ctx);

                    case 2:
                        user = _context5.sent;

                        if (!user) {
                            ctx.throw(401);
                        }

                        if (user.role != 1) {
                            ctx.throw(403);
                        }

                        projects = null;
                        _context5.prev = 6;
                        _context5.next = 9;
                        return _project2.default.find().lean();

                    case 9:
                        projects = _context5.sent;
                        _context5.next = 15;
                        break;

                    case 12:
                        _context5.prev = 12;
                        _context5.t0 = _context5['catch'](6);

                        ctx.throw(500);

                    case 15:

                        // response
                        ctx.body = projects || [];

                    case 16:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this, [[6, 12]]);
    }));

    return function listAll(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();

/**
 * list my projects
 *
 * @param ctx
 * @param next
 */


var listMy = exports.listMy = function () {
    var _ref6 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee6(ctx, next) {
        var userid, projects;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        userid = auth.getID(ctx);


                        if (!userid) {
                            ctx.throw(401);
                        }

                        projects = null;
                        _context6.prev = 3;
                        _context6.next = 6;
                        return _project2.default.find({ 'members.id': userid }).lean();

                    case 6:
                        projects = _context6.sent;
                        _context6.next = 12;
                        break;

                    case 9:
                        _context6.prev = 9;
                        _context6.t0 = _context6['catch'](3);

                        ctx.throw(500);

                    case 12:

                        // response
                        ctx.body = projects || [];

                    case 13:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this, [[3, 9]]);
    }));

    return function listMy(_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}();

/**
 * add member to project
 *
 * @param ctx
 * @param next
 */


var addMember = exports.addMember = function () {
    var _ref7 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee7(ctx, next) {
        var email, project_id, project, user, add_user, members;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        debug(ctx.request.body);

                        email = ctx.request.body.email;

                        if (check.checkProjectEmpty(ctx, 'email', email)) {
                            _context7.next = 4;
                            break;
                        }

                        return _context7.abrupt('return');

                    case 4:
                        project_id = ctx.params.project;
                        project = null;
                        _context7.prev = 6;
                        _context7.next = 9;
                        return _project2.default.findById(project_id);

                    case 9:
                        project = _context7.sent;
                        _context7.next = 15;
                        break;

                    case 12:
                        _context7.prev = 12;
                        _context7.t0 = _context7['catch'](6);

                        ctx.throw(500, _context7.t0.message);

                    case 15:
                        if (check.checkProjectResourceEmpty(ctx, project)) {
                            _context7.next = 17;
                            break;
                        }

                        return _context7.abrupt('return');

                    case 17:
                        _context7.next = 19;
                        return auth.getUser(ctx);

                    case 19:
                        user = _context7.sent;

                        if (!user) {
                            ctx.throw(401);
                        }
                        if (user.role != 1) {
                            if (!project.isManager(user.id)) {
                                ctx.throw(403, 'no permission');
                            }
                        }

                        add_user = null;
                        _context7.prev = 23;
                        _context7.next = 26;
                        return _user2.default.findOne({ email: email });

                    case 26:
                        add_user = _context7.sent;
                        _context7.next = 32;
                        break;

                    case 29:
                        _context7.prev = 29;
                        _context7.t1 = _context7['catch'](23);

                        ctx.throw(500, _context7.t1.message);

                    case 32:
                        if (add_user) {
                            _context7.next = 35;
                            break;
                        }

                        response_util.resourceNotExist(ctx, 'User', 'email');
                        return _context7.abrupt('return');

                    case 35:
                        if (!project.isMember(add_user.id)) {
                            _context7.next = 38;
                            break;
                        }

                        response_util.resourceAlreadyExists(ctx, 'User', 'email');
                        return _context7.abrupt('return');

                    case 38:
                        members = project.members || [];

                        members.push({
                            id: add_user.id,
                            email: add_user.email,
                            role: 0
                        });
                        _context7.prev = 40;
                        _context7.next = 43;
                        return project.update({ $set: { members: members } });

                    case 43:
                        _context7.next = 48;
                        break;

                    case 45:
                        _context7.prev = 45;
                        _context7.t2 = _context7['catch'](40);

                        ctx.throw(500, _context7.t2.message);

                    case 48:
                        // response
                        ctx.status = 204;

                    case 49:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, this, [[6, 12], [23, 29], [40, 45]]);
    }));

    return function addMember(_x13, _x14) {
        return _ref7.apply(this, arguments);
    };
}();

/**
 * list all members in project
 *
 * @param ctx
 * @param next
 */


var listMembers = exports.listMembers = function () {
    var _ref8 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee8(ctx, next) {
        var project_id, project, user, response;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        project_id = ctx.params.project;

                        if (!check.checkProjectEmpty(ctx, 'project_id', project_id)) {
                            _context8.next = 3;
                            break;
                        }

                        return _context8.abrupt('return');

                    case 3:
                        project = null;
                        _context8.prev = 4;
                        _context8.next = 7;
                        return _project2.default.findById(project_id);

                    case 7:
                        project = _context8.sent;
                        _context8.next = 13;
                        break;

                    case 10:
                        _context8.prev = 10;
                        _context8.t0 = _context8['catch'](4);

                        ctx.throw(500, _context8.t0.message);

                    case 13:
                        if (!check.checkProjectResourceEmpty(ctx, project)) {
                            _context8.next = 15;
                            break;
                        }

                        return _context8.abrupt('return');

                    case 15:
                        _context8.next = 17;
                        return auth.getUser(ctx);

                    case 17:
                        user = _context8.sent;

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
                        return _context8.stop();
                }
            }
        }, _callee8, this, [[4, 10]]);
    }));

    return function listMembers(_x15, _x16) {
        return _ref8.apply(this, arguments);
    };
}();

/**
 * delete member in project
 *
 * @param ctx
 * @param next
 */


var delMember = exports.delMember = function () {
    var _ref9 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee9(ctx, next) {
        var member_id, project_id, project, user, index, members;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        debug(ctx.request.body);
                        member_id = ctx.params.member;
                        project_id = ctx.params.project;

                        if (check.checkProjectEmpty(ctx, 'project_id', project_id)) {
                            _context9.next = 5;
                            break;
                        }

                        return _context9.abrupt('return');

                    case 5:
                        project = null;
                        _context9.prev = 6;
                        _context9.next = 9;
                        return _project2.default.findById(project_id);

                    case 9:
                        project = _context9.sent;
                        _context9.next = 15;
                        break;

                    case 12:
                        _context9.prev = 12;
                        _context9.t0 = _context9['catch'](6);

                        ctx.throw(500, _context9.t0.message);

                    case 15:
                        if (check.checkProjectResourceEmpty(ctx, project)) {
                            _context9.next = 17;
                            break;
                        }

                        return _context9.abrupt('return');

                    case 17:
                        _context9.next = 19;
                        return auth.getUser(ctx);

                    case 19:
                        user = _context9.sent;

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
                            _context9.next = 27;
                            break;
                        }

                        response_util.fieldInvalid(ctx, 'Project', 'member', 'member is not in the project');
                        return _context9.abrupt('return');

                    case 27:
                        members = project.members;

                        members.splice(index, 1);

                        _context9.prev = 29;
                        _context9.next = 32;
                        return project.update({ $set: { members: members } });

                    case 32:
                        _context9.next = 37;
                        break;

                    case 34:
                        _context9.prev = 34;
                        _context9.t1 = _context9['catch'](29);

                        ctx.throw(500);

                    case 37:

                        ctx.status = 204;

                    case 38:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, this, [[6, 12], [29, 34]]);
    }));

    return function delMember(_x17, _x18) {
        return _ref9.apply(this, arguments);
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
