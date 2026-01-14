// main.jsx (Correct Code)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
// 1. Import the BrowserRouter from the router library
import { BrowserRouter } from 'react-router-dom'; 
import { AuthContextProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. WRAP the App component with BrowserRouter */}
    <AuthContextProvider>
    <BrowserRouter>
      <App /> 
    </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>,
);