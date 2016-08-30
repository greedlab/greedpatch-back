'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkEmptyEmail = checkEmptyEmail;
exports.checkValidEmail = checkValidEmail;
exports.checkEmptyPassword = checkEmptyPassword;
exports.checkValidPassword = checkValidPassword;
exports.authenticationFailed = authenticationFailed;
exports.emailIsNotExisted = emailIsNotExisted;

var _regex = require('../utils/regex');

var regex = _interopRequireWildcard(_regex);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function checkEmptyEmail(ctx, email) {
    if (!email) {
        ctx.status = 422;
        ctx.body = {
            message: 'Email not found',
            errors: [{
                'resource': 'User',
                'field': 'email',
                'code': 'missing_field'
            }]
        };
        return false;
    }
    return true;
} /**
   * Created by Bell on 16/8/30.
   */

function checkValidEmail(ctx, email) {
    if (!regex.validEmail(email)) {
        ctx.status = 422;
        ctx.body = {
            message: 'Invalid email',
            errors: [{
                resource: 'User',
                field: 'email',
                code: 'invalid'
            }]
        };
        return false;
    }
    return true;
}

function checkEmptyPassword(ctx, password) {
    if (!password) {
        ctx.status = 422;
        ctx.body = {
            message: 'Password not found',
            errors: [{
                'resource': 'User',
                'field': 'password',
                'code': 'missing_field'
            }]
        };
        return false;
    }
    return true;
}

function checkValidPassword(ctx, password) {
    if (!regex.validPassword(password)) {
        ctx.status = 422;
        ctx.body = {
            message: 'Invalid password',
            errors: [{
                resource: 'User',
                field: 'password',
                code: 'invalid'
            }]
        };
        return false;
    }
    return true;
}

function authenticationFailed(ctx) {
    ctx.status = 401;
    ctx.body = {
        message: 'Email or password error'
    };
}

function emailIsNotExisted(ctx) {
    ctx.status = 422;
    ctx.body = {
        message: 'User is not existed',
        errors: [{
            'resource': 'User',
            'field': 'email',
            'code': 'missing_field'
        }]
    };
}
//# sourceMappingURL=check.js.map
