/* This component displays a list of notifications for a specific zone.
  * It uses the getNotifications.js component to fetch the notifications from the API.
  * The notifications are filtered by the zoneId passed as a prop.
*/
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator, Animated } from 'react-native';
import icons from '../data/icons';
import getNotifications from './getNotifications'; 
//import { API_KEY } from '@env';

// List component to display notifications
const List = ({ navigation, route }) => {

  const { zoneId } = route.params;
  const {messages, loading} = getNotifications();
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [expandedMessageId, setExpandedMessageId] = useState(null);

  // Filter messages by zone ID and sort by date (newest first)
  useEffect(() => {
    const filteredMessages = messages.filter(message => message.zone_id === zoneId).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setFilteredMessages(filteredMessages);
  }, [messages, zoneId]);
  
  // Cut message if it is too long, MAX 50 characters
  const cutMessage = (message, length = 50) => {
    if (message.length > length) {
      return message.substring(0, length) + '...';
    }
    return message;
  };

  // Toggle message expansion
  const toggleMessage = (messageId) => {
    if (expandedMessageId === messageId) {
      setExpandedMessageId(null);
    } else {
      setExpandedMessageId(messageId);
    }
  };

  // Cut title if it is too long, MAX 18 characters
  const cutTitle = (text, length = 18) => {
    if (text.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={icons.close} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false} 
          indicatorStyle="black"
        >
         {/* Loop through filtered messages and display each */}
          {filteredMessages.map((item) => (
            <View key={item.id.toString()}               style={[
                styles.infoFrame,
                expandedMessageId === item.id && styles.expandedFrame,
              ]}>
              <View style={styles.infoItem2}>
                <Image source={icons.circledNotif} style={styles.circleNotifIcon} />
                <View style={styles.textContainer}>
                  <View style={styles.titleRow}>
                    <Text style={styles.infoText}>{item.title}</Text>

                  </View>
                  <Text style={styles.timeText}>
                      {new Date(item.created_at).toLocaleString('en-AU', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  <Text style={styles.messageText}>
                    {expandedMessageId === item.id ? item.message : cutMessage(item.message)}
                  </Text>
                </View>
                {/* Toggle message expansion when arrow is pressed */}
                <TouchableOpacity onPress={() => toggleMessage(item.id)}>
                  <Animated.Image
                    source={icons.arrowDown}
                    style={[
                      styles.arrowIcon,
                      { transform: [{ rotate: expandedMessageId === item.id ? '180deg' : '0deg' }] }, // Rotate when expanded
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
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
    paddingHorizontal: 20,
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
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 10,
    color: '#666',
    paddingLeft: 10,
    marginTop: 2,
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
    justifyContent: 'space-between', // Space between title and time
    alignItems: 'center',
    width: '100%',
  },
  arrowIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  messageText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    paddingLeft: 20,
  },
  scrollView: {
    flex: 1,
    marginLeft: 0, 
  },
  scrollViewContent: {
    paddingHorizontal: 0, 
  },
  expandedFrame: {
    backgroundColor: '#FFFF',
  },
});


export default  List;