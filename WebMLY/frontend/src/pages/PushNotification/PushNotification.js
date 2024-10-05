import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

import './PushNotification.css';

function PushNotification() {
    const { orgId } = useContext(AuthContext);

    const [zones, setZones] = useState([]);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [selectedZones, setSelectedZones] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch the list of zones
    useEffect(() => {
        const fetchZones = async () => {
            if (!orgId) return;

            try {
                setIsLoading(true);

                // Fetch all zones of current organisation
                const response = await axios.get(`/api/zones?orgId=${orgId}`);
                setZones(response.data);
            } catch (error) {
                console.error('ERROR: Fetching zones:', error);
                alert('Failed to load zones:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchZones();
    }, [orgId]);     // Run once when the component mounts

    // Handle zone selection change
    const handleZoneChange = (e) => {
        const zoneId = String(e.target.value); // Ensure zoneId is a string

        // Use the callback version of setState to ensure you're working with the latest state
        setSelectedZones((prevSelectedZones) => {
            let updatedZones;
            if (e.target.checked) {
                updatedZones = [...prevSelectedZones, zoneId];
            } else {
                updatedZones = prevSelectedZones.filter((id) => id !== zoneId);
            }

            console.log('Updated selected zones:', updatedZones); // This will log the updated state
            return updatedZones; // Return the updated state
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure at least one zone is selected before submitting
        if (selectedZones.length === 0) {
            alert('Please select at least one zone');
            return;
        }

        try {
            // API request to push new notification
            const response = await axios.post('/api/notifications', {
                title,
                message,
                zones: selectedZones,
            });

            if (response.status === 201) {
                alert('Notification pushed successfully!');

                // Clear the form
                setTitle('');
                setMessage('');
                setSelectedZones([]);
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.error);
            } else {
                alert('ERROR: Pushing notifications');
            }
        }
    };

    return (
        <div className="container">
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

                <div>
                    <label>Select Zones:</label>
                    <div className="zones-list">
                        {isLoading ? (
                            <p>Loading zones...</p>  // Show loading message while fetching zones
                        ) : zones.length === 0 ? (
                            <p>No zones available for this organization. Please add new zone!</p>  // Show message if no zones found
                        ) : (
                            zones.map((zone) => (
                                <div key={zone.id}>
                                    <input
                                        type="checkbox"
                                        id={zone.id}
                                        value={zone.id}
                                        checked={selectedZones.includes(String(zone.id))}
                                        onChange={handleZoneChange}
                                    />
                                    <label htmlFor={zone.id}>{zone.name}</label>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <button type="submit">Push</button>
            </form>
        </div>
    );
}

export default PushNotification;
