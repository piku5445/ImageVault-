import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  const location = useLocation();

  if (!token || !email) {
    return <Navigate to="/landing" replace state={{ from: location }} />;
  }

  return children;
}

export default PrivateRoute;
