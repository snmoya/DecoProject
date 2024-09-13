import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";

const App = () => {
  return (
    <div className="app-container">
      <LoginForm />
      <div className="divider">
        <span className="line">--------------------------</span>
        <p>Don't have an account?</p>
        <span className="line">--------------------------</span>
      </div>
      <button className="create-account-button">Create your account</button>
    </div>
  );
};

export default App;