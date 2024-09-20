import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [message, setMessage] = useState('');

    // Receive the message from the backend
    useEffect(() => {
        axios.get('/api')
            .then(response => setMessage(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="container">
            {/* <nav className="navBar">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
            </nav> */}
            <section className="heroSection">
                <button id='get-message-button' onClick={() => alert(message)}>Click to see the message from the backend</button>
            </section>
            <section className="contentSection">
                <h1>Welcome to MLY</h1>
                <p>The place for organisations to manage zones and push notifications</p>
                <Link to="/login">
                    <button>Sign up/in to strat</button>
                </Link>
            </section>
            {/* <footer className="footer">
                © 2024 DECO3801/7381
            </footer> */}
        </div>
    );
}

export default Home;