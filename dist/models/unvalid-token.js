'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise; /**
                                              * Created by Bell on 16/8/15.
                                              */

var Book = new _mongoose2.default.Schema({
    token: {
        type: String,
        index: true,
        unique: true
    }
});

exports.default = _mongoose2.default.model('unvalid-token', Book);
//# sourceMappingURL=unvalid-token.js.map
