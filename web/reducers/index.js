import { createStore } from 'redux';
import Socket from '../lib/socket';
import _ from 'lodash';

const initialState = {
        users: [],
        messages: [],
        userId: ''
    },
    socketConfig = {
        host: 'localhost',
        port: 3000,
        isSecure: false,
        path: '/ws'
    };

function store() {
    var socket, store;

    const reducer = (state = initialState, action) => {
        console.log(action);
        switch (action.type) {
            case 'SEND':
                socket.send(action);
                return state;
            case 'STATE':
                return Object.assign({}, state, {
                    users: _.map(action.data.users, user => user),
                    userId: action.data.userId
                });
            case 'MESSAGE':
                var messages = state.messages.slice(0, 19);
                messages.unshift(action.data);
                var result = Object.assign({}, state, { messages });
                console.log('MESSAGE result');
                console.log(result);
                return result;
            case 'CONNECT':
                return Object.assign({}, state, {
                    users: state.users.concat(action.data)
                });
            case 'DISCONNECT':
                return Object.assign({}, state, {
                    users: state.users.filter(user => user.id !== action.data.id)
                });
            default:
                return state;
        }
    }
    
    store = createStore(reducer);
    socket = new Socket(data => store.dispatch(data), socketConfig);
    socket.open();
    
    // Get the server state (user list)
    socket.send({ type: 'STATE' });

    return store;
}

export default store;

