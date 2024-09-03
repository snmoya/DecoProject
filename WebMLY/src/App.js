// App.js

import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <nav className="navBar">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
      <section className="heroSection">
        <h1>Welcome to MLY</h1>
        <p>The place for organizations</p>
        <button>Log In</button>
      </section>
      <section className="contentSection">
        <div className="card">
          <h3>Create Zones</h3>
          <p>In here you can create zones.</p>
        </div>
        <div className="card">
          <h3>Manage Zones</h3>
          <p>In here you can manage some zones.</p>
        </div>
        <div className="card">
          <h3>Send Notifications</h3>
          <p>Here you can Send notification to the users in the zone.</p>
        </div>
      </section>
      <footer className="footer">
        © 2024 DECO3801/7381
      </footer>
    </div>
  );
}

export default App;