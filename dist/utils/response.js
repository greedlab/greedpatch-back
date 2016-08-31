'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.authenticationFailed = authenticationFailed;
exports.emailNotExist = emailNotExist;
exports.userNotExist = userNotExist;
exports.setPwdTokenNotExist = setPwdTokenNotExist;
exports.projectNotExist = projectNotExist;
/**
 * Created by Bell on 16/8/31.
 */

function authenticationFailed(ctx) {
    ctx.status = 401;
    ctx.body = {
        message: 'Email or password error'
    };
}

function emailNotExist(ctx) {
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

function userNotExist(ctx) {
    ctx.status = 422;
    ctx.body = {
        message: 'User is not existed',
        errors: [{
            'resource': 'User',
            'code': 'missing'
        }]
    };
}

function setPwdTokenNotExist(ctx) {
    ctx.status = 422;
    ctx.body = {
        message: 'Token is not existed',
        errors: [{
            'resource': 'SetPwdToken',
            'code': 'missing'
        }]
    };
}

function projectNotExist(ctx) {
    ctx.status = 422;
    ctx.body = {
        message: 'Project is not existed',
        errors: [{
            'resource': 'Project',
            'code': 'missing'
        }]
    };
}
//# sourceMappingURL=response.js.map
