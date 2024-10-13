import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, ActivityIndicator, DeviceEventEmitter, Animated, RefreshControl } from 'react-native';
import Swiper from 'react-native-swiper';
import CategoryMenu from './CategoryMenu';
import BottomNavBar from './BottomNavBar';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, TOKEN } from '@env';
const Token = TOKEN;
const Home = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showMenu, setShowMenu] = useState(true); // State to control CategoryMenu visibility
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh

  const lastScrollY = useRef(0); // Track the last scroll position

  // Function to fetch products
  const fetchProducts = async (page, category, reset = false) => {
    if (isLoading) return; // Avoid multiple requests while one is in progress

    setIsLoading(true);
    const apiUrl = `${BASE_URL}/posts?page=${page}${category ? `&category=${category}` : ''}`;
    console.log(apiUrl);
    const requestOptions = {
      method: 'GET',
      headers: { Authorization: `Bearer ${TOKEN}` },
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const jsonResponse = await response.json();
      if (!jsonResponse.data || jsonResponse.data.length === 0) {
        setProducts([]); // Clear product list if no data is returned
        setHasMore(false); // Stop further fetching
      } else if (reset) {
        setProducts(jsonResponse.data); // Reset the product list
      } else {
        setProducts((prevProducts) => [...prevProducts, ...jsonResponse.data]); // Append new data
      }

      setCurrentPage(page);
      setHasMore(jsonResponse.data && jsonResponse.data.length === 15 && jsonResponse.links.next != null);
    } catch (error) {
      console.error('Failed to load products', error);
    } finally {
      setIsLoading(false); // Ensure loading is reset after the API call completes
      setRefreshing(false); // Stop the refreshing animation
    }
  };

  useFocusEffect(
    useCallback(() => {
      setSelectedCategory(null); // Update category ID when a category is selected
      fetchProducts(1, null, true); // Refresh products when screen is focused
    }, [])
  );

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener('refreshHome', () => {
      setSelectedCategory(null);
      fetchProducts(1, null, true); // Refresh products when Home is pressed again
    });

    return () => {
      subscription.remove(); // Clean up the event listener when the component unmounts
    };
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        setIsLoggedIn(false);
        // Fetch user data or perform other actions with the token
        navigation.navigate('Login');
      }
    };
    checkLoginStatus();
  }, []);

  // Handle scrolling to the end of the list
  const handleScrollEndReached = () => {
    if (!isLoading && hasMore) {
      fetchProducts(currentPage + 1, selectedCategory);
    }
  };

  // Refresh products when pulling to refresh or at top
  const handleRefresh = () => {
    setRefreshing(true);
    fetchProducts(1, selectedCategory, true);
  };

  // Handle Scroll to show/hide CategoryMenu and refresh at the top
  const handleScroll = (event) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;

    if (currentScrollY > lastScrollY.current && currentScrollY > 10) {
      // Scrolling up, hide CategoryMenu
      setShowMenu(false);
    } else if (currentScrollY <= 0) {
      // Scrolling to the top, show CategoryMenu and refresh the list
      setShowMenu(true);
      // handleRefresh(); // Trigger refresh when at the top
    } else {
      // setShowMenu(true); // Make sure menu is shown when scrolling down
    }

    lastScrollY.current = currentScrollY;
  };

  // Handle category selection from the CategoryMenu
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId); // Update category ID when a category is selected
    fetchProducts(1, categoryId, true);
  };


  // Render each product item in the FlatList
  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <View style={styles.imageContainer}>
        <Swiper style={styles.swiper} showsPagination autoplay autoplayTimeout={3}>
          {item.images.map((imageUri, index) => (
            <Image key={index} source={{ uri: imageUri }} style={styles.productImage} />
          ))}
        </Swiper>
      </View>
      <Text style={styles.productName}>{item.post_details.title}</Text>
      <Text style={styles.details} numberOfLines={2} ellipsizeMode="tail">
        {item.post_details.description}
      </Text>
      <Text style={styles.price}>Price: ${item.post_details.amount}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <View style={styles.searchBar}>
        <TextInput style={styles.searchInput} placeholder="Search..." />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Conditionally render CategoryMenu based on scroll direction */}
      {showMenu && <CategoryMenu onCategorySelect={handleCategorySelect} />}

      {isLoading && products.length === 0 && <ActivityIndicator size="large" color="#007bff" style={styles.loaderTop} />}

      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        onEndReached={handleScrollEndReached}
        onEndReachedThreshold={0.1}
        onScroll={handleScroll}  // Track scroll to show/hide CategoryMenu
        scrollEventThrottle={16} // Throttle scroll events to 16ms for smooth updates
        ListEmptyComponent={() => (
          !isLoading && <Text style={styles.noProductsText}>No products found</Text>
        )}
        ListFooterComponent={
          products.length > 0 ? (
            isLoading && hasMore ? <ActivityIndicator size="large" color="#007bff" style={styles.loaderBottom} /> : null
          ) : null
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} /> // Pull-to-refresh functionality
        }
      />

      <BottomNavBar navigation={navigation} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', padding: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 0 },
  locationLink: { flexDirection: 'row', alignItems: 'center' },
  locationText: { fontSize: 16, marginLeft: 5 },
  userIcon: { right: 25 },
  searchBar: { flexDirection: 'row', paddingHorizontal: 5, marginVertical: 5 },
  searchInput: { flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, borderRadius: 5 },
  searchButton: { backgroundColor: '#007bff', justifyContent: 'center', paddingHorizontal: 15, borderRadius: 5, marginLeft: 10 },
  buttonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
  productList: { paddingHorizontal: 5, paddingBottom: 60 },
  productItem: { flex: 1, margin: 5, borderRadius: 5, borderWidth: 1, borderColor: '#CCCCCC', padding: 10, alignItems: 'center', backgroundColor: '#F9F9F9' },
  imageContainer: { height: 120, width: '100%', borderRadius: 5, overflow: 'hidden', marginBottom: 8 },
  swiper: { height: '100%' },
  productImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  productName: { fontWeight: 'bold', textAlign: 'center' },
  details: { fontSize: 16, marginTop: 5, marginBottom: 10 },
  price: { fontSize: 16, fontWeight: 'bold' },
  loaderTop: { marginBottom: 10 },
  loaderBottom: { marginTop: 10 },
  noProductsText: { fontSize: 16, textAlign: 'center', marginTop: 20 },
});

export default Home;
