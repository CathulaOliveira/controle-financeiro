import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Usuario from './pages/Usuario';
import Conta from './pages/Conta';
import * as apiCalls from './api/apiCalls';

const actions = {
  postConta: apiCalls.postConta
}

ReactDOM.render(
  <React.StrictMode>
    <Conta actions={actions} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
