import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const ParentCategoryPanel = ({ categories, onSelectCategory }) => {
  return (
    <ScrollView style={styles.panelContainer}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.panelItem}
          onPress={() => onSelectCategory(category)}
        >
          <Text>{category.name}</Text>
        </TouchableOpacity>
      ))}
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
    backgroundColor: '#e1e1e1',
    borderRadius: 5,
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default ParentCategoryPanel;
