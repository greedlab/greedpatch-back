'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.upload = undefined;

var _bluebird = require('bluebird');

var upload = exports.upload = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx, next) {
        var file, filename, file_url;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!ctx.req) {
                            ctx.throw(500);
                        }
                        file = ctx.req.file;

                        if (!file) {
                            ctx.throw(500);
                        }
                        if (!file.filename) {
                            ctx.throw(500);
                        }
                        filename = ctx.req.file.filename || 'file';
                        file_url = _url2.default.resolve(_config2.default.back_address, '/files/' + filename);

                        ctx.status = 201;
                        ctx.body = { file_url: file_url };

                    case 8:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function upload(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _koaMulter = require('koa-multer');

var _koaMulter2 = _interopRequireDefault(_koaMulter);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = new _debug2.default(_package2.default.name); /**
                                                          * Created by Bell on 16/9/1.
                                                          */
//# sourceMappingURL=file.js.map
