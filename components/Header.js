import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Platform, StatusBar, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = () => {
   const navigation = useNavigation();
   const [address, setAddress] = useState("Set Location");

   const handleNavigation = async () => {
      try {
         await AsyncStorage.removeItem('authToken');
         navigation.navigate('Login');
         console.log('Logged out successfully');
      } catch (error) {
         console.error('Error logging out:', error);
      }
   };

   useEffect(() => {
      const fetchAddress = async () => {
         const savedAddress = await AsyncStorage.getItem('defaultAddress');
         if (savedAddress) {
            setAddress(JSON.parse(savedAddress).addressText || "Set Location");
         }
      };
      fetchAddress();
   }, []);

   return (
      <>
         <StatusBar backgroundColor="#007BFF" barStyle="light-content" />
         <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
               <Image
                  source={{ uri: 'https://i.pinimg.com/originals/92/4c/af/924cafad941065f4d5c03ca5423bfcd3.gif' }}
                  style={styles.logo}
               />
               <View>
                  <Text style={styles.appName}>Reuse</Text>
                  <Text style={styles.appSubName}>Bharat</Text>
               </View>
            </View>
            <View style={styles.rightIcons}>
               <TouchableOpacity onPress={() => navigation.navigate('LocationPicker')}>
                  <Text style={styles.addressText}>{address}</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => navigation.navigate('LocationPicker')}>
                  <Ionicons name="location-outline" size={24} color="#fff" style={styles.icon} />
               </TouchableOpacity>
            </View>
         </View>
      </>
   );
};

const styles = StyleSheet.create({
   headerContainer: {
      backgroundColor: '#007BFF',
      height: Platform.OS === 'ios' ? 80 : 60,
      paddingHorizontal: 16,
      paddingTop: Platform.OS === 'ios' ? 40 : 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   logo: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
      marginRight: 10,
   },
   appName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF',
   },
   appSubName: {
      fontSize: 14,
      color: '#FFFFFF',
   },
   rightIcons: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   addressText: {
      color: '#FFFFFF',
      fontSize: 16,
      marginRight: 10,
      textDecorationLine: 'underline', // Makes the text look clickable
   },
   icon: {
      marginLeft: 5,
   },
});

export default Header;