/**
 * Created by Bell on 16/8/10.
 */

import passport from 'koa-passport';
import User from '../models/user';
import Token from '../models/token';
// import UnvalidToken from '../models/unvalid-token';
import {addToken as addUnvalidToken} from '../utils/unvalid-token';
import * as regex from '../utils/regex';
import * as auth from '../utils/auth';
import * as token_util from '../utils/token';
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
        const users = await User.find({},{password: 0, __v: 0});
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

    if (next) {
        return next();
    }
}

/**
 * register
 *
 * @example curl -H "Content-Type: application/json" -X POST -d '{ "email": "greedpatch@greedlab.com", "password": "secretpasas" }' localhost:4002/register
 * @param ctx
 * @param next
 * @returns {*}
 */
export async function register(ctx, next) {
    debug(ctx.request.body);
    if (!regex.validEmail(ctx.request.body.email)) {
        ctx.throw(400, 'invalid email');
    }
    if (!regex.validPassword(ctx.request.body.password)) {
        ctx.throw(400, 'invalid password');
    }
    const user = new User(ctx.request.body);
    try {
        await user.save();
    } catch (err) {
        ctx.throw(422, 'email is existed');
    }
    const token = user.generateToken();
    await token_util.saveToken(token);

    // response
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
 * @example curl -H "Content-Type: application/json" -X POST -d '{ "email": "greedpatch@greedlab.com", "password": "secretpasas" }' localhost:4002/login
 * @param ctx
 * @param next
 * @returns {*}
 */
export async function login(ctx, next) {
    let options = {
        session: false
    };
    return passport.authenticate('local', options, async (user) => {
        if (!user) {
            ctx.throw('unvalid email or password', 401);
        }
        const token = user.generateToken();
        await token_util.saveToken(token);

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
 * @example curl -H "Authorization: Bearer <token>" -X POST localhost:4002/logout
 * @param ctx
 * @param next
 * @returns {*}
 */
export async function logout(ctx, next) {
    try {
        const token = auth.getToken(ctx);
        if (token) {
            addUnvalidToken(token);
        }
    } catch (err) {
        ctx.throw(422, err.message);
    }
    ctx.status = 204;
}

/**
 * modify my password
 *
 * @example curl -H "Authorization: Bearer <token>" -X POST -d '{"password": "password", "new_password": "new_password"}' localhost:4002/modify-my-password
 * @param ctx
 * @param next
 */
export async function modifyMyPassword(ctx, next) {
    debug(ctx.request.body);
    const user = auth.getUser(ctx);
    if (!user) {
        ctx.throw(401);
    }
    const password = ctx.request.body.password;
    const newPassword = ctx.request.body.new_password;
    if (!password || !newPassword) {
        ctx.throw(400);
    }
    const equal = await auth.compareHashString(password, user.password);
    if (!equal) {
        ctx.throw(401);
    }
    const hashedNewPassword = await auth.hashString(newPassword);
    try {
        await user.update({password: hashedNewPassword});
    } catch (err) {
        ctx.throw(422, 'unvalid new_password');
    }
    // set origin token unvalid
    addUnvalidToken(auth.getToken(ctx));

    const token = user.generateToken();
    await token_util.saveToken(token);

    const response = user.toJSON();
    ctx.body = {
        token,
        user: response
    };
    if (next) {
        return next();
    }
}

/**
 * get my profile
 *
 * @example curl -H "Authorization: Bearer <token>" -X GET localhost:4002/users/my/profile
 * @param ctx
 * @param next
 */
export async function myProfile(ctx, next) {
    debug(ctx.request.body);
    const user = auth.getUser(ctx);
    if (!user) {
        ctx.throw(401);
    }
    const response = user.toJSON();
    ctx.body = response;
    if (next) {
        return next();
    }
}

/**
 * reset my password
 *
 * @example curl -X POST -d '{"email": "greedpatch@greedlab.com"}' localhost:4002/reset-my-password
 * @param ctx
 * @param next
 */
export async function resetPassword(ctx, next) {
    debug(ctx.request.body);
    const user = auth.getUser(ctx);
    if (!user) {
        ctx.throw(401);
    }
    const password = ctx.request.body.password;
    if (!password) {
        ctx.throw(400);
    }
    const hashedPassword = await auth.hashString(password);
    try {
        await user.update({password: hashedPassword});
    } catch (err) {
        ctx.throw(422, 'unvalid password');
    }
    // set origin token unvalid
    addUnvalidToken(auth.getToken(ctx));

    const token = user.generateSetPasswordToken();

    // save token
    const tokenObject = new Token({token, type: 2});
    await tokenObject.save();

    const response = user.toJSON();
    ctx.body = {
        token,
        user: response
    };
    if (next) {
        return next();
    }
}

/**
 * set my password
 *
 * @example curl -H "Authorization: Bearer <token>" -X POST -d '{password: "password"}' localhost:4002/set-my-password
 * @param ctx
 * @param next
 */
export async function setMyPassword(ctx, next) {
    debug(ctx.request.body);
    const email = ctx.request.body.email;
    if (!email) {
        ctx.throw(400, 'email is empty');
    }
    if (!regex.validEmail(email)) {
        ctx.throw(400, 'unvalid email');
    }
    let user = null;
    try {
        user = await User.find({email: email},{password: 0, __v: 0});
    } catch (err) {
        ctx.throw(422, 'unvalid email');
    }
    if (!user) {
        ctx.throw(422, 'user is not existed');
    }
    // TODO send <front >/set-password?token=<token> to email
    const token = user.generateToken();
    await token_util.saveToken(token);

    ctx.body = {
        message : 'please set password through your email'
    };
    if (next) {
        return next();
    }
}

/**
 * udpate user's password
 *
 * @example curl -H "Authorization: Bearer <token>" -X POST -d '{password: "password"}' localhost:4002/users/:id/password
 * @param ctx
 * @param next
 */
export async function updatePassword(ctx, next) {
    debug(ctx.request.body);
    const userid = ctx.params.id;
    const password = ctx.request.body.password;
    if (!userid) {
        ctx.throw(400, 'id is empty');
    }
    if (!password) {
        ctx.throw(400, 'password is empty');
    }
    if (!regex.validPassword(password)) {
        ctx.throw(400, 'unvalid password');
    }
    let user = null;
    try {
        user = await User.findById(userid, {password: 0, __v: 0});
    } catch (err) {
        ctx.throw(422, 'unvalid id');
    }
    if (!user) {
        ctx.throw(422, 'user is not existed');
    }

    const docs = await Token.find({userid, status: 0});
    for (let doc of docs) {
        if (doc.token) {
            await addUnvalidToken(doc.token);
            await doc.update({status: 1});
        }
    }
    const token = user.generateToken();
    await token_util.saveToken(token);
    ctx.status = 204;
    if (next) {
        return next();
    }
}

/**
 * update user status
 *
 * @example curl -H "Authorization: Bearer <token>" -X POST -d '{password: "password"}' localhost:4002/users/:id/status
 * @param ctx
 * @param next
 * @returns {*}
 */
export async function updateStatus(ctx, next) {
    debug(ctx.request.body);
    const userid = ctx.params.id;
    const status = ctx.request.body.status;
    if (!userid) {
        ctx.throw(400, 'id is empty');
    }
    if (!status) {
        ctx.throw(400, 'status is empty');
    }
    if (status < 0 || status > 1) {
        ctx.throw(400, 'unvalid status');
    }
    let user = null;
    try {
        user = await User.findById(userid, {password: 0, __v: 0});
    } catch (err) {
        ctx.throw(422, 'unvalid id');
    }
    if (!user) {
        ctx.throw(422, 'user is not existed');
    }
    try {
        await user.update({status: status});
    } catch (err) {
        ctx.throw(422, 'unvalid status');
    }
    ctx.status = 204;
    if (next) {
        return next();
    }
}
