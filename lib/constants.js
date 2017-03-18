const redisConfig = {
        host: 'localhost',
        port: 6379,
        socket_keepalive: false,
        //password: null,
        tls: null
    },
    sessionConfig = {
        key: 'SESSION',
        // Eventually change this w/ keys 'n stuff
        signed: false,
        httpOnly: false,
        // Session duration in ms
        maxAge: 3600 * 1000
    };

module.exports = {
    redisConfig,
    sessionConfig
};

