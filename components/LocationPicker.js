import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import 'react-native-get-random-values';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { AlertNotificationRoot, Toast, ALERT_TYPE } from 'react-native-alert-notification';

const LocationPicker = ({ navigation }) => {
    const [location, setLocation] = useState({
        latitude: 28.6139,
        longitude: 77.209,
        latitudeDelta: 0.01, // More zoomed in
        longitudeDelta: 0.01,
    });

    const handleConfirmLocation = async () => {
        try {
            await AsyncStorage.setItem('defaultAddress', JSON.stringify(location));
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Location Saved',
                textBody: 'This address has been set as your default.',
            });
            setTimeout(() => {
                navigation.navigate('Home');
            }, 1500); // Delay for 1 second
        } catch (error) {
            console.error('Error saving address:', error);
        }
    };

    const updateLocation = (newLatitude, newLongitude) => {
        setLocation({
            latitude: newLatitude,
            longitude: newLongitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
    };

    return (
        <AlertNotificationRoot>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <MapView
                    key={`${location.latitude}_${location.longitude}`}
                    style={styles.map}
                    region={location}
                >
                    <Marker
                        coordinate={location}
                        draggable
                        onDragEnd={(e) => updateLocation(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)}
                    />
                </MapView>
                <GooglePlacesAutocomplete
                    placeholder="Search for an address"
                    onPress={(data, details = null) => {
                        if (details) {
                            updateLocation(details.geometry.location.lat, details.geometry.location.lng);
                        }
                    }}
                    query={{
                        key: process.env.GOOGLE_MAP_API_KEY,
                        language: 'en',
                    }}
                    fetchDetails={true}
                    styles={autocompleteStyles}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.button, styles.cancelButton]}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleConfirmLocation} style={[styles.button, styles.confirmButton]}>
                        <Text style={styles.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </AlertNotificationRoot>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    button: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 0,
        borderRadius: 0,
    },
    cancelButton: {
        backgroundColor: 'rgba(255, 52, 52, 0.8)',
    },
    confirmButton: {
        backgroundColor: 'rgba(0, 128, 0, 0.8)',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

const autocompleteStyles = {
    container: {
        position: 'absolute',
        top: Platform.select({ ios: 10, android: 10 }),
        width: '100%',
    },
    textInputContainer: {
        width: '100%',
    },
    listView: {
        backgroundColor: 'white'
    },
};

export default LocationPicker;
