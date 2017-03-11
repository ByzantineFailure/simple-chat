import React from 'react';
import User from './User';

const Message = ({ user, data }) => 
    <div className="message">
        <span> <User id={ user.id } username={ user.username } />: { data }</span>
    </div>
;

Message.propTypes = {
    user: React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        username: React.PropTypes.string.isRequired
    }),
    data: React.PropTypes.string.isRequired
}

export default Message;

