import { useState, useEffect } from 'react';

const baseURL = 'https://deco3801-machineleads.uqcloud.net/api';
const APIKEY = 'machine-leads-yesterday-secret'; 

// Custom hook to get notifications
const useNotifications = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the async function inside the useEffect to fetch the data
    const getMessages = async () => {
      try {
        const url = `${baseURL}/notifications/`;
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': APIKEY,
          },
        });

        const data = await response.json();
        setMessages(data); // Correct state update
        //console.log("Fetched Messages: ", data); // Log the fetched data
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
    const intervalId = setInterval(() => {
      //console.log("Fetching new messages...");
      getMessages();
    }, 1000);
    return () => clearInterval(intervalId);

  }, []); 

  return { messages, loading };
};

export default useNotifications;