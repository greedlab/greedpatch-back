/**
 * Created by Bell on 16/8/24.
 */

import * as token_util from '../utils/token';
import * as response_util from '../utils/response';
import * as token_redis from '../redis/token';
import * as user_redis from '../redis/user';
import Token from '../models/token';
import * as auth from '../tools/auth';
import * as check from '../tools/check';
import Debug from 'debug';
import pkg from '../../package.json';
const debug = new Debug(pkg.name);

/**
 * generate new token
 *
 * @param ctx
 * @param next
 * @returns {*}
 */
export async function generate(ctx, next) {
    debug(ctx.request.body);
    const name = ctx.request.body.name;
    if (!check.checkEmpty(ctx, 'Token', 'name', name)) {
        return;
    }

    const password = ctx.request.body.password;
    if (!check.checkEmpty(ctx, 'User', 'password', password)) {
        return;
    }

    let user = null;
    try {
        user = await auth.getFullUser(ctx);
    } catch (err) {
        ctx.throw(500);
    }

    if (!user) {
        ctx.throw(401);
    }

    // validate password
    let result = false;
    try {
        result = await user.validatePassword(password);
    } catch (err) {
        ctx.throw(500);
    }
    if (!result) {
        response_util.fieldInvalid(ctx, 'User', 'password', 'Invalid password');
        return;
    }

    const payload = token_util.generateCheckPatchPayload(user.id);
    const token = token_util.generateTokenFromPayload(payload);
    if (!token) {
        ctx.throw(500);
    }

    const token_object = new Token({userid: user.id, token, name, type: 1});
    try {
        await token_object.save();
        await token_redis.add(token, payload.exp);
    } catch (err) {
        ctx.throw(500, err.message);
    }

    // response
    const response = token_object.toJSON();
    ctx.body = response;
    ctx.statusCode = 201;
}

/**
 * generate new token
 *
 * @param ctx
 * @param next
 * @returns {*}
 */
export async function list(ctx, next) {
    const type = ctx.request.body.type || 1;
    const userid = auth.getID(ctx);
    if (!userid) {
        ctx.throw(401);
    }
    let token_objects = await Token.find({userid, type}).lean();
    let array = [];
    for (let token_object of token_objects) {
        const payload = token_util.getPayload(token_object.token);
        if (payload) {
            const timestamp = await user_redis.getTimestamp(payload.id);
            // whether token is valid
            if (!timestamp || timestamp == 0 || payload.iat > timestamp) {
                delete token_object.token;
                array.push(token_object);
            }
        }
    }
    ctx.body = array || [];
}

/**
 * get token detail
 *
 * @example curl -H "Content-Type: application/json" -X POST localhost:4002/tokens/:id
 * @param ctx
 * @param next
 * @returns {*}
 */
export async function detail(ctx, next) {
    const id = ctx.params.id;
    const password = ctx.request.body.password;

    if (!check.checkPatchEmpty(ctx, 'password', password)) {
        return;
    }

    const user = await auth.getFullUser(ctx);
    if (!user) {
        ctx.throw(401);
    }

    const result = await user.validatePassword(password);
    if (!result) {
        response_util.fieldInvalid(ctx, 'User', 'password', 'Invalid password');
        return;
    }

    let token = null;
    try {
        token = await Token.findById(id);
    } catch (err) {
        ctx.throw(500);
    }
    if (!token) {
        response_util.resourceNotExist(ctx, 'Token', 'id');
        return;
    }
    if (token.userid != user.id) {
        ctx.throw(403);
    }

    // response
    const response = token.toJSON();
    ctx.body = response;
}

/**
 * delete token
 *
 * @param ctx
 * @param next
 * @returns {*}
 */
export async function del(ctx, next) {
    const id = ctx.params.id;
    if (!id) {
        ctx.throw(400, 'id can not be empty');
    }
    const userid = auth.getID(ctx);
    if (!userid) {
        ctx.throw(403);
    }
    try {
        await Token.remove({_id:id, userid});
    } catch (err) {
        ctx.throw(422, 'unvalid id');
    }
    ctx.status = 204;
}
