import React, { useState } from 'react';
import './ZoneManagement.css';

const ZoneManagement = () => {
    const [zones, setZones] = useState([]); // Stores all zones
    const [zoneCount, setZoneCount] = useState(0);

    const addZone = () => {
        setZoneCount(prevCount => prevCount + 1);
        const newZone = {
            id: zoneCount + 1,
            address: 'not defined',
            lastNotification: 'N/A',
            notification: 'null',
            expanded: false,
            title: 'This is the title',
            content: 'This is the detailed notification information.'
        };
        setZones([...zones, newZone]);
    };

    const toggleDropdown = (zoneId) => {
        setZones(zones.map(zone =>
            zone.id === zoneId ? { ...zone, expanded: !zone.expanded } : zone
        ));
    };

    const pushNotification = () => {
        alert("Send notification: Function not implemented");
    };

    return (
        <div className="container">
            <div className="zone-management">
                <div className="new-zone-box" onClick={addZone}>
                    <p>Click to add new zones</p>
                </div>
                <div id="zone-list">
                    {zones.map(zone => (
                        <div key={zone.id} className={`zone-box ${zone.expanded ? 'expanded' : ''}`}>
                            <p>Zone {zone.id}</p>
                            <p>Address: {zone.address}</p>
                            <p>Last notification: {zone.lastNotification}</p>
                            
                            <div>
                                <button className="see-more" onClick={() => toggleDropdown(zone.id)}>See more</button>
                            </div>

                            <p>Notification: {zone.notification}</p>
                            {zone.expanded && (
                                <div className="dropdown-content">
                                    <h4>Title: {zone.title}</h4>
                                    <p>Content: {zone.content}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="right-section">
                <button className="push-notification" onClick={pushNotification}>
                    Push a New Notification
                </button>
            </div>
        </div>
    );
};

export default ZoneManagement;
