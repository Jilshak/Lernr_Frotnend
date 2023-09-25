import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function AdminRouteGuard({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const access = jwtDecode(token);

    if (!access.is_superuser) {
      navigate('/');
    }
  }, [navigate]);

  return children;
}

export default AdminRouteGuard;
