/**
 * Created by Bell on 16/8/31.
 */

export function authenticationFailed(ctx) {
    ctx.status = 401;
    ctx.body = {
        message: 'Email or password error'
    };
}

export function emailNotExist(ctx) {
    ctx.status = 422;
    ctx.body = {
        message: 'User is not existed',
        errors: [
            {
                'resource': 'User',
                'field': 'email',
                'code': 'missing_field'
            }
        ]
    };
}

export function userNotExist(ctx) {
    ctx.status = 422;
    ctx.body = {
        message: 'User is not existed',
        errors: [
            {
                'resource': 'User',
                'code': 'missing'
            }
        ]
    };
}

export function setPwdTokenNotExist(ctx) {
    ctx.status = 422;
    ctx.body = {
        message: 'Token is not existed',
        errors: [
            {
                'resource': 'SetPwdToken',
                'code': 'missing'
            }
        ]
    };
}

export function projectNotExist(ctx) {
    ctx.status = 422;
    ctx.body = {
        message: 'Project is not existed',
        errors: [
            {
                'resource': 'Project',
                'code': 'missing'
            }
        ]
    };
}

export function patchExisted(ctx) {
    ctx.status = 422;
    ctx.body = {
        message: 'Patch is existed',
        errors: [
            {
                'resource': 'Patch',
                'code': 'already_exists'
            }
        ]
    };
}

