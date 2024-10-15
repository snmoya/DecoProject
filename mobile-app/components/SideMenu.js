import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Dimensions, Switch } from 'react-native';
import icons from '../data/icons';

const SideMenu = ({ visible, showSideMenu, blinkScreen, setBlinkingEnabled, setBlinkColor }) => {
    const slideAnim = React.useRef(new Animated.Value(-Dimensions.get('window').width)).current;
    const [screenBlinkEnabled, setScreenBlinkEnabled] = useState(false);
    const [selectedColor, setSelectedColor] = useState('rgba(255, 255, 255, 0.6)');

    React.useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: visible ? 0 : -Dimensions.get('window').width,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    const colors = [
        'rgba(255, 255, 255, 0.6)',   // Softer White
        'rgba(255, 87, 51, 0.6)',     // Softer Red
        'rgba(51, 255, 87, 0.6)',     // Softer Green
        'rgba(51, 87, 255, 0.6)',     // Softer Blue                   // Random color option
    ];

    // Function to generate random color from the list
    const generateRandomColor = () => {
        const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`; // Generates random RGB color with 60% opacity
        setSelectedColor(randomColor);
        setBlinkColor(randomColor);
    };

    const handleColorSelection = (color) => {
        setSelectedColor(color);
        setBlinkColor(color);
    };
    
    return (
        <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
            <TouchableOpacity style={styles.closeButton} onPress={showSideMenu}>
                <Image source={icons.close} style={styles.closeIcon} />
            </TouchableOpacity>

            <View style={styles.profileSection}>
                <Text style={styles.profileName}>Screen Blinking</Text>
                <Text style={styles.profileEmail}>Enable screen blinking every time that you get a new notification</Text>
            </View>

            <View style={styles.buttonSection}>
                {/* Button to manually trigger the blink */}
                <TouchableOpacity style={styles.button} onPress={blinkScreen}>
                    <Text style={styles.buttonText}>Press to try it</Text>
                </TouchableOpacity>

                <View style={styles.toggleContainer}>
                    <Text style={styles.toggleLabel}>Enable Screen Blink</Text>

                </View>
                    <Switch style={styles.toggleContainer}
                            value={screenBlinkEnabled}
                            onValueChange={(value) => {
                            console.log("Screen Blink Enabled set to:", value);
                            setScreenBlinkEnabled(value);
                            setBlinkingEnabled(value);
                            console.log("SetBlinkingEnable with value:", value);
                            }}
                            trackColor={{ false: '#767577', true: '#FFDEAB' }}
                            thumbColor={screenBlinkEnabled ? '#04AA6D' : '#f4f3f4'}
                        />
                <View style={styles.colorPicker}>
                    <Text style={styles.colorPickerTitle}>Choose Blink Color:</Text>
                    <View style={styles.colorOptions}>
                        {colors.map((color) => (
                            <TouchableOpacity
                                key={color}
                                style={[styles.colorOption, { backgroundColor: color }]}
                                onPress={() => handleColorSelection(color)}
                            >
                                {selectedColor === color && (
                                    <View style={styles.selectedColorIndicator} />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity style={styles.randomButton} onPress={generateRandomColor}>
                        <Text style={styles.randomButtonText}>Random Color</Text>
                    </TouchableOpacity>
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
        marginTop: 5,
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
    button: {
        backgroundColor: '#FFDEAB',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
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
        marginHorizontal: 20,
    },
    toggleLabel: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    colorPicker: {
        marginTop: 20,
    },
    colorPickerTitle: {
        fontSize: 16,
        marginBottom: 10,
    },
    colorOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    colorOption: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedColorIndicator: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: 'rgba(0, 0, 0, 0.6)',
        backgroundColor: 'transparent',
    },
    randomButton: {
        marginTop: 40,
        backgroundColor: '#04AA6D',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    randomButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default SideMenu;