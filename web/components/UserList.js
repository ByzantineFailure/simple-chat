import React, { PropTypes } from 'react';

const UserList = ({ userList }) => 
    <div className="user-list">
        { userList.map(user =>
            <div className="user" key={user.id}>
                <span>{user.id}</span>
            </div>
        )}
    </div>
;

UserList.propTypes = {
    userList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired
    })).isRequired
};

export default UserList;

