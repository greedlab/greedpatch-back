'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _koaPassport = require('koa-passport');

var _koaPassport2 = _interopRequireDefault(_koaPassport);

var _koaBunyanLogger = require('koa-bunyan-logger');

var _koaBunyanLogger2 = _interopRequireDefault(_koaBunyanLogger);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _koaCors = require('koa-cors');

var _koaCors2 = _interopRequireDefault(_koaCors);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _home = require('../routes/home');

var _home2 = _interopRequireDefault(_home);

var _user = require('../routes/user');

var _user2 = _interopRequireDefault(_user);

var _token = require('../routes/token');

var _token2 = _interopRequireDefault(_token);

var _project = require('../routes/project');

var _project2 = _interopRequireDefault(_project);

var _patch = require('../routes/patch');

var _patch2 = _interopRequireDefault(_patch);

var _permission = require('../routes/permission');

var _permission2 = _interopRequireDefault(_permission);

var _file = require('../routes/file');

var _file2 = _interopRequireDefault(_file);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// route

// import logger from 'koa-logger';
var app = new _koa2.default();

// bodyParser

app.use((0, _koaBodyparser2.default)());

// static

app.use((0, _koaStatic2.default)(_path2.default.join(__dirname, '../assets')));

// logger

// app.use(logger());

// koa-bunyan-logger

app.use((0, _koaBunyanLogger2.default)({
    name: _package2.default.name,
    level: 'debug'
}));
app.use(_koaBunyanLogger2.default.requestIdContext());
app.use(_koaBunyanLogger2.default.requestLogger({
    updateRequestLogFields: function updateRequestLogFields(fields, err) {
        fields.body = this.request.body;
    },
    updateResponseLogFields: function updateResponseLogFields(fields, err) {
        fields.body = this.response.body;
    }
}));

// mongodb

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(_config2.default.mongodb);

// passport

require('../config/passport');
app.use(_koaPassport2.default.initialize());

// cors

app.use((0, _koaCors2.default)({ credentials: true }));

// router

app.use(_home2.default.router.routes()).use(_home2.default.router.allowedMethods()).use(_user2.default.router.routes()).use(_user2.default.router.allowedMethods()).use(_token2.default.router.routes()).use(_token2.default.router.allowedMethods()).use(_project2.default.router.routes()).use(_project2.default.router.allowedMethods()).use(_patch2.default.router.routes()).use(_patch2.default.router.allowedMethods()).use(_permission2.default.router.routes()).use(_permission2.default.router.allowedMethods()).use(_file2.default.router.routes()).use(_file2.default.router.allowedMethods());

// listen

app.listen(_config2.default.port);
//# sourceMappingURL=server.js.map
