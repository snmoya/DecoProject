import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import icons from '../data/icons';

const AppBar = ({ title, onMenuPress }) => {
  return (
    <View style={styles.container}>
      {/* Left Menu Button */}
      <TouchableOpacity onPress={onMenuPress}>
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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  icon: {
    width: 40,
    height: 40,
    marginLeft: 10, 
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    position: 'absolute', 
    left: 0,
    right: 0,
    top: 50,
    textAlign: 'center',
  },
  rightIcons: {
    width: 40, 
  },
});

export default AppBar;