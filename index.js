const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
    // const name = localStorage.getItem('name');
    console.log(`a user connected`);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (name, msg) => {
        console.log(`message: ${name}: ${msg}`);
        io.emit('chat message', name, msg);
    });
});

app.get('/', (req, res) => {
    res.redirect('http://localhost:3000/login');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/chat', (req, res) => {
    if (req.query.name) {
        res.sendFile(__dirname + '/chat.html');
    } else {
        res.redirect('http://localhost:3000/login');
    }
});

server.listen(3000, () => {
    console.log('listening on port 3000');
});