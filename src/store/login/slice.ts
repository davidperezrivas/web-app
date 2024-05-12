import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Login } from './models/login.model';

const initialState: Login = {
  jwt: '',
  isLogin: false,
  menu: [],
  user: '',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    createLoginUser: (state, action: PayloadAction<Login>) => {
      return (state = action.payload);
    },

    closeSesion: (state) => {
      return (state = initialState);
    },
  },
});

export default loginSlice.reducer;
export const { createLoginUser, closeSesion } = loginSlice.actions;
