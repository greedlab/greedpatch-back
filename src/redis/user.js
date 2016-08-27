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

const NAME = "user:";
const client = redis.createClient(config.redisOptions);

client.on("error", function (err) {
    debug("Error: " + err);
});

/**
 * set timestamp for user
 *
 * @param userid
 * @param timestamp will be valid after the timestamp
 */
export async function setTimestamp(userid, timestamp) {
    await client.hsetAsync(NAME + userid, 'timestamp', timestamp);
}

/**
 * get timestamp from user
 *
 * @param userid
 * @returns timestamp will be valid after the timestamp
 */
export async function getTimestamp(userid) {
    return await client.hgetAsync(NAME + userid, 'timestamp');
}

/**
 * set status for user
 *
 * @param userid
 * @param status
 */
export async function setStatus(userid, status) {
    await client.hsetAsync(NAME + userid, 'status', status);
}

/**
 * get status from user
 *
 * @param userid
 * @returns status
 */
export async function getStatus(userid) {
    return await client.hgetAsync(NAME + userid, 'status');
}