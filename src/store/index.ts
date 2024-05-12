import { configureStore, combineReducers } from '@reduxjs/toolkit';
import loginReducer from './login/slice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whiteList: [],
};

const rootReducer = combineReducers({
  login: loginReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
