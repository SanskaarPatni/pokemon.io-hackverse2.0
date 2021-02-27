const users = [];

const addUser = ({ id, name, room, score, guess }) => {
    score = score;
    guess = guess;

    const exisitingUser = users.find((user) => user.room == room && user.name == name);
    if (exisitingUser) {
        return { error: 'Username is taken' };
    }
    const user = { id, name, room, score, guess };
    users.push(user);
    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id == id);
    if (index != -1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => users.find((user) => user.id == id);

const getUsersInRoom = (room) => users.filter((user) => user.room == room);

const initializePlayers = (room) => users.forEach((user) => {
    if (user.room == room) {
        user.score = 0;
        user.guess = false;
    }
});

const increaseScore = (id, time) => users.forEach((user) => {
    if (user.id == id) {
        user.score += time;
    }
});

const rightGuess = (id) => users.forEach((user) => {
    if (user.id == id) {
        user.guess = true;
    }
});

const getWinner = (room) => {
    var u = users.filter((user) => user.room == room);
    let maxScore = 0;
    let maxPerson = ''
    for (let i = 0; i < u.length; i++) {
        if (u[i].score > maxScore) {
            maxScore = u[i].score;
            maxPerson = u[i].name;
        }
    }
    return maxPerson;
};

const initializeGuesses = (room) => users.forEach((user) => {
    if (user.room == room) {
        user.guess = false;
    }
});

module.exports = { addUser, removeUser, getUser, getUsersInRoom, rightGuess, initializePlayers, initializeGuesses, increaseScore, getWinner };