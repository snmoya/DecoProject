/* This component is a notification window that displays the latest notification for a specific zone.
* It also allows the user to stop receiving notifications for that zone.
* The user can click on the notification list to see all notifications for that zone.
* The notification window will blink and/or vibrate when a new notification is received.
*/

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, Vibration } from 'react-native';
import icons from '../data/icons';
import { useNavigation } from '@react-navigation/native';
import getNotifications from './getNotifications';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

// NotificationWindowIn component
const NotificationWindowIn = ({ location, onStopReceiving, onClose, zoneId, blinkEnabled, blinkScreen, vibrationPattern}) => {
  const navigation = useNavigation();
  const { messages, loading } = getNotifications(1);
  const latestMessageId = useRef(null);
  const zoneName = location;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isSeen, setIsSeen] = useState(false); 

  //console.log("zoneNmae: ", zoneName);
  //console.log("blinking in NotificationWindowIn: ", blinking);
  //console.log("blinkEnabled in NotificationWindowIn: ", blinkEnabled);

  // Check if the message has been seen, so it doesn't trigger the vibration and blink again.
  const checkIfSeen = async (messageId) => {
    try {
      const seenMessages = await AsyncStorage.getItem('seenMessages');
      return seenMessages ? JSON.parse(seenMessages).includes(messageId) : false;
    } catch (error) {
      console.error('Error checking if message is seen:', error);
      return false;
    }
  };

  // Mark the message as seen so it doesn't trigger the vibration and blink again.
  const markAsSeen = async (messageId) => {
    try {
      const seenMessages = await AsyncStorage.getItem('seenMessages');
      const updatedSeenMessages = seenMessages ? JSON.parse(seenMessages) : [];
      if (!updatedSeenMessages.includes(messageId)) {
        updatedSeenMessages.push(messageId);
        await AsyncStorage.setItem('seenMessages', JSON.stringify(updatedSeenMessages));
      }
      setIsSeen(true);
    } catch (error) {
      console.error('Error marking message as seen:', error);
    }
  };

  // Show notification in the lock-screen of the phone with the spcified format.
  const showLocalNotification = (title, message) => {
    PushNotification.localNotification({
      channelId: "default-channel-id",
      title:`${zoneName} - ${title}:` || "New Notification", // Fallback title
      message: message || "You have a new message", // Fallback message
      playSound: true, // Play sound when notification is shown
      soundName: 'default', 
      importance: 'high', // Ensure visibility on lock screen
      vibrate: true, // Enable vibration
      vibration: 300, // Vibration duration
      priority: 'high', 
    });
  };

  // Get the latest message for the zone
  const getlatestMessage = () => {
        const zoneMessages = messages.filter(message => message.zone_id === zoneId);
        if (zoneMessages.length > 0) {
          return zoneMessages.reduce((latest, current) => {
            return new Date(latest.created_at) > new Date(current.created_at) ? latest : current;
          });
        }

        return null;
  };


  const latestMessage = getlatestMessage();
  let timeMessage = '';
  if (latestMessage === null) {
      timeMessage = null;
  } else {
      // Format the time of the latest message
      timeMessage = new Date(latestMessage.created_at).toLocaleString('en-AU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });

  }

  // Check if the latest message has changed
  useEffect(() => {
    if (latestMessage && latestMessage.id !== latestMessageId.current) {
      latestMessageId.current = latestMessage.id;
      console.log('New message:', latestMessage);
      console.log("latestMessageId.current: ", latestMessageId.current);
      console.log("latestMessage.id: ", latestMessage.id);
      // Check if the message has been seen
      checkIfSeen(latestMessage.id).then((alreadySeen) => {
        if (!alreadySeen) {
          // Trigger vibration only if the message hasn't been seen yet
          showLocalNotification(latestMessage.title, latestMessage.message); // Trigger a local notification
          if (blinkEnabled) {
            blinkScreen(); // Blink screen if enabled
          }
          Vibration.vibrate(vibrationPattern); // Vibrate
          markAsSeen(latestMessage.id); // Mark the message as seen
        }
      });
    }
  }, [latestMessage]);


  // Cut the message if it's too long, Maximum length is 49 characters.
  const cutMessage = (message, length = 49) => {
    if (message.length > length) {
      return message.substring(0, length) + '...';
    }
    return message;
  };

  // Cut the title if it's too long, Maximum length is 18 characters.
  const cutTitle = (text, length = 18) => {
    if (text.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
  };

  // Toggle the message expansion
  const toggleMessage = () => {
    setIsExpanded(!isExpanded); 
  };
  
  return (
    <View style={[styles.container, { zIndex: 100 }]}>

        <View style={styles.closeButtonFrame}>
            <TouchableOpacity onPress={onClose}>
                <Image source={icons.close} style={styles.closeIcon} />
            </TouchableOpacity>
        </View>
        <View style={styles.infoItem1}>
            <Image source={icons.locationPin} style={styles.locIcon} />
            <Text style={styles.infoText}>{location}</Text>
        </View>
        <View style={[styles.infoFrame, isExpanded && styles.expandedFrame]}>
            <View style={styles.infoItem2}>
                <Image source={icons.circledNotif} style={styles.circleNotifIcon} />
                <View style={styles.textContainer}>
                    <View style={styles.titleRow}>
                    <Text style={styles.notificationTitle}>
                        {latestMessage ? cutTitle(latestMessage.title) : 'No Notifications'}
                      </Text>
                      
                    </View>
                    <Text style={styles.timeText}> • {timeMessage || 'N/A'}</Text>
                    <Text style={styles.messageText}>
              {isExpanded ? latestMessage.message : latestMessage ? cutMessage(latestMessage.message) : 'No messages for this zone.'}
                    </Text>
                </View>
                <TouchableOpacity onPress={toggleMessage}>
            <Animated.Image
              source={icons.arrowDown}
              style={[
                styles.arrowIcon,
                { transform: [{ rotate: isExpanded ? '180deg' : '0deg' }] }, // Rotate when expanded
              ]}
            />
          </TouchableOpacity>
            </View>
        </View>
        <TouchableOpacity
                onPress={() => navigation.navigate('List', { zoneId })}
                style={styles.arrowIconContainer}
                >
                <View style={styles.infoItem1}>
                <Text style={styles.seeAllText}>See all notifications</Text>
                <Image source={icons.arrowRight} style={styles.circleNotifIcon} />
                </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onStopReceiving}>
            <Text style={styles.closeButtonText}>Stop receiving</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
container: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F8EDDF',
    borderRadius: 0,
    marginHorizontal: 0,
    marginVertical: 0,
    minHeight: 150,
    position: 'relative',
    },
  handleIcon: {
    width: 40,
    height: 5,
    alignSelf: 'center',
    marginBottom: 15,
  },
  infoFrame: {
    backgroundColor: '#FFF8F3',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    //borderWidth: 1,
    //borderColor: '#D2C5B4',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  infoItem1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
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
    paddingLeft: 20,
  },
  timeText: {
    fontSize: 10,
    color: '#666',
    paddingLeft: 10,
    marginTop: 5,
  },
  messageText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    paddingLeft: 20,
  },
  seeAllText: {
    color: '#333',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#E3D8CC', 
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    width: '60%',
  },
  closeButtonText: {
    color: '#666',
    fontSize: 14,
  },
  notIcon: {
    width: 20,
    height: 20,
    marginLeft: 2,
  },
  locIcon: {
    width: 24,
    height: 24,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 0,
    width: 24,
    height: 24,
    zIndex: 1000,
  },
  closeButtonFrame: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  arrowIcon: {
    width: 40,
    height: 40,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  expandedFrame: {
    backgroundColor: '#FFFF',
  },
});

export default NotificationWindowIn;