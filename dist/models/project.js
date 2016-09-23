'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise; /**
                                              * Created by Bell on 16/8/25.
                                              */

var Project = new _mongoose2.default.Schema({
    bundle_id: { type: String },
    name: { type: String, required: true },
    introduction: { type: String },
    status: { type: Number, default: 0 },
    members: { type: Array }
});

Project.methods.isManager = function isManager(userid) {
    var user = this;
    var members = user.members;
    var result = false;
    if (!members) {
        return result;
    }
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = members[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var member = _step.value;

            if (!result && member.id && member.id === userid && member.role == 1) {
                result = true;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return result;
};

Project.methods.isMember = function isMember(userid) {
    var user = this;
    var members = user.members;
    var result = false;
    if (!members) {
        return result;
    }
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = members[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var member = _step2.value;

            if (!result && member.id === userid) {
                result = true;
            }
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return result;
};

Project.methods.indexOf = function indexOf(userid) {
    var user = this;
    var members = user.members;
    var index = -1;
    if (!members) {
        return index;
    }
    for (var i = 0; i < members.length; i++) {
        if (index == -1 && members[i].id === userid) {
            index = i;
        }
    }
    return index;
};

exports.default = _mongoose2.default.model('project', Project);
//# sourceMappingURL=project.js.map
