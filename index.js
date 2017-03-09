const koa = require('koa'),
      websockify = require('koa-websocket'),
      serveStatic = require('koa-static'),
      uuid = require('uuid/v4'),
      createHandler = require('./lib/protocol'),
      serverState = {};

const app = websockify(new koa());

app.ws.use(function*(next) {
    if(this.path != '/ws') {
        yield next;
    }

    const socket = this.websocket,
        id = uuid(),
        handler = createHandler(socket, serverState, app.ws.server);

    yield next;
});

app.use(serveStatic('dist'));

app.listen(3000);

