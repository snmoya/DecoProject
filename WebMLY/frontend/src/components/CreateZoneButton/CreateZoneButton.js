import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import './CreateZoneButton.css';

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

export default CreateZoneButton;