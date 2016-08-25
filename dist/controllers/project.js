'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.delMember = exports.listMembers = exports.addMember = exports.listMy = exports.listAll = exports.update = exports.del = exports.detail = exports.add = undefined;

var _bluebird = require('bluebird');

var add = exports.add = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx, next) {
        var bundle_id, name, user, project, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        debug(ctx.request.body);
                        bundle_id = ctx.request.body.bundle_id;

                        if (!bundle_id) {
                            ctx.throw(400, 'bundle_id can not be empty');
                        }

                        name = ctx.request.body.name;

                        if (!name) {
                            ctx.throw(400, 'name can not be empty');
                        }

                        _context.next = 7;
                        return auth.getUser(ctx);

                    case 7:
                        user = _context.sent;

                        if (!user) {
                            ctx.throw(401);
                        }
                        project = new _project2.default(ctx.request.body);

                        project.members = [{
                            id: user.id,
                            email: user.email,
                            role: 0
                        }];
                        _context.next = 13;
                        return project.save();

                    case 13:

                        // response
                        response = project.toJSON();

                        ctx.status = 201;
                        ctx.body = response;

                        if (!next) {
                            _context.next = 18;
                            break;
                        }

                        return _context.abrupt('return', next());

                    case 18:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function add(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var detail = exports.detail = function () {
    var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(ctx, next) {
        var id, project, user, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        debug(ctx.request.body);
                        id = ctx.params.id;

                        if (!id) {
                            ctx.throw(400, 'id can not be empty');
                        }

                        project = null;
                        _context2.prev = 4;
                        _context2.next = 7;
                        return _project2.default.findById(id);

                    case 7:
                        project = _context2.sent;
                        _context2.next = 13;
                        break;

                    case 10:
                        _context2.prev = 10;
                        _context2.t0 = _context2['catch'](4);

                        ctx.throw(500);

                    case 13:
                        if (!project) {
                            ctx.throw(422, 'unvalid id');
                        }

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
                                ctx.throw(403, 'no permission');
                            }
                        }

                        // response
                        response = project.toJSON();

                        ctx.body = response;

                        if (!next) {
                            _context2.next = 23;
                            break;
                        }

                        return _context2.abrupt('return', next());

                    case 23:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[4, 10]]);
    }));

    return function detail(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var del = exports.del = function () {
    var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(ctx, next) {
        var id, project, user;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        debug(ctx.request.body);
                        id = ctx.params.id;

                        if (!id) {
                            ctx.throw(400, 'id can not be empty');
                        }

                        project = null;
                        _context3.prev = 4;
                        _context3.next = 7;
                        return _project2.default.findById(id);

                    case 7:
                        project = _context3.sent;
                        _context3.next = 13;
                        break;

                    case 10:
                        _context3.prev = 10;
                        _context3.t0 = _context3['catch'](4);

                        ctx.throw(500);

                    case 13:
                        if (!project) {
                            ctx.throw(422, 'unvalid id');
                        }

                        _context3.next = 16;
                        return auth.getUser(ctx);

                    case 16:
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

                        _context3.prev = 19;
                        _context3.next = 22;
                        return project.remove();

                    case 22:
                        _context3.next = 27;
                        break;

                    case 24:
                        _context3.prev = 24;
                        _context3.t1 = _context3['catch'](19);

                        ctx.throw(500);

                    case 27:

                        // response
                        ctx.status = 204;

                        if (!next) {
                            _context3.next = 30;
                            break;
                        }

                        return _context3.abrupt('return', next());

                    case 30:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[4, 10], [19, 24]]);
    }));

    return function del(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var update = exports.update = function () {
    var _ref4 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(ctx, next) {
        var id, project, user, object, name, introduction;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        debug(ctx.request.body);
                        id = ctx.params.id;

                        if (!id) {
                            ctx.throw(400, 'id can not be empty');
                        }

                        project = null;
                        _context4.prev = 4;
                        _context4.next = 7;
                        return _project2.default.findById(id);

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
                            ctx.throw(422, 'unvalid id');
                        }

                        _context4.next = 16;
                        return auth.getUser(ctx);

                    case 16:
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
                        _context4.prev = 24;
                        _context4.next = 27;
                        return project.update(object);

                    case 27:
                        _context4.next = 32;
                        break;

                    case 29:
                        _context4.prev = 29;
                        _context4.t1 = _context4['catch'](24);

                        ctx.throw(500);

                    case 32:

                        // response
                        ctx.status = 204;

                        if (!next) {
                            _context4.next = 35;
                            break;
                        }

                        return _context4.abrupt('return', next());

                    case 35:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[4, 10], [24, 29]]);
    }));

    return function update(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

var listAll = exports.listAll = function () {
    var _ref5 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(ctx, next) {
        var user, projects, response;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        debug(ctx.request.body);

                        _context5.next = 3;
                        return auth.getUser(ctx);

                    case 3:
                        user = _context5.sent;

                        if (!user) {
                            ctx.throw(401);
                        }

                        if (user.role != 1) {
                            ctx.throw(403, 'no permission');
                        }

                        projects = null;
                        _context5.prev = 7;
                        _context5.next = 10;
                        return _project2.default.find();

                    case 10:
                        projects = _context5.sent;
                        _context5.next = 16;
                        break;

                    case 13:
                        _context5.prev = 13;
                        _context5.t0 = _context5['catch'](7);

                        ctx.throw(500);

                    case 16:
                        projects = projects | [];

                        // response
                        response = projects.toJSON();

                        ctx.body = response;

                        if (!next) {
                            _context5.next = 21;
                            break;
                        }

                        return _context5.abrupt('return', next());

                    case 21:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this, [[7, 13]]);
    }));

    return function listAll(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();

var listMy = exports.listMy = function () {
    var _ref6 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee6(ctx, next) {
        var userid, projects, response;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        debug(ctx.request.body);

                        userid = auth.getID();


                        if (!userid) {
                            ctx.throw(401);
                        }

                        projects = null;
                        _context6.prev = 4;
                        _context6.next = 7;
                        return _project2.default.find({ 'members.id': userid });

                    case 7:
                        projects = _context6.sent;
                        _context6.next = 13;
                        break;

                    case 10:
                        _context6.prev = 10;
                        _context6.t0 = _context6['catch'](4);

                        ctx.throw(500);

                    case 13:
                        projects = projects | [];

                        // response
                        response = projects.toJSON();

                        ctx.body = response;

                        if (!next) {
                            _context6.next = 18;
                            break;
                        }

                        return _context6.abrupt('return', next());

                    case 18:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this, [[4, 10]]);
    }));

    return function listMy(_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}();

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

                        ctx.throw(500);

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
                        return _user2.default.find({ email: email });

                    case 25:
                        add_user = _context7.sent;
                        _context7.next = 31;
                        break;

                    case 28:
                        _context7.prev = 28;
                        _context7.t1 = _context7['catch'](22);

                        ctx.throw(500);

                    case 31:
                        if (!add_user) {
                            ctx.throw(422, 'user is not existed');
                        }

                        if (project.isMember(add_user.id)) {
                            ctx.throw(422, 'user is in the project');
                        }

                        members = project.members | [];

                        members.push({
                            id: add_user.id,
                            email: add_user.email,
                            role: 0
                        });
                        _context7.prev = 35;
                        _context7.next = 38;
                        return project.update(members);

                    case 38:
                        _context7.next = 43;
                        break;

                    case 40:
                        _context7.prev = 40;
                        _context7.t2 = _context7['catch'](35);

                        ctx.throw(500);

                    case 43:
                        // response
                        ctx.status = 204;

                        if (!next) {
                            _context7.next = 46;
                            break;
                        }

                        return _context7.abrupt('return', next());

                    case 46:
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

var listMembers = exports.listMembers = function () {
    var _ref8 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee8(ctx, next) {
        var project_id, project, user, members, response;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        debug(ctx.request.body);
                        project_id = ctx.params.project;

                        if (!project_id) {
                            ctx.throw(400, 'project can not be empty');
                        }

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

                        ctx.throw(500);

                    case 13:
                        if (!project) {
                            ctx.throw(422, 'project is not existed');
                        }

                        _context8.next = 16;
                        return auth.getUser(ctx);

                    case 16:
                        user = _context8.sent;

                        if (!user) {
                            ctx.throw(401);
                        }
                        if (user.role != 1) {
                            if (!project.isMember(user.id)) {
                                ctx.throw(403, 'no permission');
                            }
                        }

                        members = project.members | [];
                        _context8.prev = 20;
                        _context8.next = 23;
                        return project.update(members);

                    case 23:
                        _context8.next = 28;
                        break;

                    case 25:
                        _context8.prev = 25;
                        _context8.t1 = _context8['catch'](20);

                        ctx.throw(500);

                    case 28:
                        // response
                        response = project.members.toJSON();

                        ctx.body = {
                            members: response
                        };

                        if (!next) {
                            _context8.next = 32;
                            break;
                        }

                        return _context8.abrupt('return', next());

                    case 32:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, this, [[4, 10], [20, 25]]);
    }));

    return function listMembers(_x15, _x16) {
        return _ref8.apply(this, arguments);
    };
}();

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

                        ctx.throw(500);

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

                        index = project.indexOf(member_id);

                        if (index == -1) {
                            ctx.throw(422, 'member is not in the project');
                        }

                        members = project.members.splice(index, 1);
                        _context9.prev = 24;
                        _context9.next = 27;
                        return project.update(members);

                    case 27:
                        _context9.next = 32;
                        break;

                    case 29:
                        _context9.prev = 29;
                        _context9.t1 = _context9['catch'](24);

                        ctx.throw(500);

                    case 32:

                        ctx.status = 204;

                        if (!next) {
                            _context9.next = 35;
                            break;
                        }

                        return _context9.abrupt('return', next());

                    case 35:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, this, [[6, 12], [24, 29]]);
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

var _encrypt = require('../utils/encrypt');

var encrypt = _interopRequireWildcard(_encrypt);

var _array = require('../utils/array');

var array_util = _interopRequireWildcard(_array);

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
