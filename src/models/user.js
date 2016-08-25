/**
 * Created by Bell on 16/8/10.
 */

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import config from '../config';
import { hashPassword,compareHashString } from '../utils/encrypt';

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
    const result = await compareHashString(password, user.password);
    return result;
};

User.methods.generateToken = function generateToken() {
    const user = this;
    const iat = Date.now() / 1000;
    const exp = iat + 30 * 24 * 60 * 60;
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
    const iat = Date.now() / 1000;
    const exp = iat + 24 * 60 * 60;
    const scope = 'all';
    return jwt.sign({iat, exp, id: user.id, scope}, config.token);
};

export default mongoose.model('user', User);
