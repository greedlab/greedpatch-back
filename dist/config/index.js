'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = require('./env/common');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = process.env.NODE_ENV || 'development'; /**
                                                  * Created by Bell on 16/6/16.
                                                  */

var config = require('./env/' + env).default;

exports.default = Object.assign({}, _common2.default, config);
//# sourceMappingURL=index.js.map
