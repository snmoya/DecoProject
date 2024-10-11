import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Dimensions, Switch } from 'react-native';
import icons from '../data/icons';

const SideMenu = ({ visible, showSideMenu }) => {
    const slideAnim = React.useRef(new Animated.Value(-Dimensions.get('window').width)).current;
    const [screenBlinkEnabled, setScreenBlinkEnabled] = useState(false);
    const [vibrationEnabled, setVibrationEnabled] = useState(false);

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
                <Text style={styles.profileName}>Notifications Settings</Text>
                <Text style={styles.profileEmail}>Enable or disable settings</Text>
            </View>

            <View style={styles.buttonSection}>
            <View style={styles.toggleContainer}>
                    <Text style={styles.toggleLabel}>Enable Screen Blink</Text>
                    <Switch
                        value={screenBlinkEnabled}
                        onValueChange={(value) => setScreenBlinkEnabled(value)}
                        trackColor={{ false: '#767577', true: '#FFDEAB' }}
                        thumbColor={screenBlinkEnabled ? '#04AA6D' : '#f4f3f4'}
                    />
                </View>
                <View style={styles.toggleContainer}>
                    <Text style={styles.toggleLabel}>Enable Vibration</Text>
                    <Switch
                        value={vibrationEnabled}
                        onValueChange={(value) => setVibrationEnabled(value)}
                        trackColor={{ false: '#767577', true: '#FFDEAB' }}
                        thumbColor={vibrationEnabled ? '#04AA6D' : '#f4f3f4'}
                    />
                </View>
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
    toggleContainer: {
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
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    toggleLabel: {
        fontSize: 16,
        color: '#333',
    },
});

export default SideMenu;