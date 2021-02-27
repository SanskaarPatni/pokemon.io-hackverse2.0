# Title
### **pokemon.io**


# Description
 A Multiplayer Pokemon game where one can host, join a room and even chat, play the game in the room! The host can customize the game settings  by modifying the time of each round, number of rounds and can even select a particular pokemon generation. The players in the same room will be competing by guessing the pokemon by typing its name in the chat box. They will be given scores based on the time they take to guess it right. After all the rounds in the match are completed, a winner is announced who has the highest total score. We will be implementing themes - a dark and light theme which the user can toggle between according to his/her preference.


# Tech Stack
* [React](https://reactjs.org/)
* [Nodejs](https://nodejs.org/en/)
* [Express](https://expressjs.com/)

# Libraries and dependencies
* [socket.io](https://socket.io/)
* [axios](https://www.npmjs.com/package/axios)
* [bootstrap](https://getbootstrap.com/)

# API
* [Pokeapi](https://pokeapi.co/) -  to collect pokemon data
* [Pokeres.bastionbot.org](https://pokeres.bastionbot.org/)- to generate pokemon images
# Installation steps
In the main directory install server dependencies 
```bash
npm install 
```
Go to client folder:
```bash
cd client
```
Install client dependencies:
```bash
npm install
```
Go to main directory and run the project
```bash
npm run dev
```

# Declaration of Previous Work
We had already built a chat app using sockets. For this hack we added the fun multiplayer gaming functionality that includes players racing against the clock to identify the pokemons.
# Authors
* [Sanskaar Patni](https://github.com/SanskaarPatni)
* [Arjun Praveen](https://github.com/ArjunPraveen)
