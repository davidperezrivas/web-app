import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './routes/App';

import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { store } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
const queryClient = new QueryClient();
const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        ,
      </QueryClientProvider>
      ,
    </Provider>
    ,
  </PersistGate>,
);
