import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const EditProfilePage = () => {
  const [userData, setUserData] = useState({
    // Existing user data fields
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    businessName: '',
    businessType: '',
    businessAddress: '',
    // New field for profile image
    profileImage: null,
  });

  const handleChange = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    });
  };

  const handleSave = () => {
    // Implement logic to save user data
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
      <Text style={styles.header}>Account Details</Text>
      <Text style={styles.header}>Profile Image</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={handleChooseImage}>
        {userData.profileImage ? (
          <Image source={{ uri: userData.profileImage }} style={styles.profileImage} />
        ) : (
          <Text>Select Profile Image</Text>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={userData.firstName}
        onChangeText={(text) => handleChange('firstName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={userData.lastName}
        onChangeText={(text) => handleChange('lastName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userData.email}
        onChangeText={(text) => handleChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={userData.phoneNumber}
        onChangeText={(text) => handleChange('phoneNumber', text)}
      />
      <Text style={styles.header}>Business Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Business Name"
        value={userData.businessName}
        onChangeText={(text) => handleChange('businessName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Business Type"
        value={userData.businessType}
        onChangeText={(text) => handleChange('businessType', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Business Address"
        value={userData.businessAddress}
        onChangeText={(text) => handleChange('businessAddress', text)}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  //...Existing styles...
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EditProfilePage;
