'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.send = undefined;

var _bluebird = require('bluebird');

var send = exports.send = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(content) {
        var smtpConfig, transporter, info;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        smtpConfig = {
                            host: 'smtp.gmail.com',
                            port: 465,
                            secure: true, // use SSL
                            auth: {
                                user: 'user@gmail.com',
                                pass: 'pass'
                            }
                        };
                        transporter = _nodemailer2.default.createTransport(smtpConfig);

                        // create reusable transporter object using the default SMTP transport
                        // var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

                        // setup e-mail data with unicode symbols
                        //     var mailOptions = {
                        //         from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address
                        //         to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
                        //         subject: 'Hello ✔', // Subject line
                        //         text: 'Hello world 🐴', // plaintext body
                        //         html: '<b>Hello world 🐴</b>' // html body
                        //     };

                        // send mail with defined transport object

                        _context.next = 4;
                        return transporter.sendMail(content);

                    case 4:
                        info = _context.sent;

                        console.log('Message sent: ' + info.response);

                        // transporter.sendMail(mailOptions, function(error, info){
                        //     if(error){
                        //         return console.log(error);
                        //     }
                        //     console.log('Message sent: ' + info.response);
                        // });

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function send(_x) {
        return _ref.apply(this, arguments);
    };
}(); /**
      * Created by Bell on 16/8/27.
      */

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=mail.js.map
