import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './PushNotificationModal.css';

const PushNotificationModal = ({ zones, onClose }) => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [selectedZones, setSelectedZones] = useState([]);

    const isMultipleZones = Array.isArray(zones);

    // Pre-select the zone or all zones depending on the input
    useEffect(() => {
        if (!isMultipleZones && zones?.id) {
            setSelectedZones([zones.id]);  // Single zone case
        } else if (isMultipleZones) {
            setSelectedZones(zones.map((zone) => zone.id)); // All zones
        }
    }, [zones, isMultipleZones]);

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

    const handleZoneChange = (zoneId) => {
        setSelectedZones((prevSelectedZones) =>
            prevSelectedZones.includes(zoneId)
                ? prevSelectedZones.filter((id) => id !== zoneId)  // Remove zone
                : [...prevSelectedZones, zoneId]  // Add zone
        );
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>

                {/* Dynamic title based on single or multiple zones */}
                <h3>
                    {isMultipleZones
                        ? 'Send Notification to Multiple Zones'
                        : `Send Notification for ${zones?.name}`}
                </h3>

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

                    {/* If multiple zones, show a list of checkboxes */}
                    {isMultipleZones && (
                        <div>
                            <label>Select Zones:</label>
                            <div className="zones-list">
                                {zones.length === 0 ? (  // Check if the zones array is empty
                                    <p>No zones available for this organisation.</p>  // Display message if no zones
                                ) : (
                                    zones.map((zone) => (
                                        <div key={zone.id}>
                                            <input
                                                type="checkbox"
                                                id={zone.id}
                                                value={zone.id}
                                                checked={selectedZones.includes(zone.id)}
                                                onChange={() => handleZoneChange(zone.id)}
                                            />
                                            <label htmlFor={zone.id}>{zone.name}</label>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    <button type="submit">Send Notification</button>
                </form>
            </div>
        </div>
    );
};

export default PushNotificationModal;
