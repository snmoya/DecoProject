import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <div className="Footer">
            <div className="navigation">
                <Link to="/Help Center">Help Center</Link>
                <Link to="/Terms of Service">Terms of Service</Link>
                <Link to="/Privacy Policy">Privacy Policy</Link>
            </div>
        </div>
    );
}

export default Footer;
