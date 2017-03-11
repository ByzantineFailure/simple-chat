// Required for build
require('file-loader?name=index.html!./index.html');

import indexCss from './styles/index.css';
import modalCss from './styles/modal.css';

import { Provider } from 'react-redux';
import App from './components/App';
import React from 'react';
import { render } from 'react-dom';
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

