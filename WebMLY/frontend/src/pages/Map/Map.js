import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import axios from 'axios';

import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

const Map = () => {
    const [zones, setZones] = useState([]);

    // Fetch zones from API
    useEffect(() => {
        const fetchZones = async () => {
            const response = await axios.get('/api/zones');
            setZones(response.data);
        };

        fetchZones();
    }, []);

    return (
        <MapContainer center={[-27.497418, 153.013277]} zoom={18} style={{ height: 'calc(100vh - 100px)', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Render zones as polygons */}
            {zones.map(zone => (
                <Polygon
                    key={zone.id}
                    positions={zone.polygon.map(coord => [
                        parseFloat(coord[1].toFixed(5)), // Round to 5 decimal places if you want
                        parseFloat(coord[0].toFixed(5))
                    ])}
                    color='blue'
                    fillColor='lightblue'
                    fillOpacity={0.3}
                    onClick={() => alert(`Zone: ${zone.name}`)}
                >
                    <Popup>
                        <div>
                            <h4>{zone.name}</h4>
                            <p>Address: {zone.address}</p>
                        </div>
                    </Popup>
                </Polygon>
            ))}
        </MapContainer>
    )
}

export default Map;