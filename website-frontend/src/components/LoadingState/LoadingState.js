import React from "react";

import './LoadingState.css';

const LoadingState = () => {
    return (
        <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    );
};

export default LoadingState;