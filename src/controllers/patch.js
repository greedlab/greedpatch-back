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
}

export async function del(ctx, next) {
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
}

export async function check(ctx, next) {
    debug(ctx.request.body);

    const project_id = ctx.request.body.project_id;
    if (!project_id) {
        ctx.throw(400, 'project_id can not be empty');
    }

    const project_version = ctx.request.body.project_version;
    if (!project_version) {
        ctx.throw(400, 'project_version can not be empty');
    }

    const patch_version = ctx.request.body.patch_version | 0;

    let project = null;
    try {
        project = await Project.findById(project_id);
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
    if (patches && patches.length > 0) {
        const response = patches[0].toJSON();
        ctx.body = response;
    } else {
        ctx.status = 204;
    }
}

export async function list(ctx, next) {
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

    let patches = await Patch.find({
        project_id
    }).lean();
    patches = patches || [];
    ctx.body = patches;
}

/**
 * add patch to project
 *
 * @param ctx
 * @param next
 * @returns {*}
 */
export async function add(ctx, next) {
    const body = ctx.request.body;
    debug(body);
    const project_id = ctx.params.project;
    if (!project_id) {
        ctx.throw(400, 'project can not be empty');
    }

    const project_version = body.project_version;
    if (!project_version) {
        ctx.throw(400, 'project_version can not be empty');
    }

    const patch_version = body.patch_version;
    if (!patch_version) {
        ctx.throw(400, 'patch_version can not be empty');
    }

    const hash = body.hash;
    if (!hash) {
        ctx.throw(400, 'hash can not be empty');
    }

    const patch_url = body.patch_url;
    if (!patch_url) {
        ctx.throw(400, 'patch_url can not be empty');
    }

    let project = null;
    try {
        project = await Project.findById(project_id);
    } catch (err) {
        ctx.throw(500, err);
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

    let existed = true;
    try {
        existed = await Patch.findOne({
            project_id,
            project_version,
            patch_version
        });
    } catch (err) {
        ctx.throw(500,err);
    }
    if (existed) {
        ctx.throw(422,'patch is existed');
    }

    let patch_object = {
        project_id,
        project_version,
        patch_version,
        hash,
        patch_url
    };
    const patch = new Patch(patch_object);
    try {
        await patch.save();
    } catch (err) {
        ctx.throw(500, err);
    }

    const response = patch.toJSON();
    ctx.status = 201;
    ctx.body = response;
}
