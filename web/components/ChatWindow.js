import React, { PropTypes } from 'react';
import Message from './Message';
import Input from './Input';

const ChatWindow = ({ submitCallback, messages }) =>
    <div className="chat-window">
        <div className="messages-container">
            { 
                messages.map(message => 
                    <Message user={message.user} data={message.data} key={message.id} />
                )
            }
        </div>
        <Input submitCallback={submitCallback} />
    </div>
;

ChatWindow.PropTypes = {
    submitCallback: PropTypes.func.isRequired,
    messages: PropTypes.arrayOf(Message.PropTypes).isRequired
}

export default ChatWindow;

