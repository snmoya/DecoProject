import React from 'react';

import './ZoneList.css';

const ZoneList = ({ zones, setShowZoneList }) => {
    return (
        <div className="zone-list-popup">
            <span 
                className="close-button" 
                onClick={() => setShowZoneList(false)}
            >
                &times;
            </span>

            <h3>Zone List</h3>

            <ul>
                {zones.length === 0 ? (
                    <p>No zones available</p>
                ) : (
                    zones.map((zone) => (
                        <li key={zone.id}>
                            {zone.name}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default ZoneList;
