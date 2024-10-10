import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faBell } from '@fortawesome/free-solid-svg-icons';

import './ControlButtons.css';

const PushMultipleZonesButton = ({ handleSendNotificationClick }) => {
    return (
        <div className='push-multiple-zones-button'>
            <button
                onClick={() => handleSendNotificationClick(null)}
                className='circle-button'
                aria-label='Push Notification to Multiple Zones'
            >
                <FontAwesomeIcon icon={faBell} />
            </button>

            <span className='hover-text'>Push Notification to Multiple Zones</span>
        </div>
    );
};

const CreateZoneButton = () => {
    const map = useMap();

    const handleDrawPolygon = () => {
        const drawControl = new L.Draw.Polygon(map, {
            allowIntersection: false,
        });

        drawControl.enable();  // Enable drawing mode when the button is clicked
    };

    return (
        <div className='create-zone-button'>
            <button
                onClick={handleDrawPolygon}
                className='circle-button'
                aria-label='Create New Zone'
            >
                <FontAwesomeIcon icon={faPencilAlt} />
            </button>

            <span className='hover-text'>Create New Zone</span>
        </div>
    );
};

const ControlButtons = ({ handleSendNotificationClick }) => {
    return (
        <div className='control-buttons'>
            <PushMultipleZonesButton handleSendNotificationClick={handleSendNotificationClick} />
            <CreateZoneButton />
        </div>
    )
}

export default ControlButtons;