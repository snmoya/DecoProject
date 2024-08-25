import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import icons from '../data/icons';

const NotificationWindow = ({ onPressReceive }) => {
  return (
    <View style={styles.container}>
        <Image source={icons.Handle} style={styles.handleIcon} />
        <View style={styles.infoFrame}>
            <View style={styles.infoItem}>
                <Image source={icons.locationPin} style={styles.locIcon} />
                <Text style={styles.infoText}>Building Name</Text>
            </View>
            <View style={styles.smallLine} />
            <View style={styles.infoItem}>
                <Image source={icons.notification} style={styles.notIcon} />
                <Text style={styles.infoText}>Notification receiving type</Text>
            </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={onPressReceive}>
            <Text style={styles.buttonText}>Press to receive</Text>
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
  },
  infoFrame: {
    backgroundColor: '#F8ECDF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1, 
    borderColor: '#D2C5B4',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoIcon: {
    marginRight: 10,
    fontSize: 18,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    paddingLeft: 20,
  },
  button: {
    backgroundColor: '#FFDEAB', 
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    width: '60%',
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 0,
  },
  smallLine: {
    alignSelf: 'center',  
    width: '100%',         
    height: 1,            
    backgroundColor: '#D2C5B4', 
    marginVertical: 10,   
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
});

export default NotificationWindow;
