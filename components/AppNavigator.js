import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import all necessary components
import Home from './Home';
import FilterScreen from './FilterScreen';
import ProductDetails from './ProductDetailsPage';
import FullScreenMap from './FullScreenMap';
import ImageViewer from './ImageViewer';
import ChatBox from './ChatBox';
import ChatList from './ChatList';
import MyAdsPage from './MyAdsPage';
import Profile from './Profile';
import Login from './Login';
import EditProfilePage from './EditProfilePage';
import AccountPage from './AccountPage';
import FollowersPage from './FollowersPage';
import MyFollowersPage from './MyFollowersPage';
import FollowingPage from './FollowingPage';
import MyNetwork from './MyNetwork';
import PackagePage from './PackagePage';
import Settings from './Settings';
import CompanyDetailsPage from './CompanyDetailsPage';
import ProductAddPage from './ProductAddPage';
import ProductForm from './ProductForm';
import AddCarForm from './AddProduct/AddCarForm';
import AddHousesApartments from './AddProduct/AddHousesApartments';
import AddLandPlots from './AddProduct/AddLandPlots';
import AddPgGuestHouse from './AddProduct/AddPgGuestHouse';
import AddShopOffices from './AddProduct/AddShopOffices';
import AddMobileTablets from './AddProduct/AddMobileTablets';
import AddJob from './AddProduct/AddJob';
import AddMotorcycles from './AddProduct/AddMotorcycles';
import AddScooters from './AddProduct/AddScooters';
import AddBycycles from './AddProduct/AddBycycles';
import AddOthers from './AddProduct/AddOthers';
import AddEducationClasses from './AddProduct/AddEducationClasses';
import AddToursTravels from './AddProduct/AddToursTravels';
import AddElectronicsRepairServices from './AddProduct/AddElectronicsRepairServices';
import AddHealthBeauty from './AddProduct/AddHealthBeauty';
import AddHomeRenovationRepair from './AddProduct/AddHomeRenovationRepair';
import AddCleaningPestControl from './AddProduct/AddCleaningPestControl';
import AddLegalDocumentationServices from './AddProduct/AddLegalDocumentationServices';
import AddVehicleSpareParts from './AddProduct/AddVehicleSpareParts';
import AddCommercialHeavyVehicle from './AddProduct/AddCommercialHeavyVehicle';
import AddCommercialHeavyMachinery from './AddProduct/AddCommercialHeavyMachinery';
import LocationPicker from './LocationPicker';
import ChangePassword from './ChangePassword';
// Create Stack Navigators
const Stack = createStackNavigator();

// Main App Stack
const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setIsLoggedIn(!!token); // If token exists, user is logged in
    };
    checkLoginStatus();
  }, []);

  const initialRouteName = isLoggedIn ? "Home" : "Login";

  return (
    <Stack.Navigator initialRouteName="{initialRouteName}" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="FilterScreen" component={FilterScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="FullScreenMap" component={FullScreenMap} />
      <Stack.Screen name="ImageViewer" component={ImageViewer} />
      <Stack.Screen name="ChatBox" component={ChatBox} />
      <Stack.Screen name="ChatList" component={ChatList} />
      <Stack.Screen name="MyAdsPage" component={MyAdsPage} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfilePage" component={EditProfilePage} />
      <Stack.Screen name="AccountPage" component={AccountPage} />
      <Stack.Screen name="MyNetwork" component={MyNetwork} />
      <Stack.Screen name="FollowersPage" component={FollowersPage} />
      <Stack.Screen name="MyFollowersPage" component={MyFollowersPage} />
      <Stack.Screen name="FollowingPage" component={FollowingPage} />
      <Stack.Screen name="PackagePage" component={PackagePage} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="CompanyDetailsPage" component={CompanyDetailsPage} />
      <Stack.Screen name="LocationPicker" component={LocationPicker} />
      {/* Add product section */}
      <Stack.Screen name="ProductAddPage" component={ProductAddPage} />
      <Stack.Screen name="ProductForm" component={ProductForm} />
      <Stack.Screen name="AddCarForm" component={AddCarForm} />
      <Stack.Screen name="AddHousesApartments" component={AddHousesApartments} />
      <Stack.Screen name="AddLandPlots" component={AddLandPlots} />
      <Stack.Screen name="AddPgGuestHouse" component={AddPgGuestHouse} />
      <Stack.Screen name="AddShopOffices" component={AddShopOffices} />
      <Stack.Screen name="AddMobileTablets" component={AddMobileTablets} />
      <Stack.Screen name="AddJob" component={AddJob} />
      <Stack.Screen name="AddMotorcycles" component={AddMotorcycles} />
      <Stack.Screen name="AddScooters" component={AddScooters} />
      <Stack.Screen name="AddBycycles" component={AddBycycles} />
      <Stack.Screen name="AddOthers" component={AddOthers} />
      <Stack.Screen name="AddEducationClasses" component={AddEducationClasses} />
      <Stack.Screen name="AddToursTravels" component={AddToursTravels} />
      <Stack.Screen name="AddElectronicsRepairServices" component={AddElectronicsRepairServices} />
      <Stack.Screen name="AddHealthBeauty" component={AddHealthBeauty} />
      <Stack.Screen name="AddHomeRenovationRepair" component={AddHomeRenovationRepair} />
      <Stack.Screen name="AddCleaningPestControl" component={AddCleaningPestControl} />
      <Stack.Screen name="AddLegalDocumentationServices" component={AddLegalDocumentationServices} />
      <Stack.Screen name="AddVehicleSpareParts" component={AddVehicleSpareParts} />
      <Stack.Screen name="AddCommercialHeavyVehicle" component={AddCommercialHeavyVehicle} />
      <Stack.Screen name="AddCommercialHeavyMachinery" component={AddCommercialHeavyMachinery} />
    </Stack.Navigator>
  );
};


export default AppNavigator;
