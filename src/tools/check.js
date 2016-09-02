/**
 * Created by Bell on 16/8/30.
 */

import * as regex from '../utils/regex';

// check field

export function checkProjectEmpty(ctx, field, value) {
    return checkEmpty(ctx, 'Project', field, value);
}

export function checkPatchEmpty(ctx, field, value) {
    return checkEmpty(ctx, 'Patch', field, value);
}

export function checkSetPwdTokenEmpty(ctx, field, value) {
    return checkEmpty(ctx, 'SetPwdToken', field, value);
}

export function checkUserEmpty(ctx, field, value) {
    return checkEmpty(ctx, 'User', field, value);
}

export function checkEmpty(ctx, resource, field, value) {
    if (!value) {
        ctx.status = 422;
        ctx.body = {
            message: field + ' is empty',
            errors: [
                {
                    'resource': resource,
                    'field': field,
                    'code': 'missing_field'
                }
            ]
        };
        return false;
    }
    return true;
}

// check resource

export function checkUserResourceEmpty(ctx, value) {
    return checkResourceEmpty(ctx, 'User', value);
}

export function checkProjectResourceEmpty(ctx, value) {
    return checkResourceEmpty(ctx, 'Project', value);
}

export function checkPatchResourceEmpty(ctx, value) {
    return checkResourceEmpty(ctx, 'kPatch', value);
}

export function checkResourceEmpty(ctx, resource, value) {
    if (!value) {
        ctx.status = 422;
        ctx.body = {
            message: resource + ' is not existed',
            errors: [
                {
                    'resource': resource,
                    'code': 'missing'
                }
            ]
        };
        return false;
    }
    return true;
}

// check valid

export function checkValidEmail(ctx, email) {
    if (!regex.validEmail(email)) {
        ctx.status = 422;
        ctx.body = {
            message: 'Invalid email',
            errors: [
                {
                    resource: 'User',
                    field: 'email',
                    code: 'invalid'
                }
            ]
        };
        return false;
    }
    return true;
}

export function checkValidPassword(ctx, password) {
    if (!regex.validPassword(password)) {
        ctx.status = 422;
        ctx.body = {
            message: 'Invalid password',
            errors: [
                {
                    resource: 'User',
                    field: 'password',
                    code: 'invalid'
                }
            ]
        };
        return false;
    }
    return true;
}
