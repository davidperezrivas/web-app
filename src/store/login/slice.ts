import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Login } from './models/login.model';

const initialState: Login = {
  isLogin: false,
  menu: [],
  user: '',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    createLoginUser: (state, action: PayloadAction<Login>) => {
      state.isLogin = action.payload.isLogin;
      state.menu = action.payload.menu;
      state.user = action.payload.user;

      return state;
    },

    closeSesion: (state) => {
      return (state = initialState);
    },
  },
});

export default loginSlice.reducer;
export const { createLoginUser, closeSesion } = loginSlice.actions;
