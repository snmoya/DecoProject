import React, { useState } from 'react';
import axios from 'axios';

import './PushNotificationModal.css';

const PushNotificationModal = ({ zone, onClose }) => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [selectedZones, setSelectedZones] = useState([zone.id]);  // Pre-select the zone

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/notifications', {
                title,
                message,
                zones: selectedZones,
            });

            if (response.status === 201) {
                alert('Notification pushed successfully!');
                setTitle('');
                setMessage('');
                setSelectedZones([]);
                onClose();  // Close the modal after successful submission
            }
        } catch (error) {
            alert('Failed to push notification.');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h3>Send Notification for {zone.name}</h3>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <button type="submit">Send Notification</button>
                </form>
            </div>
        </div>
    );
};

export default PushNotificationModal;
