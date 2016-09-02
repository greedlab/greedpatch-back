/**
 * Created by Bell on 16/8/10.
 */

export default {
    token: 'secret-greedpatch-back-token',
    mongodb: 'mongodb://dev:dev@localhost:27017/greedpatch-back',
    redisOptions: {

    },
    back_address: 'http://localhost:4002/',
    front_address: 'http://localhost:4001/',
    mail_config: {
        host: 'smtp.greedlab.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'test@greedlab.com',
            pass: 'password'
        }
    },
    mail_from: 'test@greedlab.com'
};