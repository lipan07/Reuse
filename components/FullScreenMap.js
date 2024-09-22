import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const FullScreenMap = ({ route }) => {
    const { latitude, longitude } = route.params;
    console.log(latitude);
    console.log(longitude);

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
});

export default FullScreenMap;
