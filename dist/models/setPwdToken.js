'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bluebird = require('bluebird');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise; /**
                                              * Created by Bell on 16/8/27.
                                              */

var SetPwdToken = new _mongoose2.default.Schema({
    userid: { type: String, require: true },
    iat: { type: Number, default: 0 },
    exp: { type: Number, default: 0 },
    status: { type: Number, default: 0 }
});

SetPwdToken.pre('save', function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(next) {
        var user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        user = this;

                        if (user.iat <= 0) {
                            user.iat = Date.now();
                        }
                        if (user.exp <= user.iat) {
                            user.exp = user.iat + 24 * 60 * 60 * 1000;
                        }
                        return _context.abrupt('return', next());

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    function preSave(_x) {
        return _ref.apply(this, arguments);
    }

    return preSave;
}());

exports.default = _mongoose2.default.model('setPwdToken', SetPwdToken);
//# sourceMappingURL=setPwdToken.js.map
