'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise; /**
                                              * Created by Bell on 16/8/10.
                                              */

var Book = new _mongoose2.default.Schema({
  name: { type: String, default: 'Book' },
  price: { type: String }
});

exports.default = _mongoose2.default.model('book', Book);
//# sourceMappingURL=book.js.map
