/**
 * Created by Bell on 16/8/25.
 */

import Project from '../models/project';
import User from '../models/user';
import * as auth from '../tools/auth';
import * as check from '../tools/check';
import *as response_util from '../utils/response';

import Debug from 'debug';
import pkg from '../../package.json';
const debug = new Debug(pkg.name);

/**
 * add project
 *
 * @param ctx
 * @param next
 * @returns {*}
 */
export async function add(ctx, next) {
    const name = ctx.request.body.name;
    if (!check.checkEmptyProjectName(ctx, name)) {
        return;
    }

    let user = null;
    try {
        user = await auth.getUser(ctx);
    } catch (err) {
        ctx.throw(500);
    }
    if (!user) {
        ctx.throw(401);
    }

    let project_object = ctx.request.body;
    project_object.members = [
        {
            id: user.id,
            email: user.email,
            role: 1
        }
    ];
    const project = new Project(project_object);
    try {
        await project.save();
    } catch (err) {
        ctx.throw(500);
    }

    // response
    const response = project.toJSON();
    ctx.status = 201;
    ctx.body = response;
}

/**
 * get project detail
 *
 * @param ctx
 * @param next
 * @returns {*}
 */
export async function detail(ctx, next) {
    const id = ctx.params.id;
    let project = null;
    try {
        project = await Project.findById(id);
    } catch (err) {
        ctx.throw(500, err.message);
    }
    if (!project) {
        response_util.projectNotExist(ctx);
        return;
    }

    const user = await auth.getUser(ctx);
    if (!user) {
        ctx.throw(401);
    }

    if (user.role != 1) { // not manager
        if (!project.isMember(user.id)) {
            ctx.throw(403);
        }
    }

    // response
    const response = project.toJSON();
    ctx.body = response;
}

/**
 * delete project
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

    let project = null;
    try {
        project = await Project.findById(id);
    } catch (err) {
        ctx.throw(500, err.message);
    }
    if (!project) {
        ctx.throw(422, 'unvalid id');
    }

    const user = await auth.getUser(ctx);
    if (!user) {
        ctx.throw(401);
    }

    if (user.role != 1) { // not manager
        if (!project.isManager(user.id)) {
            ctx.throw(403, 'no permission');
        }
    }

    try {
        await project.remove();
    } catch (err) {
        ctx.throw(500, err.message);
    }

    // response
    ctx.status = 204;
}

/**
 * update project
 *
 * @param ctx
 * @param next
 * @returns {*}
 */
export async function update(ctx, next) {
    const id = ctx.params.id;
    if (!id) {
        ctx.throw(400, 'id can not be empty');
    }

    let project = null;
    try {
        project = await Project.findById(id);
    } catch (err) {
        ctx.throw(500, err.message);
    }
    if (!project) {
        ctx.throw(422, 'unvalid id');
    }

    const user = await auth.getUser(ctx);
    if (!user) {
        ctx.throw(401);
    }

    if (user.role != 1) {
        if (!project.isManager(user.id)) {
            ctx.throw(403, 'no permission');
        }
    }

    let object = {};
    const name = ctx.request.body.name;
    if (name) {
        object.name = name;
    }
    const introduction = ctx.request.body.introduction;
    if (introduction) {
        object.introduction = introduction;
    }
    try {
        await project.update(object);
    } catch (err) {
        ctx.throw(500, err.message);
    }

    // response
    ctx.status = 204;
}

/**
 * list all projects
 *
 * @param ctx
 * @param next
 */
export async function listAll(ctx, next) {
    const user = await auth.getUser(ctx);
    if (!user) {
        ctx.throw(401);
    }

    if (user.role != 1) {
        ctx.throw(403, 'no permission');
    }

    let projects = null;
    try {
        projects = await Project.find().lean();
    } catch (err) {
        ctx.throw(500, err.message);
    }
    projects = projects || [];

    // response
    ctx.body = projects;
}

/**
 * list my projects
 *
 * @param ctx
 * @param next
 */
export async function listMy(ctx, next) {
    const userid = auth.getID(ctx);

    if (!userid) {
        ctx.throw(401);
    }

    let projects = null;
    try {
        projects = await Project.find({'members.id': userid}).lean();
    } catch (err) {
        ctx.throw(500, err.message);
    }
    projects = projects || [];

    // response
    ctx.body = {projects};
}

/**
 * add member to project
 *
 * @param ctx
 * @param next
 */
export async function addMember(ctx, next) {
    debug(ctx.request.body);
    const project_id = ctx.params.project;
    if (!project_id) {
        ctx.throw(400, 'project can not be empty');
    }

    const email = ctx.request.body.email;
    if (!email) {
        ctx.throw(400, 'email can not be empty');
    }

    let project = null;
    try {
        project = await Project.findById(project_id);
    } catch (err) {
        ctx.throw(500, err.message);
    }
    if (!project) {
        ctx.throw(422, 'project is not existed');
    }

    const user = await auth.getUser(ctx);
    if (!user) {
        ctx.throw(401);
    }
    if (user.role != 1) {
        if (!project.isManager(user.id)) {
            ctx.throw(403, 'no permission');
        }
    }

    let add_user = null;
    try {
        add_user = await User.findOne({email});
    } catch (err) {
        ctx.throw(500, err.message);
    }
    if (!add_user) {
        ctx.throw(422, 'user is not existed');
    }

    if (project.isMember(add_user.id)) {
        ctx.throw(422, 'user is in the project');
    }

    let members = project.members || [];
    members.push({
        id: add_user.id,
        email: add_user.email,
        role: 0
    });
    try {
        await project.update({$set: {members}});
    } catch (err) {
        ctx.throw(500, err.message);
    }
    // response
    ctx.status = 204;
}

/**
 * list all members in project
 *
 * @param ctx
 * @param next
 */
export async function listMembers(ctx, next) {
    const project_id = ctx.params.project;
    if (!project_id) {
        ctx.throw(400, 'project can not be empty');
    }

    let project = null;
    try {
        project = await Project.findById(project_id);
    } catch (err) {
        ctx.throw(500, err.message);
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

    // response
    const response = project.members || [];
    ctx.body = {
        members: response
    };
}

/**
 * delete member in project
 *
 * @param ctx
 * @param next
 */
export async function delMember(ctx, next) {
    debug(ctx.request.body);
    const project_id = ctx.params.project;
    if (!project_id) {
        ctx.throw(400, 'project can not be empty');
    }

    const member_id = ctx.params.member;
    if (!project_id) {
        ctx.throw(400, 'member can not be empty');
    }

    let project = null;
    try {
        project = await Project.findById(project_id);
    } catch (err) {
        ctx.throw(500, err.message);
    }
    if (!project) {
        ctx.throw(422, 'project is not existed');
    }

    const user = await auth.getUser(ctx);
    if (!user) {
        ctx.throw(401);
    }
    if (user.role != 1) {
        if (!project.isManager(user.id)) {
            ctx.throw(403, 'no permission');
        }
    }

    if (project.isManager(member_id)) {
        ctx.throw(403, 'can not delete manager');
    }

    const index = project.indexOf(member_id);
    if (index == -1) {
        ctx.throw(422, 'member is not in the project');
    }

    let members = project.members;
    members.splice(index, 1);

    try {
        await project.update({$set: {members}});
    } catch (err) {
        ctx.throw(500, err.message);
    }

    ctx.status = 204;
}
