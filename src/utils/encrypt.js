/**
 * Created by Bell on 16/8/25.
 */

import bcrypt from 'bcrypt';
import Promise from 'bluebird';

const hashAsync = Promise.promisify(bcrypt.hash);
const compareAsync = Promise.promisify(bcrypt.compare);

/**
 * get hashed string
 *
 * @param string
 * @returns hashed string
 */
export async function hashString(string) {
    return await hashAsync(string, 10);
}

/**
 * compare string with hashed string
 *
 * @param string
 * @param hashedString
 * @returns {*}
 */
export async function compareHashString(string, hashedString) {
    return await compareAsync(string, hashedString);
}
