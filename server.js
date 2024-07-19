const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let rooms = ['General'];

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle socket connection
io.on('connection', (socket) => {
    socket.on('login', (username) => {
        socket.username = username;
        socket.emit('updateRooms', rooms);
    });

    socket.on('createRoom', (room) => {
        if (!rooms.includes(room)) {
            rooms.push(room);
            io.emit('updateRooms', rooms);
        }
    });

    socket.on('joinRoom', (room) => {
        socket.join(room);
        socket.emit('joinRoom', room);
    });

    socket.on('message', (data) => {
        const { room, message, username } = data;
        const timestamp = Date.now();
        io.to(room).emit('message', { message, username, timestamp });
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
