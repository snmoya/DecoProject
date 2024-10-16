import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import icons from '../data/icons';

const NotificationWindow = ({ location, orgId, onPressReceive, onClose }) => {

  const [orgName, setOrgName] = useState(null); 
  console.log("Organization ID:", orgId);
  const fetchOrganizationName = async (orgId) => {
    try {
        const response = await fetch(`https://deco3801-machineleads.uqcloud.net/api/org/${orgId}`);
        const data = await response.json();
        console.log("Organization data:", data);
        console.log("Organization name:", data.name);
        setOrgName(data.name); 
    } catch (error) {
        console.error("Error fetching organization name:", error);
    }
  };

  useEffect(() => {
    if (orgId) {
      fetchOrganizationName(orgId);
    }
  }, [orgId]); 


  return (
    <View style={styles.container}>

        <View style={styles.closeButtonFrame}>
            <TouchableOpacity onPress={onClose}>
                <Image source={icons.close} style={styles.closeIcon} />
            </TouchableOpacity>
        </View>
        <View style={styles.infoFrame}>
            <View style={styles.infoItem}>
                <Image source={icons.locationPin} style={styles.locIcon} />
                <Text style={styles.infoText}>{location}</Text>
            </View>
            <View style={styles.smallLine} />
            <View style={styles.infoItem}>
                <Image source={icons.notification} style={styles.notIcon} />
                <Text style={styles.infoText}>
            {orgName ? orgName : "Loading organization..."}
          </Text>
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
    paddingTop: 23,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F8EDDF',
    borderRadius: 0,
    marginHorizontal: 0,
    marginVertical: 0,
    position: 'relative',
  },
  infoFrame: {
    backgroundColor: '#F8ECDF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
    borderWidth: 1, 
    borderColor: '#D2C5B4',
    minHeight: 150,
    marginTop: 25,
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
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 0,
    width: 24,
    height: 24,
    zIndex: 100,
  },
  closeButtonFrame: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default NotificationWindow;
