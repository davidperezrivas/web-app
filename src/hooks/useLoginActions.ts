import { closeSesion, createLoginUser } from '../store/login/slice';
import { Login } from '../store/login/models/login.model';
import { useAppDispatch } from './store';

export const useUserActions = () => {
  const dispatch = useAppDispatch();

  const loginUser = (userData: Login) => {
    dispatch(createLoginUser(userData));
  };

  const logout = () => {
    dispatch(closeSesion());
  };

  return { loginUser, logout };
};
