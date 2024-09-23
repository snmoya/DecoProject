import React from 'react';

import './LoginSignupForm.css';

const LoginForm = ( {isLoginPage }) => {
  return (
    <form className="login-form">
      <h2>{isLoginPage ? 'Login' : 'Sign Up'}</h2>

      <label>
        <small>Username</small>
        <input type="text" placeholder="Enter your username" />
      </label>

      <label>
        <small>Password</small>
        <input type="password" placeholder="Enter your password" />
      </label>

      {!isLoginPage && (
        <label>
          <small>Confirm Password</small>
          <input type='password' placeholder='Enter your password again' />
        </label>
      )}

      <button type="submit" className="login-button">{isLoginPage ? 'Login' : 'Sign Up'}</button>

      <p className="terms">
        By continuing, you agree to the <span className="underline">Terms of use</span> and <span className="underline">Privacy Policy</span>.
      </p>

      {isLoginPage && (
        <div className="form-other">
          <ul>
            <li className="underline">Other issue with sign in</li>
            <li className="underline">Forget your password</li>
          </ul>
        </div>
      )}
    </form>
  );
};

export default LoginForm;