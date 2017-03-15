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
    if (ctx.request.path !== '/auth' || ctx.request.method !== 'POST') {
        return await next();
    }
    const body = await parse(ctx, { limit: '1kb' });
    if (!body.username) {
        this.throw(400, 'Username required');
    }

    ctx.session = {
        id: ctx.session.id || uuid(),
        username: body.username
    };

    ctx.response.body = ctx.session;
    ctx.response.status = 200;
    return;
}

module.exports = auth;

