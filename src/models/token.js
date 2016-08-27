/**
 * Created by Bell on 16/8/24.
 */

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const Token = new mongoose.Schema({
    name: {type: String},
    userid: {type: String, required: true},
    token: {type: String, required: true},
    timestamp: {type: Number, default: 0},
    type: {type: Number, default: 0}
});

Token.pre('save', async function preSave(next) {
    const user = this;
    if (user.timestamp <= 0) {
        user.timestamp = Date.now();
    }
    return next();
});

export default mongoose.model('token', Token);
