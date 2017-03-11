import UserList from '../components/UserList';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    userList: state.userList
});

const mapDispatchToProps = (dispatch) => ({});

const ConnectedUserList = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);

export default ConnectedUserList;

