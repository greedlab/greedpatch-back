/**
 * Created by Bell on 16/8/10.
 */

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../config';
import jwt from 'jsonwebtoken';
import Promise from 'bluebird';

const hashAsync = Promise.promisify(bcrypt.hash);
const compareAsync = Promise.promisify(bcrypt.compare);

mongoose.Promise = global.Promise;

const User = new mongoose.Schema({
    type: {type: String, default: 'User'},
    name: {type: String},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

User.pre('save', async function preSave(next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }
    try {
        const hash = await hashAsync(user.password, 10);
        user.password = hash;
        return next();
    } catch (err) {
        return next(err);
    }
});

User.methods.validatePassword = async function validatePassword(password) {
    const user = this;
    return compareAsync(password, user.password);
};

User.methods.generateToken = function generateToken() {
    const user = this;
    return jwt.sign({id: user.id}, config.token);
};

export default mongoose.model('user', User);
