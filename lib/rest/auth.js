const parse = require('co-body'),
      uuid = require('uuid/v4'),
      SESSION_MAX_AGE = require('../constants').sessionConfig;

/**
 * Implements POST - /auth endpoint.  Creates session data for a user.
 *
 * Accepts json and form-encoded
 *
 * Body should be:
 * { username: 'string' }
 **/
async function auth(ctx, next) {
    if (ctx.request.path !== '/auth') {
        return await next();
    } 
    
    switch(ctx.request.method) {
        case 'POST':
            await post(ctx, next); 
            break;
        case 'GET':
            get(ctx, next);
            break;
        default:
            ctx.response.status = 405;
            ctx.response.body = 'Unsupported method: ' + ctx.request.method;
    }
}

async function post(ctx, next) {
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
}

function get(ctx, next) {
    if (!ctx.session.id) {
        ctx.response.status = 401;
    } else {
        ctx.response.status = 200;
        ctx.response.body = ctx.session;
        // Refresh session duration
        ctx.session.maxAge = SESSION_MAX_AGE;
    }
}

module.exports = auth;

