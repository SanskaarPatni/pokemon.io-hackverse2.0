import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import useSound from 'use-sound';
import Navbar from './NavBar';
import TextContainer from './TextContainer';
import Messages from './Messages/Messages';
import InfoBar from './InfoBar/InfoBar';
import Inputt from './Input';
import PokeGame from './PokeGame';
import GameSettings from './GameSettings';
import { Container, Row, Col } from 'reactstrap';
var similarity = require('similarity')

let socket;
const Chat = ({ location }) => {
  const [darkMode, setDarkMode] = useState(getInitialMode());
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [wildPokemonID, setWildPokemonID] = useState('');
  const [wildPokemonName, setWildPokemonName] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  const [btn, setBtnDis] = useState(false);
  const [winner, setWinner] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [showGameSettings, setshowGameSettings] = useState(true);
  const [rounds, setRounds] = useState(3);
  const [region, setRegion] = useState(1);
  const [maxTime, setMaxTime] = useState(10);
  const ENDPOINT = 'http://localhost:5000/';
  const correctSound = './correct.mp3';
  const startSound = './start.mp3';

  const startVolume = 0.1
  const [playCorrect] = useSound(
    correctSound,
    { volume: 0.5 }
  );
  const [playStart, { stop }] = useSound(
    startSound,
    { volume: startVolume }
  );

  useEffect(() => {
    localStorage.setItem('dark', JSON.stringify(darkMode));
  }, [darkMode])

  function getInitialMode() {
    const savedMode = JSON.parse(localStorage.getItem('dark'));
    return savedMode || false;
  }

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  useEffect(() => {
    socket.on('newPokemon', ({ pokeid, pokename }) => {
      setWildPokemonID(pokeid);
      setWildPokemonName(pokename);
      setisLoading(false);
    });
  }, [])
  useEffect(() => {
    socket.on('btn-disable', ({ val }) => {
      setBtnDis(val);
    });
  }, [])
  useEffect(() => {
    socket.on('setTimeLeft', ({ time }) => {
      setTimeLeft(time);
    })
  }, [])
  useEffect(() => {
    socket.on('weHaveAWinner', ({ winner }) => {
      setWinner(winner);
    })
  }, [])

  useEffect(() => {
    socket.on('setLoadingTrue', () => {
      setisLoading(true);
    })
  }, [])

  useEffect(() => {
    socket.on('removeRules', ({ val }) => {
      setGameStarted(val);
    })
  }, [])
  useEffect(() => {
    socket.on('gameSettings', ({ val }) => {
      setshowGameSettings(val);
    })
  }, [])
  useEffect(() => {
    socket.on('initialSettings', () => {
      setRegion(1);
      setRounds(3);
      setMaxTime(10);
    })
  }, [])
  useEffect(() => {
    socket.on('music', ({ value }) => {
      if (value)
        playStart();
      else stop();
    });
  });
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      if (message.trim().toLowerCase() === wildPokemonName && btn === true) {
        var gotIt = `${name} guessed the pokemon name.`;
        socket.emit('increase-score', timeLeft, () => { });
        socket.emit('sendMessage', gotIt, () => setMessage(''));
        playCorrect();
      }
      else {
        if(similarity(message,wildPokemonName)>0.6){
          var closeString=`${message} is close!`;
          setMessages(messages => [...messages, {user:name,text:closeString}]);
          setMessage('');
        }else socket.emit('sendMessage', message, () => setMessage(''));
      }
    }
  }

  const start_game = () => {
    socket.emit('start-game', region, rounds, maxTime, () => {
      socket.emit('start-time', () => { });
    });
  }
  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <Navbar setDarkMode={setDarkMode} darkMode={darkMode} />
      <Container fluid={true}>
        <br />
        <br />
        <br />
        <Row>
          <Col xs="12" md="3" >
            <TextContainer users={users} winner={winner} />
            <GameSettings users={users} btn={btn} setRegion={setRegion} setMaxTime={setMaxTime} start_game={start_game} name={name} showGameSettings={showGameSettings} setRounds={setRounds} />
          </Col>
          <Col xs="12" md="5" >
            <PokeGame wildPokemonID={wildPokemonID} timeLeft={timeLeft} gameStarted={gameStarted} isLoading={isLoading} />
          </Col>
          <Col xs="12" md="4" >
            <InfoBar room={room} />
            <Messages messages={messages} name={name} />
            <Inputt message={message} setMessage={setMessage} sendMessage={sendMessage} />
          </Col>
        </Row>
        <Row>
          <div className='m-auto p-3' ><i>Made with <span role="img" aria-label="heart">❤️</span> by <strong>Team bruteforce</strong></i></div>
        </Row>
      </Container>
    </div>
  );
}
export default Chat;
