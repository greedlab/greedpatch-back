/**
 * Created by Bell on 16/8/27.
 */

import nodemailer from 'nodemailer';
import config from '../config'

import Debug from 'debug';
import pkg from '../../package.json';
const debug = new Debug(pkg.name);

export async function send(content) {
    const transporter = nodemailer.createTransport(config.mailConfig);
    const info = await transporter.sendMail(content);
    debug('Mail response: ' + info.response);
}