import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

import './Header.css';

const Header = () => {
    const { isAuthenticated, logout, orgId } = useContext(AuthContext);
    const [orgName, setOrgName] = useState('');

    // * Fetch the organisation's name after login
    useEffect(() => {
        const fetchOrgName = async () => {
            try {
                if (orgId) {
                    const response = await axios.get(`/api/org/${orgId}`);
                    setOrgName(response.data.name);
                }
            } catch (error) {
                console.error('Error fetching organization name:', error);
            }
        };

        if (isAuthenticated) {
            fetchOrgName();
        }
    }, [isAuthenticated, orgId, setOrgName]);

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
                    <>
                        {/* Display organization name */}
                        <NavLink className="org-name">{orgName}</NavLink>

                        <NavLink onClick={logout} to="/login">
                            Log out
                        </NavLink>
                    </>
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
