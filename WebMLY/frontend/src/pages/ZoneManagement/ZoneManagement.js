import React, { useState } from 'react';
import './ZoneManagement.css';

const ZoneManagement = () => {
    // State to store all added zones
    const [zones, setZones] = useState([]); // Stores all zones
    const [zoneCount, setZoneCount] = useState(0); // Keeps track of the number of zones
    const [selectedZones, setSelectedZones] = useState([]); // Stores the IDs of selected zones

    // Function to add a new zone when the "Click to add new zones" button is clicked
    const addZone = () => {
        setZoneCount(prevCount => prevCount + 1); // Increment the zone count
        const newZone = {
            id: zoneCount + 1, // Assign a unique ID to the new zone
            address: 'not defined', // Default address
            lastNotification: 'N/A', // Default notification state
            notifications: [], // Initialize an empty array to store notifications
            expanded: false, // The zone is not expanded by default
            selected: false, // The zone is not selected by default
        };
        setZones([...zones, newZone]); // Add the new zone to the zones array
    };

    // Toggle the selection state of a zone using the checkbox
    const toggleSelectZone = (zoneId) => {
        const updatedZones = zones.map(zone =>
            zone.id === zoneId ? { ...zone, selected: !zone.selected } : zone
        );
        setZones(updatedZones);

        // Update the selectedZones list based on the current selection
        const isSelected = selectedZones.includes(zoneId);
        if (isSelected) {
            setSelectedZones(selectedZones.filter(id => id !== zoneId)); // Remove the zone from selected zones
        } else {
            setSelectedZones([...selectedZones, zoneId]); // Add the zone to the selected zones
        }
    };

    // Toggle the expanded state to show or hide the notifications for a zone
    const toggleDropdown = (zoneId) => {
        setZones(zones.map(zone =>
            zone.id === zoneId ? { ...zone, expanded: !zone.expanded } : zone
        ));
    };

    // Function to push a new notification to selected zones
    const pushNotification = () => {
        if (selectedZones.length === 0) {
            alert("Please select at least one zone before pushing a notification."); // Show an alert if no zone is selected
            return;
        }

        // Simulate adding a notification through an input prompt
        const newNotification = prompt("Enter the new notification content:");
        if (newNotification) {
            const updatedZones = zones.map(zone => {
                if (selectedZones.includes(zone.id)) {
                    const newNotifications = [...zone.notifications, newNotification];
                    return {
                        ...zone,
                        notifications: newNotifications, // Add the new notification to the zone's notifications array
                        lastNotification: newNotifications[newNotifications.length - 1], // Update the last notification field
                    };
                }
                return zone;
            });
            setZones(updatedZones); // Update the zones with new notifications
        }
    };

    return (
        <div className="container">
            <div className="zone-management">
                {/* Button to add new zones */}
                <div className="new-zone-box" onClick={addZone}>
                    <p>Click to add new zones</p>
                </div>

                {/* List of zones */}
                <div id="zone-list">
                    {zones.map(zone => (
                        <div key={zone.id} className={`zone-box ${zone.expanded ? 'expanded' : ''}`}>
                            {/* Checkbox to select a zone */}
                            <input
                                type="checkbox"
                                checked={zone.selected}
                                onChange={() => toggleSelectZone(zone.id)}
                                style={{ position: 'absolute', top: 10, right: 10 }}
                            />
                            <p>Zone {zone.id}</p>
                            <p>Address: {zone.address}</p>
                            <p>Last notification: {zone.lastNotification || "N/A"}</p>

                            {/* See more button to expand/collapse the notifications */}
                            <div>
                                <button className="see-more" onClick={() => toggleDropdown(zone.id)}>See more</button>
                            </div>

                            {/* Conditionally render the notification list if the zone is expanded */}
                            {zone.expanded && (
                                <div className="dropdown-content">
                                    <h4>All Notifications:</h4>
                                    {zone.notifications.length > 0 ? (
                                        zone.notifications.map((notification, index) => (
                                            <p key={index}>{notification}</p>
                                        ))
                                    ) : (
                                        <p>No notifications available</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Push notification button */}
            <div className="right-section">
                <button className="push-notification" onClick={pushNotification}>
                    Push a New Notification
                </button>
            </div>
        </div>
    );
};

export default ZoneManagement;
