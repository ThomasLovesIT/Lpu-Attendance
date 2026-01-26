import React, { useState, useEffect } from 'react';
// 1. Import Navigate
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 


import TimeIn from './pages/TimeInPage.jsx';
import TimeOut from './pages/TimeOutPage.jsx';

const App = () => {
  const [isThrottled, setIsThrottled] = useState(false);
  

  useEffect(() => {
    const handleRateLimit = () => setIsThrottled(true);
    window.addEventListener("rate-limited", handleRateLimit);
    return () => window.removeEventListener("rate-limited", handleRateLimit);
  }, []);

  return (
    <div data-theme="forest" className="min-h-screen bg-base-300">
      
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#171212',
            color: '#00FF9D',
            border: '1px solid rgba(0,255,157,0.2)'
          },
        }}
      />

    

      <div className="w-full">
        <Routes>
          <Route path="/" element={<Navigate to="/timein" replace />} />
          <Route path="/timein" element={<TimeIn />} />
          <Route path="/timeout" element={<TimeOut />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes> 
      </div>
    </div>
  );
};

export default App;