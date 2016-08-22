/**
 * Created by Bell on 16/8/10.
 */

import passport from 'koa-passport';
import User from '../models/user';
import { Strategy } from 'passport-local';

passport.use('local', new Strategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return done(null, false);
        }
        try {
            const isMatch = await user.validatePassword(password);
            if (!isMatch) {
                return done(null, false);
            }
            done(null, user);
        } catch (err) {
            done(err);
        }

    } catch (err) {
        return done(err);
    }
}));
