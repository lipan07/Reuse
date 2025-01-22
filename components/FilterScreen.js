import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const FilterScreen = ({ navigation }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedDistance, setSelectedDistance] = useState(5);
    const [selectedPriceRange, setSelectedPriceRange] = useState('Recently Added');
    const [minBudget, setMinBudget] = useState('');
    const [maxBudget, setMaxBudget] = useState('');

    // Categories list aligned with CategoryMenu
    const categories = [
        { id: '', name: 'All', icon: 'list', color: '#8A2BE2' },
        { id: '1', name: 'Cars', icon: 'car', color: '#FF6347' },
        { id: '2', name: 'Properties', icon: 'home', color: '#4682B4' },
        { id: '7', name: 'Mobile', icon: 'phone-portrait', color: '#32CD32' },
        { id: '29', name: 'Electronics', icon: 'tv', color: '#FFD700' },
        { id: '24', name: 'Bikes', icon: 'bicycle', color: '#D2691E' },
        { id: '45', name: 'Furniture', icon: 'bed', color: '#8A2BE2' },
        { id: '51', name: 'Fashion', icon: 'shirt', color: '#FF69B4' },
        { id: '55', name: 'Books', icon: 'book', color: '#6495ED' },
    ];

    const distances = [5, 10, 15, 20, 25];
    const priceRanges = ['Recently Added', 'Price: Low to High', 'Price: High to Low'];

    const handleCategorySelect = (category) => setSelectedCategory(category);
    const handleDistanceSelect = (distance) => setSelectedDistance(distance);
    const handlePriceRangeSelect = (priceRange) => setSelectedPriceRange(priceRange);
    const handleClearFilters = () => {
        setSearchTerm('');
        setLocation('');
        setLatitude(null);
        setLongitude(null);
        setSelectedCategory('All');
        setSelectedDistance(5);
        setSelectedPriceRange('Recently Added');
        setMinBudget('');
        setMaxBudget('');
    };

    const handleSubmit = async () => {
        const selectedCategoryId = categories.find((cat) => cat.name === selectedCategory)?.id;
        const filters = { search: searchTerm, category: selectedCategoryId, sortBy: selectedPriceRange, priceRange: [100, 500] };

        const token = await AsyncStorage.getItem('authToken');

        const queryParams = new URLSearchParams({
            search: filters.search || '',
            category: filters.category || '',
            sortBy: filters.category || '',
            minPrice: filters.priceRange[0],
            maxPrice: filters.priceRange[1],
        }).toString();
        const apiUrl = `${process.env.BASE_URL}/posts?${queryParams}`;
        console.log('Advanced filters apiUrl-', apiUrl);
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });

            const jsonResponse = await response.json();
            console.log('Advanced filters-', filters);

            if (response.ok) {
                navigation.navigate('Home', { filters, products: jsonResponse.data });
            } else {
                console.error('Failed to fetch filtered products');
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TextInput
                    style={styles.searchInput}
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    placeholder="Type here..."
                />

                <View style={styles.locationContainer}>
                    <GooglePlacesAutocomplete
                        placeholder="Search for an address"
                        onPress={(data, details = null) => {
                            if (details) {
                                setLocation(data.description);
                                setLatitude(details.geometry.location.lat);
                                setLongitude(details.geometry.location.lng);
                            }
                        }}
                        query={{
                            key: process.env.GOOGLE_MAP_API_KEY,
                            language: 'en',
                        }}
                        fetchDetails={true}
                        styles={{
                            textInput: styles.locationInput,
                            listView: styles.autocompleteDropdown,
                        }}
                    />
                </View>

                <Text style={styles.distanceTitle}>Select Search Distance</Text>
                <View style={styles.filterListContainer}>
                    {distances.map((distance, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.filterItem,
                                selectedDistance === distance && styles.filterItemSelected,
                            ]}
                            onPress={() => handleDistanceSelect(distance)}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    selectedDistance === distance && styles.filterTextSelected,
                                ]}
                            >
                                {distance} km
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Select Category</Text>
                <View style={styles.categoryListContainer}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={[
                                styles.categoryItem,
                                selectedCategory === category.name && styles.categoryItemSelected,
                            ]}
                            onPress={() => handleCategorySelect(category.name)}
                        >
                            <Icon
                                name={category.icon}
                                style={[
                                    styles.categoryIcon,
                                    selectedCategory === category.name && { color: '#fff' },
                                ]}
                                size={20}
                                color={category.color}
                            />
                            <Text
                                style={[
                                    styles.categoryText,
                                    selectedCategory === category.name && styles.categoryTextSelected,
                                ]}
                            >
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Sort By</Text>
                <View style={styles.filterListContainer}>
                    {priceRanges.map((range, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.filterItem,
                                selectedPriceRange === range && styles.filterItemSelected,
                            ]}
                            onPress={() => handlePriceRangeSelect(range)}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    selectedPriceRange === range && styles.filterTextSelected,
                                ]}
                            >
                                {range}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>By Budget</Text>
                <View style={styles.budgetInputContainer}>
                    <TextInput
                        style={styles.budgetInput}
                        value={minBudget}
                        onChangeText={setMinBudget}
                        keyboardType="numeric"
                        placeholder="Min"
                    />
                    <Text style={styles.toText}>to</Text>
                    <TextInput
                        style={styles.budgetInput}
                        value={maxBudget}
                        onChangeText={setMaxBudget}
                        keyboardType="numeric"
                        placeholder="Max"
                    />
                </View>
            </ScrollView>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.clearButton} onPress={handleClearFilters}>
                    <Text style={styles.clearButtonText}>Clear Filters</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Apply Filters</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    scrollContainer: { padding: 16 },
    searchInput: { backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 16, borderWidth: 1, borderColor: '#ddd' },
    locationContainer: { marginBottom: 16 },
    locationInput: { backgroundColor: '#fff', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#ddd' },
    autocompleteDropdown: { position: 'absolute', top: 40, zIndex: 10, backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
    distanceTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, marginTop: 5 },
    filterListContainer: { flexDirection: 'row', flexWrap: 'wrap' },
    filterItem: { padding: 12, borderRadius: 8, backgroundColor: '#fff', marginRight: 8, marginBottom: 8, borderWidth: 1, borderColor: '#ddd' },
    filterItemSelected: { backgroundColor: '#007bff', borderColor: '#007bff' },
    filterText: { fontSize: 14 },
    filterTextSelected: { color: '#fff' },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, marginTop: 15 },
    categoryListContainer: { flexDirection: 'row', flexWrap: 'wrap' },
    categoryItem: { padding: 12, borderRadius: 8, backgroundColor: '#fff', marginRight: 8, marginBottom: 8, borderWidth: 1, borderColor: '#ddd', flexDirection: 'row', alignItems: 'center' },
    categoryItemSelected: { backgroundColor: '#007bff', borderColor: '#007bff' },
    categoryText: { marginLeft: 8 },
    categoryTextSelected: { color: '#fff' },
    categoryIcon: { fontSize: 18 },
    categoryIconSelected: { color: '#fff' },
    budgetInputContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
    budgetInput: { flex: 1, padding: 8, borderRadius: 8, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', textAlign: 'center' },
    toText: { marginHorizontal: 8, fontSize: 16, fontWeight: 'bold' },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#ddd' },
    clearButton: { backgroundColor: '#f44336', padding: 16, borderRadius: 8, flex: 1, marginRight: 8, alignItems: 'center' },
    clearButtonText: { color: '#fff', fontWeight: 'bold' },
    submitButton: { backgroundColor: '#007bff', padding: 16, borderRadius: 8, flex: 1, marginLeft: 8, alignItems: 'center' },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FilterScreen;
