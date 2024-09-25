import React from "react";
import { useLocation, Link } from 'react-router-dom';

import LoginSignupForm from "../../components/LoginSignupForm/LoginSignupForm";

import './LoginSignup.css';

const App = () => {
    const location = useLocation();

    const isLoginPage = location.pathname === '/login';

    return (
        <div className="app-container">
            <LoginSignupForm isLoginPage={isLoginPage} />

            <div className="divider">
                <span className="line">--------------------------</span>
                <p>{isLoginPage ? 'Don\'t have an account?' : 'Already have the account?'}</p>
                <span className="line">--------------------------</span>
            </div>

            <Link to={isLoginPage ? '/signup' : '/login'}>
                <button className="create-account-button">{isLoginPage ? 'Create your account' : 'Login with your account'}</button>
            </Link>
        </div>
    );
};

export default App;