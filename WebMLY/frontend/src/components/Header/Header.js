import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <div className="header">
            <div className="navigation">
                <NavLink to="/zones-management" activeClassName="active-link">Zone Manage</NavLink>
                <NavLink to="/map" activeClassName="active-link">Zone Map</NavLink>
                <NavLink to="/push-notification" activeClassName="active-link">Push Notification</NavLink>
            </div>
            <div className="user-info">
                <img src={require('../../Images/user-icon.png')} alt="User" />
                <NavLink to="/login">Log out</NavLink>
            </div>
        </div>
    );
}

export default Header;
