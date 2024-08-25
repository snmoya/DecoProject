import React, { useState, useEffect } from "react";
import { PermissionsAndroid, StyleSheet, Appearance, View, SafeAreaView, Text, Platform } from "react-native";
import MapView, { Circle } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { getDistance } from "geolib";
import { locations } from "../data/locations";
import NotificationWindow from './NotificationWindowOut';
import NotificationWindowIn from './NotificationWindowIn';

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
    if (typeof props.location != "undefined") {
        return (
            <SafeAreaView style={styles.nearbyLocationSafeAreaView}>
                <View style={styles.nearbyLocationView}>
                    <Text style={styles.nearbyLocationText}>
                        {props.location}
                    </Text>
                    {props.distance.nearby &&
                        <Text style={{
                            ...styles.nearbyLocationText,
                            fontWeight: "bold"
                        }}>
                            Within 100 Metres!
                        </Text>
                    }
                </View>
            </SafeAreaView>
        );
    }
}

export default function ShowMap() {

    const updatedLocations = locations.map(location => {
        const latlong = location.latlong.split(", ");
        location.coordinates = {
            latitude: parseFloat(latlong[0]),
            longitude: parseFloat(latlong[1])
        };
        return location;
    });

    const initialMapState = {
        locationPermission: false,
        locations: updatedLocations,
        userLocation: {
            latitude: -27.499526188402154,
            longitude: 152.9728129460468,
        },
        nearbyLocation: {}
    };
    const [mapState, setMapState] = useState(initialMapState);
    const [inZone, setInZone] = useState(false); 
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
                    setMapState({
                        ...mapState,
                        locationPermission: true
                    });
                }
            } catch (error) {
                console.warn(error);
            }
        };

        if (Platform.OS === "android") {
            requestAndroidLocationPermission();
        } else {
            setMapState({
                ...mapState,
                locationPermission: true
            });
        }

    }, []);

    function calculateDistance(userLocation) {
        const nearestLocations = mapState.locations.map(location => {
            const metres = getDistance(
                userLocation,
                location.coordinates
            );
            location["distance"] = {
                metres: metres,
                nearby: metres <= 100 ? true : false
            };
            return location;
        }).sort((previousLocation, thisLocation) => {
            return previousLocation.distance.metres - thisLocation.distance.metres;
        });
        return nearestLocations.shift();
    }

    if (mapState.locationPermission) {
        Geolocation.watchPosition(
            position => {
                const userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
                const nearbyLocation = calculateDistance(userLocation);
                setMapState({
                    ...mapState,
                    userLocation,
                    nearbyLocation: nearbyLocation
                });

                // Check if user is within a zone
                if (nearbyLocation.distance.nearby) {
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
    }

    return (
        <>
            <MapView
                camera={{
                    center: mapState.userLocation,
                    pitch: 0,
                    heading: 0,
                    altitude: 3000,
                    zoom: 15
                }}
                showsUserLocation={mapState.locationPermission}
                style={styles.container}
            >
                {mapState.locations.map(location => (
                    <Circle
                        key={location.id}
                        center={location.coordinates}
                        radius={100}
                        strokeWidth={3}
                        strokeColor="#FEC272"
                        fillColor="rgba(254, 194, 114, 0.3)" 
                    />
                ))}
            </MapView>
            {inZone && showNotificationIn && (
                <NotificationWindowIn 
                    location={mapState.nearbyLocation} 
                    onStopReceiving={handleStopReceiving}
                />
            )}

            {inZone && !showNotificationIn && (
                <NotificationWindow
                    location={mapState.nearbyLocation}
                    onClose={() => setInZone(false)}
                    onPressReceive={handlePressReceive} 
                />
            )}
        </>
    );
}
