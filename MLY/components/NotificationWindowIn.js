import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import icons from '../data/icons';
import { useNavigation } from '@react-navigation/native';

const NotificationWindowIn = ({ location, onStopReceiving }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

        <Image source={icons.Handle} style={styles.handleIcon} />
        <View style={styles.infoItem1}>
            <Image source={icons.locationPin} style={styles.locIcon} />
            <Text style={styles.infoText}>{location}</Text>
        </View>
        <View style={styles.infoItem1}>
                <Image source={icons.notification} style={styles.notIcon} />
                <Text style={styles.infoText}>Notification receiving type</Text>
        </View>

        <View style={styles.infoFrame}>
            <View style={styles.infoItem2}>
                <Image source={icons.circledNotif} style={styles.circleNotifIcon} />
                <View style={styles.textContainer}>
                    <View style={styles.titleRow}>
                        <Text style={styles.infoText}>Title</Text>
                        <Text style={styles.timeText}> • 1h</Text>
                    </View>
                    <Text style={styles.messageText}>Message</Text>
                </View>
                <Image source={icons.arrowDown} style={styles.arrowIcon} />
            </View>
        </View>
        <TouchableOpacity
                onPress={() => navigation.navigate('List')}
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
    alignItems: 'left',
  },
  infoItem1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
    fontSize: 16,
    color: '#666',
    paddingLeft: 10,
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
  handleIcon: {
    width: 50,
    height: 5,
    alignSelf: 'center',
    marginBottom: 20,
  },
  arrowIcon: {
    width: 40,
    height: 40,
  },
});

export default NotificationWindowIn;