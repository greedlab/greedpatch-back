/**
 * Created by Bell on 16/8/24.
 */

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const Token = new mongoose.Schema({
    name: {type: String},
    userid: {type: String, required: true},
    token: {type: String, required: true},
    status: {type: Number, default: 0},
    type: {type: Number, default: 0}
});

export default mongoose.model('token', Token);
