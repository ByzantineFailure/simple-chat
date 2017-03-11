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
function* auth(next) {
    if (this.path !== '/auth' || this.method !== 'POST') {
        return yield next;
    }
    const body = yield parse(this, { limit: '1kb' });
    if (!body.username) {
        this.throw(400, 'Username required');
    }

    this.session = {
        id: this.session.id || uuid(),
        username: body.username
    };

    this.response.body = this.session;
    this.response.status = 200;
    return;
}

module.exports = auth;

