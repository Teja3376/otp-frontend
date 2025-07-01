// frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import EmailPage from './pages/EmailPage';
import OtpVerifyPage from './pages/OtpVerifyPage';
import Nav from './components/Nav';
import Home from './pages/Home';
import MainHead from './pages/MainHome';

function App() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [timer, setTimer] = useState(0);

  return (
    <Router>
      <Nav/>
      <Routes>
        <Route path= "/" element={<Home/>} />
        <Route path="/email" element={<EmailPage setEmail={setEmail} setTimer={setTimer} />} />
        <Route
          path="/verify"
          element={
            email ? (
              <OtpVerifyPage email={email} setToken={setToken} timer={timer} setTimer={setTimer} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/main"
          element={
            token ? (
              <MainHead setToken={setToken} setEmail={setEmail} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: '10px',
            background: '#fff',
            color: '#4f46e5',
            fontWeight: 'bold',
            fontSize: '1rem'
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </Router>
  );
}

export default App;
