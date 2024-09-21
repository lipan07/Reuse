import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import BottomNavBar from './BottomNavBar';
const ProductDetails = ({ route }) => {
    const { product } = route.params;
    const navigation = useNavigation();

    const handleImagePress = (imageIndex) => {
        navigation.navigate('ImageViewer', { images: product.images, selectedImageIndex: imageIndex });
    };

    const handleCallPress = () => {
        // Handle call functionality...
    };

    const handleChatPress = () => {
        // Handle chat functionality...
    };

    const handleCompanyNamePress = () => {
        // Navigate to the CompanyDetailsPage when company name is clicked
        navigation.navigate('CompanyDetailsPage', 'Malaq');
    };
    return (
        <View style={styles.container}>
            <ScrollView>
                {/* Horizontal scrollable images */}
                <ScrollView horizontal style={styles.imageContainer}>
                    {product.images.map((image, index) => (
                        <TouchableOpacity key={index} onPress={() => handleImagePress(index)}>
                            <Image source={{ uri: image }} style={styles.image} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Product details */}
                <View style={styles.detailsContainer}>
                    <Text style={styles.companyName} onPress={handleCompanyNamePress}>
                        Company Name: Big-Brain
                    </Text>
                    <Text style={styles.name}>{product.post_details.title}</Text>
                    <Text style={styles.description}>{product.post_details.description}</Text>
                    <Text style={styles.price}>Price: ${product.post_details.amount}</Text>
                </View>

                {/* Product location map */}
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 22.5726,
                            longitude: 88.3639,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }}>
                        <Marker
                            coordinate={{ latitude: 22.5726, longitude: 88.3639 }}
                            title={"Big-Brain HQ"}
                            description={"This is Big-Brain Head-Quarters"}
                        />
                    </MapView>
                </View>
            </ScrollView>

            {/* Chat and Call buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.chatButton} onPress={handleChatPress}>
                    <Text style={styles.buttonText}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.callButton} onPress={handleCallPress}>
                    <Text style={styles.buttonText}>Call</Text>
                </TouchableOpacity>
            </View>
            {/* Bottom navigation bar */}
            <BottomNavBar />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        // Additional styles as needed...
    },
    imageContainer: {
        height: 300,
    },
    image: {
        width: 300,
        height: 400,
        resizeMode: 'cover',
    },
    detailsContainer: {
        padding: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    companyName: {
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green',
    },
    mapContainer: {
        height: 300,
        margin: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        overflow: 'hidden',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    map: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    chatButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    callButton: {
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProductDetails;
