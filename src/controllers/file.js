/**
 * Created by Bell on 16/9/1.
 */

import path from 'path';
import multer from 'koa-multer';
import uuid from 'node-uuid';
import url from 'url';

import config from '../config';

import Debug from 'debug';
import pkg from '../../package.json';
const debug = new Debug(pkg.name);

export async function upload(ctx, next) {
    if (!ctx.req) {
        ctx.throw(500);
    }
    let file = ctx.req.file;
    if (!file) {
        ctx.throw(500);
    }
    if (!file.filename) {
        ctx.throw(500);
    }
    const filename = ctx.req.file.filename || 'file';
    const file_url = url.resolve(config.back_address, '/files/' + filename);
    ctx.status = 201;
    ctx.body = {file_url};
}