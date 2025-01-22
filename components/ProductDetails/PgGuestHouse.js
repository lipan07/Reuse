import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PgGuestHouse = ({ product }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.productTitle}>{product.title}</Text>

            <View style={styles.detailRow}>
                <Text style={styles.label}>PG Type:</Text>
                <Text style={styles.value}>{product.post_details.pg_type}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Furnishing:</Text>
                <Text style={styles.value}>{product.post_details.furnishing}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>ListedBy:</Text>
                <Text style={styles.value}>{product.post_details.listed_by}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Carpet Area:</Text>
                <Text style={styles.value}>{product.post_details.carpet_area}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Meal Included:</Text>
                <Text style={styles.value}>{product.post_details.floor_no}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Car Parking:</Text>
                <Text style={styles.value}>{product.post_details.car_parking}</Text>
            </View>

            <View style={styles.descriptionContainer}>
                <Text style={styles.label}>Description:</Text>
                <Text style={styles.description}>{product.post_details.description}</Text>
            </View>

            <Text style={styles.price}>Price: ${product.post_details.amount}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    productTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detailRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginRight: 5,
    },
    value: {
        fontSize: 16,
        color: '#555',
    },
    descriptionContainer: {
        marginVertical: 10,
    },
    description: {
        fontSize: 15,
        color: '#555',
        lineHeight: 20,
    },
    price: {
        fontSize: 18,
        fontWeight: '700',
        color: 'green',
        marginTop: 10,
    },
});

export default PgGuestHouse;
