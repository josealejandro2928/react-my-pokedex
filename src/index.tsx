import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App, { AppContextProvider } from './App/App';
import reportWebVitals from './reportWebVitals';
import { ModalDataContextProvider } from 'react-hook-modal';

import 'react-hook-modal/dist/index.css';
ReactDOM.render(
  <AppContextProvider>
    <ModalDataContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ModalDataContextProvider>
  </AppContextProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
