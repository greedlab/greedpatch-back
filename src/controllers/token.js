/**
 * Created by Bell on 16/8/24.
 */

import * as token_util from '../utils/token';
import Token from '../models/token';
import * as auth from '../tools/auth';
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

    if (!name) {
        ctx.throw(400, 'name can not be empty');
    }

    const userid = auth.getID(ctx);
    if (!userid) {
        ctx.throw(401);
    }

    const token = token_util.generateCheckPatchToken(userid);
    if (!token) {
        ctx.throw(500);
    }

    const token_object = new Token({userid, token, name, type: 1});
    try {
        await token_object.save();
    } catch (err) {
        ctx.throw(500, err.message);
    }

    // response
    const response = token_object.toJSON();
    ctx.body = response;
}

/**
 * generate new token
 *
 * @param ctx
 * @param next
 * @returns {*}
 */
export async function list(ctx, next) {
    const status = ctx.request.body.status || 0;
    const type = ctx.request.body.type || 1;
    const userid = auth.getID(ctx);
    if (!userid) {
        ctx.throw(403);
    }
    let tokens = await Token.find({userid, status, type}).lean();
    let array = [];
    for (let token of tokens) {
        delete token.token;
        array.push(token);
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
    if (!id) {
        ctx.throw(400, 'id can not be empty');
    }
    const password = ctx.request.body.password;
    if (!password) {
        ctx.throw(400, 'password can not be empty');
    }

    const user = await auth.getFullUser(ctx);
    if (!user) {
        ctx.throw(403, 'unvalid token');
    }

    const result = await user.validatePassword(password);
    if (!result) {
        ctx.throw(403, 'error password');
    }

    let token = null;
    try {
        token = await Token.findById(id);
    } catch (err) {
        ctx.throw(422, 'unvalid id');
    }
    if (!token) {
        ctx.throw(422, 'unvalid id');
    }
    if (token.userid != user.id) {
        ctx.throw(403, 'no permission');
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
