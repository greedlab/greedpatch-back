/**
 * Created by Bell on 16/8/27.
 */

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const SetPwdToken = new mongoose.Schema({
    userid: {type: String, require: true},
    iat: {type: Number, default: 0},
    exp: {type: Number, default: 0},
    status: {type: Number, default: 0}
});

SetPwdToken.pre('save', async function preSave(next) {
    const user = this;
    if (user.iat <= 0) {
        user.iat = Date.now();
    }
    if (user.exp <= user.iat) {
        user.exp =  user.iat + 24 * 60 * 60 * 1000;
    }
    return next();
});

export default mongoose.model('setPwdToken', SetPwdToken);
