import { createStore } from 'redux';
import Socket from '../lib/socket';
import constants from '../lib/constants';

const initialState = {
        isAuthenticated: false,
        user: {},
        userList: [],
        messages: []
    };

function store(socket) {
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
                if (!socket.isReady() && !socket.opening) {
                    socket.open();
                    socket.send({ type: 'STATE' });
                }
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
    
    const store = createStore(reducer);
    
    window.addEventListener(constants.actionEventType, (e) => {
        store.dispatch(e.detail);  
    });

    return store;
}

export default store;

