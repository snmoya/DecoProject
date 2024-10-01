// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home/Home';
import LoginSignup from './pages/Login/LoginSignup';
import PushNotification from './pages/PushNotification/PushNotification';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import { AuthProvider } from './contexts/AuthContext';

import './App.css';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginSignup />} />
                    <Route path="/signup" element={<LoginSignup />} />
                    <Route path="/push-notification" element={<PushNotification />} />
                    <Route path="*" element={<Home />} />
                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    );
};

export default App;