import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ children }: any) => {
  const location = useLocation();

  const jwt = localStorage.getItem('jwt');

  if (location.pathname !== '/' && jwt && jwt === '') {
    return <Navigate to={'/'} />;
  }

  if (location.pathname === '/' && jwt !== '') {
    return <Navigate to={'/users'} />;
  }

  return <Outlet />;
};
