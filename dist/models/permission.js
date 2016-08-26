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

var Permission = new _mongoose2.default.Schema({
    type: { type: Number, default: 0, unique: true },
    permission: { type: String, default: 0 },
    domains: { type: Array }
});

exports.default = _mongoose2.default.model('permission', Permission);
//# sourceMappingURL=permission.js.map
