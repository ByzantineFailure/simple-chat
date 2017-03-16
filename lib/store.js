const Redis = require('redis'),
    _ = require('lodash'),
    redisConfig = require('./constants').redisConfig,
    redisClient = Redis.createClient(redisConfig);

redisClient.on('ready', () => { console.log('Redis client ready'); });

const USERS_HASH_KEY = 'users_hash',
      MESSAGE_SET = 'messages_set';

// Eventually we'll use this to proxy redis
class Store {
    constructor() {
        // Paranoid 
        this.addUser = this.addUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
    }
    addUser(id, user) {
        redisClient.hset(USERS_HASH_KEY, id, JSON.stringify(user), (err, val) => {
            if (err) {
                console.log(err);
            }
        });
    }
    removeUser(id) {
        redisClient.hdel(USERS_HASH_KEY, id, (err, val) => {
            if (err) {
                console.log(err);
            }
        });
    }
    getAllUsers() {
        const resultPromise = new Promise((resolve, reject) => {
            redisClient.hgetall(USERS_HASH_KEY, (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(_.mapValues(reply, (user) => JSON.parse(user)));
                }
            });
        });

        return resultPromise;
    }
    persistMessage(message) {
        redisClient.zadd([MESSAGE_SET, message.timestamp, JSON.stringify(message)], (err, val) => {
           if (err) {
               console.log(err);
           }
        });
    }
    getMessages(channel, historyStart, historyEnd) {
        const resultPromise = new Promise((resolve, reject) => {
            redisClient.zrevrange([MESSAGE_SET, historyStart, historyEnd], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.map(val => JSON.parse(val)));
                }
            });
        });
        return resultPromise;
        // Currently channel is ignored
    }
}

module.exports = Store;

