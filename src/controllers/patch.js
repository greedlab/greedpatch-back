/**
 * Created by Bell on 16/8/25.
 */

import Project from '../models/project';
import Patch from '../models/patch';
import * as auth from '../tools/auth';
import Debug from 'debug';
import pkg from '../../package.json';
const debug = new Debug(pkg.name);

export async function detail(ctx, next) {
    debug(ctx.request.body);
    const patch_id = ctx.params.id;
    if (!patch_id) {
        ctx.throw(400, 'id can not be empty');
    }

    let patch = null;
    try {
        patch = await Patch.findById(patch_id);
    } catch (err) {
        ctx.throw(500);
    }
    if (!patch) {
        ctx.throw(404, 'patch is not existed');
    }

    let project = null;
    try {
        project = await Project.findById(patch.project_id);
    } catch (err) {
        ctx.throw(500);
    }
    if (!project) {
        ctx.throw(422, 'project is not existed');
    }

    let user = await auth.getUser(ctx);
    if (!user) {
        ctx.throw(401);
    }
    if (user.role != 1) {
        if (!project.isMember(user.id)) {
            ctx.throw(403, 'no permission');
        }
    }

    const response = patch.toJSON();
    ctx.body = response;
    if (next) {
        return next();
    }
}

export async function del(ctx, next) {
    debug(ctx.request.body);
    const patch_id = ctx.params.id;
    if (!patch_id) {
        ctx.throw(400, 'id can not be empty');
    }

    let patch = null;
    try {
        patch = await Patch.findById(patch_id);
    } catch (err) {
        ctx.throw(500);
    }
    if (!patch) {
        ctx.throw(404, 'patch is not existed');
    }

    let project = null;
    try {
        project = await Project.findById(patch.project_id);
    } catch (err) {
        ctx.throw(500);
    }
    if (!project) {
        ctx.throw(422, 'project is not existed');
    }

    let user = await auth.getUser(ctx);
    if (!user) {
        ctx.throw(401);
    }
    if (user.role != 1) {
        if (!project.isManager(user.id)) {
            ctx.throw(403, 'no permission');
        }
    }

    try {
        await patch.remove();
    } catch (err) {
        ctx.throw(500);
    }

    ctx.status = 204;
    if (next) {
        return next();
    }
}

export async function check(ctx, next) {
    debug(ctx.request.body);

    const bundle_id = ctx.request.body.bundle_id;
    if (!bundle_id) {
        ctx.throw(400, 'bundle_id can not be empty');
    }

    const client = ctx.request.body.client;
    if (!client) {
        ctx.throw(400, 'client can not be empty');
    }

    const project_version = ctx.request.body.app_version;
    if (!project_version) {
        ctx.throw(400, 'app_version can not be empty');
    }

    const patch_version = ctx.request.body.patch_version | 0;

    let project = null;
    try {
        project = await Project.findOne({bundle_id});
    } catch (err) {
        ctx.throw(500);
    }
    if (!project) {
        ctx.throw(422, 'project is not existed');
    }

    let patches = null;
    try {
        patches = await Patch.find({
            project_id: project.id,
            project_version,
            patch_version: {$gt: patch_version}
        }).sort({
            patch_version: -1
        }).limit(1);
    } catch (err) {
        ctx.throw(500);
    }
    if (!patches || patches.length == 0) {
        ctx.status = 204;
    }

    const response = patches[0].toJSON();
    ctx.body = response;
    if (next) {
        return next();
    }
}

export async function list(ctx, next) {
    debug(ctx.request.body);
    const project_id = ctx.params.project;
    if (!project_id) {
        ctx.throw(400, 'project can not be empty');
    }

    let project = null;
    try {
        project = await Project.findById(project_id);
    } catch (err) {
        ctx.throw(500);
    }
    if (!project) {
        ctx.throw(422, 'project is not existed');
    }

    let user = await auth.getUser(ctx);
    if (!user) {
        ctx.throw(401);
    }
    if (user.role != 1) {
        if (!project.isMember(user.id)) {
            ctx.throw(403, 'no permission');
        }
    }

    const patches = await Patch.find({
        project_id
    });
    const response = patches.toJSON();
    ctx.body = {
        patches: response
    };
    if (next) {
        return next();
    }
}

export async function add(ctx, next) {
    debug(ctx.request.body);
    const project_id = ctx.params.project;
    if (!project_id) {
        ctx.throw(400, 'project can not be empty');
    }

    let project = null;
    try {
        project = await Project.findById(project_id);
    } catch (err) {
        ctx.throw(500);
    }
    if (!project) {
        ctx.throw(422, 'project is not existed');
    }

    let user = await auth.getUser(ctx);
    if (!user) {
        ctx.throw(401);
    }
    if (user.role != 1) {
        if (!project.isMember(user.id)) {
            ctx.throw(403, 'no permission');
        }
    }

    const patch = new Patch(ctx.request.body);
    try {
        await patch.save();
    } catch (err) {
        ctx.throw(500);
    }

    const response = patch.toJSON();
    ctx.status = 201;
    ctx.body = response;
    if (next) {
        return next();
    }
}
