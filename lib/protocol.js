const uuid = require('uuid/v4'),
      _ = require('lodash');

/**
 * Implement the top-level of our protocol.  
 * **/
function createChatSession(socket, userData, store, socketServer) {
    console.log('Adding user...');
    store.addUser(userData.id, userData);

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
                    user: userData,
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
                console.log('Getting state...');
                const promises = [
                    store.getAllUsers(),
                    store.getMessages(null, 1, 20)
                ];
                Promise.all(promises).then((results) => {
                    const users = results[0],
                        messages = results[1];
                    send(socket, {
                        type: 'STATE',
                        data: {
                            userId: userData.id,
                            userList: users,
                            messages: messages
                        }
                    });
                }).catch((err) => {
                    console.log(err);
                    send(socket, err);
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
            data: userData
        });
        store.removeUser(userData.id);
    });
    
    broadcast(socketServer,{
        type: 'CONNECT',
        data: userData
    });

    return handleMessage;
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

