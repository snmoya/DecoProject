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
                    <NavLink to="/map" activeClassName="active-link">Zone Map</NavLink>
                ) : (
                    <NavLink to="/home" activeClassName="active-link">Home</NavLink>
                )}
            </div>

            <div className="navigation" id="user-info">
                {/* <img src={require('../../Images/user-icon.png')} alt="User" /> */}
                {isAuthenticated ? (
                    <NavLink onClick={logout} to="/login">Log out</NavLink>
                ) : (
                    <NavLink to="/login">Login</NavLink>
                )}
            </div>
        </div>
    );
}

export default Header;
