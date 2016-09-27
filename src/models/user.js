/**
 * Created by Bell on 16/8/10.
 */

import mongoose from 'mongoose';
import { hashString,compareHashString } from '../utils/encrypt';

mongoose.Promise = global.Promise;

const User = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: Number, default: 0},
    status: {type: Number, default: 0}
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
    return await compareHashString(password, user.password);
};

User.methods.updatePassword = async function updatePassword(password) {
    const user = this;
    const hashedNewPassword = await hashString(password);
    return await user.update({$set:{password: hashedNewPassword}});
};

export default mongoose.model('user', User);
