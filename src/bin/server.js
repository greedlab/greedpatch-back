
import koa from 'koa';
// import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import passport from 'koa-passport';
import koaBunyanLogger from 'koa-bunyan-logger';

import config from '../config';
import home from '../routes/home';
import user from '../routes/user';
import token from '../routes/token';
import project from '../routes/project';
import patch from '../routes/patch';
import permission from '../routes/permission';
import pkg from '../../package.json';

const app = new koa();

// bodyParser

app.use(bodyParser());

// logger

// app.use(logger());

// koa-bunyan-logger

app.use(koaBunyanLogger({
    name: pkg.name,
    level: 'debug'
}));
app.use(koaBunyanLogger.requestIdContext());
app.use(koaBunyanLogger.requestLogger({
    updateRequestLogFields: function (fields, err) {
        fields.body = this.request.body;
    },
    updateResponseLogFields: function (fields, err) {
        fields.body = this.response.body;
    }
}));

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
