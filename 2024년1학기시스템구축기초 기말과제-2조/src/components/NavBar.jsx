import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import peopleImage from '../assets/images/people.png';

const NavBar = () => {
  return (
    <header>
      <h1>
        <img src={peopleImage} alt="Team Logo" />
        Team Name
      </h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/home" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/people">People</NavLink>
          </li>
          <li>
            <NavLink to="/introduce">Introduce</NavLink>
          </li>
          <li>
            <NavLink to="/events-board">Events Board</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
