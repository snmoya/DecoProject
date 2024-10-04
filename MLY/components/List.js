import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import icons from '../data/icons';
//import { API_KEY } from '@env';



const List = ({ navigation }) => {

  const [messages, setMessages] = useState([]); 
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch messages on component mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const url = `${baseURL}/`; 
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json', 
            'x-api-key': API_KEY, 
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse the response as JSON
        console.log('Fetched data:', data);

        setMessages(data); // Set the state with the fetched messages
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchMessages(); // Call the fetch function when component mounts
  }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Notifications</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={icons.close} style={styles.closeIcon} />
                </TouchableOpacity>
            </View>
            
            
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8EDDF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingTop: 40,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notificationItem: {
    padding: 15,
    backgroundColor: '#EFEFEF',
    marginBottom: 10,
    borderRadius: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationMessage: {
    fontSize: 14,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  infoItem2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  circleNotifIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    paddingLeft: 5,
  },
  timeText: {
    fontSize: 16,
    color: '#666',
    paddingLeft: 10,
  },
  infoFrame: {
    backgroundColor: '#FFF8F3',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    //borderWidth: 1,
    //borderColor: '#D2C5B4',
  },
  ExampleinfoFrame: {
    backgroundColor: '#E3D8CC',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    //borderWidth: 1,
    //borderColor: '#D2C5B4',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'left',
  },
  arrowIcon: {
    width: 30,
    height: 30,
  },
  messageText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    paddingLeft: 20,
  },
});

/*
            <ScrollView>
                {loading ? (
                    <Text>Loading...</Text> // Display loading text while fetching
                ) : (
                    messages.map((message, index) => (
                        <View key={index} style={styles.infoFrame}>
                            <View style={styles.infoItem2}>
                                <Image source={icons.circledNotif} style={styles.circleNotifIcon} />
                                <View style={styles.textContainer}>
                                    <View style={styles.titleRow}>
                                        <Text style={styles.infoText}>{message.user}</Text>
                                        <Text style={styles.timeText}> • {index + 1}h</Text>
                                    </View>
                                    <Text style={styles.messageText}>{message.message}</Text>
                                </View>
                                <Image source={icons.circledArrow} style={styles.arrowIcon} />
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
*/

export default  List;