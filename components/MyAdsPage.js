import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import BottomNavBar from './BottomNavBar';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

const MyAdsPage = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isDeleteConfirmVisible, setDeleteConfirmVisible] = useState(false); // State for delete confirmation modal

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token = await AsyncStorage.getItem('authToken');
    try {
      const response = await fetch(`${process.env.BASE_URL}/my-post`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const jsonResponse = await response.json();
      setProducts(jsonResponse.data || []);
    } catch (error) {
      console.error("Failed to load products", error);
      Dialog.show({
        type: ALERT_TYPE.ERROR,
        title: 'Error',
        textBody: 'Failed to load products.',
        button: 'Try again',
        onPressButton: fetchProducts,
      });
    }
  };

  const deleteProduct = async () => {
    const token = await AsyncStorage.getItem('authToken');
    try {
      const response = await fetch(`${process.env.BASE_URL}/posts/${selectedProduct.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setProducts(products.filter(item => item.id !== selectedProduct.id));
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Post deleted successfully.',
          button: 'OK',
        });
      } else {
        throw new Error('Failed to delete the post');
      }
    } catch (error) {
      console.error("Delete failed", error);
      Dialog.show({
        type: ALERT_TYPE.ERROR,
        title: 'Error',
        textBody: 'Failed to delete the post.',
        button: 'Try again',
      });
    }
  };

  const showPopup = (item) => {
    setSelectedProduct(item);
    setPopupVisible(true);
  };

  const hidePopup = () => {
    setPopupVisible(false);
  };

  const showDeleteConfirmModal = () => {
    setDeleteConfirmVisible(true);
  };

  const hideDeleteConfirmModal = () => {
    setDeleteConfirmVisible(false);
  };

  const confirmDelete = () => {
    hideDeleteConfirmModal();
    deleteProduct();
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
        <Text style={styles.productName}>{item.title}</Text>
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
      />
      <BottomNavBar navigation={navigation} />

      {/* Action Modal */}
      <Modal
        visible={isPopupVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={hidePopup}
      >
        <TouchableWithoutFeedback onPress={hidePopup}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.popupContainer}>
                <Text style={styles.popupTitle}>Choose an option:</Text>
                <TouchableOpacity
                  onPress={() => {
                    hidePopup();
                    setTimeout(() => {
                      navigation.navigate('ProductDetails', { product: selectedProduct });
                    }, 300);
                  }}
                >
                  <Text style={styles.popupOption}>Details</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity
                  onPress={() => {
                    hidePopup();
                    setTimeout(() => {
                      navigation.navigate('MyFollowersPage', { product: selectedProduct });
                    }, 300);
                  }}
                >
                  <Text style={styles.popupOption}>Followers</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity
                  onPress={() => {
                    hidePopup();
                    setTimeout(() => {
                      const editComponent = getComponentForCategory(selectedProduct.category.guard_name);
                      navigation.navigate(editComponent, { category: [], subcategory: selectedProduct.category, product: selectedProduct });
                    }, 300);
                  }}
                >
                  <Text style={styles.popupOption}>Edit</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity
                  onPress={() => {
                    hidePopup();
                    showDeleteConfirmModal();
                  }}
                >
                  <Text style={[styles.popupOption, styles.deleteOption]}>Delete</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={isDeleteConfirmVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={hideDeleteConfirmModal}
      >
        <TouchableWithoutFeedback onPress={hideDeleteConfirmModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.confirmContainer}>
              <Text style={styles.confirmTitle}>Are you sure you want to delete this post?</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.cancelButton} onPress={hideDeleteConfirmModal}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmButton} onPress={confirmDelete}>
                  <Text style={styles.confirmButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
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
    fontSize: 15,
    color: 'grey',
  },
  price: {
    fontSize: 14,
    color: 'green',
  },
  separator: {
    height: 1,
    backgroundColor: '#e4f0e6', // Make sure this color is visible
    marginVertical: 7, // Adjust margin for spacing
    width: '40%', // Ensure it takes the full width of the parent container
  },
  arrowIcon: {
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Slightly more opaque background
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    width: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    flexDirection: 'column', // Ensures that elements are arranged vertically
    alignItems: 'center', // Center content inside the modal
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  popupOption: {
    marginVertical: 12,
    fontSize: 16,
    textAlign: 'center',
    color: '#007BFF',
    fontWeight: '500',
    flexDirection: 'row',
    alignItems: 'center', // Align the icon and text horizontally
  },
  deleteOption: {
    color: '#FF5C5C', // Red color for delete option
  },
  confirmContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  confirmTitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#d9534f',
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#000',
  },
  confirmButtonText: {
    color: '#fff',
  },
});

export default MyAdsPage;
