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

    let seenSet = new Set();
    var newPokeId;
    var pokename;
    var regionNumber;
    var totalRounds;
    var maxCount;
    socket.on('start-game', (region, rounds, maxTime, callback) => {
        regionNumber = region;
        totalRounds = rounds;
        maxCount = maxTime;
        const user = getUser(socket.id);
        io.to(user.room).emit('weHaveAWinner', { room: user.room, winner: '' })
        initializePlayers(user.room);
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
        if (getUsersInRoom(user.room).length < 2) {
            io.to(user.room).emit('message', { user: 'Admin', text: `Waiting for more players(min players:2)!` });
        }
        else {
            refreshPokemon(user, () => {
                count = maxTime;
            });
            io.to(user.room).emit('music', { user: 'Admin', value: true });
            io.to(user.room).emit('setLoadingTrue', { user: 'Admin' })
            io.to(user.room).emit('removeRules', { user: 'Admin', val: true });
            io.to(user.room).emit('gameSettings', { user: 'Admin', val: false });
            io.to(user.room).emit('btn-disable', { user: 'Admin', val: true });
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has started a new game.` });
            io.to(user.room).emit('message', { user: 'Admin', text: `Game details: Generation ${regionNumber} Total rounds: ${totalRounds} Timer:${maxTime}secs.` });
            callback();
        }

    });
    socket.on('start-time', (callback) => {
        const user = getUser(socket.id);
        var count = maxCount;
        var rounds = Number(totalRounds) - 1;

        var interval = setInterval(function () {
            if (count >= 0)
                io.to(user.room).emit('setTimeLeft', { user: 'Admin', time: count });
            if (count === 1) {
                if (rounds == 0) {
                    io.to(user.room).emit('message', { user: 'Admin', text: `Pokemon's name was ${pokename}` });
                    io.to(user.room).emit('message', { user: 'Admin', text: 'Game Over.' });
                    io.to(user.room).emit('gameSettings', { user: 'Admin', val: true });
                    io.to(user.room).emit('btn-disable', { user: 'Admin', val: false });
                    io.to(user.room).emit('initialSettings', { user: 'Admin' });
                    clearInterval(interval);
                    io.to(user.room).emit('setTimeLeft', { user: 'Admin', time: '' });
                    var winner = getWinner(user.room);
                    io.to(user.room).emit('weHaveAWinner', { room: user.room, winner: winner })
                    if (winner != '') {
                        io.to(user.room).emit('message', { user: 'Admin', text: `${winner} won the match!` })
                    }
                    else {
                        io.to(user.room).emit('message', { user: 'Admin', text: `Tie!` })
                    }
                    io.to(user.room).emit('music', { user: 'Admin', value: false });
                }
                else {
                    initializeGuesses(user.room);
                    io.to(user.room).emit('message', { user: 'Admin', text: `Pokemon's name was ${pokename}` });
                    io.to(user.room).emit('setLoadingTrue', { user: 'Admin' })
                    setTimeout(() => {
                        refreshPokemon(user, () => { count = maxCount });
                    }, 500);

                    rounds--;
                }
                io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
            }
            count--;
        }, 1000);
    });
    socket.on('increase-score', (time, callback) => {
        const user = getUser(socket.id);
        if (user.guess === false) {
            rightGuess(user.id);
            increaseScore(user.id, time);
        }
        callback();
    })

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