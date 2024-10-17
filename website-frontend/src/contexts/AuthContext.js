// src/contexts/AuthContext.js
import React, { createContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [orgId, setOrgId] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (token) => {
        localStorage.setItem('token', token);
        handleToken(token);
    };

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setOrgId(null);
        
        navigate('/login');
    }, [navigate]);

    // Decode the token & Extract org id
    const handleToken = useCallback((token) => {
        try {
            const decodedToken = jwtDecode(token);
            setOrgId(decodedToken.orgId);
            setIsAuthenticated(true);
        } catch (error) {
            console.log('Invalid token, logging out');
            logout();
        } finally {
            setLoading(false);
        }
    }, [logout]);

    // useEffect to check for token on mount
    useEffect(() => {
        const initializeAuth = () => {
            const token = localStorage.getItem('token');
            if (token) {
                handleToken(token);  // Use the common function to handle token
            } else {
                setLoading(false);
            }
        };

        initializeAuth();  // Call the function inside useEffect
    }, [handleToken]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, orgId, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
