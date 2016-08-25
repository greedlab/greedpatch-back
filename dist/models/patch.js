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

var Patch = new _mongoose2.default.Schema({
    patch_version: { type: String, required: true },
    project_id: { type: String, required: true },
    project_version: { type: String, required: true },
    patch_url: { type: String, required: true },
    hash: { type: String }
});

exports.default = _mongoose2.default.model('patch', Patch);
//# sourceMappingURL=patch.js.map
