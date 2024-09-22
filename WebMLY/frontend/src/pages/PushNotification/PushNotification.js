import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PushNotification.css';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function PushNotification() {
    const [title, setTitle] = useState('');
    const [information, setInformation] = useState('');
    const [time, setTime] = useState('Now');
    const [type, setType] = useState('Notification');
    const [selectedZones, setSelectedZones] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    // Static zones list (can be fetched dynamically from API)
    const zones = [
        { id: 'zone1', name: 'Central Library' },
        { id: 'zone2', name: 'Duhig Tower' },
        { id: 'zone3', name: 'Forgan Smith Building' },
    ];

    const handleZoneChange = (e) => {
        const zoneId = e.target.value;
        if (e.target.checked) {
            setSelectedZones([...selectedZones, zoneId]);
        } else {
            setSelectedZones(selectedZones.filter(id => id !== zoneId));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure at least one zone is selected before submitting
        if (selectedZones.length === 0) {
            alert('Please select at least one zone');
            return;
        }

        const newNotification = {
            title: title,
            information: information,
            time: time,
            type: type,
            zones: selectedZones, 
        };

        // Add new notification
        setNotifications([...notifications, newNotification]);

        // Clear form fields
        setTitle('');
        setInformation('');
        setTime('Now');
        setType('Notification');
        setSelectedZones([]);
    };

    return (
        <div className="container">
            <Header />  {/* Include Header at the top */}

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
                    <label>Information</label>
                    <textarea
                        value={information}
                        onChange={(e) => setInformation(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div>
                    <label>Time</label>
                    <select 
                        value={time} 
                        onChange={(e) => setTime(e.target.value)}
                    >
                        <option value="Now">Now</option>
                        <option value="5 mins Later">5 mins Later</option>
                        <option value="10 mins Later">10 mins Later</option>
                    </select>
                </div>

                <div>
                    <label>Type</label>
                    <select 
                        value={type} 
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="Notification">Notification</option>
                        <option value="Alert">Alert</option>
                    </select>
                </div>

                <div>
                    <label>Select Zones:</label>
                    <div className="zones-list">
                        {zones.map((zone) => (
                            <div key={zone.id}>
                                <label htmlFor={zone.id}></label>
                                    <input
                                        type="checkbox"
                                        id={zone.id}
                                        value={zone.id}
                                        checked={selectedZones.includes(zone.id)}
                                        onChange={handleZoneChange}
                                    />
                                    {zone.name}    
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit">Push</button>
            </form>

            <Footer />  {/* Include Footer at the bottom */}
        </div>
    );
}

export default PushNotification;
