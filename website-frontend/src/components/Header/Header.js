import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

import './Header.css';

function Header() {
    const { isAuthenticated, logout } = useContext(AuthContext);

    return (
        <div className="header">
            <div className="navigation">
                {isAuthenticated ? (
                    <NavLink 
                        to="/map" 
                        className={({ isActive }) => isActive ? "active-link" : ""}
                    >
                        Zone Map
                    </NavLink>
                ) : (
                    <NavLink 
                        to="/home" 
                        className={({ isActive }) => isActive ? "active-link" : ""}
                    >
                        Home
                    </NavLink>
                )}
            </div>

            <div className="navigation" id="user-info">
                {isAuthenticated ? (
                    <NavLink 
                        onClick={logout} 
                        to="/login"
                    >
                        Log out
                    </NavLink>
                ) : (
                    <NavLink 
                        to="/login"
                        className={({ isActive }) => isActive ? "active-link" : ""}
                    >
                        Login
                    </NavLink>
                )}
            </div>
        </div>
    );
}

export default Header;
