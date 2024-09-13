import React, { useState, useEffect } from "react";
import { PermissionsAndroid, StyleSheet, View, SafeAreaView, Text, Platform, TouchableOpacity } from "react-native";
import MapView from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { isPointInPolygon } from "geolib";
import { locations } from "../data/locations";
import NotificationWindow from './NotificationWindowOut';
import NotificationWindowIn from './NotificationWindowIn';
import { Polygon } from "react-native-maps";

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
    }
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

export default function ShowMap() {
    const updatedLocations = locations.map(location => {
        if (location.polygon) {
            location.coordinates = location.polygon.map(([latitude, longitude]) => ({
                latitude,
                longitude
            }));
        }
        return location;
    });

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
    const [showNotificationIn, setShowNotificationIn] = useState(false);

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
                } else {
                    console.log("User is NOT in zone");
                    setInZone(false);
                    setShowNotificationIn(false);
                }
            },
            error => console.log(error)
        );
    }

    const handlePressReceive = () => {
        setShowNotificationIn(true); 
    };

    const handleStopReceiving = () => {
        setShowNotificationIn(false);
        setShowNotificationInSelectedZone(false);
    };

    const handleZonePress = (location) => {
        setMapState({
            ...mapState,
            selectedLocation: location,  // Store the pressed zone information
        });
        setShowNotificationInSelectedZone(true);  // Show the notification window
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

            {mapState.selectedLocation && showNotificationInSelectedZon && (
                <NotificationWindowIn 
                    location={mapState.selectedLocation.location}
                    onStopReceiving={handleStopReceiving}
                />
            )}
        </>
    );
}