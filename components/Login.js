import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { useNavigation } from '@react-navigation/native';
import { BASE_URLßßß } from '@env';

const Login = () => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [phoneNumber, setPhoneNumber] = useState('');
   const [otp, setOtp] = useState('');
   const [showOtpField, setShowOtpField] = useState(false);
   const navigation = useNavigation();

   useEffect(() => {
      const checkLoginStatus = async () => {
         const token = await AsyncStorage.getItem('authToken');
         if (token) {
            setIsLoggedIn(true);
            // Fetch user data or perform other actions with the token
            navigation.navigate('Home');
         }
      };
      checkLoginStatus();
   }, []);

   const handlePhoneNumberSubmit = async () => {
      // Logic to send OTP based on phone number
      setShowOtpField(true);
   };

   const handleOtpSubmit = async () => {
      try {
         // Make API request to verify OTP
         const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               phoneNumber,
               otp,
            }),
         });

         const data = await response.json();

         console.log(data);

         if (response.ok) {
            console.log('user', data.user.id);
            // Save the auth_token to AsyncStorage
            await AsyncStorage.setItem('authToken', data.token);
            await AsyncStorage.setItem('userId', data.user.id); // Storing as string
            await AsyncStorage.setItem('name', data.user.name);
            // await AsyncStorage.setItem('email', data.user.email);
            await AsyncStorage.setItem('phoneNo', data.user.phone_no);
            // Update login state
            setIsLoggedIn(true);

            navigation.navigate('Home');
         } else {
            Dialog.show({
               type: ALERT_TYPE.WARNING,
               title: 'Login Failed!!',
               textBody: 'The provided credentials are incorrect.',
               button: 'close',
            });
         }
      } catch (error) {
         console.log(error);
         Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: 'Error!!',
            textBody: 'Something went wrong. Please try again later.',
            button: 'close',
         });
      }
   };

   return (
      <AlertNotificationRoot>
         <View style={styles.container}>
            <View style={styles.loginContainer}>
               <Text style={styles.loginTitle}>Login</Text>
               <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
               />
               {showOtpField && (
                  <TextInput
                     style={styles.input}
                     placeholder="OTP"
                     value={otp}
                     onChangeText={setOtp}
                     keyboardType="number-pad"
                  />
               )}
               <TouchableOpacity style={styles.loginButton} onPress={showOtpField ? handleOtpSubmit : handlePhoneNumberSubmit}>
                  <Text style={styles.buttonText}>{showOtpField ? 'Submit' : 'Send OTP'}</Text>
               </TouchableOpacity>
            </View>
         </View>
      </AlertNotificationRoot>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#ffffff',
   },
   loginContainer: {
      flex: 1,
      justifyContent: 'center',
   },
   loginTitle: {
      fontSize: 24,
      marginBottom: 20,
      textAlign: 'center',
   },
   input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 15,
      paddingHorizontal: 10,
   },
   loginButton: {
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
   },
   buttonText: {
      color: '#ffffff',
      fontSize: 16,
   },
});

export default Login;
