import { connect } from 'react-redux';
import ChatWindow from '../components/ChatWindow';

const mapStateToProps = (state) => ({
    messages: state.messages
});

const mapDispatchToProps = (dispatch) => ({
    submitCallback: (message) => {
        dispatch({
            type: 'SEND',
            data: message
        });
    }
});

const ConnectedChatWindow = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatWindow);

export default ConnectedChatWindow;

