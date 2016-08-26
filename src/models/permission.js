/**
 * Created by Bell on 16/8/25.
 */

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const Permission = new mongoose.Schema({
    type: {type: Number, default: 0, unique: true},
    permission: {type: String, default: 0},
    domains: {type: Array}
});

export default mongoose.model('permission', Permission);
