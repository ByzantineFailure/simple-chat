import React, { PropTypes } from 'react';
import User from './User';

const UserList = ({ userList }) => 
    <div className="user-list">
        { userList.map(user =>
            <User key={ user.id } id={ user.id } username={ user.username } />
        )}
    </div>
;

UserList.propTypes = {
    userList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
    })).isRequired
};

export default UserList;

