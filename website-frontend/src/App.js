// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Home from './pages/Home/Home';
import LoginSignup from './pages/Login/LoginSignup';
import Map from './pages/Map/Map';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import './App.css';
import ProtectedRoute from './contexts/ProtectedRoute';

const App = () => {
    return (
        <div className='container'>
            <Router>
                <AuthProvider>
                    <Header />
                    <Routes>
                        {/* Routes for all the web pages */}
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<LoginSignup />} />
                        <Route path="/signup" element={<LoginSignup />} />

                        {/* Protected route for accessing the map */}
                        <Route 
                            path="/map" 
                            element={
                                <ProtectedRoute>
                                    <Map />
                                </ProtectedRoute>
                            } 
                        />

                        {/* Route for invalid path */}
                        <Route path="*" element={<Home />} />
                    </Routes>
                    <Footer />
                </AuthProvider>
            </Router>
        </div>
    );
};

export default App;