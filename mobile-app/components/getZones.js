/* This file contains a custom hook that fetches zones from the server.
* The hook is used in the ShowMap.js component to fetch zones and display them in the app.
*/
import { useState, useEffect } from 'react';

const baseURL = 'https://deco3801-machineleads.uqcloud.net/api';
const APIKEY = 'put-your-API-key-here'; 

/* Custom hook to fetch zones
This hook is responsible for fetching and returning zones from our server.
*/
const useZones = () => {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const url = `${baseURL}/zones`;
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': APIKEY,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setZones(data); 
        console.log("Fetched Zones: ", data); 
      } catch (error) {
        console.error('Error fetching zones:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchZones();
  }, []);

  return { zones, loading };
};

export default useZones;