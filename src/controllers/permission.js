/**
 * Created by Bell on 16/8/25.
 */

import Permission from '../models/permission';
import Debug from 'debug';
import pkg from '../../package.json';
const debug = new Debug(pkg.name);

/**
 * get permission by type
 *
 * @param ctx
 * @param next
 * @returns {*}
 */
export async function get(ctx, next) {
    const type = ctx.params.type;
    let permission = null;
    try {
        permission = await Permission.find({type},{_id:0, __v:0}).limit(1);
    } catch (err) {
        ctx.throw(500);
    }
    let response = null;
    if (permission && permission.length > 0) {
        response = permission[0].toJSON();
    } else {
        response = {
            type,
            permission: 0,
            domains: []
        };
    }

    // response
    ctx.body = response;
    if (next) {
        return next();
    }
}

/**
 * set permission for type
 * 
 * @param ctx
 * @param next
 * @returns {*}
 */
export async function set(ctx, next) {
    debug(ctx.request.body);
    const type = ctx.params.type;
    if (!type) {
        ctx.throw(400, 'type can not be empty');
    }

    let permission_object = ctx.request.body;
    permission_object.type = type;

    try {
        const permissions = await Permission.find({type}).limit(1);
        let permission = (permissions && permissions.length > 0) ? permissions[0] : null;
        if (permission) {
            await permission.update({$set:permission_object});
        } else {
            permission = new Permission(permission_object);
            await permission.save();
        }
    } catch (err) {
        ctx.throw(500,err.message);
    }

    // response
    ctx.status = 204;
    if (next) {
        return next();
    }
}
