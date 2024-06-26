import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();

  return (
    <header>
      <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Team Logo" />
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
          {location.pathname === '/events-board' && (
            <li>
              <NavLink to="/create-post" className="create-post-button">
                Create Post
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
