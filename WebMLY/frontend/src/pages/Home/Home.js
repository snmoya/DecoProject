import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [message, setMessage] = useState('');

    // Receive the message from the backend
    useEffect(() => {
        // Access the API key from environment variables
        const apiKey = process.env.REACT_APP_API_KEY;

        axios.get('/api', {
            headers: {
                'x-api-key': apiKey
            }
        })
            .then(response => {
                setMessage(response.data.message);
            })
            .catch(error => {
                console.log('Error fetching message:', error);
                setMessage('Error fetching message from backend!');
            });
    }, []);

    return (
        <div className="container">
            <section className="heroSection">
                <button id='get-message-button' onClick={() => alert(message)}>Click to see the message from the backend</button>
            </section>

            <section className="contentSection">
                <h1>Welcome to MLY</h1>
                <p>The place for organisations to manage zones and push notifications</p>
                <Link to="/login">
                    <button>Start Now</button>
                </Link>
            </section>
        </div>
    );
}

export default Home;