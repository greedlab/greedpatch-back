/**
 * Created by Bell on 16/8/15.
 */

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const Book = new mongoose.Schema({
    token: {
        type: String,
        index: true,
        unique: true
    }
});

export default mongoose.model('unvalid-token', Book);
