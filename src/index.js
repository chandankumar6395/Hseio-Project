import 'react-app-polyfill/stable';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { LicenseInfo } from '@mui/x-license-pro';
import reportWebVitals from './utils/reportWebVitals';
import App from './App';

import './mocks';

import { ThemeProvider } from './contexts/ThemeContext';

LicenseInfo.setLicenseKey(
  'afa72630478bdedd6733f221889b103dT1JERVI6NDMyOTMsRVhQSVJZPTE2ODM1ODYzNjUwMDAsS0VZVkVSU0lPTj0x'
);
ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
