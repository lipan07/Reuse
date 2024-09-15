import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Swiper from 'react-native-swiper';  // Import Swiper
import BottomNavBar from './BottomNavBar';
import { BASE_URL, TOKEN } from '@env';

const base_url = BASE_URL;
const token = TOKEN;

const MyAdsPage = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async (page, reset = false) => {
    setIsLoading(true);

    const apiUrl = `${base_url}/my-post?page=${page}`;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", 'Bearer ' + token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const jsonResponse = await response.json();

      if (reset) {
        setProducts(jsonResponse.data);
      } else {
        setProducts(prevProducts => [...prevProducts, ...jsonResponse.data]);
      }

      setCurrentPage(page);
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, []);

  const handleScrollEndReached = () => {
    if (!isLoading) {
      fetchProducts(currentPage + 1);
    }
  };

  const handleScrollTopReached = () => {
    if (!isLoading && currentPage > 1) {
      fetchProducts(1, true);
      setCurrentPage(1);
    }
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <View style={styles.imageContainer}>
        <Swiper
          style={styles.swiper}
          showsPagination
          autoplay
          autoplayTimeout={3}
        >
          {item.images.map((imageUri, index) => (
            <Image
              key={index}
              source={{ uri: imageUri }}
              style={styles.productImage}
            />
          ))}
        </Swiper>
      </View>
      <Text style={styles.productName}>{item.post_details.title}</Text>
      <Text style={styles.details} numberOfLines={2} ellipsizeMode="tail">{item.post_details.description}</Text>
      <Text style={styles.price}>Price: ${item.post_details.amount}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        onEndReached={handleScrollEndReached}
        onEndReachedThreshold={0.1}
        onScroll={({ nativeEvent }) => {
          if (nativeEvent.contentOffset.y === 0) {
            handleScrollTopReached();
          }
        }}
      />
      <BottomNavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  productList: {
    paddingHorizontal: 5,
    paddingBottom: 60,
  },
  productItem: {
    flex: 1,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  imageContainer: {
    height: 120,
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  swiper: {
    height: '100%',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productName: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  details: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default MyAdsPage;
