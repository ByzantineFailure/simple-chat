import React from 'react';
import User from './User';

const Message = ({ user, data, timestamp }) => 
    <div className="message">
        <span>{ (new Date(timestamp)).toString() } <User id={ user.id } username={ user.username } />: { data }</span>
    </div>
;

Message.propTypes = {
    user: React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        username: React.PropTypes.string.isRequired
    }),
    data: React.PropTypes.string.isRequired,
    timestamp: React.PropTypes.number.isRequired
}

export default Message;

