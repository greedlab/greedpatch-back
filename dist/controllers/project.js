'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.delMember = exports.listMembers = exports.addMember = exports.listMy = exports.listAll = exports.update = exports.del = exports.detail = exports.add = undefined;

var _bluebird = require('bluebird');

/**
 * add project
 *
 * @param ctx
 * @param next
 * @returns {*}
 */
var add = exports.add = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx, next) {
        var name, user, project_object, project, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        name = ctx.request.body.name;

                        if (check.checkEmptyProjectName(ctx, name)) {
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

    return function add(_x, _x2) {
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

                        if (!id) {
                            ctx.throw(400, 'id can not be empty');
                        }

                        project = null;
                        _context3.prev = 3;
                        _context3.next = 6;
                        return _project2.default.findById(id);

                    case 6:
                        project = _context3.sent;
                        _context3.next = 12;
                        break;

                    case 9:
                        _context3.prev = 9;
                        _context3.t0 = _context3['catch'](3);

                        ctx.throw(500, _context3.t0.message);

                    case 12:
                        if (!project) {
                            ctx.throw(422, 'unvalid id');
                        }

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
        }, _callee3, this, [[3, 9], [18, 23]]);
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
        var id, project, user, object, name, introduction;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        id = ctx.params.id;

                        if (!id) {
                            ctx.throw(400, 'id can not be empty');
                        }

                        project = null;
                        _context4.prev = 3;
                        _context4.next = 6;
                        return _project2.default.findById(id);

                    case 6:
                        project = _context4.sent;
                        _context4.next = 12;
                        break;

                    case 9:
                        _context4.prev = 9;
                        _context4.t0 = _context4['catch'](3);

                        ctx.throw(500, _context4.t0.message);

                    case 12:
                        if (!project) {
                            ctx.throw(422, 'unvalid id');
                        }

                        _context4.next = 15;
                        return auth.getUser(ctx);

                    case 15:
                        user = _context4.sent;

                        if (!user) {
                            ctx.throw(401);
                        }

                        if (user.role != 1) {
                            if (!project.isManager(user.id)) {
                                ctx.throw(403, 'no permission');
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
                        _context4.prev = 23;
                        _context4.next = 26;
                        return project.update(object);

                    case 26:
                        _context4.next = 31;
                        break;

                    case 28:
                        _context4.prev = 28;
                        _context4.t1 = _context4['catch'](23);

                        ctx.throw(500, _context4.t1.message);

                    case 31:

                        // response
                        ctx.status = 204;

                    case 32:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[3, 9], [23, 28]]);
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
                            ctx.throw(403, 'no permission');
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

                        ctx.throw(500, _context5.t0.message);

                    case 15:
                        projects = projects || [];

                        // response
                        ctx.body = projects;

                    case 17:
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

                        ctx.throw(500, _context6.t0.message);

                    case 12:
                        projects = projects || [];

                        // response
                        ctx.body = { projects: projects };

                    case 14:
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
        var project_id, email, project, user, add_user, members;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        debug(ctx.request.body);
                        project_id = ctx.params.project;

                        if (!project_id) {
                            ctx.throw(400, 'project can not be empty');
                        }

                        email = ctx.request.body.email;

                        if (!email) {
                            ctx.throw(400, 'email can not be empty');
                        }

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
                        if (!project) {
                            ctx.throw(422, 'project is not existed');
                        }

                        _context7.next = 18;
                        return auth.getUser(ctx);

                    case 18:
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
                        _context7.prev = 22;
                        _context7.next = 25;
                        return _user2.default.findOne({ email: email });

                    case 25:
                        add_user = _context7.sent;
                        _context7.next = 31;
                        break;

                    case 28:
                        _context7.prev = 28;
                        _context7.t1 = _context7['catch'](22);

                        ctx.throw(500, _context7.t1.message);

                    case 31:
                        if (!add_user) {
                            ctx.throw(422, 'user is not existed');
                        }

                        if (project.isMember(add_user.id)) {
                            ctx.throw(422, 'user is in the project');
                        }

                        members = project.members || [];

                        members.push({
                            id: add_user.id,
                            email: add_user.email,
                            role: 0
                        });
                        _context7.prev = 35;
                        _context7.next = 38;
                        return project.update({ $set: { members: members } });

                    case 38:
                        _context7.next = 43;
                        break;

                    case 40:
                        _context7.prev = 40;
                        _context7.t2 = _context7['catch'](35);

                        ctx.throw(500, _context7.t2.message);

                    case 43:
                        // response
                        ctx.status = 204;

                    case 44:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, this, [[6, 12], [22, 28], [35, 40]]);
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

                        if (!project_id) {
                            ctx.throw(400, 'project can not be empty');
                        }

                        project = null;
                        _context8.prev = 3;
                        _context8.next = 6;
                        return _project2.default.findById(project_id);

                    case 6:
                        project = _context8.sent;
                        _context8.next = 12;
                        break;

                    case 9:
                        _context8.prev = 9;
                        _context8.t0 = _context8['catch'](3);

                        ctx.throw(500, _context8.t0.message);

                    case 12:
                        if (!project) {
                            ctx.throw(422, 'project is not existed');
                        }

                        _context8.next = 15;
                        return auth.getUser(ctx);

                    case 15:
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

                    case 20:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, this, [[3, 9]]);
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
        var project_id, member_id, project, user, index, members;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        debug(ctx.request.body);
                        project_id = ctx.params.project;

                        if (!project_id) {
                            ctx.throw(400, 'project can not be empty');
                        }

                        member_id = ctx.params.member;

                        if (!project_id) {
                            ctx.throw(400, 'member can not be empty');
                        }

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
                        if (!project) {
                            ctx.throw(422, 'project is not existed');
                        }

                        _context9.next = 18;
                        return auth.getUser(ctx);

                    case 18:
                        user = _context9.sent;

                        if (!user) {
                            ctx.throw(401);
                        }
                        if (user.role != 1) {
                            if (!project.isManager(user.id)) {
                                ctx.throw(403, 'no permission');
                            }
                        }

                        if (project.isManager(member_id)) {
                            ctx.throw(403, 'can not delete manager');
                        }

                        index = project.indexOf(member_id);

                        if (index == -1) {
                            ctx.throw(422, 'member is not in the project');
                        }

                        members = project.members;

                        members.splice(index, 1);

                        _context9.prev = 26;
                        _context9.next = 29;
                        return project.update({ $set: { members: members } });

                    case 29:
                        _context9.next = 34;
                        break;

                    case 31:
                        _context9.prev = 31;
                        _context9.t1 = _context9['catch'](26);

                        ctx.throw(500, _context9.t1.message);

                    case 34:

                        ctx.status = 204;

                    case 35:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, this, [[6, 12], [26, 31]]);
    }));

    return function delMember(_x17, _x18) {
        return _ref9.apply(this, arguments);
    };
}();

var _project = require('../models/project');

var _project2 = _interopRequireDefault(_project);

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

var debug = new _debug2.default(_package2.default.name); /**
                                                          * Created by Bell on 16/8/25.
                                                          */
//# sourceMappingURL=project.js.map
