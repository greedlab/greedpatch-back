/**
 * Created by Bell on 16/8/10.
 */

import User from '../models/user';
import config from '../config';
import * as token_redis from '../redis/token';
import * as user_redis from '../redis/user';
import * as token_util from '../utils/token';

import Debug from 'debug';
import pkg from '../../package.json';
const debug = new Debug(pkg.name);

const token_key = 'token';
const role_key = 'role';

/**
 * ensure user login successfully
 *
 * @param ctx ctx.request.header.authorization = "Bearer <token>"
 * @param next
 * @returns {*}
 */
export async function ensureUser(ctx, next) {
    let token = getToken(ctx);
    return ensureUserWithToken(ctx, next, token);
}

export async function ensureUserWithToken(ctx, next, token) {
    if (!token) {
        ctx.throw(401);
    }

    const payload = token_util.getPayload(token);
    if (!token) {
        ctx.throw(401);
    }

    if (payload.exp && payload.exp < Date.now()) {
        ctx.throw(401);
    }

    const userid = payload.id;
    if (!userid) {
        ctx.throw(401);
    }

    // whether the iat of token less than valid timestamp
    const timestamp = await user_redis.getTimestamp(userid);
    if (timestamp && timestamp > 0) {
        if (timestamp > payload.iat) {
            ctx.throw(401);
        }
    }

    // whether user is disabled
    const status = await user_redis.getStatus(userid);
    if (status && status != 0) {
        ctx.throw(403, 'user is disabled');
    }

    // whether the token is in redis
    const existed = await token_redis.existed(token);
    if (existed == 0) {
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
    const payload = getPayload(ctx);
    if (!payload) {
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
    const user = await getUser(ctx);
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
    let token = getTokenFromHeader(ctx);
    if (!token) {
        token = getTokenFromCookie(ctx);
    }
    return token;
}

export function getTokenFromHeader(ctx) {
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

export function getTokenFromCookie(ctx) {
    return ctx.cookies.get(token_key);
}

/**
 * get payload from ctx.request header
 * @param ctx
 * @returns {*}
 */
export function getPayload(ctx) {
    const token = getToken(ctx);
    if (token) {
        return token_util.getPayload(token);
    }
    return null;
}

/**
 * get user ID from ctx.request header
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
 * get User with password from ctx.request header
 * @param ctx
 * @returns {*}
 */
export async function getFullUser(ctx) {
    const id = getID(ctx);
    if (id) {
        return await User.findById(id);
    }
    return null;
}

/**
 * get User with out password from ctx.request header
 * @param ctx
 * @returns {*}
 */
export async function getUser(ctx) {
    const id = getID(ctx);
    if (id) {
        return await User.findById(id, {password: 0, __v: 0});
    }
    return null;
}

/**
 * get password from user ID
 * @param userid
 * @returns {*}
 */
export async function getPassword(userid) {
    if (!userid) {
        return null;
    }
    const user = await User.findById(userid);
    if (!user) {
        return null;
    }
    return user.password;
}
