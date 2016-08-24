/**
 * Created by Bell on 16/8/10.
 */

import bcrypt from 'bcrypt';
import Promise from 'bluebird';

import User from '../models/user';
import config from '../config';
import { verify } from 'jsonwebtoken';
import { existed as unvalid_token_existed }  from '../utils/unvalid-token';

const hashAsync = Promise.promisify(bcrypt.hash);
const compareAsync = Promise.promisify(bcrypt.compare);

/**
 * ensure user login successfully
 *
 * @param ctx ctx.request.header.authorization = "Bearer <token>"
 * @param next
 * @returns {*}
 */
export async function ensureUser(ctx, next) {
    const token = getToken(ctx);

    if (!token) {
        ctx.throw(401);
    }

    let payload = null;
    try {
        payload = verify(token, config.token);
    } catch (err) {
        ctx.throw(401);
    }

    const user = await User.findById(payload.id, '-password');
    if (!user) {
        ctx.throw(401);
    }

    if (user.status != 0) {
        ctx.throw(403);
    }

    const existed = await unvalid_token_existed(token);
    if (existed) {
        ctx.throw(401);
    }

    return next();
}

/**
 * ensure token can set password
 *
 * @param ctx ctx.request.header.authorization = "Bearer <token>"
 * @param next
 * @returns {*}
 */
export async function ensureSetPasswordToken(ctx, next) {
    const token = getToken(ctx);
    if (!token) {
        ctx.throw(401);
    }
    let payload = null;
    try {
        payload = verify(token, config.token);
    } catch (err) {
        ctx.throw(401);
    }
    const scope = payload.scope;
    if (!scope || scope != 'all') {
        ctx.throw(403);
    }
    return next();
}

/**
 * ensure the user is manager
 *
 * @param ctx ctx.request.header.authorization = "Bearer <token>"
 * @param next
 * @returns {*}
 */
export async function ensureManager(ctx, next) {
    const token = getToken(ctx);
    if (!token) {
        ctx.throw(401);
    }
    let payload = null;
    try {
        payload = verify(token, config.token);
    } catch (err) {
        ctx.throw(401);
    }
    const user = await User.findById(payload.id, '-password');
    if (!user) {
        ctx.throw(401);
    }
    if (user.role != 1) {
        ctx.throw(403);
    }
    return next();
}

/**
 * get token from ctx.request header
 *
 * @param ctx ctx.request.header.authorization = "Bearer <token>"
 * @returns {*}
 */
export function getToken(ctx) {
    const header = ctx.request.header.authorization;
    if (!header) {
        return null;
    }
    const parts = header.split(' ');
    if (parts.length !== 2) {
        return null;
    }
    const scheme = parts[0];
    const token = parts[1];
    if (/^Bearer$/i.test(scheme)) {
        return token;
    }
    return null;
}

/**
 * get payload from ctx.request header
 * @param ctx
 * @returns {*}
 */
export function getPayload(ctx) {
    const token = getToken(ctx);
    if (token) {
        return verify(token, config.token);
    }
    return null;
}

/**
 * get id from ctx.request header
 * @param ctx
 * @returns {*}
 */
export function getID(ctx) {
    const payload = getPayload(ctx);
    if (payload) {
        return payload.id;
    }
    return null;
}

/**
 * get User from ctx.request header
 * @param ctx
 * @returns {*}
 */
export async function getUser(ctx) {
    const id = getID(ctx);
    if (id) {
        return await User.findById(id, '-password');
    }
    return null;
}

/**
 * get hashed string
 *
 * @param string
 * @returns hashed string
 */
export async function hashString(string) {
    return await hashAsync(string, 10);
}

/**
 * compare string with hashed string
 *
 * @param string
 * @param hashedString
 * @returns {*}
 */
export async function compareHashString(string, hashedString) {
    return await compareAsync(string, hashedString);
}
