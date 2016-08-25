
import koa from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import passport from 'koa-passport';

import config from '../config';
import home from '../routes/home';
import user from '../routes/user';
import token from '../routes/token';
import project from '../routes/project';
import patch from '../routes/patch';
import permission from '../routes/permission';

const app = new koa();

// logger

app.use(logger());

// bodyParser

app.use(bodyParser());

// mongodb

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb);

// passport

require('../config/passport');
app.use(passport.initialize());

// router

app
    .use(home.router.routes())
    .use(home.router.allowedMethods())
    .use(user.router.routes())
    .use(user.router.allowedMethods())
    .use(token.router.routes())
    .use(token.router.allowedMethods())
    .use(project.router.routes())
    .use(project.router.allowedMethods())
    .use(patch.router.routes())
    .use(patch.router.allowedMethods())
    .use(permission.router.routes())
    .use(permission.router.allowedMethods());

// listen

app.listen(config.port);
