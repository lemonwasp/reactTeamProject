import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('user'); // 간단한 인증 체크

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
