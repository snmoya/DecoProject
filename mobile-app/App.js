import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, AppState } from 'react-native';
import ShowMap from './components/ShowMap';
import TopBar from './components/TopBar';
import SideMenu from './components/SideMenu';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import List from './components/List';
import VoiceToText from './components/VoiceToText';
import PushNotification from 'react-native-push-notification';


const Stack = createStackNavigator();

export default function App() {
    const [sideMenuVisible, setSideMenuVisible] = useState(false);
    const [blinking, setBlinking] = useState(false); 
    const [blinkingEnabled, setBlinkingEnabled] = useState(false);
    const [blinkColor, setBlinkColor] = useState('rgba(255, 255, 255, 0.8)');
    const [vibrationPattern, setVibrationPattern] = useState([0, 500]);
    const [appState, setAppState] = useState(AppState.currentState); // Track app state
    const [selectedZone, setSelectedZone] = useState(null);

    const showSideMenu = () => {
        console.log('Showing side menu:', !sideMenuVisible);
        setSideMenuVisible(!sideMenuVisible);
    };

    const blinkScreen = () => {
        let blinkCount = 0;
        setBlinking(true);
        const blinkInterval = setInterval(() => {
            blinkCount++;
            setBlinking(prev => !prev);  
            if (blinkCount >= 6) {  
                clearInterval(blinkInterval);
                setBlinking(false); 
            }
        }, 250);
    };


    PushNotification.configure({
        onRegister: function (token) {
          console.log("TOKEN:", token);
        },
        onNotification: function (notification) {
          console.log("NOTIFICATION:", notification);
        },
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
        popInitialNotification: true,
        requestPermissions: true,
      });

    useEffect(() => {
        PushNotification.createChannel(
          {
            channelId: "default-channel-id", // Ensure the channel ID matches what you use in the notification config
            channelName: "Default Channel", // Name of the channel
            channelDescription: "A default channel for push notifications", // Optional: description of the channel
            importance: 4, // Importance level: 4 is high
            vibrate: true, // Enable vibration
          },
          (created) => console.log(`Notification channel created: ${created}`) // Log the channel creation status
        );
      }, []);

      useEffect(() => {
        console.log("blinkingEnabled state in App.js:", blinkingEnabled);
    }, [blinkingEnabled]); 

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main">
                    {({navigation}) => (
                        <View style={styles.container}>
                            <TopBar 
                                title="EVAN"
                                onMenuPress={showSideMenu}
                            />
                            <ShowMap 
                            navigation={navigation}
                            blinking={blinking}
                            blinkingEnabled={blinkingEnabled} 
                            blinkScreen={blinkScreen}
                            vibrationPattern={vibrationPattern}    
                            />
                            {sideMenuVisible && (
                                <TouchableOpacity 
                                    style={styles.overlay} 
                                    onPress={() => setSideMenuVisible(false)} 
                                    activeOpacity={1}
                                />
                            )}
                            <SideMenu 
                            visible={sideMenuVisible} 
                            showSideMenu={showSideMenu} 
                            blinkScreen={blinkScreen} 
                            setBlinkingEnabled={setBlinkingEnabled} 
                            setBlinkColor={setBlinkColor} 
                            setVibrationPattern={setVibrationPattern}
                            />
                        </View>
                    )}
                </Stack.Screen>
                <Stack.Screen name="List" component={List} />
                <Stack.Screen name="VoiceToText" component={VoiceToText} />
            </Stack.Navigator>

            {blinking && <View style={[styles.blinkOverlay, { backgroundColor: blinkColor }]} />}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  
        zIndex: 900, 
    },
    blinkOverlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 2000, // Ensure it's on top of everything
    }
});