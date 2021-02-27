import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';
const Join = () => {
    const [name, setName] = useState(' ');
    const [room, setRoom] = useState(' ');
    return (
        <div className="showcase">
            <div className="showcase-top">
                <img src="./pokemonio.png" alt="pokemon.io" />
            </div>
            <div className="showcase-content">
                <h1>A Pokemon game for pokemon fans!</h1>
                <div><input placeholder="Name" type="text" onChange={(event) => setName(event.target.value)} /></div>
                <div><input placeholder="Room" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
                <Link onClick={event => (name!==' ' || room!==' ') ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="btnn mt-20 btnn-lg" type="submit">Play</button>
                </Link>
            </div>
        </div>
    )
}
export default Join;