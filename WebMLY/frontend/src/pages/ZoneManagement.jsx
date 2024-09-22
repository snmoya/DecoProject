import React, { useState } from 'react';
import './ZoneManagement.css';

// Notification button component
const NotificationButton = ({ onNotify, selectedZones }) => {
    const handleClick = () => {
        // If no zones are selected, alert the user
        if (selectedZones.length === 0) {
            alert('Please select at least one zone.');
            return;
        }

        // Simulate filling in information from a new webpage
        const newNotification = prompt("Enter new notification text:");
        if (newNotification) {
            onNotify(newNotification);
        }
    };

    return (
        <button onClick={handleClick} className="notification-btn">
            + Push a new notification
        </button>
    );
};

// Add new zone button component
const AddZoneButton = ({ onAddZone }) => {
    const handleClick = () => {
        // Add a new zone with default information
        onAddZone({
            name: 'Library',
            location: 'Location: null',
            notifications: ['Notification: sample text']
        });
    };

    return (
        <div className="add-zone-btn" onClick={handleClick}>
            + Click to add a new zone
        </div>
    );
};

// Zone card component
const ZoneCard = ({ zone, selected, onSelect }) => {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className={`zone-card ${selected ? 'selected' : ''}`} onClick={onSelect}>
            <input
                type="checkbox"
                checked={selected}
                className="zone-checkbox"
                readOnly
            />
            <div className="zone-header">
                <h3>{zone.name}</h3>
            </div>
            <p>{zone.location}</p>
            <p>Last notification</p>
            <div className="notification-box">
                {/* Display either the most recent notification or all notifications */}
                {!showMore ? (
                    <p>{zone.notifications[zone.notifications.length - 1]}</p>
                ) : (
                    <div>
                        {zone.notifications.map((notification, index) => (
                            <p key={index}>{notification}</p>
                        ))}
                    </div>
                )}
            </div>
            <button onClick={() => setShowMore(!showMore)}>
                {showMore ? 'See less' : 'See more'}
            </button>
        </div>
    );
};

// Main ZoneManagement component
const ZoneManagement = () => {
    const [zones, setZones] = useState([]); // Stores all zones
    const [selectedZones, setSelectedZones] = useState([]); // Tracks which zones are selected

    // Adds a new zone to the zones array
    const addNewZone = (newZone) => {
        setZones([...zones, newZone]);
    };

    // Toggles the selection of a zone
    const handleSelectZone = (index) => {
        if (selectedZones.includes(index)) {
            setSelectedZones(selectedZones.filter(i => i !== index));
        } else {
            setSelectedZones([...selectedZones, index]);
        }
    };

    // Handles notifications for selected zones
    const handleNotification = (newNotification) => {
        setZones(
            zones.map((zone, index) =>
                selectedZones.includes(index)
                    ? { ...zone, notifications: [...zone.notifications, newNotification] }
                    : zone
            )
        );
        setSelectedZones([]); // Clear selected zones after notification
    };

    return (
        <div className="zones-management">
            <h1>Zones management</h1>
            <div className="zone-list">
                {zones.map((zone, index) => (
                    <ZoneCard
                        key={index}
                        zone={zone}
                        selected={selectedZones.includes(index)}
                        onSelect={() => handleSelectZone(index)}
                    />
                ))}
                <AddZoneButton onAddZone={addNewZone} />
            </div>
            <NotificationButton onNotify={handleNotification} selectedZones={selectedZones} />
        </div>
    );
};

export default ZoneManagement;
