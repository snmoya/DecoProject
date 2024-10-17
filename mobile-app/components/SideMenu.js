/* This component is responsible for rendering the side menu that contains the settings for the Notifications.
* The user can enable or disable the screen blinking, choose the color of the blinking, and select the vibration pattern.
*/
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Dimensions, Switch, Vibration } from 'react-native';
import icons from '../data/icons';

// SideMenu component
const SideMenu = ({ visible, showSideMenu, blinkScreen, setBlinkingEnabled, setBlinkColor, setVibrationPattern }) => {
    const slideAnim = React.useRef(new Animated.Value(-Dimensions.get('window').width)).current;
    const [screenBlinkEnabled, setScreenBlinkEnabled] = useState(false);
    const [selectedColor, setSelectedColor] = useState('rgba(255, 255, 255, 0.6)');
    const [selectedVibration, setSelectedVibration] = useState('soft');

    // Slide the side menu in and out
    React.useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: visible ? 0 : -Dimensions.get('window').width,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    // List of colors for the user to choose from
    const colors = [
        'rgba(255, 255, 255, 0.6)',   // Softer White
        'rgba(255, 87, 51, 0.6)',     // Softer Red
        'rgba(51, 255, 87, 0.6)',     // Softer Green
        'rgba(51, 87, 255, 0.6)',     // Softer Blue              
    ];

    // Vibration patterns
    const vibrationPatterns = {
        soft: [0, 500],            // 1 pulse of vibration.
        medium: [0, 1000], // 2 pulses of vibration.
        strong: [0, 1000, 10, 1000], // 3 pulses of vibration.
        veryStrong: [0, 1000, 10, 1000, 10, 1000], // 4 pulses of vibration.
    };

    // Function to generate random color from the list
    const generateRandomColor = () => {
        const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`; // Generates random RGB color with 60% opacity
        setSelectedColor(randomColor);
        setBlinkColor(randomColor);
    };

    // Function to handle the color selection
    const handleColorSelection = (color) => {
        setSelectedColor(color);
        setBlinkColor(color);
    };

    // Function to handle the vibration pattern selection
    const handleVibrationSelection = (pattern) => {
        setVibrationPattern(vibrationPatterns[pattern]);  // Pass the selected pattern to App.js
        setSelectedVibration(pattern); 
        Vibration.vibrate(vibrationPatterns[pattern]);  
    };

    
    return (
        <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
            <View style={styles.titleSection}>
                <Text style={styles.title}>Settings</Text>

                <TouchableOpacity style={styles.closeButton} onPress={showSideMenu}>
                    <Image source={icons.close} style={styles.closeIcon} />
                </TouchableOpacity>
            </View>

            <View style={styles.blinkSection}>
                <Text style={styles.optionTitle}>Screen Blinking</Text>
                <Text style={styles.profileEmail}>Enable screen blinking every time that you get a new notification</Text>
            </View>

            <View style={styles.buttonSection}>
                {/* Button to manually trigger the blink */}
                <TouchableOpacity style={styles.button} onPress={blinkScreen}>
                    <Text style={styles.buttonText}>Press to try it</Text>
                </TouchableOpacity>


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

                <View style={styles.toggleContainer}>
                    <Text style={styles.toggleLabel}>Enable Screen Blink</Text>
                    <Switch 
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

                </View>


                <View style={styles.dividerLine} />

                <View style={styles.vibrationSection}>
                <Text style={styles.optionTitle}>Vibration Setting</Text>
                <Text style={styles.profileEmail}>Pick a vibration pattern for your notifications </Text>
                </View>

                <View style={styles.vibrationPicker}>
                    <View style={styles.vibrationOptions}>
                        <View style={styles.vibrationColumn}>
                        <TouchableOpacity
                            style={[styles.vibrationButton, selectedVibration === 'soft' && styles.selectedButton]}
                            onPress={() => handleVibrationSelection('soft')}
                        >
                            <Text>Soft</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.vibrationButton, selectedVibration === 'strong' && styles.selectedButton]}
                            onPress={() => handleVibrationSelection('strong')}
                        >
                            <Text>Long</Text>
                        </TouchableOpacity>

                        </View>
                        <View style={styles.vibrationColumn}>
                        <TouchableOpacity
                            style={[styles.vibrationButton, selectedVibration === 'medium' && styles.selectedButton]}
                            onPress={() => handleVibrationSelection('medium')}
                        >
                            <Text>Medium</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.vibrationButton, selectedVibration === 'veryStrong' && styles.selectedButton]}
                            onPress={() => handleVibrationSelection('veryStrong')}
                        >
                            <Text>Extra Long</Text>
                        </TouchableOpacity>
                        </View>
                    </View>

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
    blinkSection: {
        marginBottom: 20,
        marginTop: 40,
    },
    vibrationSection: {
        marginBottom: 5,
        marginTop: 10,
    },
    optionTitle: {
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
        marginBottom: 10,
        marginTop: 10,
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
        marginHorizontal: 20,
        marginTop: 20,
    },
    toggleLabel: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    colorPicker: {
        marginTop: 10,
    },
    colorPickerTitle: {
        fontSize: 16,
        marginBottom: 5,
    },
    colorOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
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
        marginTop: 30,
        backgroundColor: '#FFDEAB',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    randomButtonText: {
        color: '#333',
        fontSize: 16,
    },
    vibrationPicker: {
        marginTop: 20,
    },
    vibrationOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    vibrationColumn: {
        flexDirection: 'column',
    },
    vibrationButton: {
        backgroundColor: '#FFDEAB',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    selectedButton: {
        backgroundColor: '#04AA6D',
        color: '#ffff',

    },
    titleSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 35,
    },
    dividerLine: {
        height: 1,
        backgroundColor: '#ccc',
        marginTop: 20,
        marginBottom: 20,
    },
});

export default SideMenu;