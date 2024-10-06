import React, { useState, useEffect, useContext, useRef } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

import CreateZoneButton from '../../components/CreateZoneButton/CreateZoneButton';

import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import './Map.css';

const Map = () => {
    const featureGroupRef = useRef();
    const { orgId } = useContext(AuthContext);

    const [zones, setZones] = useState([]);
    const [newZone, setNewZone] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [zoneInfo, setZoneInfo] = useState({ name: '', address: '' });
    const [drawnLayer, setDrawnLayer] = useState(null);     // Hold reference to the drawn zone

    // * Fetch zones from API
    useEffect(() => {
        const fetchZones = async () => {
            const response = await axios.get(`/api/zones?orgId=${orgId}`);
            setZones(response.data);
        };

        if (orgId) {
            fetchZones();
        }
    }, [orgId]);

    // Reset form function to clean up the states
    const resetForm = () => {
        setShowPopup(false);
        setZoneInfo({ name: '', address: '' });
        setNewZone(null);
        setDrawnLayer(null);
    }

    // * Handle zone creation
    const handleZoneCreated = async (e) => {
        const { layerType, layer } = e;

        if (layerType === 'polygon') {
            // Extract polygon coordinates and reverse them to LON LAT
            const coordinates = layer.getLatLngs()[0].map((latLng) => [latLng.lng, latLng.lat]);

            // Ensure the polygon is closed by adding the first point as the last point
            if (coordinates[0] !== coordinates[coordinates.length - 1]) {
                coordinates.push(coordinates[0]);  // Close the polygon
            }

            setNewZone({
                polygon: coordinates
            });

            // Keep the reference to the drawn layer to remove it if cancellation
            setDrawnLayer(layer);

            // Show the popup to enter zone info
            setShowPopup(true);
        }
    };

    // * Handle form submission for the new zone
    const handleZoneSubmit = async (e) => {
        e.preventDefault();

        if (!orgId) {
            console.error('OrgId is missing!');
            alert('Failed to create the zone because orgId is missing.');
            return;
        }

        const zoneData = {
            polygon: newZone.polygon,
            name: zoneInfo.name,
            address: zoneInfo.address,
            org_id: orgId
        };

        console.log('Zone data:', zoneData);

        // Save the new zone to the backend
        await axios.post('/api/zones', zoneData);

        // Add the new zone to the list
        setZones((prevZone) => [...prevZone, zoneData]);

        // Reset the form and close the popup
        resetForm();
    }

    // * Handle cancel action (remove the drawn layer from the map)
    const handleCancel = () => {
        if (drawnLayer) {
            featureGroupRef.current.removeLayer(drawnLayer);
        }

        // Reset the form and close the popup
        resetForm();
    }

    return (
        <div>
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

                <CreateZoneButton />  {/* Add the custom button */}

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

            {/* Popup form to enter new zone info */}
            {showPopup && (
                <div>
                    <form onSubmit={handleZoneSubmit} className="popup-form">
                        <div className="popup-form-header">
                            <h3>Create New Zone</h3>

                            <button
                                type="button"
                                className="cancel-button"
                                onClick={handleCancel}
                            >
                                &times;  {/* This will display the 'X' */}
                            </button>
                        </div>

                        <label>Name:</label>
                        <input
                            type="text"
                            value={zoneInfo.name}
                            onChange={(e) => setZoneInfo({ ...zoneInfo, name: e.target.value })}
                            required
                        />

                        <label>Address:</label>
                        <input
                            type="text"
                            value={zoneInfo.address}
                            onChange={(e) => setZoneInfo({ ...zoneInfo, address: e.target.value })}
                            required
                        />

                        <button type="submit" className='save-button'>Save Zone</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Map;