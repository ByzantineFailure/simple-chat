import React from 'react';
import ConnectedUserList from '../containers/ConnectedUserList';
import ConnectedChatWindow from '../containers/ConnectedChatWindow';
import AuthModal from '../containers/AuthModal';

const App = () => 
    <div className="app-root">
        <AuthModal />
        <ConnectedUserList />
        <ConnectedChatWindow />
    </div>
;

export default App;

