import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home'; // Import your Home component
import ProductDetails from './ProductDetailsPage'; // Import your ProductDetails component
import ProductAddPage from './ProductAddPage'; // Import your ProductDetails component
import ChatBox from './ChatBox';
import ChatList from './ChatList';
import MyAdsPage from './MyAdsPage';
import AccountPage from './AccountPage';
import Profile from './Profile';
import Login from './Login';
import EditProfilePage from './EditProfilePage';
import MyNetwork from './MyNetwork';
import PackagePage from './PackagePage';
import Settings from './Settings';
import ImageViewer from './ImageViewer';
import CompanyDetailsPage from './CompanyDetailsPage';
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

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetails" options={{ headerShown: false }} component={ProductDetails} />
      <Stack.Screen name="ImageViewer" options={{ headerShown: false }} component={ImageViewer} />
      <Stack.Screen name="ChatBox" options={{ headerShown: false }} component={ChatBox} />
      <Stack.Screen name="ChatList" options={{ headerShown: false }} component={ChatList} />
      <Stack.Screen name="MyAdsPage" options={{ headerShown: false }} component={MyAdsPage} />
      <Stack.Screen name="Profile" options={{ headerShown: false }} component={Profile} />
      <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
      <Stack.Screen name="EditProfilePage" options={{ headerShown: false }} component={EditProfilePage} />
      <Stack.Screen name="AccountPage" options={{ headerShown: false }} component={AccountPage} />
      <Stack.Screen name="MyNetwork" options={{ headerShown: false }} component={MyNetwork} />
      <Stack.Screen name="PackagePage" options={{ headerShown: false }} component={PackagePage} />
      <Stack.Screen name="Settings" options={{ headerShown: false }} component={Settings} />
      <Stack.Screen name="CompanyDetailsPage" options={{ headerShown: false }} component={CompanyDetailsPage} />

      {/* Add product section */}
      <Stack.Screen name="ProductAddPage" options={{ headerShown: false }} component={ProductAddPage} />
      <Stack.Screen name="ProductForm" options={{ headerShown: false }} component={ProductForm} />
      <Stack.Screen name="AddCarForm" options={{ headerShown: false }} component={AddCarForm} />
      <Stack.Screen name="AddHousesApartments" options={{ headerShown: false }} component={AddHousesApartments} />
      <Stack.Screen name="AddLandPlots" options={{ headerShown: false }} component={AddLandPlots} />
      <Stack.Screen name="AddPgGuestHouse" options={{ headerShown: false }} component={AddPgGuestHouse} />
      <Stack.Screen name="AddShopOffices" options={{ headerShown: false }} component={AddShopOffices} />
      <Stack.Screen name="AddMobileTablets" options={{ headerShown: false }} component={AddMobileTablets} />
      <Stack.Screen name="AddJob" options={{ headerShown: false }} component={AddJob} />
      <Stack.Screen name="AddMotorcycles" options={{ headerShown: false }} component={AddMotorcycles} />
      <Stack.Screen name="AddScooters" options={{ headerShown: false }} component={AddScooters} />
      <Stack.Screen name="AddBycycles" options={{ headerShown: false }} component={AddBycycles} />

      {/* Others : Start */}
      <Stack.Screen name="AddOthers" options={{ headerShown: false }} component={AddOthers} />
      {/* Others : End */}


      <Stack.Screen name="AddEducationClasses" options={{ headerShown: false }} component={AddEducationClasses} />
      <Stack.Screen name="AddToursTravels" options={{ headerShown: false }} component={AddToursTravels} />
      <Stack.Screen name="AddElectronicsRepairServices" options={{ headerShown: false }} component={AddElectronicsRepairServices} />
      <Stack.Screen name="AddHealthBeauty" options={{ headerShown: false }} component={AddHealthBeauty} />
      <Stack.Screen name="AddHomeRenovationRepair" options={{ headerShown: false }} component={AddHomeRenovationRepair} />
      <Stack.Screen name="AddCleaningPestControl" options={{ headerShown: false }} component={AddCleaningPestControl} />
      <Stack.Screen name="AddLegalDocumentationServices" options={{ headerShown: false }} component={AddLegalDocumentationServices} />
      <Stack.Screen name="AddVehicleSpareParts" options={{ headerShown: false }} component={AddVehicleSpareParts} />
      <Stack.Screen name="AddCommercialHeavyVehicle" options={{ headerShown: false }} component={AddCommercialHeavyVehicle} />
      <Stack.Screen name="AddCommercialHeavyMachinery" options={{ headerShown: false }} component={AddCommercialHeavyMachinery} />


    </Stack.Navigator>
  );
};

export default AppNavigator;
