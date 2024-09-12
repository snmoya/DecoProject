import React from 'react';
import './LoginForm.css';

const LoginForm = () => {
  return (
    <form className="login-form">
      <h2>Sign in</h2>
      <label>
        <small>Email or mobile phone number</small>
        <input type="text" placeholder="" />
      </label>
      <label>
        <small>Your password</small>
        <input type="password" placeholder="" />
      </label>
      <button type="submit" className="login-button">Log in</button>
      <p className="terms">
        By continuing, you agree to the <span className="underline">Terms of use</span> and <span className="underline">Privacy Policy</span>.
      </p>
      <div className="form-other">
        <ul>
          <li className="underline">Other issue with sign in</li>
          <li className="underline">Forget your password</li>
        </ul>
      </div>
    </form>
  );
};

export default LoginForm;