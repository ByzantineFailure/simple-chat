import React from 'react';
import ConnectedUserList from '../containers/ConnectedUserList';
import ConnectedChatWindow from '../containers/ConnectedChatWindow';

const user = { id: '123' },
      userList = [ user ],
      data = { message: 'hello' },
      messageList = [
        {
            id: 'aaaaa',
            user: user,
            data: data
        }
      ];

function submitCallback(message) {
    console.log('Submitted!');
}

const App = () => 
    <div className="app-root">
        <ConnectedUserList />
        <ConnectedChatWindow />
    </div>
;

export default App;

