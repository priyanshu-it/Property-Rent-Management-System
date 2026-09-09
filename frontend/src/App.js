import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import ContactPage from './components/ContactPage';

import Register from './components/Register';
import Login from './components/Login';

import Dashboard from './components/Dashboard';
import MyFlats from './components/MyFlats';

import Navbar from './pages/Navbar';
import Contact from './pages/contact';
import FlatInfo from './data/FlatInfo';

import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username'));

  const logout = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  return (
    <Router>
      <Navbar token={token} logout={logout} username={username} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/flat-info" element={<FlatInfo />} />

        <Route path="/register" element={!token ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!token ? <Login setToken={setToken} setUsername={setUsername} /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={token ? <Dashboard token={token} /> : <Navigate to="/login" />} />
        <Route path="/myflats" element={token ? <MyFlats token={token} /> : <Navigate to="/login" />} />
        <Route path="/contactPage" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
// line 48