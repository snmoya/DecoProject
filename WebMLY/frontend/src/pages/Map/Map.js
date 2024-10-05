import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import axios from 'axios';

import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

const Map = () => {
    const featureGroupRef = useRef();

    const [zones, setZones] = useState([]);

    // Fetch zones from API
    useEffect(() => {
        const fetchZones = async () => {
            const response = await axios.get('/api/zones');
            setZones(response.data);
        };

        fetchZones();
    }, []);

    // Handle zone creation
    const handleZoneCreated = async (e) => {
        const { layerType, layer } = e;
        if (layerType === 'polygon') {
            // Extract polygon coordinates and reverse them to LON LAT
            const coordinates = layer.getLatLngs()[0].map((latLng) => [latLng.lng, latLng.lat]);

            // Ensure the polygon is closed by adding the first point as the last point
            if (coordinates[0] !== coordinates[coordinates.length - 1]) {
                coordinates.push(coordinates[0]);  // Close the polygon
            }

            const newZone = {
                polygon: coordinates,  // Use the closed polygon
                org_id: 1,
                name: 'New Zone',
                address: 'New Address'
            };

            // Save the new zone to the backend
            await axios.post('/api/zones', newZone);
            setZones((prevZones) => [...prevZones, newZone]);
        }
    };

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

            {/* FeatureGroup to manage layers */}
            <FeatureGroup ref={featureGroupRef}>
                {/* Add Leaflet Draw for creating new zones */}
                <EditControl
                    position="topright"
                    onCreated={handleZoneCreated}
                    draw={{
                        rectangle: false,
                        circle: false,
                        circlemarker: false,
                        polyline: false
                    }}
                />
            </FeatureGroup>
        </MapContainer>
    )
}

export default Map;