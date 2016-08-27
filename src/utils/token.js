/**
 * Created by Bell on 16/8/26.
 */

import jwt from 'jsonwebtoken';
import config from '../config';
import {verify} from 'jsonwebtoken';

export function generateTokenFromPayload(payload) {
    return jwt.sign(payload, config.token);
};

export function generatePayload(id) {
    const iat = Date.now();
    const exp = iat + 30 * 24 * 60 * 60 * 1000;
    const scope = 'default';
    return {iat, exp, id, scope};
};

export function generateToken(id) {
    return generateTokenFromPayload(generatePayload(id));
};

export function generateCheckPatchPayload(id) {
    const iat = Date.now();
    const scope = 'patch:check';
    return {iat, id, scope};
};

export function generateCheckPatchToken(id) {
    return generateTokenFromPayload(generateCheckPatchPayload(id));
};

export function generateSetPasswordPayload(id) {
    const iat = Date.now();
    const exp = iat + 24 * 60 * 60 * 1000;
    const scope = 'all';
    return {iat, exp, id, scope};
};

export function generateSetPasswordToken(id) {
    return generateTokenFromPayload(generateSetPasswordPayload(id));
};


/**
 * get payload from token
 * @param token
 * @returns {*}
 */
export function getPayload(token) {
    if (token) {
        return verify(token, config.token);
    }
    return null;
}
