
import koa from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import passport from 'koa-passport';

import config from '../config';
import home from '../routes/home';
import user from '../routes/user';
import book from '../routes/book';

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
    .use(book.router.routes())
    .use(book.router.allowedMethods());

// listen

app.listen(config.port);
