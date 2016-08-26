/**
 * Created by Bell on 16/8/10.
 */

import passport from 'koa-passport';
import User from '../models/user';
import { Strategy } from 'passport-local';

import Debug from 'debug';
import pkg from '../../package.json';
const debug = new Debug(pkg.name);

passport.use('local', new Strategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    }, async function(email, password, done) {
        try {
            const user = await User.findOne({ email: email });
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
                debug(err);
                done(err);
            }
        } catch (err) {
            debug(err);
            return done(err);
        }
    }
));