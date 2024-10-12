import React, { useState } from 'react';
import axios from 'axios';

import './FeedbackModal.css';

const FeedbackModal = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // * Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        console.log("Submitting feedback:", { email, feedback });

        try {
            const response = await axios.post('/api/feedback', { email, feedback });
            if (response.status === 201) {
                alert('Thank you for your feedback!');
                setEmail('');
                setFeedback('');
                onClose();  // Close the modal
            }
        } catch (error) {
            alert('Failed to submit feedback.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="feedback-modal">
            <div className="feedback-modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <h3>Report an Issue or Send Feedback</h3>

                <form onSubmit={handleSubmit}>
                    <label>Your Email</label>
                    <input 
                        type='email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    ></input>

                    <label>Feedback or Issue</label>
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        required
                    ></textarea>

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FeedbackModal;
