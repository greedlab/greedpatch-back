/**
 * Created by Bell on 16/8/27.
 */

import nodemailer from 'nodemailer';

export async function send(content) {
    const smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'user@gmail.com',
            pass: 'pass'
        }
    };
    const transporter = nodemailer.createTransport(smtpConfig);

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
    const info = await transporter.sendMail(content);
    console.log('Message sent: ' + info.response);

    // transporter.sendMail(mailOptions, function(error, info){
    //     if(error){
    //         return console.log(error);
    //     }
    //     console.log('Message sent: ' + info.response);
    // });
}