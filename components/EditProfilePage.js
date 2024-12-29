import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const EditProfilePage = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    businessName: '',
    businessType: '',
    businessAddress: '',
    profileImage: null,
    businessWebsite: '',
    bio: '',
  });

  const handleChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleSave = () => {
    console.log('User Data:', userData);
  };

  const handleChooseImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      setUserData({ ...userData, profileImage: pickerResult.uri });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Edit Profile</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={handleChooseImage}>
          {userData.profileImage ? (
            <Image source={{ uri: userData.profileImage }} style={styles.profileImage} />
          ) : (
            <Ionicons name="camera" size={40} color="#ccc" />
          )}
        </TouchableOpacity>
        <TextInput style={styles.input} placeholder="First Name" value={userData.firstName} onChangeText={(text) => handleChange('firstName', text)} />
        <TextInput style={styles.input} placeholder="Last Name" value={userData.lastName} onChangeText={(text) => handleChange('lastName', text)} />
        <TextInput style={styles.input} placeholder="Email" value={userData.email} onChangeText={(text) => handleChange('email', text)} />
        <TextInput style={styles.input} placeholder="Phone Number" value={userData.phoneNumber} onChangeText={(text) => handleChange('phoneNumber', text)} />
        <TextInput style={styles.input} placeholder="Business Name" value={userData.businessName} onChangeText={(text) => handleChange('businessName', text)} />
        <TextInput style={styles.input} placeholder="Business Type" value={userData.businessType} onChangeText={(text) => handleChange('businessType', text)} />
        <TextInput style={styles.input} placeholder="Business Address" value={userData.businessAddress} onChangeText={(text) => handleChange('businessAddress', text)} />
        <TextInput style={styles.input} placeholder="Business Website" value={userData.businessWebsite} onChangeText={(text) => handleChange('businessWebsite', text)} />
        <TextInput style={styles.input} placeholder="Tell us about yourself" value={userData.bio} onChangeText={(text) => handleChange('bio', text)} />
      </ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 20,
  },
  imagePicker: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#f8f9fa',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfilePage;
