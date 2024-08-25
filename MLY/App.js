import React, { useState } from "react";
import { View, StyleSheet } from 'react-native';
import ShowMap from './components/ShowMap';
import TopBar from './components/TopBar';
import SideMenu from './components/SideMenu';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import List from './components/List';

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
                    {() => (
                        <View style={styles.container}>
                            <TopBar 
                                title="DECO3801"
                                onMenuPress={showSideMenu}
                                onSearchPress={() => console.log('search is working :)')}
                                onOptionsPress={() => console.log('options is working :)')}
                            />
                            <ShowMap />
                            {sideMenuVisible && (
                                <SideMenu visible={sideMenuVisible} showSideMenu={showSideMenu} />
                            )}
                        </View>
                    )}
                </Stack.Screen>
                <Stack.Screen name="List" component={List} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});