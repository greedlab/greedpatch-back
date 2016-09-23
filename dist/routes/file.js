'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _koaCors = require('koa-cors');

var _koaCors2 = _interopRequireDefault(_koaCors);

var _auth = require('../tools/auth');

var auth = _interopRequireWildcard(_auth);

var _file = require('../controllers/file');

var file = _interopRequireWildcard(_file);

var _koaMulter = require('koa-multer');

var _koaMulter2 = _interopRequireDefault(_koaMulter);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Bell on 16/9/1.
 */

var Router = require('koa-router');

var debug = new _debug2.default(_package2.default.name);

var base_url = '/files';
var router = new Router({ prefix: base_url });

var upload_dir = _path2.default.join(__dirname, '../assets/files/');
var storage = _koaMulter2.default.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, upload_dir);
    },
    filename: function filename(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

var upload = (0, _koaMulter2.default)({ storage: storage });

router.post('/', auth.ensureUser, upload.single('file'), file.upload);
// .post('/', cors(), upload.single('file'), file.upload);
// .post('/', upload.single('file'), file.upload);

exports.default = {
    base_url: base_url,
    router: router
};
//# sourceMappingURL=file.js.map
