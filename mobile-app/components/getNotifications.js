/* This file contains a custom hook to fetch notifications from the server.
* The hook is used in the NotificationWindowIn.js and List.js component to 
* fetch notifications and display them in the app.
*/
import { useState, useEffect } from 'react';

// Base URL for the API
const baseURL = 'https://deco3801-machineleads.uqcloud.net/api';
const APIKEY = 'put-your-API-key-here'; 


/* Custom hook to fetch notifications
This hook is responsible for fetching and returning notification messages from our server.
*/
const useNotifications = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        setMessages(data); 
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