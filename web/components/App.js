import React from 'react';
import ConnectedUserList from '../containers/ConnectedUserList';
import ConnectedChatWindow from '../containers/ConnectedChatWindow';
import ConnectedLoadingSpinner from '../containers/ConnectedLoadingSpinner';
import AuthModal from '../containers/AuthModal';

const App = () => 
    <div className="app-root">
        <ConnectedLoadingSpinner />
        <AuthModal />
        <ConnectedUserList />
        <ConnectedChatWindow />
    </div>
;

export default App;

