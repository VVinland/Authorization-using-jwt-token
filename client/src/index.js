import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PersonStore from './store/PersonStore.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const Context = createContext(null);

root.render(
  <React.StrictMode>
    <Context.Provider value={{
      person: new PersonStore(),
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);