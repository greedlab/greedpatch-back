/**
 * Created by Bell on 16/8/30.
 */

import * as regex from '../utils/regex';

export function checkEmptyEmail(ctx, email) {
    if (!email) {
        ctx.status = 422;
        ctx.body = {
            message: 'Email not found',
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
            message: 'Password not found',
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

export function authenticationFailed(ctx) {
    ctx.status = 401;
    ctx.body = {
        message: 'Email or password error'
    };
}

export function emailIsNotExisted(ctx) {
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
