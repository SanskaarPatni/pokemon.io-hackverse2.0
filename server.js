const express = require('express');
const http = require('http');
const cors = require('cors');
const axios = require('axios');
const router = require('./router');
const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
var io = require('socket.io')(server, { origins: '*:*' });
app.use(router);
app.use(cors);
io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        //admin generated messages
        socket.emit('message', { user: 'Admin', text: `${user.name}, welcome to the room ${user.room}` });
        socket.broadcast.to(user.room).emit('message', { user: 'Admin', text: `${user.name}, has joined` });
        socket.join(user.room);
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
        callback();
    });
    //user generated messages
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message });
        callback();
    });
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});