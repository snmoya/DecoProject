// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home/Home';
import LoginSignup from './pages/Login/LoginSignup';
import PushNotification from './pages/PushNotification/PushNotification';
import Map from './pages/Map/Map';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import { AuthProvider } from './contexts/AuthContext';

import './App.css';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginSignup />} />
                    <Route path="/signup" element={<LoginSignup />} />
                    <Route path="/push-notification" element={<PushNotification />} />
                    <Route path="/map" element={<Map />} />
                    <Route path="*" element={<Home />} />
                </Routes>
                <Footer />
            </AuthProvider>
        </Router>
    );
};

export default App;