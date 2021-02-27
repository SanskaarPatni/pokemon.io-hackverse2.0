const express = require('express');
const http = require('http');
const cors = require('cors');
const axios = require('axios');
const { addUser, removeUser, getUser, getUsersInRoom, initializePlayers, rightGuess, initializeGuesses, increaseScore, getWinner } = require('./users');
const router = require('./router');
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
var io = require('socket.io')(server, { origins: '*:*' });
app.use(router);
app.use(cors);
io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        var score = 0;
        var guess = false;
        const { error, user } = addUser({ id: socket.id, name, room, score, guess });
        if (error) return callback(error);
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
    //getting a pokemon's id based on generation selected
    const pokeId = () => {
        var min = 1;
        var max = 1;
        if (regionNumber == 1) {
            min = Math.ceil(1);
            max = Math.floor(150);
        }
        else if (regionNumber == 2) {
            min = Math.ceil(152);
            max = Math.floor(250);
        }
        else if (regionNumber == 3) {
            min = Math.ceil(252);
            max = Math.floor(385);

        }
        else if (regionNumber == 4) {
            min = Math.ceil(387);
            max = Math.floor(492);
        }
        else if (regionNumber == 5) {
            min = Math.ceil(494);
            max = Math.floor(648);
        }
        else if (regionNumber == 6) {
            min = Math.ceil(650);
            max = Math.floor(720);
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //A set of seen pokemons so that there's no chance of a pokemon appearing twice in the same match
    let seenSet = new Set();
    
    //Params needed
    var newPokeId;
    var pokename;
    var regionNumber;
    var totalRounds;
    var maxCount;

    const refreshPokemon = (user, callback) => {
        if (seenSet.size > 17) {
            seenSet.clear();
        }
        //keep getting new ids until we find a pokemon not in out set
        while (true) {
            newPokeId = pokeId();
            if (!seenSet.has(newPokeId)) {
                seenSet.add(newPokeId);
                break;
            }
        }
        //fetch pokemon details
        axios.get('https://pokeapi.co/api/v2/pokemon/' + newPokeId)
            .then(response => {
                pokename = response.data.name;
                io.to(user.room).emit('newPokemon', { user: 'Admin', pokeid: newPokeId, pokename: pokename });
                callback();
            });
    }
    
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