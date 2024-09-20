import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import './Login.css';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="app-container">
      <LoginForm />
      <div className="divider">
        <span className="line">--------------------------</span>
        <p>Don't have an account?</p>
        <span className="line">--------------------------</span>
      </div>
      <Link to="/signup">
        <button className="create-account-button">Create your account</button>
      </Link>
    </div>
  );
};

export default App;