import { connect } from 'react-redux';
import Input from '../components/Input';

const mapStateToProps = (state) => ({
    display: state.isAuthenticated
})

const mapDispatchToProps = (dispatch) => ({
    submitCallback: (message) => {
        dispatch({
            type: 'SEND',
            data: message
        });
        return new Promise((resolve, reject) => { resolve(true); });
    }
});

const ChatInput = connect(
    mapStateToProps,
    mapDispatchToProps
)(Input);

export default ChatInput;

