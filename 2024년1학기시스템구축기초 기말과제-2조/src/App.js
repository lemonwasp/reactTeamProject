import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './Login/LoginPage';
import HomePage from './HomeP/HomePage';
import PeoplePage from './People/PeoplePage';
import IntroducePage from './Introduce/IntroducePage';
import EventsBoardPage from './EventsBoard/EventsBoardPage';
import CreatePost from './components/CreatePost';
import PrivateRoute from './components/PrivateRoute';
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
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/people"
          element={
            <PrivateRoute>
              <PeoplePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/introduce"
          element={
            <PrivateRoute>
              <IntroducePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/events-board"
          element={
            <PrivateRoute>
              <EventsBoardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
