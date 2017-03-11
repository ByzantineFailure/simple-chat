const uuid = require('uuid/v4'),
      _ = require('lodash');

/**
 * Implement the top-level of our protocol.  
 * **/
function createChatSession(socket, userData, store, socketServer) {
    store.addUser(userData.id, _.merge(userData, { socket: socket }));

    function handleMessage(message) {
        var parsedMessage;
    
        try {
            parsedMessage = JSON.parse(message);
        } catch (e) {
            sendError(socket, 'Unable to deserialize message');
            return;
        }

        switch(parsedMessage.type) {
            case 'SEND':
                // { data: { message: 'blah', timestamp: TIMESTAMP } }
                const messageData = {
                    user: sendableUserEntry(userData),
                    data: parsedMessage.data,
                    id: uuid(),
                    timestamp: Date.now()
                };
                store.persistMessage(messageData);
                broadcast(socketServer, {
                    type: 'MESSAGE',
                    data: messageData
                });
                break;
            case 'CONNECT':
                // Shouldn't ever be sent by the client
                break;
            case 'STATE':
                // Retrieve current users
                send(socket, {
                    type: 'STATE',
                    data: {
                        userId: userData.id,
                        userList: _.mapValues(store.getAllUsers(), entry => sendableUserEntry(entry))
                        // At some point we should add message state here if we add short-term persistence
                    }
                });
                break;
            default:
                sendError(socket, 'Unrecognized type: ' + parsedMessage.type);
                return;
        }
    }
    
    socket.on('message', handleMessage);

    socket.on('close', () => {
        broadcast(socketServer, {
            type: 'DISCONNECT',
            data: sendableUserEntry(userData)
        });
        store.removeUser(userData.id);
    });
    
    broadcast(socketServer,{
        type: 'CONNECT',
        data: sendableUserEntry(userData)
    });

    return handleMessage;
}

function sendableUserEntry(userData) {
    return _.omit(userData, ['socket']); 
}

function send(socket, data) {
    socket.send(JSON.stringify(data));
}

function sendError(socket, errorMessage) {
    socket.send(JSON.stringify({
        error: errorMessage
    }));
}

function broadcast(socketServer, data) {
    const serializedData = JSON.stringify(data);
    _(socketServer.clients)
        .filter(client => client.readyState === 1)
        .each(client => client.send(serializedData));
}

module.exports = createChatSession;

