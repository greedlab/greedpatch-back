/**
 * Created by Bell on 16/8/25.
 */

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const Patch = new mongoose.Schema({
    project_id: {type: String, required: true},
    project_version: {type: String, required: true},
    patch_version: {type: String, required: true},
    patch_url: {type: String, required: true},
    hash: {type: String, required: true}
});

export default mongoose.model('patch', Patch);
