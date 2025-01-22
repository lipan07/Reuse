import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import heart icon
import MapView, { Marker } from 'react-native-maps';
import BottomNavBar from './BottomNavBar';
import Car from './ProductDetails/Car';
import Mobile from './ProductDetails/Mobile';
import Bycycle from './ProductDetails/Bycycle';
import CleaningPestControl from './ProductDetails/CleaningPestControl';
import CommercialHeavyMachinery from './ProductDetails/CommercialHeavyMachinery';
import EducationClasses from './ProductDetails/EducationClasses';
import Electronics from './ProductDetails/Electronics';
import HomeRenovation from './ProductDetails/HomeRenovation';
import HouseApartment from './ProductDetails/HouseApartment';
import Job from './ProductDetails/Job';
import LandPlot from './ProductDetails/LandPlot';
import LegalService from './ProductDetails/LegalService';
import Motorcycle from './ProductDetails/Motorcycle';
import PgGuestHouse from './ProductDetails/PgGuestHouse';
import Scooter from './ProductDetails/Scooter';
import ToursTravel from './ProductDetails/ToursTravel';
import VehicleSparePart from './ProductDetails/VehicleSparePart';
import Others from './ProductDetails/Others';

const ProductDetails = () => {
    const [buyerId, setBuyerId] = useState(null);
    const [isFollowed, setIsFollowed] = useState(false); // State to track follow status
    const navigation = useNavigation();
    const route = useRoute();
    const { product } = route.params;
    console.log(JSON.stringify(product, null, 2));

    useEffect(() => {
        const loadBuyerId = async () => {
            try {
                const storedBuyerId = await AsyncStorage.getItem('userId');
                setBuyerId(storedBuyerId);
            } catch (error) {
                console.error('Failed to load buyer ID:', error);
            }
        };
        loadBuyerId();

        if (product && typeof product.follower !== 'undefined') {
            setIsFollowed(product.follower); // Update isFollowed based on product.follower
        }
    }, [product]);

    const toggleFollow = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken'); // Fetch token for authentication
            const response = await fetch(`${process.env.BASE_URL}/follow-post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Include auth token
                },
                body: JSON.stringify({
                    post_id: product.id, // Assuming product contains the company ID
                }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Log response message
                setIsFollowed((prev) => !prev); // Toggle follow state locally
            } else {
                console.error('Failed to follow/unfollow the company.');
            }
        } catch (error) {
            console.error('Error in toggleFollow:', error);
        }
    };

    const handleChatWithSeller = () => {
        if (buyerId) {
            navigation.navigate('ChatBox', {
                sellerId: product.user_id,
                buyerId,
                postId: product.id
            });
        } else {
            console.log("Buyer ID not found");
        }
    };

    const handleCallPress = () => {
        console.log("Calling functionality would be implemented here.");
    };

    const handleMapPress = () => {
        navigation.navigate('FullScreenMap', {
            latitude: product.latitude || 22.680360,
            longitude: product.longitude || 88.393776,
        });
    };

    const renderDetails = () => {
        switch (product.category_id) {
            case 1:
                return <Car product={product} />
            case 3:
                return <HouseApartment product={product} />
            case 4:
                return <LandPlot product={product} />
            case 5:
                return <PgGuestHouse product={product} />
            case 7:
                return <Mobile product={product} />
            case 27:
                return <Bycycle product={product} />
            case 72:
                return <CleaningPestControl product={product} />
            case 43:
                return <CommercialHeavyMachinery product={product} />
            case 67:
                return <EducationClasses product={product} />
            case 69:
                return <Electronics product={product} />
            case 71:
                return <HomeRenovation product={product} />
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 23:
                return <Job product={product} />
            case 73:
                return <LegalService product={product} />
            case 25:
                return <Motorcycle product={product} />
            case 26:
                return <Scooter product={product} />
            case 68:
                return <ToursTravel product={product} />
            case 41:
                return <VehicleSparePart product={product} />
            case 38:
            case 30:
            case 31:
            case 32:
            case 33:
            case 34:
            case 35:
            case 36:
            case 37:
            case 46:
            case 47:
            case 48:
            case 49:
            case 50:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
            case 58:
            case 59:
            case 59:
            case 60:
            case 61:
            case 62:
            case 63:
            case 64:
            case 65:
            case 75:
            case 74:
            case 44:
                return <Others product={product} />
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageContainer}>
                    {product.images.map((image, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigation.navigate('ImageViewer', { images: product.images, selectedImageIndex: index })}
                        >
                            <Image source={{ uri: image }} style={styles.image} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={styles.detailsCard}>
                    <View style={styles.companyHeader}>
                        <Text style={styles.companyName} onPress={() => navigation.navigate('CompanyDetailsPage', { userId: product.user.id })}>
                            Company: {product.user.name}
                        </Text>
                        <TouchableOpacity onPress={toggleFollow}>
                            <Icon
                                name={isFollowed ? 'heart' : 'heart-outline'}
                                size={28}
                                color={isFollowed ? 'red' : 'gray'}
                                style={styles.heartIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    {renderDetails()}

                </View>

                <View style={styles.detailsCard}>
                    <View style={styles.mapAddressContainer}>
                        <View style={styles.addressContainer}>
                            <Text style={styles.addressHeader}>Location Details</Text>
                            <Text style={styles.addressText}>Latitude: {product.latitude}</Text>
                            <Text style={styles.addressText}>Longitude: {product.longitude}</Text>
                        </View>
                        <TouchableOpacity onPress={handleMapPress} style={styles.mapContainer} activeOpacity={0.9}>
                            <MapView
                                style={styles.map}
                                initialRegion={{
                                    latitude: product.latitude || 22.5726,
                                    longitude: product.longitude || 88.3639,
                                    latitudeDelta: 0.02,
                                    longitudeDelta: 0.02,
                                }}
                                provider="google" // Use Google Maps
                                scrollEnabled={false} // Make map non-interactive
                            >
                                <Marker
                                    coordinate={{
                                        latitude: product.latitude || 22.5726,
                                        longitude: product.longitude || 88.3639,
                                    }}
                                />
                            </MapView>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {buyerId && buyerId !== product.user_id && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.chatButton} onPress={handleChatWithSeller}>
                        <Text style={styles.buttonText}>Chat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.callButton} onPress={handleCallPress}>
                        <Text style={styles.buttonText}>Call</Text>
                    </TouchableOpacity>
                </View>
            )}

            <BottomNavBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa' },
    imageContainer: { paddingVertical: 10, paddingHorizontal: 15 },
    image: { width: 250, height: 300, marginRight: 15, borderRadius: 10, resizeMode: 'cover' },
    detailsCard: {
        backgroundColor: '#ffffff', borderRadius: 10, padding: 20, margin: 15,
        shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3
    },
    companyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    companyName: { fontSize: 18, fontWeight: '600', color: '#007bff' },
    heartIcon: { marginLeft: 10 },
    productTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#343a40' },
    description: { fontSize: 16, color: '#6c757d', marginBottom: 15 },
    price: { fontSize: 20, fontWeight: 'bold', color: '#28a745' },
    buttonContainer: {
        flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15,
        backgroundColor: '#ffffff', borderTopWidth: 1, borderColor: '#dee2e6'
    },
    chatButton: {
        backgroundColor: '#007bff', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 30, flex: 1, marginRight: 10, alignItems: 'center'
    },
    callButton: {
        backgroundColor: '#28a745', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 30, flex: 1, marginLeft: 10, alignItems: 'center',
    },
    buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
    mapAddressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addressContainer: {
        flex: 1,
        paddingRight: 10,
    },
    mapContainer: {
        height: 150,
        width: 150,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        overflow: 'hidden'
    },
    addressHeader: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5
    },
    addressText: {
        fontSize: 16,
        marginBottom: 5
    },
    map: {
        height: '100%',
        width: '100%'
    },
});

export default ProductDetails;
