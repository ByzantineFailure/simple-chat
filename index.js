const koa = require('koa'),
    websockify = require('koa-websocket'),
    serveStatic = require('koa-static'),
    koaConvert = require('koa-convert'),
    session = require('koa-session'),
    _ = require('lodash'),
    auth = require('./lib/rest/auth'),
    createHandler = require('./lib/protocol'),
    sessionConfig = require('./lib/constants').sessionConfig,
    Store = require('./lib/store');

// Do this better later
if (process.argv.some(v => v === '--redisSessions')) {
    sessionConfig.store = require('./lib/redis-session');
}

const app = websockify(new koa()),
      serverStore = new Store(),
      sessionStore = session(sessionConfig, app);

app.use(koaConvert(sessionStore));
app.ws.use(sessionStore);

app.ws.use(function*(next) {
    if (this.path !== '/ws') {
        return yield next;
    }
    
    if (!this.session.id) {
        socket.send('Unauthenticated!  Request /auth first!');
        socket.close();
        return;
    }

    const socket = this.websocket,
        userData = _.pick(this.session, ['id', 'username']),
        handler = createHandler(socket, userData, serverStore, app.ws.server);
});

// GET/POST - /auth
app.use(auth);

app.use(serveStatic('dist'));

app.listen(3000);
console.log('Listening on 3000...');

