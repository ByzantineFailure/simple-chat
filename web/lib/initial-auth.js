import needle from 'needle';
import constants from './constants';
import triggerAction from './trigger-action';

// Should probably just get off my ass and use 'url'
const protocol = constants.authConfig.isSecure ? 'https://' : 'http://',
    port = constants.authConfig.port ? ':' + constants.authConfig.port : '',
    url = protocol + constants.authConfig.host + port + constants.authConfig.path;

function initialAuth(triggerComplete) {
    return new Promise((resolve, reject) => {
        needle.request('get', url, {}, (err, resp) => {
            if (triggerComplete) {
                triggerAction({
                    type: 'LOAD_COMPLETE'
                });
            }
            if (err) {
                reject(err);
            } 
            if (resp.statusCode === 200) {
                triggerAction({
                    type: 'AUTH_SUCCESS',
                    data: resp.body
                });
            }
            resolve(resp);
        });
    });
}

module.exports = initialAuth;

