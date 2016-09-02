'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.send = undefined;

var _bluebird = require('bluebird');

var send = exports.send = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(content) {
        var transporter, info;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        transporter = _nodemailer2.default.createTransport(_config2.default.mail_config);
                        _context.next = 3;
                        return transporter.sendMail(content);

                    case 3:
                        info = _context.sent;

                        debug('Mail response: ' + info.response);

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function send(_x) {
        return _ref.apply(this, arguments);
    };
}();

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Bell on 16/8/27.
 */

var debug = new _debug2.default(_package2.default.name);
//# sourceMappingURL=mail.js.map
