import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './Login/LoginPage';
import HomePage from './HomeP/HomePage';
import PeoplePage from './People/PeoplePage';
import IntroducePage from './Introduce/IntroducePage';
import EventsBoardPage from './Events Board/EventsBoardPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/introduce" element={<IntroducePage />} />
          <Route path="/events-board" element={<EventsBoardPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

const Layout = ({ children }) => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/login' && <NavBar />}
      {children}
    </>
  );
};

export default App;
