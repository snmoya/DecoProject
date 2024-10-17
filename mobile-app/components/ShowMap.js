import React, { useState, useEffect } from "react";
import { PermissionsAndroid, StyleSheet, View, SafeAreaView, Text, Platform, TouchableOpacity, Image, Animated } from "react-native";
import MapView, { AnimateToRegion } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { isPointInPolygon } from "geolib";
import NotificationWindow from './NotificationWindowOut';
import NotificationWindowIn from './NotificationWindowIn';
import { Polygon } from "react-native-maps";
import icons from '../data/icons';
import VoiceToText from './VoiceToText';
import { useFocusEffect } from '@react-navigation/native';
import getNotifications from './getNotifications';
import getZones from './getZones';


export default function ShowMap({ navigation, blinkingEnabled, blinkScreen, vibrationPattern }) {

    const [buttonPosition, setButtonPosition] = useState(30);

    const initialMapState = {
        locationPermission: false,
        locations: [],
        userLocation: {
            latitude: -27.50005001846802,
            longitude: 153.01330426605935,
        },
        nearbyLocation: {},
        selectedLocation: null,
    };

    const { zones, loading: zonesLoading } = getZones();
    const [mapState, setMapState] = useState(initialMapState);
    //Variable to check if user is in a zone
    const [inZone, setInZone] = useState(false); 
    //Variable to check if the FIRST notification window should be up
    const [showNotifA, setShowNotifA] = useState(false);
    //Variable to check if the notification window for the selected zone should be up
    const [showNotifSelectZone, setShowNotifSelectZone] = useState(false);
    //Variable to check if the user is receiving notifications
    const [isReceivingNotifications, setIsReceivingNotifications] = useState(false);
    const mapRef = React.useRef(null);
    

    useEffect(() => {
        async function requestAndroidLocationPermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Location Permission",
                        message: "This app will put your location on the map.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setMapState({ ...mapState, locationPermission: true });
                }
            } catch (error) {
                console.warn(error);
            }
        }

        if (Platform.OS === "android") {
            requestAndroidLocationPermission();
        } else {
            setMapState({ ...mapState, locationPermission: true });
        }
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            let watchId;
    
            if (mapState.locationPermission) {
                watchId = Geolocation.watchPosition(
                    position => {
                        const userLocation = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        };
    
                        setMapState(prevState => ({
                            ...prevState,
                            userLocation,
                        }));
                    },
                    error => console.log("Error getting current position: ", error),
                    { enableHighAccuracy: true }
                );
            }
    
            // Cleanup when component unmounts
            return () => {
                if (watchId) {
                    Geolocation.clearWatch(watchId);
                }
            };
        }, [mapState.locationPermission])
    );

    useEffect(() => {
        if (!zonesLoading) {
          const updatedLocations = zones.map(zone => ({
            id: zone.id,
            location: zone.name,
            coordinates: zone.polygon.map(([longitude, latitude]) => ({
              latitude,
              longitude
            })),
            org_id: zone.org_id,
          }));
          setMapState((prevState) => ({
            ...prevState,
            locations: updatedLocations,
          }));
        }
      }, [zonesLoading, zones]);
    
    useEffect(() => {
        // Adjust button position when the user is in the zone or when they click a zone
        if (inZone || showNotifSelectZone) {
            setButtonPosition(340);  // Move buttons up
        } else {
            setButtonPosition(30);   // Reset to original position
        }
    }, [inZone, showNotifSelectZone]);

    const handlePressReceive = () => {
        setShowNotifA(false);
        //setIsReceivingNotifications(true);
    };

    const handleStopReceiving = () => {
        setShowNotifA(true);
    };

    function handleMapPress(event) {
        const { coordinate } = event.nativeEvent;
        const pressedLocation = {
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
        };
        const clickedZone = mapState.locations.find(location =>
            isPointInPolygon(pressedLocation, location.coordinates)
        );
        if (clickedZone) {
            handleZonePress(clickedZone); 
        }
    }

    const handleZonePress = (location) => {
        setShowNotifA(true); 
        //setIsReceivingNotifications(false);
        //console.log("Selected location: ", location);
        setMapState({
            ...mapState,
            selectedLocation: location,
        });
        setShowNotifSelectZone(true);
    };

    const handleUserLocPress = () => {
        mapRef.current.animateToRegion({
            latitude: mapState.userLocation.latitude,
            longitude: mapState.userLocation.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
            altitude: 900,
        }, 1000); 
    };


    //console.log("--------------------");
    //console.log("inZone: ", inZone);
    console.log("Org ID: ", mapState.selectedLocation?.org_id);
    console.log("showNotifA: ", showNotifA);
    console.log("showNotifSelectZone: ", showNotifSelectZone);
    //const filteredMessages = messages.filter(message => message.zone_id === mapState.selectedLocation?.id);
    //console.log("filteredMessages: ", filteredMessages);
    //console.log("isReceivingNotifications: ", isReceivingNotifications);
    //console.log("messages: ", messages);   
    //console.log("blinkingEnabled in ShowMap:", blinkingEnabled);
    //console.log("blinking in ShowMap:", blinking);
    //console.log("Nearby Location org_id in SHOWMAP: ", mapState.nearbyLocation.org_id);

    return (
        <>
            <MapView
                ref={mapRef}
                camera={{
                    center: mapState.userLocation,
                    pitch: 0,
                    heading: 0,
                    altitude: 900,
                    zoom: 15,
                }}
                showsUserLocation={mapState.locationPermission}
                style={styles.container}
                onPress={handleMapPress} 
            >
            
                {mapState.locations.map(location => {
                    if (location.coordinates) {
                        return ( 
                            <TouchableOpacity
                                key={location.id}
                                onPress={() => handleZonePress(location)}
                            >
                            <Polygon
                                key={location.id}
                                coordinates={location.coordinates}
                                strokeWidth={3}
                                strokeColor="#FEC272"
                                fillColor="rgba(254, 194, 114, 0.3)"
                            />
                            </TouchableOpacity>
                        );
                    }
                    return null;
                })}
            </MapView>

            <View style={[styles.locButton, { bottom: buttonPosition }]}>
                <TouchableOpacity onPress={handleUserLocPress}>
                    <Image source={icons.locArrow} style={styles.voiceIcon} />
                </TouchableOpacity>
            </View>

            <View style={[styles.voiceButton, { bottom: buttonPosition }]}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('VoiceToText')}
                >
                    <Image source={icons.voice} style={styles.voiceIcon} />
                </TouchableOpacity>
            </View>

            {/* Show this when user clicks on a zone and the FIRST NOTIF windows is up*/}
            {showNotifA && showNotifSelectZone && (
                <NotificationWindow
                    location={mapState.selectedLocation.location}
                    orgId={mapState.selectedLocation?.org_id}
                    onPressReceive={handlePressReceive}
                    onClose={() => {
                        //setShowNotifA(false);
                        setShowNotifSelectZone(false); 
                    }}
                />
            )}

            {/* Show this after pressing "Press to receive" */}
            {!showNotifA && mapState.selectedLocation && (
                <NotificationWindowIn
                    location={mapState.selectedLocation.location}
                    zoneId={mapState.selectedLocation.id}
                    blinkEnabled={blinkingEnabled}
                    blinkScreen={blinkScreen}
                    vibrationPattern={vibrationPattern}  
                    onStopReceiving={handleStopReceiving}
                    onClose={() => {
                        setShowNotifA(true);  
                        setShowNotifSelectZone(false);  
                        setButtonPosition(340);
                    }}
                />
            )}


            
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    nearbyLocationSafeAreaView: {
        backgroundColor: "black",
    },
    nearbyLocationView: {
        padding: 20,
    },
    nearbyLocationText: {
        color: "white",
        lineHeight: 25
    },
    voiceButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 10,
        elevation: 5,
        zIndex: 1,
    },
    voiceIcon: {
        width: 32,
        height: 32,
    },
    locButton: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 10,
        elevation: 5,
        zIndex: 1,
    },

});