import { useState, useEffect } from 'react';

const baseURL = 'https://deco3801-machineleads.uqcloud.net/api';
const APIKEY = 'machine-leads-yesterday-secret'; 

// Custom hook to get notifications
const useNotifications = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      try {
        // For testing, replace with mock data instead of an actual API call
        const mockData = [
          { notificationId: 1, message: 'Hey, how are you?', zone_id: '1' },
          { notificationId: 2, message: 'I\'m good, thanks!', zone_id: '2' },
          { notificationId: 3, message: 'I\'m good too, thanks for asking!', zone_id: '3' },
        ];

        // Uncomment this if you want to fetch from the actual API
        // const url = `${baseURL}/notifications`;
        // const response = await fetch(url, {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'x-api-key': APIKEY,
        //   },
        // });
        // const data = await response.json();

        setMessages(mockData);  // Set the mock data
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);  // Stop loading spinner
      }
    };

    getMessages();  // Fetch messages on component mount
  }, []);

  return { messages, loading };
};

export default useNotifications;