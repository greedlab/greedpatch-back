/**
 * Created by Bell on 16/8/10.
 */

import passport from 'koa-passport';
import User from '../models/user';
// import UnvalidToken from '../models/unvalid-token';
import { addToken } from '../utils/unvalid-token';
import { getToken } from '../utils/auth';

import Debug from 'debug';
import pkg from '../../package.json';
const debug = new Debug(pkg.name);

/**
 * list users
 *
 * @example curl -H "Authorization: Bearer <token>" -X POST localhost:4002/user/list
 *
 * @param ctx
 * @param next
 * @returns {*}
 */
export async function list(ctx, next) {
    try {
        const users = await User.find();
        if (!users) {
            ctx.throw(404);
        }
        ctx.body = {
            users
        };
    } catch (err) {
        if (err === 404 || err.name === 'CastError') {
            ctx.throw(404);
        }
        ctx.throw(500);
    }

    if(next) {
        return next();
    };
}

/**
 * register
 *
 * @example curl -H "Content-Type: application/json" -X POST -d '{ "username": "bell", "password": "secretpasas" }' localhost:4002/user/register
 * @param ctx
 * @param next
 * @returns {*}
 */
export async function register(ctx, next) {
    debug(ctx.request.body);
    const user = new User(ctx.request.body);
    try {
        await user.save();
    } catch (err) {
        ctx.throw(422, 'register failed');
    }

    const token = user.generateToken();
    const response = user.toJSON();
    delete response.password;
    ctx.body = {
        token,
        user: response
    };
    if (next) {
        return next();
    }
}

/**
 * login
 *
 * @example curl -H "Content-Type: application/json" -X POST -d '{ "username": "bell", "password": "secretpasas" }' localhost:4002/user/login
 * @param ctx
 * @param next
 * @returns {*}
 */
export async function login(ctx, next) {
    let options = {
        session: false
    };
    return passport.authenticate('local', options, (user) => {
        if (!user) {
            ctx.throw('unvalid username or password', 401);
        }
        const token = user.generateToken();
        const response = user.toJSON();
        delete response.password;
        ctx.body = {
            token,
            user: response
        };
    })(ctx, next);
}

/**
 * logout
 *
 * @example curl -H "Authorization: Bearer <token>" -X POST localhost:4002/user/logout
 * @param ctx
 * @param next
 * @returns {*}
 */
export async function logout(ctx, next) {
    try {
        const token = getToken(ctx);
        if (token) {
            // const unvalidToken = new UnvalidToken({token});
            // await unvalidToken.save();
            addToken(token);
        }
    } catch (err) {
        ctx.throw(422, err.message);
    }
    ctx.status = 200;
    ctx.body = {
        success: true
    };
}
