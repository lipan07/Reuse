import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Job = ({ product }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.productTitle}>{product.title}</Text>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Salary Period:</Text>
                <Text style={styles.value}>{product.post_details.salary_period}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Position Type:</Text>
                <Text style={styles.value}>{product.post_details.position_type}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Salary_from:</Text>
                <Text style={styles.value}>{product.post_details.salary_from}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Salry To:</Text>
                <Text style={styles.value}>{product.post_details.salary_to}</Text>
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

export default Job;
