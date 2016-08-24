/**
 * Created by Bell on 16/8/24.
 */

import passport from 'koa-passport';
import User from '../models/user';
import Token from '../models/token';
import {addToken as addUnvalidToken} from '../utils/unvalid-token';
import * as regex from '../utils/regex';
import * as auth from '../utils/auth';
import * as token_util from '../utils/token';
import Debug from 'debug';
import pkg from '../../package.json';
const debug = new Debug(pkg.name);

export async function generate(ctx, next) {
    debug(ctx.request.body);
    const name = ctx.request.body.name;

    if (!name) {
        ctx.throw(400, 'name can not bel empty');
    }

    const user = new auth.getUser(ctx);
    if (!user) {
        ctx.throw(401);
    }

    const token = user.generateCheckPatchToken();
    if (!token) {
        ctx.throw(500);
    }

    const token_object = new Token({token,name,type: 1});
    await token_object.save();

    // TODO check save response

    // response
    const response = token_object.toJSON();
    ctx.body = response;
    if (next) {
        return next();
    }
}

export async function list(ctx, next) {

}

export async function del(ctx, next) {

}