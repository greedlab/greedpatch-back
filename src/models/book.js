/**
 * Created by Bell on 16/8/10.
 */

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const Book = new mongoose.Schema({
    name: { type: String, default: 'Book' },
    price: { type: String }
});

export default mongoose.model('book', Book);
