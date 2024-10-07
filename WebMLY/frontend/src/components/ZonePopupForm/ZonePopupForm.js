import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

import './ZonePopupForm.css';

const ZonePopupForm = ({ setZones, zoneInfo, setZoneInfo, drawnLayer, featureGroupRef, resetForm }) => {
    const { orgId } = useContext(AuthContext);
    
    // * Handle form submission for the new zone
    const handleZoneSubmit = async (e) => {
        e.preventDefault();

        if (!orgId) {
            console.error('OrgId is missing!');
            alert('Failed to create the zone because orgId is missing.');
            return;
        }

        const zoneData = {
            polygon: zoneInfo.polygon,
            name: zoneInfo.name,
            address: zoneInfo.address,
            org_id: orgId
        };

        console.log('Zone data:', zoneData);

        try {
            // Save the new zone to the backend
            const response = await axios.post('/api/zones', zoneData);

            // Extract the newly created zoneId from the backend response
            const { zoneId } = response.data;

            // Add the new zone with its ID to the list
            setZones((prevZones) => [
                ...prevZones,
                { ...zoneData, id: zoneId } // Add the newly generated ID
            ]);

            // Associate the layer with the zoneId (used for deletion)
            drawnLayer.options.zoneId = zoneId;
            featureGroupRef.current.addLayer(drawnLayer);  // Add the layer to the FeatureGroup

            // Reset the form and close the popup
            resetForm();
        } catch (error) {
            console.error('Error creating zone:', error);
            alert('Failed to create the zone.');
        }
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
    )
};

export default ZonePopupForm;