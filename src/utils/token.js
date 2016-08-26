/**
 * Created by Bell on 16/8/26.
 */

import jwt from 'jsonwebtoken';
import config from '../config';

export function generateToken(id) {
    const user = this;
    const iat = Date.now();
    const exp = iat + 30 * 24 * 60 * 60 * 1000;
    const scope = 'default';
    return jwt.sign({iat, exp, id, scope}, config.token);
};

export function generateCheckPatchToken(id) {
    const user = this;
    const iat = Date.now();
    const scope = 'patch:check';
    return jwt.sign({iat, id, scope}, config.token);
};

export function generateSetPasswordToken(id) {
    const user = this;
    const iat = Date.now();
    const exp = iat + 24 * 60 * 60 * 1000;
    const scope = 'all';
    return jwt.sign({iat, exp, id, scope}, config.token);
};
