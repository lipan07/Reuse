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

    const handleCompanyNamePress = () => {
        navigation.navigate('CompanyDetailsPage', 'Malaq');
    };

    const handleMapPress = () => {
        // Navigate to the FullScreenMap screen
        navigation.navigate('FullScreenMap', {
            latitude: 22.5726,
            longitude: 88.3639,
        });
    };

    const handleChatPress = () => {
        // Assuming you have access to the current user's ID (buyer)
        const buyerId = 'currentUserId'; // Replace with actual buyer's ID
        const sellerId = product.user_id; // Assuming 'user_id' is the seller's ID

        // Navigate to ChatBox and pass necessary parameters
        navigation.navigate('ChatBox', {
            productId: product.id,
            sellerId: sellerId,
            buyerId: buyerId,
            productTitle: product.post_details.title,
        });
    };
    return (
        <View style={styles.container}>
            <ScrollView>
                {/* Horizontal scrollable images */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageContainer}>
                    {product.images.map((image, index) => (
                        <TouchableOpacity key={index} onPress={() => handleImagePress(index)}>
                            <Image source={{ uri: image }} style={styles.image} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Product details */}
                <View style={styles.detailsCard}>
                    <Text style={styles.companyName} onPress={handleCompanyNamePress}>
                        Company: Big-Brain
                    </Text>
                    <Text style={styles.productTitle}>{product.post_details.title}</Text>
                    <Text style={styles.description}>{product.post_details.description}</Text>
                    <Text style={styles.price}>Price: ${product.post_details.amount}</Text>
                </View>

                {/* Wrap the map in TouchableOpacity to navigate to the full-screen map */}
                <TouchableOpacity onPress={handleMapPress} style={styles.mapContainer}>
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
                            title="Big-Brain HQ"
                            description="This is Big-Brain Head-Quarters"
                        />
                    </MapView>
                </TouchableOpacity>
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
        backgroundColor: '#f8f9fa',
    },
    imageContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    image: {
        width: 250,
        height: 300,
        marginRight: 15,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    detailsCard: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        margin: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    companyName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#007bff',
        marginBottom: 5,
    },
    productTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#343a40',
    },
    description: {
        fontSize: 16,
        color: '#6c757d',
        marginBottom: 15,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#28a745',
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
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderColor: '#dee2e6',
    },
    chatButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 30,
        flex: 1,
        marginRight: 10,
        alignItems: 'center',
    },
    callButton: {
        backgroundColor: '#28a745',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 30,
        flex: 1,
        marginLeft: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProductDetails;
