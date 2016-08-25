/**
 * Created by Bell on 16/8/25.
 */

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const Permission = new mongoose.Schema({
    permission: {type: String, default: 0},
    domains: {type: Array}
});

export default mongoose.model('permission', Permission);
