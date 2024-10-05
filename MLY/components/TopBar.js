import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import icons from '../data/icons';

const AppBar = ({ title, onMenuPress }) => {
  return (
    <View style={styles.container}>
      {/* Left Menu Button */}
      <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
        <Image source={icons.menuButton} style={styles.icon} />
      </TouchableOpacity>
      
      {/* Centered Title */}
      <Text style={styles.title}>{title}</Text>
      
      {/* Placeholder for right icons to balance the AppBar */}
      <View style={styles.rightIcons} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuButton: {
    width: 60, 
    height: 60, 
    justifyContent: 'center',
    alignItems: 'center', 
    marginLeft: 0,
    zIndex: 1000,
  },
  icon: {
    width: 50,
    height: 50,
    marginLeft: 0, 
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    position: 'absolute', 
    left: 0,
    right: 0,
    top: 60,
    textAlign: 'center',
  },
  rightIcons: {
    width: 50, 
  },
});

export default AppBar;