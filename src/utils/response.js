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

// resource is not existed

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


// resource does not exist

export function resourceNotExist(ctx, resource, field) {
    ctx.status = 422;
    ctx.body = {
        message: resource + ' does not exist',
        errors: [
            {
                'resource': resource,
                'field': field,
                'code': 'already_exists'
            }
        ]
    };
}

// resource already exists

export function resourceAlreadyExists(ctx, resource, field) {
    ctx.status = 422;
    ctx.body = {
        message: resource + ' already exists',
        errors: [
            {
                'resource': resource,
                'field': field,
                'code': 'already_exists'
            }
        ]
    };
}

// field invalid

export function fieldInvalid(ctx, resource, field, message) {
    ctx.status = 422;
    if (field) {
        ctx.body = {
            message: message,
            errors: [
                {
                    'resource': resource,
                    'field': field,
                    'code': 'invalid'
                }
            ]
        };
    } else {
        ctx.body = {
            message: message,
            errors: [
                {
                    'resource': resource,
                    'code': 'invalid'
                }
            ]
        };
    }
}
