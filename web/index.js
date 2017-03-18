// Required for build
require('file-loader?name=index.html!./index.html');
import indexCss from './styles/index.css';

import { Provider } from 'react-redux';
import App from './components/App';
import React from 'react';
import { render } from 'react-dom';
import createStore from './reducers';
import Socket from './lib/socket';
import initialAuth from './lib/initial-auth';

const socket = new Socket(),
    store = createStore(socket);

document.addEventListener('DOMContentLoaded', function() {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
});

initialAuth(true).then(() => {
    console.log('initial auth complete!');
    // Set a 30-minute session-refresh interval
    setInterval(() => initialAuth(false), 1000*60*30);
});



