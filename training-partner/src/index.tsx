import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App/App';
import HomeChart from './Components/Pages/page_chart/page_chart';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('body') as HTMLElement
);
//const body = ReactDOM.createRoot(
//  document.getElementById('body') as HTMLElement);


root.render(
  <React.StrictMode>

    <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
