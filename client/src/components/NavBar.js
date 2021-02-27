import React from 'react';
import { ReactComponent as ExitIcon } from '../icons/exit3.svg';

const Navbar = ({ setDarkMode, darkMode }) => {
    return (
        <nav className="navbarr">
            <img src="./pokemonio.png" alt="pokemon.io" className="navbar-img"></img>
            <ul className="navbar-navv">
                <div className="toggle-container nav-itemm">
                    <span style={{ color: darkMode ? "grey" : "yellow" }}>☀︎</span>
                    <span className="toggle">
                        <input
                            checked={darkMode}
                            onChange={() => setDarkMode(prevMode => !prevMode)}
                            id="checkbox"
                            className="checkbox"
                            type="checkbox"
                        />
                        <label htmlFor="checkbox" />
                    </span>
                    <span style={{ color: darkMode ? "slateblue" : "grey" }}>☾</span>
                </div>
                <li className="nav-itemm">
                    <a className="icon-button" href="/">
                        <ExitIcon />
                    </a>
                </li>
            </ul>
        </nav>
    );
}
export default Navbar;