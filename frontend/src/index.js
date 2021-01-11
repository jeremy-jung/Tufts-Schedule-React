import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import {
  BrowserRouter
} from "react-router-dom";
import initFBSDK from './components/views/scripts/fb.js';

/* load React App after FB SDK is received */
initFBSDK().then(
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root')
  )
);