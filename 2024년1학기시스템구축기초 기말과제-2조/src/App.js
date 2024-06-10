import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './Login/LoginPage';
import HomePage from './HomeP/HomePage';
import PeoplePage from './People/PeoplePage';
import IntroducePage from './Introduce/IntroducePage';
import EventsBoardPage from './EventsBoard/EventsBoardPage';
import CreatePost from './components/CreatePost';
import './App.css';

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/create-post' && <NavBar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/introduce" element={<IntroducePage />} />
        <Route path="/events-board" element={<EventsBoardPage />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </>
  );
};

export default App;
