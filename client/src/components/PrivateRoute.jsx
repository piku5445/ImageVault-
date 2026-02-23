import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');

  const location = useLocation();

  if (!token || !name) {
    return <Navigate to="/landing" replace state={{ from: location }} />;
  }

  return children;
}

export default PrivateRoute;
