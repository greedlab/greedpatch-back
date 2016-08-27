/**
 * Created by Bell on 16/8/27.
 */

import redis from 'redis';
import bluebird from 'bluebird';
import config from '../config';

import Debug from 'debug';
import pkg from '../../package.json';
const debug = new Debug(pkg.name);

bluebird.promisifyAll(redis.RedisClient.prototype);

const client = redis.createClient(config.redisOptions);

client.on("error", function (err) {
    debug("Error: " + err);
});

function getKey(token) {
    return "token:" + token;
}

/**
 * add token and iat to redis
 *
 * @param token
 */
export async function add(token, exp) {
    const key = getKey(token);
    await client.setAsync(key, 1);
    if (exp) {
        await client.pexpireatAsync(key, exp);
    }
}

/**
 * delete token from redis
 *
 * @param userid
 * @param token
 */
export async function del(token) {
    await client.delAsync(getKey(token));
}

/**
 * whether token is existed in redis
 * if true,the token is unvalid
 *
 * @param userid
 * @param token
 * @returns {boolean}
 */
export async function existed(token) {
    return await client.existsAsync(getKey(token));
}
