import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import icons from '../data/icons';

const SideMenu = ({ visible, showSideMenu }) => {
    const slideAnim = React.useRef(new Animated.Value(-Dimensions.get('window').width)).current;

    React.useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: visible ? 0 : -Dimensions.get('window').width,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    return (
        <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
            <TouchableOpacity style={styles.closeButton} onPress={showSideMenu}>
                <Image source={icons.close} style={styles.closeIcon} />
            </TouchableOpacity>
            <View style={styles.profileSection}>
                <Text style={styles.profileName}>Name</Text>
                <Text style={styles.profileEmail}>hello@uq.email.com</Text>
            </View>
            <View style={styles.settingsSection}>
                <Text style={styles.settingsText}>App Settings</Text>
            </View>
            <View style={styles.buttonSection}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Button 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Button 2</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    sidebar: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '75%',
        backgroundColor: '#F8EDDF',
        padding: 20,
        zIndex: 1000,
        elevation: 5,
    },
    profileSection: {
        marginBottom: 20,
        marginTop: 40,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    profileEmail: {
        fontSize: 14,
        color: '#666',
    },
    settingsSection: {
        marginBottom: 20,
    },
    settingsText: {
        fontSize: 16,
        color: '#333',
    },
    buttonSection: {
        marginTop: 20,
    },
    button: {
        backgroundColor: '#FFDEAB',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#333',
        fontSize: 16,
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        marginTop: 20,
    },
    closeIcon: {
        width: 24,
        height: 24,
    }
});

export default SideMenu;