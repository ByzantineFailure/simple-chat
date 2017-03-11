import React, { PropTypes } from 'react';
import Message from './Message';
import ChatInput from '../containers/ChatInput';

const ChatWindow = ({ submitCallback, messages }) =>
    <div className="chat-window">
        <div className="messages-container">
            { 
                messages.map(message => 
                    <Message user={message.user} data={message.data} key={message.id} />
                )
            }
        </div>
        <ChatInput />
    </div>
;

ChatWindow.PropTypes = {
    messages: PropTypes.arrayOf(Message.PropTypes).isRequired
}

export default ChatWindow;

