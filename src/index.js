import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDSjUgcZJgVaXAnFLkQgvv8CBMLreO6yCU",
  authDomain: "lets-find-dinner.firebaseapp.com",
  projectId: "lets-find-dinner",
  storageBucket: "lets-find-dinner.appspot.com",
  messagingSenderId: "257731440186",
  appId: "1:257731440186:web:42aa4c3756372abf648f03"
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


