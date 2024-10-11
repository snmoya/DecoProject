import React from 'react';
import './ZoneList.css';

const ZoneList = ({ zones, onZoneClick }) => {
    return (
        <div className="zone-list-container">
            <h3>Zone List</h3>
            <ul className="zone-list">
                {zones.map((zone) => (
                    <li key={zone.id} onClick={() => onZoneClick(zone)}>
                        <h4>{zone.name}</h4>
                        <p>{zone.address}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ZoneList;
