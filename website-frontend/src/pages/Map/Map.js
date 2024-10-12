import React, { useState, useEffect, useContext, useRef } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

import ZoneList from '../../components/ZoneList/ZoneList';
import ControlButtons from '../../components/ControlButtons/ControlButtons';
import ZoneListToggle from '../../components/ControlButtons/ZoneListToggle';
import NewZoneModal from '../../components/NewZoneModal/NewZoneModal';
import PushNotificationModal from '../../components/PushNotificationModal/PushNotificationModal';
import ViewNotificationsModal from '../../components/ViewNotificationsModal/ViewNotificationsModal';

import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import './Map.css';

const Map = () => {
    const featureGroupRef = useRef();
    const { orgId } = useContext(AuthContext);

    const [zones, setZones] = useState([]);
    const [zoneInfo, setZoneInfo] = useState({ name: '', address: '', polygon: null });
    const [drawnLayer, setDrawnLayer] = useState(null);     // Hold reference to the drawn zone
    const [showZoneList, setShowZoneList] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [showPushNotificationModal, setShowPushNotificationModal] = useState(false);
    const [showAllNotificationsModal, setShowAllNotificationsModal] = useState(false);
    const [selectedZone, setSelectedZone] = useState(null);

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
        setZoneInfo({ name: '', address: '', polygon: null });
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

            setZoneInfo({
                ...zoneInfo,
                polygon: coordinates
            });

            // Keep the reference to the drawn layer to remove it if cancellation
            setDrawnLayer(layer);

            // Show the popup to enter zone info
            setShowPopup(true);
        }
    };

    // * Handle zone deletion
    const handleDeleteZone = async (zoneId) => {
        if (window.confirm("Are you sure you want to delete this zone?")) {
            try {
                await axios.delete(`/api/zones/${zoneId}`);

                // Remove the deleted zone from the state
                setZones((prevZones) => prevZones.filter((zone) => zone.id !== zoneId));

                // Remove the drawn layer from the map
                const layer = featureGroupRef.current.getLayers().find((layer) => layer.options.zoneId === zoneId);
                if (layer) {
                    featureGroupRef.current.removeLayer(layer);  // Remove the layer
                }

                alert('Zone deleted successfully');
            } catch (error) {
                console.error('Error deleting zone:', error);
                alert('Failed to delete the zone.');
            }
        }
    };

    // * Handle "Send Notification" button click
    const handleSendNotificationClick = (zone) => {
        if (zone) {
            setSelectedZone(zone); // Pass the selected zone to the modal
        } else {
            setSelectedZone(zones);
        }

        setShowPushNotificationModal(true); // Show the modal
    };

    // * Handle click to view all notifications
    const handleViewNotificationsClick = (zone) => {
        setSelectedZone(zone);
        setShowAllNotificationsModal(true);
    }

    return (
        <div className='map-container'>
            <MapContainer
                center={[-27.497418, 153.013277]}
                zoom={18}
                style={{ height: 'calc(100vh - 100px)', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Zone List */}
                {showZoneList ? (
                    <ZoneList zones={zones} setShowZoneList={setShowZoneList} />
                ) : (
                    <ZoneListToggle setShowZoneList={setShowZoneList} />
                )}

                {/* Render zones as polygons */}
                {/* FeatureGroup to manage layers */}
                <FeatureGroup ref={featureGroupRef}>
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
                            options={{ zoneId: zone.id }}
                        >
                            <Popup>
                                <div>
                                    <h4 className='popup-text zone-name'>{zone.name}</h4>
                                    <p className='popup-text'>Address: {zone.address}</p>

                                    <button
                                        className="notification-button"
                                        onClick={() => handleSendNotificationClick(zone)}
                                    >
                                        Send Notification
                                    </button>

                                    <button
                                        className='view-notifications-button'
                                        onClick={() => handleViewNotificationsClick(zone)}
                                    >
                                        View All Notifications
                                    </button>

                                    <button
                                        className='delete-button'
                                        onClick={() => handleDeleteZone(zone.id)}
                                    >
                                        Delete Zone
                                    </button>
                                </div>
                            </Popup>
                        </Polygon>
                    ))}

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

                <ControlButtons handleSendNotificationClick={handleSendNotificationClick} />  {/* The custom buttons */}
            </MapContainer>

            {/* PushNotificationModal Popup */}
            {showPushNotificationModal && (
                <PushNotificationModal
                    zones={selectedZone}
                    onClose={() => {
                        setShowPushNotificationModal(false);
                        setSelectedZone(null);
                    }}
                />
            )}

            {/* Popup form to enter new zone info */}
            {showPopup && (
                <NewZoneModal
                    setZones={setZones}
                    zoneInfo={zoneInfo}
                    setZoneInfo={setZoneInfo}
                    drawnLayer={drawnLayer}
                    featureGroupRef={featureGroupRef}
                    resetForm={resetForm}
                />
            )}

            {/* Render the All Notifications modal */}
            {showAllNotificationsModal && (
                <ViewNotificationsModal
                    zone={selectedZone}
                    onClose={() => {
                        setShowAllNotificationsModal(false);
                        setSelectedZone(null);
                    }}
                />
            )}
        </div>
    )
}

export default Map;