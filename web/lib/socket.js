const triggerAction = require('./trigger-action'),
    { socketConfig } = require('./constants');

class Socket {
    constructor() {
		if(!socketConfig.host || !socketConfig.path) {
            throw new Error('Must provide path and host to socket!');
        }

        var port = socketConfig.port ? ':' + socketConfig.port : '',
            protocol = socketConfig.isSecure ? 'wss://' : 'ws://';
        this.url = protocol + socketConfig.host + port + socketConfig.path;

        this.isReady = this.isReady.bind(this);       
        this.open = this.open.bind(this);

        this.readyDeferred = null;
		this.__socket = null;
        this.opening = false;
    }
    open() {
        const self = this;
        
        if (this.isReady()) {
            throw new Error('Cannot open socket -- already open!');
        }

        this.opening = true;
		this.__socket = new WebSocket(this.url);	
		this.__socket.onmessage = message => {
            var data;
            try {
                data = JSON.parse(message.data);
            } catch (e) {
                console.log('Error parsing message from server: ');
                console.log(message);
            }
            triggerAction(data);
        };

        this.readyDeferred = new Promise((resolve, reject) => {
            var readyInterval;
            function readyCheck() {
                if (self.isReady()) {
                    clearInterval(readyInterval);
                    this.opening = false;
                    resolve(true);
                }
            }
            readyInterval = setInterval(readyCheck, 100);
        });
        
        return this.readyDeferred;
    }
    isReady() {
		// Socket exists and is open
		return this.__socket && this.__socket.readyState === 1;
    }
    send(data) {
        if (this.isReady()) {
            this.__socket.send(JSON.stringify(data));
        } else {
            this.readyDeferred.then(() => this.__socket.send(JSON.stringify(data)));
        }
    }
}

export default Socket;

