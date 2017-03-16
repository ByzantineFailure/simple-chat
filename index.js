const koa = require('koa'),
      websockify = require('koa-websocket'),
      serveStatic = require('koa-static'),
      koaConvert = require('koa-convert'),
      session = require('koa-session'),
      _ = require('lodash'),
      auth = require('./lib/rest/auth'),
      createHandler = require('./lib/protocol'),
      Store = require('./lib/store');

const SESSION_CONFIG = {
    key: 'SESSION',
    // Eventually change this w/ keys 'n stuff
    signed: false,
    httpOnly: false
};

const app = websockify(new koa()),
      serverStore = new Store(),
      sessionStore = session(SESSION_CONFIG, app);

app.use(koaConvert(sessionStore));
app.ws.use(sessionStore);

app.ws.use(function*(next) {
    console.log('starting WS middleware');
    if (this.path !== '/ws') {
        console.log('Not WS connection');
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

// POST - /auth
app.use(auth);

app.use(serveStatic('dist'));

app.listen(3000);
console.log('Listening on 3000...');

