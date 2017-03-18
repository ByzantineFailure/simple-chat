const Redis = require('redis'),
    redisConfig = require('./constants').redisConfig,
    redisClient = Redis.createClient(redisConfig),
    SESSION_HASH_NAME = 'sessions';

async function get(key) {
    const value = new Promise((resolve, reject) => {
        redisClient.get(`${SESSION_HASH_NAME}:${key}`, (err, val) => {
            if (err) {
                reject(err);
            } else {
                resolve(val);
            }
        });
    });

    return await value;
}

async function set(key, sess, maxAge) {
    const value = new Promise((resolve, reject) => {
        redisClient.set([`${SESSION_HASH_NAME}:${key}`, sess, 'PX', maxAge], (err, val) => {
            if (err) {
                reject(err);
            } else {
                resolve(val);
            }
        });
    });

    return await value;
}

async function destroy(key) {
    const value = new Promise((resolve, reject) => {
        redisClient.del(`${SESSION_HASH_NAME}:${key}`, (err, val) => {
            if (err) {
                reject(err);
            } else {
                resolve(val);
            }
        });
    });

    return await value;
}

module.exports = {
    get,
    set,
    destroy
};
