import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const FullScreenMap = ({ route }) => {
    const { latitude, longitude } = route.params;
    const navigation = useNavigation(); // For navigation back on button press

    const handleClose = () => {
        navigation.goBack(); // Close the map and go back to the previous screen
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}>
                <Marker
                    coordinate={{ latitude, longitude }}
                    title="Big-Brain HQ"
                    description="This is Big-Brain Head-Quarters"
                />
            </MapView>

            {/* Full-width close button */}
            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: 0, // Stick to the bottom of the screen
        left: 0,
        right: 0,
    },
    closeButton: {
        width: '100%', // Full width of the screen
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
        paddingVertical: 15, // Adjust padding for better touch target
        justifyContent: 'center',
        alignItems: 'center', // Center text
    },
    closeButtonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default FullScreenMap;
