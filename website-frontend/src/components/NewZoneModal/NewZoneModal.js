import React, { useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

import './NewZoneModal.css';

const NewZoneModal = ({ selectedZone, setZones, zoneInfo, setZoneInfo, drawnLayer, featureGroupRef, resetForm }) => {
    const { orgId } = useContext(AuthContext);

    // * Initialize zoneInfo with selectedZone's data when editing
    useEffect(() => {
        if (selectedZone) {
            setZoneInfo({
                name: selectedZone.name,
                address: selectedZone.address,
                polygon: selectedZone.polygon  // Keep polygon to edit it later
            });
        }
    }, [selectedZone, setZoneInfo]);


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
            // * Update zone
            if (selectedZone) {
                await axios.put(`/api/zones/${selectedZone.id}`, zoneData);
                
                // Update the zone in the state
                setZones((prevZones) =>
                    prevZones.map((zone) =>
                        zone.id === selectedZone.id ? { ...zone, ...zoneData } : zone
                    )
                );

                // Alert user about successful update
                alert('Zone updated successfully!');
            } else {
                // * Insert new zone
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

                // Alert user about successful creation
                alert('Zone created successfully!');
            }
            
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
        <>
            {/* Transparent background overlay */}
            <div className="popup-overlay"></div>

            <form onSubmit={handleZoneSubmit} className="popup-form">
                {/* <div className="popup-form-header"> */}
                    <span className="close-button" onClick={handleCancel}>&times;</span>
                    <h3>{selectedZone ? 'Edit Zone' : 'Create New Zone'}</h3>
                {/* </div> */}

                <label>Name</label>
                <input
                    type="text"
                    value={zoneInfo.name}
                    onChange={(e) => setZoneInfo({ ...zoneInfo, name: e.target.value })}
                    required
                />

                <label>Address</label>
                <input
                    type="text"
                    value={zoneInfo.address}
                    onChange={(e) => setZoneInfo({ ...zoneInfo, address: e.target.value })}
                    required
                />

                <button type="submit" className='save-button'>Save Zone</button>
            </form>
        </>

    )
};

export default NewZoneModal;