import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <div id="headerDiv">
      <h1 id="mainHeading">Covid Dashboard</h1>
      <p className= "author">Create by Tan,Linh,Nikki,Ryan,Ali</p>
    </div>

    <App />

    <div id="footerDiv"></div>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
