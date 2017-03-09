class Socket {
    constructor(messageCallback, params) {
		if(!params.host || !params.path) {
            throw new Error('Must provide path and host to socket!');
        }

        var port = params.port ? ':' + params.port : '',
            protocol = params.isSecure ? 'wss://' : 'ws://';
        this.url = protocol + params.host + port + params.path;

        this.messageCallback = messageCallback;

        this.isReady = this.isReady.bind(this);       
        this.open = this.open.bind(this);

        this.readyDeferred = null;
		this.__socket = null;
    }
    open() {
        const self = this;

		this.__socket = new WebSocket(this.url);	
		this.__socket.onmessage = message => {
            var data;
            try {
                data = JSON.parse(message.data);
            } catch (e) {
                console.log('Error parsing message from server: ');
                console.log(message);
            }
            this.messageCallback(data);
        };

        this.readyDeferred = new Promise((resolve, reject) => {
            var readyInterval;
            function readyCheck() {
                if (self.isReady()) {
                    clearInterval(readyInterval);
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

