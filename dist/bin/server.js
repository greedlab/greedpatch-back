'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _koaPassport = require('koa-passport');

var _koaPassport2 = _interopRequireDefault(_koaPassport);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _home = require('../routes/home');

var _home2 = _interopRequireDefault(_home);

var _user = require('../routes/user');

var _user2 = _interopRequireDefault(_user);

var _book = require('../routes/book');

var _book2 = _interopRequireDefault(_book);

var _token = require('../routes/token');

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();

// logger

app.use((0, _koaLogger2.default)());

// bodyParser

app.use((0, _koaBodyparser2.default)());

// mongodb

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(_config2.default.mongodb);

// passport

require('../config/passport');
app.use(_koaPassport2.default.initialize());

// router

app.use(_home2.default.router.routes()).use(_home2.default.router.allowedMethods()).use(_user2.default.router.routes()).use(_user2.default.router.allowedMethods()).use(_book2.default.router.routes()).use(_book2.default.router.allowedMethods()).use(_token2.default.router.routes()).use(_token2.default.router.allowedMethods());

// listen

app.listen(_config2.default.port);
//# sourceMappingURL=server.js.map
