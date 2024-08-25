import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import icons from '../data/icons';

const AppBar = ({ title, onMenuPress, onSearchPress, onOptionsPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onMenuPress}>
        <Image source={icons.menuButton} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={onSearchPress}>
          <Image source={icons.search} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onOptionsPress}>
          <Image source={icons.threeDots} style={styles.icon} />
        </TouchableOpacity>
      </View>
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
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'centre',
  },
});

export default AppBar;