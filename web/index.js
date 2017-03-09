require('file-loader?name=index.html!./index.html');
require('file-loader?name=index.css!./styles/index.css');

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import createStore from './reducers';

const store = createStore();

document.addEventListener('DOMContentLoaded', function() {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
});

