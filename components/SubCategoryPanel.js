import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const SubCategoryPanel = ({ subcategories, onSelectSubcategory }) => {
    return (
        <ScrollView style={styles.panelContainer}>
            {subcategories.length > 0 ? (
                subcategories.map((subcategory) => (
                    <TouchableOpacity
                        key={subcategory.id}
                        style={styles.panelItem}
                        onPress={() => onSelectSubcategory(subcategory)}
                    >
                        <Text>{subcategory.name}</Text>
                    </TouchableOpacity>
                ))
            ) : (
                <Text style={styles.noSubcategoryText}>No Subcategories</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    panelContainer: {
        width: '50%',
        padding: 10,
        backgroundColor: '#f1f1f1',
    },
    panelItem: {
        padding: 15,
        backgroundColor: '#d1d1d1',
        borderRadius: 5,
        marginBottom: 5,
        textAlign: 'center',
    },
    noSubcategoryText: {
        padding: 15,
        textAlign: 'center',
        color: '#888',
    },
});

export default SubCategoryPanel;
