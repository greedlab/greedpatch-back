'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateToken = generateToken;
exports.generateCheckPatchToken = generateCheckPatchToken;
exports.generateSetPasswordToken = generateSetPasswordToken;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Bell on 16/8/26.
 */

function generateToken(id) {
    var user = this;
    var iat = Date.now();
    var exp = iat + 30 * 24 * 60 * 60 * 1000;
    var scope = 'default';
    return _jsonwebtoken2.default.sign({ iat: iat, exp: exp, id: id, scope: scope }, _config2.default.token);
};

function generateCheckPatchToken(id) {
    var user = this;
    var iat = Date.now();
    var scope = 'patch:check';
    return _jsonwebtoken2.default.sign({ iat: iat, id: id, scope: scope }, _config2.default.token);
};

function generateSetPasswordToken(id) {
    var user = this;
    var iat = Date.now();
    var exp = iat + 24 * 60 * 60 * 1000;
    var scope = 'all';
    return _jsonwebtoken2.default.sign({ iat: iat, exp: exp, id: id, scope: scope }, _config2.default.token);
};
//# sourceMappingURL=token.js.map
