import { connect } from 'react-redux';
import Input from '../components/Input';
import needle from 'needle';
import constants from '../lib/constants';

// Should probably just get off my ass and use 'url'
const protocol = constants.authConfig.isSecure ? 'https://' : 'http://',
    port = constants.authConfig.port ? ':' + constants.authConfig.port : '',
    url = protocol + constants.authConfig.host + port + constants.authConfig.path;

const mapStateToProps = (state) => ({
    display: !state.isAuthenticated,
    className: 'auth-prompt',
    clearValueOnError: false
});

const mapDispatchToProps = (dispatch) => ({
    submitCallback: (username) => {
        return new Promise((resolve, reject) => {
            needle.post(url, { username: username }, function(err, resp) {
                if (!err) {
                    console.log(resp.body);
                    dispatch({
                        type: 'AUTH_SUCCESS',
                        data: resp.body
                    });
                    resolve(resp);
                }
                else {
                    reject(err);
                }
            });
        });
    }
});

const AuthInput = connect(
    mapStateToProps,
    mapDispatchToProps
)(Input);

export default AuthInput;

