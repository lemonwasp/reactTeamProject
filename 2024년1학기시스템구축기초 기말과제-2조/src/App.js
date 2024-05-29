import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PeoplePage from './pages/PeoplePage';
import IntroducePage from './pages/IntroducePage';
import EventsBoardPage from './pages/EventsBoardPage';
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
