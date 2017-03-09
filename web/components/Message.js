import React from 'react';

const Message = ({ user, data }) => 
    <div className="message">
        <span>{ user.id } : { data }</span>
    </div>
;

Message.propTypes = {
    user: React.PropTypes.shape({
        id: React.PropTypes.string.isRequired
    }),
    data: React.PropTypes.string.isRequired
}

export default Message;

