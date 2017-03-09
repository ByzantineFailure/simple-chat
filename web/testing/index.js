require('file-loader?name=index.html!./index.html');

function initApp() {
    const socket = new WebSocket('ws://localhost:3000/ws'),
        sendButton = document.getElementById('send-button'),
        input = document.getElementById('input'),
        results = document.getElementById('result');

    socket.onopen = event => {
        socket.send('Hello');
    };

    socket.onmessage = event => {
        results.innerHTML = event.data;
    };

    sendButton.onclick = () => {
        socket.send(input.value);
    };
}

document.addEventListener("DOMContentLoaded", initApp);

