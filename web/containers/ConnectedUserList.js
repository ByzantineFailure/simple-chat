import UserList from '../components/UserList';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    userList: state.users    
});

const mapDispatchToProps = (dispatch) => ({});

const ConnectedUserList = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);

export default ConnectedUserList;

