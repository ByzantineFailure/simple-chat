const socketConfig = {
        host: 'localhost',
        port: 3000,
        isSecure: false,
        path: '/ws'
    },
    authConfig = {
        host: 'localhost',
        port: 3000,
        isSecure: false,
        path: '/auth'
    },
    actionEventType = 'DISPATCH_ACTION';

module.exports = {
    socketConfig,
    authConfig,
    actionEventType
};

