import React, { useState } from "react";
import { useLocation, Link } from 'react-router-dom';

import LoginSignupForm from "../../components/LoginSignupForm/LoginSignupForm";

import './LoginSignup.css';

const LoginSignup = () => {
    const location = useLocation();

    const isLoginPage = location.pathname === '/login';
    const [resetSignal, setResetSignal] = useState(false);

    const handleReset = () => {
        setResetSignal(prevSignal => !prevSignal);  // Toggle the signal
    };

    return (
        <div className="login-container">
            <LoginSignupForm isLoginPage={isLoginPage} resetSignal={resetSignal} handleReset={handleReset} />

            <div className="divider">
                <span className="line">--------------------------</span>
                <p>{isLoginPage ? 'Don\'t have an account?' : 'Already have the account?'}</p>
                <span className="line">--------------------------</span>
            </div>

            <Link to={isLoginPage ? '/signup' : '/login'}>
                <button onClick={handleReset} className="create-account-button">
                    {isLoginPage ? 'Create your account' : 'Login with your account'}
                </button>
            </Link>
        </div>
    );
};

export default LoginSignup;