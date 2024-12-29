import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CategoryMenu = ({ onCategorySelect }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const categories = [
    { id: '1', name: 'Cars', icon: 'car', color: '#FF6347' },
    { id: '2', name: 'Properties', icon: 'home', color: '#4682B4' },
    { id: '3', name: 'Mobile', icon: 'phone-portrait', color: '#32CD32' },
    { id: '4', name: 'Electronics', icon: 'tv', color: '#FFD700' },
    { id: '5', name: 'Bikes', icon: 'bicycle', color: '#D2691E' },
    { id: '6', name: 'Furniture', icon: 'bed', color: '#8A2BE2' },
    { id: '7', name: 'Fashion', icon: 'shirt', color: '#FF69B4' },
    { id: '8', name: 'Books', icon: 'book', color: '#6495ED' },
  ];

  const handleCategorySelect = (id) => {
    setSelectedCategoryId(id);
    onCategorySelect(id);
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        item.id === selectedCategoryId ? styles.selectedCategory : null
      ]}
      onPress={() => handleCategorySelect(item.id)}
    >
      <Icon name={item.icon} size={24} color={item.color} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  categoryItem: {
    marginRight: 20,
    alignItems: 'center',
  },
  categoryName: {
    marginTop: 5,
    fontSize: 12,
    color: '#000', // Default text color
  },
  selectedCategory: {
    borderBottomWidth: 2,
    borderBottomColor: '#007bff', // Blue color for the selected category
  },
});

export default CategoryMenu;
