/**
 * Created by Bell on 16/8/10.
 */

import mongoose from 'mongoose';
import { hashString,compareHashString } from '../utils/encrypt';

mongoose.Promise = global.Promise;

const User = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    status: {type: Number, default: 0},
    role: {type: Number, default: 0}
});

User.pre('save', async function preSave(next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }
    try {
        const hash = await hashString(user.password);
        user.password = hash;
        return next();
    } catch (err) {
        return next(err);
    }
});

User.methods.validatePassword = async function validatePassword(password) {
    const user = this;
    const result = await compareHashString(password, user.password);
    return result;
};

export default mongoose.model('user', User);
