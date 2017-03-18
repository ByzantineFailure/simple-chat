const socketConfig = {
        host: '192.168.1.2',
        port: 3000,
        isSecure: false,
        path: '/ws'
    },
    authConfig = {
        host: '192.168.1.2',
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

