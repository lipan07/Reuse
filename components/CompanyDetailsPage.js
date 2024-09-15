// CompanyDetailsPage.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const CompanyDetailsPage = ({ route }) => {
    const { companyName } = route.params;

    // Dummy data for demonstration
    const companyDetails = {
        logo: require('../assets/icon.png'),
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquet tellus id arcu lobortis, sit amet ultricies ex convallis. Nam ut nisi nec ligula accumsan lobortis. Maecenas ac est odio. Donec id pharetra mauris. Nulla porttitor diam in sollicitudin.',
        rating: 4.5,
        reviews: 100,
        address: '123 Main Street, Cityville, State, Zip',
        email: 'info@example.com',
        phone: '123-456-7890',
        website: 'www.example.com',
        dummyReviews: [
            {
                id: 1,
                user: 'John Doe',
                comment: 'Great company, excellent service!',
                rating: 5,
            },
            {
                id: 2,
                user: 'Jane Smith',
                comment: 'Good products, fast delivery.',
                rating: 4,
            },
            {
                id: 3,
                user: 'Jane Smith',
                comment: 'Good products, fast delivery.',
                rating: 4,
            },
            {
                id: 4,
                user: 'Jane Smith',
                comment: 'Good products, fast delivery.',
                rating: 4,
            },
            // Add more dummy reviews as needed
        ],
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Image source={companyDetails.logo} style={styles.logo} />
                <View style={styles.headerText}>
                    <Text style={styles.companyName}>Malaq</Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Follow</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Visit Website</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Text style={styles.about}>{companyDetails.about}</Text>
            <View style={styles.contactInfo}>
                <Text style={styles.infoTitle}>Address:</Text>
                <Text style={styles.infoText}>{companyDetails.address}</Text>
                <Text style={styles.infoTitle}>Email:</Text>
                <Text style={styles.infoText}>{companyDetails.email}</Text>
                <Text style={styles.infoTitle}>Phone:</Text>
                <Text style={styles.infoText}>{companyDetails.phone}</Text>
                <Text style={styles.infoTitle}>Website:</Text>
                <Text style={styles.infoText}>{companyDetails.website}</Text>
            </View>
            <View style={styles.ratingContainer}>
                <Text style={styles.rating}>Rating: {companyDetails.rating}</Text>
                <Text style={styles.reviews}>Reviews: {companyDetails.reviews}</Text>
            </View>
            <View style={styles.reviewsContainer}>
                <Text style={styles.reviewsTitle}>Recent Reviews:</Text>
                {companyDetails.dummyReviews.map(review => (
                    <View key={review.id} style={styles.reviewItem}>
                        <View style={styles.reviewHeader}>
                            <Text style={styles.reviewUser}>{review.user}</Text>
                            <Text style={styles.reviewRating}>Rating: {review.rating}</Text>
                        </View>
                        <Text style={styles.reviewComment}>{review.comment}</Text>
                    </View>
                ))}
                {/* <TouchableOpacity style={styles.viewAllButton}>
                    <Text style={styles.viewAllButtonText}>View All Reviews</Text>
                </TouchableOpacity> */}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginRight: 20,
        borderRadius: 10,
    },
    headerText: {
        flex: 1,
    },
    companyName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    button: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: '#007bff',
        borderRadius: 5,
        marginRight: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    about: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
    },
    contactInfo: {
        marginBottom: 20,
    },
    infoTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    infoText: {
        marginBottom: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    rating: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007bff',
    },
    reviewsContainer: {
        marginBottom: 20,
    },
    reviewsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    reviewItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        elevation: 3,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    reviewUser: {
        fontWeight: 'bold',
    },
    reviewRating: {
        color: '#007bff',
    },
    reviewComment: {
        color: '#555',
        marginBottom: 10,
    },
    viewAllButton: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    viewAllButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default CompanyDetailsPage;
