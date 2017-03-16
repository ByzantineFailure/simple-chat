const parse = require('co-body'),
      uuid = require('uuid/v4');
/**
 * Implements POST - /auth endpoint.  Creates session data for a user.
 *
 * Accepts json and form-encoded
 *
 * Body should be:
 * { username: 'string' }
 **/
async function auth(ctx, next) {
    console.log('Entering auth middleware...');
    if (ctx.request.path !== '/auth' || ctx.request.method !== 'POST') {
        console.log('Exiting auth middleware, not auth...');
        return await next();
    }
    console.log('Parsing body');
    const body = await parse(ctx, { limit: '1kb' });
    if (!body.username) {
        ctx.throw(400, 'Username required');
    }

    ctx.session = {
        id: ctx.session.id || uuid(),
        username: body.username
    };

    ctx.response.body = ctx.session;
    ctx.response.status = 200;
    console.log('Successful auth');
    return;
}

module.exports = auth;

