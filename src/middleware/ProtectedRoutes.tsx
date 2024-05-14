import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/store';

export const ProtectedRoute = ({ children }: any) => {
  const location = useLocation();

  const login = useAppSelector((state) => state.login);

  if (location.pathname !== '/' && login.jwt === '') {
    return <Navigate to={'/'} />;
  }

  if (location.pathname === '/' && login.jwt !== '') {
    return <Navigate to={'/users'} />;
  }

  return <Outlet />;
};
