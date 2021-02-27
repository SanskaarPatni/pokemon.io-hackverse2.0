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
let socket;
const Chat = ({ location }) => {
  const [darkMode, setDarkMode] = useState(getInitialMode());
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
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
  }, []);

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
        socket.emit('sendMessage', message, () => setMessage(''));
      }
    }
  }
  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <Navbar setDarkMode={setDarkMode} darkMode={darkMode} />
      <Container fluid={true}>
      
          <Col xs="12" md="4" >
            <InfoBar room={room} />
            <Messages messages={messages} name={name} />
            <Inputt message={message} setMessage={setMessage} sendMessage={sendMessage} />
          </Col>
        <Row>
          <div className='m-auto p-3' ><i>Made with <span role="img" aria-label="heart">❤️</span> by <strong>Team bruteforce</strong></i></div>
        </Row>
      </Container>
    </div>
  );
}
export default Chat;
