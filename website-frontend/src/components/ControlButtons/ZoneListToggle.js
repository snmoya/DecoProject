import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

const ZoneListToggle = ({ setShowZoneList }) => {
    return (
        <div className='control-buttons left-control-button'>
            <button
                onClick={() => setShowZoneList(true)}
                className='circle-button'
                aria-label='Push Notification to Multiple Zones'
            >
                <FontAwesomeIcon icon={faList} />
            </button>

            <span className='hover-text left-hover-text'>All Zones of your Organisation</span>
        </div>
    )
}

export default ZoneListToggle;