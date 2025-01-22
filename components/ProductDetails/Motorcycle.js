import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Motorcycle = ({ product }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.productTitle}>{product.title}</Text>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Brand:</Text>
                <Text style={styles.value}>{product.post_details.brand}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Year:</Text>
                <Text style={styles.value}>{product.post_details.year}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>KM Driven:</Text>
                <Text style={styles.value}>{product.post_details.km_driven}</Text>
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

export default Motorcycle;
