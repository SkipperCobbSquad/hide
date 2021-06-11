import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './icofont.min.css'
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import io from 'socket.io-client'

export const socket = io('ws://localhost:5000')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
