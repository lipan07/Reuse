import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Login = () => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [phoneNumber, setPhoneNumber] = useState('');
   const [otp, setOtp] = useState('');
   const [showOtpField, setShowOtpField] = useState(false);

   useEffect(() => {
      const checkLoginStatus = async () => {
         const token = await AsyncStorage.getItem('authToken');
         if (token) {
            setIsLoggedIn(true);
            // Fetch user data here and set it to `userData`
            // For now, we will use dummy data
            setUserData({ name: 'John Doe', email: 'johndoe@example.com' });
         }
      };
      checkLoginStatus();
   }, []);

   const handlePhoneNumberSubmit = async () => {
      // Logic to send OTP based on phone number
      setShowOtpField(true);
   };

   const handleOtpSubmit = async () => {
      // Logic to verify OTP and log in the user
      setIsLoggedIn(true);
      // Optionally fetch and set user data after login
      setUserData({ name: 'John Doe', email: 'johndoe@example.com' });
   };

   return (
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
               <Text style={styles.buttonText}>{showOtpField ? 'Submit OTP' : 'Send OTP'}</Text>
            </TouchableOpacity>
         </View>
      </View>
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
