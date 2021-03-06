/**
 * Created by Bell on 16/8/25.
 */

import Project from '../models/project';
import Patch from '../models/patch';
import * as response_util from '../utils/response';
import * as auth from '../tools/auth';
import * as check from '../tools/check';
import Debug from 'debug';
import pkg from '../../package.json';
const debug = new Debug(pkg.name);

export async function detail(ctx, next) {
    const patch_id = ctx.params.id;
    if (!check.checkPatchEmpty(ctx, 'patch_id', patch_id)) {
        return;
    }

    let patch = null;
    try {
        patch = await Patch.findById(patch_id);
    } catch (err) {
        ctx.throw(500);
    }
    if (!check.checkPatchResourceEmpty(ctx, patch)) {
        return;
    }

    let project = null;
    try {
        project = await Project.findById(patch.project_id);
    } catch (err) {
        ctx.throw(500);
    }
    if (!check.checkProjectResourceEmpty(ctx, project)) {
        return;
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
    if (!check.checkPatchResourceEmpty(ctx, patch)) {
        return;
    }

    let project = null;
    try {
        project = await Project.findById(patch.project_id);
    } catch (err) {
        ctx.throw(500);
    }
    if (project.status != 0) {
        project = null;
    }
    if (!check.checkProjectResourceEmpty(ctx, project)) {
        return;
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

export async function checkPatch(ctx, next) {
    debug(ctx.request.body);

    const project_id = ctx.request.body.project_id;
    if (!check.checkPatchEmpty(ctx, 'project_id', project_id)) {
        return;
    }

    const project_version = ctx.request.body.project_version;
    if (!check.checkPatchEmpty(ctx, 'project_version', project_version)) {
        return;
    }

    const patch_version = ctx.request.body.patch_version | 0;

    let project = null;
    try {
        project = await Project.findById(project_id);
    } catch (err) {
        ctx.throw(500);
    }
    if (!check.checkProjectResourceEmpty(ctx, project)) {
        return;
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

    let project = null;
    try {
        project = await Project.findById(project_id);
    } catch (err) {
        ctx.throw(500);
    }
    if (!check.checkProjectResourceEmpty(ctx, project)) {
        return;
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
    }).sort({_id: -1}).lean();
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
export async function create(ctx, next) {
    const body = ctx.request.body;
    debug(body);
    const project_id = ctx.params.project;
    if (!check.checkPatchEmpty(ctx, 'project_id', project_id)) {
        return;
    }

    const project_version = body.project_version;
    if (!check.checkPatchEmpty(ctx, 'project_version', project_version)) {
        return;
    }

    const hash = body.hash;
    if (!check.checkPatchEmpty(ctx, 'hash', hash)) {
        return;
    }

    const patch_url = body.patch_url;
    if (!check.checkPatchEmpty(ctx, 'patch_url', patch_url)) {
        return;
    }

    let project = null;
    try {
        project = await Project.findById(project_id);
    } catch (err) {
        ctx.throw(500, err);
    }

    if (project.status != 0) {
        project = null;
    }
    if (!check.checkProjectResourceEmpty(ctx, project)) {
        return;
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
        ctx.throw(500, err);
    }
    if (existed) {
        response_util.patchExisted(ctx);
        return;
    }

    // get max patch_version
    let patch_version_objects = null;
    try {
        patch_version_objects = await Patch.find({
            project_id,
            project_version
        }, {patch_version: 1}).sort({patch_version: -1}).limit(1);
    } catch (err) {
        ctx.throw(500);
    }

    debug(patch_version_objects);
    let patch_version = 1;
    if (patch_version_objects && patch_version_objects.length > 0) {
        patch_version = Number(patch_version_objects[0].patch_version) + 1;
    }

    const patch_object = {
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

/**
 * list all project versions in project
 *
 * @param ctx
 * @param next
 */
export async function listProjectVersions(ctx, next) {
    const project_id = ctx.params.project;

    let project = null;
    try {
        project = await Project.findById(project_id);
    } catch (err) {
        ctx.throw(500);
    }
    if (!check.checkProjectResourceEmpty(ctx, project)) {
        return;
    }

    let user = await auth.getUser(ctx);
    if (!user) {
        ctx.throw(401);
    }
    if (user.role != 1) {
        if (!project.isMember(user.id)) {
            ctx.throw(403);
        }
    }

    const version_objects = await Patch.aggregate([
        {$match: {project_id: project_id}},
        {
            $group: {
                _id: "$project_version",
                patch_version: {$max: "$patch_version"}
            }
        },
        {$sort: {project_version: 1}}
    ]);
    debug(version_objects);

    let data = {
        id: project_id,
        versions: version_objects
    };

    try {
        const project = await Project.findById(project_id);
        if (project) {
            data.project_name = project.name;
        }
    } catch (err) {
        ctx.throw(500);
    }

    ctx.body = data;
}
