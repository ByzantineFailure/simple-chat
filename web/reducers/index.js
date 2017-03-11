import { createStore } from 'redux';
import Socket from '../lib/socket';
import constants from '../lib/constants';

const initialState = {
        isAuthenticated: false,
        user: {},
        userList: [],
        messages: []
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
                    // Convert the map to an array
                    userList: Object.keys(action.data.userList).map(id => action.data.userList[id]),
                    userId: action.data.userId
                });
            case 'AUTH_SUCCESS':
                return Object.assign({}, state, {
                    user: action.data,
                    isAuthenticated: true
                });
            case 'MESSAGE':
                var messages = state.messages.slice(0);
                if (messages.length > 100) {
                    console.log('slicing messages');
                    messages = messages.slice(-1);
                }
                messages.unshift(action.data);

                // Ideally do this somewhere else 
                var messageArea = document.getElementById('message-area');
                messageArea.scrollTop = messageArea.scrollHeight;

                var result = Object.assign({}, state, { messages: messages });
                console.log(result);
                return result;
            case 'CONNECT':
                return Object.assign({}, state, {
                    userList: state.userList.concat(action.data)
                });
            case 'DISCONNECT':
                return Object.assign({}, state, {
                    userList: state.userList.filter(user => user.id !== action.data.id)
                });
            default:
                return state;
        }
    }
    
    store = createStore(reducer);
    
    // Wait for auth.  Filthy but we'll do this until we've got a better idea (CustomEvent?)
    var authInterval;
    function authCheck() {
        if (store.getState().isAuthenticated) {
            clearInterval(authInterval);
            
            socket = new Socket(data => store.dispatch(data), constants.socketConfig);
            socket.open();
    
            // Get the server state (user list)
            socket.send({ type: 'STATE' });
        }
    }
    authInterval = setInterval(authCheck, 100);

    return store;
}

export default store;

