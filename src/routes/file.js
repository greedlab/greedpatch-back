/**
 * Created by Bell on 16/9/1.
 */

const Router = require('koa-router');
import path from 'path';
import cors from 'koa-cors';

import * as auth from '../tools/auth';
import * as file from '../controllers/file';

import multer from 'koa-multer';

import Debug from 'debug';
import pkg from '../../package.json';
const debug = new Debug(pkg.name);


let base_url = '/files';
let router = new Router({ prefix: base_url });

const upload_dir = path.join(__dirname,'../assets/files/');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, upload_dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router
    .post('/', auth.ensureUser, upload.single('file'), file.upload);

export default {
    base_url,
    router: router
};