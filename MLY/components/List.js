import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import icons from '../data/icons';

const List = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={icons.close} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.infoFrame}>
            <View style={styles.infoItem2}>
                <Image source={icons.circledNotif} style={styles.circleNotifIcon} />
                <View style={styles.textContainer}>
                    <View style={styles.titleRow}>
                        <Text style={styles.infoText}>Example notification 1</Text>
                        <Text style={styles.timeText}> • 1h</Text>
                    </View>
                    <Text style={styles.messageText}>Message</Text>
                </View>
                <Image source={icons.circledArrow} style={styles.arrowIcon} />
            </View>
        </View>

        <View style={styles.ExampleinfoFrame}>
            <View style={styles.infoItem2}>
                <Image source={icons.circledNotif} style={styles.circleNotifIcon} />
                <View style={styles.textContainer}>
                    <View style={styles.titleRow}>
                        <Text style={styles.infoText}>Example Notification 2</Text>
                        <Text style={styles.timeText}> • 2h</Text>
                    </View>
                    <Text style={styles.messageText}>Hello!</Text>
                </View>
                <Image source={icons.circledArrow} style={styles.arrowIcon} />
            </View>
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

export default  List;