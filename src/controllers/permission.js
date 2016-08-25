/**
 * Created by Bell on 16/8/25.
 */

import Permission from '../models/permission';
import Debug from 'debug';
import pkg from '../../package.json';
const debug = new Debug(pkg.name);

export async function get(ctx, next) {
    debug(ctx.request.body);
    const id = ctx.params.id;
    if (!id) {
        ctx.throw(400, 'id can not be empty');
    }

    let permission = null;
    try {
        permission = await Permission.findById(id);
    } catch (err) {
        ctx.throw(500);
    }
    if (!permission) {
        permission = new Permission({
            id,
            permission: 0,
            domains: []
        });
    }

    // response
    const response = permission.toJSON();
    ctx.body = response;
    if (next) {
        return next();
    }
}

export async function set(ctx, next) {
    debug(ctx.request.body);
    const id = ctx.params.id;
    if (!id) {
        ctx.throw(400, 'id can not be empty');
    }

    let permission = null;
    try {
        permission = await Permission.findById(id);
    } catch (err) {
        ctx.throw(500);
    }
    if (!permission) {
        permission = new Permission(ctx.request.body);
        permission.id = id;
        try {
            await permission.save();
        } catch (err) {
            ctx.throw(500);
        }
    } else {
        permission.update(ctx.request.body);
    }

    // response
    ctx.status = 204;
    if (next) {
        return next();
    }
}
