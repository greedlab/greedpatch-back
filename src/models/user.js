/**
 * Created by Bell on 16/8/10.
 */

import mongoose from 'mongoose';
import config from '../config';
import jwt from 'jsonwebtoken';

import { hashPassword,compareHashString } from '../utils/auth';

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
        const hash = await hashPassword(user.password);
        user.password = hash;
        return next();
    } catch (err) {
        return next(err);
    }
});

User.methods.validatePassword = async function validatePassword(password) {
    const user = this;
    return compareHashString(password, user.password);
};

User.methods.generateToken = function generateToken() {
    const user = this;
    const iat = Date.now();
    const exp = iat + 30 * 24 * 60 * 60 * 1000;
    const scope = 'default';
    return jwt.sign({iat, exp, id: user.id, scope}, config.token);
};

User.methods.generateCheckPatchToken = function generateCheckPatchToken() {
    const user = this;
    const iat = Date.now();
    const scope = 'patch:check';
    return jwt.sign({iat, id: user.id, scope}, config.token);
};

User.methods.generateSetPasswordToken = function generateSetPasswordToken() {
    const user = this;
    const iat = Date.now();
    const exp = iat + 24 * 60 * 60 * 1000;
    const scope = 'all';
    return jwt.sign({iat, exp, id: user.id, scope}, config.token);
};

export default mongoose.model('user', User);
