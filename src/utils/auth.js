/**
 * Created by Bell on 16/8/10.
 */

import User from '../models/user';
import config from '../config';
import { verify } from 'jsonwebtoken';
import { existed as unvalid_token_existed }  from '../utils/unvalid-token';

// import UnvalidToken from '../models/unvalid-token';

/**
 * get token from request header
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

    let decoded = null;
    try {
        decoded = verify(token, config.token);
    } catch (err) {
        ctx.throw(401);
    }

    const user = await User.findById(decoded.id, '-password');
    if (!user) {
        ctx.throw(401);
    }
    // const unvalidToken = await UnvalidToken.findOne(token);
    // if (unvalidToken) {
    //     ctx.throw(401);
    // }

    const existed = await unvalid_token_existed(token);
    if (existed) {
        ctx.throw(401);
    }

    return next();
}
