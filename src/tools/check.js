/**
 * Created by Bell on 16/8/30.
 */

import * as regex from '../utils/regex';

export function checkEmptyEmail(ctx, email) {
    if (!email) {
        ctx.status = 422;
        ctx.body = {
            message: 'email is empty',
            errors: [
                {
                    'resource': 'User',
                    'field': 'email',
                    'code': 'missing_field'
                }
            ]
        };
        return false;
    }
    return true;
}

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

export function checkEmptyPassword(ctx, password) {
    if (!password) {
        ctx.status = 422;
        ctx.body = {
            message: 'password is empty',
            errors: [
                {
                    'resource': 'User',
                    'field': 'password',
                    'code': 'missing_field'
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

export function checkEmptySetPwdToken(ctx, token) {
    if (!token) {
        ctx.status = 422;
        ctx.body = {
            message: 'token is empty',
            errors: [
                {
                    'resource': 'SetPwdToken',
                    'field': 'id',
                    'code': 'missing_field'
                }
            ]
        };
        return false;
    }
    return true;
}

export function checkEmptyBundleId(ctx, bundle_id) {
    if (!bundle_id) {
        ctx.status = 422;
        ctx.body = {
            message: 'bundle_id is empty',
            errors: [
                {
                    'resource': 'Project',
                    'field': 'bundle_id',
                    'code': 'missing_field'
                }
            ]
        };
        return false;
    }
    return true;
}

export function checkEmptyProjectName(ctx, name) {
    if (!name) {
        ctx.status = 422;
        ctx.body = {
            message: 'name is empty',
            errors: [
                {
                    'resource': 'Project',
                    'field': 'name',
                    'code': 'missing_field'
                }
            ]
        };
        return false;
    }
    return true;
}
