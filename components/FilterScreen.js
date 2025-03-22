import React, { useState, useCallback } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet,
    KeyboardAvoidingView, FlatList, Platform, ActivityIndicator, Alert
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { useRoute, useNavigation } from '@react-navigation/native';

const FilterScreen = ({ navigation }) => {
    const route = useRoute();
    const [location, setLocation] = useState({
        latitude: 28.6139,
        longitude: 77.209,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState(route.params?.initialFilters?.location?.address || '');
    const [city, setCity] = useState(route.params?.initialFilters?.location?.city || '');
    const [state, setState] = useState(route.params?.initialFilters?.location?.state || '');
    const [country, setCountry] = useState(route.params?.initialFilters?.location?.country || '');

    const [searchTerm, setSearchTerm] = useState(route.params?.initialFilters?.search || '');
    const [selectedCategory, setSelectedCategory] = useState(route.params?.initialFilters?.category || '');
    const [selectedDistance, setSelectedDistance] = useState(route.params?.initialFilters?.distance || 5);
    const [selectedPriceRange, setSelectedPriceRange] = useState(route.params?.initialFilters?.sortBy || 'Recently Added');
    const [minBudget, setMinBudget] = useState(route.params?.initialFilters?.priceRange?.[0] || '');
    const [maxBudget, setMaxBudget] = useState(route.params?.initialFilters?.priceRange?.[1] || '');

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

    const handleCategorySelect = useCallback((categoryId) => {
        setSelectedCategory(categoryId);
    }, []);

    const handleDistanceSelect = useCallback((distance) => setSelectedDistance(distance), []);
    const handlePriceRangeSelect = useCallback((priceRange) => setSelectedPriceRange(priceRange), []);
    console.log('SelectedCategory -', selectedCategory);

    const handleClearFilters = useCallback(() => {
        setSearchTerm('');
        setLocation({
            latitude: 28.6139,
            longitude: 77.209,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
        setSelectedCategory('');
        setSelectedDistance(5);
        setSelectedPriceRange('Recently Added');
        setMinBudget('');
        setMaxBudget('');
        setAddress('');
        setCity('');
        setState('');
        setCountry('');
        navigation.navigate('Home', { filters: null });
    }, []);

    const handleSubmit = useCallback(async () => {
        setLoading(true);
        const selectedCategoryId = selectedCategory;

        const filters = {
            search: searchTerm,
            category: selectedCategoryId,
            sortBy: selectedPriceRange,
            priceRange: [minBudget, maxBudget],
            distance: selectedDistance,
            location: {
                coordinates: [location.longitude, location.latitude],
                address,
                city,
                state,
                country
            }
        };

        const token = await AsyncStorage.getItem('authToken');
        const queryParams = new URLSearchParams({
            search: filters.search || '',
            category: filters.category || '',
            sortBy: filters.sortBy || '',
            minPrice: filters.priceRange[0],
            maxPrice: filters.priceRange[1],
        }).toString();
        try {
            console.log('Filter-', `${process.env.BASE_URL}/posts?${queryParams}`);
            const response = await fetch(`${process.env.BASE_URL}/posts?${queryParams}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                navigation.navigate('Home', {
                    filters,
                    products: jsonResponse.data
                });
            }
        } finally {
            setLoading(false);
        }
    }, [searchTerm, selectedCategory, selectedPriceRange, minBudget, maxBudget, location, address, city, state, country]);

    const autocompleteStyles = {
        container: { flex: 0, zIndex: 1 },
        textInputContainer: { width: '100%' },
        textInput: {
            backgroundColor: '#FFFFFF',
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 16,
            borderWidth: 1,
            borderColor: '#ddd',
        },
        listView: {
            backgroundColor: '#FFFFFF',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#ddd',
            marginTop: 5,
            zIndex: 2,
        },
    };

    const renderHeader = () => (
        <>
            <TextInput
                style={styles.searchInput}
                value={searchTerm}
                onChangeText={setSearchTerm}
                placeholder="Type here..."
                accessibilityLabel="Search input"
            />
            <View style={styles.locationContainer}>
                <GooglePlacesAutocomplete
                    placeholder={address || "Search for an address"}
                    onPress={(data, details = null) => {
                        if (details) {
                            const addressComponents = details.address_components;
                            const getAddressComponent = (type) => addressComponents.find(component => component.types.includes(type))?.long_name || '';

                            setLocation({
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            });
                            setAddress(data.description);
                            setCity(getAddressComponent('locality'));
                            setState(getAddressComponent('administrative_area_level_1'));
                            setCountry(getAddressComponent('country'));
                        }
                    }}
                    query={{
                        key: process.env.GOOGLE_MAP_API_KEY,
                        language: 'en',
                    }}
                    fetchDetails={true}
                    styles={autocompleteStyles}
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
                        <Text style={[
                            styles.filterText,
                            selectedDistance === distance && styles.filterTextSelected
                        ]}>
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
                            selectedCategory === category.id && styles.categoryItemSelected,
                        ]}
                        onPress={() => handleCategorySelect(category.id)}
                    >
                        <Icon
                            name={category.icon}
                            style={[
                                styles.categoryIcon,
                                selectedCategory === category.id && { color: '#fff' },
                            ]}
                            size={20}
                            color={category.color}
                        />
                        <Text style={[
                            styles.categoryText,
                            selectedCategory === category.id && styles.categoryTextSelected
                        ]}>
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
                        <Text style={[
                            styles.filterText,
                            selectedPriceRange === range && styles.filterTextSelected
                        ]}>
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
        </>
    );

    const renderFooter = () => (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.clearButton} onPress={handleClearFilters}>
                <Text style={styles.clearButtonText}>Clear Filters</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.submitButtonText}>Apply Filters</Text>
                )}
            </TouchableOpacity>
        </View>
    );

    return (
        <AlertNotificationRoot>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <FlatList
                    data={[]}
                    renderItem={null}
                    ListHeaderComponent={renderHeader()}
                    ListFooterComponent={renderFooter()}
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                    keyExtractor={(item, index) => `filter-screen-${index}`}
                />
            </KeyboardAvoidingView>
        </AlertNotificationRoot>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    scrollContainer: { padding: 16 },
    searchInput: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    locationContainer: { marginBottom: 16 },
    distanceTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8
    },
    filterListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16
    },
    filterItem: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        margin: 4,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    filterItemSelected: {
        backgroundColor: '#007BFF',
        borderColor: '#007BFF'
    },
    filterText: { fontSize: 14 },
    filterTextSelected: { color: '#fff' },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8
    },
    categoryListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16
    },
    categoryItem: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        margin: 4,
        borderWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center'
    },
    categoryItemSelected: {
        backgroundColor: '#007BFF',
        borderColor: '#007BFF'
    },
    categoryIcon: { marginRight: 8 },
    categoryText: { fontSize: 14 },
    categoryTextSelected: { color: '#fff' },
    budgetInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16
    },
    budgetInput: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        margin: 4,
        borderWidth: 1,
        borderColor: '#ddd',
        flex: 1
    },
    toText: { marginHorizontal: 8 },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16
    },
    clearButton: {
        backgroundColor: '#6c757d',
        borderRadius: 8,
        padding: 12,
        flex: 1,
        marginRight: 8,
        alignItems: 'center'
    },
    clearButtonText: {
        color: '#fff',
        fontSize: 16
    },
    submitButton: {
        backgroundColor: '#007BFF',
        borderRadius: 8,
        padding: 12,
        flex: 1,
        marginLeft: 8,
        alignItems: 'center'
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16
    },
});

export default FilterScreen;