const koa = require('koa'),
      websockify = require('koa-websocket'),
      serveStatic = require('koa-static');

const app = websockify(new koa());

app.ws.use(function*(next) {
    if(this.path != '/ws') {
        yield next;
    }

    const socket = this.websocket;

    socket.on('message', function(message) {
        socket.send(message);
    });

    socket.send('Hello world!');

    yield next;
});

app.use(serveStatic('web'));

app.listen(3000);

