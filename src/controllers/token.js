/**
 * Created by Bell on 16/8/24.
 */

import Token from '../models/token';
import * as auth from '../tools/auth';
import * as encrypt from '../utils/encrypt';
import Debug from 'debug';
import pkg from '../../package.json';
const debug = new Debug(pkg.name);

/**
 * generate new token
 *
 * @example curl -H "Content-Type: application/json" -X POST -d '{ "name": "test generate token" }' localhost:4002/tokens
 * @param ctx
 * @param next
 * @returns {*}
 */
export async function generate(ctx, next) {
    debug(ctx.request.body);
    const name = ctx.request.body.name;

    if (!name) {
        ctx.throw(400, 'name can not be empty');
    }

    const user = new auth.getUser(ctx);
    if (!user) {
        ctx.throw(401);
    }

    const token = user.generateCheckPatchToken();
    if (!token) {
        ctx.throw(500);
    }

    const token_object = new Token({token, name, type: 1});
    await token_object.save();

    // TODO check save response

    // response
    const response = token_object.toJSON();
    ctx.body = response;
    if (next) {
        return next();
    }
}

/**
 * generate new token
 *
 * @example curl -H "Content-Type: application/json" -X GET -d '{ "status": 0, "type": 1 }' localhost:4002/tokens
 * @param ctx
 * @param next
 * @returns {*}
 */
export async function list(ctx, next) {
    debug(ctx.request.body);
    const status = ctx.request.body.status | 0;
    const type = ctx.request.body.type | 1;
    const userid = auth.getID(ctx);
    if (!userid) {
        ctx.throw(403);
    }
    const tokens = await Token.find({userid, status, type});
    // response
    const response = tokens.toJSON();
    ctx.body = response;
    if (next) {
        return next();
    }
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
    debug(ctx.request.body);
    const id = ctx.params.id;
    if (!id) {
        ctx.throw(400, 'id can not be empty');
    }
    const password = ctx.params.password;
    if (!password) {
        ctx.throw(400, 'password can not be empty');
    }
    const userid = auth.getID(ctx);
    if (!userid) {
        ctx.throw(403, 'unvalid token');
    }

    const hashed_password = auth.getPassword(userid);
    const result = await encrypt.compareHashString(password, hashed_password);
    if (!result) {
        ctx.throw(403, 'error password');
    }

    let token = null;
    try {
        token = await Token.findById(id, userid);
    } catch (err) {
        ctx.throw(422, 'unvalid id');
    }
    if (!token) {
        ctx.throw(422, 'unvalid id');
    }

    // response
    const response = token.toJSON();
    ctx.body = response;
    if (next) {
        return next();
    }
}

/**
 * delete token
 *
 * @example curl -H "Content-Type: application/json" -X DELETE localhost:4002/tokens/:id
 * @param ctx
 * @param next
 * @returns {*}
 */
export async function del(ctx, next) {
    debug(ctx.request.body);
    const id = ctx.params.id;
    if (!id) {
        ctx.throw(400, 'id can not be empty');
    }
    const userid = auth.getID(ctx);
    if (!userid) {
        ctx.throw(403);
    }
    try {
        await Token.remove(id, userid);
    } catch (err) {
        ctx.throw(422, 'unvalid id');
    }
    ctx.status = 204;
    if (next) {
        return next();
    }
}
