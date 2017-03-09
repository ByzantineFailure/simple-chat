const uuid = require('uuid/v4'),
      _ = require('lodash');

/**
 * Implement the top-level of our protocol.  Maybe also take a server state object eventually?
 **/
function createChatSession(socket, serverState, socketServer) {
    const id = uuid(),
        stateEntry = { socket, id };

    var parsedMessage;

    serverState[id] = stateEntry;

    function handleMessage(message) {
        try {
            parsedMessage = JSON.parse(message);
        } catch (e) {
            sendError(socket, 'Unable to deserialize message');
            return;
        }

        switch(parsedMessage.type) {
            case 'SEND':
                // { data: { message: 'blah', timestamp: TIMESTAMP } }
                broadcast(socketServer, {
                    type: 'MESSAGE',
                    data: {
                        user: sendableStateEntry(stateEntry),
                        data: parsedMessage.data,
                        id: uuid()
                    }
                });
                break;
            case 'CONNECT':
                // Shouldn't ever be sent by the client
                break;
            case 'STATE':
                // Retrieve current users
                socket.send(JSON.stringify({
                    type: 'STATE',
                    data: {
                        userId: id,
                        users: _.mapValues(serverState, entry => sendableStateEntry(entry))
                    }
                }));
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
            data: sendableStateEntry
        });
        // wew
        delete serverState[id];
    });
    
    broadcast(socketServer,{
        type: 'CONNECT',
        data: sendableStateEntry(stateEntry)
    });

    return handleMessage;
}

function sendableStateEntry(stateEntry) {
    return _.omit(stateEntry, ['socket']); 
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
    console.log('Broadcasting :' + JSON.stringify(data, null, 2));
    _(socketServer.clients)
        .filter(client => client.readyState === 1)
        .each(client => client.send(serializedData));
}

module.exports = createChatSession;
