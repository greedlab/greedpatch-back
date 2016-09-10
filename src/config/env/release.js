/**
 * Created by Bell on 16/8/29.
 */

export default {
    token: 'secret-greedpatch-back-token',
    mongodb: 'mongodb://greedpatch:hungry96@localhost:27017/greedpatch',
    redisOptions: {

    },
    back_address: 'http://patchapi.greedlab.com',
    front_address: 'http://patch.greedlab.com',

    mail_config: {
        host: 'md-hk-1.webhostbox.net',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'greedpatch@greedlab.com',
            pass: 'Envy_Mail_00'
        }
    },
    mail_from: 'greedpatch@greedlab.com'
};