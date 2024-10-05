import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import ShowMap from './components/ShowMap';
import TopBar from './components/TopBar';
import SideMenu from './components/SideMenu';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import List from './components/List';
import VoiceToText from './components/VoiceToText';


const Stack = createStackNavigator();

export default function App() {
    const [sideMenuVisible, setSideMenuVisible] = useState(false);
    const showSideMenu = () => {
        console.log('Showing side menu:', !sideMenuVisible);
        setSideMenuVisible(!sideMenuVisible);
    };


    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main">
                    {({navigation}) => (
                        <View style={styles.container}>
                            <TopBar 
                                title="EVAN"
                                onMenuPress={showSideMenu}
                                onSearchPress={() => console.log('search is working :)')}
                                onOptionsPress={() => console.log('options is working :)')}
                            />
                            <ShowMap navigation={navigation} />
                            {sideMenuVisible && (
                                <TouchableOpacity 
                                    style={styles.overlay} 
                                    onPress={() => setSideMenuVisible(false)} 
                                    activeOpacity={1}
                                />
                            )}
                            <SideMenu visible={sideMenuVisible} showSideMenu={showSideMenu} />
                        </View>
                    )}
                </Stack.Screen>
                <Stack.Screen name="List" component={List} />
                <Stack.Screen name="VoiceToText" component={VoiceToText} />
            </Stack.Navigator>
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
});