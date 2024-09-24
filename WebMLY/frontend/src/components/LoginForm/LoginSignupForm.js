import React, { useState } from 'react';
import axios from 'axios';

import './LoginSignupForm.css';

const LoginForm = ({ isLoginPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [organisationName, setOrganisationName] = useState('');
  const [message, setMessage] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!username || !password) {
      alert('All fields are required');
      return;
    }

    try { 
      const response = await axios.post('/api/login', {
        username,
        password
      });

      // Successful login
      if (response.status === 200) {
        window.location.href = '/home';   // TODO
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert('ERROR: Logging in');
      }
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!username || !password || !confirmPassword) {
      alert('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Handle submission logic
    try {
      const response = await axios.post('/api/signup', {
        username,
        password,
        confirmPassword,
        organisationName
      });

      setMessage(response.data.message);
      setUsername('');
      setPassword('');
      window.location.href = '/login';
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert('ERROR: Registering user');
      }
    }
  }

  return (
    <form onSubmit={isLoginPage ? handleLoginSubmit : handleSignupSubmit} className="login-form">
      <h2>{isLoginPage ? 'Login' : 'Sign Up'}</h2>

      <label>
        <small>Username</small>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>

      <label>
        <small>Password</small>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      {!isLoginPage && (
        <div>
          <label>
            <small>Confirm Password</small>
            <input
              type='password'
              placeholder='Enter your password again'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>

          <label>
            <small>Organisation's Name</small>
            <input
              type='text'
              placeholder="Enter your organisation's name"
              value={organisationName}
              onChange={(e) => setOrganisationName(e.target.value)}
              required
            />
          </label>
        </div>
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

      {message && <p id='success-message'>{message}</p>}
    </form>
  );
};

export default LoginForm;