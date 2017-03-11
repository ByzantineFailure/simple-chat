import React from 'react';
import ConnectedUserList from '../containers/ConnectedUserList';
import ConnectedChatWindow from '../containers/ConnectedChatWindow';
import AuthInput from '../containers/AuthInput';

const App = () => 
    <div className="app-root">
        <AuthInput />
        <ConnectedUserList />
        <ConnectedChatWindow />
    </div>
;

export default App;

