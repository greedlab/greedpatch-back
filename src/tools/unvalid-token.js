/**
 * unvalid token
 *
 * Created by Bell on 16/8/12.
 */

import redis from 'redis';
import bluebird from 'bluebird';
import config from '../config';

const client = redis.createClient(config.redisOptions);

bluebird.promisifyAll(redis.RedisClient.prototype);

/**
 * add unvalid token to redis
 *
 * @param token
 */
export async function addToken(token) {
    await client.setAsync(token, 1);
}

/**
 * delete unvalid token from redis
 *
 * @param token
 */
export async function delToken(token) {
    await client.delAsync(token);
}

/**
 * whether unvalid token is existed in redis
 * if true,the token is unvalid
 *
 * @param token
 * @returns {boolean}
 */
export async function existed(token) {
    try {
        const result = await client.getAsync(token);
        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return true;
    }
}
