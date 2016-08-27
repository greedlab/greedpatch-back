'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateTokenFromPayload = generateTokenFromPayload;
exports.generatePayload = generatePayload;
exports.generateToken = generateToken;
exports.generateCheckPatchPayload = generateCheckPatchPayload;
exports.generateCheckPatchToken = generateCheckPatchToken;
exports.generateSetPasswordPayload = generateSetPasswordPayload;
exports.generateSetPasswordToken = generateSetPasswordToken;
exports.getPayload = getPayload;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateTokenFromPayload(payload) {
    return _jsonwebtoken2.default.sign(payload, _config2.default.token);
} /**
   * Created by Bell on 16/8/26.
   */

;

function generatePayload(id) {
    var iat = Date.now();
    var exp = iat + 30 * 24 * 60 * 60 * 1000;
    var scope = 'default';
    return { iat: iat, exp: exp, id: id, scope: scope };
};

function generateToken(id) {
    return generateTokenFromPayload(generatePayload(id));
};

function generateCheckPatchPayload(id) {
    var iat = Date.now();
    var scope = 'patch:check';
    return { iat: iat, id: id, scope: scope };
};

function generateCheckPatchToken(id) {
    return generateTokenFromPayload(generateCheckPatchPayload(id));
};

function generateSetPasswordPayload(id) {
    var iat = Date.now();
    var exp = iat + 24 * 60 * 60 * 1000;
    var scope = 'all';
    return { iat: iat, exp: exp, id: id, scope: scope };
};

function generateSetPasswordToken(id) {
    return generateTokenFromPayload(generateSetPasswordPayload(id));
};

/**
 * get payload from token
 * @param token
 * @returns {*}
 */
function getPayload(token) {
    if (token) {
        return (0, _jsonwebtoken.verify)(token, _config2.default.token);
    }
    return null;
}
//# sourceMappingURL=token.js.map
