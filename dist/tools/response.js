'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.authenticationFailed = authenticationFailed;
exports.emailIsNotExisted = emailIsNotExisted;
/**
 * Created by Bell on 16/8/31.
 */

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
//# sourceMappingURL=response.js.map
