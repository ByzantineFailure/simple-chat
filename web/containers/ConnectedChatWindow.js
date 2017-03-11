import { connect } from 'react-redux';
import ChatWindow from '../components/ChatWindow';

const mapStateToProps = (state) => ({
    messages: state.messages
});

const mapDispatchToProps = (dispatch) => ({});

const ConnectedChatWindow = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatWindow);

export default ConnectedChatWindow;

