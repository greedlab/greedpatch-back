/**
 * Created by Bell on 16/8/10.
 */

import passport from 'koa-passport';
import url from 'url';
import User from '../models/user';
import SetPwdToken from '../models/setPwdToken';
import * as token_redis from '../redis/token';
import * as user_redis from '../redis/user';
import * as encrypt from '../utils/encrypt';
import * as regex from '../utils/regex';
import * as token_util from '../utils/token';
import * as mail from '../utils/mail';
import * as response_util from '../utils/response';
import * as auth from '../tools/auth';
import * as check from '../tools/check';
import config from '../config';
import Debug from 'debug';
import pkg from '../../package.json';
const debug = new Debug(pkg.name);

/**
 * list users
 *
 * @example curl -H "Accept: application/vnd.greedlab+json" -H "Authorization: Bearer <token>" -X GET localhost:4002/users
 *
 * @param ctx
 * @param next
 * @returns {*}
 */
export async function list(ctx, next) {
    try {
        let users = await User.find({}, {password: 0, __v: 0});
        users = users || [];
        ctx.body = users;
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
 * @example curl -H "Accept: application/vnd.greedlab+json" -H "Content-Type: application/json" -X POST -d '{"email": "test@greedlab.com","password":"secretpasas"}' localhost:4002/register
 * @param ctx
 * @param next
 * @returns {*}
 */
export async function register(ctx, next) {
    const email = ctx.request.body.email;
    if (!check.checkUserEmpty(ctx, 'email', email)) {
        return;
    }
    if (!check.checkValidEmail(ctx, email)) {
        return;
    }

    const password = ctx.request.body.password;
    if (!check.checkUserEmpty(ctx, 'password', password)) {
        return;
    }
    if (!check.checkValidPassword(ctx, password)) {
        return;
    }

    const user = new User({email, password});
    try {
        const first = await User.findOne();
        if (!first || first.length > 0) { // no user
            user.role = 1;
        }

        const existed = await User.findOne({email});
        if (existed) {
            response_util.resourceAlreadyExists(ctx, 'User', 'email');
            return;
        } else {
            await user.save();
        }
    } catch (err) {
        debug(err);
        ctx.throw(500);
    }

    // generate new token
    const payload = token_util.generatePayload(user.id);
    const token = token_util.generateTokenFromPayload(payload);
    try {
        await token_redis.add(token, payload.exp);
    } catch (err) {
        debug(err);
        ctx.throw(500);
    }

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
 * @example curl -H "Content-Type: application/json" -X POST -d '{ "email": "test@greedlab.com", "password": "secretpasas" }' localhost:4002/login
 * @param ctx
 * @param next
 * @returns {*}
 */
export async function login(ctx, next) {
    const email = ctx.request.body.email;
    if (!check.checkUserEmpty(ctx, 'email', email)) {
        return;
    }

    const password = ctx.request.body.password;
    if (!check.checkUserEmpty(ctx, 'password', password)) {
        return;
    }

    let options = {
        session: false
    };
    return passport.authenticate('local', options, async(user) => {
        if (!user) {
            response_util.authenticationFailed(ctx);
            return;
        }

        // generate new token
        const payload = token_util.generatePayload(user.id);
        const token = token_util.generateTokenFromPayload(payload);
        try {
            await token_redis.add(token, payload.exp);
        } catch (err) {
            ctx.throw(500, err.message);
        }

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
    const token = auth.getToken(ctx);
    if (!token) {
        ctx.throw(422, 'unvalid token');
    }

    const payload = token_util.getPayload(token);
    if (!payload || !payload.id) {
        ctx.throw(422, 'unvalid token');
    }

    try {
        await token_redis.del(token);
    } catch (err) {
        ctx.throw(500, err.message);
    }
    ctx.status = 204;
}

/**
 * modify my password
 *
 * @example curl -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -X POST -d '{"password": "secretpasas", "new_password": "new_password"}' localhost:4002/modify-my-password
 * @param ctx
 * @param next
 */
export async function modifyMyPassword(ctx, next) {
    const user = await auth.getFullUser(ctx);
    if (!user) {
        ctx.throw(401);
    }
    const password = ctx.request.body.password;
    if (!check.checkUserEmpty(ctx, 'password', password)) {
        return;
    }

    const new_password = ctx.request.body.new_password;
    if (!check.checkUserEmpty(ctx, 'new_password', new_password)) {
        return;
    }

    // verify password
    const equal = await user.validatePassword(password);
    if (!equal) {
        response_util.fieldInvalid(ctx, 'User', 'password', 'Wrong password');
        return;
    }

    if (new_password === password) {
        response_util.fieldInvalid(ctx, 'User', 'new_password', 'Same to the original');
        return;
    }

    // udpate password and token valid timestamp
    try {
        await user.updatePassword(new_password);
        await user_redis.setTimestamp(user.id, Date.now());
    } catch (err) {
        ctx.throw(500, err.message);
    }

    // generate new token
    const payload = token_util.generatePayload(user.id);
    const token = token_util.generateTokenFromPayload(payload);
    try {
        await token_redis.add(token, payload.exp);
    } catch (err) {
        ctx.throw(500);
    }

    // delete old token
    try {
        const old_token = auth.getToken(ctx);
        await token_redis.del(old_token);
    } catch (err) {
        ctx.throw(500);
    }

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
 * get my profile
 *
 * @example curl -H "Authorization: Bearer <token>" -X GET localhost:4002/users/me/profile
 * @param ctx
 * @param next
 */
export async function myProfile(ctx, next) {
    const user = await auth.getUser(ctx);
    if (!user) {
        ctx.throw(401);
    }
    const response = user.toJSON();
    ctx.body = response;
}

/**
 * get user's profile. only administrator can call this function
 *
 * @example curl -H "Authorization: Bearer <token>" -X GET localhost:4002/users/me/profile
 * @param ctx
 * @param next
 */
export async function profile(ctx, next) {
    const id = ctx.params.id;
    let user = null;
    try {
        user = await User.findById(id, {password: 0, __v: 0});
    } catch (err) {
        ctx.throw(500);
    }
    if (!user) {
        response_util.resourceNotExist(ctx, 'User', 'id');
        return;
    }
    const response = user.toJSON();
    ctx.body = response;
}

/**
 * send mail for reset password
 *
 * @example curl -X POST -d '{"email": "greedpatch@greedlab.com"}' localhost:4002/reset-password
 * @param ctx
 * @param next
 */
export async function resetPassword(ctx, next) {
    debug(ctx.request.body);
    const email = ctx.request.body.email;
    if (!check.checkUserEmpty(ctx, 'email', email)) {
        return;
    }
    if (!check.checkValidEmail(ctx, email)) {
        return;
    }

    // get user
    let user = null;
    try {
        user = await User.findOne({email});
    } catch (err) {
        ctx.throw(500);
    }
    if (!user) {
        response_util.emailNotExist(ctx);
    }

    // save setPwdToken
    const token = new SetPwdToken({userid: user.id});
    try {
        await token.save();
    } catch (err) {
        ctx.throw(500);
    }

    // send mail
    let text = 'set your password from: ';
    text += url.resolve(config.front_address, '/set-password/' + token.id);
    const content = {
        from: config.mail_from, // sender address
        to: email, // list of receivers
        subject: 'Reset your password of greedpatch', // Subject line
        text: text // plaintext body
    };
    debug(content);
    await mail.send(content);

    ctx.body = {
        message: 'Please set password from email'
    };
}

/**
 * set password
 *
 * @example curl -X POST -d '{token: "token", password: "password"}' localhost:4002/set-password
 * @param ctx
 * @param next
 */
export async function setPassword(ctx, next) {
    const token_id = ctx.request.body.token;

    if (!check.checkSetPwdTokenEmpty(ctx, 'token_id', token_id)) {
        return;
    }

    const password = ctx.request.body.password;
    if (!check.checkUserEmpty(ctx, 'password', password)) {
        return;
    }
    if (!check.checkValidPassword(ctx, password)) {
        return;
    }

    // valid setPwdToken
    let setPwdToken = null;
    try {
        setPwdToken = await SetPwdToken.findOne({_id: token_id, status: 0});
    } catch (err) {
        ctx.throw(500);
    }
    if (!setPwdToken) {
        response_util.setPwdTokenNotExist(ctx);
        return;
    }

    // get user
    let user = null;
    try {
        user = await User.findById(setPwdToken.userid);
    } catch (err) {
        ctx.throw(500);
    }
    if (!user) {
        response_util.userNotExist(ctx);
        return;
    }

    // udpate password and token valid timestamp
    if (user.password != password) {
        try {
            await user.updatePassword(password);
            await user_redis.setTimestamp(user.id, Date.now());
        } catch (err) {
            ctx.throw(500);
        }
    }

    // set setPwdToken invalid
    try {
        await setPwdToken.upate({status: 1});
    } catch (err) {
        ctx.throw(500);
    }

    // generate new token
    const payload = token_util.generatePayload(user.id);
    const token = token_util.generateTokenFromPayload(payload);
    try {
        await token_redis.add(token, payload.exp);
    } catch (err) {
        ctx.throw(500);
    }

    const response = user.toJSON();
    delete response.password;
    ctx.body = {
        token,
        user: response
    };
}

/**
 * update user's password
 *
 * @example curl -H "Authorization: Bearer <token>" -X POST -d '{password: "password"}' localhost:4002/users/:id/password
 * @param ctx
 * @param next
 */
export async function updatePassword(ctx, next) {
    const userid = ctx.params.id;
    if (!userid) {
        ctx.throw(400, 'id is empty');
    }

    const password = ctx.request.body.password;
    if (!password) {
        ctx.throw(400, 'password is empty');
    }
    if (!regex.validPassword(password)) {
        ctx.throw(400, 'unvalid password');
    }

    // get user
    let user = null;
    try {
        user = await User.findById(userid, {password: 0, __v: 0});
    } catch (err) {
        ctx.throw(422, 'unvalid id');
    }
    if (!user) {
        ctx.throw(422, 'user is not existed');
    }

    if (user.password === password) {
        ctx.throw(422, 'please don not use the same password');
    }

    // udpate password and token valid timestamp
    try {
        await user.updatePassword(password);
        await user_redis.setTimestamp(user.id, Date.now());
    } catch (err) {
        ctx.throw(500);
    }

    ctx.status = 204;
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
    if (status < 0 || status > 1) {
        response_util.fieldInvalid(ctx, 'User', 'status', 'Invalid status');
        return;
    }

    // get user
    let user = null;
    try {
        user = await User.findById(userid, {password: 0, __v: 0});
    } catch (err) {
        ctx.throw(500);
    }
    if (!user) {
        response_util.resourceNotExist(ctx, 'User', 'id');
        return;
    }

    // update user's status
    try {
        await user.update({$set: {status: status}});
    } catch (err) {
        ctx.throw(500);
    }

    ctx.status = 204;
}

