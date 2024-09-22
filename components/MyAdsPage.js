import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import BottomNavBar from './BottomNavBar';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library
import { BASE_URL, TOKEN } from '@env';

const base_url = BASE_URL;
const token = TOKEN;

const MyAdsPage = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showPopup = (item) => {
    setSelectedProduct(item);
    setPopupVisible(true);
  };

  const hidePopup = () => {
    setPopupVisible(false);
  };

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
      if (page == 1) {
        setProducts([]);
      }

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
  const categoryComponentMap = {
    'cars': 'AddCarForm',
    'houses_apartments': 'AddHousesApartments',
    'mobiles': 'AddMobileTablets',
    'heavy_machinery': 'AddHeavyMachinery',

    'land_plots': 'AddLandPlots',
    'pg_guest_houses': 'AddPgGuestHouse',
    'shop_offices': 'AddShopOffices',
    'data_entry_back_office': 'AddJob',
    'sales_marketing': 'AddJob',
    'bpo_telecaller': 'AddJob',
    'driver': 'AddJob',
    'office_assistant': 'AddJob',
    'delivery_collection': 'AddJob',
    'teacher': 'AddJob',
    'cook': 'AddJob',
    'receptionist_front_office': 'AddJob',
    'operator_technician': 'AddJob',
    'engineer_developer': 'AddJob',
    'hotel_travel_executive': 'AddJob',
    'accountant': 'AddJob',
    'designer': 'AddJob',
    'other_jobs': 'AddJob',

    'motorcycles': 'AddMotorcycles',
    'scooters': 'AddScooters',
    'bycycles': 'AddBycycles',

    'accessories': 'AddOthers',
    'computers_laptops': 'AddOthers',
    'tvs_video_audio': 'AddOthers',
    'acs': 'AddOthers',
    'fridges': 'AddOthers',
    'washing_machines': 'AddOthers',
    'cameras_lenses': 'AddOthers',
    'harddisks_printers_monitors': 'AddOthers',
    'kitchen_other_appliances': 'AddOthers',
    'sofa_dining': 'AddOthers',
    'beds_wardrobes': 'AddOthers',
    'home_decor_garden': 'AddOthers',
    'kids_furniture': 'AddOthers',
    'other_household_items': 'AddOthers',
    'mens_fashion': 'AddOthers',
    'womens_fashion': 'AddOthers',
    'kids_fashion': 'AddOthers',
    'books': 'AddOthers',
    'gym_fitness': 'AddOthers',
    'musical_instruments': 'AddOthers',
    'sports_instrument': 'AddOthers',
    'other_hobbies': 'AddOthers',
    'dogs': 'AddOthers',
    'fish_aquarium': 'AddOthers',
    'pets_food_accessories': 'AddOthers',
    'other_pets': 'AddOthers',
    'other_services': 'AddOthers',
    'packers_movers': 'AddOthers',
    'machinery_spare_parts': 'AddOthers',

    'education_classes': 'AddEducationClasses',
    'tours_travels': 'AddToursTravels',
    'electronics_repair_services': 'AddElectronicsRepairServices',
    'health_beauty': 'AddHealthBeauty',
    'home_renovation_repair': 'AddHomeRenovationRepair',
    'cleaning_pest_control': 'AddCleaningPestControl',
    'legal_documentation_sevices': 'AddLegalDocumentationServices',
    'commercial_heavy_vehicles': 'AddCommercialHeavyVehicle',
    'vehicle_spare_parts': 'AddVehicleSpareParts',
    'commercial_heavy_machinery': 'AddCommercialHeavyMachinery',

    'others': 'AddOthers',
  };

  const getComponentForCategory = (guard_name) => {
    return categoryComponentMap[guard_name] || 'AddOthers';
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productItem} onPress={() => showPopup(item)}>
      <Image source={{ uri: item.images[0] }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.post_details.title}</Text>
        <Text style={styles.productDesc}>{item.post_details.description}</Text>
        <Text style={styles.price}>Price: ${item.post_details.amount}</Text>
      </View>
      <Icon name="angle-right" size={24} color="#007BFF" style={styles.arrowIcon} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productList}
        onEndReached={handleScrollEndReached}
        onEndReachedThreshold={0.1}
      />
      <BottomNavBar navigation={navigation} />
      <Modal visible={isPopupVisible} transparent={true} animationType="slide">
        <TouchableWithoutFeedback onPress={hidePopup}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.popupContainer}>
                <Text style={styles.popupTitle}>Choose an option:</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: selectedProduct })}>
                  <Text style={styles.popupOption}>Details</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  // Navigate to the AddOthers component with selectedProduct for editing
                  const editComponent = getComponentForCategory(selectedProduct.category.guard_name);
                  navigation.navigate(editComponent, { category: [], subcategory: selectedProduct.category, product: selectedProduct });
                  hidePopup(); // Hide the popup after navigation
                }}>
                  <Text style={styles.popupOption}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {/* Delete functionality */ }}>
                  <Text style={styles.popupOption}>Delete</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={hidePopup}>
            <Text style={styles.popupOptionClose}>Close</Text>
          </TouchableOpacity> */}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    paddingBottom: 60,
  },
  productItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 5,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  productDesc: {
    // fontWeight: 'bold',
    fontSize: 15,
    color: 'grey'
  },
  price: {
    fontSize: 14,
    color: 'green',
  },
  arrowIcon: {
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    elevation: 5,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  popupOption: {
    marginVertical: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  popupOptionClose: {
    marginVertical: 10,
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
  },
});

export default MyAdsPage;
