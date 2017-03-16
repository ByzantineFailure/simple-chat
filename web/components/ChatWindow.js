import React, { PropTypes } from 'react';
import Message from './Message';
import ChatInput from '../containers/ChatInput';

const ChatWindow = ({ messages }) =>
    <div className="chat-window">
        <div className="messages-container" id="message-area">
            { 
                messages.map(message => 
                    <Message timestamp={message.timestamp} user={message.user} data={message.data} key={message.id} />
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

