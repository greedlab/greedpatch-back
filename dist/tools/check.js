'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkProjectEmpty = checkProjectEmpty;
exports.checkPatchEmpty = checkPatchEmpty;
exports.checkSetPwdTokenEmpty = checkSetPwdTokenEmpty;
exports.checkUserEmpty = checkUserEmpty;
exports.checkEmpty = checkEmpty;
exports.checkUserResourceEmpty = checkUserResourceEmpty;
exports.checkProjectResourceEmpty = checkProjectResourceEmpty;
exports.checkPatchResourceEmpty = checkPatchResourceEmpty;
exports.checkResourceEmpty = checkResourceEmpty;
exports.checkValidEmail = checkValidEmail;
exports.checkValidPassword = checkValidPassword;

var _regex = require('../utils/regex');

var regex = _interopRequireWildcard(_regex);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// check field

function checkProjectEmpty(ctx, field, value) {
    return checkEmpty(ctx, 'Project', field, value);
} /**
   * Created by Bell on 16/8/30.
   */

function checkPatchEmpty(ctx, field, value) {
    return checkEmpty(ctx, 'Patch', field, value);
}

function checkSetPwdTokenEmpty(ctx, field, value) {
    return checkEmpty(ctx, 'SetPwdToken', field, value);
}

function checkUserEmpty(ctx, field, value) {
    return checkEmpty(ctx, 'User', field, value);
}

function checkEmpty(ctx, resource, field, value) {
    if (!value) {
        ctx.status = 422;
        ctx.body = {
            message: field + ' is empty',
            errors: [{
                'resource': resource,
                'field': field,
                'code': 'missing_field'
            }]
        };
        return false;
    }
    return true;
}

// check resource

function checkUserResourceEmpty(ctx, value) {
    return checkResourceEmpty(ctx, 'User', value);
}

function checkProjectResourceEmpty(ctx, value) {
    return checkResourceEmpty(ctx, 'Project', value);
}

function checkPatchResourceEmpty(ctx, value) {
    return checkResourceEmpty(ctx, 'kPatch', value);
}

function checkResourceEmpty(ctx, resource, value) {
    if (!value) {
        ctx.status = 422;
        ctx.body = {
            message: resource + ' is not existed',
            errors: [{
                'resource': resource,
                'code': 'missing'
            }]
        };
        return false;
    }
    return true;
}

// check valid

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
//# sourceMappingURL=check.js.map
