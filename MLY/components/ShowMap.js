import React, { useState, useEffect } from "react";
import { PermissionsAndroid, StyleSheet, View, SafeAreaView, Text, Platform, TouchableOpacity, Image } from "react-native";
import MapView from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { isPointInPolygon } from "geolib";
import { locations } from "../data/locations";
import NotificationWindow from './NotificationWindowOut';
import NotificationWindowIn from './NotificationWindowIn';
import { Polygon } from "react-native-maps";
import icons from '../data/icons';

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
        zIndex: 100,
    },
    voiceIcon: {
        width: 32,
        height: 32,
    },
});

function NearbyLocation(props) {
    if (typeof props.location !== "undefined") {
        return (
            <SafeAreaView style={styles.nearbyLocationSafeAreaView}>
                <View style={styles.nearbyLocationView}>
                    <Text style={styles.nearbyLocationText}>
                        {props.location}
                    </Text>
                    {props.distance.nearby && (
                        <Text style={{ ...styles.nearbyLocationText, fontWeight: "bold" }}>
                            Within 100 Metres!
                        </Text>
                    )}
                </View>
            </SafeAreaView>
        );
    }
}

export default function ShowMap({navigation}) {
    const updatedLocations = locations.map(location => {
        if (location.polygon) {
            location.coordinates = location.polygon.map(([latitude, longitude]) => ({
                latitude,
                longitude
            }));
        }
        return location;
    });

    const [buttonPosition, setButtonPosition] = useState(30);

    const initialMapState = {
        locationPermission: false,
        locations: updatedLocations,
        userLocation: {
            latitude: -27.50005001846802,
            longitude: 153.01330426605935,
        },
        nearbyLocation: {},
        selectedLocation: null,
    };

    const [mapState, setMapState] = useState(initialMapState);
    const [inZone, setInZone] = useState(false); 
    const [showNotificationInZone, setShowNotificationInZone] = useState(false);
    const [showNotificationInSelectedZone, setShowNotificationInSelectedZone] = useState(false);

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

    function checkIfUserInZone(userLocation) {
        const updatedLocations = mapState.locations.map(location => {
            const inZone = isPointInPolygon(userLocation, location.coordinates);
            location["distance"] = { nearby: inZone };
            return location;
        });

        return updatedLocations.find(location => location.distance.nearby);
    }

    if (mapState.locationPermission) {
        Geolocation.watchPosition(
            position => {
                const userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };

                const nearbyLocation = checkIfUserInZone(userLocation);

                setMapState({
                    ...mapState,
                    userLocation,
                    nearbyLocation: nearbyLocation,
                });

                if (nearbyLocation && nearbyLocation.distance.nearby) {
                    console.log("User is IN a zone");
                    setInZone(true);
                    setButtonPosition(280);
                } else {
                    console.log("User is NOT in zone");
                    setInZone(false);
                    setShowNotificationIn(false);
                    setButtonPosition(30);
                }
            },
            error => console.log(error)
        );
    }

    const handlePressReceive = () => {
        setShowNotificationInZone(true); 
    };

    const handleStopReceiving = () => {
        setShowNotificationIn(false);
        setShowNotificationInSelectedZone(false);
    };

    const handleZonePress = (location) => {
        setMapState({
            ...mapState,
            selectedLocation: location,
        });
        setShowNotificationInSelectedZone(true);  
    };

    return (
        <>
            <MapView
                camera={{
                    center: mapState.userLocation,
                    pitch: 0,
                    heading: 0,
                    altitude: 3000,
                    zoom: 15,
                }}
                showsUserLocation={mapState.locationPermission}
                style={styles.container}
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

            <View style={[styles.voiceButton, { bottom: buttonPosition }]}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('VoiceToText')}
                >
                    <Image source={icons.voice} style={styles.voiceIcon} />
                </TouchableOpacity>
            </View>

            {inZone && showNotificationInZone && (
                <NotificationWindowIn 
                    location={mapState.nearbyLocation.location} 
                    onStopReceiving={handleStopReceiving}
                />
            )}

            {inZone && !showNotificationInZone && (
                <NotificationWindow
                    location={mapState.nearbyLocation.location}
                    onClose={() => setInZone(false)}
                    onPressReceive={handlePressReceive} 
                />
            )}

            {mapState.selectedLocation && showNotificationInSelectedZone && (
                <NotificationWindowIn 
                    location={mapState.selectedLocation.location}
                    onStopReceiving={handleStopReceiving}
                />
            )}

        </>
    );
}