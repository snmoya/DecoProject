// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import ZoneManagement from "./components/Zone Management/ZoneManagement";

function App() {
  return (
    <div>
      {/*<Home />*/}
        <ZoneManagement />
    </div>
  );
}

export default App;