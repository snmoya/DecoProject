import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

import './Home.css';

function Home() {
    const { orgId } = useContext(AuthContext);

    return (
        <div className="home-container">
            <section className="heroSection"></section>

            <section className="contentSection">
                <h1>Enhanced Versatile Alert Notification</h1>
                <p>The place for organisations to manage zones and push notifications</p>
                <Link to={orgId ? '/map' : '/login'}>
                    <button>Start Now</button>
                </Link>
            </section>
        </div>
    );
}

export default Home;