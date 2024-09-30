import React, { useState } from "react";
import { useLocation, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import LoginSignupForm from "../../components/LoginSignupForm/LoginSignupForm";

import './LoginSignup.css';

const LoginSignup = () => {
    const [accId, setAccId] = useState(null);
    const [orgId, setOrgId] = useState(null);

    const handleCheckLocalStorage = () => {
        // Get accId and orgId from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            alert('No token');
            return;
        }
        
        const decoded = jwtDecode(token); // Use a library like jwt-decode to parse the JWT payload

        const accId = decoded.accId;
        const orgId = decoded.orgId;

        if (accId && orgId) {
            setAccId(accId);
            setOrgId(orgId);
            alert(`accId: ${accId}, orgId: ${orgId}`);
        } else {
            alert('No accId or orgId found in localStorage');
        }
    };

    const location = useLocation();

    const isLoginPage = location.pathname === '/login';
    const [resetSignal, setResetSignal] = useState(false);

    const handleReset = () => {
        setResetSignal(prevSignal => !prevSignal);  // Toggle the signal
    };

    return (
        <div className="app-container">
            <LoginSignupForm isLoginPage={isLoginPage} resetSignal={resetSignal} handleReset={handleReset} />

            <div className="divider">
                <span className="line">--------------------------</span>
                <p>{isLoginPage ? 'Don\'t have an account?' : 'Already have the account?'}</p>
                <span className="line">--------------------------</span>
            </div>

            <button onClick={handleCheckLocalStorage}>Check LocalStorage for accId and orgId</button>

            <Link to={isLoginPage ? '/signup' : '/login'}>
                <button onClick={handleReset} className="create-account-button">
                    {isLoginPage ? 'Create your account' : 'Login with your account'}
                </button>
            </Link>
        </div>
    );
};

export default LoginSignup;