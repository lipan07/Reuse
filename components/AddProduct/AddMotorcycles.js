import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, ScrollView, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { submitForm } from '../../service/apiService';
import { BASE_URL, TOKEN } from '@env';

const AddMotorcycles = ({ route }) => {
  const { category, subcategory } = route.params;
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState({
    brand: '',
    adTitle: '',
    year: '',
    km_driven: '',
    description: '',
    amount: '',
    images: [],
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,  // Allow multiple image selection
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({
        ...formData,
        images: [...formData.images, ...result.assets.map((asset) => asset.uri)], // Add selected images to the array
      });
    }
  };

  useEffect(() => {
    const getMotorcycleBrand = async () => {
      try {
        const response = await fetch(`${BASE_URL}/motorcycle/brand`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
          },
        });
        const responseData = await response.json();
        if (response.ok) {
          setBrands(responseData);
        } else {
          console.log('Motorcycle/Brand: ', responseData);
        }
      } catch (error) {
        console.log('Something went wrong!', error);
      }
    };
    getMotorcycleBrand();
  }, []);

  const handleSubmit = async () => {
    submitForm(formData, subcategory)  // Use the centralized function
      .then((response) => {
        console.log('Form submitted successfully', response);
      })
      .catch((error) => {
        console.error('Error submitting form', error);
      });
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.formHeader}>Add Motorcycles</Text>

          {/* Brand Selection */}
          <Text style={styles.label}>Brand *</Text>
          <Picker
            selectedValue={formData.brand}
            onValueChange={(value) => handleChange('brand', value)}
            style={styles.picker}
          >
            <Picker.Item label="Select a brand" value="" />
            {brands.map((brand) => (
              <Picker.Item key={brand} label={brand} value={brand} />
            ))}
          </Picker>

          {/* Year Field */}
          <Text style={styles.label}>Year *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter year"
            value={formData.year}
            onChangeText={(value) => handleChange('year', value)}
          />
          {/* Title Field */}
          <Text style={styles.label}>KM Driven *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter KM driven"
            value={formData.km_driven}
            onChangeText={(value) => handleChange('km_driven', value)}
          />
          {/* Title Field */}
          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Title"
            value={formData.adTitle}
            onChangeText={(value) => handleChange('adTitle', value)}
          />

          {/* Description Field */}
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Enter Description"
            value={formData.description}
            multiline
            onChangeText={(value) => handleChange('description', value)}
          />

          {/* Amount Field */}
          <Text style={styles.label}>Amount *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Amount"
            keyboardType="numeric"
            value={formData.amount}
            onChangeText={(value) => handleChange('amount', value)}
          />

          {/* Image Picker */}
          <Text style={styles.label}>Select Images</Text>
          <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
            <Text style={styles.imagePickerText}>Pick images</Text>
          </TouchableOpacity>

          {/* Display Selected Images */}
          <View style={styles.imagesContainer}>
            {formData.images.map((imageUri, index) => (
              <Image key={index} source={{ uri: imageUri }} style={styles.image} />
            ))}
          </View>
        </ScrollView>

        {/* Fixed Submit Button */}
        <View style={styles.stickyButton}>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollViewContent: {
    padding: 16,
    paddingBottom: 100, // Increased bottom padding to make space for the fixed submit button
    flexGrow: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  imagePicker: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    marginBottom: 20,
  },
  imagePickerText: {
    color: '#fff',
    textAlign: 'center',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 100, // Added margin to ensure images are visible above the submit button
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
  },
  stickyButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});


export default AddMotorcycles;
