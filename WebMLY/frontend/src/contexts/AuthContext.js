// src/contexts/AuthContext.js
import React, { createContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [orgId, setOrgId] = useState(null);

    const login = (token) => {
        localStorage.setItem('token', token);

        // Decode the token & Extract org id
        const decodedToken = jwtDecode(token);
        setOrgId(decodedToken.orgId);

        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setOrgId(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, orgId }}>
            {children}
        </AuthContext.Provider>
    );
};
