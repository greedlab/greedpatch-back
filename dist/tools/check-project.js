'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkEmptyBundleId = checkEmptyBundleId;
exports.checkEmptyName = checkEmptyName;
exports.checkEmptyId = checkEmptyId;
exports.checkEmptyVersion = checkEmptyVersion;
exports.checkEmptyPatchVersion = checkEmptyPatchVersion;
exports.checkEmpty = checkEmpty;
/**
 * Created by Bell on 16/9/2.
 */

function checkEmptyBundleId(ctx, bundle_id) {
    if (!bundle_id) {
        ctx.status = 422;
        ctx.body = {
            message: 'bundle_id is empty',
            errors: [{
                'resource': 'Project',
                'field': 'bundle_id',
                'code': 'missing_field'
            }]
        };
        return false;
    }
    return true;
}

function checkEmptyName(ctx, name) {
    if (!name) {
        ctx.status = 422;
        ctx.body = {
            message: 'name is empty',
            errors: [{
                'resource': 'Project',
                'field': 'name',
                'code': 'missing_field'
            }]
        };
        return false;
    }
    return true;
}

function checkEmptyId(ctx, project_id) {
    if (!project_id) {
        ctx.status = 422;
        ctx.body = {
            message: 'project_id is empty',
            errors: [{
                'resource': 'Project',
                'field': 'project_id',
                'code': 'missing_field'
            }]
        };
        return false;
    }
    return true;
}

function checkEmptyVersion(ctx, project_version) {
    if (!project_version) {
        ctx.status = 422;
        ctx.body = {
            message: 'project_version is empty',
            errors: [{
                'resource': 'Project',
                'field': 'project_version',
                'code': 'missing_field'
            }]
        };
        return false;
    }
    return true;
}

function checkEmptyPatchVersion(ctx, patch_version) {
    if (!patch_version) {
        ctx.status = 422;
        ctx.body = {
            message: 'patch_version is empty',
            errors: [{
                'resource': 'Project',
                'field': 'patch_version',
                'code': 'missing_field'
            }]
        };
        return false;
    }
    return true;
}

function checkEmpty(ctx, key, value) {
    if (!value) {
        ctx.status = 422;
        ctx.body = {
            message: key + ' is empty',
            errors: [{
                'resource': 'Project',
                'field': key,
                'code': 'missing_field'
            }]
        };
        return false;
    }
    return true;
}
//# sourceMappingURL=check-project.js.map
