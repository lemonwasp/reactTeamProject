import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Login/LoginPage';
import HomePage from './HomeP/HomePage';
import PeoplePage from './People/PeoplePage';
import IntroducePage from './Introduce/IntroducePage';
import EventsBoardPage from './Events Board/EventsBoardPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/introduce" element={<IntroducePage />} />
        <Route path="/events-board" element={<EventsBoardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
