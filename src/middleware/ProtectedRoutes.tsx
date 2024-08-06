import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUserActions } from '../hooks/useLoginActions';

export const ProtectedRoute = ({ children }: any) => {
  const { logout } = useUserActions();
  const location = useLocation();

  const jwt = localStorage.getItem('jwt');

  if (location.pathname !== '/' && jwt && jwt === '') {
    logout();
    return <Navigate to={'/'} />;
  }

  if (location.pathname === '/' && jwt !== '') {
    return <Navigate to={'/users'} />;
  }

  return <Outlet />;
};
