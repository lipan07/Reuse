import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const iconMapping = {
    electronics: 'laptop',
    fashion: 'shoe-sneaker',
    furniture: 'lamp',
    services: 'wrench',
    // Add more subcategory mappings as needed
};

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
                        <Icon name={iconMapping[subcategory.guard_name] || 'angles-right'} size={20} color="#FF9800" style={styles.icon} />
                        <Text style={styles.text}>{subcategory.name}</Text>
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
        width: '100%',
        padding: 10,
        backgroundColor: '#f1f1f1',
    },
    panelItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 10,
        backgroundColor: '#d1d1d1',
        borderRadius: 5,
        marginBottom: 8,
    },
    icon: {
        marginRight: 8,
    },
    text: {
        fontSize: 14,
        color: '#333',
        flexShrink: 1,
    },
    noSubcategoryText: {
        padding: 15,
        textAlign: 'center',
        color: '#888',
        fontSize: 14,
    },
});

export default SubCategoryPanel;
