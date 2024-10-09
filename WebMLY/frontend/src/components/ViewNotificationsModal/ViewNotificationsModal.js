import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewNotificationsModal.css';  // Add your custom styling here

const ViewNotificationsModal = ({ zone, onClose }) => {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch notifications for the selected zone
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`/api/notifications?zoneId=${zone.id}`);
                setNotifications(response.data);
            } catch (error) {
                alert('Failed to load notifications.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotifications();
    }, [zone.id]);

    // Function to format the date and time in the required format (dd/mm/yyyy, 24-hour format)
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false  // 24-hour format
        }).format(date);
    };

    return (
        <div className="view-notifications-modal">
            <div className="view-notifications-modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <h3>Notifications for {zone.name}</h3>

                {isLoading ? (
                    <p>Loading notifications...</p>
                ) : notifications.length === 0 ? (
                    <p>No notifications found for this zone.</p>
                ) : (
                    <ul className="notifications-list">
                        {notifications.map((notification) => (
                            <li key={notification.id}>
                                <div className="notification-header">
                                    <h4 className="notification-title">{notification.title}</h4>
                                    <span className="notification-time">
                                        {formatDate(notification.created_at)}
                                    </span>
                                </div>
                                
                                <p>{notification.message}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ViewNotificationsModal;
